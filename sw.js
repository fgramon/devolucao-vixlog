// Service worker simples: guarda só a "casca" (tela de abertura e ícones).
// O app em si sempre vem do Google (Apps Script), sempre na versão mais nova.
const CACHE = 'casca-devolucao-v1';
const ARQS = ['./', './index.html', './manifest.json', './icones/logo.png', './icones/icone-192.png', './icones/icone-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQS))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin) return;                 // Google/Apps Script: não interfere
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request).then(r => r || caches.match('./'))));
});
