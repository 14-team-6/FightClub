const DYNAMIC_CACHE_NAME = 'dynamic-data2';
const STATIC_CACHE_NAME = 'static-data2';

const STATIC_ASSETS = [
  //'/bundle.js',
  '/clientSSRBundle',
  '/index.html',
  '/Pixeboy.woff',
  '/avatar.png',
  '/die-right-frame.png',
  '/idle-left-frame.png',
  '/mainBackground.png',
  '/attack-left-frame.png',
  '/back.png',
  '/forward.png',
  '/idle-right-frame.png',
  '/run-left-frame.png',
  '/attack-right-frame-sm.png',
  '/dead_cat.png',
  '/hurt-left-frame.png',
  '/jump-left-frame.png',
  '/run-right-frame.png',
  '/attack-right-frame.png',
  '/die-left-frame.png',
  '/hurt-right-frame.png',
  '/jump-right-frame.png',
  '/sounds/attackEnemy.mp3',
  '/sounds/fight.mp3',
  '/sounds/jump.mp3',
  '/sounds/meow.mp3',
  '/sounds/dead.mp3',
  '/sounds/sword.mp3',
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
