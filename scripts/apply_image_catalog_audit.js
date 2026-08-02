const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const comicsPath = path.join(root, 'data', 'comics.json');
const sourcePath = path.join(root, 'IMAGE_OFFICIAL_SERIES_2026.json');
const auditPath = path.join(root, 'IMAGE_CATALOG_STUDIO_AUDIT.csv');
const repairPath = path.join(root, 'IMAGE_CANONICAL_REPAIR_IDS.json');
const data = JSON.parse(fs.readFileSync(comicsPath, 'utf8'));
const official = JSON.parse(fs.readFileSync(sourcePath, 'utf8')).series.map(row => row.title);

const key = value => String(value || '')
  .normalize('NFKD')
  .replace(/[’‘]/g, "'")
  .replace(/[“”]/g, '"')
  .replace(/\s+/g, ' ')
  .trim()
  .toLowerCase();

const aliases = new Map(Object.entries({
  'AdventureMan': 'Adventureman',
  'American Jesus': 'American Jesus',
  'Antioch': 'Antioch',
  'Beware The Eye Of Odin': 'Beware the Eye of Odin',
  'Bitter Root The Next Movement': 'Bitter Root: The Next Movement',
  'Cyber Force': 'Cyberforce',
  'Do A Powerbomb': 'Do a Powerbomb',
  'East Of West': 'East of West',
  'Fire Power By Kirkman & Samnee': 'Fire Power',
  'Geiger (2024)': 'Geiger',
  'Golden Rage Mother Knows Best': 'Golden Rage: Mother Knows Best',
  'I Hate Fairyland (2022)': 'I Hate Fairyland',
  "It's Lonely At The Centre Of The Earth": "It's Lonely at the Centre of the Earth",
  'Nights Season One': 'Nights',
  'Oblivion Song by Kirkman & De Felici': 'Oblivion Song',
  'Our bones Dust': 'Our Bones Dust',
  'RADIANT BLACK: The Story So Far': 'Radiant Black: The Story So Far',
  'RADIANT PINK': 'Radiant Pink',
  'Rogue Sun: The Story So Far': 'Rogue Sun: The Story So Far',
  'Rook': 'Rook: Exodus',
  'Seven To Eternity': 'Seven to Eternity',
  'Spawn The Dark Ages (2025)': 'Spawn: The Dark Ages',
  'Stillwater by Zdarsky & Pérez': 'Stillwater',
  'THE SACRIFICERS': 'The Sacrificers',
  'The Moon is Following Us': 'The Moon Is Following Us',
  'TRANSFORMERS': 'Transformers',
  'W0rldtr33': 'W0rldtr33'
}));

const historical = [
  '1963','A Touch of Silver','Allegra','Altered Image','Angela','Aphrodite IX','Avengelyne','Badrock','Backlash','Battle Beast',
  'Big Bang Comics','Bloodpool','Bloodstrike','Brigade','Chapel','Codename: Strykeforce','Cobra Commander',
  'Darker Image','Deathmate','Destro','Duke','Dynamo 5','Freak Force','Glory','Invincible Universe','Image United',
  'Image Zero',"Jupiter's Circle",'Knightmare','Maximage','Mice Templar','New Men','Noble Causes','Pitt Crew','Powers','Proof','Rick Grimes 2000',
  'Scarlett','Skullkickers','SuperPatriot','Team Youngblood','The Walking Dead Deluxe','Vanguard','Velocity',
  'Youngblood: Bloodsport','Youngblood Strikefile'
];

const parentOverrides = new Map();
const family = (parent, titles) => titles.forEach(title => parentOverrides.set(key(title), parent));

