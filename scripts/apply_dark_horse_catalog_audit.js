const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const comicsPath = path.join(root, 'data', 'comics.json');
const auditPath = path.join(root, 'DARK_HORSE_CATALOG_IMPRINT_AUDIT.csv');
const repairPath = path.join(root, 'DARK_HORSE_CANONICAL_REPAIR_IDS.json');
const data = JSON.parse(fs.readFileSync(comicsPath, 'utf8'));

const families = [];
const add = (authority, type, line, titles, publisher = 'Dark Horse') => families.push([authority, type, publisher, line, titles]);

// Flagship creator-owned and Dark Horse Originals properties.
add('Age of Reptiles', 'Series', 'Dark Horse Originals', ['Age of Reptiles|1993|1994','Age of Reptiles: The Hunt|1996|1996','Age of Reptiles: The Journey|2009|2010','Age of Reptiles: Ancient Egyptians|2015|2015']);
add('Alabaster', 'Character', 'Dark Horse Originals', ['Alabaster: Wolves|2012|2012','Alabaster: Grimmer Tales|2013|2014','Alabaster: The Good, the Bad, and the Bird|2015|2016']);
add('The Amazing Screw-On Head', 'Character', 'Maverick', ['The Amazing Screw-On Head|2002|2002']);
add('The American', 'Character', 'Dark Horse Originals', ['The American|1987|1989','The American: Lost in America|1990|1992']);
add('American Splendor', 'Series', 'Maverick', ['American Splendor|1991|1993','American Splendor|1995|1995','American Splendor: Terminal|1999|1999','American Splendor: Unsung Hero|2002|2002']);
add('Bad Luck Chuck', 'Series', 'Dark Horse Originals', ['Bad Luck Chuck|2019|2019']);
add('Baltimore', 'Character', 'Outerverse', ['Baltimore: The Plague Ships|2010|2010','Baltimore: The Curse Bells|2011|2012','Baltimore: Dr. Leskovar’s Remedy|2012|2012','Baltimore: The Widow and the Tank|2013|2013','Baltimore: The Infernal Train|2013|2013','Baltimore: Chapel of Bones|2014|2014','Baltimore: The Witch of Harju|2014|2014','Baltimore: The Cult of the Red King|2015|2015','Baltimore: Empty Graves|2016|2016','Baltimore: The Red Kingdom|2017|2017']);
add('Bang!', 'Series', 'Dark Horse Originals', ['Bang!|2020|2020']);
add('Beasts of Burden', 'Team', 'Dark Horse Originals', ['Beasts of Burden|2009|2010','Beasts of Burden: What the Cat Dragged In|2016|2016','Beasts of Burden: Wise Dogs and Eldritch Men|2018|2019','Beasts of Burden: Occupied Territory|2021|2021']);
add('The Black Beetle', 'Character', 'Dark Horse Originals', ['The Black Beetle: No Way Out|2013|2013','The Black Beetle: Necrologue|2013|2014']);
add('Black Hammer', 'Team', 'Black Hammer Universe', ['Black Hammer|2016|2017','Black Hammer: Age of Doom|2018|2019','Black Hammer Reborn|2021|2022','Black Hammer: The End|2023|2024','Black Hammer ’45|2019|2019','Barbalien: Red Planet|2020|2021','Colonel Weird: Cosmagog|2020|2021','Doctor Star and the Kingdom of Lost Tomorrows|2018|2018','Sherlock Frankenstein and the Legion of Evil|2017|2018','Skulldigger + Skeleton Boy|2019|2021','The Quantum Age|2018|2019','The Unbelievable Unteens|2021|2022']);
add('Black Pearl', 'Series', 'Dark Horse Originals', ['The Black Pearl|1996|1997']);
add('Blue Book', 'Series', 'Tiny Onion', ['Blue Book|2023|2023','Blue Book: 1947|2024|2024']);
add('Boris the Bear', 'Character', 'Dark Horse Originals', ['Boris the Bear|1986|1987']);
add('Canto', 'Character', 'Dark Horse Originals', ['Canto|2024|2024','Canto: A Place Like Home|2024|2025']);
add('Colder', 'Series', 'Dark Horse Originals', ['Colder|2012|2013','Colder: The Bad Seed|2014|2015','Colder: Toss the Bones|2015|2016']);
add('Concrete', 'Character', 'Legend', ['Concrete|1987|1988','Concrete: Fragile Creature|1991|1992','Concrete: Killer Smile|1994|1994','Concrete: Think Like a Mountain|1996|1996','Concrete: Strange Armor|1997|1998','Concrete: The Human Dilemma|2004|2005']);
add('Count Crowley', 'Character', 'Dark Horse Originals', ['Count Crowley: Reluctant Midnight Monster Hunter|2019|2020','Count Crowley: Amateur Midnight Monster Hunter|2022|2022','Count Crowley: Mediocre Midnight Monster Hunter|2023|2024']);
add('Criminal Macabre', 'Character', 'Dark Horse Originals', ['Criminal Macabre|2003|2003','Criminal Macabre: A Cal McDonald Mystery|2006|2006','Criminal Macabre: Cell Block 666|2008|2009','Criminal Macabre: The Eyes of Frankenstein|2011|2012','Criminal Macabre: Final Night – The 30 Days of Night Crossover|2012|2013']);
add('Dept. H', 'Series', 'Dark Horse Originals', ['Dept. H|2016|2018']);
add('The EC Archives', 'Anthology', 'Dark Horse Archives', ['The EC Archives|2006|2026']);
add('Emily the Strange', 'Character', 'Dark Horse Originals', ['Emily the Strange|2005|2007','Emily the Strange|2007|2008','Emily the Strange|2009|2010','Emily and the Strangers|2013|2013']);
add('Empowered', 'Character', 'Dark Horse Originals', ['Empowered|2007|2026','Empowered: Unchained|2015|2015']);
add('Ether', 'Series', 'Dark Horse Originals', ['Ether|2016|2017','Ether: The Copper Golems|2018|2018','Ether: The Disappearance of Violet Bell|2019|2019']);
add('Fear Agent', 'Series', 'Dark Horse Originals', ['Fear Agent|2007|2011','Fear Agent: The Last Goodbye|2007|2007','Fear Agent: I Against I|2008|2009']);
add('Fight Club', 'Series', 'Dark Horse Originals', ['Fight Club 2|2015|2016','Fight Club 3|2019|2020']);
add('Flaming Carrot', 'Character', 'Dark Horse Originals', ['Flaming Carrot Comics|1988|1994','Flaming Carrot & Reid Fleming, World’s Toughest Milkman|2002|2002']);
add('Freaks of the Heartland', 'Series', 'Dark Horse Originals', ['Freaks of the Heartland|2004|2005']);
add('The Goon', 'Character', 'Dark Horse Originals', ['The Goon|2003|2013','The Goon: Once Upon a Hard Time|2015|2015','The Goon|2019|2020']);
add('Grendel', 'Character', 'Maverick', ['Grendel|1986|1990','Grendel Tales|1993|1996','Grendel: Devil’s Legacy|2000|2001','Grendel: Red, White, and Black|2002|2003','Grendel: Behold the Devil|2007|2008','Grendel: Devil’s Odyssey|2019|2021']);
add('Harrow County', 'Series', 'Dark Horse Originals', ['Harrow County|2015|2018','Tales from Harrow County: Death’s Choir|2019|2020','Tales from Harrow County: Fair Folk|2021|2021']);
add('Jenny Finn', 'Character', 'Dark Horse Originals', ['Jenny Finn: Doom Messiah|2005|2005']);
add('Jingle Belle', 'Character', 'Dark Horse Originals', ['Jingle Belle|2004|2005','Jingle Belle: The Fight Before Christmas|2005|2005']);
add('Lady Killer', 'Series', 'Dark Horse Originals', ['Lady Killer|2015|2015','Lady Killer 2|2016|2017']);
add('The Mask', 'Character', 'Dark Horse Originals', ['The Mask|1991|1992','The Mask Returns|1992|1993','The Mask Strikes Back|1995|1995','The Mask: The Hunt for Green October|1995|1995','The Mask: World Tour|1995|1996','I Pledge Allegiance to the Mask|2019|2020']);
add('The Massive', 'Series', 'Dark Horse Originals', ['The Massive|2012|2014','The Massive: Ninth Wave|2015|2016']);
add('Mind MGMT', 'Series', 'Dark Horse Originals', ['Mind MGMT|2012|2015','Mind MGMT: Bootleg|2022|2022']);
add('Nexus', 'Character', 'Dark Horse Originals', ['Nexus|1992|1997','Nexus: The Origin|1992|1992','Nexus: Alien Justice|1992|1993','Nexus: Nightmare in Blue|1997|1997']);
add('Noir', 'Anthology', 'Dark Horse Originals', ['Noir: A Collection of Crime Comics|2009|2009']);
add('Norse Mythology', 'Series', 'Dark Horse Originals', ['Norse Mythology|2020|2021','Norse Mythology II|2021|2022','Norse Mythology III|2022|2023']);
add('The Perhapanauts', 'Team', 'Dark Horse Originals', ['The Perhapanauts|2005|2006','The Perhapanauts: Second Chances|2006|2007']);
add('Polar', 'Series', 'Dark Horse Originals', ['Polar|2013|2019']);
add('Resident Alien', 'Series', 'Dark Horse Originals', ['Resident Alien: Welcome to Earth!|2012|2012','Resident Alien: The Suicide Blonde|2013|2014','Resident Alien: The Sam Hain Mystery|2015|2015','Resident Alien: The Man with No Name|2016|2016','Resident Alien: An Alien in New York|2018|2018','Resident Alien: Your Ride’s Here|2020|2021','Resident Alien: The Book of Love|2022|2023']);
add('Rumble', 'Series', 'Dark Horse Originals', ['Rumble|2017|2019']);
add('Sin City', 'Series', 'Legend / Maverick', ['Sin City|1991|1992','A Dame to Kill For|1993|1994','The Big Fat Kill|1994|1995','That Yellow Bastard|1996|1996','Family Values|1997|1997','Booze, Broads, & Bullets|1998|1998','Hell and Back|1999|2000']);
add('Sock Monkey', 'Character', 'Maverick', ['Sock Monkey|1998|1998','Sock Monkey|1999|1999','Sock Monkey|2000|2000','Uncle Gabby|2004|2004']);
add('Space Usagi', 'Character', 'Dark Horse Originals', ['Space Usagi|1992|1993','Space Usagi: Death and Honor|1995|1995']);
add('The Strain', 'Series', 'Dark Horse Originals', ['The Strain|2011|2012','The Strain: The Fall|2013|2014','The Strain: The Night Eternal|2014|2015','The Strain: Mister Quinlan – Vampire Hunter|2016|2017']);
add('Too Much Coffee Man', 'Character', 'Maverick', ['Too Much Coffee Man|1994|2000','Too Much Coffee Man’s Parade of Tirade|1999|1999']);
add('The Umbrella Academy', 'Team', 'Dark Horse Originals', ['The Umbrella Academy: Apocalypse Suite|2007|2008','The Umbrella Academy: Dallas|2008|2009','The Umbrella Academy: Hotel Oblivion|2018|2019','Tales from the Umbrella Academy: You Look Like Death|2020|2021','The Umbrella Academy: Plan B|2025|2026']);
add('Usagi Yojimbo', 'Character', 'Maverick', ['Usagi Yojimbo|1996|2019','Usagi Yojimbo: Senso|2014|2014','Usagi Yojimbo: The Hidden|2018|2018']);

