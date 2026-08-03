const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const comicsPath = path.join(root, 'data', 'comics.json');
const officialPath = path.join(root, 'BOOM_OFFICIAL_SERIES_2026.json');
const auditPath = path.join(root, 'BOOM_CATALOG_IMPRINT_AUDIT.csv');
const repairPath = path.join(root, 'BOOM_CANONICAL_REPAIR_IDS.json');
const data = JSON.parse(fs.readFileSync(comicsPath, 'utf8'));
const official = JSON.parse(fs.readFileSync(officialPath, 'utf8')).series;

const key = value => String(value || '').normalize('NFKD').replace(/[’‘]/g, "'").replace(/[“”]/g, '"').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const sortName = name => { const m = String(name).match(/^(The|A|An)\s+(.+)$/i); return m ? `${m[2]}, ${m[1]}` : name; };

// Historical BOOM! Studios publication families, supplemented by the current
// official series archive above. Imprints remain metadata rather than shelves.
const historical = `
10
2 Guns
28 Days Later
3 Guns
Abigail and the Snowman
Adventure Time
Alice in Wonderland
Alienated
Aliens vs. Parker
All New Firefly
The Amazing World of Gumball
Americatown
The Amory Wars
The Anchor
Angel
Arcadia
The Avengefuls
b.b. free
The Backstagers
Bags (or a Story Thereof)
The Baker Street Peculiars
Basilisk
Batman '66 Meets Steed and Mrs. Peel
Bee and PuppyCat
Behold Behemoth
Ben 10
Beneath the Dark Crystal
Better Angels: A Kate Warne Adventure
Betrayal of the Planet of the Apes
The Big Con Job
Big Trouble in Little China
Bill & Ted
Black Badge
The Black Dahlia
Black Market
The Black Plague
Blood Bowl: Killer Contract
Bodie Troll
Bone Parish
Book of Slaughter
Brave Chef Brianna
Bravest Warriors
Briar
Broken World
BRZRKR
Buckhead
Buffy the Vampire Slayer
Burning Fields
Bury the Lede
By Night
The Calling: Cthulhu Chronicles
Caped
Captain American Idol
Capture Creatures
Cars
CBGB
Challenger Deep
Chip 'n Dale Rescue Rangers
Clarence
Clive Barker's Next Testament
Clive Barker's Nightbreed
Cloaks
The Cloud
Clueless
Cluster
Coady and the Creepies
Coda
Codebreakers
Cognetic
Cold Space
Cover Girl
Cthulhu Tales
Curb Stomp
Curse
Cursed Pirate Girl
Damn Them All
Dark Blood
The Dark Crystal
Darkwing Duck
Dawn of the Planet of the Apes
Day Men
Dead Letters
Dead Run
Death Be Damned
Deathmatch
Deceivers
Decision 2012
The Deep
Deep State
Die Hard: Year One
Dingo
Diesel
Disney's Hero Squad: Ultraheroes
Do Androids Dream of Electric Sheep?
Dodge City
Dominion
Donald Duck
Dracula: The Company of Monsters
DuckTales
Dune
Eat and Love Yourself
Eat the Rich
Eighty Days
Elric: The Balance Lost
The Empty Man
Enigma Cipher
Escape from New York
Eternal
Eugenic
Eureka
Eve
Evil Empire
The Expanse
Extermination
Fairy Quest
Faithless
Fanboys vs. Zombies
Fall of Cthulhu
Farscape
Fear the Dead: A Zombie Survivors Journal
Feathers
Fence
The Fiction
Fiction Squad
Finding Nemo
Firefly
Flavor Girls
Folklords
Forever Home
The Foundation
Fraggle Rock
Freelancers
Fresh Off the Boat Presents: Legion of Dope-itude Featuring Lazy Boy
Fused! Tales
G.I. Spy
Galveston
Garfield
Getting Dizzy
Ghosted in L.A.
Giant Days
Giant Monster
Godshaper
Goldie Vance
Good Luck
Grass Kings
The Great Wiz and the Ruckus
Grumpy Cat/Garfield
Hacktivist
Halogen
Happiness Will Follow
Harrower
Hawken: Melee
Hawks of Outremer
Heartbeat
Hellmouth
Help Us! Great Warrior
Hellraiser
Hero Squared
Herobear and the Kid
Hex Vet
Hexed
Heavy Vinyl
High Rollers
Higher Earth
Hit
Hollow
Hotel Dare
House of Slaughter
Hunter's Fortune
Hunter's Moon
The Hypernaturals
I Moved to Los Angeles to Work in Animation
Ice Age
Imagine Agents
Incorruptible
The Incredibles
Insurrection v3.6
Interesting Drug
Irredeemable
Iron Muslim
Iscariot
Jane
Jennifer's Body
Jenny Finn: Messiah
Jeremiah Harm
Jo & Rus
John Flood
Jonesy
The Joyners
Joyride
Judas
Juliet Takes a Breath
Just Beyond
Justice League/Mighty Morphin Power Rangers
Kennel Block Blues
Key of Z
Kill Audio
The Killer
King of Nowhere
Klaus
Kong of Skull Island
Jim Henson's Labyrinth
Ladycastle
The Last Broadcast
The Last Contract
Last Reign: Kings of War
Last Sons of America
The Last Witch
Lazaretto
Left on Mission
Loki: Ragnarok and Roll
Low Road West
Lucas Stand
Lucy Dreaming
Lumberjanes
Magic: The Gathering
The Magicians
Malignant Man
Mamo
The Man Who Came Down the Attic Stairs
The Many Deaths of Laila Starr
Maw
Maze Runner
Mech Cadet Yu
Mega Man: Fully Charged
Mega Princess
Memetic
Mezolith
Mickey Mouse
Midas Flesh
Mighty Morphin Power Rangers
Misfit City
Monsters, Inc.
Mosely
Mouse Guard
Mr. Stuffins
Munchkin
The Muppets
The Musical Monsters of Turkey Hollow
Namesake
Necronomicon
The Neighbors
Never as Bad as You Think
Ninja Tales
Nola
North Wind
NTSF:SD:SUV::
Nuclear Winter
Oh, Killstrike
Once & Future
Once Upon a Time at the End of the World
Operation: Broken Wings, 1936
Orcs!
Origins
Over the Garden Wall
Pale Horse
Pandora's Legacy
Peanuts
Pirate Tales
Planet of the Apes
Planetary Brigade
Plunder
Poe
Polarity
Potter's Field
Power Rangers
Power Up
The Princess Who Saved Herself
Proctor Valley Road
Protocol: Orphans
Pulp Tales: Josh Medors Benefit Comic
The Red Mother
Regarding the Matter of Oswald's Body
Regular Show
The Remnant
The Returning
Revelations
The Rinse
RoboCop
Rocket Salvage
Rocko's Modern Life
Ronin Island
Rowans Ruin
Rugrats
Ruinworld
Run Wild
Rush: Clockwork Angels
Salem: Queen of Thorns
The Savage Brothers
Save Yourself!
Scienthorlogy
Scream Queen
Seven Psychopaths
Seven Secrets
Seven Warriors
Shmobots
Sirens
Six-Gun Gorilla
Skybourne
Slam!
Slaughterhouse-Five
Sleepy Hollow
Smooth Criminals
Snarked!
Snow Blind
Soldier Zero
Sombra
Something is Killing the Children
Sons of Anarchy
Space Warped
Sparrowhawk
Specs
Specter Inspectors
The Spire
Starborn
Station
Star Trek/Planet of the Apes
Steed and Mrs. Peel
Steven Universe
Jim Henson's The Storyteller
Strange Attractors
Strange Fruit
Strange Skies Over East Berlin
Stuff of Nightmares
Suicide Risk
Supurbia
Swordsmith Assassin
Tag
Talent
Tarzan on the Planet of the Apes
Teen Dog
Thomas Alsop
The Thrilling Adventure Hour
Toil and Trouble
Toy Story
Translucid
The Traveler
Turncoat
UFOlogy
Uncle Grandpa
Uncle Scrooge
The Undertaker
An Unkindness of Ravens
The Unknown
The Unsound
Unthinkable
Valen the Outcast
The Vampire Slayer
Venus
Victor LaValle's Destroyer
WALL-E
Walt Disney's Comics and Stories
War for the Planet of the Apes
War of the Worlds: Second Wave
Warhammer
Warhammer 40,000
Warhammer Online
Warlords of Appalachia
We Only Find Them When They're Dead
Weavers
Welcome Back
Welcome to Wanderland
Wet Hot American Summer
What Were They Thinking?!
Whisper
Wicked Things
Wild's End
Wizard Beach
Wizards of Mickey
The Woods
The World of Cars
WWE
Wynd
X Isle
Zombie Tales
`.trim().split('\n').map(x => x.trim()).filter(Boolean);

