const CACHE='2nc-authority-suite-v2.5.0';
const CORE=['./','./index.html','./404.html','./styles.css','./app.js','./manifest.webmanifest','./VERSION.json','./data/music.json','./data/comics.json'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const url=new URL(event.request.url);
  if(url.origin!==location.origin)return;
  const isAppFile=url.pathname.endsWith('/')||/\.(html|js|css|json|webmanifest)$/.test(url.pathname);
  if(isAppFile){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(event.request,copy));return resp}).catch(()=>caches.match(event.request).then(r=>r||caches.match('./index.html'))));
  }else{
    event.respondWith(caches.match(event.request).then(r=>r||fetch(event.request)));
  }
});
