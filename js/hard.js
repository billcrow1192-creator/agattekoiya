// あがってこいや。— 伝え方（ハードモード）
// 言葉そのものは「落ちません。」と同じ言葉データを使う。変えるのは「伝え方」だけ。
// ルール（docs/tone.md）：叩くのは言い訳と行動。人格・見た目・能力・存在は絶対に否定しない。
// 命に関わるサインがある時は、ハードモードを止めて相談窓口を出す（engine.js の checkSafety）。
import { selectWords, hashString, WORDS } from './engine.js';
import { EPISODES } from './data/episodes.js';

// 気分ごとの最初の一言
export const OPENERS = {
  1: ['落ちた？ それで終わるか、ここから上がるか。決めるのは自分だ。', '落ちてるのは知ってる。で、ここからどうする。', '底まで来たなら、あとは上がるだけだ。', '倒れててもいい。でも、目はそらすな。', '最悪の日？ なら、ここが折り返し地点だ。'],
  2: ['しんどい？ みんなしんどい。それでもやるやつが勝つ。', 'しんどい？ それでも今日はやってくる。', 'しんどい時こそ、差がつく。', '重い腰を、ほんの少しだけ上げろ。', 'きついのは、まだ戦ってる証拠だ。'],
  3: ['ふつう？ そんな毎日で変われると思ってるなら、甘すぎる。', '考えてるだけで変われるなら、とっくに変わってる。', 'ふつう？ ぬるいな。', '何もない日を、何もない日で終わらせるな。', '可もなく不可もなく。それが一番もったいない。', '平らな日こそ、一段だけ上がれ。'],
  4: ['いい感じ？ そのくらいで満足してたら、そこ止まりだ。', 'いい感じ？ なら一段上げろ。', '調子がいい今、手を止める理由はない。', 'いい流れは、自分で太くしろ。', '乗ってる時に、もう一歩だ。'],
  5: ['上がってる？ 浮かれてる暇があったら、手を動かせ。', '上がってる今が勝負だ。', '勢いがあるうちに、行けるところまで行け。', '今日のお前は強い。使い切れ。', 'その熱、冷める前に形にしろ。'],
};

// 気になっていることへの一言
export const JABS = {
  work: ['仕事は待ってくれない。', '頭で回すな。手で回せ。', 'やった気になってるだけじゃないか？', '準備ばかりで、まだ何も出してないだろ。'],
  people: ['人の顔色より、自分の一歩だ。', '言えなかった言葉は、今日言え。', '人に期待する前に、自分が動け。'],
  money: ['不安がってても、1円も増えない。数字を見ろ。', '財布の中身から、目をそらすな。', '使った金を数える前に、稼ぐ手を一つ打て。'],
  health: ['体は資本だ。壊すな。', '寝ないやつは勝てない。'],
  self: ['自分から逃げるな。', '誰かになろうとするな。自分を上げろ。', '本やセミナーで満足してないか？ 作れ。'],
};

// エネルギーが低い日は「量」を絞る。気合いで押しつぶさない
export const LOW_ENERGY = ['ガス欠の日は、やることを一つに絞れ。それで勝ちだ。', 'エネルギー切れ？ なら、今日は一発だけでいい。'];

// 締めの一言
export const CLOSERS = [
  'あがってこいや。', '口より手を動かせ。', 'やるか、やらないか。それだけだ。', '昨日の自分にだけは負けるな。',
  '言い訳は、終わってから聞く。', 'できない理由より、やる方法を探せ。', '今日の一歩が、明日の差になる。', '待ってても、誰も上げてくれない。',
];

// さらに厳しい締め（気分3以上の日だけ。落ちている日には出さない）
export const CLOSERS_HARD = [
  'そんなことで成功できるなんて、甘すぎるんじゃない？', '学ぶのはもう十分だ。作れ。', '本気なら、もう始めてるはずだ。',
  '口だけで終わるな。', '言い訳を探す時間で、もう一歩進める。', '頭の中の計画は、ゼロと同じだ。出せ。',
];

// 指令をやった時／今日は見送った時
export const DONE = ['よし。それでいい。', 'やるじゃねえか。明日も来い。', 'その一歩が、差になる。', '上がってきたな。'];
export const SKIP = ['今日は見送り？ いい。明日、取り返せ。', '逃げたんじゃない。持ち越しただけだ。明日やれ。'];

// 言いすぎたと感じた時（「きつすぎる」）
export const EASE = '了解。今日はここまででいい。休むのも戦略だ。';

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
 * @returns {{mode, safety, word, opener, jab, order, deadline, closer, alternatives, reason}}
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
  const opener = energy === 1 ? pick(LOW_ENERGY, seed) : pick(OPENERS[mood], seed);
  const jab = concern && JABS[concern] ? pick(JABS[concern], seed + 'j') : null;
  return {
    ...r,
    opener,
    jab,
    order: toOrder(r.word.step),
    deadline: energy === 1 ? '期限：今日中。一つだけでいい。' : '期限：今日中。言い訳はなし。',
    closer: pick(mood >= 3 ? [...CLOSERS, ...CLOSERS_HARD] : CLOSERS, seed + 'c'),
    episode: pickEpisode(mood, concern, seed + 'e'),
  };
}
