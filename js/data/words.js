// 落ちません。編集部のオリジナルの言葉（偉人・古典の言葉は js/data/corpus/ に移動）
// ガードレール方針：
//  - 実行時に生成AIで言葉を「作らない」。人が確認した言葉だけを選ぶ。
//  - 引用（kind: 'quote'）は出典を必ず明記。諸説あるものは sourceNote に「とされる」と書く。
//  - tone: gentle（落ちている時向け・押さない）/ steady（ふつうの日）/ push（調子が良い日）
//  - mood: [min, max] 1=落ちてる 〜 5=上がってる。この範囲外では絶対に出さない。
//  - concerns: work / people / money / health / self / any
//  - tags: rest 休む / rely 頼る / small 小さく / learn 失敗に学ぶ / compare 比べない /
//          today 今日を区切る / fun 道楽 / reframe 捉え直す / self 自分にやさしく / prepare 先回り

export const WORDS = [
  // ───────── オリジナル（落ちません編集部） gentle ─────────
  {
    id: 'o-manten', kind: 'original',
    text: '今日は“落ちない”だけで満点。上がらなくていい。',
    tone: ['gentle'], mood: [1, 3], concerns: ['any'], tags: ['rest', 'today', 'self'],
    step: '水を一杯、ゆっくり飲む。',
  },
  {
    id: 'o-nemui', kind: 'original',
    text: '疲れている時の判断は、明日の自分に任せていい。',
    tone: ['gentle'], mood: [1, 3], concerns: ['any', 'work', 'money'], tags: ['rest', 'prepare'],
    step: '今日しようとしていた大きな決断を一つ、明日の午前に移す。',
  },
  {
    id: 'o-hurdle', kind: 'original',
    text: 'しんどい日は、ハードルを地面に置こう。またげば、今日はクリア。',
    tone: ['gentle'], mood: [1, 3], concerns: ['any'], tags: ['small', 'rest'],
    step: '今日のタスクを一つだけ選び、残りは「明日以降」に移す。',
  },
  {
    id: 'o-tomodachi', kind: 'original',
    text: '友だちが同じ状況なら、なんて声をかける？ その言葉を、自分にも。',
    tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['any', 'self'], tags: ['self'],
    step: '自分宛てに、友だちに言うような一行を書く。',
  },
  {
    id: 'o-tasuke', kind: 'original',
    text: '助けを求めるのは、負けじゃない。チームで勝つための作戦だ。',
    tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['any', 'work', 'people'], tags: ['rely'],
    step: '誰か一人に「ちょっと聞いてもいい？」と送る。',
  },
  {
    id: 'o-kami', kind: 'original', emotions: ['iienai', 'moyamoya', 'fuan'],
    text: '悩みは頭の中にあると大きく見える。紙に出すと、ちゃんとサイズが見える。',
    tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['any'], tags: ['reframe', 'rest'],
    step: 'タイマーを3分かけて、思いつくまま書き出す。',
  },
  {
    id: 'o-tsukare', kind: 'original',
    text: 'ダメなのか、疲れているのか。たいていは、ただ疲れている。',
    tone: ['gentle'], mood: [1, 3], concerns: ['any', 'self', 'health'], tags: ['rest', 'self'],
    step: '5分だけ目を閉じる。スマホは手の届かない所へ。',
  },
  {
    id: 'o-kugiru', kind: 'original',
    text: '今日を区切ろう。昨日の後悔と明日の不安は、今日の荷物じゃない。',
    tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['any'], tags: ['today', 'rest'],
    step: '「今日だけのToDo」を3つまで書く。',
  },
  {
    id: 'o-atatakai', kind: 'original',
    text: '落ちた日にやることは一つ。温かいものを口に入れる。',
    tone: ['gentle'], mood: [1, 2], concerns: ['any', 'health'], tags: ['rest'],
    step: '温かい飲み物を一杯つくる。',
  },
  {
    id: 'o-kazoeru', kind: 'original',
    text: '“できなかったこと”より、“やめずにここにいること”を数えよう。',
    tone: ['gentle'], mood: [1, 3], concerns: ['any', 'self'], tags: ['self'],
    step: '今日できたことを、どんなに小さくても3つ書く（起きた、も1つ）。',
  },
  {
    id: 'o-kokyu', kind: 'original',
    text: '深呼吸を数回。それだけで、今日の自分はもう一歩進んでいる。',
    tone: ['gentle'], mood: [1, 3], concerns: ['any'], tags: ['small', 'rest'],
    step: '下の「1分呼吸」をやってみる。',
    action: 'breath',
  },
  {
    id: 'o-kyoujanai', kind: 'original',
    text: '返信も、決断も、謝罪も。今日じゃなくていいものは、今日やらない。',
    tone: ['gentle'], mood: [1, 3], concerns: ['any', 'work', 'people'], tags: ['rest', 'today'],
    step: '「今日じゃなくていいこと」を一つ決めて、明日に回す。',
  },
  {
    id: 'o-shigoto-ryou', kind: 'original',
    text: '仕事が多すぎるのは、あなたの能力不足じゃない。量の問題だ。',
    tone: ['gentle'], mood: [1, 3], concerns: ['work'], tags: ['self', 'rely'],
    step: '抱えている仕事を全部書き出して、数を数える。',
  },
  {
    id: 'o-hitori', kind: 'original',
    text: '全員にわかってもらわなくていい。わかってくれる一人がいれば十分。',
    tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['people', 'self'], tags: ['self', 'rely'],
    step: 'わかってくれそうな人の名前を一人、思い浮かべる。',
  },
  {
    id: 'o-okane-soudan', kind: 'original',
    text: 'お金の悩みは、一人で抱えるほど重くなる。相談できる公的な窓口もある。',
    tone: ['gentle'], mood: [1, 3], concerns: ['money'], tags: ['rely'],
    step: 'お住まいの自治体の「生活相談」「消費生活センター（188）」を調べてみる。',
  },
  {
    id: 'o-nemurenai', kind: 'original',
    text: '眠れない夜は、無理に眠ろうとしなくていい。体を横にするだけでも休息になる。',
    tone: ['gentle'], mood: [1, 3], concerns: ['health'], tags: ['rest'],
    step: '画面を消して、5分間ただ横になる。',
  },
  {
    id: 'o-ochikomu', kind: 'original',
    text: '落ち込むのは、真剣に生きている証拠。ただ、落ちっぱなしにはしない。',
    tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['any', 'self'], tags: ['self'],
    step: '気分が少しでも戻る「自分の定番」（散歩・音楽・シャワー）を一つやる。',
  },
  {
    id: 'o-yasumi-task', kind: 'original',
    text: '休むことも、予定に入れれば立派なタスク。',
    tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['health', 'work', 'any'], tags: ['rest'],
    step: '今日か明日に「休む15分」を予定として入れる。',
  },

  // ───────── オリジナル steady ─────────
  {
    id: 'o-mane', kind: 'original',
    text: '成功の真似は疲れる。失敗の回避は、誰にでもできる。',
    tone: ['steady'], mood: [2, 5], concerns: ['any'], tags: ['learn', 'compare'],
    step: '「失敗の図鑑」から、自分に当てはまるものを一つだけ選ぶ。',
  },
  {
    id: 'o-sonohito', kind: 'original',
    text: '人の成功談は“その人用”。人の失敗談から、自分に当てはまる所だけ持ち帰ろう。',
    tone: ['steady'], mood: [2, 5], concerns: ['any', 'self'], tags: ['compare', 'learn'],
    step: '最近見聞きした誰かの失敗から、自分にも当てはまる所を一つ書く。',
  },
  {
    id: 'o-deban', kind: 'original',
    text: 'やりたくない仕事は、それを好きな人の“出番”かもしれない。',
    tone: ['steady'], mood: [2, 5], concerns: ['work'], tags: ['rely', 'fun'],
    step: '「道楽チェック」で、頼めそうな仕事を一つ選ぶ。',
    action: 'doraku',
  },
  {
    id: 'o-premortem', kind: 'original',
    text: '先に“どう失敗しそうか”を想像しておく。それだけで、避けられる失敗がある。',
    tone: ['steady'], mood: [2, 5], concerns: ['any', 'work'], tags: ['prepare', 'learn'],
    step: '「失敗回避ノート」を一つ書く。',
    action: 'premortem',
  },
  {
    id: 'o-60ten', kind: 'original',
    text: '60点で出して、80点に直す。100点を待つと、0点のまま日が暮れる。',
    tone: ['steady'], mood: [2, 5], concerns: ['work', 'any'], tags: ['small'],
    step: '止まっている仕事を一つ、60点のまま誰かに見せる。',
  },
  {
    id: 'o-5fun', kind: 'original',
    text: '最初の5分だけやる。続きは、5分後の自分が決めればいい。',
    tone: ['steady'], mood: [2, 5], concerns: ['any', 'work'], tags: ['small'],
    step: 'タイマーを5分にセットして、先延ばしにしていたことを始める。',
  },
  {
    id: 'o-ifthen', kind: 'original',
    text: '“もし〇〇になったら、△△する”。決めておけば、迷う前に体が動く。',
    tone: ['steady'], mood: [2, 5], concerns: ['any'], tags: ['prepare'],
    step: '今日起きそうな困りごとに「もし〜なら、〜する」を一つ決める。',
    action: 'premortem',
  },
  {
    id: 'o-kinou', kind: 'original',
    text: '比べるなら、昨日の自分と。それも“少しだけ”でいい。',
    tone: ['gentle', 'steady'], mood: [2, 5], concerns: ['any', 'self'], tags: ['compare', 'self'],
    step: 'SNSを見る前に、昨日の自分より良かったことを一つ書く。',
  },
  {
    id: 'o-shikumi', kind: 'original',
    text: '担当を増やす前に、回る仕組みを一つ作る。',
    tone: ['steady'], mood: [2, 5], concerns: ['work'], tags: ['prepare', 'rely'],
    step: '毎回やっている作業を一つ選び、手順を3行でメモにする（人に渡せる形に）。',
  },
  {
    id: 'o-tanoshii-hitotsu', kind: 'original',
    text: '“楽しい”を一つ見つけてから仕事を始めよう。道楽は、探すところから。',
    tone: ['steady'], mood: [2, 5], concerns: ['work', 'any'], tags: ['fun'],
    step: '今日の仕事で「ちょっと楽しみなこと」を一つ書いてから始める。',
  },
  {
    id: 'o-data', kind: 'original',
    text: '失敗は、記録すれば“データ”になる。記録しないと“傷”のまま残る。',
    tone: ['steady'], mood: [2, 5], concerns: ['any'], tags: ['learn'],
    step: '今日の小さな失敗を一行だけ記録する（責めずに、事実だけ）。',
  },
  {
    id: 'o-kotowaru', kind: 'original',
    text: '断るのも仕事のうち。全部を引き受けると、全部が中途半端になる。',
    tone: ['steady'], mood: [2, 5], concerns: ['work', 'people'], tags: ['rely'],
    step: '「今は難しいです。〇日なら可能です」を一回使ってみる。',
  },
  {
    id: 'o-kyori', kind: 'original',
    text: '人との距離は、“ゼロか百か”じゃなくていい。ちょうどいい距離がある。',
    tone: ['gentle', 'steady'], mood: [2, 5], concerns: ['people'], tags: ['rest', 'reframe'],
    step: '疲れる相手との連絡頻度を一段階だけ下げる。',
  },
  {
    id: 'o-okane-suuji', kind: 'original',
    text: 'お金の不安は、数字にすると少し静かになる。',
    tone: ['steady'], mood: [2, 5], concerns: ['money'], tags: ['reframe', 'prepare'],
    step: '今月の固定費を3つだけ書き出す。',
  },
  {
    id: 'o-karada', kind: 'original',
    text: '体が先、気合いは後。睡眠・食事・散歩、どれか一つから。',
    tone: ['gentle', 'steady'], mood: [2, 5], concerns: ['health', 'any'], tags: ['rest'],
    step: '10分だけ外を歩く。',
  },
  {
    id: 'o-torikaeshi', kind: 'original',
    text: '迷ったら、“一番取り返しのつく方”を選ぶ。',
    tone: ['steady'], mood: [2, 5], concerns: ['any', 'money', 'work'], tags: ['prepare'],
    step: '迷っていることの選択肢それぞれに「取り返しがつくか」を○×で書く。',
  },
  {
    id: 'o-chimeisho', kind: 'original',
    text: '完璧な一日はない。“致命傷のない一日”を積み重ねよう。',
    tone: ['steady'], mood: [2, 5], concerns: ['any'], tags: ['learn', 'today'],
    step: '今日「これだけは避ける」ことを一つ決める。',
  },
  {
    id: 'o-nanimono', kind: 'original',
    text: '何者かになる必要はない。昨日よりちょっと楽しい自分なら、それでいい。',
    tone: ['gentle', 'steady'], mood: [2, 5], concerns: ['self', 'any'], tags: ['self', 'fun', 'compare'],
    step: '今日、自分が「ちょっと楽しかった」瞬間を夜に一つ書く。',
  },
  {
    id: 'o-yaruki', kind: 'original',
    text: 'やる気を待たない。やる気は、動いた後についてくる。',
    tone: ['steady'], mood: [3, 5], concerns: ['any'], tags: ['small'],
    step: '机に向かう、靴を履く——最初の「動作」だけをやる。',
  },
  {
    id: 'o-uketorikata', kind: 'original',
    text: '相手を変えるより、自分の受け取り方を一つ変える方が早い。',
    tone: ['steady'], mood: [3, 5], concerns: ['people'], tags: ['reframe'],
    step: '気になる相手の言動に、別の解釈を一つ考えてみる。',
  },
  {
    id: 'o-okane-herasanai', kind: 'original',
    text: '大きく取り戻そうとしない。小さく減らさない方が、ずっと強い。',
    tone: ['steady'], mood: [2, 5], concerns: ['money'], tags: ['prepare'],
    step: '「一発で取り戻せる」話には今日は乗らない、と決めておく。',
  },

  // ───────── オリジナル push ─────────
  {
    id: 'o-otoshiana', kind: 'original',
    text: '調子のいい日こそ、落とし穴を一つ先に埋めておこう。',
    tone: ['push'], mood: [4, 5], concerns: ['any'], tags: ['prepare'],
    step: '「失敗回避ノート」で、今週の落とし穴を一つ塞ぐ。',
    action: 'premortem',
  },
  {
    id: 'o-chokin', kind: 'original',
    text: '今日の勢いは、明日の自分への貯金。一つだけ前倒ししよう。',
    tone: ['push'], mood: [4, 5], concerns: ['any', 'work'], tags: ['small'],
    step: '明日やる予定のことを一つ、今日のうちに5分だけ進める。',
  },
  {
    id: 'o-douraku', kind: 'original',
    text: '好きなことに没頭している時間は、労働じゃない。道楽だ。',
    tone: ['steady', 'push'], mood: [3, 5], concerns: ['work', 'any'], tags: ['fun'],
    step: '「道楽チェック」で、楽しい仕事の割合を見てみる。',
    action: 'doraku',
  },
  {
    id: 'o-hikiukeru', kind: 'original',
    text: '誰かの“苦手”を、自分の“楽しい”で引き受けられたら最高だ。',
    tone: ['push'], mood: [4, 5], concerns: ['work', 'people'], tags: ['fun', 'rely'],
    step: '周りの人が苦手そうで、自分は好きなことを一つ探す。',
  },
  {
    id: 'o-saigen', kind: 'original',
    text: 'うまくいった理由も書き残そう。再現できる成功は、失敗しない仕組みになる。',
    tone: ['steady', 'push'], mood: [3, 5], concerns: ['any'], tags: ['learn', 'prepare'],
    step: '最近うまくいったことの理由を一行メモする。',
  },
  {
    id: 'o-tettai', kind: 'original',
    text: '挑戦の前に、撤退ラインを決めておく。それが一番強い挑戦の仕方だ。',
    tone: ['push'], mood: [4, 5], concerns: ['any', 'money', 'work'], tags: ['prepare'],
    step: '今の挑戦に「ここまで来たら一度止まる」ラインを一つ決める。',
  },
  {
    id: 'o-shuchu', kind: 'original',
    text: '得意な人に頼る。好きな人に任せる。自分は、自分のやるべきことに集中する。',
    tone: ['steady', 'push'], mood: [3, 5], concerns: ['work'], tags: ['rely'],
    step: '今週、誰かに任せる仕事を一つ決めて依頼する。',
    action: 'doraku',
  },

  // ───────── オリジナル v1 追加：気持ち別（改善1・2） ─────────
  { id: 'o-aseri-hitotsu', kind: 'original', text: '焦る時ほど、一つずつ。並べて、いちばん上だけやる。', tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['any', 'work'], tags: ['small'], emotions: ['aseri', 'oitsumerare'], keywords: ['焦り', '一つずつ', '優先'], step: 'やることを全部書き出して、いちばん上の一つだけに丸をつける。' },
  { id: 'o-kuyashii', kind: 'original', text: '悔しさは、本気だった証拠。その熱は、次の一回のためにとっておこう。', tone: ['steady', 'push'], mood: [2, 5], concerns: ['any'], tags: ['learn'], emotions: ['kuyashii'], keywords: ['悔しい', '本気', '次'], step: '悔しかったことを一行書き、「次の一回で変えること」を一つ決める。' },
  { id: 'o-jishin', kind: 'original', text: '自信は、やる前には無いもの。やった後に、少しずつ貯まっていく。', tone: ['gentle', 'steady'], mood: [1, 5], concerns: ['self', 'any'], tags: ['small', 'self'], emotions: ['jishinnai', 'kinchou'], keywords: ['自信', 'やってみる', '貯まる'], step: '自信がないことを、いちばん小さな形で一回だけやってみる。' },
  { id: 'o-sabishii', kind: 'original', text: 'ひとりの夜は長い。でも、同じ夜をすごしている誰かが、きっといる。', tone: ['gentle'], mood: [1, 3], concerns: ['people', 'any'], tags: ['rely'], emotions: ['sabishii', 'kanashii'], keywords: ['寂しい', '孤独', 'ひとり', '夜'], step: '昔話した誰かに、一言だけメッセージを送ってみる（返事は気にしない）。' },
  { id: 'o-zaiakukan', kind: 'original', text: '謝るべきことは、一度ちゃんと謝る。それ以上、自分を罰し続けなくていい。', tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['self', 'people'], tags: ['self'], emotions: ['zaiakukan', 'koukai'], keywords: ['申し訳ない', '謝る', '責める'], step: '謝ることがあるなら一度だけ伝えて、そのあとは自分を責める時間を終わりにする。' },
  { id: 'o-taikutsu', kind: 'original', text: '退屈は、新しい「楽しい」を探しにいく合図。', tone: ['steady'], mood: [2, 5], concerns: ['work', 'any'], tags: ['fun'], emotions: ['taikutsu', 'munashii'], keywords: ['退屈', '楽しい', '新しい'], step: 'いつもと違う道を通る、違う店に入る——小さな「初めて」を一つ入れる。' },
  { id: 'o-iraira', kind: 'original', text: 'イライラした時は、返事を一呼吸おくらせる。それだけで、言い過ぎが一つ減る。', tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['people', 'work'], tags: ['reframe'], emotions: ['iraira', 'ikari'], keywords: ['イライラ', '怒り', '返事', '言い過ぎ'], step: '次に腹が立ったら、返事をする前に深呼吸を一回はさむ。' },
  { id: 'o-kinchou', kind: 'original', text: '緊張は、大事に思っている証拠。体が、本番の準備をしてくれている。', tone: ['steady', 'push'], mood: [2, 5], concerns: ['work', 'any'], tags: ['prepare'], emotions: ['kinchou'], keywords: ['緊張', '本番', 'プレッシャー', '準備'], step: '緊張したら「わくわくしてきた」と言い換えて、最初の一言だけ準備する。' },
  { id: 'o-fuan-kaku', kind: 'original', text: '不安の正体を紙に書こう。「起きたら困ること」と「その時の手」を並べると、怖さは少し小さくなる。', tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['any'], tags: ['prepare', 'reframe'], emotions: ['fuan'], keywords: ['不安', '書き出す', '備え'], step: '不安なことを一つ書き、その横に「もしそうなったら、こうする」を書く。', action: 'premortem' },
  { id: 'o-munashii', kind: 'original', text: '意味は、探しても見つからないことがある。誰かの小さな役に立った時、あとからついてくる。', tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['self', 'any'], tags: ['self', 'fun'], emotions: ['munashii'], keywords: ['虚しい', '意味', '役に立つ'], step: '誰かのために、5分でできる小さなことを一つやってみる。' },
  { id: 'o-koukai', kind: 'original', text: '「あの時こうすれば」は、次に使える知恵。過去を責める材料にしなくていい。', tone: ['gentle', 'steady'], mood: [1, 5], concerns: ['any'], tags: ['learn'], emotions: ['koukai'], keywords: ['後悔', 'あの時', '知恵'], step: '後悔していることを「次はこうする」の形に書き直す。' },
  { id: 'o-okiteikareta', kind: 'original', text: '人生は競走じゃない。みんな、違うコースを走っている。', tone: ['gentle', 'steady'], mood: [1, 5], concerns: ['self', 'any'], tags: ['compare'], emotions: ['okiteikareta', 'shitto'], keywords: ['置いていかれ', '比べる', '競争'], step: 'SNSを閉じて、自分のコースで今週進んだことを一つ書く。' },
  { id: 'o-mayoi', kind: 'original', text: '迷ったら、小さく試せる方を選ぶ。試してから、もう一度決めればいい。', tone: ['steady'], mood: [2, 5], concerns: ['any', 'work', 'money'], tags: ['prepare', 'small'], emotions: ['mayoi'], keywords: ['迷い', '試す', '決める'], step: '迷っている選択肢を、1日だけ・1回だけ試せる形にしてみる。' },
  { id: 'o-moyamoya', kind: 'original', text: 'もやもやは、まだ名前のない気持ち。書き出すと、少しずつ形が見えてくる。', tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['any'], tags: ['reframe'], emotions: ['moyamoya', 'iienai'], keywords: ['もやもや', '書き出す', '気持ち'], step: '思いつく言葉を、3分だけ書き並べてみる。' },
  { id: 'o-wakuwaku', kind: 'original', text: 'わくわくしている時こそ、最初の一歩を今日のうちに。', tone: ['push'], mood: [4, 5], concerns: ['any'], tags: ['small', 'fun'], emotions: ['wakuwaku', 'chousen'], keywords: ['わくわく', '始める', '一歩'], step: 'わくわくしていることの、最初の5分を今日やる。' },
  { id: 'o-yaruki-asu', kind: 'original', text: 'やる気がある日は、明日の自分のために、道をならしておこう。', tone: ['push'], mood: [4, 5], concerns: ['any', 'work'], tags: ['prepare'], emotions: ['yaruki'], keywords: ['やる気', '明日', '準備'], step: '明日やることの準備を、今日のうちに一つだけ済ませる。' },
  { id: 'o-hokori', kind: 'original', text: 'うまくいった日は、自分をちゃんと褒めよう。それも、続けるための技術だ。', tone: ['steady', 'push'], mood: [3, 5], concerns: ['self', 'any'], tags: ['self', 'learn'], emotions: ['hokori'], keywords: ['褒める', 'うまくいった', '続ける'], step: '今日うまくいったことを書いて、自分に「よくやった」と言う。' },
  { id: 'o-kansha', kind: 'original', text: '「ありがとう」を一つ伝える。言った方の心も、少し温かくなる。', tone: ['gentle', 'steady'], mood: [2, 5], concerns: ['people', 'any'], tags: ['rely'], emotions: ['kansha', 'hotto'], keywords: ['感謝', 'ありがとう', '伝える'], step: '今日お世話になった人に、一言だけ「ありがとう」を送る。' },
  { id: 'o-odayaka', kind: 'original', text: '穏やかな日は、何もしないことを楽しんでいい。', tone: ['gentle', 'steady'], mood: [3, 5], concerns: ['any', 'health'], tags: ['rest'], emotions: ['odayaka', 'nonbiri', 'mitasare'], keywords: ['穏やか', '何もしない', '休む'], step: '10分だけ、何もしない時間をつくる。' },
  { id: 'o-kibou', kind: 'original', text: '希望は、大きな計画より、明日の小さな楽しみから生まれる。', tone: ['steady'], mood: [3, 5], concerns: ['any'], tags: ['small', 'today'], emotions: ['kibou', 'hotto'], keywords: ['希望', '明日', '楽しみ'], step: '明日の小さな楽しみを、一つ予定に入れる。' },
  { id: 'o-chousen', kind: 'original', text: '挑戦は、怖さがゼロになってから始めるものじゃない。怖いまま、小さく始めるものだ。', tone: ['steady', 'push'], mood: [3, 5], concerns: ['any'], tags: ['small', 'prepare'], emotions: ['chousen', 'kinchou'], keywords: ['挑戦', '怖い', '小さく始める'], step: '挑戦したいことの「いちばん小さな版」を決めて、今週やってみる。' },
  { id: 'o-yoku-ganbatta', kind: 'original', text: 'よく頑張った日は、早く寝ることが、いちばんの仕事。', tone: ['gentle'], mood: [1, 3], concerns: ['health', 'any'], tags: ['rest'], emotions: ['tsukare'], keywords: ['疲れ', '寝る', '休む'], step: '今日はいつもより30分早く布団に入る。' },
  { id: 'o-kanashii', kind: 'original', text: '悲しい時は、悲しんでいい。無理に前を向かなくても、時間はちゃんと味方してくれる。', tone: ['gentle'], mood: [1, 3], concerns: ['any', 'self'], tags: ['self', 'rest'], emotions: ['kanashii', 'ochikomi'], keywords: ['悲しい', '涙', '時間'], step: '温かい飲み物を用意して、今日は悲しい気持ちのままでいていい。' },
  { id: 'o-muki', kind: 'original', text: '動けない日は、「横になって休む」を予定にしてしまおう。', tone: ['gentle'], mood: [1, 3], concerns: ['health', 'any'], tags: ['rest'], emotions: ['muki', 'tsukare', 'bonyari'], keywords: ['やる気が出ない', '動けない', '休む'], step: '「休む」を予定表に書いて、その時間はちゃんと休む。' },
  { id: 'o-nasakenai', kind: 'original', text: '情けないと思えるのは、理想があるから。その理想は、捨てなくていい。', tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['self'], tags: ['self'], emotions: ['nasakenai', 'jishinnai'], keywords: ['情けない', '理想', 'ダメ'], step: '自分の理想を一行で書いて、今日の自分との違いを「次の一歩」にする。' },
  { id: 'o-tebanasu', kind: 'original', text: '抱えきれない時は、一つ手放す。全部を守ろうとしなくていい。', tone: ['gentle'], mood: [1, 3], concerns: ['work', 'any'], tags: ['rely', 'rest'], emotions: ['oitsumerare', 'tsukare'], keywords: ['追い詰め', '手放す', '抱えきれない'], step: '今抱えていることから、手放す・後に回す・頼むものを一つ選ぶ。', action: 'doraku' },
  { id: 'o-awanai', kind: 'original', text: '合わない人がいるのは、自然なこと。全員とうまくやる必要はない。', tone: ['gentle', 'steady'], mood: [1, 4], concerns: ['people'], tags: ['reframe'], emotions: ['iraira', 'moyamoya'], keywords: ['合わない', '人間関係', '苦手'], step: '苦手な人とは「必要なことだけ話す」と決めて、心の距離をとる。' },
  { id: 'o-dekinai', kind: 'original', text: '「できない」と言えるのも、チームを守る力。', tone: ['steady'], mood: [2, 5], concerns: ['work'], tags: ['rely'], emotions: ['oitsumerare', 'motokashii'], keywords: ['断る', 'できない', 'チーム'], step: '抱えきれない依頼に「今は難しいです。〇日なら」と一度返してみる。' },
  { id: 'o-tanoshii-memo', kind: 'original', text: '楽しいと感じたことは、メモしておこう。それが、あなたの道楽の地図になる。', tone: ['steady', 'push'], mood: [3, 5], concerns: ['work', 'any'], tags: ['fun'], emotions: ['tanoshii', 'wakuwaku'], keywords: ['楽しい', 'メモ', '道楽'], step: '今日楽しかったことを、一行だけメモに残す。' },
  { id: 'o-okane-yoru', kind: 'original', text: 'お金の心配は、夜に考えると大きくなる。明るい時間に、数字で考えよう。', tone: ['gentle'], mood: [1, 3], concerns: ['money'], tags: ['rest', 'prepare'], emotions: ['fuan'], keywords: ['お金', '夜', '心配'], step: 'お金のことは明日の昼に考えると決めて、メモだけ残して今日は休む。' },
];

// 危機的な状況で表示する言葉（引用や励ましではなく、安全につなぐためだけの言葉）
export const SAFETY_WORD = {
  id: 'safety', kind: 'original',
  text: '話してくれて、ありがとう。今のつらさを、一人で抱えなくていい。',
  tone: ['gentle'], mood: [1, 5], concerns: ['any'], tags: ['rely'],
  step: '下の相談窓口に、電話かチャットで「つらい」とだけ伝えてみる。',
  action: 'safety',
};
