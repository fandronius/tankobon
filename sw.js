// Service Worker v1.8.7
const CACHE = 'manga-tracker-v3';
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

    // Se è AniList, usciamo immediatamente. 
    // Non chiamando e.respondWith(), il browser gestisce la fetch normalmente.
    if (e.request.url.includes('graphql.anilist.co')) {
        return; 
    }

    // Bypass per altri casi (POST, protocolli non-http, etc.)
    if (
        e.request.method !== 'GET' || 
        BYPASS_HOSTS.some(h => url.hostname.includes(h)) || 
        !url.protocol.startsWith('http')
    ) {
        return; 
    }

    // Solo per i file della tua app (GET e stesso origin) usiamo la cache
    if (url.origin === location.origin) {
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
