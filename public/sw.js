/* Cache offline compatível com a raiz do site e subdiretórios do GitHub Pages. */
const CACHE = 'menteverso-v2';
const raiz = self.registration.scope;
const recursos = ['./', './icone.svg', './manifest.json'].map(caminho => new URL(caminho, raiz).href);
self.addEventListener('install', evento => {
  self.skipWaiting();
  evento.waitUntil(caches.open(CACHE).then(cache => cache.addAll(recursos)).catch(() => {}));
});
self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys().then(chaves => Promise.all(chaves.filter(chave => chave.startsWith('menteverso-') && chave !== CACHE).map(chave => caches.delete(chave)))).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', evento => {
  if (evento.request.method !== 'GET' || new URL(evento.request.url).origin !== self.location.origin) return;
  evento.respondWith(fetch(evento.request).then(resposta => {
    if (resposta.ok) {
      const copia = resposta.clone();
      caches.open(CACHE).then(cache => cache.put(evento.request, copia)).catch(() => {});
    }
    return resposta;
  }).catch(() => caches.match(evento.request)));
});
