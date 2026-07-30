const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const dataPath = path.join(root, 'data', 'comics.json');
const auditPath = path.join(root, 'DC_PUBLISHING_LINE_AUDIT.csv');
const records = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Make the audit deterministic and safe to rerun during release verification.
for (const record of records) delete record.publishingLine;

const titleSets = {
  'Vertigo': new Set([
    '100 Bullets', '100 Bullets: The US of Anger', 'American Vampire',
    'Bleeding Hearts', 'DMZ', 'End of Life', 'Fables', 'Hellblazer',
    'Preacher', 'Sandman Mystery Theatre', 'Scalped', 'Shade, the Changing Man',
    'Sweet Tooth', 'The Invisibles', 'The Nice House by the Sea',
    'Transmetropolitan', 'Y: The Last Man'
  ]),
  'Black Label': new Set([
    'American Vampire 1976', 'Aquaman: Andromeda', 'Batman: Beyond the White Knight',
    'Batman: Curse of the White Knight', 'Batman: Damned', 'Batman: Last Knight on Earth',
    'Batman: One Dark Knight', 'Batman: Three Jokers',
    'Batman: White Knight', 'Batman: White Knight Presents: Harley Quinn',
    'Catwoman: Lonely City', 'Danger Street', 'Harleen', 'Hellblazer: Rise and Fall',
    'Joker/Harley: Criminal Sanity', 'Peacemaker Tries Hard!', 'Rogues', 'Rorschach',
    'Strange Adventures', 'Superman: Year One', 'The Human Target',
    'The Nice House on the Lake', 'The Question: The Deaths of Vic Sage',
    'Wonder Woman: Dead Earth'
  ]),
  'Young Animal': new Set([
    'Bug! The Adventures of Forager', 'Cave Carson Has a Cybernetic Eye',
    'Cave Carson Has an Interstellar Eye', 'Collapser', 'Doom Patrol',
    'Doom Patrol: Weight of the Worlds', 'Eternity Girl', 'Far Sector',
    'Milk Wars', 'Mother Panic', 'Mother Panic: Gotham A.D.',
    'Shade, the Changing Girl', 'Shade, the Changing Woman'
  ]),
  'Sandman Universe': new Set([
    'Books of Magic', 'House of Whispers', 'John Constantine, Hellblazer',
    'John Constantine, Hellblazer: Dead in America', 'Lucifer',
    'The Dreaming', 'The Dreaming: Waking Hours', 'The Sandman Universe',
    'The Sandman Universe: Nightmare Country',
    'The Sandman Universe: Nightmare Country – The Glass House'
  ]),
  'Milestone': new Set([
    'Blood Syndicate: Season One', 'Duo', 'Hardware: Season One',
    'Icon and Rocket: Season One', 'Icon vs. Hardware', 'Static: Season One',
    'Static: Shadows of Dakota'
  ]),
  'WildStorm': new Set([
    'Gen13', 'Planetary', 'Stormwatch', 'The Authority', 'The Wild Storm',
    'The Wild Storm: Michael Cray', 'WildC.A.T.s', 'WetWorks'
  ]),
  'Elseworlds': new Set([
    'Batman: Gotham by Gaslight – A League for Justice',
    'Batman: The Dark Knight Returns', 'Batman: The Dark Knight Strikes Again',
    'DC: The New Frontier', 'Gotham by Gaslight', 'Gotham by Gaslight: The Kryptonian Age',
    'JLA: Earth 2', 'Kingdom Come', 'Superman: Red Son'
  ]),
  'Hill House Comics': new Set([
    'Basketful of Heads', 'Daphne Byrne', 'Plunge', 'The Dollhouse Family',
    'The Low, Low Woods'
  ]),
  'Wonder Comics': new Set([
    'Dial H for Hero', 'Naomi', 'Naomi: Season Two', 'Wonder Twins', 'Young Justice'
  ]),
  "America's Best Comics": new Set([
    'Promethea', 'The League of Extraordinary Gentlemen', 'Tom Strong',
    "Tomorrow Stories", 'Top 10'
  ]),
  'All-Star': new Set([
    'All Star Batman & Robin, the Boy Wonder', 'All-Star Superman'
  ]),
  'Impact': new Set(),
  'Hanna-Barbera Beyond': new Set([
    'Exit Stage Left: The Snagglepuss Chronicles', 'Future Quest', 'Scooby Apocalypse',
    'The Flintstones', 'The Ruff and Reddy Show', 'Wacky Raceland'
  ]),
  'DC Horror': new Set([
    'DC Horror Presents', 'DC Horror Presents: Creature Commandos'
  ])
};

function setLine(record, line, reason) {
  if (!record || record.primary || record.type !== 'Series') return;
  record.publishingLine = line;
  record._lineAuditReason = reason;
}

