const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const comicsPath = path.join(root, 'data', 'comics.json');
const auditPath = path.join(root, 'MARVEL_CATALOG_IMPRINT_AUDIT.csv');
const data = JSON.parse(fs.readFileSync(comicsPath, 'utf8'));

const families = [
  // Mainline characters and recognizable title families that were absent or hidden.
  ['Angela', 'Character', 'Marvel', '', ['Angela: Asgard\'s Assassin|2014|2015', 'Angela: Queen of Hel|2015|2016']],
  ['Aero', 'Character', 'Marvel', '', ['Aero|2019|2020']],
  ['Araña', 'Character', 'Marvel', '', ['Araña: Heart of the Spider|2005|2006', 'Spider-Girl|2010|2011']],
  ['Armor', 'Character', 'Marvel', '', ['Ultimate X-Men: Armor|2025|2025']],
  ['Black Bolt', 'Character', 'Marvel', '', ['Black Bolt|2017|2018']],
  ['Blood Hunters', 'Team', 'Marvel', '', ['Blood Hunters|2024|2025']],
  ['Brother Voodoo / Doctor Voodoo', 'Character', 'Marvel', '', ['Doctor Voodoo: Avenger of the Supernatural|2009|2010', 'Strange Tales|1973|1974']],
  ['Devil Dinosaur / Moon Girl', 'Character', 'Marvel', '', ['Devil Dinosaur|1978|1978']],
  ['Echo', 'Character', 'Marvel', '', ['Echo|2021|2021', 'Phoenix Song: Echo|2021|2022', 'Daredevil: Echo|2023|2023']],
  ['Elsa Bloodstone', 'Character', 'Marvel', '', ['Bloodstone|2001|2002']],
  ['Firestar', 'Character', 'Marvel', '', ['Firestar|1986|1986', 'Marvel Divas|2009|2009']],
  ['Foolkiller', 'Character', 'Marvel', 'MAX', ['Foolkiller|2007|2008', 'Foolkiller: White Angels|2008|2009']],
  ['G.O.D.S.', 'Series', 'Marvel', '', ['G.O.D.S.|2023|2024']],
  ['Hellcat', 'Character', 'Marvel', '', ['Patsy Walker, A.K.A. Hellcat!|2016|2017', 'Hellcat|2023|2023']],
  ['Hood', 'Character', 'Marvel', 'MAX', ['The Hood|2002|2002', 'Dark Reign: The Hood|2009|2009']],
  ['Ironheart', 'Character', 'Marvel', '', ['Ironheart|2019|2020', 'Invincible Iron Man|2017|2018']],
  ['Jack of Hearts', 'Character', 'Marvel', '', ['Jack of Hearts|1984|1984']],
  ['Jeff the Land Shark', 'Character', 'Marvel', '', ["It's Jeff!|2021|2024", 'Jeff the Land Shark: Superstar|2026|2026']],
  ['Jessica Jones', 'Character', 'Marvel', '', ['Alias|2001|2004', 'Jessica Jones|2016|2018', 'Jessica Jones: Blind Spot|2020|2020', 'Jessica Jones: Purple Daughter|2020|2020', 'The Pulse|2004|2006']],
  ['Ka-Zar', 'Character', 'Marvel', '', ['Ka-Zar|1970|1971', 'Ka-Zar the Savage|1981|1984', 'Ka-Zar|1997|1998', 'Ka-Zar: Lord of the Savage Land|2021|2022']],
  ['Machine Man', 'Character', 'Marvel', '', ['Machine Man|1978|1981', 'Machine Man|1984|1985', 'X-51|1999|2000']],
  ['Man-Wolf', 'Character', 'Marvel', '', ['Creatures on the Loose|1974|1975', 'Marvel Premiere|1979|1979']],
  ['Marvel Boy / Noh-Varr', 'Character', 'Marvel', '', ['Marvel Boy|2000|2001']],
  ['Meet the Skrulls', 'Series', 'Marvel', '', ['Meet the Skrulls|2019|2019']],
  ['Misty Knight', 'Character', 'Marvel', '', ['Fearless|2019|2020']],
  ['Monica Rambeau / Photon', 'Character', 'Marvel', '', ['Monica Rambeau: Photon|2022|2023', 'Captain Marvel|1989|1989']],
  ['Moon Girl and Devil Dinosaur', 'Series', 'Marvel', '', ['Moon Girl and Devil Dinosaur|2016|2019', 'Moon Girl and Devil Dinosaur|2022|2023']],
  ['Night Thrasher', 'Character', 'Marvel', '', ['Night Thrasher|1993|1995', 'Night Thrasher: Four Control|1992|1992']],
  ['Reptil', 'Character', 'Marvel', '', ['Reptil|2021|2021']],
  ['Sleepwalker', 'Character', 'Marvel', '', ['Sleepwalker|1991|1994']],
  ['Solo', 'Character', 'Marvel', '', ['Solo|1994|1994', 'Solo|2016|2017']],
  ['Strange Academy', 'Team', 'Marvel', '', ['Strange Academy|2020|2022', 'Strange Academy: Finals|2022|2023', 'Strange Academy: Amazing Spider-Man|2023|2023']],
  ['Supreme Power', 'Team', 'Marvel', 'MAX', ['Supreme Power|2003|2005', 'Supreme Power: Hyperion|2005|2006', 'Supreme Power: Nighthawk|2005|2006', 'Squadron Supreme|2006|2008']],
  ['The Twelve', 'Team', 'Marvel', '', ['The Twelve|2008|2012', 'The Twelve: Spearhead|2010|2010']],
  ['The Union', 'Team', 'Marvel', '', ['The Union|2020|2021']],
  ['Tigra', 'Character', 'Marvel', '', ['Marvel Chillers|1975|1976', 'Tigra|2022|2022']],
  ['White Tiger', 'Character', 'Marvel', '', ['White Tiger|2006|2007', 'Deadly Hands of Kung Fu|1974|1977']],

  // Marvel Knights and MAX are metadata; the actual property remains the shelf authority.
  ['Marvel Knights', 'Team', 'Marvel Knights', 'Marvel Knights', ['Marvel Knights|2000|2001', 'Marvel Knights 20th|2018|2019', 'Marvel Knights: The World to Come|2025|2026']],
  ['District X', 'Series', 'Marvel Knights', 'Marvel Knights', ['District X|2004|2006']],
  ['Madrox', 'Character', 'Marvel Knights', 'Marvel Knights', ['Madrox|2004|2005']],
  ['Apache Skies', 'Series', 'Marvel MAX', 'MAX', ['Apache Skies|2002|2002']],
  ['The Eternal', 'Series', 'Marvel MAX', 'MAX', ['The Eternal|2003|2004']],
  ['War Is Hell: The First Flight of the Phantom Eagle', 'Series', 'Marvel MAX', 'MAX', ['War Is Hell: The First Flight of the Phantom Eagle|2008|2008']],

  // Epic Comics and creator-owned Epic properties.
  ['Akira', 'Series', 'Epic Comics', 'Epic Comics', ['Akira|1988|1995']],
  ['Alien Legion', 'Team', 'Epic Comics', 'Epic Comics', ['Alien Legion|1984|1987', 'Alien Legion: A Grey Day to Die|1986|1986', 'Alien Legion: Tenants of Hell|1991|1992']],
  ['The Bozz Chronicles', 'Series', 'Epic Comics', 'Epic Comics', ['The Bozz Chronicles|1985|1986']],
  ['Coyote', 'Series', 'Epic Comics', 'Epic Comics', ['Coyote|1983|1986']],
  ['Dreadstar', 'Character', 'Epic Comics', 'Epic Comics', ['Dreadstar|1982|1986', 'The Price|1981|1981']],
  ['Groo the Wanderer', 'Character', 'Epic Comics', 'Epic Comics', ['Groo the Wanderer|1985|1995']],
  ['Marshal Law', 'Character', 'Epic Comics', 'Epic Comics', ['Marshal Law|1987|1989', 'Marshal Law: Takes Manhattan|1989|1989']],
  ['Moonshadow', 'Series', 'Epic Comics', 'Epic Comics', ['Moonshadow|1985|1987']],
  ['The One', 'Series', 'Epic Comics', 'Epic Comics', ['The One|1985|1986']],
  ['Six from Sirius', 'Series', 'Epic Comics', 'Epic Comics', ['Six from Sirius|1984|1984', 'Six from Sirius II|1985|1985']],
  ['Sisterhood of Steel', 'Series', 'Epic Comics', 'Epic Comics', ['Sisterhood of Steel|1984|1986']],
  ['St. George', 'Character', 'Epic Comics', 'Epic Comics', ['St. George|1988|1989']],
  ['Starstruck', 'Series', 'Epic Comics', 'Epic Comics', ['Starstruck|1985|1986']],
  ['Stray Toasters', 'Series', 'Epic Comics', 'Epic Comics', ['Stray Toasters|1988|1989']],

  // Icon Comics properties.
  ['Brilliant', 'Series', 'Icon', 'Icon Comics', ['Brilliant|2011|2014']],
  ['Casanova', 'Series', 'Icon', 'Icon Comics', ['Casanova|2011|2012', 'Casanova: Avaritia|2011|2012']],
  ['Criminal', 'Series', 'Icon', 'Icon Comics', ['Criminal|2006|2008', 'Criminal: The Sinners|2009|2010', 'Criminal: Last of the Innocent|2011|2011']],
  ['Empress', 'Series', 'Icon', 'Icon Comics', ['Empress|2016|2016']],
  ['Incognito', 'Series', 'Icon', 'Icon Comics', ['Incognito|2008|2009', 'Incognito: Bad Influences|2010|2011']],
  ['Kabuki', 'Character', 'Icon', 'Icon Comics', ['Kabuki|2004|2008']],
  ['Kick-Ass', 'Series', 'Icon', 'Icon Comics', ['Kick-Ass|2008|2010', 'Kick-Ass 2|2010|2012', 'Kick-Ass 3|2013|2014', 'Hit-Girl|2012|2013']],
  ['Nemesis', 'Series', 'Icon', 'Icon Comics', ['Nemesis|2010|2011']],
  ['Powers', 'Series', 'Icon', 'Icon Comics', ['Powers|2004|2008', 'Powers: Bureau|2012|2014']],
  ['Scarlet', 'Series', 'Icon', 'Icon Comics', ['Scarlet|2010|2016']],
  ['The Secret Service / Kingsman', 'Series', 'Icon', 'Icon Comics', ['The Secret Service|2012|2013']],
  ['Superior', 'Series', 'Icon', 'Icon Comics', ['Superior|2010|2012']],
  ['Takio', 'Series', 'Icon', 'Icon Comics', ['Takio|2011|2012']],
  ['The United States of Murder Inc.', 'Series', 'Icon', 'Icon Comics', ['The United States of Murder Inc.|2014|2015']],

  // New Universe and its later revival.
  ['D.P.7', 'Team', 'Marvel', 'New Universe', ['D.P.7|1986|1989']],
  ['Justice (New Universe)', 'Character', 'Marvel', 'New Universe', ['Justice|1986|1989']],
  ['Kickers, Inc.', 'Team', 'Marvel', 'New Universe', ['Kickers, Inc.|1986|1987']],
  ['Mark Hazzard: Merc', 'Character', 'Marvel', 'New Universe', ['Mark Hazzard: Merc|1986|1988', 'Merc|1988|1988']],
  ['Nightmask', 'Character', 'Marvel', 'New Universe', ['Nightmask|1986|1987']],
  ['Psi-Force', 'Team', 'Marvel', 'New Universe', ['Psi-Force|1986|1989']],
  ['Spitfire and the Troubleshooters', 'Team', 'Marvel', 'New Universe', ['Spitfire and the Troubleshooters|1986|1987', 'Codename: Spitfire|1987|1988']],
  ['Star Brand', 'Character', 'Marvel', 'New Universe', ['Star Brand|1986|1989', 'The Star Brand|2006|2007']],
  ['The Pitt', 'Event', 'Marvel', 'New Universe', ['The Pitt|1987|1987']],
  ['The Draft', 'Event', 'Marvel', 'New Universe', ['The Draft|1988|1988']],
  ['The War (New Universe)', 'Event', 'Marvel', 'New Universe', ['The War|1989|1989']],
  ['newuniversal', 'Series', 'Marvel', 'New Universe', ['newuniversal|2007|2008', 'newuniversal: shockfront|2008|2009']],

  // Marvel 2099 families and line-wide books.
  ['2099', 'Event', 'Marvel', '2099', ['2099 Alpha|2019|2019', '2099 Omega|2019|2019', '2099 A.D. Apocalypse|1995|1995', '2099 A.D. Genesis|1996|1996', '2099 Unlimited|1993|1996', '2099: Manifest Destiny|1998|1998', '2099: World of Tomorrow|1996|1997']],
  ['Ravage 2099', 'Character', 'Marvel', '2099', ['Ravage 2099|1992|1995']],
  ['X-Nation 2099', 'Team', 'Marvel', '2099', ['X-Nation 2099|1996|1996']],
  ['Fall of the Hammer', 'Event', 'Marvel', '2099', ['2099: Fall of the Hammer|1994|1994']],
  ['Timestorm 2009–2099', 'Event', 'Marvel', '2099', ['Timestorm 2009–2099|2009|2009']],

  // Original Ultimate Marvel and the 2023 Ultimate Universe.
  ['Cataclysm (Ultimate Marvel)', 'Event', 'Marvel', 'Ultimate Marvel', ['Cataclysm: The Ultimates\' Last Stand|2013|2014', 'Cataclysm: Ultimate Comics Spider-Man|2013|2014', 'Cataclysm: Ultimate X-Men|2013|2014']],
  ['Ultimate End', 'Event', 'Marvel', 'Ultimate Marvel', ['Ultimate End|2015|2015']],
  ['Ultimate Origins', 'Event', 'Marvel', 'Ultimate Marvel', ['Ultimate Origins|2008|2008']],
  ['Ultimate Power', 'Event', 'Marvel', 'Ultimate Marvel', ['Ultimate Power|2006|2008']],
  ['Ultimate Six', 'Event', 'Marvel', 'Ultimate Marvel', ['Ultimate Six|2003|2004']],
  ['Ultimate Marvel Team-Up', 'Series', 'Marvel', 'Ultimate Marvel', ['Ultimate Marvel Team-Up|2001|2002']],
  ['Ultimatum', 'Event', 'Marvel', 'Ultimate Marvel', ['Ultimatum|2009|2009', 'Ultimatum: Spider-Man Requiem|2009|2009', 'Ultimatum: X-Men Requiem|2009|2009']],
  ['Ultimate Endgame', 'Event', 'Marvel', 'Ultimate Universe', ['Ultimate Endgame|2025|2026']],
  ['Ultimate Invasion', 'Event', 'Marvel', 'Ultimate Universe', ['Ultimate Invasion|2023|2023']],
  ['Ultimate Wolverine', 'Character', 'Marvel', 'Ultimate Universe', ['Ultimate Wolverine|2025|2026']],
  ['Ultimate Spider-Man: Incursion', 'Event', 'Marvel', 'Ultimate Universe', ['Ultimate Spider-Man: Incursion|2025|2025']],

  // Malibu / Ultraverse.
  ['Prime (Ultraverse)', 'Character', 'Malibu Comics', 'Ultraverse', ['Prime|1993|1996', 'Prime: Gross and Disgusting|1995|1995']],
  ['Hardcase', 'Character', 'Malibu Comics', 'Ultraverse', ['Hardcase|1993|1995']],
  ['The Strangers (Ultraverse)', 'Team', 'Malibu Comics', 'Ultraverse', ['The Strangers|1993|1995']],
  ['Mantra', 'Character', 'Malibu Comics', 'Ultraverse', ['Mantra|1993|1995']],
  ['Night Man', 'Character', 'Malibu Comics', 'Ultraverse', ['Night Man|1993|1995', 'Night Man / Gambit|1996|1996']],
  ['Ultraforce', 'Team', 'Malibu Comics', 'Ultraverse', ['Ultraforce|1994|1996', 'Avengers / Ultraforce|1995|1995']],
  ['Rune', 'Character', 'Malibu Comics', 'Ultraverse', ['Rune|1994|1995', 'Rune / Silver Surfer|1995|1995', 'Rune vs. Venom|1995|1995']],
  ['Prototype', 'Character', 'Malibu Comics', 'Ultraverse', ['Prototype|1993|1995']],
  ['Firearm', 'Character', 'Malibu Comics', 'Ultraverse', ['Firearm|1993|1995']],
  ['Sludge', 'Character', 'Malibu Comics', 'Ultraverse', ['Sludge|1993|1994']],
  ['Freex', 'Team', 'Malibu Comics', 'Ultraverse', ['Freex|1993|1995']],
  ['Solitaire (Ultraverse)', 'Character', 'Malibu Comics', 'Ultraverse', ['Solitaire|1993|1994']],
  ['The Solution', 'Team', 'Malibu Comics', 'Ultraverse', ['The Solution|1993|1995']],
  ['Lord Pumpkin', 'Character', 'Malibu Comics', 'Ultraverse', ['Lord Pumpkin|1994|1995']],
  ['Ultraverse Events', 'Event', 'Malibu Comics', 'Ultraverse', ['Break-Thru|1993|1994', 'Godwheel|1995|1995', 'Black September|1995|1995', 'Phoenix Resurrection|1995|1996']],
  ['Exiles (Ultraverse)', 'Team', 'Malibu Comics', 'Ultraverse', ['Exiles|1993|1993']],

  // CrossGen catalog.
  ['Sigil', 'Series', 'CrossGen', 'CrossGen', ['Sigil|2000|2003']],
  ['Mystic (CrossGen)', 'Series', 'CrossGen', 'CrossGen', ['Mystic|2000|2003']],
  ['Scion', 'Series', 'CrossGen', 'CrossGen', ['Scion|2000|2004']],
  ['Meridian', 'Series', 'CrossGen', 'CrossGen', ['Meridian|2000|2004']],
  ['Sojourn', 'Series', 'CrossGen', 'CrossGen', ['Sojourn|2001|2004']],
  ['The First', 'Series', 'CrossGen', 'CrossGen', ['The First|2000|2003']],
  ['Ruse', 'Series', 'CrossGen', 'CrossGen', ['Ruse|2001|2004']],
  ['Negation', 'Series', 'CrossGen', 'CrossGen', ['Negation|2001|2004', 'Negation War|2004|2004', 'Negation: Lawbringer|2002|2002']],
  ['Crux', 'Series', 'CrossGen', 'CrossGen', ['Crux|2001|2004']],
  ['Route 666', 'Series', 'CrossGen', 'CrossGen', ['Route 666|2002|2004']],
  ['Brath', 'Series', 'CrossGen', 'CrossGen', ['Brath|2003|2004']],
  ['The Path', 'Series', 'CrossGen', 'CrossGen', ['The Path|2002|2003']],
  ['Solus', 'Series', 'CrossGen', 'CrossGen', ['Solus|2003|2004']],
  ['Way of the Rat', 'Series', 'CrossGen', 'CrossGen', ['Way of the Rat|2002|2004']],
  ['El Cazador', 'Series', 'CrossGen', 'CrossGen', ['El Cazador|2003|2004']],
  ['Kiss Kiss Bang Bang', 'Series', 'CrossGen', 'CrossGen', ['Kiss Kiss Bang Bang|2004|2004']],
  ['Abadazad', 'Series', 'CrossGen', 'CrossGen', ['Abadazad|2004|2004']],
  ['Lady Death: A Medieval Tale', 'Series', 'CrossGen', 'CrossGen', ['Lady Death: A Medieval Tale|2003|2004']],
  ['CrossGen Chronicles', 'Series', 'CrossGen', 'CrossGen', ['CrossGen Chronicles|2000|2002', 'CrossGenesis|2000|2000']],
  ['Mark of Charon', 'Series', 'CrossGen', 'CrossGen', ['Mark of Charon|2003|2003']],
  ['Saurians', 'Series', 'CrossGen', 'CrossGen', ['Saurians: Unnatural Selection|2002|2002']],
  ['The Silken Ghost', 'Series', 'CrossGen', 'CrossGen', ['The Silken Ghost|2003|2003']],

  // Clive Barker's Razorline.
  ['Ectokid', 'Character', 'Marvel', 'Razorline', ['Ectokid|1993|1994']],
  ['Hokum & Hex', 'Series', 'Marvel', 'Razorline', ['Hokum & Hex|1993|1994']],
  ['Hyperkind', 'Team', 'Marvel', 'Razorline', ['Hyperkind|1993|1994']],
  ['Saint Sinner', 'Character', 'Marvel', 'Razorline', ['Saint Sinner|1993|1994']],
  ['Razorline', 'Series', 'Marvel', 'Razorline', ['Razorline: First Cut|1993|1993']],

  // Marvel UK original superhero line.
  ["Death's Head", 'Character', 'Marvel UK', 'Marvel UK', ["Death's Head|1988|1989", "Death's Head II|1992|1994", "Death's Head II & the Origin of Die-Cut|1993|1993"]],
  ["Dragon's Claws", 'Team', 'Marvel UK', 'Marvel UK', ["Dragon's Claws|1988|1989"]],
  ['Knights of Pendragon', 'Team', 'Marvel UK', 'Marvel UK', ['Knights of Pendragon|1990|1991', 'Knights of Pendragon II|1992|1993']],
  ['Motormouth', 'Character', 'Marvel UK', 'Marvel UK', ['Motormouth|1992|1993', 'Motormouth & Killpower|1993|1993']],
  ['Dark Angel (Marvel UK)', 'Character', 'Marvel UK', 'Marvel UK', ["Hell's Angel|1992|1992", 'Dark Angel|1992|1993']],
  ['Warheads', 'Team', 'Marvel UK', 'Marvel UK', ['Warheads|1992|1993']],
  ['Digitek', 'Character', 'Marvel UK', 'Marvel UK', ['Digitek|1992|1993']],
  ['Plasmer', 'Character', 'Marvel UK', 'Marvel UK', ['Plasmer|1993|1994']],
  ['Mys-Tech', 'Team', 'Marvel UK', 'Marvel UK', ['Mys-Tech Wars|1993|1994']],
  ['Death Metal', 'Character', 'Marvel UK', 'Marvel UK', ['Death Metal|1994|1994', 'Death Metal vs. Genetix|1994|1994']],
  ['Genetix', 'Team', 'Marvel UK', 'Marvel UK', ['Genetix|1993|1994']],
  ['Wild Thing', 'Character', 'Marvel UK', 'Marvel UK', ['Wild Thing|1993|1994']],
  ['Overkill (Marvel UK)', 'Series', 'Marvel UK', 'Marvel UK', ['Overkill|1992|1993']],

  // Star Comics and the most common licensed/family titles from the line.
  ['Planet Terry', 'Character', 'Star', 'Star Comics', ['Planet Terry|1985|1986']],
  ['Top Dog', 'Character', 'Star', 'Star Comics', ['Top Dog|1985|1987']],
  ['Royal Roy', 'Character', 'Star', 'Star Comics', ['Royal Roy|1985|1986']],
  ['Wally the Wizard', 'Character', 'Star', 'Star Comics', ['Wally the Wizard|1985|1986']],
  ['Peter Porker, the Spectacular Spider-Ham', 'Character', 'Star', 'Star Comics', ['Peter Porker, the Spectacular Spider-Ham|1985|1987']],
  ['Muppet Babies', 'Series', 'Star', 'Star Comics', ['Muppet Babies|1985|1989']],
  ['Ewoks', 'Series', 'Star', 'Star Comics', ['Ewoks|1985|1987']],
  ['Droids', 'Series', 'Star', 'Star Comics', ['Droids|1986|1987']],
  ['Care Bears', 'Series', 'Star', 'Star Comics', ['Care Bears|1985|1989']],
  ['Fraggle Rock', 'Series', 'Star', 'Star Comics', ['Fraggle Rock|1985|1986']],
  ['Heathcliff', 'Character', 'Star', 'Star Comics', ['Heathcliff|1985|1988']],
  ['Madballs', 'Series', 'Star', 'Star Comics', ['Madballs|1986|1988']],
  ['Count Duckula', 'Character', 'Star', 'Star Comics', ['Count Duckula|1988|1990']],
  ['Defenders of the Earth', 'Team', 'Star', 'Star Comics', ['Defenders of the Earth|1987|1987']],
  ['Inhumanoids', 'Team', 'Star', 'Star Comics', ['Inhumanoids|1987|1987']],
  ['Popples', 'Series', 'Star', 'Star Comics', ['Popples|1986|1987']],
  ['SilverHawks', 'Team', 'Star', 'Star Comics', ['SilverHawks|1987|1987']],
  ['Thundercats', 'Team', 'Star', 'Star Comics', ['Thundercats|1985|1988']],
  ['ALF', 'Character', 'Marvel', 'Star Comics', ['ALF|1988|1992']],
  ['Chuck Norris and the Karate Kommandos', 'Team', 'Star', 'Star Comics', ['Chuck Norris and the Karate Kommandos|1987|1987']],
  ['The Flintstone Kids', 'Series', 'Star', 'Star Comics', ['The Flintstone Kids|1987|1989']],
  ['The Get Along Gang', 'Series', 'Star', 'Star Comics', ['The Get Along Gang|1985|1986']],

  // Other historically important Marvel-published licensed series.
  ['2001: A Space Odyssey', 'Series', 'Marvel', 'Licensed', ['2001: A Space Odyssey|1976|1977']],
  ['Battlestar Galactica', 'Series', 'Marvel', 'Licensed', ['Battlestar Galactica|1979|1981']],
  ['The Dark Crystal', 'Series', 'Marvel', 'Licensed', ['The Dark Crystal|1983|1983']],
  ['Dune', 'Series', 'Marvel', 'Licensed', ['Dune|1985|1985']],
  ['Labyrinth', 'Series', 'Marvel', 'Licensed', ['Labyrinth|1986|1986']],
  ['Masters of the Universe', 'Series', 'Marvel', 'Licensed', ['Masters of the Universe|1986|1988']],
  ['Planet of the Apes', 'Series', 'Marvel', 'Licensed', ['Planet of the Apes|1975|1976', 'Adventures on the Planet of the Apes|1975|1976']],
  ['Red Sonja', 'Character', 'Marvel', 'Licensed', ['Red Sonja|1977|1979', 'The Savage Sword of Conan|1975|1986']],
  ['NFL SuperPro', 'Character', 'Marvel', 'Licensed', ['NFL SuperPro|1991|1992']],
  ['Nightcat', 'Character', 'Marvel', 'Licensed', ['Nightcat|1991|1991']],
];

