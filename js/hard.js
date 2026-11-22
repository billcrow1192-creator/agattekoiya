// あがってこいや。— 伝え方（ハードモード）
// 言葉そのものは「落ちません。」と同じ言葉データを使う。変えるのは「伝え方」だけ。
// ルール（docs/tone.md）：叩くのは言い訳と行動。人格・見た目・能力・存在は絶対に否定しない。
// 命に関わるサインがある時は、ハードモードを止めて相談窓口を出す（engine.js の checkSafety）。
import { selectWords, hashString, WORDS } from './engine.js';
import { EPISODES } from './data/episodes.js';
import { COACHES, getCoach } from './coaches.js';

// 教官ごとの口調は js/coaches.js。ここでは男性鬼教官を「ふつう」として名前を残す（テスト・互換のため）
const M = COACHES.male;
export const OPENERS = M.openers;
export const JABS = M.jabs;
export const LOW_ENERGY = M.lowEnergy;
export const CLOSERS = M.closers;
export const CLOSERS_HARD = M.closersHard;
export const DONE = M.done;
export const SKIP = M.skip;
export const EASE = M.ease;

// 抜き：強く言ったあとに、少し遅れて小さく添える決めゼリフ（毎回出す）。
// 抜くのは「叩きの言葉」の後味だけ。指令の中身と期限はやわらげない。
// 出さない場所：先人の戦歴（出典つきの事実）／危ない時の停止と相談窓口／「きつすぎる」でゆるめた後
export const NUKI = '……ようしらんけど。';

// 命に関わるサインがある時（ハードモード停止）
export const SAFETY_LEAD = 'ここからは、ハードモードを止める。いちばん大事なのは、今のあなたの安全だ。ひとりで抱えずに、話してほしい。';

// 使わない言葉（テストで確かめる）
export const NG_WORDS = ['死', '殺', '甘え', 'クズ', 'ゴミ', 'バカ', '馬鹿', '無能', '役立たず', '価値がない', '消え', 'ダメ人間', '負け犬', '生きてる意味', '才能がない', 'デブ', 'ブス'];

const pick = (arr, seed) => arr[hashString(String(seed)) % arr.length];

// 先人の戦歴を一つ選ぶ。落ちている日（気分1〜2）は「失敗からの逆転」だけ
export function pickEpisode(mood, concern, seed) {
  const pool = EPISODES.filter((e) => mood >= 3 || e.kind === 'comeback');
  const matched = concern ? pool.filter((e) => e.concerns.includes(concern)) : [];
  const list = matched.length ? matched : pool;
  return list[hashString(String(seed)) % list.length];
}

// ハードモードに合う言葉か（言葉の精査 v2.1.1。理由は docs/tone.md）
// ①伝え方と真逆の言葉（「上がらなくていい」「がんばらない日」など）は出さない
// ②行動の芯がない「なぐさめだけ」の言葉は出さない。ただしエネルギー「低い」の日は「休む」言葉を使う
export const CONTRADICTS_HARD = /上がらなくていい|がんばらない|頑張らない|何もしな|そのままで|ままで大丈夫|ままでいい|泣いて|泣ける|泣いた|悲しんでいい|無理に前を向かなくて|ぼんやり|のんびり/;
const ACTION_TAGS = ['small', 'prepare', 'learn', 'fun', 'rely', 'today'];
export function fitsHard(w, energy = 2) {
  if (CONTRADICTS_HARD.test(w.text)) return false;
  const comfortOnly = w.tone.length === 1 && w.tone[0] === 'gentle' && !w.tags.some((t) => ACTION_TAGS.includes(t));
  if (!comfortOnly) return true;
  return energy === 1 && w.tags.includes('rest');
}
const UNFIT = { 1: null, 2: null, 3: null };
function unfitIds(energy) {
  if (!UNFIT[energy]) UNFIT[energy] = WORDS.filter((w) => !fitsHard(w, energy)).map((w) => w.id);
  return UNFIT[energy];
}

// ハードモードで出す言葉の気分の扱い：
// 落ちていても「休んでいいよ」だけで終わらせず、一歩を押す言葉を選びやすくする（ただし最大でも steady まで）
export function toneMood(mood) {
  const m = Math.min(5, Math.max(1, Math.round(Number(mood) || 3)));
  if (m <= 2) return 3;
  if (m === 3) return 4;
  return 5;
}

// 「今日の一歩」を指令にする
export function toOrder(step) {
  const s = String(step || '').trim().replace(/。$/, '');
  return `${s}。`;
}

/**
 * 言葉を選んで、ハードモードの伝え方に包む
 * @param {object} opts  { seed, exclude, coach, eased }  eased … 「きつすぎる」でゆるめた後（抜きを出さない）
 * @returns {{mode, safety, word, opener, jab, order, deadline, closer, nuki, alternatives, reason}}
 */
export function hardSelect(state = {}, prefs = {}, opts = {}) {
  const mood = Math.min(5, Math.max(1, Math.round(Number(state.mood) || 3)));
  const energy = Math.min(3, Math.max(1, Math.round(Number(state.energy) || 2)));
  // 実際に落ちている日（気分1〜2）は「死」「殺」を含む言葉を出さない（元の気分では出ない言葉のため）
  const heavy = mood <= 2 ? WORDS.filter((w) => /死|殺/.test(w.text)).map((w) => w.id) : [];
  const r = selectWords({ ...state, mood: toneMood(mood), energy }, prefs, { ...opts, exclude: [...(opts.exclude || []), ...heavy, ...unfitIds(energy)] });
  if (r.mode === 'safety') return { ...r, lead: SAFETY_LEAD };
  const seed = `${opts.seed || 'agattekoiya'}#${r.word.id}`;
  const concern = state.concern && state.concern !== 'none' ? state.concern : null;
  const c = getCoach(opts.coach);
  const opener = energy === 1 ? pick(c.lowEnergy, seed) : pick(c.openers[mood], seed);
  const jab = concern && c.jabs[concern] ? pick(c.jabs[concern], seed + 'j') : null;
  return {
    ...r,
    coach: c.id,
    opener,
    jab,
    order: toOrder(r.word.step),
    deadline: energy === 1 ? c.deadline.low : c.deadline.normal,
    closer: pick(mood >= 3 ? [...c.closers, ...c.closersHard] : c.closers, seed + 'c'),
    episode: pickEpisode(mood, concern, seed + 'e'),
    nuki: opts.eased ? null : NUKI,
  };
}
