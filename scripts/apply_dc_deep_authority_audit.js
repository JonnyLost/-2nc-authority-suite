const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'data', 'comics.json');
const auditPath = path.join(root, 'DC_DEEP_AUTHORITY_AUDIT.csv');
const rows = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const originalCount = rows.length;
const byId = new Map(rows.map(row => [row.id, row]));
const primaryByName = new Map(rows.filter(row => row.primary).map(row => [String(row.display).toLowerCase(), row]));
const audit = [];
let next = 1;

function nextId(prefix = 'CHR-DCX') {
  let id;
  do id = `${prefix}-${String(next++).padStart(4, '0')}`; while (byId.has(id));
  return id;
}

function addPrimary(name, type = 'Character', level = 'Optional', notes = '') {
  const key = name.toLowerCase();
  if (primaryByName.has(key)) {
    audit.push({ name, kind: type, action: 'Already present', detail: primaryByName.get(key).id });
    return primaryByName.get(key);
  }
  const row = {
    id: nextId(type === 'Event' ? 'EVT-DCX' : type === 'Team' ? 'TEM-DCX' : type === 'Series' || type === 'Anthology' ? 'SER-DCX' : 'CHR-DCX'),
    display: name,
    parent: '',
    series: name,
    primary: true,
    publisher: 'DC',
    type,
    level,
    sort: name,
    printedTitle: name
  };
  if (notes) row.notes = notes;
  rows.push(row);
  byId.set(row.id, row);
  primaryByName.set(key, row);
  audit.push({ name, kind: type, action: 'Added primary authority', detail: row.id });
  return row;
}

function addSeries(title, parent, startYear = '', endYear = '', level = 'Recommended', marker = {}) {
  const duplicate = rows.find(row => !row.primary && String(row.display).toLowerCase() === title.toLowerCase() && String(row.parent).toLowerCase() === parent.toLowerCase());
  if (duplicate) {
    audit.push({ name: title, kind: 'Series', action: 'Already present', detail: duplicate.id });
    return duplicate;
  }
  const row = {
    id: nextId('SER-DCX'), display: title, parent, series: title, primary: false,
    publisher: 'DC', type: 'Series', level, sort: title, printedTitle: title
  };
  if (startYear) row.startYear = startYear;
  if (endYear) row.endYear = endYear;
  if (marker.publishingEra) row.publishingEra = marker.publishingEra;
  if (marker.publishingLine) row.publishingLine = marker.publishingLine;
  rows.push(row);
  byId.set(row.id, row);
  audit.push({ name: title, kind: 'Series', action: 'Added series', detail: `${row.id} -> ${parent}` });
  return row;
}

// The six labels reported during the in-store 97-label production run.
[
  ['Magog', 'Character', 'Recommended'],
  ['Punchline', 'Character', 'Recommended'],
  ['Ragman', 'Character', 'Recommended'],
  ['Robin', 'Character', 'Essential'],
  ['Trinity', 'Character', 'Recommended'],
  ['The Warlord', 'Character', 'Recommended']
].forEach(args => addPrimary(...args));

addSeries('Magog', 'Magog', '2009', '2010');
addSeries('Punchline: The Gotham Game', 'Punchline', '2022', '2023', 'Recommended', { publishingEra: 'Infinite Frontier' });
addSeries('Ragman', 'Ragman', '1976', '1977');
addSeries('Ragman: Cry of the Dead', 'Ragman', '1993', '1994');
addSeries('Ragman', 'Ragman', '2017', '2018', 'Recommended', { publishingEra: 'Rebirth' });
addSeries('The Warlord', 'The Warlord', '1976', '1988', 'Essential');
addSeries('Warlord', 'The Warlord', '2006', '2007');
addSeries('Warlord', 'The Warlord', '2009', '2010');

// Every parent referenced by a DC series must resolve to a primary authority.
const eventParents = new Set(['Convergence', 'Future State', 'Flashpoint', 'Final Crisis', 'Countdown to Final Crisis', 'Dark Nights: Metal', 'Forever Evil', '52', 'Brightest Day']);
const teamParents = new Set(['Batgirls']);
const referencedParents = [...new Set(rows.filter(row => !row.primary && row.parent && /DC|Vertigo|WildStorm|Milestone/i.test(row.publisher || '')).map(row => row.parent))];
referencedParents.forEach(parent => addPrimary(parent, eventParents.has(parent) ? 'Event' : teamParents.has(parent) ? 'Team' : 'Character', eventParents.has(parent) ? 'Recommended' : 'Optional', 'Added during orphan-parent repair.'));