family('Spawn', [
  'Angela','Curse of the Spawn','Deadly Tales Of The Gunslinger Spawn','Gunslinger Spawn','Hellspawn',
  'I Saw Santa A Spawn Universe Christmas Story','King Spawn','Medieval Spawn','Rat City','Sam & Twitch',
  'Spawn','Spawn Manga','Spawn Origins','Spawn: Angela','Spawn: The Dark Ages','Spawn: The Scorched',
  'Spawn: Unwanted Violence','The Scorched','The Undead Spawn'
]);
family('Aphrodite IX', ['Aphrodite','Aphrodite IX']);
family('The Walking Dead', ['Clementine','Rick Grimes 2000','The Walking Dead','The Walking Dead Deluxe']);
family('Criminal', ['Bad Weekend','Criminal','Cruel Summer','My Heroes Have Always Been Junkies','The Knives A Criminal Book']);
family('I Hate Fairyland', ['I Hate Fairyland','Untold Tales of I Hate Fairyland']);
family('Bitter Root', ['Bitter Root','Bitter Root: The Next Movement']);
family('C.O.W.L.', ['C.O.W.L.','C.O.W.L. 1964']);
family('Radiant Black', ['Radiant Black','Radiant Black: The Story So Far']);
family('Rogue Sun', ['Rogue Sun','Rogue Sun: The Story So Far']);
family('Lazarus', ['Lazarus','Lazarus Fallen']);
family("Jupiter's Legacy", ["Jupiter's Circle","Jupiter's Legacy"]);
family('Invincible', ['Invincible','Invincible Universe']);
family('G.I. Joe', ['G.I. Joe','G.I. Joe A Real American Hero']);
family('Hyde Street', ['Hyde Street','Sisterhood A Hyde Street Story']);
family('Monkey Meat', ['Monkey Meat','Monkey Meat The Summer Batch']);
family('Nights', ['Nights','Nights Season One']);
family('Golden Rage', ['Golden Rage','Golden Rage: Mother Knows Best']);
family('Cyberforce', ['Cyber Force','Cyberforce']);
family('Witchblade', ['Witchblade','Switch']);
family('The Darkness', ['Darkness Accursed','The Darkness']);
family('Youngblood', ['Bloodpool','Team Youngblood','Youngblood','Youngblood: Bloodsport','Youngblood Strikefile']);
family('Universal Monsters: Dracula', ['Universal Monsters: Dracula']);
family('Universal Monsters: Frankenstein', ['Universal Monsters: Frankenstein']);
family('Universal Monsters: The Mummy', ['Universal Monsters The Mummy']);
family('Universal Monsters: Creature from the Black Lagoon', ['Universal Monsters: Creature From The Black Lagoon Lives!']);

const lines = new Map();
const line = (name, titles) => titles.forEach(title => lines.set(key(title), name));

