// 言葉データの検索（RAG の「検索」部分）。端末の中だけで動く。外部の AI やサーバーは使わない。
// 方法：文字の2文字ずつの組（バイグラム）で TF-IDF を作り、入力（気持ち・ひとこと・関心ごと）との近さ（コサイン類似度）を測る。
// 「生成」はしない：見つけた言葉は、人が確認した文章そのままを出す。
import { normalize } from './text.js';

export function bigrams(text) {
  const s = normalize(text);
  const out = [];
  for (let i = 0; i < s.length - 1; i++) out.push(s.slice(i, i + 2));
  if (s.length === 1) out.push(s);
  return out;
}

// 日本語は「焦り／焦って」のように語尾が変わるので、漢字は1文字ずつも手がかりにする
export function tokens(text) {
  const s = normalize(text);
  const kanji = s.match(/[\u4e00-\u9fff\u3400-\u4dbf々]/g) || [];
  return [...bigrams(s), ...kanji.map((k) => '#' + k)];
}

function tf(tokens) {
  const m = new Map();
  for (const t of tokens) m.set(t, (m.get(t) || 0) + 1);
  return m;
}

/** docs: [{ id, text }] */
export function buildIndex(docs) {
  const df = new Map();
  const tfs = docs.map((d) => {
    const m = tf(tokens(d.text));
    for (const t of m.keys()) df.set(t, (df.get(t) || 0) + 1);
    return { id: d.id, m };
  });
  const N = docs.length;
  const idf = (t) => Math.log((N + 1) / ((df.get(t) || 0) + 1)) + 1;
  const vectors = new Map();
  for (const { id, m } of tfs) {
    const v = new Map();
    let norm = 0;
    for (const [t, c] of m) { const w = (1 + Math.log(c)) * idf(t); v.set(t, w); norm += w * w; }
    norm = Math.sqrt(norm) || 1;
    for (const [t, w] of v) v.set(t, w / norm);
    vectors.set(id, v);
  }
  return { vectors, idf, size: N };
}

/** 入力文と各言葉の近さ（0〜1）。Map<id, score> */
export function search(index, query) {
  const scores = new Map();
  const q = tf(tokens(query));
  if (!q.size) return scores;
  const qv = new Map();
  let norm = 0;
  for (const [t, c] of q) { const w = (1 + Math.log(c)) * index.idf(t); qv.set(t, w); norm += w * w; }
  norm = Math.sqrt(norm) || 1;
  for (const [id, v] of index.vectors) {
    let s = 0;
    for (const [t, w] of qv) { const dw = v.get(t); if (dw) s += (w / norm) * dw; }
    if (s > 0) scores.set(id, s);
  }
  return scores;
}

/** 言葉1つ分の検索用テキスト（本文・キーワード・カテゴリー・気持ちの名前） */
export function docText(word, labels = {}) {
  return [
    word.text,
    ...(word.keywords || []),
    ...(word.keywords || []), // キーワードは少し重く
    ...(word.category || []).map((c) => labels.category?.[c] || ''),
    ...(word.emotions || []).map((e) => labels.emotion?.[e] || ''),
    word.step || '',
  ].join(' ');
}
