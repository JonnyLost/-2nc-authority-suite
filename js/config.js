window.APP_CONFIG = Object.freeze({
  name: '2NC Authority Suite',
  version: '4.44.14',
  build: '2026-11-28-cd-vinyl-alphabet-number-dividers',
  schema: 3,
  databaseName: '2nc-authority-db-v3',
  legacyDatabaseNames: ['2nc-authority-db-v2-5'],
  cacheName: '2nc-authority-suite-v4.44.14',
  essentialComicDividerIds: Object.freeze([
    // DC
    "CHR-00025", // Aquaman
    "CHR-00038", // Batgirl
    "TEM-00003", // Birds of Prey
    "CHR-DCX-0016", // Black Adam
    "CHR-00049", // Black Canary
    "CHR-00063", // Blue Beetle
    "CHR-00077", // Catwoman
    "CHR-00095", // Cyborg
    "CHR-DCX-0068", // Darkseid
    "CHR-00112", // Deathstroke
    "CHR-00122", // Doctor Fate
    "TEM-00006", // Doom Patrol
    "CHR-00415", // The Flash
    "CHR-00167", // Green Arrow
    "CHR-00168", // Green Lantern
    "CHR-DCX-0025", // Harley Quinn
    "CHR-00178", // Hawkman
    "CHR-00208", // John Constantine
    "CHR-DCX-0165", // The Joker
    "TEM-00009", // Justice League
    "TEM-00013", // Justice Society of America
    "TEM-00014", // Legion of Super-Heroes
    "CHR-00245", // Martian Manhunter
    "CHR-00278", // Nightwing
    "CHR-00299", // Poison Ivy
    "CHR-DCX-0031", // Raven
    "CHR-00319", // Red Hood
    "CHR-00342", // Sandman
    "CHR-00362", // Shazam / Captain Marvel
    "TEM-00016", // Suicide Squad
    "CHR-DCX-0033", // Superboy
    "CHR-00392", // Supergirl
    "CHR-00395", // Swamp Thing
    "TEM-00015", // Teen Titans
    "DCA-0209", // Watchmen
    "CHR-00501", // Wonder Woman
    "CHR-00513", // Zatanna
    // Marvel
    "CHR-00024", // Ant-Man / Giant-Man
    "TEM-00002", // Avengers
    "CHR-00053", // Black Panther
    "CHR-00055", // Black Widow
    "CHR-00057", // Blade
    "CHR-00070", // Cable
    "CHR-00071", // Captain America
    "CHR-00073", // Captain Marvel (Carol Danvers)
    "CHR-00098", // Daredevil
    "CHR-00110", // Deadpool
    "TEM-00005", // Defenders
    "CHR-00124", // Doctor Strange
    "CHR-00131", // Elektra
    "TEM-00007", // Fantastic Four
    "CHR-00154", // Gambit
    "CHR-00160", // Ghost Rider
    "TEM-00008", // Guardians of the Galaxy
    "CHR-00177", // Hawkeye
    "CHR-00187", // Hulk
    "CHR-00202", // Iron Man
    "CHR-00235", // Luke Cage
    "CHR-00238", // Magneto
    "CHR-00256", // Miles Morales
    "CHR-00265", // Moon Knight
    "CHR-00268", // Ms. Marvel (Kamala Khan)
    "CHR-00272", // Namor the Sub-Mariner
    "CHR-00273", // New Mutants
    "CHR-00310", // Punisher
    "CHR-00334", // Rogue
    "CHR-00363", // She-Hulk
    "CHR-00366", // Silver Surfer
    "CHR-00377", // Spider-Gwen / Ghost-Spider
    "CHR-00388", // Storm
    "CHR-00402", // Thanos
    "CHR-00456", // Thor
    "CHR-00479", // Venom
    "CHR-00481", // Vision & Scarlet Witch
    "CHR-00498", // Wolverine
    "MTA-0028", // X-Factor
    "MTA-0029", // X-Force
    // Independent and cross-publisher franchises
    "CHR-00027", // Archie Andrews & Riverdale Gang
    "CHR-00064", // Bone
    "CHR-00409", // The Boys
    "CHR-00068", // Buffy the Vampire Slayer
    "CHR-00087", // Conan the Barbarian
    "CHR-00153", // G.I. Joe
    "CHR-00161", // Ghostbusters
    "CHR-00164", // Godzilla
    "CHR-00181", // Hellboy
    "CHR-00200", // Invincible
    "CHR-00212", // Judge Dredd
    "CHR-00229", // Locke & Key
    "CHR-00255", // Mighty Morphin Power Rangers
    "CHR-00264", // Monstress
    "CHR-00321", // Red Sonja
    "CHR-00341", // Saga
    "CHR-00349", // Scott Pilgrim
    "CHR-00367", // Sin City
    "CHR-00369", // Something is Killing the Children
    "CHR-00371", // Sonic the Hedgehog
    "CHR-00375", // Spawn
    "CHR-00400", // Teenage Mutant Ninja Turtles
    "CHR-00462", // Transformers
    "CHR-00448", // The Umbrella Academy
    "CHR-00474", // Usagi Yojimbo
    "CHR-00477", // Vampirella
    "CHR-00451", // The Walking Dead
    "CHR-00497", // Witchblade
    // DC additional store-table dividers
    "CHR-00021", // Animal Man
    "CHR-00406", // The Atom
    "CHR-DCX-0047", // Bane
    "CHR-00041", // Batwoman
    "CHR-DCX-0048", // Beast Boy
    "CHR-DCX-0049", // Big Barda
    "CHR-00052", // Black Lightning
    "CHR-00056", // Blackhawk
    "CHR-00065", // Booster Gold
    "CHR-00072", // Captain Atom
    "TEM-DCX-0064", // Creature Commandos
    "EVT-00004", // Crisis Saga
    "CHR-00108", // DCeased
    "CHR-DCX-0070", // Deadman
    "CHR-00137", // Etrigan the Demon
    "CHR-00148", // Firestorm
    "CHR-00157", // Gen13
    "CHR-DCX-0026", // Hawkgirl
    "CHR-00189", // Huntress
    "CHR-00192", // Icon and Rocket
    "CHR-00210", // Jonah Hex
    "TEM-00011", // Justice League Dark
    "CHR-DCX-0115", // Lex Luthor
    "CHR-DCX-0028", // Lobo
    "CHR-00251", // Metamorpho
    "CHR-00260", // Mister Miracle / New Gods
    "CHR-DCX-0029", // Mister Terrific
    "CHR-00431", // The Outsiders
    "CHR-00432", // The Peacemaker
    "CHR-DCX-0133", // Penguin
    "CHR-00298", // Plastic Man
    "CHR-00302", // Power Girl
    "CHR-00434", // The Question
    "CHR-DCX-0143", // Riddler
    "CHR-00351", // Secret Six
    "CHR-00356", // Sgt. Rock / Easy Company
    "CHR-00443", // The Spectre
    "CHR-DCX-0032", // Starfire
    "CHR-00385", // Static
    "CHR-00386", // Steel
    "CHR-00482", // Vixen
    "CHR-00511", // Young Justice
    // Marvel additional store-table dividers
    "EVT-00001", // Adam Warlock
    "CHR-00015", // Alpha Flight
    "CHR-00042", // Beast
    "CHR-00045", // Beta Ray Bill
    "CHR-00074", // Carnage
    "CHR-00080", // Champions
    "EVT-00003", // Civil War
    "CHR-00084", // Cloak and Dagger
    "CHR-00086", // Colossus
    "CHR-00096", // Cyclops
    "CHR-00105", // Dazzler
    "CHR-00111", // Deathlok
    "CHR-00135", // Emma Frost
    "MTA-0007", // Eternals
    "MTA-0008", // Excalibur
    "CHR-00143", // Falcon
    "CHR-00158", // Generation X
    "CHR-00196", // Infinity Saga
    "CHR-00198", // Inhumans
    "CHR-00201", // Iron Fist
    "CHR-00205", // Jean Grey / Phoenix
    "CHR-00221", // Kraven the Hunter
    "CHR-00240", // Man-Thing
    "CHR-00246", // Marvel Zombies
    "MTA-0018", // Midnight Sons
    "CHR-00266", // Morbius
    "CHR-00270", // Mystique
    "EVT-00011", // New Warriors
    "CHR-00276", // Nightcrawler
    "CHR-00285", // Nova
    "MTA-0022", // Power Pack
    "CHR-00337", // Runaways
    "CHR-00338", // S.H.I.E.L.D.
    "CHR-00339", // Sabretooth
    "EVT-00014", // Secret Wars
    "CHR-00353", // Sentry
    "CHR-00361", // Shang-Chi
    "CHR-00379", // Spider-Man 2099
    "CHR-00380", // Spider-Woman (Jessica Drew)
    "CHR-00381", // Squirrel Girl
    "CHR-00457", // Thunderbolts
    "CHR-00496", // Winter Soldier
    "TEM-00024", // Young Avengers
    // Independent and cross-publisher expansion additional store-table dividers
    "CHR-00007", // Adventure Time
    "CHR-00028", // Army of Darkness
    "DHA-0099", // Avatar: The Last Airbender
    "CHR-00051", // Black Hammer
    "CHR-00061", // Bloodshot
    "CHR-00067", // BRZRKR
    "CHR-00411", // The Crow
    "DHA-0102", // Cyberpunk 2077
    "CHR-00412", // The Darkness
    "CHR-00103", // Darkwing Duck
    "CHR-00125", // Doctor Who
    "BMA-0194", // DuckTales
    "CHR-00133", // Elfquest
    "BMA-0133", // Firefly
    "INDX-00463", // Gargoyles
    "CHR-00417", // The Goon
    "CHR-00190", // Ice Cream Man
    "INDX-00474", // James Bond
    "CHR-00222", // Lady Death
    "CHR-00236", // Lumberjanes
    "BMA-0267", // Magic: The Gathering
    "CHR-00427", // The Mask
    "CHR-00249", // Mega Man
    "CHR-00267", // Mouse Guard
    "CHR-00433", // The Phantom
    "CHR-00315", // Radiant Black
    "CHR-00326", // Rick and Morty
    "CHR-00437", // The Rocketeer
    "CHR-00340", // Sabrina the Teenage Witch
    "CHR-00345", // Savage Dragon
    "CHR-00440", // The Simpsons
    "DHA-0115", // Stranger Things
    "EVT-00019", // Warhammer 40,000
    "CHR-00455", // The X-Files
    "EVT-00025", // X-O Manowar
    // DC expanded store-table dividers
    "EVT-DCX-0013", // 52
    "REF-00001", // Absolute Universe (2024 relaunch)
    "CHR-00006", // Adam Strange
    "TEM-00001", // All-Star Squadron
    "CHR-DCX-0037", // Amethyst
    "CHR-00407", // The Authority
    "CHR-DCX-0050", // Bizarro
    "CHR-DCX-0017", // Black Manta
    "SER-DCX-0188", // Black Orchid
    "DCA-0086", // Blackest Night
    "DTA-0001", // Blood Syndicate
    "SER-DCX-0189", // Blue Devil
    "CHR-DCX-0054", // Brainiac
    "CHR-DCX-0058", // Captain Cold
    "CHR-00079", // Challengers of the Unknown
    "DTA-0003", // Checkmate
    "CHR-DCX-0164", // The Cheetah
    "CHR-DCX-0063", // Clayface
    "SER-DCX-0216", // The Creeper
    "DTA-0004", // Crime Syndicate
    "EVT-DCX-0015", // Dark Nights: Metal
    "CHR-DCX-0071", // Deadshot
    "CHR-DCX-0077", // Doomsday
    "CHR-00134", // Elongated Man
    "CHR-00141", // Fables
    "EVT-DCX-0022", // Flashpoint
    "DTA-0007", // Forever People
    "CHR-00150", // Freedom Fighters
    "CHR-DCX-0088", // Gorilla Grodd
    "SER-DCX-0197", // Gotham Central
    "DTA-0008", // Gotham City Sirens
    "TEM-DCX-0090", // Green Lantern Corps
    "CHR-DCX-0094", // Hawk and Dove
    "CHR-00194", // Impulse / Kid Flash (Bart Allen)
    "CHR-00197", // Infinity, Inc.
    "DCA-0154", // Injustice
    "CHR-DCX-0106", // Jimmy Olsen
    "CHR-00216", // Kamandi
    "CHR-DCX-0027", // Katana
    "CHR-DCX-0110", // Killer Croc
    "DCA-0157", // Kingdom Come
    "CHR-DCX-0117", // Lois Lane
    "SER-DCX-0202", // Madame Xanadu
    "CHR-00242", // Manhunter
    "CHR-DCX-0121", // Mera
    "CHR-00250", // Metal Men
    "CHR-00254", // Midnighter & Apollo
    "CHR-DCX-0122", // Mister Freeze
    "CHR-00289", // OMAC
    "SER-DCX-0219", // The Omega Men
    "CHR-DCX-0166", // The Phantom Stranger
    "CHR-00304", // Preacher
    "CHR-DCX-0137", // Ra's al Ghul
    "SER-DCX-0208", // Resurrection Man
    "CHR-DCX-0141", // Reverse-Flash
    "CHR-DCX-0146", // Scarecrow
    "DTA-0015", // Seven Soldiers
    "CHR-00357", // Shade, the Changing Man
    "CHR-DCX-0152", // Sinestro
    "CHR-DCX-0153", // Solomon Grundy
    "CHR-DCX-0154", // Stargirl
    "CHR-00384", // Starman
    "CHR-00389", // Stormwatch
    "SER-DCX-0213", // Strange Adventures
    "DTA-0017", // Super Sons
    "CHR-00447", // The Terrifics
    "CHR-DCX-0173", // Two-Face
    "SER-DCX-0221", // Unknown Soldier
    "CHR-00475", // V for Vendetta
    "CHR-DCX-0006", // The Warlord
    "CHR-00494", // WildC.A.T.s
    "CHR-00495", // Wildcat
    "CHR-DCX-0180", // Wonder Girl
    "CHR-00500", // Wonder Twins
    "CHR-DCX-0181", // Zod
    // Marvel expanded store-table dividers
    "MTA-0001", // A-Force
    "MTA-0002", // Agents of Atlas
    "CHR-00010", // Alias (Jessica Jones)
    "CHR-00020", // Angel / Archangel
    "MCA-0001", // Angela
    "CHR-00023", // Annihilation Saga
    "MEV-00108", // Avengers vs. X-Men
    "MCA-0005", // Black Bolt
    "MAR-BLACK-CAT-AUTHORITY", // Black Cat
    "MEV-00188", // Blood Hunt
    "MCA-0007", // Brother Voodoo / Doctor Voodoo
    "M2A-00093", // Bullseye
    "M2A-00097", // Captain Britain and MI13
    "MTA-0005", // Damage Control
    "TEM-00004", // Dark Avengers
    "CHR-00101", // Darkhawk
    "MCA-0136", // Death's Head
    "MCA-0008", // Devil Dinosaur / Moon Girl
    "CHR-00129", // Drax the Destroyer
    "MCA-0009", // Echo
    "MCA-0010", // Elsa Bloodstone
    "CHR-00139", // Exiles
    "MCA-0011", // Firestar
    "MTA-0010", // Future Foundation
    "M2A-00255", // Galactus the Devourer
    "CHR-00155", // Gamora
    "M2A-00279", // Green Goblin
    "CHR-00173", // Groot
    "MTA-0012", // Hellions
    "CHR-00182", // Hercules
    "CHR-00183", // Heroes for Hire
    "MEV-00017", // House of M
    "EVT-00010", // Howard the Duck
    "CHR-00188", // Human Torch (Johnny Storm)
    "CHR-00193", // Illuminati
    "MTA-0014", // Invaders
    "MCA-0016", // Ironheart
    "MCA-0018", // Jeff the Land Shark
    "MCA-0020", // Ka-Zar
    "EVT-00043", // King in Black
    "M2A-00393", // Loki
    "CHR-00230", // Longshot
    "MCA-0021", // Machine Man
    "MTA-0016", // Marauders
    "M2A-00411", // Marvel 1602
    "MCA-0038", // Marvel Knights
    "CHR-00247", // Marvelman / Miracleman
    "MCA-0026", // Monica Rambeau / Photon
    "M2A-00541", // Multiple Man
    "CHR-00274", // Nextwave
    "CHR-00275", // Nick Fury
    "MEV-00204", // One World Under Doom
    "MEV-00007", // Onslaught
    "MTA-0021", // Pet Avengers
    "MCA-0153", // Peter Porker, the Spectacular Spider-Ham
    "CHR-00314", // Quicksilver
    "M2A-00622", // Red Skull
    "CHR-00333", // Rocket Raccoon
    "CHR-00347", // Scarlet Spider (Ben Reilly)
    "EVT-00045", // Secret Invasion
    "CHR-00355", // Sgt. Fury and his Howling Commandos
    "CHR-00365", // Silk
    "M2A-00702", // Spider-Punk
    "EVT-00046", // Spider-Verse
    "MTA-0024", // Squadron Supreme
    "CHR-00383", // Star-Lord
    "MTA-0025", // Starjammers
    "MCA-0032", // Strange Academy
    "M2A-00745", // Taskmaster
    "MCA-0036", // Tigra
    "M2A-00791", // Ultron
    "CHR-00473", // USAgent
    "CHR-00476", // Valkyrie
    "EVT-00018", // War Machine
    "EVT-00047", // War of the Realms
    "CHR-00486", // Wasp
    "CHR-00490", // Weapon X
    "CHR-00493", // What If?
    "MCA-0037", // White Tiger
    "CHR-00499", // Wonder Man
    "MEV-00036", // World War Hulk
    "EVT-00048", // X of Swords
    "CHR-00507", // X-23 / Wolverine (Laura Kinney)
    "CHR-00508", // X-Man (Nate Grey)
    "MTA-0030", // X-Statix
    // Independent and cross-publisher expanded store-table dividers
    "CHR-00004", // 30 Days of Night
    "CHR-00005", // 300
    "DHA-0096", // Alien
    "CHR-00026", // Archer & Armstrong
    "CHR-00029", // Assassin's Creed
    "CHR-00030", // Astro City
    "CHR-00032", // B.P.R.D.
    "CHR-00034", // Baltimore
    "CHR-00040", // Battlestar Galactica
    "CHR-00043", // Beasts of Burden
    "IMA-0053", // Bitter Root
    "CHR-00060", // Bloodborne
    "CHR-00076", // Casper the Friendly Ghost
    "CHR-00082", // Chew
    "CHR-00091", // Criminal
    "DHA-0103", // Critical Role
    "CHR-00094", // Cyberforce
    "CHR-00097", // Danger Girl
    "CHR-00100", // Dark Souls
    "CHR-00109", // Deadly Class
    "CHR-00113", // Descender
    "CHR-00114", // Dick Tracy
    "INDX-00453", // Doc Savage
    "CHR-00127", // Donald Duck
    "DHA-0104", // Dragon Age
    "CHR-00130", // East of West
    "REF-00004", // EC Horror & Sci-Fi Line
    "IMA-0143", // Eight Billion Genies
    "CHR-00145", // Fathom
    "CHR-00149", // Flash Gordon
    "CHR-00151", // Futurama
    "CHR-00162", // Gideon Falls
    "CHR-00418", // The Green Hornet
    "CHR-00169", // Grendel
    "CHR-00172", // Groo the Wanderer
    "CHR-00174", // Hack/Slash
    "DHA-0107", // Halo
    "CHR-00176", // Harrow County
    "CHR-00195", // Indiana Jones
    "CHR-00203", // Irredeemable
    "CHR-00206", // Jim Henson's The Dark Crystal
    "CHR-00215", // Jurassic Park
    "IMA-0272", // Lazarus
    "DHA-0100", // The Legend of Korra
    "CHR-00425", // The Lone Ranger
    "DHA-0086", // Lone Wolf and Cub
    "CHR-00232", // Love and Rockets
    "CHR-00237", // MAD Magazine
    "CHR-00252", // Mickey Mouse
    "CHR-00253", // Micronauts
    "CHR-00269", // My Little Pony
    "INDX-01032", // Nexus
    "CHR-00281", // Ninjak
    "CHR-00290", // Once & Future
    "CHR-00292", // Paper Girls
    "CHR-00301", // Popeye
    "CHR-00303", // Powers
    "DHA-0097", // Predator
    "CHR-00313", // Quantum and Woody
    "CHR-00317", // Rat Queens
    "CHR-00324", // Resident Alien
    "CHR-00325", // Richie Rich
    "CHR-00328", // RoboCop
    "CHR-00329", // Robotech
    "CHR-00335", // ROM
    "CHR-00438", // The Shadow
    "CHR-00358", // Shadowhawk
    "CHR-00359", // Shadowman
    "CHR-00444", // The Spirit
    "CHR-00391", // Street Fighter
    "CHR-00446", // The Terminator
    "DHA-0117", // Tomb Raider
    "CHR-00472", // Uncle Scrooge
    "CHR-00483", // Voltron
    "CHR-00454", // The Wicked + The Divine
    "DHA-0118", // The Witcher
    "CHR-00505", // Wytches
    "EVT-00026", // Xena, Warrior Princess
    "CHR-00512", // Youngblood
    "CHR-00515", // Zorro
    // DC expanded store-table dividers
    "CHR-00001", // 100 Bullets
    "DCA-0085", // Absolute Power
    "DCA-0200", // Adventure Comics
    "CHR-00009", // Air Wave
    "EVT-00002", // All-American Men of War
    "CHR-DCX-0036", // Amanda Waller
    "CHR-00017", // Ambush Bug
    "CHR-00019", // American Vampire
    "CHR-DCX-0038", // Anarky
    "CHR-DCX-0039", // Anti-Monitor
    "SER-DCX-0184", // Arak, Son of Thunder
    "SER-DCX-0185", // Arion, Lord of Atlantis
    "CHR-DCX-0046", // Atrocitus
    "CHR-00031", // Aztek
    "DCA-0047", // Backlash
    "DCA-0039", // Basketful of Heads
    "SER-DCX-0186", // Bat Lash
    "SER-DCX-0187", // Beowulf: Dragon Slayer
    "CHR-00050", // Black Condor
    "CHR-DCX-0051", // Black Mask
    "CHR-DCX-0053", // Bloodsport
    "CHR-00408", // The Books of Magic
    "DTA-0002", // Boy Commandos
    "DCA-0202", // The Brave and the Bold
    "CHR-DCX-0057", // Captain Boomerang
    "SER-DCX-0190", // Captain Carrot / Zoo Crew
    "SER-DCX-0191", // Captain Comet
    "DCA-0034", // Cave Carson
    "SER-DCX-0192", // Chase
    "CHR-DCX-0062", // Cheshire
    "SER-DCX-0193", // Chronos
    "SER-DCX-0194", // Claw the Unconquered
    "DCA-0123", // Damage
    "DCA-0006", // Daytripper
    "DCA-0135", // DC: The New Frontier
    "TEM-DCX-0069", // Dead Boy Detectives
    "DTA-0005", // Demon Knights
    "DCA-0071", // Dial H for Hero
    "CHR-00120", // DMZ
    "CHR-DCX-0075", // Doctor Sivana
    "CHR-00126", // Doll Man
    "SER-DCX-0195", // Doorway to Nightmare
    "CHR-DCX-0078", // Dreamer
    "DTA-0006", // DV8
    "CHR-DCX-0080", // El Diablo
    "CHR-DCX-0081", // Enchantress
    "DCA-0050", // Ex Machina
    "DCA-0031", // Federal Bureau of Physics
    "DCA-0072", // The Flintstones
    "EVT-DCX-0023", // Forever Evil
    "DCA-0142", // Frankenstein, Agent of S.H.A.D.E.
    "DCA-0073", // Future Quest
    "CHR-00152", // G.I. Combat
    "SER-DCX-0196", // Ghosts
    "DCA-0051", // Global Frequency
    "CHR-00170", // Grifter
    "TEM-00017", // The Guardian & the Newsboy Legion
    "SER-DCX-0198", // House of Mystery
    "SER-DCX-0199", // House of Secrets
    "DCA-0083", // Human Target
    "CHR-DCX-0098", // Hush
    "SER-DCX-0200", // I...Vampire
    "EVT-00029", // Invasion!
    "CHR-00423", // The Invisibles
    "CHR-00204", // iZombie
    "DCA-0079", // The Jetsons
    "CHR-DCX-0111", // Killer Frost
    "CHR-DCX-0112", // King Shark
    "DCA-0101", // Knight Terrors
    "CHR-DCX-0113", // Krypto
    "DCA-0061", // The League of Extraordinary Gentlemen
    "DTA-0027", // The Losers
    "DCA-0052", // Majestic
    "SER-DCX-0204", // Man-Bat
    "CHR-DCX-0120", // Maxwell Lord
    "DCA-0036", // Mother Panic
    "CHR-00429", // The Multiversity
    "DCA-0070", // Naomi
    "CHR-00430", // The Nice House on the Lake
    "CHR-00277", // Nightshade
    "CHR-DCX-0131", // Ocean Master
    "CHR-00295", // Phantom Lady
    "CHR-00297", // Planetary
    "DCA-0205", // Police Comics
    "DTA-0012", // Power Company
    "CHR-00306", // Prez
    "DCA-0060", // Promethea
    "CHR-DCX-0136", // Psycho-Pirate
    "SER-DCX-0207", // R.E.B.E.L.S.
    "CHR-DCX-0003", // Ragman
    "CHR-00435", // The Ray
    "CHR-00327", // Rip Hunter, Time Master
    "CHR-00344", // Sargon the Sorcerer
    "CHR-00346", // Scalped
    "CHR-00350", // Sea Devils
    "DTA-0014", // Secret Society of Super-Villains
    "DCA-0206", // Sensation Comics
    "CHR-00360", // Shadowpact
    "DCA-0207", // Showcase
    "DCA-0178", // Sideways
    "CHR-DCX-0149", // Signal
    "DCA-0053", // Sleeper
    "EVT-00015", // Star Spangled War Stories
    "CHR-DCX-0155", // Starro
    "CHR-00396", // Sweet Tooth
    "CHR-DCX-0161", // Talia al Ghul
    "DTA-0018", // Team 7
    "DCA-0062", // Tom Strong
    "DCA-0063", // Top 10
    "CHR-00463", // Transmetropolitan
    "CHR-DCX-0172", // Trigon
    "DCA-0104", // Underworld Unleashed
    "CHR-00449", // The Unwritten
    "CHR-DCX-0174", // Vandal Savage
    "CHR-DCX-0176", // Vibe
    "CHR-00480", // Vigilante
    "DCA-0197", // Voodoo
    "EVT-00023", // Weird War Tales
    "SER-DCX-0224", // Xero
    "CHR-00510", // Y: The Last Man
    // Marvel expanded store-table dividers
    "MEV-00176", // A.X.E.: Judgment Day
    "EVT-00032", // Acts of Vengeance
    "M2A-00016", // Adam: Legend of the Blue Marvel
    "MEV-00115", // Age of Ultron
    "M2A-00022", // Age of X
    "M2A-00023", // Agent X
    "M2A-00884", // All Winners Comics
    "M2A-01028", // Amazing Adult Fantasy
    "M2A-00036", // Amazing Spider-Girl
    "M2A-00037", // America Chavez: Made in the USA
    "M2A-01032", // Astonishing
    "MEV-00128", // AXIS
    "M2A-00065", // Big Hero 6
    "M2A-00075", // Black Goliath
    "M2A-00076", // Black Order
    "M2A-00079", // Blink
    "CHR-00058", // Blonde Phantom
    "M2A-00083", // Books of Doom
    "M2A-00098", // Captain Carter
    "M2A-00111", // Chamber
    "M2A-00121", // The Clone Conspiracy
    "EVT-00034", // Contest of Champions
    "MCA-0068", // D.P.7
    "M2A-00144", // Dakota North
    "M2A-00912", // Daring Mystery Comics
    "CHR-00099", // Dark Reign / Siege Era
    "MEV-00179", // Dark Web
    "M2A-00152", // The Darkhold
    "M2A-00157", // Darkstar and the Winter Guard
    "MTA-0006", // Daughters of the Dragon
    "M2A-00167", // Demon Days
    "CHR-00413", // The Destroyer (Golden Age)
    "MEV-00169", // Devil's Reign
    "M2A-00186", // Doc Samson
    "M2A-00188", // Doctor Octopus : Negative Exposure
    "M2A-00196", // Doomwar
    "EVT-00041", // Empyre
    "MTA-0009", // Force Works
    "M2A-00240", // Frankenstein
    "M2A-00241", // Franklin Richards
    "MCA-0013", // G.O.D.S.
    "M2A-00259", // Generation Next
    "M2A-00288", // Gwen Stacy
    "M2A-00289", // Gwenpool
    "MCA-0014", // Hellcat
    "MEV-00168", // Heroes Reborn
    "M2A-00307", // Hit-Monkey
    "MCA-0015", // Hood
    "M2A-00322", // Hulkling & Wiccan
    "M2A-00324", // The Human Fly
    "CHR-00420", // The Human Torch (Android, Golden Age)
    "MTA-0013", // Infinity Watch
    "MCA-0017", // Jack of Hearts
    "M2A-00350", // Jackpot
    "M2A-00353", // Jane Foster & the Mighty Thor
    "M2A-00359", // Jubilee
    "EVT-00042", // Kang Dynasty
    "CHR-00217", // Kid Colt, Outlaw
    "M2A-00368", // Killraven
    "M2A-00372", // Knull
    "M2A-00374", // Korvac Saga
    "M2A-00382", // Legion
    "MTA-0015", // Legion of Monsters
    "M2A-00391", // Lockjaw
    "M2A-00398", // Luna Snow: World Tour
    "M2A-00530", // M.O.D.O.K.
    "MCA-0022", // Man-Wolf
    "M2A-00413", // Marvel 2-in-One
    "MCA-0023", // Marvel Boy / Noh-Varr
    "M2A-00434", // Marvel Fanfare
    "M2A-00438", // Marvel Graphic Novel
    "M2A-00445", // Marvel Mangaverse
    "M2A-00461", // Marvel Rivals
    "M2A-00475", // Marvel Tales
    "M2A-00479", // Marvel Treasury Edition
    "M2A-00498", // Marvel's Voices
    "M2A-01076", // Menace
    "MEV-00112", // Messiah Complex
    "M2A-00525", // Millie the Model
    "M2A-00957", // Miss Fury
    "MCA-0025", // Misty Knight
    "CHR-00262", // Mockingbird
    "M2A-00535", // Moonstar
    "M2A-00536", // Morlocks
    "M2A-00544", // Mutant X
    "M2A-00552", // Namora
    "M2A-00554", // Nebula
    "M2A-00555", // Negasonic Teenage Warhead
    "M2A-00558", // Night Nurse
    "MCA-0028", // Night Thrasher
    "MTA-0019", // Nightstalkers
    "M2A-00566", // Northstar
    "M2A-00567", // Not Brand Echh
    "MTA-0020", // Omega Flight
    "M2A-00572", // Omega the Unknown
    "MEV-00123", // Original Sin
    "M2A-00615", // Quasar
    "CHR-00318", // Rawhide Kid
    "MCA-0029", // Reptil
    "M2A-00637", // The Saga of Crystar, Crystal Warrior
    "EVT-00044", // Secret Empire
    "M2A-00656", // Sentinel
    "MEV-00068", // Shadowland
    "M2A-00664", // Shanna the She-Devil
    "M2A-00665", // Shatterstar
    "M2A-00668", // Shogun Warriors
    "M2A-00670", // Sif
    "MEV-00181", // Sins of Sinister
    "M2A-00674", // Skaar
    "M2A-00676", // Skrull Kill Krew
    "M2A-00680", // Slapstick
    "MCA-0030", // Sleepwalker
    "CHR-00370", // Son of Satan (Daimon Hellstrom)
    "CHR-00376", // Speedball
    "MEV-00100", // Spider-Island
    "M2A-01103", // Strange Tales of the Unusual
    "M2A-00724", // Strikeforce
    "M2A-00993", // Sun Girl
    "M2A-00734", // Super-Villain Team-Up
    "M2A-00737", // Sword Master
    "M2A-00757", // Thunderstrike
    "M2A-00758", // Tiger Division
    "M2A-00770", // Toxin
    "M2A-00775", // Truth: Red, White & Black
    "M2A-00777", // TVA
    "CHR-00466", // Two-Gun Kid
    "M2A-00779", // Typhoid
    "M2A-01007", // U.S.A. Comics
    "M2A-00799", // Union Jack
    "M2A-00801", // Universe X
    "MEV-00050", // War of Kings
    "M2A-00818", // Warriors Three
    "MTA-0026", // Web Warriors
    "M2A-00825", // Weirdworld
    "CHR-00453", // The Whizzer
    "M2A-01117", // World of Fantasy
    "M2A-00862", // X-Tinction Agenda
    "M2A-01120", // Yellow Claw
    "M2A-00872", // Yondu
    "M2A-00873", // Young Allies
    // Independent and cross-publisher (major lines) expanded store-table dividers
    "BMA-0127", // 28 Days Later
    "BMA-0124", // Abbott
    "DHA-0032", // Abe Sapien
    "DHA-0001", // Age of Reptiles
    "BMA-0121", // Alice Ever After
    "BMA-0134", // The Amazing World of Gumball
    "CHR-00018", // American Splendor
    "BMA-0120", // The Amory Wars
    "BMA-0137", // Angel
    "IMA-0028", // Aphrodite IX
    "INDX-00066", // Archangel
    "INDX-00742", // Armor Hunters
    "DHA-0072", // Astro Boy
    "CHR-00035", // Barb Wire
    "BMA-0116", // Ben 10
    "INDX-00412", // Bettie Page
    "DHA-0054", // Big Guy and Rusty the Boy Robot
    "CHR-00046", // Big Trouble in Little China
    "BMA-0114", // Bill & Ted
    "CHR-00047", // Birthright
    "CHR-00048", // Bitch Planet
    "CHR-00054", // Black Science
    "IMA-0070", // Bloodstrike
    "INDX-00417", // Bob's Burgers
    "BMA-0111", // Bone Parish
    "INDX-00749", // Book of Death
    "IMA-0078", // Brigade
    "CHR-00066", // Britannia
    "IMA-0087", // C.O.W.L.
    "DHA-0010", // Canto
    "DHA-0049", // Captain Midnight
    "INDX-00432", // Charmed
    "BMA-0104", // Coda
    "IMA-0095", // Coffin Bound
    "CHR-00088", // Concrete
    "CHR-00090", // Copperhead
    "DHA-0011", // Count Crowley
    "IMA-0101", // Cowboy Ninja Viking
    "CHR-00092", // Criminal Macabre
    "CHR-00093", // Curse Words
    "BMA-0178", // Damn Them All
    "INDX-00447", // Dark Shadows
    "INDX-00162", // Deadworld
    "CHR-00115", // Die
    "CHR-00119", // Divinity
    "INDX-00455", // Dracula
    "CHR-00132", // Elephantmen
    "INDX-00457", // Elvira: Mistress of the Dark
    "DHA-0014", // Emily the Strange
    "CHR-00136", // Empowered
    "BMA-0097", // The Empty Man
    "EVT-00007", // Eternal Warrior
    "DHA-0015", // Ether
    "INDX-00460", // Evil Ernie
    "BMA-0043", // The Expanse
    "CHR-00140", // Extremity
    "CHR-00142", // Faith
    "BMA-0017", // Farscape
    "CHR-00144", // Fatale
    "DHA-0016", // Fear Agent
    "BMA-0090", // Fence
    "DHA-0017", // Fight Club
    "CHR-00147", // Firebreather
    "DHA-0018", // Flaming Carrot
    "DHA-0082", // Gantz
    "BMA-0087", // Garfield
    "INDX-00465", // George R. R. Martin's A Game of Thrones
    "CHR-00159", // Ghost
    "BMA-0084", // Giant Days
    "IMA-0181", // Glory
    "IMA-0183", // God Country
    "BMA-0077", // Grim
    "CHR-00175", // Harbinger
    "INDX-00210", // Haunted Mansion
    "CHR-00179", // Head Lopper
    "CHR-00184", // Highlander
    "CHR-00199", // Injection
    "BMA-0070", // Jim Henson's Labyrinth
    "CHR-00214", // Jupiter's Legacy
    "CHR-00218", // Kill or Be Killed
    "INDX-00486", // KISS
    "DHA-0022", // Lady Killer
    "CHR-00228", // Livewire
    "CHR-00233", // Low
    "DHA-0056", // Madman
    "CHR-00426", // The Manhattan Projects
    "DHA-0057", // Martha Washington
    "DHA-0109", // Mass Effect
    "CHR-00257", // Mind MGMT
    "BMA-0281", // The Muppets
    "CHR-00271", // Nailbiter
    "INDX-00503", // Nancy Drew & The Hardy Boys
    "DHA-0059", // Next Men
    "CHR-00286", // Nowhere Men
    "CHR-00291", // Outcast
    "DHA-0111", // Overwatch
    "INDX-00505", // Pathfinder
    "CHR-00296", // Pitt
    "INDX-00510", // Project Superpowers
    "CHR-00309", // Prophet
    "CHR-00316", // Rai
    "INDX-00527", // Re-Animator
    "IMA-0394", // Redcoat
    "CHR-00322", // Redneck
    "CHR-00323", // Regular Show
    "IMA-0404", // Rogue Sun
    "DHA-0027", // Rumble
    "CHR-00352", // Secret Weapons
    "CHR-00354", // Sex Criminals
    "CHR-00364", // Sherlock Holmes
    "CHR-00441", // The Six Million Dollar Man / The Bionic Woman
    "CHR-00368", // Solar, Man of the Atom
    "BMA-0338", // Sons of Anarchy
    "CHR-00373", // Southern Bastards
    "DHA-0114", // StarCraft
    "REF-00013", // Steven Universe
    "DHA-0030", // The Strain
    "CHR-00390", // Stray Bullets
    "IMA-0479", // Supreme
    "CHR-00464", // Trees
    "DHA-0094", // Trigun
    "CHR-00465", // Turok, Son of Stone
    "EVT-00017", // V-Wars
    "DHA-0095", // Vampire Hunter D
    "CHR-00478", // Velvet
    "CHR-00485", // Wanted
    "EVT-00020", // Warlord of Mars (John Carter)
    "INDX-00560", // The Wheel of Time
    "DHA-0035", // Witchfinder
    "CHR-00504", // Wynonna Earp
    // Independent and cross-publisher (additional lines) expanded store-table dividers
    "MCA-0125", // Abadazad
    "INDX-01068", // Afterlife with Archie
    "INDX-01037", // Airboy
    "INDX-01025", // American Flagg!
    "CHR-00022", // Animosity
    "INDX-00871", // Autumnal
    "INDX-00576", // Babyteeth
    "IND2-00167", // Bad Mother
    "INDX-01026", // Badger
    "IND2-00373", // Baker Street
    "INDX-00872", // Barbaric
    "IND2-00036", // Battle of the Planets
    "IND2-00105", // Battlecats
    "CHR-00044", // Beetle Bailey
    "INDX-00395", // The Black Hood
    "INDX-00841", // Black Summer
    "INDX-00583", // Black-Eyed Kids
    "INDX-00876", // Blue Flame
    "INDX-00797", // Brody's Ghost
    "INDX-00589", // Bunny Mask
    "IND2-00436", // Captain Victory and the Galactic Rangers
    "CHR-00078", // Cerebus
    "INDX-00594", // Chicken Devil
    "INDX-01011", // The Complete Peanuts
    "INDX-00800", // Courtney Crumrin
    "INDX-00846", // Crossed
    "IND2-00352", // Crossfire
    "INDX-00597", // Dark Ark
    "CHR-00102", // Darkstalkers
    "IND2-00171", // Devil's Highway
    "INDX-01041", // DNAgents
    "IND2-00437", // Dreadstar
    "INDX-01028", // E-Man
    "IND2-00173", // E-Ratic
    "EVT-00006", // EC War Line
    "INDX-01003", // Eightball
    "IND2-00438", // Elric
    "INDX-01012", // The Fabulous Furry Freak Brothers
    "INDX-00883", // Fearscape
    "INDX-00884", // Finger Guns
    "CHR-00416", // The Fly
    "INDX-00854", // FreakAngels
    "IND2-00420", // From Hell
    "IND2-00133", // Gatchaman
    "INDX-01004", // Ghost World
    "CHR-00165", // Gold Digger
    "CHR-00166", // Goofy
    "INDX-01029", // Grimjack
    "CHR-00171", // Grimm Fairy Tales
    "INDX-00701", // Grimm Tales of Terror
    "INDX-01005", // Hate
    "INDX-00886", // Heathen
    "CHR-00180", // Heavy Metal Magazine
    "CHR-00185", // Hot Stuff, the Little Devil
    "IND2-00180", // Hotell
    "IND2-00067", // Hunter-Killer
    "CHR-00421", // The Incal
    "INDX-00809", // Invader Zim
    "CHR-00207", // Jim Henson's The Storyteller
    "INDX-01030", // Jon Sable, Freelance
    "CHR-00211", // Josie and the Pussycats
    "INDX-00369", // Jughead
    "IND2-00388", // Kabuki
    "INDX-00613", // Kaiju Score
    "INDX-00810", // Kaijumax
    "INDX-00375", // Katy Keene
    "IND2-00136", // Knights of the Golden Sun
    "CHR-00223", // Letter 44
    "IND2-00740", // Life Is Strange
    "CHR-00227", // Little Orphan Annie
    "INDX-00928", // Lola XOXO
    "CHR-00239", // Magnus, Robot Fighter
    "CHR-00241", // Mandrake the Magician
    "INDX-00619", // Maniac of New York
    "IND2-00391", // Meatcake
    "MCA-0112", // Meridian
    "CHR-00428", // The Metabarons
    "INDX-00379", // Mighty Crusaders
    "INDX-00889", // Money Shot
    "INDX-01045", // Ms. Tree
    "INDX-00859", // Neonomicon
    "MCA-0097", // Night Man
    "CHR-00279", // Ninja High School
    "IND2-00143", // Nottingham
    "IND2-00525", // Phantom Starkiller
    "IND2-00077", // Postal
    "MCA-0093", // Prime (Ultraverse)
    "CHR-00307", // Prince Valiant
    "CHR-00308", // Princeless
    "INDX-00862", // Providence
    "IND2-00339", // Puppet Master
    "CHR-00312", // Purgatori
    "INDX-00817", // Queen & Country
    "INDX-00895", // Radio Apocalypse
    "CHR-00320", // Red Ryder
    "IND2-00199", // The Resistance
    "IND2-00742", // Rivers of London
    "CHR-00331", // Robyn Hood
    "MCA-0115", // Ruse
    "MCA-0111", // Scion
    "MCA-0109", // Sigil
    "IND2-00195", // Sins of the Salton Sea
    "CHR-00442", // The Sixth Gun
    "MCA-0113", // Sojourn
    "CHR-00372", // Soulfire
    "IND2-00299", // Speed Racer
    "IND2-00533", // Stabbity Bunny
    "IND2-00444", // Starslayer
    "INDX-00863", // Stitched
    "INDX-00823", // Stumptown
    "IND2-00589", // The Surrogates
    "CHR-00397", // TaleSpin
    "IND2-00745", // Tank Girl
    "CHR-00398", // Tarzan
    "IND2-00712", // The Technopriests
    "INDX-00906", // These Savage Shores
    "IND2-00079", // Think Tank
    "IND2-00304", // The Twilight Zone
    "IND2-00445", // Twisted Tales
    "INDX-00865", // Uber
    "MCA-0098", // Ultraforce
    "INDX-00724", // Van Helsing
    "CHR-00484", // Walt Disney's Comics and Stories
    "EVT-00021", // Warren Horror Magazines
    "INDX-00653", // We Live
    "CHR-00491", // Wendy the Good Little Witch
    "INDX-00731", // Wonderland
    "IND2-00203", // Year Zero
    "CHR-00514", // Zenith
    "INDX-01050", // Zot!
  ]),
  expectedMinimums: { music: 7350, comic: 17850 },
  bundledFiles: {
    music: 'data/music.json',
    comic: [
      'data/comics.json',
      'data/comics-v4.19-01.json', 'data/comics-v4.19-02.json', 'data/comics-v4.19-03.json',
      'data/comics-v4.19-04.json', 'data/comics-v4.19-05.json', 'data/comics-v4.19-06.json',
      'data/comics-v4.19-07.json', 'data/comics-v4.19-08.json', 'data/comics-v4.19-09.json',
      'data/comics-v4.19-10.json', 'data/comics-v4.19-11.json', 'data/comics-v4.19-12.json',
      'data/comics-v4.19-13.json',
      'data/comics-indie-expansion-v4.29.json',
      'data/comics-indie-deep-dive-v4.30.json',
      'data/comics-indie-series-v4.30.1.json',
      'data/comics-indie-series-v4.31.json',
      'data/comics-media-indie-v4.32.json',
      'data/comics-indie-series-v4.33.json',
      'data/comics-indie-series-v4.34.json',
      'data/comics-indie-series-v4.34.1.json',
      'data/comics-image-series-v4.35.json',
      'data/comics-missing-series-v4.36.json',
      'data/comics-verified-obscure-v4.36.1.json',
      'data/comics-image-deep-dive-v4.37.json',
      'data/comics-image-deep-dive-v4.37-b.json',
      'data/comics-image-deep-dive-v4.37-c.json',
      'data/comics-image-early-v4.38.json',
      'data/comics-image-historical-v4.38.1.json',
      'data/comics-image-directory-v4.39.json',
      'data/comics-image-historical-audit-v4.40.json',
      'data/comics-dynamite-series-v4.41.json',
      'data/comics-dynamite-dispatches-v4.42.json',
      'data/comics-dynamite-historical-v4.43.json'
    ]
  }
});
