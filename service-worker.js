const CACHE_NAME = 'calculadora-pwa-cache-v1.0';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'imgm.png',
  'imgp.png',
  'favicon.ico'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
