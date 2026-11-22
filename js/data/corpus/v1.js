// 言葉データ（RAG）Version 1 — 2026-11-22
// 偉人・古典・ことわざの言葉を、カテゴリー・気持ち・キーワードつきでまとめたもの。
// 方針（docs/corpus/README.md）：
//  - v1 は「権利が切れている人物の言葉・古典・ことわざ」を中心にする。日本語はすべて落ちません。編集部の意訳。
//  - 出典を必ず書く。verification：primary（原典で確認できる）／attributed（〜と伝わる・諸説あり）／proverb（ことわざ）
//  - rights：public-domain／proverb／needs-check（現代の人物で、使い続けるか v2 で確認する）
// このファイルは生成物。追加は docs/corpus/ の手順で行う。
export const CORPUS_V1 = {
  version: '1.0.0',
  date: '2026-11-22',
  note: '偉人・古典・ことわざ（権利の切れたもの中心）',
  items: [
    {
      "id": "q-osler",
      "kind": "quote",
      "text": "今日という一日を、区切られた部屋のように生きなさい。",
      "original": "Live in day-tight compartments.",
      "author": "ウィリアム・オスラー",
      "field": "医学",
      "category": [
        "today",
        "rest"
      ],
      "source": "ウィリアム・オスラー「A Way of Life」（1913年の講演）",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "today",
        "rest"
      ],
      "emotions": [
        "fuan",
        "koukai",
        "oitsumerare"
      ],
      "keywords": [
        "今日",
        "区切る",
        "昨日",
        "明日"
      ],
      "step": "今日だけのやることを3つ書く。昨日と明日のことは書かない。"
    },
    {
      "id": "q-laozi",
      "kind": "quote",
      "text": "千里の行も足下に始まる。",
      "author": "老子",
      "field": "哲学",
      "category": [
        "step"
      ],
      "source": "老子『道徳経』第64章",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "muki",
        "motokashii"
      ],
      "keywords": [
        "一歩",
        "始める",
        "小さく"
      ],
      "step": "一番小さな一歩（30秒でできること）を一つだけやる。"
    },
    {
      "id": "q-niebuhr",
      "kind": "quote",
      "text": "変えられないものを受け入れる落ち着きを。変えられるものを変える勇気を。そして、その二つを見分ける賢さを。",
      "author": "ラインホルド・ニーバー",
      "field": "宗教",
      "category": [
        "calm"
      ],
      "source": "ラインホルド・ニーバー「平静の祈り」",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "needs-check",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "reframe",
        "rest"
      ],
      "emotions": [
        "fuan",
        "iraira",
        "oitsumerare"
      ],
      "keywords": [
        "変えられない",
        "受け入れる",
        "勇気"
      ],
      "step": "気になっていることを「変えられる／変えられない」に分けて書く。"
    },
    {
      "id": "q-seneca",
      "kind": "quote",
      "text": "私たちは現実よりも、想像の中で苦しむことの方が多い。",
      "original": "We suffer more often in imagination than in reality.",
      "author": "セネカ",
      "field": "哲学",
      "category": [
        "calm"
      ],
      "source": "セネカ『ルキリウスへの手紙』第13書簡",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        4
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "reframe",
        "rest"
      ],
      "emotions": [
        "fuan",
        "kinchou"
      ],
      "keywords": [
        "想像",
        "心配",
        "不安"
      ],
      "step": "不安を一つ書き出し、「実際に起きたこと」と「想像」に線を引いて分ける。"
    },
    {
      "id": "q-isogaba",
      "kind": "quote",
      "text": "急がば回れ。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "calm"
      ],
      "source": "ことわざ（室町時代の連歌師・宗長の歌に由来するとされる）",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        4
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small",
        "rest"
      ],
      "emotions": [
        "aseri"
      ],
      "keywords": [
        "焦り",
        "遠回り",
        "急ぐ"
      ],
      "step": "今いちばん焦っていることを、一段階だけ遠回り（確認・相談）してから進める。"
    },
    {
      "id": "q-epictetus",
      "kind": "quote",
      "text": "人を悩ませるのは、物事そのものではなく、物事についての考えである。",
      "author": "エピクテトス",
      "field": "哲学",
      "category": [
        "calm"
      ],
      "source": "エピクテトス『提要（エンキリディオン）』第5節",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any",
        "people"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "iraira",
        "moyamoya"
      ],
      "keywords": [
        "考え方",
        "捉え方",
        "悩み"
      ],
      "step": "悩みを「起きた事実」と「自分の解釈」に分けて一行ずつ書く。"
    },
    {
      "id": "q-aurelius",
      "kind": "quote",
      "text": "外のことで苦しむなら、苦しめているのはそれ自体ではなく、それへの自分の判断だ。その判断は、いつでも取り消せる。",
      "author": "マルクス・アウレリウス",
      "field": "哲学",
      "category": [
        "calm",
        "people"
      ],
      "source": "マルクス・アウレリウス『自省録』第8巻47",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any",
        "people"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "iraira",
        "ikari"
      ],
      "keywords": [
        "判断",
        "捉え方",
        "相手"
      ],
      "step": "「〜に違いない」と思っていることを一つ、「〜かもしれない」に言い換える。"
    },
    {
      "id": "q-saiou",
      "kind": "quote",
      "text": "人間万事塞翁が馬。",
      "author": "『淮南子』",
      "field": "思想",
      "category": [
        "hope"
      ],
      "source": "『淮南子』人間訓の故事に由来",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "kanashii",
        "kuyashii"
      ],
      "keywords": [
        "結果的に",
        "幸運",
        "不運"
      ],
      "step": "過去の「最悪だと思ったけど、結果的に良かったこと」を一つ思い出す。"
    },
    {
      "id": "q-rongo",
      "kind": "quote",
      "text": "過ちて改めざる、是を過ちと謂う。",
      "author": "孔子",
      "field": "哲学",
      "category": [
        "learn"
      ],
      "source": "孔子『論語』衛霊公篇",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "learn"
      ],
      "emotions": [
        "koukai",
        "kuyashii"
      ],
      "keywords": [
        "過ち",
        "改める",
        "失敗"
      ],
      "step": "最近の小さな失敗を一つ選び、「次はこうする」を一行だけ書く。"
    },
    {
      "id": "q-jacobi",
      "kind": "quote",
      "text": "逆から考えよ。常に、逆から。",
      "original": "Invert, always invert.",
      "author": "カール・ヤコビ",
      "field": "数学",
      "category": [
        "prepare"
      ],
      "source": "カール・ヤコビ（数学者）。チャーリー・マンガーが好んで引用",
      "sourceNote": "意訳",
      "verification": "attributed",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any",
        "work"
      ],
      "tags": [
        "prepare",
        "learn"
      ],
      "emotions": [
        "mayoi"
      ],
      "keywords": [
        "逆から",
        "失敗",
        "先回り"
      ],
      "step": "「どうすれば成功するか」ではなく「どうすれば確実に失敗するか」を3つ書く。"
    },
    {
      "id": "q-munger",
      "kind": "quote",
      "text": "自分がどこで死ぬかだけ知りたい。そうすれば、そこへは決して行かない。",
      "original": "All I want to know is where I'm going to die, so I'll never go there.",
      "author": "チャーリー・マンガー",
      "field": "実業",
      "category": [
        "prepare"
      ],
      "source": "チャーリー・マンガー（ある農夫の言葉として引用）",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "needs-check",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any",
        "work",
        "money"
      ],
      "tags": [
        "prepare",
        "learn"
      ],
      "emotions": [
        "chousen"
      ],
      "keywords": [
        "避ける",
        "失敗",
        "先回り"
      ],
      "step": "今週「ここに行ったら失敗する」場所（行動・状況）を一つ決めて、避ける。"
    },
    {
      "id": "q-sonshi",
      "kind": "quote",
      "text": "彼を知り己を知れば、百戦殆うからず。",
      "author": "孫子",
      "field": "兵法",
      "category": [
        "prepare"
      ],
      "source": "『孫子』謀攻篇",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any",
        "work",
        "people"
      ],
      "tags": [
        "prepare",
        "compare"
      ],
      "emotions": [
        "kinchou"
      ],
      "keywords": [
        "自分を知る",
        "準備"
      ],
      "step": "自分が失敗しやすいパターンを「失敗の図鑑」から一つ選ぶ。"
    },
    {
      "id": "q-kendan",
      "kind": "quote",
      "text": "勝ちに不思議の勝ちあり、負けに不思議の負けなし。",
      "author": "松浦静山",
      "field": "武道",
      "category": [
        "learn"
      ],
      "source": "松浦静山『剣談』（野村克也氏が広めたことで知られる）",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any",
        "work"
      ],
      "tags": [
        "learn"
      ],
      "emotions": [
        "kuyashii"
      ],
      "keywords": [
        "負け",
        "理由",
        "学ぶ"
      ],
      "step": "最近うまくいかなかったことの「理由」を一つだけ書き出す。"
    },
    {
      "id": "q-ford",
      "kind": "quote",
      "text": "失敗とは、より賢くやり直すための機会にすぎない。",
      "original": "Failure is only the opportunity more intelligently to begin again.",
      "author": "ヘンリー・フォード",
      "field": "実業",
      "category": [
        "learn"
      ],
      "source": "ヘンリー・フォード『My Life and Work』（1922年）",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any",
        "work"
      ],
      "tags": [
        "learn"
      ],
      "emotions": [
        "kuyashii",
        "koukai"
      ],
      "keywords": [
        "失敗",
        "やり直す"
      ],
      "step": "やり直したいことを一つ選び、「前回と変える点」を一つだけ決める。"
    },
    {
      "id": "q-nanakorobi",
      "kind": "quote",
      "text": "七転び八起き。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "keep"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "learn"
      ],
      "emotions": [
        "kuyashii",
        "ochikomi"
      ],
      "keywords": [
        "起き上がる",
        "続ける"
      ],
      "step": "最近「起き上がれた」経験を一つ思い出して、記録に残す。"
    },
    {
      "id": "q-edison",
      "kind": "quote",
      "text": "私は生涯で一日も働いたことがない。すべてが楽しみだった。",
      "original": "I never did a day’s work in my life. It was all fun.",
      "author": "トーマス・エジソン",
      "field": "発明",
      "category": [
        "work"
      ],
      "source": "トーマス・エジソンの言葉とされる",
      "sourceNote": "出典には諸説あり",
      "verification": "attributed",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any",
        "work"
      ],
      "tags": [
        "fun"
      ],
      "emotions": [
        "tanoshii",
        "taikutsu"
      ],
      "keywords": [
        "仕事",
        "楽しみ",
        "道楽"
      ],
      "step": "今日の仕事の中で「ちょっと楽しい」部分を一つ探して書く。"
    },
    {
      "id": "q-beckett",
      "kind": "quote",
      "text": "また挑んだ。また失敗した。構わない。もう一度挑め。もう一度失敗しろ。前より上手に失敗しろ。",
      "original": "Ever tried. Ever failed. No matter. Try again. Fail again. Fail better.",
      "author": "サミュエル・ベケット",
      "field": "文学",
      "category": [
        "learn",
        "step"
      ],
      "source": "サミュエル・ベケット『いざ最悪の方へ（Worstward Ho）』（1983年）",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "needs-check",
      "tone": [
        "push"
      ],
      "mood": [
        4,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "learn"
      ],
      "emotions": [
        "kuyashii",
        "chousen"
      ],
      "keywords": [
        "失敗",
        "もう一度",
        "挑む"
      ],
      "step": "前回の失敗から「一つだけ」改善して、もう一度試す。"
    },
    {
      "id": "q-rongo-tanoshimu",
      "kind": "quote",
      "text": "これを知る者は、これを好む者に如かず。これを好む者は、これを楽しむ者に如かず。",
      "author": "孔子",
      "field": "哲学",
      "category": [
        "work"
      ],
      "source": "『論語』雍也篇",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "work",
        "any"
      ],
      "tags": [
        "fun"
      ],
      "emotions": [
        "taikutsu",
        "tanoshii",
        "wakuwaku"
      ],
      "keywords": [
        "楽しむ",
        "好き",
        "仕事",
        "道楽"
      ],
      "step": "今日の仕事に「楽しめる工夫」を一つだけ足す。"
    },
    {
      "id": "q-rongo-sugitaru",
      "kind": "quote",
      "text": "過ぎたるは猶及ばざるがごとし。",
      "author": "孔子",
      "field": "哲学",
      "category": [
        "rest",
        "self"
      ],
      "source": "『論語』先進篇",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small",
        "self"
      ],
      "emotions": [
        "oitsumerare"
      ],
      "keywords": [
        "やりすぎ",
        "完璧",
        "頑張りすぎ"
      ],
      "step": "今日「やりすぎている」ことを一つ選んで、少し減らす。"
    },
    {
      "id": "q-rongo-hayaku",
      "kind": "quote",
      "text": "速やかならんと欲すれば、則ち達せず。",
      "author": "孔子",
      "field": "哲学",
      "category": [
        "calm"
      ],
      "source": "『論語』子路篇",
      "sourceNote": "急ぐと、かえって目的に届かない",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "aseri",
        "motokashii"
      ],
      "keywords": [
        "焦り",
        "急ぐ",
        "早く",
        "結果"
      ],
      "step": "結果を急いでいることを一つ選び、今日やる分だけに区切る。"
    },
    {
      "id": "q-rongo-sansei",
      "kind": "quote",
      "text": "吾、日に吾が身を三省す。",
      "author": "曾子（孔子の弟子）",
      "field": "哲学",
      "category": [
        "learn"
      ],
      "source": "『論語』学而篇",
      "sourceNote": "一日に何度も自分をふり返る",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "learn"
      ],
      "emotions": [
        "hokori",
        "koukai"
      ],
      "keywords": [
        "反省",
        "ふり返り",
        "学ぶ"
      ],
      "step": "寝る前に「今日の小さな反省」と「今日の良かったこと」を一つずつ書く。"
    },
    {
      "id": "q-rongo-wa",
      "kind": "quote",
      "text": "君子は和して同ぜず。",
      "author": "孔子",
      "field": "哲学",
      "category": [
        "people"
      ],
      "source": "『論語』子路篇",
      "sourceNote": "仲良くしても、なんでも合わせるわけではない",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "people",
        "work"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "iraira",
        "moyamoya"
      ],
      "keywords": [
        "人間関係",
        "合わせる",
        "意見",
        "同調"
      ],
      "step": "合わせすぎている場面で、自分の考えを一言だけ添えてみる。"
    },
    {
      "id": "q-laozi-taru",
      "kind": "quote",
      "text": "足るを知る者は富む。",
      "author": "老子",
      "field": "哲学",
      "category": [
        "self"
      ],
      "source": "『老子（道徳経）』第33章",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "money",
        "self",
        "any"
      ],
      "tags": [
        "self",
        "reframe"
      ],
      "emotions": [
        "mitasare",
        "shitto"
      ],
      "keywords": [
        "お金",
        "足りない",
        "満足",
        "比べる"
      ],
      "step": "今あるもので「足りているもの」を3つ書く。"
    },
    {
      "id": "q-laozi-bansei",
      "kind": "quote",
      "text": "大器晩成。",
      "author": "老子",
      "field": "哲学",
      "category": [
        "hope",
        "self"
      ],
      "source": "『老子（道徳経）』第41章",
      "sourceNote": "大きな器は、できあがるのに時間がかかる",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "self",
        "any"
      ],
      "tags": [
        "compare",
        "self"
      ],
      "emotions": [
        "okiteikareta",
        "jishinnai",
        "aseri"
      ],
      "keywords": [
        "遅れ",
        "比べる",
        "時間がかかる",
        "晩成"
      ],
      "step": "1年前の自分と比べて、できるようになったことを一つ書く。"
    },
    {
      "id": "q-laozi-mizu",
      "kind": "quote",
      "text": "最も良い生き方は、水のようだ。争わず、低いところへ流れ、形を変えながら進んでいく。",
      "author": "老子",
      "field": "哲学",
      "category": [
        "calm",
        "people"
      ],
      "source": "『老子（道徳経）』第8章「上善は水の如し」",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "people",
        "any"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "iraira",
        "ikari",
        "odayaka"
      ],
      "keywords": [
        "争い",
        "水",
        "柔らかい",
        "相手"
      ],
      "step": "張り合っている相手に、今日だけは一歩ゆずってみる。"
    },
    {
      "id": "q-zhuangzi-muyou",
      "kind": "quote",
      "text": "役に立つことばかりが価値ではない。役に立たないと思えるものにも、大切な役目がある。",
      "author": "荘子",
      "field": "哲学",
      "category": [
        "self"
      ],
      "source": "『荘子』人間世篇「無用の用」",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        4
      ],
      "concerns": [
        "self",
        "any"
      ],
      "tags": [
        "self"
      ],
      "emotions": [
        "munashii",
        "nasakenai",
        "jishinnai"
      ],
      "keywords": [
        "役に立たない",
        "意味",
        "価値"
      ],
      "step": "「役に立たない」と思っている自分の時間を、一つだけ肯定してみる。"
    },
    {
      "id": "q-mencius-wa",
      "kind": "quote",
      "text": "天の時は地の利に如かず、地の利は人の和に如かず。",
      "author": "孟子",
      "field": "哲学",
      "category": [
        "people",
        "work"
      ],
      "source": "『孟子』公孫丑下",
      "sourceNote": "タイミングや場所より、人の和が大事",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "work",
        "people"
      ],
      "tags": [
        "rely"
      ],
      "emotions": [
        "kansha"
      ],
      "keywords": [
        "チーム",
        "仲間",
        "協力",
        "感謝"
      ],
      "step": "チームの誰かに、今日一つ「ありがとう」を伝える。"
    },
    {
      "id": "q-saikontan-yuzuru",
      "kind": "quote",
      "text": "人と生きる時は、一歩ゆずる方が、結局はうまくいく。",
      "author": "洪自誠",
      "field": "哲学",
      "category": [
        "people"
      ],
      "source": "『菜根譚』「世に処するには一歩を譲るを高しと為す」",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "people"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "iraira",
        "ikari"
      ],
      "keywords": [
        "ゆずる",
        "言い返す",
        "相手",
        "争い"
      ],
      "step": "言い返したくなったら、一度だけ「なるほど」と受けてみる。"
    },
    {
      "id": "q-tsurezure-150",
      "kind": "quote",
      "text": "上手になってから人前に出よう、と言う人は、なかなか上達しない。下手なうちから上手な人に交じって続ける人が、やがて上手になる。",
      "author": "吉田兼好",
      "field": "文学",
      "category": [
        "step",
        "learn"
      ],
      "source": "『徒然草』第150段",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "work",
        "self",
        "any"
      ],
      "tags": [
        "small",
        "learn"
      ],
      "emotions": [
        "jishinnai",
        "kinchou"
      ],
      "keywords": [
        "完璧",
        "下手",
        "恥ずかしい",
        "自信",
        "上達"
      ],
      "step": "60点のままで、誰かに一度見せてみる。"
    },
    {
      "id": "q-tsurezure-92",
      "kind": "quote",
      "text": "初心者は、矢を二本持ってはいけない。二本目があると思うと、一本目がおろそかになる。",
      "author": "吉田兼好",
      "field": "文学",
      "category": [
        "prepare",
        "work"
      ],
      "source": "『徒然草』第92段",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "work",
        "any"
      ],
      "tags": [
        "prepare",
        "small"
      ],
      "emotions": [
        "yaruki",
        "mayoi"
      ],
      "keywords": [
        "集中",
        "先延ばし",
        "あとで",
        "一回"
      ],
      "step": "「あとでやり直せばいい」と思っている仕事を、今の一回で丁寧に仕上げる。"
    },
    {
      "id": "q-houjouki",
      "kind": "quote",
      "text": "ゆく河の流れは絶えずして、しかも、もとの水にあらず。",
      "author": "鴨長明",
      "field": "文学",
      "category": [
        "today",
        "calm"
      ],
      "source": "『方丈記』冒頭",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        4
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "today",
        "reframe"
      ],
      "emotions": [
        "kanashii",
        "koukai",
        "odayaka"
      ],
      "keywords": [
        "変わる",
        "過去",
        "流れ",
        "今日"
      ],
      "step": "「今日は、もう昨日とは違う日」と一行書く。"
    },
    {
      "id": "q-zeami",
      "kind": "quote",
      "text": "初心忘るべからず。",
      "author": "世阿弥",
      "field": "芸能",
      "category": [
        "learn",
        "keep"
      ],
      "source": "『花鏡』",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "learn"
      ],
      "emotions": [
        "hokori",
        "taikutsu"
      ],
      "keywords": [
        "初心",
        "始めた頃",
        "続ける"
      ],
      "step": "始めた頃の気持ちを、一行だけ思い出して書く。"
    },
    {
      "id": "q-musashi",
      "kind": "quote",
      "text": "千日の稽古を鍛とし、万日の稽古を錬とす。",
      "author": "宮本武蔵",
      "field": "武道",
      "category": [
        "keep"
      ],
      "source": "『五輪書』水の巻",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small",
        "learn"
      ],
      "emotions": [
        "yaruki",
        "chousen"
      ],
      "keywords": [
        "続ける",
        "練習",
        "継続",
        "稽古"
      ],
      "step": "毎日続けたいことを一つ決め、今日は5分だけやる。"
    },
    {
      "id": "q-ninomiya",
      "kind": "quote",
      "text": "小さなことを積み重ねて、大きなことを成す。",
      "author": "二宮尊徳",
      "field": "思想・実業",
      "category": [
        "keep",
        "step"
      ],
      "source": "『二宮翁夜話』「積小為大」",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "muki",
        "motokashii",
        "aseri"
      ],
      "keywords": [
        "小さなこと",
        "積み重ね",
        "続ける"
      ],
      "step": "今日できる「いちばん小さなこと」を一つやる。"
    },
    {
      "id": "q-yozan",
      "kind": "quote",
      "text": "為せば成る、為さねば成らぬ何事も、成らぬは人の為さぬなりけり。",
      "author": "上杉鷹山",
      "field": "政治",
      "category": [
        "step"
      ],
      "source": "上杉鷹山が家臣に示したと伝わる歌",
      "verification": "attributed",
      "rights": "public-domain",
      "tone": [
        "push"
      ],
      "mood": [
        4,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "yaruki",
        "chousen"
      ],
      "keywords": [
        "やる",
        "挑戦",
        "できる"
      ],
      "step": "「できない」と思っていたことを、5分だけやってみる。"
    },
    {
      "id": "q-ryoma",
      "kind": "quote",
      "text": "世の人は我を何とも言わば言え、我が成す事は我のみぞ知る。",
      "author": "坂本龍馬",
      "field": "政治",
      "category": [
        "self"
      ],
      "source": "坂本龍馬の作と伝わる歌",
      "verification": "attributed",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "self",
        "people"
      ],
      "tags": [
        "compare",
        "self"
      ],
      "emotions": [
        "shitto",
        "chousen"
      ],
      "keywords": [
        "人の目",
        "評価",
        "批判",
        "比べる"
      ],
      "step": "人の評価が気になることを一つ、「自分は何のためにやるか」に書き換える。"
    },
    {
      "id": "q-kaibara",
      "kind": "quote",
      "text": "心は楽しむべし、苦しむべからず。身は労すべし、休め過すべからず。",
      "author": "貝原益軒",
      "field": "医学・思想",
      "category": [
        "rest",
        "work"
      ],
      "source": "『養生訓』巻第一",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "health",
        "any"
      ],
      "tags": [
        "fun",
        "rest"
      ],
      "emotions": [
        "bonyari",
        "nonbiri",
        "taikutsu"
      ],
      "keywords": [
        "体",
        "心",
        "楽しむ",
        "散歩"
      ],
      "step": "体を少し動かし、心は少し楽しませる。10分だけ散歩する。"
    },
    {
      "id": "q-issai",
      "kind": "quote",
      "text": "一燈を提げて暗夜を行く。暗夜を憂うること勿れ。只だ一燈を頼め。",
      "author": "佐藤一斎",
      "field": "思想",
      "category": [
        "calm",
        "hope"
      ],
      "source": "『言志晩録』",
      "sourceNote": "暗い夜道を嘆くより、手元の灯りを頼りに進め",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "today",
        "small"
      ],
      "emotions": [
        "fuan",
        "kinchou",
        "ochikomi"
      ],
      "keywords": [
        "不安",
        "先が見えない",
        "暗い",
        "灯り"
      ],
      "step": "先が見えない中で、「今、手元にある灯り（できること）」を一つ書く。"
    },
    {
      "id": "q-ryokan",
      "kind": "quote",
      "text": "災難に逢う時節には、災難に逢うがよく候。",
      "author": "良寛",
      "field": "宗教・文学",
      "category": [
        "calm"
      ],
      "source": "良寛の書簡（1828年、三条地震の見舞い）",
      "sourceNote": "起きてしまったことには、逆らわずに向き合う",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        2,
        4
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "reframe",
        "rest"
      ],
      "emotions": [
        "fuan",
        "moyamoya"
      ],
      "keywords": [
        "受け入れる",
        "変えられない",
        "逆らわない"
      ],
      "step": "変えられないことを一つ、今日はそのまま受け入れてみる。"
    },
    {
      "id": "q-soseki-aseri",
      "kind": "quote",
      "text": "あせってはいけません。頭を悪くしてはいけません。根気づくでおいでなさい。",
      "original": "あせつては不可せん。頭を悪くしては不可せん。根気づくでお出でなさい。",
      "author": "夏目漱石",
      "field": "文学",
      "category": [
        "calm",
        "keep"
      ],
      "source": "芥川龍之介・久米正雄あての手紙（1916年）",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small",
        "rest"
      ],
      "emotions": [
        "aseri",
        "okiteikareta",
        "motokashii"
      ],
      "keywords": [
        "焦り",
        "根気",
        "続ける",
        "ゆっくり"
      ],
      "step": "今日の目標を半分にして、根気よく続ける。"
    },
    {
      "id": "q-soseki-ushi",
      "kind": "quote",
      "text": "牛になる事はどうしても必要です。吾々はとかく馬になりたがるが、牛には中々なり切れないです。",
      "author": "夏目漱石",
      "field": "文学",
      "category": [
        "keep"
      ],
      "source": "芥川龍之介・久米正雄あての手紙（1916年）",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "aseri",
        "shitto"
      ],
      "keywords": [
        "ゆっくり",
        "着実",
        "牛",
        "焦り"
      ],
      "step": "速さではなく「止まらないこと」を、今日の目標にする。"
    },
    {
      "id": "q-soseki-kusamakura",
      "kind": "quote",
      "text": "智に働けば角が立つ。情に棹させば流される。意地を通せば窮屈だ。とかくに人の世は住みにくい。",
      "author": "夏目漱石",
      "field": "文学",
      "category": [
        "people"
      ],
      "source": "『草枕』冒頭",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        4
      ],
      "concerns": [
        "people",
        "any"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "moyamoya",
        "iraira"
      ],
      "keywords": [
        "人間関係",
        "住みにくい",
        "意地"
      ],
      "step": "「人の世は住みにくい」と一度笑ってから、今日の困りごとを一つだけ片づける。"
    },
    {
      "id": "q-kenji",
      "kind": "quote",
      "text": "雨ニモマケズ　風ニモマケズ",
      "author": "宮沢賢治",
      "field": "文学",
      "category": [
        "keep"
      ],
      "source": "「雨ニモマケズ」（手帳に書かれた詩）",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "self"
      ],
      "emotions": [
        "yaruki",
        "hokori"
      ],
      "keywords": [
        "負けない",
        "続ける",
        "支え"
      ],
      "step": "今日の自分を支えてくれた、小さな習慣を一つ書く。"
    },
    {
      "id": "q-akutagawa",
      "kind": "quote",
      "text": "人生は一箱のマッチに似ている。重大に扱うのは莫迦莫迦しい。重大に扱わなければ危険である。",
      "author": "芥川龍之介",
      "field": "文学",
      "category": [
        "calm"
      ],
      "source": "『侏儒の言葉』",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "moyamoya",
        "kinchou"
      ],
      "keywords": [
        "重く考えすぎ",
        "軽く",
        "人生"
      ],
      "step": "重く考えすぎていることを一つ、少し軽い言葉に言い換える。"
    },
    {
      "id": "q-epictetus-1",
      "kind": "quote",
      "text": "物事には、私たち次第のものと、そうでないものがある。",
      "author": "エピクテトス",
      "field": "哲学",
      "category": [
        "calm"
      ],
      "source": "『提要（エンキリディオン）』第1節",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "fuan",
        "iraira",
        "aseri",
        "oitsumerare"
      ],
      "keywords": [
        "変えられない",
        "自分次第",
        "不安"
      ],
      "step": "気になっていることを「自分次第／そうでない」に分けて書く。"
    },
    {
      "id": "q-aurelius-asa",
      "kind": "quote",
      "text": "朝、起きるのがつらい時は、こう思えばいい。人として働くために起きるのだ、と。",
      "author": "マルクス・アウレリウス",
      "field": "哲学",
      "category": [
        "step"
      ],
      "source": "『自省録』第5巻1",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        4
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "tsukare",
        "muki"
      ],
      "keywords": [
        "朝",
        "起きる",
        "つらい",
        "働く"
      ],
      "step": "起きたら最初に、体を伸ばすことだけをやる。"
    },
    {
      "id": "q-seneca-104",
      "kind": "quote",
      "text": "困難だから挑まないのではない。挑まないから困難なのだ。",
      "author": "セネカ",
      "field": "哲学",
      "category": [
        "step"
      ],
      "source": "『ルキリウスへの手紙』第104書簡",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small",
        "prepare"
      ],
      "emotions": [
        "chousen",
        "kinchou"
      ],
      "keywords": [
        "挑戦",
        "こわい",
        "困難",
        "挑む"
      ],
      "step": "怖くて避けていることに、最初の5分だけ手をつける。"
    },
    {
      "id": "q-seneca-71",
      "kind": "quote",
      "text": "どの港を目指すか知らない者には、どんな風も順風ではない。",
      "author": "セネカ",
      "field": "哲学",
      "category": [
        "prepare"
      ],
      "source": "『ルキリウスへの手紙』第71書簡",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "prepare"
      ],
      "emotions": [
        "mayoi",
        "kibou"
      ],
      "keywords": [
        "目的",
        "目標",
        "迷い",
        "決める"
      ],
      "step": "今月いちばん大事な「目的地」を一行で書く。"
    },
    {
      "id": "q-aristotle",
      "kind": "quote",
      "text": "人は、正しい行いをすることで正しい人になり、勇気ある行いをすることで勇気ある人になる。",
      "author": "アリストテレス",
      "field": "哲学",
      "category": [
        "step",
        "self"
      ],
      "source": "『ニコマコス倫理学』第2巻第1章",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "jishinnai",
        "chousen"
      ],
      "keywords": [
        "勇気",
        "行い",
        "自信",
        "なりたい自分"
      ],
      "step": "「なりたい自分」がしそうな小さな行動を、一つやってみる。"
    },
    {
      "id": "q-franklin",
      "kind": "quote",
      "text": "よく言うより、よく行う方がいい。",
      "original": "Well done is better than well said.",
      "author": "ベンジャミン・フランクリン",
      "field": "政治・実業",
      "category": [
        "step"
      ],
      "source": "『貧しいリチャードの暦』（1737年）",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "yaruki",
        "motokashii"
      ],
      "keywords": [
        "行う",
        "行動",
        "口より手"
      ],
      "step": "話すより先に、一つだけ手を動かす。"
    },
    {
      "id": "q-emerson-finish",
      "kind": "quote",
      "text": "一日を終えたら、それで終わりにしなさい。できることはやった。失敗や愚かなことがあったなら、できるだけ早く忘れなさい。明日は新しい日だ。",
      "author": "ラルフ・ワルド・エマソン",
      "field": "思想・文学",
      "category": [
        "today",
        "rest"
      ],
      "source": "娘にあてた手紙として伝わる言葉",
      "sourceNote": "意訳",
      "verification": "attributed",
      "rights": "public-domain",
      "tone": [
        "gentle"
      ],
      "mood": [
        1,
        4
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "today",
        "rest",
        "self"
      ],
      "emotions": [
        "koukai",
        "zaiakukan",
        "tsukare",
        "nasakenai"
      ],
      "keywords": [
        "後悔",
        "忘れる",
        "明日",
        "終わり"
      ],
      "step": "今日を「おしまい」と声に出して、早めに休む。"
    },
    {
      "id": "q-emerson-best",
      "kind": "quote",
      "text": "毎日が、一年でいちばん良い日だと、心に書きつけよ。",
      "author": "ラルフ・ワルド・エマソン",
      "field": "思想・文学",
      "category": [
        "today",
        "hope"
      ],
      "source": "『社会と孤独』所収「仕事と日々」（1870年）",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "today"
      ],
      "emotions": [
        "hotto",
        "kibou",
        "wakuwaku"
      ],
      "keywords": [
        "今日",
        "良い日",
        "感謝"
      ],
      "step": "今日の「良かったこと」を一つ書く。"
    },
    {
      "id": "q-thoreau",
      "kind": "quote",
      "text": "物事は変わらない。変わるのは私たちだ。",
      "author": "ヘンリー・デイヴィッド・ソロー",
      "field": "思想・文学",
      "category": [
        "calm",
        "self"
      ],
      "source": "『ウォールデン 森の生活』結び",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "moyamoya",
        "taikutsu"
      ],
      "keywords": [
        "見方",
        "変わる",
        "捉え直す"
      ],
      "step": "同じ景色を、今日は少し違う見方で見てみる。"
    },
    {
      "id": "q-roosevelt-do",
      "kind": "quote",
      "text": "今いる場所で、今あるもので、できることをやれ。",
      "original": "Do what you can, with what you have, where you are.",
      "author": "セオドア・ルーズベルト",
      "field": "政治",
      "category": [
        "step"
      ],
      "source": "『セオドア・ルーズベルト自伝』（1913年。ある人の言葉として紹介）",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "motokashii",
        "mayoi",
        "yaruki"
      ],
      "keywords": [
        "できること",
        "今あるもの",
        "始める"
      ],
      "step": "「今あるもの」だけでできることを一つ書いて、やってみる。"
    },
    {
      "id": "q-roosevelt-arena",
      "kind": "quote",
      "text": "称賛に値するのは、批評する人ではない。実際に闘技場に立ち、顔を汗と土にまみれさせて挑む人だ。",
      "author": "セオドア・ルーズベルト",
      "field": "政治",
      "category": [
        "step",
        "learn"
      ],
      "source": "1910年パリでの演説「共和国の市民」",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "push"
      ],
      "mood": [
        4,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "learn"
      ],
      "emotions": [
        "kuyashii",
        "chousen"
      ],
      "keywords": [
        "挑戦",
        "批判",
        "闘技場",
        "悔しい"
      ],
      "step": "批判が気になっていた挑戦を、もう一度だけやってみる。"
    },
    {
      "id": "q-einstein",
      "kind": "quote",
      "text": "人生は自転車に乗るようなもの。バランスを保つには、走り続けなければならない。",
      "author": "アルベルト・アインシュタイン",
      "field": "科学",
      "category": [
        "keep"
      ],
      "source": "息子エドゥアルトへの手紙（1930年）",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady",
        "push"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "yaruki",
        "motokashii"
      ],
      "keywords": [
        "続ける",
        "止まらない",
        "前に進む"
      ],
      "step": "止まっていることを一つ、ほんの少しだけ前に進める。"
    },
    {
      "id": "q-pasteur",
      "kind": "quote",
      "text": "観察の場では、チャンスは準備のできた心にだけ訪れる。",
      "author": "ルイ・パスツール",
      "field": "科学",
      "category": [
        "prepare"
      ],
      "source": "リール大学での講演（1854年）",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "prepare"
      ],
      "emotions": [
        "kibou",
        "wakuwaku"
      ],
      "keywords": [
        "チャンス",
        "準備",
        "機会"
      ],
      "step": "次のチャンスのために、今日15分だけ準備をする。"
    },
    {
      "id": "q-fuller",
      "kind": "quote",
      "text": "夜明け前が、いちばん暗い。",
      "original": "It is always darkest just before the day dawneth.",
      "author": "トマス・フラー",
      "field": "宗教・文学",
      "category": [
        "hope"
      ],
      "source": "『パレスチナの展望』（1650年）",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        4
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "ochikomi",
        "kanashii",
        "fuan"
      ],
      "keywords": [
        "夜明け",
        "暗い",
        "希望",
        "乗り切る"
      ],
      "step": "今日を乗り切ったら、明日の朝の楽しみを一つ用意しておく。"
    },
    {
      "id": "q-churchill",
      "kind": "quote",
      "text": "決して屈するな。決して、決して、決して。",
      "original": "Never give in, never give in, never, never, never.",
      "author": "ウィンストン・チャーチル",
      "field": "政治",
      "category": [
        "keep"
      ],
      "source": "ハロー校での演説（1941年）",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "push"
      ],
      "mood": [
        4,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "learn"
      ],
      "emotions": [
        "kuyashii",
        "chousen"
      ],
      "keywords": [
        "あきらめない",
        "続ける",
        "もう一回"
      ],
      "step": "あきらめかけていることを、もう一回だけ試す。"
    },
    {
      "id": "q-matthew",
      "kind": "quote",
      "text": "明日のことを思い悩むな。明日のことは明日が思い悩む。その日の苦労は、その日だけで十分だ。",
      "author": "新約聖書",
      "field": "宗教",
      "category": [
        "today",
        "rest"
      ],
      "source": "「マタイによる福音書」6章34節",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        4
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "today",
        "rest"
      ],
      "emotions": [
        "fuan",
        "oitsumerare"
      ],
      "keywords": [
        "明日",
        "心配",
        "不安",
        "今日"
      ],
      "step": "明日の心配を紙に書いて、明日の朝まで閉じておく。"
    },
    {
      "id": "q-dhammapada",
      "kind": "quote",
      "text": "怨みは、怨みによって止むことはない。怨みを捨ててこそ止む。",
      "author": "仏典",
      "field": "宗教",
      "category": [
        "people",
        "calm"
      ],
      "source": "『ダンマパダ（法句経）』第5偈",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "people",
        "any"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "ikari",
        "iraira"
      ],
      "keywords": [
        "怒り",
        "怨み",
        "許す",
        "相手"
      ],
      "step": "腹が立った相手のことを考える時間を、今日は10分だけにする。"
    },
    {
      "id": "q-bhaddekaratta",
      "kind": "quote",
      "text": "過去を追うな。未来を願うな。過去はすでに過ぎ去り、未来はまだ来ていない。今このときを、よく見つめよ。",
      "author": "仏典",
      "field": "宗教",
      "category": [
        "today"
      ],
      "source": "『一夜賢者経』（中部経典131）",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "today"
      ],
      "emotions": [
        "koukai",
        "fuan",
        "odayaka"
      ],
      "keywords": [
        "過去",
        "未来",
        "今",
        "後悔"
      ],
      "step": "今、目の前にあることを一つだけ、丁寧にやる。"
    },
    {
      "id": "q-carnegie-lemon",
      "kind": "quote",
      "text": "レモンを手にしたら、レモネードを作れ。",
      "author": "デール・カーネギー",
      "field": "実業・著述",
      "category": [
        "calm",
        "learn"
      ],
      "source": "『道は開ける』（実業家ジュリアス・ローゼンワルドの言葉として紹介）",
      "sourceNote": "酸っぱいものも、工夫しだいで役に立つ",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "kuyashii",
        "moyamoya"
      ],
      "keywords": [
        "失敗",
        "工夫",
        "捉え直す",
        "役に立つ"
      ],
      "step": "うまくいかなかったことから「使えるもの」を一つ見つける。"
    },
    {
      "id": "q-saint-ex",
      "kind": "quote",
      "text": "本当に大切なものは、目には見えない。",
      "author": "サン＝テグジュペリ",
      "field": "文学",
      "category": [
        "self"
      ],
      "source": "『星の王子さま』",
      "sourceNote": "意訳",
      "verification": "primary",
      "rights": "public-domain",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "self"
      ],
      "emotions": [
        "munashii",
        "nasakenai",
        "kansha"
      ],
      "keywords": [
        "大切",
        "目に見えない",
        "自分の良さ"
      ],
      "step": "目に見えない「自分の良さ」を一つ書く。"
    },
    {
      "id": "p-ishi",
      "kind": "quote",
      "text": "石の上にも三年。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "keep"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "motokashii",
        "aseri"
      ],
      "keywords": [
        "続ける",
        "がまん",
        "時間がかかる"
      ],
      "step": "続けていることを一つ選び、「何日続いたか」を数えてみる。"
    },
    {
      "id": "p-seitewa",
      "kind": "quote",
      "text": "急いては事を仕損じる。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "calm"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small",
        "rest"
      ],
      "emotions": [
        "aseri"
      ],
      "keywords": [
        "焦り",
        "急ぐ",
        "ミス"
      ],
      "step": "急いでいる作業を一つ、手を止めて見直してから進める。"
    },
    {
      "id": "p-warau",
      "kind": "quote",
      "text": "笑う門には福来る。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "work",
        "hope"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "fun"
      ],
      "emotions": [
        "tanoshii",
        "hotto"
      ],
      "keywords": [
        "笑う",
        "楽しい",
        "明るい"
      ],
      "step": "今日、ちょっと笑えたことを一つ思い出す。"
    },
    {
      "id": "p-ashita",
      "kind": "quote",
      "text": "明日は明日の風が吹く。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "rest",
        "today"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "gentle"
      ],
      "mood": [
        1,
        4
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "rest",
        "today"
      ],
      "emotions": [
        "fuan",
        "tsukare",
        "oitsumerare"
      ],
      "keywords": [
        "明日",
        "心配",
        "休む"
      ],
      "step": "明日のことは明日にまかせて、今日は早めに休む。"
    },
    {
      "id": "p-anzuru",
      "kind": "quote",
      "text": "案ずるより産むが易し。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "calm",
        "step"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small",
        "reframe"
      ],
      "emotions": [
        "fuan",
        "kinchou"
      ],
      "keywords": [
        "心配",
        "不安",
        "やってみる"
      ],
      "step": "心配していることを、まず5分だけやってみる。"
    },
    {
      "id": "p-ame",
      "kind": "quote",
      "text": "雨降って地固まる。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "people",
        "hope"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "people",
        "any"
      ],
      "tags": [
        "reframe"
      ],
      "emotions": [
        "iraira",
        "moyamoya"
      ],
      "keywords": [
        "けんか",
        "関係",
        "雨"
      ],
      "step": "ぶつかった相手と、今日一言だけ言葉を交わす。"
    },
    {
      "id": "p-shippai",
      "kind": "quote",
      "text": "失敗は成功のもと。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "learn"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "learn"
      ],
      "emotions": [
        "kuyashii",
        "nasakenai"
      ],
      "keywords": [
        "失敗",
        "学ぶ",
        "次"
      ],
      "step": "最近の失敗から「次はこうする」を一行だけ書く。"
    },
    {
      "id": "p-chiri",
      "kind": "quote",
      "text": "塵も積もれば山となる。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "keep"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "muki",
        "motokashii"
      ],
      "keywords": [
        "小さなこと",
        "積み重ね"
      ],
      "step": "1分でできることを、今日一つだけやる。"
    },
    {
      "id": "p-sannin",
      "kind": "quote",
      "text": "三人寄れば文殊の知恵。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "people",
        "work"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "work",
        "people",
        "any"
      ],
      "tags": [
        "rely"
      ],
      "emotions": [
        "mayoi",
        "oitsumerare"
      ],
      "keywords": [
        "相談",
        "頼る",
        "チーム",
        "知恵"
      ],
      "step": "一人で悩んでいることを、誰か二人に聞いてみる。"
    },
    {
      "id": "p-hitonofuri",
      "kind": "quote",
      "text": "人の振り見て我が振り直せ。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "learn"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "learn",
        "compare"
      ],
      "emotions": [
        "shitto",
        "moyamoya"
      ],
      "keywords": [
        "人の失敗",
        "学ぶ",
        "当てはまる"
      ],
      "step": "誰かの失敗から、自分に当てはまる所を一つだけ持ち帰る。"
    },
    {
      "id": "p-korobanu",
      "kind": "quote",
      "text": "転ばぬ先の杖。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "prepare"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "prepare"
      ],
      "emotions": [
        "fuan",
        "kibou"
      ],
      "keywords": [
        "準備",
        "先回り",
        "失敗しない"
      ],
      "step": "失敗回避ノートで、今週の落とし穴を一つ先に塞ぐ。",
      "action": "premortem"
    },
    {
      "id": "p-sonae",
      "kind": "quote",
      "text": "備えあれば憂いなし。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "prepare",
        "calm"
      ],
      "source": "ことわざ（『書経』に由来）",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "prepare"
      ],
      "emotions": [
        "fuan",
        "kinchou"
      ],
      "keywords": [
        "準備",
        "不安",
        "備える"
      ],
      "step": "気になっていることに、一つだけ「もしもの備え」をしておく。"
    },
    {
      "id": "p-suki",
      "kind": "quote",
      "text": "好きこそ物の上手なれ。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "work"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady"
      ],
      "mood": [
        3,
        5
      ],
      "concerns": [
        "work",
        "any"
      ],
      "tags": [
        "fun"
      ],
      "emotions": [
        "tanoshii",
        "wakuwaku"
      ],
      "keywords": [
        "好き",
        "楽しい",
        "上達",
        "道楽"
      ],
      "step": "好きなことに使う時間を、今日10分だけ確保する。"
    },
    {
      "id": "p-mochi",
      "kind": "quote",
      "text": "餅は餅屋。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "work",
        "people"
      ],
      "source": "ことわざ",
      "sourceNote": "何事も、その道の専門家に任せるのがいちばん",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "work"
      ],
      "tags": [
        "rely"
      ],
      "emotions": [
        "oitsumerare",
        "motokashii"
      ],
      "keywords": [
        "任せる",
        "頼る",
        "得意な人",
        "専門"
      ],
      "step": "苦手な仕事を一つ、それが得意な人に相談してみる。",
      "action": "doraku"
    },
    {
      "id": "p-kahou",
      "kind": "quote",
      "text": "果報は寝て待て。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "rest"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "gentle"
      ],
      "mood": [
        1,
        4
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "rest"
      ],
      "emotions": [
        "aseri",
        "tsukare",
        "nonbiri"
      ],
      "keywords": [
        "待つ",
        "休む",
        "焦り"
      ],
      "step": "やれることはやった。今日はもう、結果を待つ時間にする。"
    },
    {
      "id": "p-suteru",
      "kind": "quote",
      "text": "捨てる神あれば拾う神あり。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "people",
        "hope"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        4
      ],
      "concerns": [
        "people",
        "any"
      ],
      "tags": [
        "rely",
        "reframe"
      ],
      "emotions": [
        "sabishii",
        "ochikomi"
      ],
      "keywords": [
        "見捨てられ",
        "つながり",
        "出会い"
      ],
      "step": "わかってくれそうな人の顔を、一人だけ思い浮かべる。"
    },
    {
      "id": "p-saru",
      "kind": "quote",
      "text": "猿も木から落ちる。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "self",
        "learn"
      ],
      "source": "ことわざ",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "gentle",
        "steady"
      ],
      "mood": [
        1,
        4
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "self"
      ],
      "emotions": [
        "nasakenai",
        "zaiakukan"
      ],
      "keywords": [
        "ミス",
        "失敗",
        "誰でも"
      ],
      "step": "今日のミスを「誰にでもあること」と一行書いて、終わりにする。"
    },
    {
      "id": "p-rome",
      "kind": "quote",
      "text": "ローマは一日にして成らず。",
      "author": "ことわざ",
      "field": "ことわざ",
      "category": [
        "keep"
      ],
      "source": "ことわざ（西洋）",
      "verification": "proverb",
      "rights": "proverb",
      "tone": [
        "steady"
      ],
      "mood": [
        2,
        5
      ],
      "concerns": [
        "any"
      ],
      "tags": [
        "small"
      ],
      "emotions": [
        "aseri",
        "okiteikareta"
      ],
      "keywords": [
        "続ける",
        "時間がかかる",
        "焦り"
      ],
      "step": "大きな目標を、今日の一歩サイズに切り分ける。"
    }
  ],
};
