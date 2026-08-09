window.APP_CONFIG = Object.freeze({
  name: '2NC Authority Suite',
  version: '4.27.0',
  build: '2026-08-08-jazz-swing-expansion',
  schema: 3,
  databaseName: '2nc-authority-db-v3',
  legacyDatabaseNames: ['2nc-authority-db-v2-5'],
  cacheName: '2nc-authority-suite-v4.27.0',
  expectedMinimums: { music: 6900, comic: 13200 },
  bundledFiles: {
    music: 'data/music.json',
    comic: [
      'data/comics.json',
      'data/comics-v4.19-01.json', 'data/comics-v4.19-02.json', 'data/comics-v4.19-03.json',
      'data/comics-v4.19-04.json', 'data/comics-v4.19-05.json', 'data/comics-v4.19-06.json',
      'data/comics-v4.19-07.json', 'data/comics-v4.19-08.json', 'data/comics-v4.19-09.json',
      'data/comics-v4.19-10.json', 'data/comics-v4.19-11.json', 'data/comics-v4.19-12.json',
      'data/comics-v4.19-13.json'
    ]
  }
});
