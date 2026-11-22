// 「今日の教官は…」の選択画面（LP とアプリで共通）
// 選んだ教官は、その日のあいだ覚えておく（端末の中だけ。外には送らない）
import { COACHES, getCoach } from './coaches.js';

const KEY = 'agattekoiya:coach';
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => { const d = new Date(); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };

function read() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch { return null; }
}
/** 今日選んだ教官（まだなら null） */
export function todayCoach() {
  const v = read();
  return v && v.date === today() && COACHES[v.id] ? v.id : null;
}
/** 最後に選んだ教官（日付は問わない。デモなどで使う） */
export function lastCoach() {
  const v = read();
  return v && COACHES[v.id] ? v.id : 'male';
}
export function saveCoach(id) {
  try { localStorage.setItem(KEY, JSON.stringify({ id, date: today() })); } catch { /* 保存できなくても動く */ }
}

/**
 * 選択画面を出す。選んだら教官の一言を見せてから、画面を上にスライドして消す。
 * @param {{onPick:(id:string)=>void, closable?:boolean}} opts
 */
export function showCoachPicker({ onPick, closable = false } = {}) {
  document.querySelector('.coach-pick')?.remove();
  const el = document.createElement('div');
  el.className = 'coach-pick';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-labelledby', 'coachPickTitle');
  el.innerHTML = `
    <div class="tape" aria-hidden="true"></div>
    <div class="cp-inner">
      <p class="cp-kicker">HARD MODE</p>
      <h2 class="cp-title" id="coachPickTitle">今日の教官は…</h2>
      <div class="cp-cards">
        ${Object.values(COACHES).map((c) => `
          <button type="button" class="cp-card cp-${c.id}" data-coach="${c.id}">
            <span class="cp-oni" aria-hidden="true">鬼</span>
            <span class="cp-name"><span aria-hidden="true">${c.mark}</span> ${esc(c.title)}</span>
            <span class="cp-line">「${esc(c.sample)}」</span>
          </button>`).join('')}
      </div>
      <p class="cp-note">選び直しは、上の「教官」ボタンからいつでも。</p>
      ${closable ? '<button type="button" class="cp-close" data-cp-close>閉じる</button>' : ''}
    </div>
    <div class="cp-intro" aria-live="assertive"></div>`;
  document.body.appendChild(el);
  document.body.classList.add('cp-open');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const close = () => {
    el.classList.add('cp-leave');
    document.body.classList.remove('cp-open');
    setTimeout(() => el.remove(), reduce ? 0 : 650);
  };
  el.addEventListener('click', (e) => {
    if (e.target.closest('[data-cp-close]')) { close(); return; }
    const b = e.target.closest('[data-coach]');
    if (!b || el.classList.contains('cp-picked')) return;
    const c = getCoach(b.dataset.coach);
    saveCoach(c.id);
    el.classList.add('cp-picked', `cp-picked-${c.id}`);
    b.classList.add('cp-chosen');
    el.querySelector('.cp-intro').innerHTML = `<p class="cp-intro-title">${esc(c.title)}</p><p class="cp-intro-line">${esc(c.intro)}</p>`;
    onPick?.(c.id);
    setTimeout(close, reduce ? 300 : 1400);
  });
  setTimeout(() => el.querySelector('[data-coach]')?.focus(), 50);
  return el;
}

/** ヘッダーの「教官」ボタンの表示 */
export function coachChipHTML(id) {
  const c = getCoach(id);
  return `<span aria-hidden="true">${c.mark}</span> ${esc(c.title)}`;
}