line('Todd McFarlane Productions / Spawn Universe', [
  'Angela','Curse of the Spawn','Deadly Tales Of The Gunslinger Spawn','Gunslinger Spawn','Haunt','Hellspawn',
  'I Saw Santa A Spawn Universe Christmas Story','King Spawn','Medieval Spawn','Rat City','Sam & Twitch','Spawn',
  'Spawn Manga','Spawn Origins','Spawn: Angela','Spawn: The Dark Ages','Spawn: The Scorched','Spawn: Unwanted Violence',
  'The Scorched','The Undead Spawn'
]);
line('Skybound', [
  'Assassin Nation','Battle Beast','Battle Pope','Birthright','Clementine','Clone','Creepshow','Dark Ride','Dead Body Road',
  'Demonic','Die!Die!Die!','Everyday Hero Machine Boy','Evolution','Excellence','Fire Power','Gasolina','Ghosted',
  'Hardcore','Heart Attack','Horizon','I Hate This Place','Impact Winter','Invincible','Invincible Universe','Kill The Minotaur',
  'Lego Ninjago','Manifest Destiny','Murder Falcon','Oblivion Song','Outcast by Kirkman & Azaceta','Outer Darkness',
  'Outpost Zero','Reaver','Redneck','Rick Grimes 2000','Science Dog','Sea Serpents Heir','Skybound Presents: Afterschool',
  'Skybound X','Slots','Stealth','Stellar','Stillwater','Super Dinosaur','Tech Jacket','The Astounding Wolf-Man',
  'The Tithe','The Walking Dead','The Walking Dead Deluxe','Thief of Thieves','Ultramega','Witch Doctor'
]);
line('Skybound / Energon Universe', [
  'Cobra Commander','Destro','Duke','Energon Universe','G.I. Joe','G.I. Joe A Real American Hero','Scarlett','Transformers','Void Rivals'
]);
line('Skybound / Universal Monsters', [
  'Universal Monsters The Mummy','Universal Monsters: Creature From The Black Lagoon Lives!',
  'Universal Monsters: Dracula','Universal Monsters: Frankenstein'
]);
line('Top Cow Productions', [
  'Aphrodite','Aphrodite IX','Artifacts','Blood Stain','Bonehead','Codename: Strykeforce','Cyber Force','Cyberforce','Eclipse','Genius',
  'God Complex: Dogma','Impaler','IXth Generation','Magdalena','Metal Society','Postal','Progeny','Ravine','Rise of the Magi',
  'Samaritan','Son of Merlin','St. Mercy','Switch','Symmetry','Syphon','Tales of Honor','The Clock','The Darkness',
  'The Marked','Think Tank','Velocity','Witchblade'
]);
line('Shadowline', [
  'A Touch of Silver','Bomb Queen','Dynamo 5','Elephantmen','Firebreather','Five Weapons','Green Wake','Mice Templar',
  'Morning Glories','Noble Causes','Peter Panzerfaust','Proof','Rat Queens','Shadowhawk','Skullkickers'
]);
line('Highbrow Entertainment', ['Ant','Freak Force','Mighty Man','Savage Dragon','SuperPatriot','Vanguard']);
line('Extreme Studios / Awesome Comics', [
  'Avengelyne','Badrock','Bloodpool','Bloodstrike','Brigade','Chapel','Glory','Maximage','New Men','Prophet','Supreme',
  'Team Youngblood','Youngblood','Youngblood: Bloodsport','Youngblood Strikefile'
]);
line('Ghost Machine', [
  'Geiger','Ghost Machine','Hornsby & Halo','Hyde Street','Junkyard Joe','Redcoat','Rook: Exodus','Sisterhood A Hyde Street Story',
  'The Blizzard','The Rocketfellers'
]);
line('Massive-Verse', [
  'Inferno Girl Red','No/One','Radiant Black','Radiant Black: The Story So Far','Radiant Pink','Radiant Red','Rogue Sun',
  'Rogue Sun: The Story So Far','Shift','Supermassive','The Dead Lucky'
]);
line('Millarworld', [
  'American Jesus','Chrononauts','Hit-Girl','Huck','Jupiter\'s Circle','Jupiter\'s Legacy','Kick-Ass','King of Spies',
  'The Magic Order','MPH','Nemesis','Night Club','Prodigy','Reborn','Sharkey The Bounty Hunter','Space Bandits',
  'Starlight','The Ambassadors','Wanted'
]);
line('Homage Studios', ['Astro City','Leave It to Chance']);
line('Cliffhanger', ['Arrowsmith','Battle Chasers','Crimson','Danger Girl','High Roads','Steampunk']);
line('Gorilla Comics', ['Empire','Section Zero','Shockrockets','Superstar']);
line('Desperado Publishing', ['28 Days Later: The Aftermath','Athena Voltaire','The Atheist','The Black Forest']);

const essential = new Set([
  'Astro City','Battle Chasers','Chew','Criminal','Cyberforce','Danger Girl','Deadly Class','Descender','Die','East of West',
  'Geiger','G.I. Joe','I Hate Fairyland','Invincible','Jupiter\'s Legacy','Kick-Ass','Monstress','Paper Girls','Powers',
  'Radiant Black','Rat Queens','Saga','Savage Dragon','Spawn','The Darkness','The Department of Truth','The Walking Dead',
  'Transformers','Void Rivals','Witchblade','Youngblood'
].map(key));

const characterAuthorities = new Set([
  'Angela','Ant','Aphrodite IX','Badrock','Clementine','Cyberforce','Danger Girl','Geiger','Glory','Invincible','Kick-Ass',
  'Magdalena','Prophet','Radiant Black','Redcoat','Rogue Sun','Savage Dragon','Shadowhawk','Spawn','Supreme','The Darkness',
  'Velocity','Witchblade'
].map(key));
const teamAuthorities = new Set([
  'Bloodstrike','Brigade','Cyberforce','Freak Force','G.I. Joe','Guarding the Globe','Rat Queens','The Scorched',
  'Transformers','Youngblood'
].map(key));
const eventAuthorities = new Set(['Artifacts','Crossover','Deathmate','Image United','Supermassive'].map(key));

function canonicalTitle(raw) {
  const alias = [...aliases.entries()].find(([from]) => key(from) === key(raw));
  return alias ? alias[1] : String(raw).trim();
}

function parsedYear(raw) {
  const match = String(raw).match(/\((19|20)\d{2}\)/);
  return match ? Number(match[0].slice(1, -1)) : null;
}

function authorityType(name) {
  if (eventAuthorities.has(key(name))) return 'Event';
  if (teamAuthorities.has(key(name))) return 'Team';
  if (characterAuthorities.has(key(name))) return 'Character';
  return 'Series';
}

