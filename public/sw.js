const CACHE = 'menteverso-v1';
self.addEventListener('install', evento => {
  self.skipWaiting();
  evento.waitUntil(
    caches
      .open(CACHE)
      .then(cache => cache.addAll(['/', '/icone.svg', '/manifest.json']))
      .catch(() => {})
  );
});
self.addEventListener('activate', evento => {
  evento.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', evento => {
  if (
    evento.request.method !== 'GET' ||
    new URL(evento.request.url).origin !== self.location.origin
  )
    return;
  evento.respondWith(
    fetch(evento.request)
      .then(resposta => {
        if (resposta.ok) {
          const copia = resposta.clone();
          caches
            .open(CACHE)
            .then(cache => cache.put(evento.request, copia))
            .catch(() => {});
        }
        return resposta;
      })
      .catch(() => caches.match(evento.request))
  );
});
