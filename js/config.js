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