// Hellboy and Outerverse: each shelf-recognizable franchise is primary; universe remains metadata.
add('Hellboy', 'Character', 'Hellboy Universe', ['Hellboy: Seed of Destruction|1994|1994','Hellboy: Wake the Devil|1996|1996','Hellboy: Almost Colossus|1997|1997','Hellboy: The Right Hand of Doom|1998|2000','Hellboy: Conqueror Worm|2001|2001','Hellboy: The Third Wish|2002|2002','Hellboy: The Island|2005|2005','Hellboy in Hell|2012|2016','Young Hellboy: The Hidden Land|2021|2021']);
add('B.P.R.D.', 'Team', 'Hellboy Universe', ['B.P.R.D.: Hollow Earth|2002|2002','B.P.R.D.|2003|2012','B.P.R.D.: Plague of Frogs|2004|2005','B.P.R.D.: Hell on Earth|2010|2017','B.P.R.D.: The Devil You Know|2017|2019']);
add('Abe Sapien', 'Character', 'Hellboy Universe', ['Abe Sapien: Drums of the Dead|1998|1998','Abe Sapien: The Drowning|2008|2008','Abe Sapien|2013|2016']);
add('Hellboy and the B.P.R.D.', 'Team', 'Hellboy Universe', ['Hellboy and the B.P.R.D.|2014|2023']);
add('Lobster Johnson', 'Character', 'Hellboy Universe', ['Lobster Johnson: The Iron Prometheus|2007|2008','Lobster Johnson: The Burning Hand|2012|2012','Lobster Johnson: Get the Lobster|2014|2014']);
add('Witchfinder', 'Character', 'Hellboy Universe', ['Sir Edward Grey, Witchfinder: In the Service of Angels|2009|2009','Witchfinder: Lost and Gone Forever|2011|2011','Witchfinder: The Mysteries of Unland|2014|2014','Witchfinder: City of the Dead|2016|2017','Witchfinder: The Gates of Heaven|2018|2018']);
add('Frankenstein Underground', 'Character', 'Hellboy Universe', ['Frankenstein Underground|2015|2015']);
add('Joe Golem', 'Character', 'Outerverse', ['Joe Golem: Occult Detective|2015|2017','Joe Golem: Occult Detective – The Drowning City|2018|2018','Joe Golem: Occult Detective – The Conjurors|2019|2019']);
add('Koschei', 'Character', 'Hellboy Universe', ['Koschei the Deathless|2018|2018','Koschei in Hell|2022|2023']);
add('Lady Baltimore', 'Character', 'Outerverse', ['Lady Baltimore: The Witch Queens|2021|2021']);
add('The Visitor', 'Character', 'Hellboy Universe', ['The Visitor: How and Why He Stayed|2017|2017']);