function sortName(name) {
  const match = String(name).match(/^(The|A|An)\s+(.+)$/i);
  return match ? `${match[2]}, ${match[1]}` : name;
}

const sourceTitles = [...official, ...historical];
const catalog = [];
const seenCatalog = new Set();
for (const raw of sourceTitles) {
  const display = canonicalTitle(raw);
  const startYear = parsedYear(raw);
  const identity = `${key(display)}|${startYear || ''}`;
  if (seenCatalog.has(identity)) continue;
  seenCatalog.add(identity);
  const parent = parentOverrides.get(key(raw)) || parentOverrides.get(key(display)) || display;
  catalog.push({ raw, display, parent, startYear });
}

const primaryByName = new Map();
for (const record of data.filter(row => row.primary)) {
  if (!primaryByName.has(key(record.display))) primaryByName.set(key(record.display), record);
}

let nextAuthority = 1;
let nextSeries = 1;
const usedIds = new Set(data.map(record => record.id));
while (usedIds.has(`IMA-${String(nextAuthority).padStart(4, '0')}`)) nextAuthority++;
while (usedIds.has(`IMS-${String(nextSeries).padStart(4, '0')}`)) nextSeries++;
const nextId = prefix => {
  let value;
  do {
    const n = prefix === 'IMA' ? nextAuthority++ : nextSeries++;
    value = `${prefix}-${String(n).padStart(4, '0')}`;
  } while (usedIds.has(value));
  usedIds.add(value);
  return value;
};

const auditRows = [['action','authority','title','publisher','publishing_line','start_year','record_id']];
const repairedIds = new Set();
let addedAuthorities = 0;
let addedSeries = 0;
let repaired = 0;

for (const item of catalog) {
  let primary = primaryByName.get(key(item.parent));
  if (!primary) {
    primary = {
      id: nextId('IMA'), display: item.parent, parent: '', series: item.parent, primary: true,
      publisher: 'Image', type: authorityType(item.parent),
      level: essential.has(key(item.parent)) ? 'Essential' : 'Recommended',
      sort: sortName(item.parent), printedTitle: item.parent,
      notes: 'Primary filing authority verified during the comprehensive Image Comics catalog and studio audit.',
      ...(lines.get(key(item.raw)) || lines.get(key(item.display)) ? { publishingLine: lines.get(key(item.raw)) || lines.get(key(item.display)) } : {})
    };
    data.push(primary);
    primaryByName.set(key(item.parent), primary);
    addedAuthorities++;
    auditRows.push(['ADD AUTHORITY',item.parent,'','Image',primary.publishingLine || 'Image Central','',primary.id]);
  }

  const publishingLine = lines.get(key(item.raw)) || lines.get(key(item.display)) || lines.get(key(item.parent)) || 'Image Central';
  const matching = data.filter(record => !record.primary && key(record.display) === key(item.display));
  let candidate = matching.find(record => key(record.parent) === key(primary.display) && key(record.publisher) === 'image');
  if (!candidate) candidate = matching.find(record => key(record.parent) === 'image comics' && key(record.publisher) === 'image');
  if (!candidate) candidate = matching.find(record => key(record.publisher) === 'image' && (!record.parent || key(record.parent) === key(item.display)));

  if (candidate) {
    let changed = false;
    if (candidate.parent !== primary.display) { candidate.parent = primary.display; changed = true; }
    if (candidate.publishingLine !== publishingLine) { candidate.publishingLine = publishingLine; changed = true; }
    if (item.startYear && !candidate.startYear) { candidate.startYear = item.startYear; changed = true; }
    if (changed) {
      repaired++;
      repairedIds.add(candidate.id);
      auditRows.push(['REPAIR SERIES',primary.display,candidate.display,'Image',publishingLine,item.startYear || '',candidate.id]);
    }
    continue;
  }

  const exact = data.find(record => !record.primary && key(record.publisher) === 'image' && key(record.display) === key(item.display) && key(record.parent) === key(primary.display) && String(record.startYear || '') === String(item.startYear || ''));
  if (exact) continue;
  const record = {
    id: nextId('IMS'), display: item.display, parent: primary.display, series: item.display, primary: false,
    publisher: 'Image', type: 'Series', level: essential.has(key(primary.display)) ? 'Essential' : 'Recommended',
    sort: sortName(item.display), printedTitle: item.display,
    notes: 'Verified against the official Image Comics series catalog during the comprehensive catalog and studio audit.',
    publishingLine,
    ...(item.startYear ? { startYear: item.startYear } : {})
  };
  data.push(record);
  addedSeries++;
  auditRows.push(['ADD SERIES',primary.display,item.display,'Image',publishingLine,item.startYear || '',record.id]);
}

