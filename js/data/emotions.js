// 気持ちの細かい種類（改善1）
// 考え方：イェール大学感情知能センターの「ムードメーター」（心地よさ × エネルギーの4つの象限）。
//   red    … 心地よくない × エネルギー高い（焦り・不安・イライラ）
//   blue   … 心地よくない × エネルギー低い（疲れ・悲しい・虚しい）
//   gray   … どちらとも言えない（もやもや・迷い）
//   green  … 心地よい × エネルギー低い（ほっと・穏やか）
//   yellow … 心地よい × エネルギー高い（わくわく・やる気）
// 気持ちに名前をつけること自体に、気持ちを少し落ち着かせる働きがあることが知られています（感情のラベリング）。
//
// tags/concerns … 言葉選びで重みづけするタグ・関心ごと
// words         … 言葉データ（RAG）を探す時に使う、近い言い回し
// noPush        … これを選んだ時は「背中を押す強い言葉」を出さない

export const QUADRANTS = {
  red: { label: 'ざわざわ・張りつめている', hint: '心地よくない × エネルギー高め' },
  blue: { label: 'しずんでいる・重たい', hint: '心地よくない × エネルギー低め' },
  gray: { label: 'どちらとも言えない', hint: 'まだ名前のない気持ち' },
  green: { label: 'おだやか・ほっとしている', hint: '心地よい × エネルギー低め' },
  yellow: { label: 'わくわく・前向き', hint: '心地よい × エネルギー高め' },
};

