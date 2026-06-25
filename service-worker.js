const CACHE_NAME = 'eta-cache-v1';
const FILES_TO_CACHE = ['/', '/index.html', '/css/style.css'];
self.addEventListener('install', evt => { evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))); self.skipWaiting(); });
self.addEventListener('activate', evt => { evt.waitUntil(clients.claim()); });
self.addEventListener('fetch', evt => { evt.respondWith(caches.match(evt.request).then(resp => resp || fetch(evt.request))); });