const parentOverrides = new Map();
const family = (authority, titles) => titles.forEach(title => parentOverrides.set(key(title), authority));
family('Adventure Time', ['Adventure Time', 'Adventure Time Presents', 'Adventure Time with Fionna and Cake', 'Adventure Time/Regular Show']);
family('Abbott', ['Abbott', 'Abbott: 1973', 'Abbott: 1979']);
family('Angel', ['Angel', 'Angel + Spike']);
family('Big Trouble in Little China', ['Big Trouble in Little China', 'Big Trouble in Little China: Old Man Jack', 'Big Trouble in Little China/Escape from New York']);
family('BRZRKR', ['BRZRKR', 'BRZRKR Bloodlines', 'BRZRKR: A Faceful of Bullets', 'BRZRKR: Fallen Empire', 'BRZRKR: Poetry of Madness', 'BRZRKR: The Lost Book of B']);
family('Buffy the Vampire Slayer', ['Buffy the Vampire Slayer', "Buffy '97", 'Buffy the Last Vampire Slayer', 'The Vampire Slayer', 'Hellmouth']);
family('Cars', ['Cars', 'The World of Cars']);
family('Dune', ['Dune', 'Dune: A Whisper of Caladan Seas', 'Dune: Blood of the Sardaukar', 'Dune: House Atreides', 'Dune: House Carrino', 'Dune: House Harkonnen', 'Dune: The Waters of Kanly']);
family('The Expanse', ['The Expanse', 'The Expanse: A Little Death', 'The Expanse: Dragon Tooth', 'The Expanse: Origins']);
family('Farscape', ['Farscape', "Farscape: D'Argo's Lament", "Farscape: D'Argo's Quest", "Farscape: D'Argo's Trial", 'Farscape: Gone and Back', 'Farscape: Scorpius', 'Farscape: Strange Detractors']);
family('Firefly', ['Firefly', 'All New Firefly']);
family("Jim Henson's The Dark Crystal", ['The Dark Crystal', "Jim Henson's The Dark Crystal", 'Beneath the Dark Crystal', 'The Dark Crystal: Age of Resistance', 'The Power of the Dark Crystal']);
family("Jim Henson's Labyrinth", ["Jim Henson's Labyrinth", 'Labyrinth']);
family("Jim Henson's The Storyteller", ["Jim Henson's The Storyteller", 'Storyteller']);
family('Mighty Morphin Power Rangers', ['Mighty Morphin Power Rangers', 'Mighty Morphin', 'Go Go Power Rangers', 'Power Rangers', 'Power Rangers Prime', 'Power Rangers Universe', 'Power Rangers Unlimited', 'Ranger Academy', 'MMPR: The Return', 'MMPR/TMNT', 'Mighty Morphin Power Rangers/Teenage Mutant Ninja Turtles', 'Justice League/Mighty Morphin Power Rangers', 'Godzilla vs. Mighty Morphin Power Rangers']);
family('Planet of the Apes', ['Planet of the Apes', 'Betrayal of the Planet of the Apes', 'Dawn of the Planet of the Apes', 'Exile on the Planet of the Apes', 'Kong on the Planet of the Apes', 'Planet of the Apes/Green Lantern', 'Star Trek/Planet of the Apes', 'Tarzan on the Planet of the Apes', 'War for the Planet of the Apes']);
family('RoboCop', ['RoboCop', 'RoboCop: Last Stand']);
family('Something is Killing the Children', ['Something is Killing the Children', 'Book of Butcher', 'Book of Slaughter', 'Enter the House of Slaughter', 'Fall of the House of Slaughter', 'House of Slaughter']);
family('Warhammer', ['Warhammer', 'Warhammer Online']);
family('Warhammer 40,000', ['Warhammer 40,000']);

