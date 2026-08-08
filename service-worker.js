const CACHE = '2nc-authority-suite-v4.22.0';
const CORE = [
  './','./index.html','./404.html','./styles.css','./app.js','./manifest.webmanifest','./VERSION.json',
  './js/config.js','./js/logger.js','./js/db.js','./js/sync.js','./js/print-station.js','./js/pdf.js','./js/labels.js','./js/ui.js',
  './vendor/pdf-lib.min.js',
  './data/music.json','./data/comics.json',
  './data/comics-v4.19-01.json','./data/comics-v4.19-02.json','./data/comics-v4.19-03.json','./data/comics-v4.19-04.json',
  './data/comics-v4.19-05.json','./data/comics-v4.19-06.json','./data/comics-v4.19-07.json','./data/comics-v4.19-08.json',
  './data/comics-v4.19-09.json','./data/comics-v4.19-10.json','./data/comics-v4.19-11.json','./data/comics-v4.19-12.json',
  './data/comics-v4.19-13.json','./assets/2nc-logo-white.png','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request) {
  const cache = await caches.open(CACHE);
  try {
    const response = await fetch(request, { cache: 'no-store' });
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    const cached = await cache.match(request, { ignoreSearch: true });
    if (cached) return cached;
    if (request.mode === 'navigate') return cache.match('./index.html');
    throw error;
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) (await caches.open(CACHE)).put(request, response.clone());
  return response;
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  const shell = url.pathname.endsWith('/') || /\.(html|js|css|json|webmanifest)$/.test(url.pathname);
  event.respondWith(shell ? networkFirst(event.request) : cacheFirst(event.request));
});

