//asignar nombre y version de cache
const CACHE_NAME = 'v1_cache_demopwaElectoral';

//ficheros a cachear en la app
var urlsToCache = [
    './',
    './img/icon-1024.png',
    './img/icon-512.png',
    './img/icon-384.png',
    './img/icon-256.png',
    './img/icon-192.png',
    './img/icon-128.png',
    './img/icon-96.png',
    './img/icon-64.png',
    './img/icon-32.png',
    './img/icon-16.png',
    './assets/img/favicon.ico',
    './css/styles.css'
];

//evento Install
//instalacion del service worker y guardar en cache los recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => {
                    self.skipWaiting();
                });
        })
        .catch(err => console.log('no se ha podido guardar', err))
    );
});


//evento activate
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        //Borrar elementos que no utilizaremos
                        return caches.delete(cacheName);
                    }

                })
            );
        })
        .then(() => {
            self.clients.claim();
        })
    );
});

//evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //devuelvo datos del cache
                return res;
            }
            return fetch(e.request);
        })
    );
});