const archaia = new Set(`
About Betty's Boob
A Spark Within the Forge
Americatown
The Amory Wars
Beneath the Dark Crystal
The Black Dahlia
Bolivar
The Cloud
The Dark Crystal
Fraggle Rock
Girl in the Himalayas
Hacktivist
Hawken: Melee
Jim Henson Presents
Jim Henson's Labyrinth
Jim Henson's The Dark Crystal
Jim Henson's The Storyteller
Mouse Guard
Persephone
Petals
Rocket Salvage
Run Wild
Rust
Sparrow's Roar
Toil and Trouble
`.trim().split('\n').map(key));
const boomBox = new Set(`
The Avant-Guards
The Backstagers
Heavy Vinyl
I Heart Skull-Crusher!
Jonesy
Lumberjanes
Midas Flesh
Misfit City
Munchkin
S.I.R.
Slam!
Welcome to Wanderland
`.trim().split('\n').map(key));
const kaboom = new Set(`
Adventure Time
The Amazing World of Gumball
Bee and PuppyCat
Bravest Warriors
Garfield
Peanuts
Regular Show
Steven Universe
`.trim().split('\n').map(key));

const aliases = new Map([
  [key('WYND'), 'Wynd'], [key('Wilds End'), "Wild's End"], [key('Ghosted in LA'), 'Ghosted in L.A.'],
  [key('BILL & TEDD'), 'Bill & Ted'], [key('BigTrouble'), 'Big Trouble in Little China'],
  [key('BEN-10'), 'Ben 10'], [key('Avant Guards'), 'The Avant-Guards'], [key('Robocop'), 'RoboCop'],
  [key('Mech Cadet YU'), 'Mech Cadet Yu'], [key('Many Deaths of Laila Starr'), 'The Many Deaths of Laila Starr'],
  [key('EMPTY MAN'), 'The Empty Man'], [key('Destroyer'), "Victor LaValle's Destroyer"],
  [key('Dune'), 'Dune'], [key('Expanse'), 'The Expanse'], [key('Red Mother'), 'The Red Mother'],
  [key('Storyteller'), "Jim Henson's The Storyteller"], [key('Dark Crystal'), "Jim Henson's The Dark Crystal"],
  [key('Amory Wars'), 'The Amory Wars'], [key('Low Road west'), 'Low Road West']
]);
const canonicalTitle = raw => aliases.get(key(raw)) || String(raw).trim();
const lineFor = raw => archaia.has(key(raw)) ? 'Archaia' : boomBox.has(key(raw)) ? 'BOOM! Box' : kaboom.has(key(raw)) ? 'KaBOOM!' : 'BOOM! Studios';

