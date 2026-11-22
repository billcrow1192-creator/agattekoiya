// 言葉選びエンジン（「落ちません。」と共通。純粋関数のみ・DOM非依存・外部通信なし）
import { WORDS as ORIGINALS, SAFETY_WORD } from './data/words.js';
import { PATTERNS, KEYWORD_TAGS } from './data/patterns.js';
import { CORPUS, CATEGORIES } from './data/corpus/index.js';
import { EMOTIONS, findEmotion } from './data/emotions.js';
import { normalize } from './text.js';
import { buildIndex, search, docText } from './rag.js';

// 選べる言葉 ＝ 編集部のオリジナル ＋ 言葉データ（RAG）の現在の版
export const WORDS = [...ORIGINALS, ...CORPUS.items];
export const CORPUS_INFO = { version: CORPUS.version, date: CORPUS.date, quotes: CORPUS.items.filter((w) => w.kind === 'quote').length, originals: ORIGINALS.length + CORPUS.items.filter((w) => w.kind === 'original').length, total: WORDS.length };
const LABELS = { category: CATEGORIES, emotion: Object.fromEntries(EMOTIONS.map((e) => [e.id, e.label])) };
let INDEX = null;
function index() {
  if (!INDEX) INDEX = buildIndex(WORDS.map((w) => ({ id: w.id, text: docText(w, LABELS) })));
  return INDEX;
}

export { normalize };

// ───────── ガードレール：危機的なサインの検知 ─────────
// level 'crisis'：命に関わる可能性 → 励ましや引用は出さず、相談窓口を最優先で案内
// level 'concern'：強いしんどさ → 言葉に加えて相談窓口をそっと案内
const CRISIS_TERMS = [
  '死にたい', 'しにたい', '死のう', '死んでしまいたい', '死んだほうがまし', '死んだ方がまし', '死ぬしかない',
  '消えたい', 'きえたい', '消えてしまいたい', '消えてなくなりたい',
  '自殺', 'じさつ', '自死',
  '生きていたくない', '生きていても仕方', '生きてる意味', '生きている意味', '生きる意味がない',
  '生きるのがつらい', '生きるのが辛い', '生きるのに疲れ', 'いなくなりたい', '人生を終わりにしたい', '全部終わりにしたい', 'すべて終わりにしたい',
  '首を吊', '首吊', '首つり', '飛び降り', 'とびおり', '練炭', 'リスカ', 'リストカット', '自傷', '手首を切',
  'オーバードーズ', 'odし', 'odする', '薬を大量', '遺書',
  '殺したい', '殺してやる', '殺してほしい', '殺して',
];
const CONCERN_TERMS = [
  'もう無理', 'もうむり', '限界', 'げんかい', 'つらすぎ', '辛すぎ', 'しんどすぎ', '助けて', 'たすけて',
  '誰にも言えない', 'だれにもいえない', '楽になりたい', '絶望', '何もかも嫌', 'なにもかもいや',
  '眠れない日が続', 'ずっと眠れない', '涙が止まらない', '逃げ場がない',
];
const N_CRISIS = CRISIS_TERMS.map(normalize);
const N_CONCERN = CONCERN_TERMS.map(normalize);

export function checkSafety(text) {
  const n = normalize(text);
  if (!n) return { level: 'none', matched: [] };
  const crisis = N_CRISIS.filter((t) => n.includes(t));
  if (crisis.length) return { level: 'crisis', matched: crisis };
  const concern = N_CONCERN.filter((t) => n.includes(t));
  if (concern.length) return { level: 'concern', matched: concern };
  return { level: 'none', matched: [] };
}

// ───────── テキストからタグ・関心ごとを推定 ─────────
export function inferFromText(text) {
  const n = normalize(text);
  const tags = new Set();
  const concerns = new Set();
  if (!n) return { tags: [], concerns: [] };
  for (const rule of KEYWORD_TAGS) {
    if (rule.words.some((w) => n.includes(normalize(w)))) {
      rule.tags.forEach((t) => tags.add(t));
      if (rule.concern) concerns.add(rule.concern);
    }
  }
  return { tags: [...tags], concerns: [...concerns] };
}

// ───────── 気分に応じて許可するトーン（ハーネスの中核） ─────────
// 落ちている時に「もっと頑張れ」を絶対に出さない。
export function allowedTones(mood, energy = 2) {
  const m = clamp(Math.round(Number(mood) || 3), 1, 5);
  let tones;
  if (m === 1) tones = ['gentle'];
  else if (m === 2) tones = ['gentle', 'steady'];
  else if (m === 3) tones = ['gentle', 'steady'];
  else if (m === 4) tones = ['gentle', 'steady', 'push'];
  else tones = ['steady', 'push'];
  if (Number(energy) <= 1) tones = tones.filter((t) => t !== 'push');
  if (!tones.length) tones = ['gentle'];
  return tones;
}

export function isEligible(word, mood, energy) {
  const m = clamp(Math.round(Number(mood) || 3), 1, 5);
  const tones = allowedTones(m, energy);
  return m >= word.mood[0] && m <= word.mood[1] && word.tone.some((t) => tones.includes(t));
}