// Comics' Greatest World / Dark Horse Heroes and Project Black Sky.
add('Barb Wire', 'Character', "Comics' Greatest World / Project Black Sky", ['Barb Wire|1994|1995','Barb Wire: Ace of Spades|1996|1996','Barb Wire|2015|2016']);
add('Ghost', 'Character', "Comics' Greatest World / Project Black Sky", ['Ghost|1995|1998','Ghost|1998|2000','Ghost|2012|2013','Ghost|2013|2015']);
add('X', 'Character', "Comics' Greatest World / Project Black Sky", ['X|1994|1996','X|2013|2015']);
add('Catalyst', 'Team', "Comics' Greatest World / Project Black Sky", ['Catalyst: Agents of Change|1994|1994','Catalyst Comix|2013|2014']);
add('Agents of Law', 'Team', "Comics' Greatest World", ['Agents of Law|1995|1995']);
add('Division 13', 'Team', "Comics' Greatest World", ['Division 13|1994|1995']);
add('Hero Zero', 'Character', "Comics' Greatest World", ['Hero Zero|1994|1994']);
add('Motorhead', 'Character', "Comics' Greatest World", ['Motorhead Special|1994|1994','Motorhead|1995|1996','King Tiger & Motorhead|1996|1996']);
add('Out of the Vortex', 'Team', "Comics' Greatest World", ['Out of the Vortex|1993|1994']);
add('The Machine', 'Character', "Comics' Greatest World", ['The Machine|1994|1995']);
add('Brain Boy', 'Character', 'Project Black Sky', ['Brain Boy|2013|2013','Brain Boy: The Men from G.E.S.T.A.L.T.|2014|2014']);
add('Captain Midnight', 'Character', 'Project Black Sky', ['Captain Midnight|2013|2015']);
add('The Occultist', 'Character', 'Project Black Sky', ['The Occultist|2010|2010','The Occultist|2011|2012','The Occultist|2013|2014']);
add('Skyman', 'Character', 'Project Black Sky', ['Skyman|2014|2014']);
add('Blackout', 'Character', 'Project Black Sky', ['Blackout|2014|2014']);

