/* eslint-disable no-restricted-globals */

self.addEventListener('install', (event) => {
    // Cache files during install
    event.waitUntil(
        caches.open('cache-v1').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/static/css/main.chunk.css',
                // Add other routes and assets as needed
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
