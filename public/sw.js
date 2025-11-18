// Simple service worker for image caching
const CACHE_NAME = 'alanah-birthday-v1';
const urlsToCache = [
  '/',
  '/static/chopin-nocturne-op9-no2.mp3.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('/static/')) {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});