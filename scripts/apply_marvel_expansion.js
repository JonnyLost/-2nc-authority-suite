#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const comicsPath = path.join(root, 'data', 'comics.json');
const auditPath = path.join(root, 'MARVEL_AUTHORITY_AUDIT.csv');

// Cover-title authorities audited for the modern Marvel publishing line.
// Format: title | filing parent | start year | end year (optional)
// Repeated cover titles remain separate when the initiative/line differs.
const groups = [
  {
    markerType: 'era', marker: 'Marvel NOW!', type: 'Series',
    rows: `
A+X|Avengers|2012|2014
All-New X-Men|X-Men|2012|2015
Avengers|Avengers|2012|2015
Avengers Arena|Avengers|2012|2013
Avengers Assemble|Avengers|2012|2014
Avengers World|Avengers|2014|2015
Avengers A.I.|Avengers|2013|2014
Cable and X-Force|Cable|2012|2014
Captain America|Captain America|2012|2014
Captain Marvel|Captain Marvel (Carol Danvers)|2012|2013
Deadpool|Deadpool|2012|2015
Fearless Defenders|Defenders|2013|2014
Fantastic Four|Fantastic Four|2012|2014
FF|Fantastic Four|2012|2014
Guardians of the Galaxy|Guardians of the Galaxy|2013|2015
Indestructible Hulk|Hulk|2012|2014
Iron Man|Iron Man|2012|2014
Morbius: The Living Vampire|Morbius|2013|2013
New Avengers|Avengers|2013|2015
Nova|Nova|2013|2015
Savage Wolverine|Wolverine|2013|2015
Secret Avengers|Avengers|2013|2014
Superior Spider-Man|Spider-Man|2013|2014
Superior Spider-Man Team-Up|Spider-Man|2013|2014
The Superior Foes of Spider-Man|Spider-Man|2013|2014
Thor: God of Thunder|Thor|2012|2014
Thunderbolts|Thunderbolts|2012|2014
Uncanny Avengers|Avengers|2012|2014
Uncanny X-Force|X-Men|2013|2014
Uncanny X-Men|X-Men|2013|2015
Wolverine|Wolverine|2013|2014
Wolverine and the X-Men|X-Men|2011|2014
X-Men|X-Men|2013|2015
X-Men Legacy|X-Men|2012|2014
Young Avengers|Young Avengers|2013|2014
Alpha: Big Time|Spider-Man|2013|2013
Superior Carnage|Carnage|2013|2013
Thanos Rising|Thanos|2013|2013
`.trim()
  },
  {
    markerType: 'era', marker: 'All-New Marvel NOW!', type: 'Series',
    rows: `
All-New Ghost Rider|Ghost Rider|2014|2015
All-New Invaders|Avengers|2014|2015
All-New X-Factor|X-Men|2014|2015
All-New Ultimates|Ultimate Universe|2014|2015
Amazing X-Men|X-Men|2013|2015
Amazing Spider-Man|Spider-Man|2014|2015
Avengers Undercover|Avengers|2014|2014
Black Widow|Black Widow|2014|2015
Captain Marvel|Captain Marvel (Carol Danvers)|2014|2015
Cyclops|Cyclops|2014|2015
Daredevil|Daredevil|2014|2015
Deathlok|Deathlok|2014|2015
Elektra|Elektra|2014|2015
Fantastic Four|Fantastic Four|2014|2015
Ghost Rider|Ghost Rider|2014|2015
Hulk|Hulk|2014|2015
Inhuman|Inhumans|2014|2015
Iron Fist: The Living Weapon|Iron Fist|2014|2015
Legendary Star-Lord|Star-Lord|2014|2015
Loki: Agent of Asgard|Thor|2014|2015
Magneto|Magneto|2014|2015
Miles Morales: Ultimate Spider-Man|Miles Morales|2014|2015
Moon Knight|Moon Knight|2014|2015
Ms. Marvel|Ms. Marvel (Kamala Khan)|2014|2015
New Warriors|New Warriors|2014|2015
Nightcrawler|Nightcrawler|2014|2015
Punisher|Punisher|2014|2015
Rocket Raccoon|Rocket Raccoon|2014|2015
Secret Avengers|Avengers|2014|2015
She-Hulk|She-Hulk|2014|2015
Silver Surfer|Silver Surfer|2014|2015
Spider-Man 2099|Spider-Man 2099|2014|2015
Spider-Woman|Spider-Woman (Jessica Drew)|2014|2015
Storm|Storm|2014|2015
Thor|Thor|2014|2015
Uncanny Avengers|Avengers|2015|2015
Wolverines|Wolverine|2015|2015
All-New Doop|X-Men|2014|2014
Deadly Hands of Kung-Fu|Shang-Chi|2014|2014
Winter Soldier: The Bitter March|Winter Soldier|2014|2014
All-New Captain America|Captain America|2014|2015
Angela: Asgard's Assassin|Thor|2014|2015
Ant-Man|Ant-Man / Giant-Man|2015|2015
Bucky Barnes: The Winter Soldier|Winter Soldier|2014|2015
Captain America and the Mighty Avengers|Avengers|2014|2015
Death of Wolverine: The Logan Legacy|Death of Wolverine|2014|2014
Death of Wolverine: The Weapon X Program|Death of Wolverine|2014|2015
Operation S.I.N.|S.H.I.E.L.D.|2015|2015
S.H.I.E.L.D.|S.H.I.E.L.D.|2014|2015
Silk|Silk|2015|2015
Spider-Gwen|Spider-Gwen / Ghost-Spider|2015|2015
Unbeatable Squirrel Girl|Squirrel Girl|2015|2015
Uncanny Inhumans|Inhumans|2015|2015
`.trim()
  },
  {
    markerType: 'era', marker: 'All-New, All-Different Marvel', type: 'Series',
    rows: `
A-Force|Avengers|2016|2016
Agents of S.H.I.E.L.D.|S.H.I.E.L.D.|2016|2016
All-New, All-Different Avengers|Avengers|2015|2016
All-New Hawkeye|Hawkeye|2015|2016
All-New Inhumans|Inhumans|2015|2016
All-New Wolverine|X-23 / Wolverine (Laura Kinney)|2015|2018
All-New X-Men|X-Men|2015|2017
Amazing Spider-Man|Spider-Man|2015|2017
Angela: Queen of Hel|Thor|2015|2016
Astonishing Ant-Man|Ant-Man / Giant-Man|2015|2016
Black Knight|Avengers|2015|2016
Black Panther|Black Panther|2016|2017
Black Widow|Black Widow|2016|2017
Captain America: Sam Wilson|Falcon|2015|2017
Captain America: Steve Rogers|Captain America|2016|2017
Captain Marvel|Captain Marvel (Carol Danvers)|2016|2017
Carnage|Carnage|2015|2017
Contest of Champions|Contest of Champions|2015|2017
Daredevil|Daredevil|2015|2017
Deadpool|Deadpool|2015|2017
Doctor Strange|Doctor Strange|2015|2017
Doctor Strange and the Sorcerers Supreme|Doctor Strange|2016|2017
Extraordinary X-Men|X-Men|2015|2017
Guardians of the Galaxy|Guardians of the Galaxy|2015|2017
Hawkeye|Hawkeye|2016|2017
Hercules|Hercules|2015|2016
Howard the Duck|Howard the Duck|2015|2016
Hyperion|Avengers|2016|2016
Illuminati|Illuminati|2015|2016
Invincible Iron Man|Iron Man|2015|2016
Karnak|Inhumans|2015|2017
Mighty Thor|Thor|2015|2018
Mockingbird|Mockingbird|2016|2016
Moon Girl and Devil Dinosaur|Marvel Universe|2015|2019
Moon Knight|Moon Knight|2016|2017
Ms. Marvel|Ms. Marvel (Kamala Khan)|2015|2019
New Avengers|Avengers|2015|2017
Nighthawk|Avengers|2016|2016
Nova|Nova|2015|2016
Old Man Logan|Old Man Logan|2016|2018
Patsy Walker, A.K.A. Hellcat!|Marvel Universe|2015|2017
Power Man and Iron Fist|Heroes for Hire|2016|2017
Punisher|Punisher|2016|2017
Red Wolf|Avengers|2015|2016
Rocket Raccoon and Groot|Rocket Raccoon|2016|2016
Scarlet Witch|Vision & Scarlet Witch|2015|2017
Silk|Silk|2015|2017
Silver Surfer|Silver Surfer|2016|2017
Spider-Gwen|Spider-Gwen / Ghost-Spider|2015|2018
Spider-Man|Miles Morales|2016|2017
Spider-Man 2099|Spider-Man 2099|2015|2017
Spider-Man/Deadpool|Spider-Man|2016|2019
Spider-Woman|Spider-Woman (Jessica Drew)|2015|2017
Squadron Supreme|Avengers|2015|2017
Totally Awesome Hulk|Hulk|2015|2017
Ultimates|Ultimates|2015|2016
Ultimates 2|Ultimates|2016|2017
Unbeatable Squirrel Girl|Squirrel Girl|2015|2019
Uncanny Avengers|Avengers|2015|2017
Uncanny Inhumans|Inhumans|2015|2017
Uncanny X-Men|X-Men|2016|2017
Venom: Space Knight|Venom|2015|2016
Vision|Vision & Scarlet Witch|2015|2016
Vote Loki|Thor|2016|2016
Web Warriors|Spider-Verse|2015|2016
Agents of Atlas|Marvel Universe|2016|2016
Civil War II: Choosing Sides|Civil War|2016|2016
Civil War II: Gods of War|Civil War|2016|2016
Civil War II: Kingpin|Civil War|2016|2016
Civil War II: Ulysses|Civil War|2016|2016
Death of X|X-Men|2016|2016
Inhumans vs. X-Men|X-Men|2016|2017
Monsters Unleashed|Marvel Universe|2017|2017
`.trim()
  },
  {
    markerType: 'era', marker: 'Marvel NOW! 2.0', type: 'Series',
    rows: `
All-New Guardians of the Galaxy|Guardians of the Galaxy|2017|2017
Amazing Spider-Man: Renew Your Vows|Spider-Man|2016|2018
America|Miss America|2017|2018
Astonishing X-Men|X-Men|2017|2018
Avengers|Avengers|2016|2017
Ben Reilly: Scarlet Spider|Scarlet Spider (Ben Reilly)|2017|2018
Black Bolt|Inhumans|2017|2018
Black Panther and the Crew|Black Panther|2017|2017
Black Panther: World of Wakanda|Black Panther|2016|2017
Cable|Cable|2017|2018
Champions|Champions|2016|2018
Defenders|Defenders|2017|2018
Doctor Strange|Doctor Strange|2017|2018
Falcon|Falcon|2017|2018
Generation X|Generation X|2017|2018
Generations|Marvel Universe|2017|2017
Guardians of the Galaxy: Mother Entropy|Guardians of the Galaxy|2017|2017
Hawkeye|Hawkeye|2016|2018
Iceman|X-Men|2017|2018
Infamous Iron Man|Iron Man|2016|2017
Inhumans Prime|Inhumans|2017|2017
Inhumans: Once and Future Kings|Inhumans|2017|2017
Invincible Iron Man|Iron Man|2016|2017
Iron Fist|Iron Fist|2017|2018
Jean Grey|Jean Grey / Phoenix|2017|2018
Jessica Jones|Marvel Universe|2016|2018
Kingpin|Daredevil|2017|2017
Marvel's Thor: Ragnarok Prelude|Thor|2017|2017
Mighty Captain Marvel|Captain Marvel (Carol Danvers)|2017|2018
Monsters Unleashed|Marvel Universe|2017|2018
Moon Girl and Devil Dinosaur|Marvel Universe|2016|2018
Mosaic|Inhumans|2016|2017
Nick Fury|Nick Fury|2017|2017
Nova|Nova|2016|2017
Occupy Avengers|Avengers|2016|2017
Old Man Hawkeye|Hawkeye|2018|2018
Old Man Logan|Old Man Logan|2016|2018
Prowler|Spider-Man|2016|2017
Rocket|Rocket Raccoon|2017|2017
Royals|Inhumans|2017|2018
Secret Warriors|Secret Warriors|2017|2018
Silver Sable and the Wild Pack|Spider-Man|2017|2018
Spider-Man/Deadpool|Spider-Man|2016|2018
Spider-Man: Master Plan|Spider-Man|2017|2017
Star-Lord|Star-Lord|2016|2017
Thanos|Thanos|2016|2018
The Unworthy Thor|Thor|2016|2017
U.S.Avengers|Avengers|2017|2017
Uncanny Avengers|Avengers|2016|2017
Venom|Venom|2016|2018
Weapon X|Weapon X|2017|2018
X-Men Blue|X-Men|2017|2018
X-Men Gold|X-Men|2017|2018
X-Men Prime|X-Men|2017|2017
Bullseye|Daredevil|2017|2017
Cage!|Luke Cage|2016|2017
Deadpool: Back in Black|Deadpool|2016|2017
Elektra|Elektra|2017|2017
Foolkiller|Deadpool|2016|2017
Gamora|Gamora|2016|2017
Man-Thing|Man-Thing|2017|2017
Solo|Deadpool|2016|2017
Unstoppable Wasp|Wasp|2017|2017
`.trim()
  },
  {
    markerType: 'era', marker: 'Marvel Legacy', type: 'Series',
    rows: `
Amazing Spider-Man: Renew Your Vows|Spider-Man|2017|2018
America|Miss America|2017|2018
Astonishing X-Men|X-Men|2017|2018
Avengers|Avengers|2017|2018
Ben Reilly: Scarlet Spider|Scarlet Spider (Ben Reilly)|2017|2018
Black Bolt|Inhumans|2017|2018
Cable|Cable|2017|2018
Captain Marvel|Captain Marvel (Carol Danvers)|2017|2018
Champions|Champions|2017|2018
Daredevil|Daredevil|2017|2018
Deadpool|Deadpool|2017|2018
Despicable Deadpool|Deadpool|2017|2018
Doctor Strange|Doctor Strange|2017|2018
Falcon|Falcon|2017|2018
Generation X|Generation X|2017|2018
Guardians of the Galaxy|Guardians of the Galaxy|2017|2018
Hawkeye|Hawkeye|2017|2018
Iceman|X-Men|2017|2018
Incredible Hulk|Hulk|2017|2018
Invincible Iron Man|Iron Man|2017|2018
Iron Fist|Iron Fist|2017|2018
Jean Grey|Jean Grey / Phoenix|2017|2018
Jessica Jones|Marvel Universe|2017|2018
Luke Cage|Luke Cage|2017|2018
Mighty Thor|Thor|2017|2018
Moon Girl and Devil Dinosaur|Marvel Universe|2017|2018
Moon Knight|Moon Knight|2017|2018
Ms. Marvel|Ms. Marvel (Kamala Khan)|2017|2018
Old Man Logan|Old Man Logan|2017|2018
Peter Parker: The Spectacular Spider-Man|Spider-Man|2017|2018
Punisher|Punisher|2017|2018
Royals|Inhumans|2017|2018
Secret Warriors|Secret Warriors|2017|2018
She-Hulk|She-Hulk|2017|2018
Spider-Gwen|Spider-Gwen / Ghost-Spider|2017|2018
Spider-Man|Miles Morales|2017|2018
Spider-Man/Deadpool|Spider-Man|2017|2018
Spirits of Vengeance|Ghost Rider|2017|2018
Thanos|Thanos|2017|2018
Unbeatable Squirrel Girl|Squirrel Girl|2017|2018
Uncanny Avengers|Avengers|2017|2018
Venom|Venom|2017|2018
Weapon X|Weapon X|2017|2018
X-Men Blue|X-Men|2017|2018
X-Men Gold|X-Men|2017|2018
X-Men Red|X-Men|2018|2018
`.trim()
  },
  {
    markerType: 'era', marker: 'Fresh Start', type: 'Series',
    rows: `
Amazing Spider-Man|Spider-Man|2018|2022
Ant-Man and the Wasp|Ant-Man / Giant-Man|2018|2018
Asgardians of the Galaxy|Thor|2018|2019
Avengers|Avengers|2018|2023
Avengers: No Road Home|Avengers|2019|2019
Black Panther|Black Panther|2018|2021
Black Widow|Black Widow|2019|2019
Captain America|Captain America|2018|2021
Captain Marvel|Captain Marvel (Carol Danvers)|2019|2023
Champions|Champions|2019|2019
Conan the Barbarian|Marvel Universe|2019|2019
Cosmic Ghost Rider|Ghost Rider|2018|2018
Daredevil|Daredevil|2019|2021
Dead Man Logan|Old Man Logan|2018|2019
Deadpool|Deadpool|2018|2019
Death of the Inhumans|Inhumans|2018|2018
Defenders: The Best Defense|Defenders|2018|2018
Doctor Strange|Doctor Strange|2018|2019
Domino|X-Men|2018|2019
Exiles|Exiles|2018|2019
Fantastic Four|Fantastic Four|2018|2022
Friendly Neighborhood Spider-Man|Spider-Man|2019|2019
Ghost Rider|Ghost Rider|2019|2020
Guardians of the Galaxy|Guardians of the Galaxy|2019|2020
Immortal Hulk|Hulk|2018|2021
Infinity Wars|Infinity Saga|2018|2018
Ironheart|Iron Man|2018|2020
Jessica Jones: Blind Spot|Marvel Universe|2018|2018
Jessica Jones: Purple Daughter|Marvel Universe|2019|2019
Killmonger|Black Panther|2018|2019
Life of Captain Marvel|Captain Marvel (Carol Danvers)|2018|2018
Man Without Fear|Daredevil|2019|2019
Marvel Knights 20th|Marvel Universe|2018|2019
Marvel Rising|Marvel Universe|2018|2019
Meet the Skrulls|Marvel Universe|2019|2019
Miles Morales: Spider-Man|Miles Morales|2018|2022
Moon Knight|Moon Knight|2021|2024
Mr. and Mrs. X|X-Men|2018|2019
Old Man Hawkeye|Hawkeye|2018|2018
Old Man Quill|Star-Lord|2019|2019
Punisher|Punisher|2018|2019
Runaways|Runaways|2017|2021
Savage Avengers|Avengers|2019|2022
Shuri|Black Panther|2018|2019
Silver Surfer: Black|Silver Surfer|2019|2019
Spider-Geddon|Spider-Verse|2018|2018
Spider-Gwen: Ghost-Spider|Spider-Gwen / Ghost-Spider|2018|2019
Spider-Man: City at War|Spider-Man|2019|2020
Spider-Man: Life Story|Spider-Man|2019|2019
Superior Spider-Man|Spider-Man|2018|2019
Tony Stark: Iron Man|Iron Man|2018|2019
Uncanny X-Men|X-Men|2018|2019
Unstoppable Wasp|Wasp|2018|2019
Venom|Venom|2018|2021
Vision|Vision & Scarlet Witch|2018|2019
Weapon H|Weapon X|2018|2019
West Coast Avengers|Avengers|2018|2019
Winter Soldier|Winter Soldier|2018|2019
Wolverine: The Long Night|Wolverine|2019|2019
`.trim()
  },
  {
    markerType: 'era', marker: 'Dawn of X', type: 'Series',
    rows: `
House of X|X-Men|2019|2019
Powers of X|X-Men|2019|2019
X-Men|X-Men|2019|2021
Excalibur|X-Men|2019|2021
Marauders|X-Men|2019|2022
New Mutants|New Mutants|2019|2021
X-Force|X-Men|2019|2024
Fallen Angels|X-Men|2019|2020
Wolverine|Wolverine|2020|2024
Cable|Cable|2020|2021
Hellions|X-Men|2020|2021
X-Factor|X-Men|2020|2021
Giant-Size X-Men|X-Men|2020|2020
Empyre: X-Men|X-Men|2020|2020
Juggernaut|X-Men|2020|2021
`.trim()
  },
  {
    markerType: 'era', marker: 'Reign of X', type: 'Series',
    rows: `
S.W.O.R.D.|X-Men|2020|2021
Way of X|X-Men|2021|2021
Children of the Atom|X-Men|2021|2021
X-Corp|X-Men|2021|2021
X-Men|X-Men|2021|2024
Excalibur|X-Men|2021|2022
Marauders|X-Men|2021|2022
New Mutants|New Mutants|2021|2022
X-Force|X-Men|2021|2022
Wolverine|Wolverine|2021|2022
Hellions|X-Men|2021|2021
Trial of Magneto|Magneto|2021|2022
Inferno|X-Men|2021|2022
Onslaught Revelation|X-Men|2021|2021
X Lives of Wolverine|Wolverine|2022|2022
X Deaths of Wolverine|Wolverine|2022|2022
`.trim()
  },
  {
    markerType: 'era', marker: 'Destiny of X', type: 'Series',
    rows: `
Immortal X-Men|X-Men|2022|2023
X-Men Red|X-Men|2022|2023
Legion of X|X-Men|2022|2023
Knights of X|X-Men|2022|2022
Marauders|X-Men|2022|2023
New Mutants|New Mutants|2022|2023
X-Force|X-Men|2022|2023
Wolverine|Wolverine|2022|2023
X-Terminators|X-Men|2022|2023
Sabretooth|Sabretooth|2022|2022
Sabretooth and the Exiles|Sabretooth|2022|2023
Bishop: War College|X-Men|2023|2023
Rogue & Gambit|Gambit|2023|2023
Betsy Braddock: Captain Britain|X-Men|2023|2023
Sins of Sinister|X-Men|2023|2023
Storm & the Brotherhood of Mutants|Storm|2023|2023
Nightcrawlers|Nightcrawler|2023|2023
Immoral X-Men|X-Men|2023|2023
`.trim()
  },
  {
    markerType: 'era', marker: 'Fall of X', type: 'Series',
    rows: `
Astonishing Iceman|X-Men|2023|2023
Children of the Vault|X-Men|2023|2023
Dark X-Men|X-Men|2023|2023
Jean Grey|Jean Grey / Phoenix|2023|2023
Realm of X|X-Men|2023|2023
Uncanny Avengers|Avengers|2023|2023
Uncanny Spider-Man|Nightcrawler|2023|2023
Alpha Flight|Alpha Flight|2023|2023
Ms. Marvel: The New Mutant|Ms. Marvel (Kamala Khan)|2023|2023
Ms. Marvel: Mutant Menace|Ms. Marvel (Kamala Khan)|2024|2024
Cable|Cable|2024|2024
Dead X-Men|X-Men|2024|2024
Fall of the House of X|X-Men|2024|2024
Rise of the Powers of X|X-Men|2024|2024
Resurrection of Magneto|Magneto|2024|2024
X-Men: Forever|X-Men|2024|2024
Weapon X-Men|Weapon X|2024|2024
X-Men: Heir of Apocalypse|X-Men|2024|2024
`.trim()
  },
  {
    markerType: 'era', marker: 'From the Ashes', type: 'Series',
    rows: `
X-Men|X-Men|2024|
Uncanny X-Men|X-Men|2024|
Exceptional X-Men|X-Men|2024|2025
X-Force|X-Men|2024|2025
X-Factor|X-Men|2024|2025
Wolverine|Wolverine|2024|
Phoenix|Jean Grey / Phoenix|2024|2025
Storm|Storm|2024|2025
NYX|X-Men|2024|2025
Mystique|Mystique|2024|2025
Psylocke|X-Men|2024|2025
Magik|X-Men|2025|2025
Laura Kinney: Wolverine|X-23 / Wolverine (Laura Kinney)|2024|2025
Sentinels|X-Men|2024|2025
Hellverine|Wolverine|2024|2025
Weapon X-Men|Weapon X|2025|2025
X-Manhunt|X-Men|2025|2025
X-Men: Age of Revelation Overture|X-Men|2025|2025
`.trim()
  },
  {
    markerType: 'line', marker: 'Ultimate Universe', type: 'Series',
    rows: `
Ultimate Invasion|Ultimate Universe|2023|2023
Ultimate Universe|Ultimate Universe|2023|2023
Ultimate Spider-Man|Spider-Man (2024 Ultimate Universe relaunch)|2024|2025
Ultimate Black Panther|Ultimate Black Panther|2024|2025
Ultimate X-Men|Ultimate X-Men (2024 relaunch)|2024|2026
Ultimates|Ultimate Universe|2024|2026
Ultimate Wolverine|Ultimate Universe|2025|2026
Ultimate Spider-Man: Incursion|Ultimate Universe|2025|2025
Ultimate Endgame|Ultimate Universe|2025|2026
Ultimate Universe: One Year In|Ultimate Universe|2024|2024
Ultimate Universe: Two Years In|Ultimate Universe|2025|2025
Ultimate Universe: Finale|Ultimate Universe|2026|2026
Ultimate Impact: Reborn|Ultimate Universe|2026|2026
`.trim()
  },
  {
    markerType: 'line', marker: 'Alien / Predator', type: 'Series',
    rows: `
Alien|Alien / Predator|2021|2022
Alien: Black, White & Blood|Alien / Predator|2024|2024
Alien: Icarus|Alien / Predator|2022|2022
Alien: Paradiso|Alien / Predator|2024|2025
Alien: Revival|Alien / Predator|2025|2025
Alien: Romulus|Alien / Predator|2024|2024
Alien: Thaw|Alien / Predator|2023|2023
Alien: What If...?|Alien / Predator|2024|2024
Predator|Alien / Predator|2022|2023
Predator: The Last Hunt|Alien / Predator|2024|2024
Predator: Black, White & Blood|Alien / Predator|2025|2025
Predator vs. Black Panther|Alien / Predator|2024|2024
Predator vs. Spider-Man|Alien / Predator|2025|2025
Predator vs. Wolverine|Alien / Predator|2023|2024
`.trim()
  },
  {
    markerType: 'line', marker: 'Marvel Knights', type: 'Series',
    rows: `
Marvel Knights 20th|Marvel Universe|2018|2019
Marvel Knights: The World to Come|Marvel Universe|2025|2026
Marvel Knights: Spider-Man|Spider-Man|2004|2006
Marvel Knights: Wolverine|Wolverine|2004|2005
Marvel Knights: Hulk|Hulk|2014|2014
Daredevil: Father|Daredevil|2004|2007
District X|X-Men|2004|2006
Madrox|X-Men|2004|2005
Black Panther|Black Panther|1998|2003
The Punisher|Punisher|1998|1999
The Sentry|Sentry|2000|2001
Inhumans|Inhumans|1998|1999
`.trim()
  },
  {
    markerType: 'line', marker: 'MAX', type: 'Series',
    rows: `
Alias|Marvel Universe|2001|2004
Apache Skies|Rawhide Kid|2002|2002
Black Widow: Pale Little Spider|Black Widow|2002|2002
Cage|Luke Cage|2002|2002
Dead of Night Featuring Man-Thing|Man-Thing|2008|2008
Dead of Night Featuring Werewolf by Night|Marvel Horror Line|2009|2009
Foolkiller|Marvel Universe|2007|2008
Foolkiller: White Angels|Marvel Universe|2008|2009
Fury|Nick Fury|2001|2002
Fury: My War Gone By|Nick Fury|2012|2013
The Hood|Marvel Universe|2002|2002
Howard the Duck|Howard the Duck|2002|2002
Punisher MAX|Punisher|2004|2009
Punisher: Frank Castle MAX|Punisher|2009|2012
Rawhide Kid|Rawhide Kid|2003|2003
Supreme Power|Marvel Universe|2003|2005
Supreme Power: Hyperion|Marvel Universe|2005|2006
Supreme Power: Nighthawk|Marvel Universe|2005|2006
Thor: Vikings|Thor|2003|2004
Zombie|Marvel Zombies|2006|2006
`.trim()
  },
  {
    markerType: 'line', marker: '2099', type: 'Series',
    rows: `
2099 Alpha|Marvel Universe|2019|2019
2099 Omega|Marvel Universe|2019|2019
Annihilation 2099|Annihilation Saga|2024|2024
Avengers 2099|Avengers|2015|2015
Conan 2099|Marvel Universe|2019|2019
Fantastic Four 2099|Fantastic Four|2019|2019
Ghost Rider 2099|Ghost Rider|1994|1996
Ghost Rider 2099|Ghost Rider|2019|2019
Hulk 2099|Hulk|1994|1995
Punisher 2099|Punisher 2099|1993|1995
Punisher 2099|Punisher 2099|2019|2019
Secret Wars 2099|Secret Wars|2015|2015
Spider-Man 2099|Spider-Man 2099|1992|1996
Spider-Man 2099|Spider-Man 2099|2014|2017
Spider-Man 2099: Dark Genesis|Spider-Man 2099|2023|2023
Spider-Man 2099: Exodus|Spider-Man 2099|2022|2022
Spider-Man 2099: Miguel O'Hara|Spider-Man 2099|2024|2024
Symbiote Spider-Man 2099|Spider-Man 2099|2024|2024
Venom 2099|Venom|2019|2019
X-Men 2099|X-Men 2099|1993|1996
`.trim()
  },
  {
    markerType: 'line', marker: 'Marvel Zombies', type: 'Series',
    rows: `
Marvel Zombies|Marvel Zombies|2005|2006
Marvel Zombies 2|Marvel Zombies|2007|2008
Marvel Zombies 3|Marvel Zombies|2008|2009
Marvel Zombies 4|Marvel Zombies|2009|2009
Marvel Zombies 5|Marvel Zombies|2010|2010
Marvel Zombies Return|Marvel Zombies|2009|2009
Marvel Zombies Supreme|Marvel Zombies|2011|2011
Marvel Zombies Destroy!|Marvel Zombies|2012|2012
Marvel Zombies Halloween|Marvel Zombies|2012|2012
Marvel Zombies vs. Army of Darkness|Marvel Zombies|2007|2007
Marvel Zombies: Dead Days|Marvel Zombies|2007|2007
Marvel Zombies: Evil Evolution|Marvel Zombies|2009|2009
Marvel Zombies: Resurrection|Marvel Zombies|2019|2020
Marvel Zombies: Black, White & Blood|Marvel Zombies|2023|2024
Marvel Zombies: Dawn of Decay|Marvel Zombies|2024|2025
`.trim()
  },
  {
    markerType: 'era', marker: 'Fresh Start', type: 'Event',
    rows: `
Absolute Carnage|Absolute Carnage|2019|2019
Absolute Carnage: Avengers|Absolute Carnage|2019|2019
Absolute Carnage: Captain Marvel|Absolute Carnage|2019|2019
Absolute Carnage: Immortal Hulk|Absolute Carnage|2019|2019
Absolute Carnage: Lethal Protectors|Absolute Carnage|2019|2019
Absolute Carnage: Miles Morales|Absolute Carnage|2019|2019
Absolute Carnage: Scream|Absolute Carnage|2019|2019
Absolute Carnage: Separation Anxiety|Absolute Carnage|2019|2019
Absolute Carnage: Symbiote of Vengeance|Absolute Carnage|2019|2019
Absolute Carnage: Symbiote Spider-Man|Absolute Carnage|2019|2019
Absolute Carnage: Weapon Plus|Absolute Carnage|2019|2019
A.X.E.: Judgment Day|Avengers|2022|2022
A.X.E.: Avengers|Avengers|2022|2022
A.X.E.: Death to the Mutants|Avengers|2022|2022
A.X.E.: Eternals|Avengers|2022|2022
A.X.E.: Iron Fist|Avengers|2022|2022
A.X.E.: Starfox|Avengers|2022|2022
A.X.E.: X-Men|Avengers|2022|2022
Blood Hunt|Marvel Universe|2024|2024
Blood Hunt: Red Band|Marvel Universe|2024|2024
Dark Web|Spider-Man|2022|2023
Dark Web: Ms. Marvel|Spider-Man|2022|2023
Dark Web: X-Men|Spider-Man|2022|2023
Devil's Reign|Daredevil|2021|2022
Devil's Reign: Superior Four|Daredevil|2022|2022
Devil's Reign: Villains for Hire|Daredevil|2022|2022
Empyre|Empyre|2020|2020
Empyre: Avengers|Empyre|2020|2020
Empyre: Captain America|Empyre|2020|2020
Empyre: Fantastic Four|Empyre|2020|2020
Empyre: Savage Avengers|Empyre|2020|2020
Empyre: X-Men|Empyre|2020|2020
Heroes Reborn|Avengers|2021|2021
Heroes Return|Avengers|2021|2021
King in Black|King in Black|2020|2021
King in Black: Avengers|King in Black|2021|2021
King in Black: Black Knight|King in Black|2021|2021
King in Black: Captain America|King in Black|2021|2021
King in Black: Ghost Rider|King in Black|2021|2021
King in Black: Immortal Hulk|King in Black|2020|2020
King in Black: Namor|King in Black|2020|2021
King in Black: Planet of the Symbiotes|King in Black|2021|2021
King in Black: Return of the Valkyries|King in Black|2021|2021
King in Black: Scream|King in Black|2021|2021
King in Black: Spider-Man|King in Black|2021|2021
King in Black: Thunderbolts|King in Black|2021|2021
King in Black: Wiccan and Hulkling|King in Black|2021|2021
One World Under Doom|Marvel Universe|2025|2025
Original Sin|Marvel Universe|2014|2014
Secret Empire|Secret Empire|2017|2017
Secret Empire: Brave New World|Secret Empire|2017|2017
Secret Empire: Underground|Secret Empire|2017|2017
Secret Empire: United|Secret Empire|2017|2017
Secret Empire: Uprising|Secret Empire|2017|2017
Secret Wars|Secret Wars|2015|2016
Secret Wars: Battleworld|Secret Wars|2015|2015
Secret Wars: Secret Love|Secret Wars|2015|2015
Venom War|Venom|2024|2024
Venom War: Carnage|Venom|2024|2024
Venom War: Deadpool|Venom|2024|2024
Venom War: Lethal Protectors|Venom|2024|2024
Venom War: Spider-Man|Venom|2024|2024
War of the Realms|War of the Realms|2019|2019
War of the Realms: New Agents of Atlas|War of the Realms|2019|2019
War of the Realms: Punisher|War of the Realms|2019|2019
War of the Realms: Uncanny X-Men|War of the Realms|2019|2019
X of Swords|X of Swords|2020|2020
X of Swords: Creation|X of Swords|2020|2020
X of Swords: Destruction|X of Swords|2020|2020
X of Swords: Stasis|X of Swords|2020|2020
`.trim()
  },
  {
    markerType: 'line', marker: 'Star Wars', type: 'Series',
    rows: `
Star Wars|Marvel Universe|2015|2019
Star Wars|Marvel Universe|2020|2024
Star Wars|Marvel Universe|2025|
Star Wars: Darth Vader|Marvel Universe|2015|2016
Darth Vader|Marvel Universe|2017|2018
Star Wars: Darth Vader|Marvel Universe|2020|2024
Star Wars: Doctor Aphra|Marvel Universe|2016|2019
Star Wars: Doctor Aphra|Marvel Universe|2020|2024
Star Wars: Doctor Aphra - Chaos Agent|Marvel Universe|2025|
Star Wars: Poe Dameron|Marvel Universe|2016|2018
Star Wars: Bounty Hunters|Marvel Universe|2020|2024
Star Wars: The High Republic|Marvel Universe|2021|2022
Star Wars: The High Republic|Marvel Universe|2022|2023
Star Wars: The High Republic|Marvel Universe|2023|2025
Star Wars: The High Republic Adventures|Marvel Universe|2021|2022
Star Wars: The High Republic - Shadows of Starlight|Marvel Universe|2023|2024
Star Wars: High Republic - Fear of the Jedi|Marvel Universe|2025|2025
Star Wars: Darth Maul|Marvel Universe|2017|2017
Star Wars: Darth Maul - Son of Dathomir|Marvel Universe|2014|2014
Star Wars: Darth Vader - Black, White & Red|Marvel Universe|2023|2023
Star Wars: Han Solo|Marvel Universe|2016|2016
Star Wars: Han Solo & Chewbacca|Marvel Universe|2022|2023
Star Wars: Lando|Marvel Universe|2015|2015
Star Wars: Lando - Double or Nothing|Marvel Universe|2018|2018
Star Wars: Princess Leia|Marvel Universe|2015|2015
Star Wars: Obi-Wan|Marvel Universe|2022|2022
Star Wars: Obi-Wan and Anakin|Marvel Universe|2016|2016
Star Wars: Kanan|Marvel Universe|2015|2016
Star Wars: Mace Windu|Marvel Universe|2017|2017
Star Wars: Yoda|Marvel Universe|2022|2023
Star Wars: Thrawn|Marvel Universe|2018|2018
Star Wars: Thrawn Alliances|Marvel Universe|2024|2024
Star Wars: Chewbacca|Marvel Universe|2015|2016
Star Wars: Captain Phasma|Marvel Universe|2017|2017
Star Wars: The Mandalorian|Marvel Universe|2022|2023
Star Wars: The Mandalorian Season 2|Marvel Universe|2023|2024
Star Wars: Ahsoka|Marvel Universe|2024|2025
Star Wars: The Rise of Kylo Ren|Marvel Universe|2019|2020
Star Wars: The Fall of Kylo Ren|Marvel Universe|2026|2026
Star Wars: War of the Bounty Hunters|Marvel Universe|2021|2021
Star Wars: Crimson Reign|Marvel Universe|2021|2022
Star Wars: Hidden Empire|Marvel Universe|2022|2023
Star Wars: Dark Droids|Marvel Universe|2023|2024
Star Wars: Revelations|Marvel Universe|2022|2024
Star Wars: Empire Ascendant|Marvel Universe|2019|2019
Star Wars: Age of Republic|Marvel Universe|2018|2019
Star Wars: Age of Rebellion|Marvel Universe|2019|2019
Star Wars: Age of Resistance|Marvel Universe|2019|2019
Star Wars: TIE Fighter|Marvel Universe|2019|2019
Star Wars: Target Vader|Marvel Universe|2019|2019
Star Wars: Galaxy's Edge|Marvel Universe|2019|2019
Star Wars: Galaxy's Edge - Echoes of the Empire|Marvel Universe|2026|2026
`.trim()
  },
  {
    // Post-2019 mainline books without a dependable company-wide banner.
    // Publication years distinguish volumes; labels intentionally stay clean.
    markerType: 'era', marker: '', type: 'Series',
    rows: `
Amazing Mary Jane|Spider-Man|2019|2020
Atlantis Attacks|Marvel Universe|2020|2021
Black Cat|Spider-Man|2019|2020
Black Widow|Black Widow|2020|2022
Champions|Champions|2020|2021
Doctor Doom|Fantastic Four|2019|2020
Falcon & Winter Soldier|Falcon|2020|2021
Fantastic Four: Antithesis|Fantastic Four|2020|2020
Guardians of the Galaxy|Guardians of the Galaxy|2020|2021
Hawkeye: Freefall|Hawkeye|2020|2020
Iron Man|Iron Man|2020|2022
Maestro|Hulk|2020|2020
Marvels X|Marvels / Prestige Format|2020|2020
Ravencroft|Spider-Man|2020|2020
Shang-Chi|Shang-Chi|2020|2020
Strange Academy|Doctor Strange|2020|2022
Symbiote Spider-Man: Alien Reality|Spider-Man|2019|2020
Thor|Thor|2020|2023
The Union|Marvel Universe|2020|2021
U.S.Agent|USAgent|2020|2021
Amazing Fantasy|Marvel Universe|2021|2021
Amazing Spider-Man|Spider-Man|2021|2022
Avengers Forever|Avengers|2021|2023
Beta Ray Bill|Beta Ray Bill|2021|2021
Black Knight: Curse of the Ebony Blade|Avengers|2021|2021
Captain America/Iron Man|Captain America|2021|2022
Dark Ages|Marvel Universe|2021|2022
Darkhawk|Darkhawk|2021|2022
Death of Doctor Strange|Doctor Strange|2021|2022
Defenders|Defenders|2021|2022
Eternals|Marvel Universe|2021|2022
Extreme Carnage|Carnage|2021|2021
Fantastic Four: Life Story|Fantastic Four|2021|2022
Gamma Flight|Hulk|2021|2021
Iron Fist: Heart of the Dragon|Iron Fist|2021|2021
Kang the Conqueror|Avengers|2021|2022
Maestro: War and Pax|Hulk|2021|2021
Miles Morales: Spider-Man|Miles Morales|2018|2022
Moon Knight|Moon Knight|2021|2024
Non-Stop Spider-Man|Spider-Man|2021|2021
Reptil|Marvel Universe|2021|2021
Silk|Silk|2021|2021
Sinister War|Spider-Man|2021|2021
Spider-Woman|Spider-Woman (Jessica Drew)|2020|2023
The United States of Captain America|Captain America|2021|2021
Venom|Venom|2021|2024
Amazing Spider-Man|Spider-Man|2022|2025
Captain America: Sentinel of Liberty|Captain America|2022|2023
Captain America: Symbol of Truth|Falcon|2022|2023
Carnage|Carnage|2022|2023
Damage Control|Marvel Universe|2022|2022
Daredevil|Daredevil|2022|2023
Deadpool|Deadpool|2022|2024
Defenders: Beyond|Defenders|2022|2022
Doctor Strange: Nexus of Nightmares|Doctor Strange|2022|2022
Edge of Spider-Verse|Spider-Verse|2022|2022
Fantastic Four|Fantastic Four|2022|2025
Ghost Rider|Ghost Rider|2022|2024
Gold Goblin|Spider-Man|2022|2023
Hulk|Hulk|2021|2023
Iron Cat|Iron Man|2022|2022
Midnight Suns|Marvel Universe|2022|2023
Miracleman: The Silver Age|Marvelman / Miracleman|2022|2024
Monica Rambeau: Photon|Captain Marvel (Carol Danvers)|2022|2023
Namor: Conquered Shores|Namor the Sub-Mariner|2022|2023
New Fantastic Four|Fantastic Four|2022|2022
Punisher|Punisher|2022|2023
Savage Avengers|Avengers|2022|2023
Secret Invasion|Secret Invasion|2022|2023
She-Hulk|She-Hulk|2022|2024
Spider-Gwen: Gwenverse|Spider-Gwen / Ghost-Spider|2022|2022
Spider-Man|Spider-Man|2022|2024
Strange|Doctor Strange|2022|2023
Thunderbolts|Thunderbolts|2022|2022
Venom: Lethal Protector|Venom|2022|2022
Wolverine: Patch|Wolverine|2022|2022
X-Men '92: House of XCII|X-Men|2022|2022
Avengers|Avengers|2023|2025
Avengers Inc.|Avengers|2023|2024
Black Panther|Black Panther|2023|2024
Captain America|Captain America|2023|2024
Captain Marvel|Captain Marvel (Carol Danvers)|2023|2024
Carnage|Carnage|2023|2024
Daredevil|Daredevil|2023|2025
Doctor Strange|Doctor Strange|2023|2024
G.O.D.S.|Marvel Universe|2023|2024
Guardians of the Galaxy|Guardians of the Galaxy|2023|2023
Hallows' Eve|Spider-Man|2023|2023
Immortal Thor|Thor|2023|2025
Incredible Hulk|Hulk|2023|2025
Invincible Iron Man|Iron Man|2022|2024
Marvel Unleashed|Marvel Universe|2023|2023
Miles Morales: Spider-Man|Miles Morales|2022|2025
Moon Knight: City of the Dead|Moon Knight|2023|2023
Punisher|Punisher|2023|2024
Scarlet Witch|Vision & Scarlet Witch|2023|2024
Sensational She-Hulk|She-Hulk|2023|2024
Silver Surfer: Rebirth Legacy|Silver Surfer|2023|2023
Spider-Boy|Spider-Man|2023|2025
Spider-Gwen: Smash|Spider-Gwen / Ghost-Spider|2023|2024
Spider-Man: India|Spider-Man|2023|2023
Superior Spider-Man|Spider-Man|2023|2024
Thanos|Thanos|2023|2024
Venom: Lethal Protector II|Venom|2023|2023
White Widow|Black Widow|2023|2024
Avengers: Twilight|Avengers|2024|2024
Blood Hunters|Marvel Universe|2024|2024
Daredevil: Woman Without Fear|Daredevil|2024|2024
Deadpool|Deadpool|2024|2025
Dazzler|Dazzler|2024|2025
Doom|Fantastic Four|2024|2024
Ghost Rider: Final Vengeance|Ghost Rider|2024|2024
Hellverine|Wolverine|2024|2025
Kid Venom|Venom|2024|2025
Namor|Namor the Sub-Mariner|2024|2025
Phases of the Moon Knight|Moon Knight|2024|2025
Scarlet Witch|Vision & Scarlet Witch|2024|2025
Spider-Gwen: The Ghost-Spider|Spider-Gwen / Ghost-Spider|2024|2025
Spider-Society|Spider-Verse|2024|2024
The Spectacular Spider-Men|Spider-Man|2024|2025
Venomverse Reborn|Venom|2024|2024
Werewolf by Night: Red Band|Marvel Horror Line|2024|2025
What If...? Venom|Venom|2024|2024
All-New Venom|Venom|2024|2025
Eddie Brock: Carnage|Carnage|2025|2025
Red Hulk|Hulk|2025|2026
New Avengers|Avengers|2025|2026
Spider-Girl|Spider-Man|2025|2026
Spider-Man & Wolverine|Spider-Man|2025|2026
`.trim()
  },
  {
    // Marvel has no honest company-wide post-Fresh Start banner for these
    // books. They receive publication years but intentionally print no marker.
    markerType: 'era', marker: '', type: 'Series',
    rows: `
Amazing Spider-Man|Spider-Man|2025|
Amazing Spider-Man: Spider-Versity|Spider-Man|2026|2026
Avengers: Armageddon|Avengers|2026|2026
Bishop|X-Men|2026|2026
Black Cat|Spider-Man|2025|
Captain America|Captain America|2025|
Captain Marvel: Dark Past|Captain Marvel (Carol Danvers)|2026|2026
Civil War: Unmasked|Civil War|2026|2026
Daredevil|Daredevil|2026|
Doctor Strange|Doctor Strange|2025|2026
DoomQuest|Fantastic Four|2026|2026
Fantastic Four|Fantastic Four|2025|
Gambit: Wanted|Gambit|2026|2026
Generation X-23|X-23 / Wolverine (Laura Kinney)|2026|
Infernal Hulk|Hulk|2025|2026
Inglorious X-Force|X-Men|2026|
Iron Man|Iron Man|2026|
Jeff the Land Shark: Superstar|Marvel Universe|2026|2026
Marc Spector: Moon Knight|Moon Knight|2026|
Mortal Thor|Thor|2025|
Punisher|Punisher|2026|
Queen in Black|Venom|2026|2026
Queen in Black: Defenders of Light and Dark|Venom|2026|2026
Sorcerer Supreme|Doctor Strange|2025|2026
Spectacular Spider-Man: Brand New Day|Spider-Man|2026|2026
Spider-Man: Long Way Home|Spider-Man|2026|2026
Uncanny X-Men|X-Men|2024|
Venom|Venom|2025|2026
Wade Wilson: Deadpool|Deadpool|2026|
Wolverine|Wolverine|2024|
X-Men|X-Men|2024|
X-Men '97: Season 2|X-Men|2026|2026
X-Men: Outback|X-Men|2026|2026
X-Men United|X-Men|2026|
`.trim()
  }
];