// DC's current official character directory, excluding alternate Earth/place pages.
// Existing authorities are retained; missing names become searchable optional dividers.
const officialCharacters = [
  'Alan Scott','Alfred Pennyworth','Amanda Waller','Amethyst','Anarky','Anti-Monitor','Antiope','Ares','Arsenal','Atlanna','Atom','Atom Smasher','Atrocitus','Bane','Beast Boy','Big Barda',
  'Bizarro','Black Adam','Black Mask','Black Manta','Blackguard','Bloodsport','Brainiac','Bumblebee','Calendar Man','Captain Boomerang','Captain Cold','Captain Marvel Jr.','Carmine Falcone','Cassandra Cain',
  'Cheshire','Clayface','Creature Commandos','Cyclone','Damian Wayne','Damien Darhk','Darkseid','Dead Boy Detectives','Deadman','Deadshot','Deimos','Doctor Cyber','Doctor Psycho','Doctor Sivana','Donna Troy','Doomsday',
  'Dreamer','Duke of Deception','El Diablo','Enchantress','Engineer','Etta Candy','Eve Coffin','FBP: Federal Bureau of Physics','Galaxy','Giganta','Gorilla Grodd','Granny Goodness','Green Lantern Corps',
  'Guy Gardner','H.I.V.E.','Harbinger','Harley Quinn','Harvey Bullock','Hawk and Dove','Hawkgirl','Heat Wave','Hinterkind','Hippolyta','Hush','Iris West','Jackson Hyde','James Gordon','Javelin','Jay Garrick','Jesse Custer',
  'Jessica Cruz','Jimmy Olsen','John Stewart','Jon Kent','Katana','Kid Flash','Killer Croc','Killer Frost','King Shark','Krypto','Lady Shiva','Lex Luthor','Lightning','Lobo','Lois Lane','Lucius Fox',
  'Mary Bromfield','Maxwell Lord','Mera','Mister Freeze','Mister Miracle','Mister Terrific','Mongal','Monitor','Morpheus','Nereus','New Gods','Nuidis Vulko','O.M.A.C.','Ocean Master','Pandora','Peacemaker',
  'Penguin','Perry White','Polka-Dot Man','Psycho-Pirate',"Ra's al Ghul",'Ratcatcher','Raven','Red Arrow','Renee Montoya','Reverse-Flash','Rick Flag','Riddler','Robin','Sal Maroni','Savant','Scarecrow',
  'Seven Deadly Sins','Shazam Family','Signal','Simon Baz','Simon Stagg','Sinestro','Solomon Grundy','Starfire','Stargirl','Starro','Stephanie Brown','Stephen Shin','Steppenwolf','Steve Trevor','Superboy',
  'T.D.K.','Talia al Ghul','Tawky Tawny','Telos','The Cheetah','The Joker','The Phantom Stranger','Thinker','Thomas Curry','Thunder','Tim Drake','Titans','Trigon','Two-Face','Vandal Savage','Veronica Cale','Vibe',
  'Victor Zsasz','Weasel','Wizard Shazam','Wonder Girl','Zod','Zoom'
];
const teams = new Set(['Creature Commandos','Dead Boy Detectives','Green Lantern Corps','H.I.V.E.','New Gods','Seven Deadly Sins','Shazam Family','Titans']);
officialCharacters.forEach(name => addPrimary(name, teams.has(name) ? 'Team' : 'Character', 'Optional', 'Verified against DC official character directory.'));

// Classic, cult, anthology, and short-lived DC series that are useful as store dividers.
const classicSeries = [
  'Amethyst, Princess of Gemworld','Arak, Son of Thunder','Arion, Lord of Atlantis','Bat Lash','Beowulf: Dragon Slayer','Black Orchid','Blue Devil','Captain Carrot and His Amazing Zoo Crew!','Captain Comet',
  'Chase','Chronos','Claw the Unconquered','Doorway to Nightmare','Ghosts','Gotham Central','House of Mystery','House of Secrets','I...Vampire','L.E.G.I.O.N.','Madame Xanadu','Major Bummer','Man-Bat','Mazing Man',
  'Primal Force','R.E.B.E.L.S.','Resurrection Man','Scare Tactics','Slash Maraud','Sovereign Seven','Stalker','Strange Adventures','Sword of Sorcery','Tailgunner Jo','The Creeper','The Demon','The Heckler','The Omega Men',
  'Thriller','Unknown Soldier','Vext','Weird Mystery Tales','Xero','Young Heroes in Love'
];
classicSeries.forEach(name => addPrimary(name, /House|Ghosts|Strange Adventures|Weird Mystery Tales/.test(name) ? 'Anthology' : 'Series', 'Optional', 'Classic/cult DC publication authority.'));

// Repair the Robin family filing without disturbing event-branded tie-ins.
rows.forEach(row => {
  if (!row.primary && row.parent === 'Robin / Teen Titans' && ['Robin', 'Robin: Son of Batman', 'We Are Robin'].includes(row.series)) {
    row.parent = 'Robin';
    audit.push({ name: row.display, kind: 'Series', action: 'Reparented', detail: `${row.id} -> Robin` });
  }
});

rows.sort((a, b) => String(a.sort || a.display || '').localeCompare(String(b.sort || b.display || '')) || String(a.id).localeCompare(String(b.id)));
fs.writeFileSync(dataPath, `${JSON.stringify(rows, null, 2)}\n`);

const quote = value => `"${String(value || '').replace(/"/g, '""')}"`;
const csv = ['Name,Kind,Action,Detail', ...audit.map(row => [row.name, row.kind, row.action, row.detail].map(quote).join(','))].join('\n');
fs.writeFileSync(auditPath, `${csv}\n`);

const primaryNames = new Set(rows.filter(row => row.primary).map(row => row.display));
const orphanParents = [...new Set(rows.filter(row => !row.primary && row.parent && !primaryNames.has(row.parent)).map(row => row.parent))];
console.log(JSON.stringify({ originalCount, finalCount: rows.length, added: rows.length - originalCount, auditRows: audit.length, orphanParents }, null, 2));
