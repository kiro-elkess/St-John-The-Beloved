const CACHE_NAME = 'stjohn-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './james-admin.html',
  './manifest.json',
  './images/logo.png',
  './images/badge_seer.svg',
  './images/badge_apostle.svg',
  './images/badge_evangelist.svg',
  './images/badge_beloved.svg'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(err => console.log('Cache addAll warning:', err));
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      }).catch(() => cachedResponse);
      return cachedResponse || fetchPromise;
    })
  );
});

// Push notification handler
self.addEventListener('push', event => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: "St. John Class", body: event.data ? event.data.text() : "New reminder" };
  }
  const title = data.title || "أسرة القديس يوحنا الحبيب ✝️";
  const options = {
    body: data.body || "تذكير روحي من أسرة القديس يوحنا الحبيب",
    icon: "images/logo.png",
    badge: "images/logo.png",
    vibrate: [200, 100, 200, 100, 200],
    data: { url: data.url || "./index.html" },
    tag: data.tag || "st-john-notification",
    renotify: true
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const urlToOpen = event.notification.data && event.notification.data.url ? event.notification.data.url : './index.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
      for (let client of windowClients) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(urlToOpen);
    })
  );
});