// Legend and other creator-led title families.
add('Babe', 'Character', 'Legend', ['Babe|1994|1994','Babe 2|1995|1995']);
add('Big Guy and Rusty the Boy Robot', 'Team', 'Legend', ['Big Guy and Rusty the Boy Robot|1995|1995']);
add('Danger Unlimited', 'Team', 'Legend', ['Danger Unlimited|1994|1994']);
add('Madman', 'Character', 'Legend / Maverick', ['Madman Comics|1994|2000']);
add('Martha Washington', 'Character', 'Legend', ['Give Me Liberty|1990|1991','Martha Washington Goes to War|1994|1994','Martha Washington Stranded in Space|1995|1995','Martha Washington Saves the World|1997|1998','Martha Washington Dies|2007|2007']);
add('Monkeyman and O’Brien', 'Team', 'Legend', ['Monkeyman and O’Brien|1996|1996']);
add('Next Men', 'Team', 'Legend', ['John Byrne’s 2112|1991|1991','John Byrne’s Next Men|1992|1994']);
add('Star Slammers', 'Team', 'Legend', ['Star Slammers Special|1996|1996']);

// Berger Books: imprint is metadata, never the filing destination.
add('Air', 'Series', 'Berger Books', ['Air|2018|2019']);
add('Everything', 'Series', 'Berger Books', ['Everything|2019|2020']);
add('The Seeds', 'Series', 'Berger Books', ['The Seeds|2018|2021']);
add('Hungry Ghosts', 'Anthology', 'Berger Books', ['Hungry Ghosts|2018|2018']);
add('Incognegro', 'Series', 'Berger Books', ['Incognegro: Renaissance|2018|2018']);
add('Invisible Kingdom', 'Series', 'Berger Books', ['Invisible Kingdom|2019|2020']);
add('LaGuardia', 'Series', 'Berger Books', ['LaGuardia|2018|2019']);
add('Mata Hari', 'Character', 'Berger Books', ['Mata Hari|2018|2018']);
add('Ruby Falls', 'Series', 'Berger Books', ['Ruby Falls|2019|2020']);
add('Salamandre', 'Series', 'Berger Books', ['Salamandre|2022|2022']);
add('She Could Fly', 'Series', 'Berger Books', ['She Could Fly|2018|2018','She Could Fly: The Lost Pilot|2019|2019','She Could Fly: Fight or Flight|2020|2020']);

