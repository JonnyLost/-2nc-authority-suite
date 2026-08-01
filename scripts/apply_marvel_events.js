const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const file = path.join(root, 'data', 'comics.json');
const auditFile = path.join(root, 'MARVEL_EVENT_AUTHORITY_AUDIT.csv');
const rows = JSON.parse(fs.readFileSync(file, 'utf8'));
const audit = [];
let nextId = 1;

const cleanSort = value => value.replace(/^The\s+/i, '').trim();
const key = value => String(value || '').trim().toLocaleLowerCase('en-US');
const nextEventId = () => {
  while (rows.some(row => row.id === `MEV-${String(nextId).padStart(5, '0')}`)) nextId += 1;
  return `MEV-${String(nextId++).padStart(5, '0')}`;
};

function record(action, title, parent, startYear, endYear, note = '') {
  audit.push({ action, title, parent, startYear: startYear || '', endYear: endYear || '', note });
}

function find(title, primary) {
  return rows.find(row => row.publisher === 'Marvel' && key(row.display) === key(title) && (primary === undefined || row.primary === primary));
}

function baseRecord(id, title, parent, primary, startYear, endYear, type = 'Event') {
  const row = {
    id,
    display: title,
    parent: parent || '',
    series: title,
    primary,
    publisher: 'Marvel',
    type,
    level: 'Recommended',
    sort: cleanSort(title),
    printedTitle: title
  };
  if (startYear) row.startYear = startYear;
  if (endYear) row.endYear = endYear;
  return row;
}

function ensurePrimary(title, startYear, endYear) {
  let row = find(title, true);
  if (!row) {
    row = baseRecord(nextEventId(), title, '', true, startYear, endYear);
    rows.push(row);
    record('Added primary authority', title, '', startYear, endYear);
  } else {
    row.type = 'Event';
    row.level = 'Recommended';
    if (startYear && !row.startYear) row.startYear = startYear;
    if (endYear && !row.endYear) row.endYear = endYear;
    record('Confirmed/enriched primary', title, '', row.startYear, row.endYear);
  }
  return row;
}

function ensureChild(title, parent, startYear, endYear) {
  let row = rows.find(item => item.publisher === 'Marvel' && !item.primary && key(item.display) === key(title));
  if (!row) {
    row = baseRecord(nextEventId(), title, parent, false, startYear, endYear);
    rows.push(row);
    record('Added dedicated event title', title, parent, startYear, endYear);
  } else {
    const prior = row.parent;
    row.parent = parent;
    row.type = 'Event';
    row.level = 'Recommended';
    if (startYear && !row.startYear) row.startYear = startYear;
    if (endYear && !row.endYear) row.endYear = endYear;
    record(prior === parent ? 'Confirmed/enriched title' : 'Reparented dedicated title', title, parent, row.startYear, row.endYear, prior && prior !== parent ? `Former parent: ${prior}` : '');
  }
  return row;
}