const normalize = value => String(value || '')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

const sortTitle = title => /^the\s+/i.test(title)
  ? `${title.replace(/^the\s+/i, '')}, The`
  : title;

const csv = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
const records = JSON.parse(fs.readFileSync(comicsPath, 'utf8'));
const originalCount = records.length;

// Normalize two classifications from the first construction pass. These are
// deterministic migrations and keep this script idempotent.
records.forEach(record => {
  if (record.publisher === 'Marvel' && record.publishingEra === 'Current Marvel') {
    delete record.publishingEra;
  }
  if (record.publisher === 'Marvel' && record.parent === 'Alien / Predator' && record.publishingEra === 'Fresh Start') {
    delete record.publishingEra;
    record.publishingLine = 'Alien / Predator';
  }
});

// Remove records produced by a transient marker swap during catalog assembly.
for (let index = records.length - 1; index >= 0; index -= 1) {
  const record = records[index];
  const wrongMainlineMarker = record.publisher === 'Marvel' && record.publishingLine === 'Alien / Predator' && record.parent !== 'Alien / Predator';
  const wrongLicensedMarker = record.publisher === 'Marvel' && record.publishingEra === 'Fresh Start' && record.parent === 'Alien / Predator';
  if (wrongMainlineMarker || wrongLicensedMarker) records.splice(index, 1);
}