const canonicalParent = new Map();
for (const [authority, , , , titles] of families) {
  for (const packed of titles) canonicalParent.set(packed.split('|')[0].toLowerCase(), authority);
}

// Correct already-existing records only where the full-catalog audit establishes a clear title family.
const explicitParentFixes = {
  'amazing spider-man': 'Spider-Man',
  'the amazing spider-man': 'Spider-Man',
  'captain america': 'Captain America',
  'casanova': 'Casanova',
  'conan the barbarian': 'Conan the Barbarian',
  'daredevil': 'Daredevil',
  'daughters of the dragon': 'Daughters of the Dragon',
  'devil’s reign': "Devil's Reign",
  "devil's reign": "Devil's Reign",
  'marvel knights 20th': 'Marvel Knights',
  'marvel knights: the world to come': 'Marvel Knights',
  'alias': 'Jessica Jones',
  'jessica jones': 'Jessica Jones',
  'jessica jones: blind spot': 'Jessica Jones',
  'jessica jones: purple daughter': 'Jessica Jones',
  'the pulse': 'Jessica Jones',
  'moon girl and devil dinosaur': 'Moon Girl and Devil Dinosaur',
  'strange academy': 'Strange Academy',
  'the twelve': 'The Twelve',
  'the union': 'The Union',
  'ghost rider': 'Ghost Rider',
  'iron fist': 'Iron Fist',
  'iron man': 'Iron Man',
  'kick-ass': 'Kick-Ass',
  'planet of the apes': 'Planet of the Apes',
  'prime': 'Prime (Ultraverse)',
  'the strangers': 'The Strangers (Ultraverse)',
  'predator': 'Alien / Predator',
  'legion of monsters': 'Legion of Monsters',
  'strange academy: blood hunt': 'Blood Hunt',
  'supreme power': 'Supreme Power',
  'supreme power: hyperion': 'Supreme Power',
  'supreme power: nighthawk': 'Supreme Power',
  'ultimate end': 'Ultimate End',
  'ultimate power': 'Ultimate Power',
  'ultimate six': 'Ultimate Six',
  'ultimate origins': 'Ultimate Origins',
  'ultimatum': 'Ultimatum',
  'ultimate endgame': 'Ultimate Endgame',
  'ultimate invasion': 'Ultimate Invasion',
  'ultimate wolverine': 'Ultimate Wolverine',
  'ultimate spider-man: incursion': 'Ultimate Spider-Man: Incursion',
  '2099 alpha': '2099',
  '2099 omega': '2099',
  'conan 2099': 'Conan the Barbarian',
};

