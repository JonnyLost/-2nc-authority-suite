(function () {
  const cfg = window.APP_CONFIG;
  let db = null;

  function requestPromise(request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('IndexedDB request failed'));
    });
  }

  function transactionPromise(transaction) {
    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error('IndexedDB transaction failed'));
      transaction.onabort = () => reject(transaction.error || new Error('IndexedDB transaction aborted'));
    });
  }

  async function openDatabase(name = cfg.databaseName) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(name, cfg.schema);
      request.onupgradeneeded = event => {
        const database = event.target.result;
        ['music', 'comic', 'meta'].forEach(storeName => {
          if (!database.objectStoreNames.contains(storeName)) {
            const keyPath = storeName === 'meta' ? 'key' : 'id';
            const store = database.createObjectStore(storeName, { keyPath });
            if (storeName !== 'meta') {
              store.createIndex('status', 'status', { unique: false });
              store.createIndex('display', 'display', { unique: false });
            }
          }
        });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error(`Could not open ${name}`));
      request.onblocked = () => reject(new Error('Database upgrade is blocked by another open tab. Close other copies of the app and refresh.'));
    });
  }

  async function fetchBundled(kind) {
    const path = cfg.bundledFiles[kind];
    const response = await fetch(`${path}?build=${encodeURIComponent(cfg.build)}`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Could not load bundled ${kind} authority (${response.status})`);
    const rows = await response.json();
    if (!Array.isArray(rows)) throw new Error(`Bundled ${kind} authority is not a valid record array`);
    const minimum = cfg.expectedMinimums[kind];
    if (rows.length < minimum) throw new Error(`Bundled ${kind} authority contains only ${rows.length} records; expected at least ${minimum}`);
    return rows;
  }

  function store(storeName, mode = 'readonly') {
    if (!db) throw new Error('Database is not open');
    return db.transaction(storeName, mode).objectStore(storeName);
  }

  async function getAll(storeName) { return requestPromise(store(storeName).getAll()); }
  async function get(storeName, key) { return requestPromise(store(storeName).get(key)); }
  async function put(storeName, value) { return requestPromise(store(storeName, 'readwrite').put(value)); }
  async function remove(storeName, key) { return requestPromise(store(storeName, 'readwrite').delete(key)); }

  async function replaceStore(storeName, rows) {
    const tx = db.transaction(storeName, 'readwrite');
    const target = tx.objectStore(storeName);
    target.clear();
    rows.forEach(row => target.put(row));
    await transactionPromise(tx);
  }

  function mergedRecord(row, old = {}) {
    return {
      ...row,
      status: old.status || row.status || 'active',
      notes: old.notes || row.notes || '',
      updatedAt: old.updatedAt || row.updatedAt || new Date().toISOString()
    };
  }

  async function mergeBundled(kind, rows) {
    const existing = await getAll(kind);
    const existingMap = new Map(existing.map(row => [row.id, row]));
    const tx = db.transaction(kind, 'readwrite');
    const target = tx.objectStore(kind);
    rows.forEach(row => target.put(mergedRecord(row, existingMap.get(row.id))));
    await transactionPromise(tx);
  }

  async function replaceWithBundledPreservingEdits(kind, rows) {
    const existing = await getAll(kind);
    const existingMap = new Map(existing.map(row => [row.id, row]));
    const bundledIds = new Set(rows.map(row => row.id));
    const customRows = existing.filter(row => row && row.id && !bundledIds.has(row.id));
    const tx = db.transaction(kind, 'readwrite');
    const target = tx.objectStore(kind);
    target.clear();
    rows.forEach(row => target.put(mergedRecord(row, existingMap.get(row.id))));
    customRows.forEach(row => target.put(row));
    await transactionPromise(tx);
  }

  async function readLegacyRecords() {
    const collected = { music: [], comic: [] };
    for (const name of cfg.legacyDatabaseNames) {
      try {
        const legacy = await openDatabase(name);
        for (const kind of ['music', 'comic']) {
          if (!legacy.objectStoreNames.contains(kind)) continue;
          const tx = legacy.transaction(kind, 'readonly');
          const rows = await requestPromise(tx.objectStore(kind).getAll());
          collected[kind].push(...rows.filter(row => row && row.id));
        }
        legacy.close();
      } catch (error) {
        AppLog.warn(`Legacy database ${name} was not migrated`, error);
      }
    }
    return collected;
  }

  async function migrateLegacyEdits() {
    const meta = await get('meta', 'legacyMigration');
    if (meta && meta.value === cfg.build) return;
    const legacy = await readLegacyRecords();
    for (const kind of ['music', 'comic']) {
      if (!legacy[kind].length) continue;
      const current = new Map((await getAll(kind)).map(row => [row.id, row]));
      const tx = db.transaction(kind, 'readwrite');
      const target = tx.objectStore(kind);
      legacy[kind].forEach(row => {
        const bundled = current.get(row.id);
        if (!bundled) {
          target.put(row);
          return;
        }
        if (row.status === 'retired' || (row.notes && row.notes !== bundled.notes)) {
          target.put({ ...bundled, status: row.status || bundled.status, notes: row.notes || bundled.notes, updatedAt: row.updatedAt || bundled.updatedAt });
        }
      });
      await transactionPromise(tx);
    }
    await put('meta', { key: 'legacyMigration', value: cfg.build, at: new Date().toISOString() });
  }

  async function ensureSeeded({ force = false } = {}) {
    const bundled = {};
    for (const kind of ['music', 'comic']) bundled[kind] = await fetchBundled(kind);

    for (const kind of ['music', 'comic']) {
      const current = await getAll(kind);
      const minimum = cfg.expectedMinimums[kind];
      if (force || current.length < minimum) {
        AppLog.warn(`Reseeding ${kind} authority`, `Current ${current.length}; bundled ${bundled[kind].length}`);
        await replaceWithBundledPreservingEdits(kind, bundled[kind]);
      } else {
        await mergeBundled(kind, bundled[kind]);
      }
    }
    await put('meta', { key: 'seed', value: cfg.build, at: new Date().toISOString() });
    await migrateLegacyEdits();
  }

  async function counts() {
    const result = {};
    for (const kind of ['music', 'comic']) result[kind] = (await getAll(kind)).filter(row => row.status !== 'retired').length;
    return result;
  }

  async function initialize(options = {}) {
    if (!('indexedDB' in window)) throw new Error('This browser does not support the internal authority database.');
    db = await openDatabase();
    db.onversionchange = () => { db.close(); location.reload(); };
    await ensureSeeded(options);
    const currentCounts = await counts();
    if (currentCounts.music < cfg.expectedMinimums.music || currentCounts.comic < cfg.expectedMinimums.comic) {
      throw new Error(`Database validation failed: Music ${currentCounts.music}, Comics ${currentCounts.comic}`);
    }
    return currentCounts;
  }

  async function exportBackup() {
    return {
      schema: cfg.schema,
      version: cfg.version,
      exportedAt: new Date().toISOString(),
      music: await getAll('music'),
      comic: await getAll('comic')
    };
  }

  async function importBackup(payload) {
    if (!payload || !Array.isArray(payload.music) || !Array.isArray(payload.comic)) throw new Error('This is not a valid 2NC Authority backup.');
    await replaceStore('music', payload.music);
    await replaceStore('comic', payload.comic);
    await put('meta', { key: 'import', value: payload.exportedAt || new Date().toISOString(), at: new Date().toISOString() });
  }

  window.AuthorityDB = { initialize, getAll, get, put, remove, counts, ensureSeeded, exportBackup, importBackup };
})();