// Existing publisher and parent metadata are the strongest evidence.
for (const record of records) {
  if (record.publisher === 'Milestone') setLine(record, 'Milestone', 'Publisher metadata');
  if (record.publisher === 'WildStorm') setLine(record, 'WildStorm', 'Publisher metadata');
  if (record.parent === 'Elseworlds / Alternate Universe') setLine(record, 'Elseworlds', 'Parent authority');
  if (record.parent === 'Batman Black Label Line' || record.parent === 'Superman Black Label Line') {
    setLine(record, 'Black Label', 'Parent authority');
  }
  if (record.parent === "America's Best Comics (Alan Moore line)") {
    setLine(record, "America's Best Comics", 'Parent authority');
  }
  if (record.parent === 'Impact Comics Imprint (Archie superheroes revival)') {
    setLine(record, 'Impact', 'Parent authority');
  }
}

// Apply exact-title assignments. Later, more specific lines intentionally win.
for (const [line, titles] of Object.entries(titleSets)) {
  for (const record of records) {
    if (titles.has(record.series)) setLine(record, line, 'Exact title audit');
  }
}

// The 2011 Stormwatch series used WildStorm characters but was published in
// DC's main New 52 line, not under the WildStorm imprint.
for (const record of records.filter(r => r.series === 'Stormwatch' && r.publishingEra === 'The New 52')) {
  delete record.publishingLine;
  delete record._lineAuditReason;
}

// Resolve same-title volumes where the database already has separate records.
const first = predicate => records.find(predicate);
const all = predicate => records.filter(predicate);

const doomPatrol = all(r => r.series === 'Doom Patrol' && r.parent === 'Doom Patrol');
setLine(doomPatrol.find(r => r.publishingEra === 'DC Universe'), 'Young Animal', 'Distinct modern volume');
setLine(doomPatrol.find(r => !r.publishingEra), 'Vertigo', 'Distinct legacy volume');

const booksOfMagic = all(r => r.series === 'The Books of Magic' && r.parent === 'The Books of Magic');
setLine(booksOfMagic[booksOfMagic.length - 1], 'Vertigo', 'Distinct Vertigo volume');

const sandman = all(r => r.series === 'The Sandman' && r.parent === 'Sandman');
setLine(sandman[sandman.length - 1], 'Vertigo', 'Distinct Vertigo volume');

// Add separate line-specific records where v4.4 had only a modern-era record.
const newRecords = [
  {
    source: first(r => r.id === 'SER-00040'),
    id: 'SER-01876', publishingLine: 'Vertigo', publishingEra: ''
  },
  {
    source: first(r => r.id === 'SER-00449'),
    id: 'SER-01877', publishingLine: 'Vertigo', publishingEra: ''
  },
  {
    source: first(r => r.id === 'SER-01072'),
    id: 'SER-01878', publishingLine: 'Vertigo', publishingEra: ''
  }
];

for (const item of newRecords) {
  if (!item.source || records.some(r => r.id === item.id)) continue;
  const copy = { ...item.source, id: item.id, publishingLine: item.publishingLine };
  delete copy._lineAuditReason;
  if (item.publishingEra) copy.publishingEra = item.publishingEra;
  else delete copy.publishingEra;
  records.push(copy);
}

setLine(first(r => r.id === 'SER-01876'), 'Vertigo', 'Separate line-specific authority');
setLine(first(r => r.id === 'SER-01877'), 'Vertigo', 'Separate line-specific authority');
setLine(first(r => r.id === 'SER-01878'), 'Vertigo', 'Separate line-specific authority');

records.sort((a, b) =>
  String(a.sort || a.display || '').localeCompare(String(b.sort || b.display || '')) ||
  String(a.parent || '').localeCompare(String(b.parent || '')) ||
  String(a.publishingLine || a.publishingEra || '').localeCompare(String(b.publishingLine || b.publishingEra || '')) ||
  String(a.id).localeCompare(String(b.id))
);

const auditRows = [['Authority ID', 'Parent Authority', 'Series Title', 'Publishing Era', 'Publishing Line', 'Label Marker', 'Assignment Basis']];
for (const record of records.filter(r => r.publishingLine)) {
  auditRows.push([
    record.id, record.parent || '', record.series || '', record.publishingEra || '',
    record.publishingLine, record.publishingLine || record.publishingEra || '',
    record._lineAuditReason || (newRecords.some(x => x.id === record.id) ? 'Separate line-specific authority' : 'Curated assignment')
  ]);
}
for (const record of records) delete record._lineAuditReason;

const csv = auditRows.map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n') + '\n';
fs.writeFileSync(dataPath, JSON.stringify(records, null, 2) + '\n');
fs.writeFileSync(auditPath, csv);

const counts = {};
for (const record of records.filter(r => r.publishingLine)) {
  counts[record.publishingLine] = (counts[record.publishingLine] || 0) + 1;
}
console.log(JSON.stringify({
  records: records.length,
  lineAssignments: Object.values(counts).reduce((sum, n) => sum + n, 0),
  lines: counts,
  addedRecords: newRecords.filter(x => records.some(r => r.id === x.id)).map(x => x.id)
}, null, 2));