const lineByTitle = new Map();
for (const [, , , line, titles] of families) {
  for (const packed of titles) if (line) lineByTitle.set(packed.split('|')[0].toLowerCase(), line);
}

let fixed = 0;
for (const record of data) {
  if (record.primary) continue;
  const key = String(record.display || record.series || '').trim().toLowerCase();
  const target = explicitParentFixes[key];
  if (target && record.parent !== target) {
    record.parent = target;
    fixed++;
  }
  const line = lineByTitle.get(key);
  if (line && !record.publishingLine) record.publishingLine = line;
}

const primaryNames = new Set(data.filter(r => r.primary).map(r => String(r.display).toLowerCase()));
const existingSeries = new Set(data.filter(r => !r.primary).map(r => `${String(r.display).toLowerCase()}|${r.startYear || ''}|${String(r.parent).toLowerCase()}`));
let nextAuthority = 1;
let nextSeries = 1;
while (data.some(r => r.id === `MCA-${String(nextAuthority).padStart(4, '0')}`)) nextAuthority++;
while (data.some(r => r.id === `MCS-${String(nextSeries).padStart(4, '0')}`)) nextSeries++;

const auditRows = [['action', 'authority', 'title', 'publisher', 'publishing_line', 'start_year', 'end_year']];
let addedAuthorities = 0;
let addedSeries = 0;