const currentSeries = [
  'Alice Forever After', 'Baby Garfield', 'Blink And You’ll Miss It', 'BRZRKR: A Faceful of Bullets',
  'BRZRKR: Fallen Empire', 'BRZRKR: Light Draws Breath', 'BRZRKR: Poetry of Madness',
  'Fall of the House of Slaughter', 'Fence Challengers: Sweet Sixteen', 'Flavor Girls: Return to the Mothership',
  'Hello Body Horror', 'Hello Halloween', 'Hellraiser: Resurrections', 'Mighty Morphin Power Rangers (2026)',
  'Neighborhood Watch', 'Power Rangers Prime', 'Power Rangers Unlimited', 'The Last Witch: Blood & Betrayal',
  'Vampyrates!'
];
family('Alice Ever After', ['Alice Ever After', 'Alice Forever After']);
family('Fence', ['Fence', 'Fence Challengers: Sweet Sixteen']);
family('Flavor Girls', ['Flavor Girls', 'Flavor Girls: Return to the Mothership']);
family('Garfield', ['Garfield', 'Baby Garfield']);
family('Hellraiser', ['Hellraiser', 'Hellraiser: Resurrections']);
family('The Last Witch', ['The Last Witch', 'The Last Witch: Blood & Betrayal']);
family('Mighty Morphin Power Rangers', ['Mighty Morphin Power Rangers (2026)']);
family('Something is Killing the Children', ['Fall of the House of Slaughter']);

const titles = [...official, ...historical, ...currentSeries].map(canonicalTitle);
const uniqueTitles = [...new Map(titles.map(title => [key(title), title])).values()];
const primaryByName = new Map();
for (const row of data.filter(r => r.primary)) if (!primaryByName.has(key(row.display))) primaryByName.set(key(row.display), row);
const usedIds = new Set(data.map(r => r.id));
let nextAuthority = 1, nextSeries = 1;
const nextId = prefix => { let id; do { const n = prefix === 'BMA' ? nextAuthority++ : nextSeries++; id = `${prefix}-${String(n).padStart(4, '0')}`; } while (usedIds.has(id)); usedIds.add(id); return id; };
const audit = [['action','authority','title','publisher','publishing_line','record_id']];
const repairIds = new Set();
let addedAuthorities = 0, addedSeries = 0, repaired = 0;

function ensurePrimary(authority, line) {
  let primary = primaryByName.get(key(authority));
  if (primary) return primary;
  primary = { id: nextId('BMA'), display: authority, parent: '', series: authority, primary: true,
    publisher: 'Boom! Studios', type: 'Series', level: 'Recommended', sort: sortName(authority), printedTitle: authority,
    publishingLine: line, notes: 'Primary filing authority verified during the comprehensive BOOM! Studios catalog and imprint audit.' };
  data.push(primary); primaryByName.set(key(authority), primary); addedAuthorities++;
  audit.push(['ADD AUTHORITY', authority, '', 'Boom! Studios', line, primary.id]);
  return primary;
}

