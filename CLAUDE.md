# あがってこいや。（agattekoiya リポジトリ）

ハードモードのセルフケアWebアプリ。「落ちません。」（ochimasen リポジトリ）とは別プロダクト。運営は H3Y。

## 守ること
- トーンは `docs/tone.md`。叩くのは言い訳と行動だけ。人格・見た目・能力・存在は否定しない
- 命に関わる言葉が書かれたら、ハードモードを止めて相談窓口（`checkSafety` → `SAFETY_LEAD`）。この仕組みは外さない
- 決まり文句を足したら `npm test`（NG語のテスト）を通す
- 言葉データ（`js/data/`）と `js/engine.js` は ochimasen と共通。ochimasen 側で更新したらコピーする
- ユーザーとのやりとりは日本語で、専門用語は言い換える

## 確認
```sh
npm test && npm run test:e2e
```