export const EMOTIONS = [
  // red
  { id: 'fuan', label: '不安', quadrant: 'red', tags: ['reframe', 'prepare'], concerns: [], words: ['不安', '心配', 'こわい', '先が見えない'], noPush: true },
  { id: 'aseri', label: '焦り', quadrant: 'red', tags: ['small', 'rest'], concerns: [], words: ['焦り', '急ぐ', '早く', '間に合わない', '遅れ'], noPush: true },
  { id: 'iraira', label: 'イライラ', quadrant: 'red', tags: ['reframe'], concerns: ['people'], words: ['イライラ', '腹が立つ', '怒り', '相手'], noPush: true },
  { id: 'ikari', label: '怒り', quadrant: 'red', tags: ['reframe'], concerns: ['people'], words: ['怒り', '怨み', '許せない', '争い'], noPush: true },
  { id: 'kinchou', label: '緊張', quadrant: 'red', tags: ['prepare', 'rest'], concerns: [], words: ['緊張', '本番', 'プレッシャー', 'こわい', '挑む'] },
  { id: 'kuyashii', label: '悔しい', quadrant: 'red', tags: ['learn'], concerns: [], words: ['悔しい', '負け', '失敗', 'もう一度'] },
  { id: 'oitsumerare', label: '追い詰められている', quadrant: 'red', tags: ['rely', 'rest'], concerns: [], words: ['追い詰め', '余裕がない', '抱え', '手放す', '頼る'], noPush: true },
  { id: 'motokashii', label: 'もどかしい', quadrant: 'red', tags: ['small'], concerns: [], words: ['もどかしい', '進まない', 'できることから'] },
  { id: 'shitto', label: 'うらやましい', quadrant: 'red', tags: ['compare'], concerns: ['self'], words: ['うらやましい', '比べる', '人の目', '評価'], noPush: true },
  // blue
  { id: 'tsukare', label: '疲れた', quadrant: 'blue', tags: ['rest'], concerns: ['health'], words: ['疲れ', 'しんどい', '休む', '眠る'], noPush: true },
  { id: 'kanashii', label: '悲しい', quadrant: 'blue', tags: ['self', 'rest'], concerns: [], words: ['悲しい', '涙', '夜明け', '時間'], noPush: true },
  { id: 'munashii', label: '虚しい', quadrant: 'blue', tags: ['self', 'fun'], concerns: ['self'], words: ['虚しい', '意味', '役に立たない', '空っぽ'], noPush: true },
  { id: 'sabishii', label: '寂しい', quadrant: 'blue', tags: ['rely'], concerns: ['people'], words: ['寂しい', '孤独', 'ひとり', 'つながり'], noPush: true },
  { id: 'ochikomi', label: '落ち込んでいる', quadrant: 'blue', tags: ['self'], concerns: ['self'], words: ['落ち込み', 'へこむ', '暗い', '夜明け'], noPush: true },
  { id: 'muki', label: 'やる気が出ない', quadrant: 'blue', tags: ['small', 'rest'], concerns: [], words: ['やる気', '動けない', '起きる', '小さなこと'], noPush: true },
  { id: 'nasakenai', label: '情けない', quadrant: 'blue', tags: ['self'], concerns: ['self'], words: ['情けない', 'ダメ', '失敗', '理想'], noPush: true },
  { id: 'jishinnai', label: '自信がない', quadrant: 'blue', tags: ['self', 'small'], concerns: ['self'], words: ['自信', '下手', '向いてない', '比べる'], noPush: true },
  { id: 'zaiakukan', label: '申し訳ない', quadrant: 'blue', tags: ['self'], concerns: ['self'], words: ['罪悪感', '申し訳ない', '謝る', '責める'], noPush: true },
  { id: 'okiteikareta', label: '置いていかれた', quadrant: 'blue', tags: ['compare'], concerns: ['self'], words: ['置いていかれ', '遅れ', '比べる', '晩成'], noPush: true },
  { id: 'koukai', label: '後悔している', quadrant: 'blue', tags: ['learn', 'today'], concerns: [], words: ['後悔', 'あの時', '過去', '忘れる'], noPush: true },
  // gray
  { id: 'moyamoya', label: 'もやもや', quadrant: 'gray', tags: ['reframe'], concerns: [], words: ['もやもや', '書き出す', '名前'] },
  { id: 'mayoi', label: '迷っている', quadrant: 'gray', tags: ['prepare'], concerns: [], words: ['迷い', '決められない', '目的', '選ぶ'] },
  { id: 'taikutsu', label: '退屈', quadrant: 'gray', tags: ['fun'], concerns: ['work'], words: ['退屈', 'つまらない', '楽しむ', '好き'] },
  { id: 'bonyari', label: 'ぼんやり', quadrant: 'gray', tags: ['rest'], concerns: [], words: ['ぼんやり', '休む', 'のんびり'] },
  { id: 'iienai', label: 'うまく言えない', quadrant: 'gray', tags: ['reframe', 'rest'], concerns: [], words: ['うまく言えない', '書き出す', '気持ち'] },
  // green
  { id: 'hotto', label: 'ほっとしている', quadrant: 'green', tags: ['today', 'rest'], concerns: [], words: ['ほっと', '安心', '今日'] },
  { id: 'odayaka', label: '穏やか', quadrant: 'green', tags: ['today'], concerns: [], words: ['穏やか', '静か', '水'] },
  { id: 'kansha', label: '感謝している', quadrant: 'green', tags: ['rely'], concerns: ['people'], words: ['感謝', 'ありがとう', '仲間'] },
  { id: 'mitasare', label: '満たされている', quadrant: 'green', tags: ['self'], concerns: [], words: ['満たされ', '足りている', '足る'] },
  { id: 'nonbiri', label: 'のんびりしたい', quadrant: 'green', tags: ['rest'], concerns: ['health'], words: ['のんびり', '休む', '寝て待て'] },
  // yellow
  { id: 'wakuwaku', label: 'わくわく', quadrant: 'yellow', tags: ['fun', 'prepare'], concerns: [], words: ['わくわく', '楽しむ', '始める'] },
  { id: 'yaruki', label: 'やる気がある', quadrant: 'yellow', tags: ['small', 'prepare'], concerns: [], words: ['やる気', '前倒し', '行う', '続ける'] },
  { id: 'tanoshii', label: '楽しい', quadrant: 'yellow', tags: ['fun'], concerns: ['work'], words: ['楽しい', '好き', '道楽', '笑う'] },
  { id: 'hokori', label: '誇らしい', quadrant: 'yellow', tags: ['learn', 'self'], concerns: [], words: ['誇らしい', 'うまくいった', '褒める'] },
  { id: 'kibou', label: '希望がある', quadrant: 'yellow', tags: ['prepare'], concerns: [], words: ['希望', '明日', '準備', 'チャンス'] },
  { id: 'chousen', label: '挑戦したい', quadrant: 'yellow', tags: ['prepare', 'learn'], concerns: [], words: ['挑戦', '挑む', '勇気', '闘技場'] },
];

const BY_ID = Object.fromEntries(EMOTIONS.map((e) => [e.id, e]));
export function findEmotion(id) {
  return BY_ID[id] || null;
}

// 気分（1〜5）とエネルギー（1〜3）から、先に見せる象限を決める
export function quadrantsFor(mood, energy) {
  const m = Number(mood) || 3;
  const e = Number(energy) || 2;
  const q = [];
  if (m <= 2) { if (e >= 2) q.push('red'); if (e <= 2) q.push('blue'); }
  if (m === 3) q.push('gray', e >= 2 ? 'red' : 'blue', e >= 2 ? 'yellow' : 'green');
  if (m >= 4) { if (e >= 2) q.push('yellow'); if (e <= 2) q.push('green'); }
  if (m <= 2) q.push('gray');
  return [...new Set(q)];
}

export function emotionsFor(mood, energy) {
  const qs = quadrantsFor(mood, energy);
  return EMOTIONS.filter((e) => qs.includes(e.quadrant)).sort((a, b) => qs.indexOf(a.quadrant) - qs.indexOf(b.quadrant));
}
