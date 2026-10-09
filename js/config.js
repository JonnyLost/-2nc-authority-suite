window.APP_CONFIG = Object.freeze({
  name: '2NC Authority Suite',
  version: '4.33.0',
  build: '2026-10-09-independent-series-deep-dive-five',
  schema: 3,
  databaseName: '2nc-authority-db-v3',
  legacyDatabaseNames: ['2nc-authority-db-v2-5'],
  cacheName: '2nc-authority-suite-v4.33.0',
  expectedMinimums: { music: 7350, comic: 17800 },
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
      'data/comics-indie-series-v4.33.json'
    ]
  }
});
