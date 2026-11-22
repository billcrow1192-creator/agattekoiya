// 言葉データ（RAG）の版の管理。新しい版を足したら CURRENT を切り替える。
import { CORPUS_V1 } from './v1.js';
import { CORPUS_V1_1 } from './v1_1.js';
import { CORPUS_V2 } from './v2.js';
import { CORPUS_V2_1 } from './v2_1.js';

export const CATEGORIES = {
  step: '一歩・挑戦',
  learn: '失敗と学び',
  rest: '休む・ゆるす',
  calm: '不安・焦りをしずめる',
  people: '人とのつながり',
  work: '仕事と道楽',
  self: '自分を認める',
  keep: '続ける',
  today: '今日を生きる',
  prepare: '準備・先回り',
  hope: '希望',
};

// 版の一覧（予定も含む）。docs/corpus/README.md と合わせる
export const VERSIONS = [
  { version: '1.0.0', status: 'included', note: '偉人・古典・ことわざ（権利の切れたもの中心）＋編集部のオリジナル' },
  { version: '1.1.0', status: 'included', note: '古典・ことわざ・四字熟語を追加＋Outlier（世界の最先端の人たちの話）の短く鋭い語り口を参考にした編集部の言葉' },
  { version: '2.0.0', status: 'included', note: '管理人Openが集めてきた言葉から（出典・権利・トーンを確認して採用したものと、それを元にした編集部の言葉）' },
  { version: '2.1.0', status: 'included', note: 'ことわざ・四字熟語・古典（論語・老子・徒然草・セネカ・自省録など）170語＋編集部の言葉460語（仕事と道楽・人間関係・自分と休む・失敗と学び・今日を区切る）。合計1000語以上' },
  { version: '2.1.1', status: 'current', note: '精査版（国語・英語・言語学・心理の観点）：意味の重複・出典の弱いもの・心理的に危ない言葉など58語を外し、14語を言い直し、編集部の言葉50語を追加。合計1015語。理由は docs/corpus/v2_1-review.md' },
  { version: '2.2.0', status: 'planned', note: 'Open の言葉の残り（ChatGPT・Codex からの取り出しの続き）／現代の人物の言葉は原典と権利を確認して追加' },
  { version: '3.0.0', status: 'planned', note: '「しっくりきた／ちがう」の傾向をもとにした入れ替えと追加' },
];

// 現在の版 ＝ v1 ＋ v1.1 ＋ v2 ＋ v2.1（版を重ねても、前の版の言葉は残す）
export const CORPUS = {
  version: CORPUS_V2_1.version,
  date: CORPUS_V2_1.date,
  note: 'v1 ＋ v1.1 ＋ v2 ＋ v2.1',
  items: [...CORPUS_V1.items, ...CORPUS_V1_1.items, ...CORPUS_V2.items, ...CORPUS_V2_1.items],
};
