const C='expocaucasia-v1';
const A=['./','index.html','manifest.json','img/volante.jpg','img/rio.jpg','img/artistas.jpg','img/navidad.jpg','img/calzado.jpg','img/ropa.jpg','img/tecnologia.jpg','img/bisuteria.jpg','img/comidas.jpg','img/hogar.jpg','img/masmas.jpg','img/icon-192.png','img/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
// Red primero: siempre muestra lo más nuevo; si no hay señal, usa la copia guardada
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
