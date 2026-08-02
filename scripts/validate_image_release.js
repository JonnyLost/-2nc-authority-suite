const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const comics = JSON.parse(read('data/comics.json'));
const music = JSON.parse(read('data/music.json'));
const version = JSON.parse(read('VERSION.json'));
const official = JSON.parse(read('IMAGE_OFFICIAL_SERIES_2026.json'));
const repairs = JSON.parse(read('IMAGE_CANONICAL_REPAIR_IDS.json'));
const html = read('index.html');
const notFound = read('404.html');
const ui = read('js/ui.js');
const db = read('js/db.js');
const sw = read('service-worker.js');

const failures = [];
const pass = (condition, message) => { if (!condition) failures.push(message); };
const key = value => String(value || '').normalize('NFKD').replace(/[’‘]/g, "'").toLowerCase().replace(/\s+/g, ' ').trim();

const ids = new Set();
for (const record of comics) {
  pass(record && record.id, 'Comic record without an ID');
  pass(!ids.has(record.id), `Duplicate comic ID: ${record.id}`);
  ids.add(record.id);
}
const primaryNames = new Set(comics.filter(row => row.primary).map(row => key(row.display)));
for (const record of comics.filter(row => !row.primary)) pass(primaryNames.has(key(record.parent)), `Unresolved parent ${record.parent} on ${record.id}`);

pass(comics.length === 6521, `Expected 6,521 comics; found ${comics.length}`);
pass(comics.filter(row => row.primary).length === 2072, 'Unexpected primary comic total');
pass(comics.filter(row => !row.primary).length === 4449, 'Unexpected subordinate comic total');
pass(music.length === 4606, `Expected 4,606 music records; found ${music.length}`);
pass(new Set(music.map(row => row.id)).size === music.length, 'Duplicate music IDs');
pass(official.series.length === 724, 'Official Image catalog snapshot is incomplete');
pass(repairs.length === 134 && new Set(repairs).size === repairs.length, 'Image migration allow-list is invalid');

const broadParents = [
  'Image Comics','Image Central','Skybound','Top Cow','Top Cow Productions','Shadowline',
  'Todd McFarlane Productions','Massive-Verse','Extreme Studios','Awesome Comics','Highbrow Entertainment'
];
for (const parent of broadParents) {
  const hidden = comics.filter(row => !row.primary && key(row.parent) === key(parent) && key(row.display) !== key(parent));
  pass(hidden.length === 0, `${hidden.length} titles remain beneath generic ${parent}`);
}

const mappings = {
  'Geiger': 'Geiger',
  'Junkyard Joe': 'Junkyard Joe',
  'Rook: Exodus': 'Rook: Exodus',
  'Sisterhood A Hyde Street Story': 'Hyde Street',
  'Gunslinger Spawn': 'Spawn',
  'King Spawn': 'Spawn',
  'Rat City': 'Spawn',
  'The Scorched': 'Spawn',
  'Clementine': 'The Walking Dead',
  'The Walking Dead Deluxe': 'The Walking Dead',
  'Invincible Universe': 'Invincible',
  'G.I. Joe A Real American Hero': 'G.I. Joe',
  'Transformers': 'Transformers',
  'Void Rivals': 'Void Rivals',
  'Aphrodite': 'Aphrodite IX',
  'Cyberforce': 'Cyberforce',
  'Witchblade': 'Witchblade',
  'Darkness Accursed': 'The Darkness',
  "Jupiter's Circle": "Jupiter's Legacy",
  'Radiant Pink': 'Radiant Pink',
  'Supermassive': 'Supermassive',
  'Universal Monsters: Dracula': 'Universal Monsters: Dracula',
  'Astro City': 'Astro City',
  'Powers': 'Powers',
  'Fear Agent': 'Fear Agent'
};
for (const [title, parent] of Object.entries(mappings)) {
  const rows = comics.filter(row => !row.primary && key(row.display) === key(title));
  const image = rows.find(row => key(row.publisher) === 'image') || rows[0];
  pass(image && key(image.parent) === key(parent), `${title} does not resolve to ${parent}`);
}

const configScope = { window: {} };
vm.runInNewContext(read('js/config.js'), configScope);
const config = configScope.window.APP_CONFIG;
pass(config.version === '4.17.0', 'Config version is not 4.17.0');
pass(config.expectedMinimums.comic === 6500, 'Comic minimum was not raised for v4.17');
pass(version.version === '4.17.0', 'VERSION.json is not 4.17.0');
pass(sw.includes("2nc-authority-suite-v4.17.0"), 'Service-worker cache was not advanced');
pass(html.includes('v4.17.0') && notFound.includes('v4.17.0'), 'HTML version references are stale');
pass(html === notFound, 'index.html and 404.html differ');
pass(/data-mode="quick" class="active"/.test(html), 'Quick Lookup is not the default landing page');
for (const id of ['quickInput','quickClear','quickAddQueue','queue','addSelected','printBtn','sharePdfBtn','managerDataset']) pass(html.includes(`id="${id}"`), `Missing interface control: ${id}`);
for (const mode of ['quick','vinyl','cd','comic','instrument','treasure','station','manager']) pass(html.includes(`data-mode="${mode}"`), `Missing module: ${mode}`);
pass(ui.includes("on('#quickClear', 'click', clearLookup)"), 'Quick Clear is not bound');
pass(ui.includes("on('#quickAddQueue', 'click', addLookupToQueue)"), 'Quick Add to Queue is not bound');
pass(ui.includes("setMode('quick')"), 'Quick Lookup is not initialized by the UI');
pass(ui.includes("setLookupKind(kind)"), 'Comic/music lookup switch is missing');
pass(db.includes('canonicalRepairIds.add(id)'), 'Upgrade-safe canonical repair handling is missing');
pass(db.includes('_localEdited'), 'Local-edit protection is missing');

const coreMatch = sw.match(/const CORE = \[([\s\S]*?)\];/);
pass(Boolean(coreMatch), 'Service-worker core list is missing');
if (coreMatch) {
  const core = [...coreMatch[1].matchAll(/'\.\/([^']*)'/g)].map(match => match[1]).filter(Boolean);
  for (const file of core) pass(fs.existsSync(path.join(root, file)), `Missing cached asset: ${file}`);
}

if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({
  ok: true,
  version: version.version,
  music: music.length,
  comics: comics.length,
  primary: comics.filter(row => row.primary).length,
  subordinate: comics.filter(row => !row.primary).length,
  officialImageSeries: official.series.length,
  migrationIds: repairs.length,
  duplicateComicIds: 0,
  unresolvedParents: 0,
  genericImageParents: 0,
  representativeMappings: Object.keys(mappings).length
}, null, 2));
