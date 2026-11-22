# あがってこいや。

やさしい言葉が響かない日の、ハードモード。気分を選ぶと、1000語以上の言葉から一つ選んで、厳しく叩きこむ。今日の「指令」つき。
「落ちません。」（https://ochimasen.h3y.jp/）とは別のプロダクト。言葉のデータとエンジンは同じものを使い、伝え方だけが逆。

- 静的サイト（HTML / CSS / ES Modules、ビルドなし）。Vercel にそのまま置ける
- 書いた内容は端末の中だけ（localStorage `agattekoiya:v1`）。外部送信なし
- 公開予定：https://agattekoiya.h3y.jp/

## 構成
- `index.html` … LP（かなりシビアモード）。`js/lp.js` でデモ
- `app.html` / `js/app.js` … アプリ本体
- `js/hard.js` … 伝え方（ハードモード）。決まりは `docs/tone.md`
- `js/engine.js` `js/rag.js` `js/data/` … 言葉選びと言葉データ（落ちません。と共通。向こうで言葉を増やしたらコピーする）
- `safety.html` … 相談窓口（ハードモードは止まる）／`privacy.html`

## 確認
```sh
npm test           # 伝え方のテスト（人格否定なし・危ない時は止まる など）
npm run test:e2e   # ブラウザでの通しテスト（スマホ幅）
npm start          # http://localhost:8080/
```
