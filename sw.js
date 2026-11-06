// Atrament service worker: app shell offline, zero cache dla API.
const CACHE = 'atrament-v11';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(() => {}).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function fromNetwork(req) {
  // Nowe zapytanie z samego adresu: działa też dla nawigacji na iOS i omija cache HTTP.
  const res = await fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' });
  if (res && res.ok) {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req.url, copy)).catch(() => {});
  }
  return res;
}
async function fromCache(req) {
  return (await caches.match(req.url, { ignoreSearch: true }))
    || (req.mode === 'navigate' ? (await caches.match('./index.html')) || (await caches.match('./')) : undefined)
    || Response.error();
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    e.respondWith(fromNetwork(req).catch(() => fromCache(req)));
    return;
  }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        return res;
      }))
    );
  }
});
