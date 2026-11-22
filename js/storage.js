// 端末内だけに保存（外部送信なし）。ストレージが使えない環境でも動くようにメモリにフォールバック。
const KEY = 'agattekoiya:v1';
const EMPTY = () => ({
  version: 1,
  checkins: [], // { id, at, mood, energy, concern, emotions, text, wordId, result: 'done'|'skip'|null, safety }
  prefs: { tagWeights: {}, disliked: [], favorites: [], recent: [] },
});

let memory = null;
function safeGet() { try { return window.localStorage.getItem(KEY); } catch { return null; } }
function safeSet(v) { try { window.localStorage.setItem(KEY, v); return true; } catch { return false; } }

export function load() {
  if (memory) return memory;
  let data = EMPTY();
  const raw = safeGet();
  if (raw) {
    try {
      const d = JSON.parse(raw);
      const e = EMPTY();
      data = { ...e, ...d, prefs: { ...e.prefs, ...(d.prefs || {}) }, checkins: Array.isArray(d.checkins) ? d.checkins : [] };
    } catch { data = EMPTY(); }
  }
  memory = data;
  return memory;
}
export function update(fn) {
  const next = fn(structuredClone(load())) || load();
  memory = next;
  safeSet(JSON.stringify(next));
  return next;
}
export function clearAll() {
  memory = EMPTY();
  try { window.localStorage.removeItem(KEY); } catch { /* noop */ }
}
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
