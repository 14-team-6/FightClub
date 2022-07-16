const DYNAMIC_CACHE_NAME = 'dynamic-data2';
const STATIC_CACHE_NAME = 'static-data2';

const STATIC_ASSETS = [
  '/public/Pixeboy.woff',
  '/public/avatar.png',
  '/public/die-right-frame.png',
  '/public/idle-left-frame.png',
  '/public/mainBackground.png',
  '/public/attack-left-frame.png',
  '/public/back.png',
  '/public/forward.png',
  '/public/idle-right-frame.png',
  '/public/run-left-frame.png',
  '/public/attack-right-frame-sm.png',
  '/public/dead_cat.png',
  '/public/hurt-left-frame.png',
  '/public/jump-left-frame.png',
  '/public/run-right-frame.png',
  '/public/attack-right-frame.png',
  '/public/die-left-frame.png',
  '/public/hurt-right-frame.png',
  '/public/jump-right-frame.png',
  '/public/sounds/attackEnemy.mp3',
  '/public/sounds/fight.mp3',
  '/public/sounds/jump.mp3',
  '/public/sounds/meow.mp3',
  '/public/sounds/dead.mp3',
  '/public/sounds/sword.mp3',
];

console.log('Service Worker initialized');

self.addEventListener('install', (event) => {
  console.log('Service Worker install hook');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      }),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  console.log('Service Worker fetch hook');

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
          ));
      }),
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activate hook');
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((name) => caches.delete(name)),
    )),
  );
});