const families = [
  ['Contest of Champions', 1982, 2017, ['Marvel Super Hero Contest of Champions', 'Contest of Champions II', 'Contest of Champions']],
  ['Secret Wars', 1984, 2016, ['Marvel Super Heroes Secret Wars', 'Secret Wars II', 'Secret Wars', 'Secret Wars: Battleworld', 'Secret Wars: Secret Love']],
  ['The Infinity Gauntlet', 1991, 1991, ['The Infinity Gauntlet']],
  ['The Infinity War', 1992, 1992, ['The Infinity War']],
  ['The Infinity Crusade', 1993, 1993, ['The Infinity Crusade']],
  ['Onslaught', 1996, 1996, ['Onslaught: X-Men', 'Onslaught: Marvel Universe', 'Onslaught: Epilogue', 'Onslaught Reborn']],
  ['Maximum Security', 2000, 2001, ['Maximum Security', 'Maximum Security: Dangerous Planet']],
  ['Infinity Abyss', 2002, 2002, ['Infinity Abyss']],
  ['House of M', 2005, 2015, ['House of M', 'House of M: Avengers', 'House of M: Civil War', 'House of M: Fantastic Four', 'House of M: Masters of Evil', 'House of M: Spider-Man', 'House of M: World of M Featuring Wolverine']],
  ['Annihilation', 2006, 2007, ['Annihilation', 'Annihilation: Prologue', 'Annihilation: Nova', 'Annihilation: Ronan', 'Annihilation: Silver Surfer', 'Annihilation: Super-Skrull', 'Annihilation: Heralds of Galactus']],
  ['Civil War', 2006, 2007, ['Civil War', 'Civil War: Choosing Sides', 'Civil War: Front Line', 'Civil War: The Confession', 'Civil War: The Initiative', 'Civil War: War Crimes']],
  ['World War Hulk', 2007, 2008, ['World War Hulk', 'World War Hulk: Aftersmash', 'World War Hulk: Aftersmash - Damage Control', 'World War Hulk: Warbound', 'World War Hulk: Front Line']],
  ['Annihilation: Conquest', 2007, 2008, ['Annihilation: Conquest', 'Annihilation: Conquest - Prologue', 'Annihilation: Conquest - Quasar', 'Annihilation: Conquest - Star-Lord', 'Annihilation: Conquest - Wraith']],
  ['Secret Invasion', 2008, 2008, ['Secret Invasion', 'Secret Invasion: Front Line', 'Secret Invasion: Inhumans', 'Secret Invasion: Runaways/Young Avengers', 'Secret Invasion: Who Do You Trust?']],
  ['War of Kings', 2009, 2009, ['War of Kings', 'War of Kings: Ascension', 'War of Kings: Darkhawk', 'War of Kings: Warriors', 'War of Kings: Who Will Rule?']],
  ['Realm of Kings', 2009, 2010, ['Realm of Kings', 'Realm of Kings: Imperial Guard', 'Realm of Kings: Inhumans', 'Realm of Kings: Son of Hulk']],
  ['Siege', 2010, 2010, ['Siege', 'Siege: Embedded', 'Siege: Captain America', 'Siege: Loki', 'Siege: Secret Warriors', 'Siege: Spider-Man', 'Siege: Young Avengers']],
  ['Shadowland', 2010, 2010, ['Shadowland', 'Shadowland: After the Fall', 'Shadowland: Blood on the Streets', 'Shadowland: Daughters of the Shadow', 'Shadowland: Elektra', 'Shadowland: Moon Knight', 'Shadowland: Power Man', 'Shadowland: Spider-Man', 'Shadowland: Thunderbolts']],
  ['The Thanos Imperative', 2010, 2011, ['The Thanos Imperative', 'The Thanos Imperative: Ignition', 'The Thanos Imperative: Devastation']],
  ['Chaos War', 2010, 2011, ['Chaos War', 'Chaos War: Ares', 'Chaos War: Alpha Flight', 'Chaos War: Avengers', 'Chaos War: Chaos King', 'Chaos War: Dead Avengers', 'Chaos War: God Squad', 'Chaos War: Thor', 'Chaos War: X-Men']],
  ['Fear Itself', 2011, 2012, ['Fear Itself', 'Fear Itself: Book of the Skull', 'Fear Itself: Fearsome Four', 'Fear Itself: The Deep', 'Fear Itself: The Fearless', 'Fear Itself: Youth in Revolt', 'Fear Itself: Deadpool', 'Fear Itself: Spider-Man', 'Fear Itself: Wolverine']],
  ['Spider-Island', 2011, 2015, ['Spider-Island', 'Spider-Island: Avengers', 'Spider-Island: Cloak & Dagger', 'Spider-Island: Deadly Foes', 'Spider-Island: Emergence of Evil', 'Spider-Island: Heroes for Hire', 'Spider-Island: Spider-Girl']],
  ['Avengers vs. X-Men', 2012, 2012, ['Avengers vs. X-Men', 'Avengers vs. X-Men: Infinite', 'AVX: Consequences', 'AVX: VS']],
  ['Messiah Complex', 2007, 2008, ['X-Men: Messiah Complex', 'X-Men: Messiah Complex - Mutant Files']],
  ['Age of Ultron', 2013, 2013, ['Age of Ultron', 'Age of Ultron: Book Ten A.I.', 'Age of Ultron: Epilogue', 'Age of Ultron vs. Marvel Zombies']],
  ['Infinity', 2013, 2014, ['Infinity', 'Infinity: Against the Tide', 'Infinity: Heist', 'Infinity: The Hunt']],
  ['Original Sin', 2014, 2014, ['Original Sin', 'Original Sins', 'Original Sin: Secret Avengers Infinite Comic', 'Original Sin: Hulk vs. Iron Man', 'Original Sin: Thor & Loki - The Tenth Realm']],
  ['AXIS', 2014, 2015, ['Avengers & X-Men: AXIS', 'AXIS: Carnage', 'AXIS: Hobgoblin', 'AXIS: Revolutions']],
  ['Civil War II', 2016, 2017, ['Civil War II', 'Civil War II: Choosing Sides', 'Civil War II: Gods of War', 'Civil War II: Kingpin', 'Civil War II: Ulysses', 'Civil War II: The Accused', 'Civil War II: The Fallen', 'Civil War II: The Oath']],
  ['Inhumans vs. X-Men', 2016, 2017, ['Inhumans vs. X-Men']],
  ['Secret Empire', 2017, 2017, ['Secret Empire', 'Secret Empire: Brave New World', 'Secret Empire: Omega', 'Secret Empire: Underground', 'Secret Empire: United', 'Secret Empire: Uprising']],
  ['Infinity Wars', 2018, 2019, ['Infinity Countdown', 'Infinity Countdown: Adam Warlock', 'Infinity Countdown: Black Widow', 'Infinity Countdown: Captain Marvel', 'Infinity Countdown: Champions', 'Infinity Countdown: Daredevil', 'Infinity Countdown: Darkhawk', 'Infinity Countdown Prime', 'Infinity Wars', 'Infinity Wars: Arachknight', 'Infinity Wars: Fallen Guardian', 'Infinity Wars: Ghost Panther', 'Infinity Wars: Infinity', 'Infinity Wars: Iron Hammer', 'Infinity Wars: Sleepwalker', 'Infinity Wars: Soldier Supreme', 'Infinity Wars: Weapon Hex', 'Infinity Warps']],
  ['War of the Realms', 2019, 2019, ['War of the Realms', 'War of the Realms: Journey into Mystery', 'War of the Realms: New Agents of Atlas', 'War of the Realms: Omega', 'War of the Realms: Punisher', 'War of the Realms: Strikeforce', 'War of the Realms: Uncanny X-Men', 'War of the Realms: War Scrolls']],
  ['Absolute Carnage', 2019, 2020, ['Absolute Carnage', 'Absolute Carnage: Avengers', 'Absolute Carnage: Captain Marvel', 'Absolute Carnage: Immortal Hulk', 'Absolute Carnage: Lethal Protectors', 'Absolute Carnage: Miles Morales', 'Absolute Carnage: Scream', 'Absolute Carnage: Separation Anxiety', 'Absolute Carnage: Symbiote of Vengeance', 'Absolute Carnage: Symbiote Spider-Man', 'Absolute Carnage: Weapon Plus']],
  ['Empyre', 2020, 2020, ['Empyre', 'Empyre: Aftermath Avengers', 'Empyre: Avengers', 'Empyre: Captain America', 'Empyre: Fantastic Four', 'Empyre: Fallout Fantastic Four', 'Empyre: Savage Avengers', 'Empyre: X-Men']],
  ['King in Black', 2020, 2021, ['King in Black', 'King in Black: Avengers', 'King in Black: Black Knight', 'King in Black: Captain America', 'King in Black: Ghost Rider', 'King in Black: Immortal Hulk', 'King in Black: Namor', 'King in Black: Planet of the Symbiotes', 'King in Black: Return of the Valkyries', 'King in Black: Scream', 'King in Black: Spider-Man', 'King in Black: Thunderbolts', 'King in Black: Wiccan and Hulkling']],
  ['Heroes Reborn', 2021, 2021, ['Heroes Reborn', 'Heroes Return']],
  ["Devil's Reign", 2021, 2022, ["Devil's Reign", "Devil's Reign: Moon Knight", "Devil's Reign: Omega", "Devil's Reign: Spider-Man", "Devil's Reign: Superior Four", "Devil's Reign: Villains for Hire", "Devil's Reign: Winter Soldier", "Devil's Reign: X-Men"]],
  ['A.X.E.: Judgment Day', 2022, 2022, ['A.X.E.: Judgment Day', 'A.X.E.: Avengers', 'A.X.E.: Death to the Mutants', 'A.X.E.: Eve of Judgment', 'A.X.E.: Eternals', 'A.X.E.: Iron Fist', 'A.X.E.: Judgment Day Omega', 'A.X.E.: Starfox', 'A.X.E.: X-Men']],
  ['Dark Web', 2022, 2023, ['Dark Web', 'Dark Web: Finale', 'Dark Web: Ms. Marvel', 'Dark Web: X-Men']],
  ['Sins of Sinister', 2023, 2023, ['Sins of Sinister', 'Sins of Sinister: Dominion', 'Immoral X-Men', 'Nightcrawlers', 'Storm & the Brotherhood of Mutants']],
  ['Gang War', 2023, 2024, ['Gang War: First Strike', 'Daredevil: Gang War', 'Deadly Hands of Kung Fu: Gang War', 'Luke Cage: Gang War']],
  ['Blood Hunt', 2024, 2024, ['Blood Hunt', 'Blood Hunt: Red Band', 'Black Panther: Blood Hunt', 'Doctor Strange: Blood Hunt', 'Hulk: Blood Hunt', 'Midnight Sons: Blood Hunt', 'Strange Academy: Blood Hunt', 'Union Jack the Ripper: Blood Hunt', 'Werewolf by Night: Blood Hunt', 'Wolverine: Blood Hunt']],
  ['Venom War', 2024, 2024, ['Venom War', 'Venom War: Carnage', 'Venom War: Daredevil', 'Venom War: Deadpool', 'Venom War: Fantastic Four', "Venom War: It's Jeff!", 'Venom War: Lethal Protectors', 'Venom War: Spider-Man', 'Venom War: Venomous', 'Venom War: Wolverine', 'Venom War: Zombiotes']],
  ['One World Under Doom', 2025, 2025, ['One World Under Doom']],
  ['Imperial', 2025, 2025, ['Imperial', 'Imperial War: Black Panther', 'Imperial War: Exiles', 'Imperial War: Imperial Guardians', 'Imperial War: Nova - Centurion', 'Imperial War: Planet She-Hulk']],
  ['Queen in Black', 2026, 2026, ['Queen in Black']]
];

