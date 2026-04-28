// Service Worker v1.8.7
const CACHE = 'manga-tracker-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

// Domini API da NON intercettare mai
const BYPASS_HOSTS = [
  'graphql.anilist.co',
  'openlibrary.org',
  'googleapis.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).catch(() => {})
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Bypass: POST, API esterne, schemi non-http
  if (
    e.request.method !== 'GET' ||
    BYPASS_HOSTS.some(h => url.hostname.includes(h)) ||
    !url.protocol.startsWith('http')
  ) {
    return;
  }

  if (url.origin === location.origin) {
    // File app: cache-first
    e.respondWith(
      caches.match(e.request).then((cached) =>
        cached || fetch(e.request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
          return res;
        })
      )
    );
  } else {
    // Risorse GET esterne (copertine ecc.): network-first
    e.respondWith(
      fetch(e.request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then((cache) => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
  }
});