const licensedSeen = new Set();
for (let index = 0; index < records.length; index += 1) {
  const record = records[index];
  if (record.publisher !== 'Marvel' || record.parent !== 'Alien / Predator' || record.publishingLine !== 'Alien / Predator') continue;
  const key = `${normalize(record.printedTitle || record.series || record.display)}|${record.startYear || ''}`;
  if (licensedSeen.has(key)) {
    records.splice(index, 1);
    index -= 1;
  } else {
    licensedSeen.add(key);
  }
}

const nextReferenceId = () => Math.max(0, ...records
  .map(record => /^REF-(\d+)$/.exec(record.id))
  .filter(Boolean)
  .map(match => Number(match[1]))) + 1;
const starWarsAuthority = records.find(record => record.publisher === 'Marvel' && record.primary && normalize(record.display) === 'star wars');
if (!starWarsAuthority) {
  records.push({
    id: `REF-${String(nextReferenceId()).padStart(5, '0')}`,
    display: 'Star Wars',
    parent: '',
    series: 'Star Wars',
    primary: true,
    publisher: 'Marvel',
    type: 'Reference-only authority',
    level: 'Recommended',
    sort: 'Star Wars',
    printedTitle: 'Star Wars'
  });
} else if (records.some(record => record !== starWarsAuthority && record.id === starWarsAuthority.id)) {
  starWarsAuthority.id = `REF-${String(nextReferenceId()).padStart(5, '0')}`;
}
let nextSeriesId = Math.max(0, ...records.map(r => /^SER-(\d+)$/.exec(r.id)).filter(Boolean).map(m => Number(m[1]))) + 1;
let nextEventId = Math.max(0, ...records.map(r => /^EVT-(\d+)$/.exec(r.id)).filter(Boolean).map(m => Number(m[1]))) + 1;

