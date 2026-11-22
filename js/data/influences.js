// 言葉・本 → 影響を受けた有名人（有料メンバー限定ページ用）
// 事実情報だけを載せる。各エピソードに出典URLと「確からしさ」をつける。
//   level: 'primary' 本人の言葉・本人の著作／'report' 信頼できる報道／'mixed' 報道で言い方に諸説あり
// X・Facebook の投稿そのものは検索で見つけにくいため、見つかったものだけ sns に書く。
// 人物の言葉は、できるだけ原本の言葉に忠実に（言い換えた時は「要約」と書く）。管理人が確認してから公開する。
// 確認日：2026-11
export const INFLUENCES = [
  {
    id: 'think-and-grow-rich',
    title: 'ナポレオン・ヒル『思考は現実化する（Think and Grow Rich）』',
    year: '1937年',
    related: ['hill-gold', 'hill-desire', 'hill-mastermind', 'hill-persist'],
    people: [
      {
        id: 'daymond-john', name: 'デイモンド・ジョン', role: 'FUBU 創業者・投資家（米番組「シャーク・タンク」）',
        episode: '自分の成功を支えた本として『思考は現実化する』を挙げ、くり返し読んでいると語っている。米テレビ番組「シャーク・タンク」の投資家として、起業家にこの本を勧めている。',
        level: 'report', source: 'CNBC（2017年10月17日）', url: 'https://www.cnbc.com/2017/10/17/daymond-john-and-robert-herjavec-recommend-think-and-grow-rich.html',
      },
      {
        id: 'robert-herjavec', name: 'ロバート・ハージャベック', role: '起業家・投資家（米番組「シャーク・タンク」）',
        episode: '同じく「シャーク・タンク」の投資家として、成功を目指す人に『思考は現実化する』を勧めている。',
        level: 'report', source: 'CNBC（2017年10月17日）', url: 'https://www.cnbc.com/2017/10/17/daymond-john-and-robert-herjavec-recommend-think-and-grow-rich.html',
      },
    ],
  },
  {
    id: 'seven-habits',
    title: 'スティーブン・R・コヴィー『7つの習慣』',
    year: '1989年',
    related: ['covey-1', 'covey-2', 'covey-3', 'covey-4', 'covey-5', 'covey-7'],
    people: [
      {
        id: 'okuda-hiroshi', name: '奥田碩', role: '元トヨタ自動車 社長・会長',
        episode: '第7の習慣「刃を研ぐ」に影響を受け、社員にも勉強する習慣を身につけてほしいと考えた、と紹介されている。',
        level: 'report', source: 'PHP「衆知」：できる人が実践している「７つの習慣」', url: 'https://shuchi.php.co.jp/article/2091',
      },
    ],
  },
  {
    id: 'man-in-the-arena',
    title: 'セオドア・ルーズベルト「闘技場に立つ人（The Man in the Arena）」',
    year: '1910年の演説「共和国における市民であること」',
    related: ['q-roosevelt-arena'],
    people: [
      {
        id: 'lebron-james', name: 'レブロン・ジェームズ', role: 'プロバスケットボール選手',
        episode: '試合用のシューズに「man in the arena」と書き、ナイキの自分のモデルの中敷きにもこの演説の一節を入れている。この言葉を自分の生き方として大事にしている、と語っている。',
        level: 'report', source: 'Cleveland19 ほか', url: 'https://www.cleveland19.com/story/38385477/lebron-james-is-the-man-in-the-arena?outputType=amp',
        sns: '試合前にシューズの写真を自身のSNSに載せたことが報じられている（投稿そのものは未確認）',
      },
      {
        id: 'brene-brown', name: 'ブレネー・ブラウン', role: 'ヒューストン大学 研究者・作家',
        episode: 'この演説の「daring greatly（果敢に挑む）」という言葉を、ベストセラー『本当の勇気は「弱さ」を認めること（Daring Greatly）』の題名にした。本の冒頭で、この一節を初めて読んだ時のことを書いている。',
        level: 'primary', source: 'ブレネー・ブラウン『Daring Greatly』（2012年）／Mental Floss', url: 'https://www.mentalfloss.com/history/presidents/roosevelts-man-arena',
      },
    ],
  },
  {
    id: 'sonshi',
    title: '『孫子』',
    year: '中国・春秋時代',
    related: ['q-sonshi', 'q11-sonshi-kachi', 'c21-sonshi-sessoku'],
    people: [
      {
        id: 'son-masayoshi', name: '孫正義', role: 'ソフトバンクグループ 創業者',
        episode: 'ソフトバンク創業間もない1983年ごろ、慢性肝炎で入院中に多くの本を読み、『孫子』の兵法に自分の考えを加えた25文字の「孫の二乗の兵法」をつくった。経営の指針にしてきたと紹介されている。',
        level: 'report', source: 'ダイヤモンド・オンライン ほか', url: 'https://diamond.jp/articles/-/257014',
      },
    ],
  },
  {
    id: 'rongo',
    title: '『論語』',
    year: '中国・春秋時代（孔子と弟子の言行録）',
    related: ['q-rongo', 'q11-rongo-manabu', 'q11-rongo-shi', 'q-rongo-tanoshimu'],
    people: [
      {
        id: 'shibusawa-eiichi', name: '渋沢栄一', role: '実業家（約500の企業の設立に関わった）',
        episode: '『論語』を商売の土台にし、道徳と経済は両立する（「論語と算盤」）と説いた。その考えを自ら『論語と算盤』（1916年）という本にまとめた。',
        level: 'primary', source: '渋沢栄一『論語と算盤』（1916年）', url: 'https://www.shibusawa.or.jp/',
      },
    ],
  },
  {
    id: 'seneca-letters',
    title: 'セネカ『倫理書簡集（ルキリウスへの手紙）』',
    year: '1世紀',
    related: ['q-seneca', 'q-seneca-104', 'q-seneca-71', 'q11-seneca-ikari'],
    people: [
      {
        id: 'tim-ferriss', name: 'ティム・フェリス', role: '起業家・投資家・作家（『「週4時間」だけ働く。』）',
        episode: 'セネカの手紙を自分で選び直した『The Tao of Seneca』を自分のブログで無料公開し、ポッドキャストでもセネカの手紙を取り上げている。',
        level: 'primary', source: 'tim.blog「The Tao of Seneca」', url: 'https://tim.blog/2017/07/06/tao-of-seneca/',
        sns: '公開のお知らせを自身のブログ・SNSで発信',
      },
    ],
  },
  {
    id: 'meditations',
    title: 'マルクス・アウレリウス『自省録』',
    year: '2世紀',
    related: ['q-aurelius', 'q-aurelius-asa', 'q11-aurelius-shizuka', 'c21-aurelius-ima'],
    people: [
      {
        id: 'bill-clinton', name: 'ビル・クリントン', role: '第42代アメリカ大統領',
        episode: '記者に愛読書を聞かれて『自省録』を挙げ、くり返し読み直していると語ったと伝えられている。「毎年」「数年おきに」など、言い方は伝える記事によって違う。',
        level: 'mixed', source: 'Times Higher Education ほか', url: 'https://www.timeshighereducation.com/books/the-emperor-of-self-control/161210.article',
      },
    ],
  },
  {
    id: 'do-things-that-dont-scale',
    title: 'ポール・グレアム「Do Things that Don’t Scale」',
    year: '2013年',
    related: ['pg'],
    people: [
      {
        id: 'airbnb-founders', name: 'ブライアン・チェスキー／ジョー・ゲビア', role: 'Airbnb 共同創業者',
        episode: 'Y Combinator 時代、ニューヨークのホストの家を一軒ずつ訪ねて、写真を撮ったり掲載のしかたを手伝ったりした。グレアムはこのエッセイで、仕組みにならない手作業の例として Airbnb を挙げている。',
        level: 'primary', source: 'Paul Graham「Do Things that Don’t Scale」（2013年）', url: 'https://paulgraham.com/ds.html',
      },
    ],
  },
  {
    id: 'intelligent-investor',
    title: 'ベンジャミン・グレアム『賢明なる投資家』',
    year: '1949年',
    related: ['buffett'],
    people: [
      {
        id: 'warren-buffett', name: 'ウォーレン・バフェット', role: '投資家（バークシャー・ハサウェイ）',
        episode: '19歳でこの本を読み、投資についての考え方が決まったと語っている。のちの版の序文で「投資について書かれた本の中で、群を抜いて最高の本」と書いた。',
        level: 'primary', source: 'ベンジャミン・グレアム『賢明なる投資家』第4版 序文（バフェット）', url: 'https://en.wikipedia.org/wiki/The_Intelligent_Investor',
      },
    ],
  },
  {
    id: 'whole-earth-catalog',
    title: '『ホール・アース・カタログ』最終号「Stay hungry. Stay foolish.」',
    year: '1974年',
    related: ['jobs'],
    people: [
      {
        id: 'steve-jobs', name: 'スティーブ・ジョブズ', role: 'Apple 共同創業者',
        episode: '若いころの愛読書だった『ホール・アース・カタログ』の最終号の裏表紙にあった「Stay hungry. Stay foolish.」を、2005年のスタンフォード大学卒業式のスピーチで紹介し、「自分もいつもそうありたいと願ってきた」と語った。',
        level: 'primary', source: 'スタンフォード大学 卒業式スピーチ（2005年）', url: 'https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says',
      },
    ],
  },
];

export const LEVEL_LABEL = { primary: '本人の言葉・著作', report: '報道', mixed: '報道（言い方に諸説）' };
