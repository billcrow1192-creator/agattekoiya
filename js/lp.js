// LP のデモ：気分を押すと、ハードモードの言葉が一つ出る（保存はしない）
import { hardSelect } from './hard.js';
import { episodeHTML } from './episode-ui.js';
import { todayCoach, lastCoach, showCoachPicker, coachChipHTML } from './coach-ui.js';

// 最初に「今日の教官は…」→ 選んだら表紙（いまのトップ）へ
let coachId = todayCoach() || lastCoach();
const chip = document.querySelector('#coachBtn');
const paint = () => { chip.innerHTML = coachChipHTML(coachId); chip.className = `coach-chip ${coachId}`; };
paint();
const pick = (closable) => showCoachPicker({ closable, onPick: (id) => { coachId = id; paint(); } });
chip.addEventListener('click', () => pick(true));
if (!todayCoach()) pick(false);

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const out = document.querySelector('#demoResult');
let n = 0;
document.querySelector('#demoMoods').addEventListener('click', (e) => {
  const b = e.target.closest('[data-demo]');
  if (!b) return;
  document.querySelectorAll('#demoMoods [data-demo]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  const r = hardSelect({ mood: Number(b.dataset.demo), energy: 2 }, {}, { seed: `lp#${n++}#${Date.now()}`, coach: coachId });
  out.innerHTML = `
    <article class="hard-card slam">
      <p class="opener">${esc(r.opener)}</p>
      <blockquote class="word"><p class="word-text">${esc(r.word.text)}</p></blockquote>
      <div class="order"><div class="order-head"><span class="badge">指令</span><span class="deadline">${esc(r.deadline)}</span></div><p class="order-text">${esc(r.order)}</p></div>
      ${episodeHTML(r.episode)}
      <p class="closer">${esc(r.closer)}</p>
      ${r.nuki ? `<p class="nuki">${esc(r.nuki)}</p>` : ''}
    </article>
    <p style="margin:14px 0 0"><a class="btn hot block" href="app.html">続きはアプリで</a></p>`;
});
