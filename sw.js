// オフライン対応：アプリ本体をキャッシュ（同一オリジンのみ）
const CACHE = 'agattekoiya-v4';
const ASSETS = [
  './', './index.html', './app.html', './safety.html', './privacy.html', './css/style.css', './manifest.webmanifest', './icons/icon.svg',
  './js/app.js','./js/data/corpus/index.js','./js/data/corpus/v1.js','./js/data/corpus/v1_1.js','./js/data/corpus/v2.js','./js/data/corpus/v2_1.js','./js/data/emotions.js','./js/data/hotlines.js','./js/data/patterns.js','./js/data/words.js','./js/engine.js','./js/coaches.js','./js/coach-ui.js','./js/feedback.js','./js/episode-ui.js','./js/data/episodes.js','./js/hard.js','./js/lp.js','./js/rag.js','./js/safety-ui.js','./js/storage.js','./js/text.js',
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match('./app.html')))
  );
});
