/*
==========================================================
ETA PROFESSIONAL PWA
Service Worker
Versão Beta 1.0
==========================================================
*/

const CACHE_NAME = 'eta-professional-v1.0.0';

//==========================================================
// ARQUIVOS PARA CACHE
//==========================================================

const CACHE_FILES = [
  './',

  './index.html',

  './manifest.json',

  './css/style.css',

  './css/icon.png',

  './js/app.js',

  './js/util.js',

  './js/storage.js',

  './export/export.js',

  './engine/pac.js',

  './engine/cal.js',

  './engine/polimero.js',

  './engine/balanco.js',

  './engine/jar.js',

  './engine/sedimentacao.js',
];

//==========================================================
// INSTALAÇÃO
//==========================================================

self.addEventListener('install', (event) => {
  console.log('Service Worker instalado.');

  event.waitUntil(
    caches
      .open(CACHE_NAME)

      .then((cache) => cache.addAll(CACHE_FILES))

      .then(() => self.skipWaiting())
  );
});

//==========================================================
// ATIVAÇÃO
//==========================================================

self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado.');

  event.waitUntil(
    caches
      .keys()

      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })

      .then(() => self.clients.claim())
  );
});

//==========================================================
// INTERCEPTAR REQUISIÇÕES
//==========================================================

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)

      .then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request).then((networkResponse) => {
          const clone = networkResponse.clone();

          caches
            .open(CACHE_NAME)

            .then((cache) => {
              cache.put(event.request, clone);
            });

          return networkResponse;
        });
      })

      .catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});

//==========================================================
// MENSAGENS
//==========================================================

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
