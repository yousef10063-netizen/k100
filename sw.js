const V='k100-v2';
const SHELL=["./", "index.html", "styles.css?v=1", "app.js?v=1", "manifest.webmanifest", "vendor/zxing_reader.wasm", "icons/icon-180.png", "icons/icon-192.png", "fonts/ar-400.woff2", "fonts/ar-500.woff2", "fonts/ar-600.woff2", "fonts/ar-700.woff2", "fonts/la-400.woff2", "fonts/la-500.woff2", "fonts/la-600.woff2", "fonts/la-700.woff2", "img/phase1.webp", "img/phase2.webp", "img/phase3.webp", "img/rules/cup.webp", "img/rules/drop.webp", "img/rules/nosoda.webp", "img/rules/scale.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin) return;
  if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put('./',c));return r}).catch(()=>caches.match('./')));return}
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r})));
});
