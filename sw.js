// Service worker de Montecarlo Sierra de las Quijadas.
// Cuando cambies index.html u otro archivo, subí VERSION para que los celulares descarguen la versión nueva.
const VERSION = 'v2-2026-10-22';
const APP_CACHE = 'msq-app-' + VERSION;
const FONT_CACHE = 'msq-fonts';
const APP_FILES = [
  './',
  'index.html',
  'manifest.webmanifest',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(APP_CACHE).then(c => c.addAll(APP_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('msq-app-') && k !== APP_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Tipografías de Google: se usan las guardadas y se actualizan en segundo plano
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(caches.open(FONT_CACHE).then(async cache => {
      const hit = await cache.match(req);
      const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;

  // Página: primero la red (para recibir actualizaciones); sin conexión, la copia guardada
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(APP_CACHE).then(c => c.put('index.html', copy)); return res; })
        .catch(() => caches.match('index.html', { ignoreSearch: true }))
    );
    return;
  }

  // Resto de los archivos de la app: primero la copia guardada
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(APP_CACHE).then(c => c.put(req, copy)); }
      return res;
    }))
  );
});
