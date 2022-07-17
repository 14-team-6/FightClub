const STATIC_CACHE_NAME = 'static-data3';

const STATIC_ASSETS = [
  '/',
  '/bundle.js',
  '/public/sounds/attackEnemy.mp3',
  '/public/Pixeboy.woff',
  '/public/sounds/fight.mp3',
  '/public/sounds/jump.mp3',
  '/public/sounds/meow.mp3',
  '/public/sounds/dead.mp3',
  '/public/sounds/sword.mp3',
  '/public/die-right-frame.png',
  '/public/idle-left-frame.png',
  '/public/mainBackground.png',
  '/public/attack-left-frame.png',
  '/public/idle-right-frame.png',
  '/public/run-left-frame.png',
  '/public/attack-right-frame-sm.png',
  '/public/hurt-left-frame.png',
  '/public/jump-left-frame.png',
  '/public/run-right-frame.png',
  '/public/attack-right-frame.png',
  '/public/die-left-frame.png',
  '/public/hurt-right-frame.png',
  '/public/jump-right-frame.png',
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
  if (event.request.method !== 'GET') {
    return;
  }
  const path = (new URL(event.request.url)).pathname;
  if (STATIC_ASSETS.indexOf(path) === -1) {
    return;
  }
  event.respondWith(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      return cache.match(path)
    })
      .then((response) => {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(((response) => {
              return response;
            }
          ));
      }),
  );
});
