const cacheName = "Mode Games Pty Ltd-ELSA Patterns-1.6.0";
const contentToCache = [
    "Build/2df8cd80f044352f223ba981e884093a.js",
    "Build/b7354bef8f46a208e45fa3256659e9ec.js.unityweb",
    "Build/4eb0a3629cc91d72eb33532f2d1cd322.data.unityweb",
    "Build/80feba729803dca54dc94b35ddb45f48.js.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
