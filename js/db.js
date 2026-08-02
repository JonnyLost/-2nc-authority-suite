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

  const canonicalRepairIds = new Set(["SER-01955","SER-01106","SER-01908","SER-01910","SER-01909","CHR-00015","SER-01883","CHR-00080","SER-02455","TEM-00005","SER-02436","SER-00994","SER-02183","CHR-00139","SER-00381","TEM-00007","SER-01889","CHR-00158","TEM-00008","SER-01086","SER-02188","CHR-00183","CHR-00193","SER-02393","CHR-00198","SER-01087","SER-02184","SER-02197","SER-02464","CHR-00273","SER-00140","EVT-00011","CHR-00274","CHR-00337","EVT-00013","SER-02001","SER-02291","CHR-00457","CHR-00469","SER-02247","SER-01898","SER-00026","SER-02011","SER-02181","SER-00039","SER-02231","SER-00998","SER-02172","SER-02186","SER-02199","SER-02230","SER-02201","TEM-00024","SER-00922","SER-00932","SER-00972","SER-00009","SER-00502","SER-00673","SER-00166","SER-00533","SER-00744","SER-00503","SER-00192","SER-00292","SER-00588","SER-00038","SER-00093","SER-00182","SER-00256","SER-00394","SER-00456","CHR-00407","CHR-00056","CHR-00079","CHR-00150","CHR-00157","CHR-00250","CHR-00431","CHR-00351","CHR-00360","CHR-00389","CHR-00447","CHR-00494","CHR-00511","CHR-00350","SER-DCX-0201","SER-DCX-0206","SER-DCX-0207","SER-DCX-0209","SER-DCX-0211","SER-DCX-0219","SER-DCX-0225","SER-DCX-0190","TEM-00015","REF-00020","REF-00019","TEM-00012","SER-01498","SER-01562","SER-00316","SER-01469","SER-01468","SER-01042","SER-00507","SER-01875","SER-01369","SER-00202","SER-00605","SER-00607","SER-00608","SER-01839","SER-00609","SER-01739","SER-01477","SER-01059","SER-01687","SER-01060","SER-01778","SER-01779","SER-01780","SER-01781","SER-01782","SER-01777","SER-00492","SER-00322","SER-01706","SER-01377","SER-01461","EVT-00131","SER-01832","SER-01386","SER-01536","SER-01540","SER-01387","SER-01373","SER-01523","SER-01502","SER-01524","SER-00437","SER-01470","SER-01481","SER-01482","SER-01784","SER-00420","SER-01056","SER-01367","SER-01841","CHR-00030","SER-DCX-0198","CHR-00204","SER-DCX-0202","CHR-00284","CHR-00449","SER-DCX-0221","CHR-DCX-0096","CHR-00170","CHR-00416","CHR-00439","EVT-00127","SER-01785","SER-01786","SER-01787","SER-01788","SER-01789","SER-01795","SER-01444","CHR-00019","SER-01616","SER-01602","SER-01550","SER-01663","SER-01452","SER-01617","SER-01710","SER-01606","SER-01605","CHR-00039","SER-00084","SER-00085","SER-01852","SER-00086","SER-01709","SER-01708","SER-00248","SER-00249","SER-00087","SER-01714","SER-00088","SER-01800","SER-01544","SER-01713","SER-01712","SER-01853","SER-01798","SER-01799","SER-01607","SER-01542","SER-01543","SER-01835","SER-01551","SER-01864","SER-01479","SER-01484","EVT-00149","SER-01527","SER-01596","SER-01597","SER-01854","SER-01753","SER-01834","SER-00372","EVT-00061","EVT-00108","EVT-00132","EVT-00133","EVT-00121","EVT-00062","SER-01698","SER-01534","SER-01696","SER-01619","SER-01650","SER-01722","SER-01721","SER-01723","SER-01716","SER-01717","SER-01718","SER-01719","SER-01720","SER-01715","SER-01695","SER-01837","EVT-00063","SER-01574","SER-01575","SER-01578","SER-01579","SER-01577","SER-01582","SER-01581","SER-01580","SER-01576","EVT-00064","SER-01510","SER-01495","EVT-00118","EVT-00122","SER-01807","SER-01485","SER-01486","SER-01840","SER-01843","EVT-00179","EVT-00178","SER-01847","SER-01844","SER-01846","SER-01845","SER-01545","EVT-00117","SER-01347","SER-01505","SER-01066","SER-01067","SER-01694","SER-01693","SER-01692","SER-01842","SER-01866","SER-01867","SER-00250","EVT-00175","SER-01062","SER-01061","SER-01063","SER-01528","EVT-00088","SER-01549","SER-01378","SER-01600","SER-01553","SER-01705","EVT-00112","SER-01531","SER-01865","SER-01598","SER-01496","EVT-00065","EVT-00115","SER-01547","SER-01064","SER-00373","SER-01379","SER-01490","SER-01491","SER-01065","SER-01584","SER-01583","EVT-00116","SER-01552","SER-01836","SER-00251","SER-01530","SER-01548","EVT-00008","SER-01703","SER-01856","SER-01611","SER-01365","SER-01511","SER-01441","SER-01380","SER-01707","SER-01851","EVT-00066","EVT-00126","SER-01648","SER-01069","SER-01541","SER-01068","SER-01457","SER-01456","SER-01455","SER-01454","SER-01458","SER-00374","SER-01794","SER-00252","SER-01442","CHR-00208","SER-01805","EVT-00120","SER-01649","SER-01801","SER-01802","SER-00253","SER-01803","SER-01754","SER-01757","SER-01758","SER-01759","SER-01760","SER-01761","SER-01762","SER-01755","SER-01763","SER-01764","SER-01756","SER-01765","SER-01766","SER-01767","SER-01768","SER-01769","SER-01770","SER-01771","SER-01772","SER-01773","SER-01774","SER-01775","SER-01776","EVT-00177","SER-01724","SER-01726","SER-01727","SER-01728","SER-01729","SER-01725","SER-01730","SER-00031","SER-01427","SER-01371","SER-01599","SER-01699","SER-01592","SER-01593","SER-01850","SER-01554","SER-01529","SER-01601","SER-01603","SER-01437","SER-01438","SER-01439","SER-01440","SER-01555","EVT-00125","SER-01700","SER-01806","SER-01621","SER-00030","EVT-00123","SER-01855","SER-01622","EVT-00087","SER-01612","SER-01381","SER-01849","SER-01697","SER-01497","SER-01614","SER-01615","SER-01489","SER-01354","SER-01594","SER-01595","SER-00375","SER-01538","EVT-00119","SER-01451","SER-01623","SER-01796","SER-01752","SER-01608","SER-01872","SER-01609","CHR-00393","SER-00254","SER-00766","SER-00767","SER-01546","SER-01702","SER-01382","SER-01476","SER-01711","SER-01604","SER-01804","SER-01535","SER-01833","SER-01618","CHR-00342","SER-01072","SER-01878","SER-01797","SER-01453","SER-01492","SER-01071","SER-01494","SER-01443","SER-01587","SER-01487","SER-01620","SER-01423","SER-01848","SER-01070","SER-01586","SER-01073","SER-01791","SER-01792","SER-01539","SER-01701","SER-01532","SER-01533","SER-01374","SER-00032","SER-00033","SER-00034","SER-01504","SER-01383","SER-01385","SER-01384","SER-01613","EVT-00114","EVT-00124","SER-01375","SER-01493","SER-01790","EVT-00111","SER-01793","SER-01488","SER-01610","EVT-00176","SER-01573","EVT-00067","SER-01871","ANT-00002","SER-01560","SER-00041","SER-00980","SER-00173","SER-00752","SER-00857","SER-00929","SER-00934","SER-00045","SER-00355","SER-00433","SER-00465","SER-00636","SER-00734","SER-00314","SER-00638","SER-00594","SER-01463","EVT-00076","SER-00834","SER-00484","SER-00751","SER-00535","EVT-00080","SER-00014","SER-00091","SER-00467","EVT-00077","SER-00953","SER-00104","SER-00340","SER-00803","SER-00867","SER-00247","SER-00377","EVT-00081","EVT-00078","ANT-00001","ANT-00003","SER-00768","SER-00369","EVT-00079","SER-01564","SER-00505","SER-00506","SER-00219","SER-00313","SER-00402","SER-00851","SER-00828","SER-00829","SER-00561","SER-00566","SER-00811","SER-00508","SER-00965","SER-00976","SER-00008","SER-00157","SER-00482","SER-00789","SER-01044","SER-00616","SER-00810","SER-00858","SER-00876","SER-00401","SER-DCX-0217","SER-01659","SER-01818","SER-00951","SER-00954","SER-01670","SER-00366","CHR-00502"]);

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
