window.APP_CONFIG = Object.freeze({
  name: '2NC Authority Suite',
  version: '4.44.13',
  build: '2026-11-23-essential-comic-dividers',
  schema: 3,
  databaseName: '2nc-authority-db-v3',
  legacyDatabaseNames: ['2nc-authority-db-v2-5'],
  cacheName: '2nc-authority-suite-v4.44.13',
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
