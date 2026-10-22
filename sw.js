const CACHE="daypad-v32";
const FILES=["./","./index.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./banners/korivu.png","./banners/oneuleun.png","./banners/pawsday.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith((async()=>{
    try{const res=await fetch(e.request,{cache:'no-cache'});const c=await caches.open(CACHE);c.put(e.request,res.clone());return res}
    catch(err){return (await caches.match(e.request,{ignoreVary:true}))||(await caches.match("./index.html"))}
  })());
});
