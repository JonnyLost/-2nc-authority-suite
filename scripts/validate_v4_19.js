const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const key = value => String(value || '').normalize('NFKD').replace(/[’‘]/g, "'").toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const baseComics = json('data/comics.json');
const compactComics = json('data/comics.min.json');
const music = json('data/music.json');
const auditStats = json('MARVEL_PUBLICATION_HISTORY_STATS.json');
const version = json('VERSION.json');
const html = read('index.html');
const fallback = read('404.html');
const config = read('js/config.js');
const db = read('js/db.js');
const ui = read('js/ui.js');
const labels = read('js/labels.js');
const pdf = read('js/pdf.js');
const serviceWorker = read('service-worker.js');
const supplementFiles = fs.readdirSync(path.join(root, 'data')).filter(name => /^comics-v4\.19-\d+\.json$/.test(name)).sort();
const supplement = supplementFiles.flatMap(name => json(`data/${name}`));
const comics = [...new Map([...baseComics, ...supplement].map(row => [row.id, row])).values()];

assert(version.version === '4.20.3', 'VERSION.json is not v4.20.3');
assert(/version:\s*'4\.20\.3'/.test(config), 'Runtime version is not v4.20.3');
assert(/2nc-authority-suite-v4\.20\.3/.test(config) && /2nc-authority-suite-v4\.20\.3/.test(serviceWorker), 'PWA cache is not v4.20.3');
assert(!/4\.18\.0/.test(html + fallback + config + serviceWorker), 'Stale v4.18 asset reference remains');
assert(html === fallback, 'index.html and 404.html differ');
assert(/class="suite-header"/.test(html), 'Shared 2NC application header is missing');
assert(/id="app-menu"/.test(html) && /Store Operations/.test(html) && /Performance Analytics/.test(html) && /Authority Suite/.test(html), 'Shared 2NC application menu is incomplete');
assert(/Buying Authority Reference/.test(html), 'Authority Suite subtitle is missing');
assert(/--bg:#f2f0eb/.test(read('styles.css')) && /--panel:#fff/.test(read('styles.css')) && /--text:#171717/.test(read('styles.css')) && /--orange:#f36c21/.test(read('styles.css')), 'Command Center palette is incomplete');
assert(/padding-top:calc\(11px \+ var\(--safe-top\)\)/.test(read('styles.css')), 'Mobile header does not reserve the iPhone safe area');
assert(/apple-mobile-web-app-status-bar-style" content="default"/.test(html), 'iPhone status-bar treatment is not aligned with Command Center');

assert(comics.length === 13287, `Expected 13,287 comics; found ${comics.length}`);
assert([7281, 13287].includes(baseComics.length), `Unexpected base comic bundle count: ${baseComics.length}`);
assert(compactComics.length === baseComics.length, 'Compact comic bundle count differs from the base bundle');
assert(music.length === 4606, `Expected 4,606 music records; found ${music.length}`);
assert(auditStats.modernAuditRuns === 5295, `Expected 5,295 Marvel A–Z runs; found ${auditStats.modernAuditRuns}`);
assert(auditStats.historicalAuditRuns === 380, `Expected 380 Timely/Atlas runs; found ${auditStats.historicalAuditRuns}`);
assert(supplementFiles.length === 13, `Expected 13 Marvel supplement files; found ${supplementFiles.length}`);
assert(supplement.length === 6007, `Expected 6,007 supplemental records; found ${supplement.length}`);
assert(new Set(supplement.map(row => row.id)).size === supplement.length, 'Duplicate IDs found inside Marvel supplement');
assert(supplement.filter(row => /^M2[AS]-/.test(row.id)).length === 6006, 'Marvel supplement additions changed');
assert(supplement.some(row => row.id === 'SER-02066' && key(row.parent) === 'bullseye'), 'Bullseye repair is absent from supplement');
for (const name of supplementFiles) {
  assert(config.includes(`data/${name}`), `${name} is absent from runtime configuration`);
  assert(serviceWorker.includes(`./data/${name}`), `${name} is absent from offline cache`);
}

const comicIds = new Set(comics.map(row => row.id));
const musicIds = new Set(music.map(row => row.id));
assert(comicIds.size === comics.length, 'Duplicate comic IDs found');
assert(musicIds.size === music.length, 'Duplicate music IDs found');
const primaryNames = new Set(comics.filter(row => row.primary).map(row => key(row.display)));
const unresolved = comics.filter(row => !row.primary && !primaryNames.has(key(row.parent)));
assert(unresolved.length === 0, `Unresolved comic parents: ${unresolved.map(row => row.id).join(', ')}`);
assert(comics.filter(row => row.primary).length === 3579, 'Primary comic count changed');
assert(comics.filter(row => !row.primary).length === 9708, 'Subordinate comic count changed');

const hasRun = (title, parent, start, end = start) => comics.some(row => !row.primary && key(row.display) === key(title) && key(row.parent) === key(parent) && Number(row.startYear) === start && Number(row.endYear) === end);
assert(hasRun('Avataars: Covenant of the Shield', 'Avataars', 2000), 'Avataars run missing or misfiled');
assert(hasRun('Bullseye', 'Bullseye', 2017), 'Bullseye 2017 run missing or misfiled');
assert(hasRun('Bullseye: Greatest Hits', 'Bullseye', 2004, 2005), 'Bullseye: Greatest Hits missing or misfiled');
assert(hasRun('Bullseye: Perfect Game', 'Bullseye', 2011), 'Bullseye: Perfect Game missing or misfiled');
assert(hasRun('Battlefield', 'Battlefield', 1952, 1953), 'Battlefield run missing or misfiled');
assert(hasRun('Barbie', 'Barbie', 1991, 1996), 'Barbie run missing or misfiled');
assert(hasRun('Barbie Fashion', 'Barbie', 1991, 1995), 'Barbie Fashion run missing or misfiled');
assert(db.includes('"SER-02066"'), 'Bullseye repair is not in the upgrade-safe migration set');

assert(/data-mode="quick" class="active"/.test(html) && /mode:\s*'quick'/.test(ui) && /setMode\('quick'\)/.test(ui), 'Quick Lookup is not the default');
assert(/id="quickClear"/.test(html) && /quickClear.*clearLookup/.test(ui), 'One-tap Clear is unavailable');
assert(/id="quickAddQueue"/.test(html) && /quickAddQueue.*addLookupToQueue/.test(ui), 'Quick Lookup queue action is unavailable');
for (const module of ['vinyl', 'cd', 'comic', 'instrument', 'treasure', 'station', 'manager']) assert(html.includes(`data-mode="${module}"`), `${module} module is unavailable`);
assert(labels.includes('@page comicPage{size:letter portrait;margin:0}'), 'Comic browser output is not portrait US Letter');
assert(labels.includes('grid-template-columns:repeat(2,3.5in)') && labels.includes('grid-template-rows:repeat(15,.6666667in)') && labels.includes('column-gap:.5in'), 'Comic browser grid is not measured 2 × 15 geometry');
assert(labels.includes("comic: { count: 30, label: 'COMIC 3.50 × 0.667 IN' }"), 'Comic calibration sheet is not 30-up at 3.5 × 0.667 inches');
assert(pdf.includes('comic: { page: LETTER, perPage: 30, cols: 2, rows: 15, w: 3.5 * PT, h: (2 / 3) * PT, x: .5 * PT, y: .5 * PT, gapX: .5 * PT'), 'Comic PDF geometry is not 30-up portrait with measured margins');

console.log(JSON.stringify({
  version: version.version,
  music: music.length,
  comics: comics.length,
  primary: comics.filter(row => row.primary).length,
  subordinate: comics.filter(row => !row.primary).length,
  modernRuns: auditStats.modernAuditRuns,
  historicalRuns: auditStats.historicalAuditRuns,
  supplementFiles: supplementFiles.length,
  supplementRecords: supplement.length,
  uniqueComicIds: comicIds.size,
  uniqueMusicIds: musicIds.size,
  unresolvedParents: unresolved.length,
  representativeRuns: 'PASS',
  applicationRegressionChecks: 'PASS'
}, null, 2));
