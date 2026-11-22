// 「落ちません。」の「……ぬるい？」から来た人の答えを受け取る
// 受け取るのは選択肢のコードだけ（気分 1〜5・エネルギー 1〜3・何と戦ってる？）。URL の # の後ろなので、サーバーには届かない。
// 決まった値以外は捨てる（自由記述は受け取らない）。
export const OCHIMASEN_URL = 'https://ochimasen.h3y.jp/app.html';
const CONCERNS = new Set(['work', 'people', 'money', 'health', 'self', 'none']);

/** @returns {{mood:number, energy:number, concern:string} | null} */
export function parseFromOchimasen(hash = '') {
  const p = new URLSearchParams(String(hash).replace(/^#/, ''));
  if (p.get('from') !== 'ochimasen') return null;
  const mood = Number(p.get('m'));
  if (!Number.isInteger(mood) || mood < 1 || mood > 5) return null;
  const e = Number(p.get('e'));
  const energy = Number.isInteger(e) && e >= 1 && e <= 3 ? e : 2;
  const c = p.get('c');
  return { mood, energy, concern: CONCERNS.has(c) ? c : 'none' };
}