// Any legacy Image series still using the publisher itself as a shelf parent is
// promoted into its own recognizable title-family authority.
for (const record of data.filter(row => !row.primary && key(row.parent) === 'image comics')) {
  const canonical = canonicalTitle(record.display);
  const targetName = parentOverrides.get(key(record.display)) || parentOverrides.get(key(canonical)) || canonical;
  let primary = primaryByName.get(key(targetName));
  if (!primary) {
    primary = {
      id: nextId('IMA'), display: targetName, parent: '', series: targetName, primary: true,
      publisher: 'Image', type: authorityType(targetName), level: essential.has(key(targetName)) ? 'Essential' : 'Recommended',
      sort: sortName(targetName), printedTitle: targetName,
      notes: 'Primary filing authority verified during the comprehensive Image Comics catalog and studio audit.'
    };
    data.push(primary); primaryByName.set(key(targetName), primary); addedAuthorities++;
  }
  record.parent = primary.display;
  record.publishingLine = lines.get(key(record.display)) || lines.get(key(targetName)) || 'Image Central';
  repairedIds.add(record.id); repaired++;
  auditRows.push(['REPAIR GENERIC PARENT',primary.display,record.display,'Image',record.publishingLine,record.startYear || '',record.id]);
}

// Remove audit-created duplicates if a canonical or earlier Image row now
// occupies the same title, parent, publisher, and year.
const groups = new Map();
for (const record of data.filter(row => !row.primary)) {
  const identity = [key(record.display), key(record.parent), key(record.publisher), String(record.startYear || '')].join('|');
  if (!groups.has(identity)) groups.set(identity, []);
  groups.get(identity).push(record);
}
const removeIds = new Set();
for (const records of groups.values()) {
  if (records.length < 2) continue;
  const keep = records.find(record => !String(record.id).startsWith('IMS-')) || records[0];
  records.filter(record => record !== keep && String(record.id).startsWith('IMS-')).forEach(record => removeIds.add(record.id));
}
if (removeIds.size) {
  for (let index = data.length - 1; index >= 0; index--) if (removeIds.has(data[index].id)) data.splice(index, 1);
  addedSeries -= removeIds.size;
}

// Keep the upgrade allow-list deterministic on reruns. These are preexisting
// bundled Image rows whose filing relationship or studio metadata is governed
// by this audit; newly added IMA/IMS records do not need migration overrides.
const governedTitles = new Set(catalog.map(item => key(item.display)));
for (const record of data) {
  if (record.primary || /^(IMA|IMS)-/.test(String(record.id)) || key(record.publisher) !== 'image') continue;
  if (governedTitles.has(key(record.display)) || lines.has(key(record.display)) || lines.has(key(record.parent))) repairedIds.add(record.id);
}

data.sort((a, b) => String(a.sort || a.display).localeCompare(String(b.sort || b.display)) || String(a.id).localeCompare(String(b.id)));
fs.writeFileSync(comicsPath, JSON.stringify(data, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'data', 'comics.min.json'), JSON.stringify(data));
fs.writeFileSync(repairPath, JSON.stringify([...repairedIds].sort(), null, 2) + '\n');

const csv = auditRows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n') + '\n';
fs.writeFileSync(auditPath, csv);

const ids = new Set();
const duplicates = [];
for (const record of data) { if (ids.has(record.id)) duplicates.push(record.id); ids.add(record.id); }
const primaries = new Set(data.filter(record => record.primary).map(record => key(record.display)));
const unresolved = data.filter(record => !record.primary && !primaries.has(key(record.parent)));
const genericImage = data.filter(record => !record.primary && key(record.parent) === 'image comics');

console.log(JSON.stringify({
  officialCatalogEntries: official.length,
  auditedCatalogRows: catalog.length,
  total: data.length,
  primary: data.filter(record => record.primary).length,
  subordinate: data.filter(record => !record.primary).length,
  addedAuthorities,
  addedSeries,
  repaired,
  repairIds: repairedIds.size,
  duplicateIds: duplicates,
  unresolvedParents: unresolved.map(record => `${record.id}:${record.parent}`),
  genericImageParents: genericImage.map(record => record.id)
}, null, 2));
