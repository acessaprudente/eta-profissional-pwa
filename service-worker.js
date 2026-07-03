/*
==========================================================
ETA PROFESSIONAL PWA
Service Worker
Versão: Alpha 0.1
==========================================================
*/

const CACHE_NAME = "eta-professional-v1";

const FILES_TO_CACHE = [

  "./",
  "./index.html",

  "./css/style.css",
  "./css/dashboard.css",
  "./css/forms.css",
  "./css/tables.css",
  "./css/theme.css",
  "./css/responsive.css",

  "./js/app.js",
  "./js/util.js",
  "./js/storage.js",

  "./engine/pac.js",
  "./engine/cal.js",
  "./engine/polimero.js",
  "./engine/balanco.js",
  "./engine/jar.js",
  "./engine/sedimentacao.js",

  "./export/export.js",

  "./manifest.json"
];


// INSTALL
self.addEventListener("install", (event) => {

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});


// ACTIVATE
self.addEventListener("activate", (event) => {

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );

  self.clients.claim();
});


// FETCH
self.addEventListener("fetch", (event) => {

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