for (const [parent, startYear, endYear, children] of families) {
  ensurePrimary(parent, startYear, endYear);
  for (const child of children) ensureChild(child, parent, startYear, endYear);
}

const ids = new Set();
for (const row of rows) {
  if (ids.has(row.id)) throw new Error(`Duplicate ID: ${row.id}`);
  ids.add(row.id);
}
const primaries = new Set(rows.filter(row => row.primary).map(row => key(row.display)));
const orphans = rows.filter(row => !row.primary && row.parent && !primaries.has(key(row.parent)));
if (orphans.length) throw new Error(`Unresolved parents: ${orphans.slice(0, 10).map(row => `${row.id}:${row.parent}`).join(', ')}`);

fs.writeFileSync(file, `${JSON.stringify(rows, null, 2)}\n`);
const quote = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
const csv = ['Action,Title,Parent,Start Year,End Year,Note', ...audit.map(row => [row.action, row.title, row.parent, row.startYear, row.endYear, row.note].map(quote).join(','))].join('\n');
fs.writeFileSync(auditFile, `${csv}\n`);

const marvel = rows.filter(row => row.publisher === 'Marvel');
const eventPrimaries = marvel.filter(row => row.primary && row.type === 'Event');
console.log(JSON.stringify({ total: rows.length, marvel: marvel.length, eventPrimaries: eventPrimaries.length, auditRows: audit.length, orphans: orphans.length }, null, 2));
