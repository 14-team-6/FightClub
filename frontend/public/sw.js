const STATIC_CACHE_NAME = 'static-data3';

const STATIC_ASSETS = [
  '/public/font/Pixeboy.woff',
  '/public/font/PressStar.ttf',
  '/public/sounds/attackEnemy.mp3',
  '/public/sounds/fight.mp3',
  '/public/sounds/jump.mp3',
  '/public/sounds/meow.mp3',
  '/public/sounds/dead.mp3',
  '/public/sounds/sword.mp3',
  '/public/img/die-right-frame.png',
  '/public/img/idle-left-frame.png',
  '/public/img/mainBackground.png',
  '/public/img/mainBackgroundAlt.jpg',
  '/public/img/attack-left-frame.png',
  '/public/img/idle-right-frame.png',
  '/public/img/run-left-frame.png',
  '/public/img/attack-right-frame-sm.png',
  '/public/img/hurt-left-frame.png',
  '/public/img/jump-left-frame.png',
  '/public/img/run-right-frame.png',
  '/public/img/attack-right-frame.png',
  '/public/img/die-left-frame.png',
  '/public/img/hurt-right-frame.png',
  '/public/img/jump-right-frame.png',
];

console.log('Service Worker initialized');

self.addEventListener('install', (event) => {
  console.log('Service Worker install hook');
  if (/vegas/.test(self.location.href) || /fightclub/.test(self.location.href)) {
    STATIC_ASSETS.push('/');
    STATIC_ASSETS.push('/bundle.js');
  }
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