for (const [authority, type, publisher, line, titles] of families) {
  auditRows.push(['AUDIT AUTHORITY', authority, '', publisher, line, '', '']);
  if (!primaryNames.has(authority.toLowerCase())) {
    data.push({
      id: `MCA-${String(nextAuthority++).padStart(4, '0')}`,
      display: authority,
      parent: '',
      series: authority,
      primary: true,
      publisher,
      type,
      level: 'Recommended',
      sort: authority,
      printedTitle: authority,
      notes: 'Primary filing authority verified during the comprehensive Marvel catalog and imprint audit.',
      ...(line ? { publishingLine: line } : {}),
    });
    primaryNames.add(authority.toLowerCase());
    addedAuthorities++;
    auditRows.push(['ADD AUTHORITY', authority, '', publisher, line, '', '']);
  }
  for (const packed of titles) {
    const [title, startYear, endYear] = packed.split('|');
    auditRows.push(['AUDIT SERIES', authority, title, publisher, line, startYear, endYear]);
    const exact = `${title.toLowerCase()}|${startYear || ''}|${authority.toLowerCase()}`;
    if (existingSeries.has(exact)) continue;
    const sameTitle = data.find(r => !r.primary && String(r.display).toLowerCase() === title.toLowerCase() && String(r.parent).toLowerCase() === authority.toLowerCase() && (!startYear || String(r.startYear || '') === startYear));
    if (sameTitle) continue;
    data.push({
      id: `MCS-${String(nextSeries++).padStart(4, '0')}`,
      display: title,
      parent: authority,
      series: title,
      primary: false,
      publisher,
      type: 'Series',
      level: 'Recommended',
      sort: title,
      printedTitle: title,
      notes: 'Verified during the comprehensive Marvel catalog and imprint audit.',
      ...(startYear ? { startYear: Number(startYear) } : {}),
      ...(endYear ? { endYear: Number(endYear) } : {}),
      ...(line ? { publishingLine: line } : {}),
    });
    existingSeries.add(exact);
    addedSeries++;
    auditRows.push(['ADD SERIES', authority, title, publisher, line, startYear, endYear]);
  }
}

