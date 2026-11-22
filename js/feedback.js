// 言葉への反応（その通りっす／なんか違うっす）を、匿名で数えるための送信。
// 送るのは「どの言葉に、どの教官で、どんな気分の時に、どう反応したか」だけ。
// 書いた文章・名前・メールは送らない。番号はこのブラウザで作ったランダムな番号だけ。
// 送り先（H3Y の集計API）が公開されるまでは FEEDBACK_API を空にして、何も送らない。
export const FEEDBACK_API = '';
const KEY = 'agattekoiya:visitor';

function visitorId() {
  try {
    let v = localStorage.getItem(KEY);
    if (!v) { v = crypto.randomUUID(); localStorage.setItem(KEY, v); }
    return v;
  } catch { return null; }
}

export function sendReaction(payload) {
  if (!FEEDBACK_API) return;
  const id = visitorId();
  if (!id) return;
  try {
    fetch(FEEDBACK_API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ visitorId: id, ...payload }), keepalive: true }).catch(() => {});
  } catch { /* 送れなくても使える */ }
}