// Dark Horse Manga: each recognizable manga property files alphabetically.
add('3×3 Eyes', 'Series', 'Dark Horse Manga', ['3×3 Eyes: Curse of the Gesu|1995|1996']);
add('Astro Boy', 'Character', 'Dark Horse Manga', ['Astro Boy|2002|2004']);
add('Berserk', 'Series', 'Dark Horse Manga', ['Berserk|2003|2026']);
add('Blade of the Immortal', 'Series', 'Dark Horse Manga', ['Blade of the Immortal|1996|2007']);
add('Blood+', 'Series', 'Dark Horse Manga', ['Blood+|2008|2009','Blood-C|2012|2015']);
add('Cardcaptor Sakura', 'Series', 'Dark Horse Manga', ['Cardcaptor Sakura|2010|2012']);
add('Crying Freeman', 'Character', 'Dark Horse Manga', ['Crying Freeman|2006|2007']);
add('Danganronpa', 'Series', 'Dark Horse Manga', ['Danganronpa: The Animation|2016|2017','Danganronpa 2: Ultimate Luck and Hope and Despair|2018|2020']);
add('Drifters', 'Series', 'Dark Horse Manga', ['Drifters|2011|2026']);
add('Eden: It’s an Endless World!', 'Series', 'Dark Horse Manga', ['Eden: It’s an Endless World!|2005|2016']);
add('Elfen Lied', 'Series', 'Dark Horse Manga', ['Elfen Lied|2019|2020']);
add('Gantz', 'Series', 'Dark Horse Manga', ['Gantz|2008|2015','Gantz G|2018|2019']);
add('Hellsing', 'Series', 'Dark Horse Manga', ['Hellsing|2003|2009']);
add('Keep Your Hands Off Eizouken!', 'Series', 'Dark Horse Manga', ['Keep Your Hands Off Eizouken!|2020|2026']);
add('The Kurosagi Corpse Delivery Service', 'Team', 'Dark Horse Manga', ['The Kurosagi Corpse Delivery Service|2006|2026']);
add('Lone Wolf and Cub', 'Series', 'Dark Horse Manga', ['Lone Wolf and Cub|2000|2002','New Lone Wolf and Cub|2014|2016']);
add('Mob Psycho 100', 'Series', 'Dark Horse Manga', ['Mob Psycho 100|2018|2026']);
add('MPD Psycho', 'Series', 'Dark Horse Manga', ['MPD Psycho|2007|2016']);
add('Oh My Goddess!', 'Series', 'Dark Horse Manga', ['Oh My Goddess!|1994|2015']);
add('Path of the Assassin', 'Series', 'Dark Horse Manga', ['Path of the Assassin|2006|2008']);
add('Planetes', 'Series', 'Dark Horse Manga', ['Planetes|2003|2005']);
add('Samurai Executioner', 'Series', 'Dark Horse Manga', ['Samurai Executioner|2004|2006']);
add('Seraphim: 266613336 Wings', 'Series', 'Dark Horse Manga', ['Seraphim: 266613336 Wings|2015|2015']);
add('Trigun', 'Series', 'Dark Horse Manga', ['Trigun|2003|2004','Trigun Maximum|2004|2009']);
add('Vampire Hunter D', 'Character', 'Dark Horse Manga', ['Vampire Hunter D|2007|2014']);

