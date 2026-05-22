const CACHE_NAME = 'commuter-hub-v2.5';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/icon-192.svg',
  '/assets/icon-512.svg',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/lucide@latest'
];

// Install Event - Pre-cache shell
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching static app shell');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-While-Revalidate Strategy
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Skip caching for external non-GET APIs (like OpenMeteo or Overpass)
  // These will be handled by the services local-cache layer in api.js
  if (e.request.method !== 'GET' || url.pathname.includes('/api/') || url.hostname.includes('open-meteo') || url.hostname.includes('overpass-api')) {
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // If resource is in cache, return it and fetch fresh copy in background
      const fetchPromise = fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch((err) => {
        console.warn('[Service Worker] Fetch failed, serving cached fallback:', err);
      });

      return cachedResponse || fetchPromise;
    })
  );
});

// Push Notification Event
self.addEventListener('push', (e) => {
  const data = e.data ? e.data.json() : { title: 'Commuter Hub Notification', body: 'มีอัปเดตใหม่เกี่ยวกับการเดินทางของคุณ!' };
  
  const options = {
    body: data.body,
    icon: '/assets/icon-192.svg',
    badge: '/assets/icon-192.svg',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };

  e.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification Click Event
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      const urlToOpen = e.notification.data ? e.notification.data.url : '/';
      
      // Focus existing tab if open
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new tab
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
