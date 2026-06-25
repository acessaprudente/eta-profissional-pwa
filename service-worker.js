const CACHE_NAME = "eta-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon.png",
  "./css/style.css",
  "./js/balanco.js",
  "./js/pac.js",
  "./js/cal.js",
  "./js/polimero.js",
  "./js/sedimentacao.js",
  "./js/export.js",
  "./js/storage.js"
];

// Instalação: cria cache inicial
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch: responde com cache ou busca online
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Atualização do cache (opcional)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