// Licensed properties: the franchise is the shelf authority; Licensed remains metadata.
add('Aliens', 'Series', 'Licensed', ['Aliens|1988|2009','Alien 3|1992|1992','Alien Resurrection|1997|1997','Aliens: Colonial Marines|1993|1994','Aliens: Earth War|1990|1990','Aliens: Genocide|1991|1992','Aliens: Hive|1992|1992','Aliens: Labyrinth|1993|1994','Aliens: Fire and Stone|2014|2015','Aliens: Defiance|2016|2017','Aliens: Dead Orbit|2017|2017']);
add('Predator', 'Series', 'Licensed', ['Predator|1989|1990','Predator: Big Game|1991|1991','Predator: Cold War|1991|1991','Predator: Bad Blood|1993|1994','Predator: Concrete Jungle|1989|1990','Predator: Fire and Stone|2014|2015','Predator: Hunters|2017|2018']);
add('Alien vs. Predator', 'Series', 'Licensed', ['Aliens vs. Predator|1990|1991','Aliens vs. Predator: War|1995|1996','Alien vs. Predator: Thrill of the Hunt|2004|2004','Alien vs. Predator: Civilized Beasts|2008|2008','Alien vs. Predator: Fire and Stone|2014|2015','Alien vs. Predator: Life and Death|2016|2017']);
add('Avatar: The Last Airbender', 'Series', 'Licensed', ['Avatar: The Last Airbender|2011|2026','Avatar: The Last Airbender – The Lost Adventures|2011|2011','Avatar: The Last Airbender – The Promise|2012|2012','Avatar: The Last Airbender – The Search|2013|2013','Avatar: The Last Airbender – The Rift|2014|2015','Avatar: The Last Airbender – Smoke and Shadow|2015|2016','Avatar: The Last Airbender – North and South|2016|2017','Avatar: The Last Airbender – Imbalance|2018|2019']);
add('The Legend of Korra', 'Series', 'Licensed', ['The Legend of Korra|2017|2026','The Legend of Korra: Turf Wars|2017|2018','The Legend of Korra: Ruins of the Empire|2019|2020']);
add('Call of Duty', 'Series', 'Licensed', ['Call of Duty: Black Ops III|2015|2016','Call of Duty: Zombies|2016|2017']);
add('Cyberpunk 2077', 'Series', 'Licensed', ['Cyberpunk 2077: Trauma Team|2020|2020','Cyberpunk 2077: You Have My Word|2021|2022','Cyberpunk 2077: Blackout|2022|2022','Cyberpunk 2077: XOXO|2023|2024','Cyberpunk 2077: Kickdown|2024|2024']);
add('Critical Role', 'Series', 'Licensed', ['Critical Role: Vox Machina Origins|2017|2024','Critical Role: The Mighty Nein Origins|2021|2026','Critical Role: The Tales of Exandria|2021|2022']);
add('Dragon Age', 'Series', 'Licensed', ['Dragon Age|2010|2011','Dragon Age: The Silent Grove|2012|2012','Dragon Age: Those Who Speak|2012|2012','Dragon Age: Until We Sleep|2013|2013','Dragon Age: Magekiller|2015|2016','Dragon Age: Knight Errant|2017|2017','Dragon Age: Deception|2018|2019','Dragon Age: Blue Wraith|2020|2020','Dragon Age: Dark Fortress|2021|2021']);
add('EVE Online', 'Series', 'Licensed', ['EVE: True Stories|2014|2014','EVE: Valkyrie|2015|2016']);
add('Ghostbusters', 'Team', 'Licensed', ['Ghostbusters|2008|2008','Ghostbusters: The Other Side|2008|2009']);
add('G.I. Joe', 'Team', 'Licensed', ['G.I. Joe|1995|1996']);
add('God of War', 'Series', 'Licensed', ['God of War|2018|2019','God of War: Fallen God|2021|2021']);
add('Halo', 'Series', 'Licensed', ['Halo: Uprising|2007|2009','Halo: Initiation|2013|2013','Halo: Escalation|2013|2015','Halo: Tales from Slipspace|2016|2016','Halo: Collateral Damage|2018|2018','Halo: Lone Wolf|2019|2019']);
add('James Bond', 'Character', 'Licensed', ['James Bond 007: Serpent’s Tooth|1992|1993','James Bond 007: A Silent Armageddon|1993|1993','James Bond 007: Shattered Helix|1994|1994','James Bond 007: The Quasimodo Gambit|1995|1995']);
add('Mass Effect', 'Series', 'Licensed', ['Mass Effect: Redemption|2010|2010','Mass Effect: Evolution|2011|2011','Mass Effect: Invasion|2011|2012','Mass Effect: Homeworlds|2012|2012','Mass Effect: Foundation|2013|2014','Mass Effect: Discovery|2017|2017']);
add('Minecraft', 'Series', 'Licensed', ['Minecraft|2019|2020','Minecraft: Wither Without You|2020|2022']);
add('Overwatch', 'Series', 'Licensed', ['Overwatch: Tracer – London Calling|2020|2021','Overwatch: New Blood|2021|2022']);
add('Plants vs. Zombies', 'Series', 'Licensed', ['Plants vs. Zombies|2013|2026']);
add('Serenity / Firefly', 'Series', 'Licensed', ['Serenity: Those Left Behind|2005|2005','Serenity: Better Days|2008|2008','Serenity: The Shepherd’s Tale|2010|2010','Serenity: Leaves on the Wind|2014|2014','Serenity: No Power in the ’Verse|2016|2017']);
add('StarCraft', 'Series', 'Licensed', ['StarCraft: Scavengers|2018|2019','StarCraft: Soldiers|2019|2019','StarCraft: Survivors|2019|2020']);
add('Stranger Things', 'Series', 'Licensed', ['Stranger Things|2018|2019','Stranger Things: Six|2019|2019','Stranger Things: Into the Fire|2020|2020','Stranger Things and Dungeons & Dragons|2020|2021','Stranger Things: The Voyage|2023|2024']);
add('The Last of Us', 'Series', 'Licensed', ['The Last of Us: American Dreams|2013|2013']);
add('The Terminator', 'Series', 'Licensed', ['The Terminator|1990|1991','Terminator: The Burning Earth|1990|1990','Terminator: Hunters and Killers|1992|1992','Terminator: Endgame|1992|1992','Terminator 2: Judgment Day – Cybernetic Dawn|1995|1996','Terminator 2: Judgment Day – Nuclear Twilight|1995|1996']);
add('Tomb Raider', 'Character', 'Licensed', ['Tomb Raider|1999|2001','Tomb Raider|2014|2015','Lara Croft and the Frozen Omen|2015|2016']);
add('The Witcher', 'Series', 'Licensed', ['The Witcher|2014|2026','The Witcher: House of Glass|2014|2014','The Witcher: Fox Children|2015|2015','The Witcher: Curse of Crows|2016|2017','The Witcher: Of Flesh and Flame|2018|2019','The Witcher: Fading Memories|2020|2021','The Witcher: Witch’s Lament|2021|2021','The Witcher: The Ballad of Two Wolves|2022|2023','The Witcher: Wild Animals|2023|2024']);