const parentNames = new Set(records.filter(r => r.primary).map(r => normalize(r.display)));
const candidates = [];
for (const group of groups) {
  for (const line of group.rows.split('\n').map(s => s.trim()).filter(Boolean)) {
    const [title, listedParent, startYear, endYear = ''] = line.split('|').map(s => s.trim());
    const parent = group.markerType === 'line' && group.marker === 'Star Wars' ? 'Star Wars' : listedParent;
    candidates.push({ title, parent, startYear, endYear, ...group });
  }
}

const duplicateCandidateKeys = new Set();
const seenCandidates = new Set();
for (const c of candidates) {
  const key = [normalize(c.title), c.markerType, normalize(c.marker), c.startYear].join('|');
  if (seenCandidates.has(key)) duplicateCandidateKeys.add(key);
  seenCandidates.add(key);
}
if (duplicateCandidateKeys.size) {
  throw new Error(`Duplicate catalog identities: ${[...duplicateCandidateKeys].join(', ')}`);
}

const audit = [];
const missingParents = [...new Set(candidates
  .filter(c => !parentNames.has(normalize(c.parent)))
  .map(c => c.parent))];
if (missingParents.length) {
  throw new Error(`Missing primary filing authorities: ${missingParents.join(', ')}`);
}
for (const c of candidates) {
  const markerField = c.markerType === 'line' ? 'publishingLine' : 'publishingEra';
  const otherMarkerField = c.markerType === 'line' ? 'publishingEra' : 'publishingLine';
  const exactMatches = records.filter(r => r.publisher === 'Marvel' &&
    normalize(r.printedTitle || r.series || r.display) === normalize(c.title) &&
    normalize(r[markerField]) === normalize(c.marker));
  const exact = exactMatches.find(r => String(r.startYear || '') === c.startYear) ||
    (exactMatches.length === 1 ? exactMatches[0] : undefined);

  if (exact) {
    if (c.markerType === 'line' && c.marker === 'Star Wars') exact.parent = 'Star Wars';
    exact.startYear = exact.startYear || c.startYear;
    if (c.endYear && !exact.endYear) exact.endYear = c.endYear;
    audit.push([c.title, c.type, c.parent, c.markerType, c.marker, c.startYear, c.endYear, 'Covered', exact.id]);
    continue;
  }

  // If a uniquely titled existing record has no modern metadata, enrich it
  // instead of creating a duplicate. Generic repeated titles remain separate.
  const sameTitleUnmarked = records.filter(r => r.publisher === 'Marvel' &&
    normalize(r.printedTitle || r.series || r.display) === normalize(c.title) &&
    !r.publishingEra && !r.publishingLine);
  const genericRepeat = /^(amazing spider-man|avengers|black widow|cable|captain america|captain marvel|daredevil|deadpool|doctor strange|fantastic four|guardians of the galaxy|hawkeye|hulk|iron man|moon knight|punisher|spider-man|thor|uncanny x-men|venom|wolverine|x-force|x-men)$/i.test(c.title);
  if (sameTitleUnmarked.length === 1 && !genericRepeat) {
    const existing = sameTitleUnmarked[0];
    existing[markerField] = c.marker;
    delete existing[otherMarkerField];
    existing.startYear = existing.startYear || c.startYear;
    if (c.endYear && !existing.endYear) existing.endYear = c.endYear;
    if (!existing.parent) existing.parent = c.parent;
    audit.push([c.title, c.type, c.parent, c.markerType, c.marker, c.startYear, c.endYear, 'Enriched existing', existing.id]);
    continue;
  }

  const id = c.type === 'Event'
    ? `EVT-${String(nextEventId++).padStart(5, '0')}`
    : `SER-${String(nextSeriesId++).padStart(5, '0')}`;
  const record = {
    id,
    display: c.title,
    parent: c.parent,
    series: c.title,
    primary: false,
    publisher: 'Marvel',
    type: c.type,
    level: c.type === 'Event' && !c.title.includes(':') ? 'Recommended' : 'Optional',
    sort: sortTitle(c.title),
    printedTitle: c.title,
    startYear: c.startYear
  };
  if (c.marker) record[markerField] = c.marker;
  if (c.endYear) record.endYear = c.endYear;
  records.push(record);
  audit.push([c.title, c.type, c.parent, c.markerType, c.marker, c.startYear, c.endYear, 'Added', id]);
}

records.sort((a, b) => a.sort.localeCompare(b.sort, 'en', { sensitivity: 'base' }) || a.id.localeCompare(b.id));
fs.writeFileSync(comicsPath, `${JSON.stringify(records, null, 2)}\n`);

const header = ['Cover title', 'Type', 'Parent authority', 'Marker type', 'Marker', 'Start year', 'End year', 'Coverage status', 'Authority ID'];
fs.writeFileSync(auditPath, [header, ...audit].map(row => row.map(csv).join(',')).join('\n') + '\n');

const summary = audit.reduce((acc, row) => {
  acc[row[7]] = (acc[row[7]] || 0) + 1;
  return acc;
}, {});
console.log(JSON.stringify({ originalCount, reviewed: candidates.length, ...summary, finalCount: records.length }, null, 2));
