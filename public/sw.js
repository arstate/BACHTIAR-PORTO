const CACHE_NAME = 'image-cache-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // Determine if it's an image we want to cache
    const isImageRequest =
        event.request.destination === 'image' ||
        requestUrl.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i) ||
        requestUrl.hostname.includes('user-attachments') ||
        requestUrl.hostname.includes('wsrv.nl');

    if (event.request.method === 'GET' && isImageRequest) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Clone the request because fetch consumes it
                return fetch(event.request.clone()).then((networkResponse) => {
                    // Verify valid response
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors') {
                        return networkResponse;
                    }

                    // Clone response because we need to add one to cache and return the other
                    const responseToCache = networkResponse.clone();

                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });

                    return networkResponse;
                }).catch(() => {
                    // If network fails and it's not in cache, fallback mechanism could go here
                    // e.g. return a default offline image
                });
            })
        );
    }
});