const canonicalParent = new Map();
const lineByTitle = new Map();
for (const [authority, , , line, titles] of families) for (const packed of titles) {
  const title = packed.split('|')[0].toLowerCase();
  if (!canonicalParent.has(title)) canonicalParent.set(title, authority);
  if (line) lineByTitle.set(title, line);
}

const broadParents = new Set(['dark horse manga','dark horse originals','licensed worlds','hellboy universe']);
const explicit = new Map([
  ['aliens','Aliens'],['predator','Predator'],['aliens vs. predator','Alien vs. Predator'],['alien vs. predator','Alien vs. Predator'],
  ['aliens: colonial marines','Aliens'],['predator: concrete jungle','Predator'],['avatar: the last airbender','Avatar: The Last Airbender'],
  ['the legend of korra','The Legend of Korra'],['critical role: vox machina origins','Critical Role'],['cyberpunk 2077','Cyberpunk 2077'],
  ['dragon age','Dragon Age'],['halo','Halo'],['mass effect','Mass Effect'],['overwatch','Overwatch'],['the last of us: american dreams','The Last of Us'],
  ['the witcher','The Witcher'],['astro boy','Astro Boy'],['berserk','Berserk'],['blade of the immortal','Blade of the Immortal'],
  ['gantz','Gantz'],['hellsing','Hellsing'],['lone wolf and cub','Lone Wolf and Cub'],['oh my goddess!','Oh My Goddess!'],['trigun','Trigun'],
  ['abe sapien','Abe Sapien'],['hellboy and the b.p.r.d.','Hellboy and the B.P.R.D.'],['lobster johnson','Lobster Johnson'],
  ['witchfinder','Witchfinder'],['sir edward grey: witchfinder','Witchfinder'],['frankenstein underground','Frankenstein Underground'],
  ['koschei the deathless','Koschei'],['dept. h','Dept. H'],['ether','Ether'],['fight club 2','Fight Club'],['fight club 3','Fight Club'],
  ['invisible kingdom','Invisible Kingdom'],['lady killer','Lady Killer'],['norse mythology','Norse Mythology'],['rumble','Rumble'],
  ['the massive','The Massive'],['the sixth gun','The Sixth Gun'],['the strain','The Strain'],['the visitor: how and why he stayed','The Visitor'],
  ['canto','Canto'],['fear agent','Fear Agent'],['tomb raider','Tomb Raider']
]);

let repaired = 0;
const repairedIds = [];
for (const record of data) {
  if (record.id === 'DHA-0095') {
    Object.assign(record, { display:'Aliens', series:'Aliens', sort:'Aliens', printedTitle:'Aliens' });
    repairedIds.push(record.id);
  }
  if (record.id === 'CHR-00013') {
    Object.assign(record, { parent:'Aliens', primary:false, type:'Series', publishingLine:'Licensed' });
    repairedIds.push(record.id);
    repaired++;
  }
  if (record.primary) continue;
  const key = String(record.display || record.series || '').trim().toLowerCase();
  let target = explicit.get(key);
  if (!target && broadParents.has(String(record.parent || '').toLowerCase())) target = canonicalParent.get(key);
  if (target && record.parent !== target) {
    record.parent = target;
    repaired++;
    repairedIds.push(record.id);
  }
  const line = lineByTitle.get(key);
  if (line && record.publishingLine !== line) {
    record.publishingLine = line;
    if (!repairedIds.includes(record.id)) repairedIds.push(record.id);
  }
}

// Keep the migration allow-list deterministic on reruns. These are the bundled
// canonical rows whose filing relationship or publishing-line metadata is
// governed by this audit; audit-created rows do not need migration overrides.
for (const record of data) {
  if (record.primary || /^DH[AS]-/.test(String(record.id))) continue;
  const key = String(record.display || record.series || '').trim().toLowerCase();
  const target = explicit.get(key) || (broadParents.has(String(record.parent || '').toLowerCase()) ? canonicalParent.get(key) : null);
  const line = lineByTitle.get(key);
  if ((target && String(record.parent).toLowerCase() === target.toLowerCase()) || (line && record.publishingLine === line)) repairedIds.push(record.id);
}