for (const title of uniqueTitles) {
  const authority = parentOverrides.get(key(title)) || title;
  const line = lineFor(title);
  audit.push(['AUDIT SERIES', authority, title, 'Boom! Studios', line, '']);
  const primary = ensurePrimary(authority, line);
  const matches = data.filter(r => !r.primary && key(r.display) === key(title));
  let row = matches.find(r => /boom|archaia/i.test(String(r.publisher || ''))) || matches.find(r => key(r.parent) === key(authority));
  if (row) {
    let changed = false;
    if (key(row.parent) !== key(primary.display)) { row.parent = primary.display; changed = true; }
    if (row.publishingLine !== line) { row.publishingLine = line; changed = true; }
    if (changed) { if (!/^(BMA|BMS)-/.test(String(row.id))) repairIds.add(row.id); repaired++; audit.push(['REPAIR SERIES', primary.display, row.display, row.publisher, line, row.id]); }
    continue;
  }
  row = { id: nextId('BMS'), display: title, parent: primary.display, series: title, primary: false,
    publisher: 'Boom! Studios', type: 'Series', level: 'Recommended', sort: sortName(title), printedTitle: title,
    publishingLine: line, notes: 'Verified during the comprehensive BOOM! Studios catalog and imprint audit.' };
  data.push(row); addedSeries++; audit.push(['ADD SERIES', primary.display, title, row.publisher, line, row.id]);
}

// Canonically repair all inherited BOOM!/Archaia rows, including older rows
// hidden under generic publisher or license authorities.
const broad = new Set(['boom originals', 'boom licensed']);
for (const row of data.filter(r => !r.primary && !/^(BMA|BMS)-/.test(String(r.id)))) {
  const governed = /boom|archaia/i.test(String(row.publisher || '')) || broad.has(key(row.parent));
  if (!governed) continue;
  const targetName = parentOverrides.get(key(row.display)) || (broad.has(key(row.parent)) ? row.display : null);
  let changed = false;
  if (targetName) {
    const target = ensurePrimary(targetName, lineFor(row.display));
    if (key(row.parent) !== key(target.display)) { row.parent = target.display; changed = true; }
  }
  const line = lineFor(row.display);
  if (row.publishingLine !== line) { row.publishingLine = line; changed = true; }
  if (changed) repaired++;
  repairIds.add(row.id);
}

// Remove only audit-created exact duplicates.
const groups = new Map();
for (const row of data.filter(r => !r.primary)) {
  const identity = [key(row.display), key(row.parent), key(row.publisher), String(row.startYear || '')].join('|');
  if (!groups.has(identity)) groups.set(identity, []); groups.get(identity).push(row);
}
const remove = new Set();
for (const rows of groups.values()) if (rows.length > 1) {
  const keep = rows.find(r => !String(r.id).startsWith('BMS-')) || rows[0];
  rows.filter(r => r !== keep && String(r.id).startsWith('BMS-')).forEach(r => remove.add(r.id));
}
if (remove.size) { for (let i = data.length - 1; i >= 0; i--) if (remove.has(data[i].id)) data.splice(i, 1); addedSeries -= remove.size; }

data.sort((a, b) => String(a.sort || a.display).localeCompare(String(b.sort || b.display)) || String(a.id).localeCompare(String(b.id)));
fs.writeFileSync(comicsPath, JSON.stringify(data, null, 2) + '\n');
fs.writeFileSync(path.join(root, 'data', 'comics.min.json'), JSON.stringify(data));
fs.writeFileSync(repairPath, JSON.stringify([...repairIds].sort(), null, 2) + '\n');
fs.writeFileSync(auditPath, audit.map(row => row.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n') + '\n');

const ids = new Set(), duplicateIds = [];
for (const row of data) { if (ids.has(row.id)) duplicateIds.push(row.id); ids.add(row.id); }
const primaries = new Set(data.filter(r => r.primary).map(r => key(r.display)));
const unresolved = data.filter(r => !r.primary && !primaries.has(key(r.parent)));
const generic = data.filter(r => !r.primary && broad.has(key(r.parent)));
console.log(JSON.stringify({ officialSeries: official.length, catalogTitles: uniqueTitles.length, total: data.length,
  primary: data.filter(r => r.primary).length, subordinate: data.filter(r => !r.primary).length,
  addedAuthorities, addedSeries, repaired, migrationIds: repairIds.size, duplicateIds, unresolvedParents: unresolved.length,
  genericBoomParents: generic.length }, null, 2));