// ───────── 乱数（日付などで再現可能） ─────────
export function hashString(s) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}
function seededUnit(seed) {
  let t = (seed + 0x6d2b79f5) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// ───────── 言葉を選ぶ ─────────
const CONCERN_LABEL = { work: '仕事', people: '人間関係', money: 'お金', health: '体と心', self: '自分のこと' };
/**
 * @param {object} state  { mood:1-5, energy:1-3, concern, emotions:[id], text }
 * @param {object} prefs  { tagWeights, disliked, recent, favorites }
 * @param {object} opts   { seed, words, exclude }
 * @returns {{mode, safety, word, alternatives, inferred, pattern, reason}}
 */
export function selectWords(state = {}, prefs = {}, opts = {}) {
  const mood = clamp(Math.round(Number(state.mood) || 3), 1, 5);
  const energy = clamp(Math.round(Number(state.energy) || 2), 1, 3);
  const safety = checkSafety(state.text);
  const inferred = inferFromText(state.text);
  const picked = (state.emotions || []).map(findEmotion).filter(Boolean).slice(0, 3);
  // ひとことに書かれた気持ちの言葉（「悔しい」「寂しい」など）も、気持ちとして使う
  const nt = normalize(state.text);
  const fromText = nt ? EMOTIONS.filter((e) => !picked.includes(e) && [e.label, ...e.words].flatMap((w) => [w, /[^い]い$/.test(w) && w.length >= 3 ? w.slice(0, -1) : '']).some((w) => normalize(w).length >= 2 && nt.includes(normalize(w)))).slice(0, 2) : [];
  const emotions = [...picked, ...fromText];

  if (safety.level === 'crisis') {
    return { mode: 'safety', safety, word: SAFETY_WORD, alternatives: [], inferred, pattern: null, reason: null };
  }

  // 気持ちから：背中を押す強い言葉を止めるか、重みづけするタグ・関心ごと
  const noPush = emotions.some((e) => e.noPush);
  const emoTags = [...new Set(emotions.flatMap((e) => e.tags))];
  const emoIds = new Set(emotions.map((e) => e.id));

  const pool = opts.words || WORDS;
  const disliked = new Set(prefs.disliked || []);
  const exclude = new Set(opts.exclude || []);
  const recent = prefs.recent || [];
  const tagWeights = prefs.tagWeights || {};
  const concern = state.concern && state.concern !== 'none' ? state.concern : null;
  const concernSet = new Set([concern, ...inferred.concerns, ...emotions.flatMap((e) => e.concerns)].filter(Boolean));
  const seed = opts.seed || 'ochimasen';

  // RAG：気持ちの名前・近い言い回し・ひとこと・関心ごとで言葉データを探す
  const query = [state.text || '', ...emotions.flatMap((e) => [e.label, ...e.words]), concern ? CONCERN_LABEL[concern] : ''].join(' ');
  const hits = opts.words ? new Map() : search(index(), query);

  let eligible = pool.filter((w) => isEligible(w, mood, noPush ? 1 : state.energy));
  let candidates = eligible.filter((w) => !disliked.has(w.id) && !exclude.has(w.id));
  if (!candidates.length) candidates = eligible.filter((w) => !exclude.has(w.id));
  if (!candidates.length) candidates = eligible;

  const scored = candidates.map((w) => {
    let score = 0;
    if (concernSet.size) {
      if (w.concerns.some((c) => concernSet.has(c))) score += 3;
      else if (w.concerns.includes('any')) score += 1;
      else score -= 1;
    } else if (w.concerns.includes('any')) {
      score += 1;
    }
    for (const t of inferred.tags) if (w.tags.includes(t)) score += 2;
    for (const t of emoTags) if (w.tags.includes(t)) score += 1;
    const emoMatch = (w.emotions || []).filter((e) => emoIds.has(e)).length;
    score += emoMatch * 3;
    score += (hits.get(w.id) || 0) * 12; // 検索の近さ（0〜1）
    if (mood <= 2 && w.tone.includes('gentle')) score += 1.5;
    if (mood >= 4 && w.tone.includes('push')) score += 1;
    if (energy === 1 && w.tags.includes('rest')) score += 1.5;
    if (energy === 3 && (w.tags.includes('prepare') || w.tags.includes('fun'))) score += 0.8;
    for (const t of w.tags) score += (tagWeights[t] || 0) * 0.6;
    const ri = recent.indexOf(w.id);
    if (ri !== -1 && ri < 12) score -= 6 - ri * 0.4;
    score += seededUnit(hashString(seed + ':' + w.id)) * 1.2;
    return { word: w, score, emoMatch };
  });
  scored.sort((a, b) => b.score - a.score || a.word.id.localeCompare(b.word.id));

  const top = scored[0];
  const word = top?.word || SAFETY_WORD;
  const alternatives = scored.slice(1, 3).map((s) => s.word);
  const pattern = suggestPattern([...inferred.tags, ...emoTags, ...word.tags], [...concernSet]);
  // 選んだ理由（押しつけにならないよう、事実だけ）
  const matched = emotions.filter((e) => (word.emotions || []).includes(e.id));
  const feel = (matched.length ? matched : emotions).map((e) => `「${e.label}」`).join('');
  const parts = [feel && `${feel}の気持ち`, concern && `「${CONCERN_LABEL[concern]}」のこと`].filter(Boolean);
  const reason = parts.length ? `${parts.join('と')}に近い言葉から選びました` : null;
  return { mode: 'normal', safety, word, alternatives, inferred, pattern, reason };
}

// ───────── 好みの学習 ─────────
export function applyFeedback(prefs = {}, word, kind) {
  const next = {
    tagWeights: { ...(prefs.tagWeights || {}) },
    disliked: [...(prefs.disliked || [])],
    favorites: [...(prefs.favorites || [])],
    recent: [...(prefs.recent || [])],
  };
  if (!word || !word.id) return next;
  const delta = kind === 'like' ? 1 : kind === 'dislike' ? -1 : 0;
  if (delta) {
    for (const t of word.tags) next.tagWeights[t] = clamp((next.tagWeights[t] || 0) + delta, -5, 5);
  }
  if (kind === 'dislike' && !next.disliked.includes(word.id)) next.disliked.push(word.id);
  if (kind === 'like') next.disliked = next.disliked.filter((id) => id !== word.id);
  if (kind === 'favorite' && !next.favorites.includes(word.id)) next.favorites.push(word.id);
  if (kind === 'unfavorite') next.favorites = next.favorites.filter((id) => id !== word.id);
  return next;
}

export function markShown(prefs = {}, wordId) {
  const recent = [wordId, ...(prefs.recent || []).filter((id) => id !== wordId)].slice(0, 20);
  return { ...prefs, recent };
}

// ───────── 失敗パターンの提案 ─────────
export function suggestPattern(tags = [], concerns = []) {
  let best = null;
  let bestScore = 0;
  for (const p of PATTERNS) {
    let s = 0;
    for (const t of tags) if (p.tags.includes(t)) s += 2;
    for (const c of concerns) if (p.concerns.includes(c)) s += 1;
    if (s > bestScore) { best = p; bestScore = s; }
  }
  return bestScore >= 2 ? best : null;
}

export function findPattern(id) {
  return PATTERNS.find((p) => p.id === id) || null;
}
export function findWord(id) {
  if (id === SAFETY_WORD.id) return SAFETY_WORD;
  return WORDS.find((w) => w.id === id) || null;
}

// ───────── 道楽チェック ─────────
const FEEL_SCORE = { fun: 1, normal: 0.5, dislike: 0 };
export function dourakuScore(tasks = []) {
  const rated = tasks.filter((t) => t && t.feel in FEEL_SCORE && !t.delegated);
  if (!rated.length) return null;
  const sum = rated.reduce((a, t) => a + FEEL_SCORE[t.feel], 0);
  return Math.round((sum / rated.length) * 100);
}

export function buildRequest({ task = '', person = '', reason = '', offer = '' } = {}) {
  const who = person.trim() ? `${person.trim()}さん` : '〇〇さん';
  const what = task.trim() || '〇〇';
  const lines = [
    `${who}、少しご相談させてください。`,
    `「${what}」をお願いできないでしょうか。`,
    reason.trim()
      ? `${reason.trim()}ので、${who.replace(/さん$/, 'さん')}にお願いできたら心強いです。`
      : `${who}はこういうことが得意（お好き）だと思っていて、お願いできたら心強いです。`,
  ];
  if (offer.trim()) lines.push(`代わりに「${offer.trim()}」は私が引き受けます。`);
  lines.push('難しければ遠慮なく断ってください。ご検討いただけると嬉しいです。');
  return lines.join('\n');
}

// ───────── 記録・統計 ─────────
export function dateKey(d = new Date()) {
  const dt = d instanceof Date ? d : new Date(d);
  const y = dt.getFullYear();
  const m = String(dt.getMonth() + 1).padStart(2, '0');
  const day = String(dt.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// 今日（または昨日）から遡って連続してチェックインした日数
export function streak(checkins = [], today = new Date()) {
  const days = new Set(checkins.map((c) => dateKey(new Date(c.at))));
  let count = 0;
  const d = new Date(today);
  if (!days.has(dateKey(d))) d.setDate(d.getDate() - 1);
  while (days.has(dateKey(d))) {
    count++;
    d.setDate(d.getDate() - 1);
  }
  return count;
}

export function noteStats(notes = []) {
  const avoided = notes.filter((n) => n.status === 'avoided').length;
  const learned = notes.filter((n) => n.status === 'failed').length;
  const open = notes.filter((n) => !n.status || n.status === 'open').length;
  return { avoided, learned, open, total: notes.length };
}

export function moodSeries(checkins = [], limit = 14) {
  return [...checkins]
    .sort((a, b) => new Date(a.at) - new Date(b.at))
    .slice(-limit)
    .map((c) => ({ at: c.at, mood: c.mood }));
}

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

export { PATTERNS, SAFETY_WORD };