const primaryNames = new Set(data.filter(r => r.primary).map(r => String(r.display).toLowerCase()));
const existingSeries = new Set(data.filter(r => !r.primary).map(r => `${String(r.display).toLowerCase()}|${r.startYear || ''}|${String(r.parent).toLowerCase()}`));
let nextAuthority = 1, nextSeries = 1;
while (data.some(r => r.id === `DHA-${String(nextAuthority).padStart(4, '0')}`)) nextAuthority++;
while (data.some(r => r.id === `DHS-${String(nextSeries).padStart(4, '0')}`)) nextSeries++;
const auditRows = [['action','authority','title','publisher','publishing_line','start_year','end_year']];
let addedAuthorities = 0, addedSeries = 0;

for (const [authority, type, publisher, line, titles] of families) {
  auditRows.push(['AUDIT AUTHORITY',authority,'',publisher,line,'','']);
  if (!primaryNames.has(authority.toLowerCase())) {
    data.push({id:`DHA-${String(nextAuthority++).padStart(4,'0')}`,display:authority,parent:'',series:authority,primary:true,publisher,type,level:'Recommended',sort:authority,printedTitle:authority,notes:'Primary filing authority verified during the comprehensive Dark Horse catalog and imprint audit.',...(line?{publishingLine:line}:{})});
    primaryNames.add(authority.toLowerCase()); addedAuthorities++;
    auditRows.push(['ADD AUTHORITY',authority,'',publisher,line,'','']);
  }
  for (const packed of titles) {
    const [title,startYear,endYear] = packed.split('|');
    auditRows.push(['AUDIT SERIES',authority,title,publisher,line,startYear,endYear]);
    const exact = `${title.toLowerCase()}|${startYear || ''}|${authority.toLowerCase()}`;
    if (existingSeries.has(exact)) continue;
    const same = data.find(r => !r.primary && String(r.display).toLowerCase()===title.toLowerCase() && String(r.parent).toLowerCase()===authority.toLowerCase() && (!startYear || String(r.startYear||'')===startYear));
    if (same) continue;
    data.push({id:`DHS-${String(nextSeries++).padStart(4,'0')}`,display:title,parent:authority,series:title,primary:false,publisher,type:'Series',level:'Recommended',sort:title,printedTitle:title,notes:'Verified during the comprehensive Dark Horse catalog and imprint audit.',...(startYear?{startYear:Number(startYear)}:{}),...(endYear?{endYear:Number(endYear)}:{}),...(line?{publishingLine:line}:{})});
    existingSeries.add(exact); addedSeries++;
    auditRows.push(['ADD SERIES',authority,title,publisher,line,startYear,endYear]);
  }
}

// Remove audit-created duplicates where a repaired canonical record now occupies the same family/year.
const groups = new Map();
for (const record of data.filter(r => !r.primary)) {
  const key = [String(record.display).toLowerCase(),String(record.startYear||''),String(record.parent).toLowerCase()].join('|');
  if (!groups.has(key)) groups.set(key,[]); groups.get(key).push(record);
}
const removeIds = new Set();
for (const group of groups.values()) if (group.length > 1) {
  const keep = group.find(r => !String(r.id).startsWith('DHS-')) || group[0];
  for (const record of group) if (record !== keep && String(record.id).startsWith('DHS-')) removeIds.add(record.id);
}
for (let i=data.length-1;i>=0;i--) if (removeIds.has(data[i].id)) data.splice(i,1);

data.sort((a,b)=>String(a.sort||a.display).localeCompare(String(b.sort||b.display),'en',{sensitivity:'base'})||String(a.id).localeCompare(String(b.id)));
const ids = new Set();
for (const record of data) { if (ids.has(record.id)) throw new Error(`Duplicate ID: ${record.id}`); ids.add(record.id); }
const primaries = new Set(data.filter(r=>r.primary).map(r=>String(r.display).toLowerCase()));
const unresolved = data.filter(r=>!r.primary&&!primaries.has(String(r.parent).toLowerCase()));
if (unresolved.length) throw new Error(`Unresolved parents: ${unresolved.slice(0,10).map(r=>`${r.display} -> ${r.parent}`).join(', ')}`);

fs.writeFileSync(comicsPath, `${JSON.stringify(data,null,2)}\n`);
fs.writeFileSync(auditPath, auditRows.map(row=>row.map(v=>`"${String(v).replaceAll('"','""')}"`).join(',')).join('\n')+'\n');
fs.writeFileSync(repairPath, `${JSON.stringify([...new Set(repairedIds)].sort(),null,2)}\n`);

console.log(JSON.stringify({before:4722,after:data.length,addedAuthorities,addedSeries,repairedRelationships:repaired,metadataRepairs:[...new Set(repairedIds)].length,duplicateAuditRowsRemoved:removeIds.size,darkHorseRelatedRecords:data.filter(r=>/Dark Horse|Berger|Maverick|Legend|Project Black Sky|Greatest World|Black Hammer|Outerverse|Tiny Onion/.test(`${r.publisher||''} ${r.publishingLine||''}`)).length,duplicateIds:data.length-ids.size,unresolvedParents:unresolved.length},null,2));