// If an exact title has canonical records, ensure all Marvel-published copies agree unless the title is intentionally universe-qualified.
for (const record of data) {
  if (record.primary) continue;
  const key = String(record.display).toLowerCase();
  const target = canonicalParent.get(key);
  if (!target) continue;
  if (['exiles', 'justice', 'mystic', 'prime', 'solitaire', 'the strangers'].includes(key)) continue;
  if (/Marvel|Malibu|CrossGen|Epic|Icon|Star/.test(String(record.publisher)) && record.parent !== target) {
    record.parent = target;
    fixed++;
  }
}

// Remove duplicate audit-added rows when an older canonical record was repaired into the same family.
const duplicateGroups = new Map();
for (const record of data.filter(r => !r.primary)) {
  const key = [String(record.display).toLowerCase(), String(record.startYear || ''), String(record.parent).toLowerCase()].join('|');
  if (!duplicateGroups.has(key)) duplicateGroups.set(key, []);
  duplicateGroups.get(key).push(record);
}
const removeIds = new Set();
for (const group of duplicateGroups.values()) {
  if (group.length < 2) continue;
  const keep = group.find(r => !String(r.id).startsWith('MCS-')) || group[0];
  for (const record of group) if (record !== keep && String(record.id).startsWith('MCS-')) removeIds.add(record.id);
}
for (let i = data.length - 1; i >= 0; i--) if (removeIds.has(data[i].id)) data.splice(i, 1);

