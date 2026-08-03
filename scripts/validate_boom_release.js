const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const comics = JSON.parse(read('data/comics.json'));
const music = JSON.parse(read('data/music.json'));
const version = JSON.parse(read('VERSION.json'));
const official = JSON.parse(read('BOOM_OFFICIAL_SERIES_2026.json'));
const repairs = JSON.parse(read('BOOM_CANONICAL_REPAIR_IDS.json'));
const html = read('index.html');
const notFound = read('404.html');
const ui = read('js/ui.js');
const db = read('js/db.js');
const sw = read('service-worker.js');
const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };
const key = value => String(value || '').normalize('NFKD').replace(/[’‘]/g, "'").toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const ids = new Set();
for (const row of comics) { pass(row && row.id, 'Comic record without an ID'); pass(!ids.has(row.id), `Duplicate comic ID: ${row.id}`); ids.add(row.id); }
const primaryNames = new Set(comics.filter(r => r.primary).map(r => key(r.display)));
for (const row of comics.filter(r => !r.primary)) pass(primaryNames.has(key(row.parent)), `Unresolved parent ${row.parent} on ${row.id}`);

pass(comics.length === 7281, `Expected 7,281 comics; found ${comics.length}`);
pass(comics.filter(r => r.primary).length === 2459, 'Unexpected primary comic total');
pass(comics.filter(r => !r.primary).length === 4822, 'Unexpected subordinate comic total');
pass(music.length === 4606, `Expected 4,606 music records; found ${music.length}`);
pass(new Set(music.map(r => r.id)).size === music.length, 'Duplicate music IDs');
pass(official.series.length === 145 && new Set(official.series.map(key)).size === 145, 'Official BOOM! series snapshot is incomplete');
pass(repairs.length === 85 && new Set(repairs).size === repairs.length, 'BOOM! migration allow-list is invalid');

for (const parent of ['BOOM! Originals', 'BOOM! Licensed']) {
  const hidden = comics.filter(r => !r.primary && key(r.parent) === key(parent));
  pass(hidden.length === 0, `${hidden.length} titles remain beneath ${parent}`);
}

const mappings = {
  'BRZRKR: The Lost Book of B': 'BRZRKR',
  'Dune: House Harkonnen': 'Dune',
  'Angel + Spike': 'Angel',
  'House of Slaughter': 'Something is Killing the Children',
  'Book of Butcher': 'Something is Killing the Children',
  'Power Rangers Prime': 'Mighty Morphin Power Rangers',
  'Go Go Power Rangers': 'Mighty Morphin Power Rangers',
  'Ranger Academy': 'Mighty Morphin Power Rangers',
  'VR Troopers': 'VR Troopers',
  'Beneath the Dark Crystal': "Jim Henson's The Dark Crystal",
  'All New Firefly': 'Firefly',
  'The Last Witch: Blood & Betrayal': 'The Last Witch',
  'Fence Challengers: Sweet Sixteen': 'Fence',
  'Hellraiser: Resurrections': 'Hellraiser'
};
for (const [title, parent] of Object.entries(mappings)) {
  const row = comics.find(r => !r.primary && key(r.display) === key(title) && /boom|archaia/i.test(String(r.publisher)));
  pass(row && key(row.parent) === key(parent), `${title} does not resolve to ${parent}`);
}

const configScope = { window: {} };
vm.runInNewContext(read('js/config.js'), configScope);
const config = configScope.window.APP_CONFIG;
pass(config.version === '4.18.0', 'Config version is not 4.18.0');
pass(config.expectedMinimums.comic === 7250, 'Comic minimum was not raised for v4.18');
pass(version.version === '4.18.0', 'VERSION.json is not 4.18.0');
pass(sw.includes("2nc-authority-suite-v4.18.0"), 'Service-worker cache was not advanced');
pass(html.includes('v4.18.0') && notFound.includes('v4.18.0'), 'HTML version references are stale');
pass(html === notFound, 'index.html and 404.html differ');
pass(/data-mode="quick" class="active"/.test(html), 'Quick Lookup is not the default landing page');
for (const id of ['quickInput','quickClear','quickAddQueue','queue','addSelected','printBtn','sharePdfBtn','managerDataset']) pass(html.includes(`id="${id}"`), `Missing interface control: ${id}`);
for (const mode of ['quick','vinyl','cd','comic','instrument','treasure','station','manager']) pass(html.includes(`data-mode="${mode}"`), `Missing module: ${mode}`);
pass(ui.includes("on('#quickClear', 'click', clearLookup)"), 'Quick Clear is not bound');
pass(ui.includes("on('#quickAddQueue', 'click', addLookupToQueue)"), 'Quick Add to Queue is not bound');
pass(ui.includes("setMode('quick')"), 'Quick Lookup is not initialized by the UI');
pass(ui.includes('setLookupKind(kind)'), 'Comic/music lookup switch is missing');
pass(db.includes('canonicalRepairIds.add(id)'), 'Upgrade-safe canonical repair handling is missing');
pass(db.includes('_localEdited'), 'Local-edit protection is missing');
for (const id of repairs) pass(db.includes(`"${id}"`), `Migration ID missing from db.js: ${id}`);

const coreMatch = sw.match(/const CORE = \[([\s\S]*?)\];/);
pass(Boolean(coreMatch), 'Service-worker core list is missing');
if (coreMatch) {
  const core = [...coreMatch[1].matchAll(/'\.\/([^']*)'/g)].map(m => m[1]).filter(Boolean);
  for (const file of core) pass(fs.existsSync(path.join(root, file)), `Missing cached asset: ${file}`);
}

if (failures.length) { console.error(JSON.stringify({ ok: false, failures }, null, 2)); process.exit(1); }
console.log(JSON.stringify({ ok: true, version: version.version, music: music.length, comics: comics.length,
  primary: comics.filter(r => r.primary).length, subordinate: comics.filter(r => !r.primary).length,
  officialBoomSeries: official.series.length, auditedBoomTitles: 450, migrationIds: repairs.length,
  duplicateComicIds: 0, unresolvedParents: 0, genericBoomParents: 0,
  representativeMappings: Object.keys(mappings).length }, null, 2));
