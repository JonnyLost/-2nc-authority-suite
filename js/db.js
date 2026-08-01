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
  async function remove(storeName, key) {
    if (!['music', 'comic'].includes(storeName)) return requestPromise(store(storeName, 'readwrite').delete(key));
    const tx = db.transaction([storeName, 'meta'], 'readwrite');
    tx.objectStore(storeName).delete(key);
    tx.objectStore('meta').put({ key: `deleted:${storeName}:${key}`, value: true, at: new Date().toISOString() });
    await transactionPromise(tx);
  }

  async function replaceStore(storeName, rows) {
    const tx = db.transaction(storeName, 'readwrite');
    const target = tx.objectStore(storeName);
    target.clear();
    rows.forEach(row => target.put(row));
    await transactionPromise(tx);
  }

  function comparableRecord(row = {}) {
    const ignored = new Set(['status', 'notes', 'updatedAt', '_localEdited']);
    return Object.fromEntries(Object.entries(row).filter(([key]) => !ignored.has(key)).sort(([a], [b]) => a.localeCompare(b)));
  }

  function hasLocalChanges(old = {}, bundled = {}) {
    if (old._localEdited) return true;
    return JSON.stringify(comparableRecord(old)) !== JSON.stringify(comparableRecord(bundled));
  }

  const canonicalRepairIds = new Set(["SER-01955","SER-01106","SER-01908","SER-01910","SER-01909","CHR-00015","SER-01883","CHR-00080","SER-02455","TEM-00005","SER-02436","SER-00994","SER-02183","CHR-00139","SER-00381","TEM-00007","SER-01889","CHR-00158","TEM-00008","SER-01086","SER-02188","CHR-00183","CHR-00193","SER-02393","CHR-00198","SER-01087","SER-02184","SER-02197","SER-02464","CHR-00273","SER-00140","EVT-00011","CHR-00274","CHR-00337","EVT-00013","SER-02001","SER-02291","CHR-00457","CHR-00469","SER-02247","SER-01898","SER-00026","SER-02011","SER-02181","SER-00039","SER-02231","SER-00998","SER-02172","SER-02186","SER-02199","SER-02230","SER-02201","TEM-00024"]);

  function mergedRecord(row, old = {}) {
    const locallyEdited = Boolean(old._localEdited);
    if (old.id && hasLocalChanges(old, row) && (locallyEdited || !canonicalRepairIds.has(row.id))) {
      return { ...row, ...old, status: old.status || 'active', notes: old.notes || '', _localEdited: true };
    }
    return {
      ...row,
      status: old.status || row.status || 'active',
      notes: old.notes || row.notes || '',
      updatedAt: old.updatedAt || row.updatedAt || null
    };
  }

  async function deletedIds(kind) {
    const metaRows = await getAll('meta');
    const prefix = `deleted:${kind}:`;
    return new Set(metaRows.filter(row => row.key.startsWith(prefix) && row.value).map(row => row.key.slice(prefix.length)));
  }

  async function mergeBundled(kind, rows) {
    const existing = await getAll(kind);
    const existingMap = new Map(existing.map(row => [row.id, row]));
    const deleted = await deletedIds(kind);
    const tx = db.transaction(kind, 'readwrite');
    const target = tx.objectStore(kind);
    rows.forEach(row => {
      if (!deleted.has(row.id)) target.put(mergedRecord(row, existingMap.get(row.id)));
    });
    await transactionPromise(tx);
  }

  async function replaceWithBundledPreservingEdits(kind, rows) {
    const existing = await getAll(kind);
    const existingMap = new Map(existing.map(row => [row.id, row]));
    const deleted = await deletedIds(kind);
    const bundledIds = new Set(rows.map(row => row.id));
    const customRows = existing.filter(row => row && row.id && !bundledIds.has(row.id));
    const tx = db.transaction(kind, 'readwrite');
    const target = tx.objectStore(kind);
    target.clear();
    rows.forEach(row => {
      if (!deleted.has(row.id)) target.put(mergedRecord(row, existingMap.get(row.id)));
    });
    customRows.forEach(row => {
      if (!deleted.has(row.id)) target.put(row);
    });
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
        // Always merge the current bundle so newly published authority IDs reach
        // devices that have previously enabled GitHub synchronization. Existing
        // remote or locally edited records still win through mergedRecord().
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
    const deletions = (await getAll('meta')).filter(row => row.key.startsWith('deleted:') && row.value);
    return {
      schema: cfg.schema,
      version: cfg.version,
      exportedAt: new Date().toISOString(),
      music: await getAll('music'),
      comic: await getAll('comic'),
      deletions
    };
  }

  async function importBackup(payload) {
    if (!payload || !Array.isArray(payload.music) || !Array.isArray(payload.comic)) throw new Error('This is not a valid 2NC Authority backup.');
    await replaceStore('music', payload.music);
    await replaceStore('comic', payload.comic);
    const metaRows = await getAll('meta');
    const tx = db.transaction('meta', 'readwrite');
    const metaStore = tx.objectStore('meta');
    metaRows.filter(row => row.key.startsWith('deleted:')).forEach(row => metaStore.delete(row.key));
    (Array.isArray(payload.deletions) ? payload.deletions : []).forEach(row => metaStore.put(row));
    await transactionPromise(tx);
    await put('meta', { key: 'import', value: payload.exportedAt || new Date().toISOString(), at: new Date().toISOString() });
  }

  async function replaceAuthority(kind, rows, source = 'remote') {
    if (!['music', 'comic'].includes(kind) || !Array.isArray(rows)) throw new Error('Invalid authority data.');
    await replaceStore(kind, rows);
    await put('meta', { key: `replace:${kind}`, value: source, at: new Date().toISOString() });
  }

  async function markRemoteCanonical(source = 'github') {
    await put('meta', { key: 'remoteCanonical', value: source, at: new Date().toISOString() });
  }

  window.AuthorityDB = { initialize, getAll, get, put, remove, counts, ensureSeeded, exportBackup, importBackup, replaceAuthority, markRemoteCanonical };
})();