data.sort((a, b) => String(a.sort || a.display).localeCompare(String(b.sort || b.display), 'en', { sensitivity: 'base' }) || String(a.id).localeCompare(String(b.id)));

const ids = new Set();
for (const record of data) {
  if (ids.has(record.id)) throw new Error(`Duplicate ID: ${record.id}`);
  ids.add(record.id);
}
const primaries = new Set(data.filter(r => r.primary).map(r => String(r.display).toLowerCase()));
const unresolved = data.filter(r => !r.primary && !primaries.has(String(r.parent).toLowerCase()));
if (unresolved.length) throw new Error(`Unresolved parents: ${unresolved.slice(0, 10).map(r => `${r.display} -> ${r.parent}`).join(', ')}`);

const conflicts = [];
const titleParents = new Map();
for (const record of data.filter(r => !r.primary)) {
  const key = String(record.display).trim().toLowerCase();
  if (!titleParents.has(key)) titleParents.set(key, new Set());
  titleParents.get(key).add(String(record.parent).trim().toLowerCase());
}
for (const [title, parents] of titleParents) if (parents.size > 1) conflicts.push([title, [...parents]]);

fs.writeFileSync(comicsPath, `${JSON.stringify(data, null, 2)}\n`);
fs.writeFileSync(auditPath, auditRows.map(row => row.map(v => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n') + '\n');

console.log(JSON.stringify({
  before: 4311,
  after: data.length,
  addedAuthorities,
  addedSeries,
  repairedRelationships: fixed,
  duplicateAuditRowsRemoved: removeIds.size,
  marvelRecords: data.filter(r => /Marvel|Malibu|CrossGen|Epic|Icon|Star/.test(String(r.publisher))).length,
  duplicateIds: data.length - ids.size,
  unresolvedParents: unresolved.length,
  exactTitleConflicts: conflicts.length,
  conflicts: conflicts.slice(0, 30),
}, null, 2));
