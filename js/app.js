// あがってこいや。アプリ本体（画面の操作だけ。言葉選びは engine.js、伝え方は hard.js）
import { findWord, applyFeedback, markShown, streak, dateKey, CORPUS_INFO } from './engine.js';
import { hardSelect } from './hard.js';
import { getCoach, REACTIONS } from './coaches.js';
import { todayCoach, lastCoach, showCoachPicker, coachChipHTML } from './coach-ui.js';
import { sendReaction, sharingOn, setSharing } from './feedback.js';
import { load, update, clearAll, uid } from './storage.js';
import { renderSafetyBox } from './safety-ui.js';
import { episodeHTML } from './episode-ui.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pickOf = (arr) => arr[Math.floor(Math.random() * arr.length)];
let coachId = todayCoach() || lastCoach();
const coach = () => getCoach(coachId);

const MOODS = [
  { v: 1, t: '落ちてる' }, { v: 2, t: 'しんどい' }, { v: 3, t: 'ふつう' }, { v: 4, t: 'いい感じ' }, { v: 5, t: '上がってる' },
];
const form = { mood: null, energy: 2, concern: 'none' };
let session = { result: null, id: null, shown: [], state: null };

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2600);
}

export function quoteSource(w) {
  if (w.kind !== 'quote') return '— あがってこいや。編集部';
  const who = w.author && w.author !== 'ことわざ' ? `${esc(w.author)}${w.verification === 'attributed' ? '（と伝わる）' : ''}` : 'ことわざ';
  const where = w.source && w.source !== 'ことわざ' ? `<br><span class="xs">${esc(w.source)}${w.sourceNote ? `（${esc(w.sourceNote)}）` : ''}</span>` : '';
  return `— ${who}${where}`;
}

function renderHeader() {
  const n = streak(load().checkins);
  $('#streak').textContent = n ? `🔥 ${n}日連続` : '🔥 0日';
}

function syncForm() {
  $$('[data-mood]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.mood) === form.mood)));
  $$('[data-energy]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.energy) === form.energy)));
  $$('[data-concern]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.concern === form.concern)));
  $('#goBtn').disabled = form.mood == null;
}

function run(newCheckin) {
  const d = load();
  const state = newCheckin
    ? { mood: form.mood, energy: form.energy, concern: form.concern, emotions: [], text: $('#freeText').value.trim() }
    : session.state;
  const seed = `${dateKey()}#${d.checkins.length}#${session.shown.length}`;
  const r = hardSelect(state, d.prefs, { seed, exclude: session.shown, coach: coachId });
  if (newCheckin) {
    session = { result: r, id: uid(), shown: [], state };
    update((x) => {
      x.checkins.push({ id: session.id, at: new Date().toISOString(), mood: state.mood, energy: state.energy, concern: state.concern, text: state.text, wordId: r.word.id, result: null, safety: r.safety.level });
      return x;
    });
  } else {
    session.result = r;
    update((x) => { const c = x.checkins.find((c) => c.id === session.id); if (c) { c.wordId = r.word.id; c.result = null; } return x; });
  }
  session.shown.push(r.word.id);
  if (r.mode === 'normal') update((x) => { x.prefs = markShown(x.prefs, r.word.id); return x; });
  renderResult();
  renderHeader();
  renderLog();
  requestAnimationFrame(() => $('#result').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }));
}

function renderResult() {
  const r = session.result;
  const el = $('#result');
  if (!r) { el.innerHTML = ''; return; }
  if (r.mode === 'safety') {
    el.innerHTML = `
      <div class="calm-card">
        <p class="calm-lead">${esc(r.lead)}</p>
        ${renderSafetyBox({ heading: '今すぐ話せる場所' })}
      </div>`;
    return;
  }
  const w = r.word;
  const c = load().checkins.find((x) => x.id === session.id);
  el.innerHTML = `
    <article class="hard-card slam">
      <p class="opener">${esc(r.opener)}</p>
      ${r.jab ? `<p class="jab">${esc(r.jab)}</p>` : ''}
      <blockquote class="word">
        <p class="word-text">${esc(w.text)}</p>
        <footer class="word-src">${quoteSource(w)}</footer>
      </blockquote>
      <div class="react">
        <p class="react-q">この言葉、どうだ？</p>
        <div class="react-row">
          <button type="button" class="react-btn agree" data-react="agree" aria-pressed="false">${REACTIONS.agree}</button>
          <button type="button" class="react-btn disagree" data-react="disagree" aria-pressed="false">${REACTIONS.disagree}</button>
        </div>
        <p class="react-say" id="reactSay" aria-live="polite"></p>
      </div>
      <div class="order">
        <div class="order-head"><span class="badge">指令</span><span class="deadline">${esc(r.deadline)}</span></div>
        <p class="order-text">${esc(r.order)}</p>
      </div>
      ${r.episode ? episodeHTML(r.episode, r.coach) : ''}
      <p class="closer">${esc(r.closer)}</p>
    </article>
    <div class="verdict" id="verdict">${c?.result ? verdictHTML(c.result) : ''}</div>
    <div class="actions">
      <button class="btn hot" type="button" data-act="done">やった</button>
      <button class="btn line" type="button" data-act="skip">今日は見送る</button>
      <button class="btn line" type="button" data-act="more">もう一発</button>
      <button class="btn line" type="button" data-act="ease">きつすぎる</button>
    </div>`;
}

function verdictHTML(kind) {
  return kind === 'done'
    ? `<p class="v-done">✔ ${esc(pickOf(coach().done))}</p>`
    : `<p class="v-skip">${esc(pickOf(coach().skip))}</p>`;
}

function onAction(act) {
  const r = session.result;
  if (!r) return;
  if (act === 'done' || act === 'skip') {
    update((x) => { const c = x.checkins.find((c) => c.id === session.id); if (c) c.result = act; return x; });
    $('#verdict').innerHTML = verdictHTML(act);
    if (act === 'done') update((x) => { x.prefs = applyFeedback(x.prefs, r.word, 'like'); return x; });
    renderLog();
    return;
  }
  if (act === 'more') { run(false); return; }
  if (act === 'ease') {
    // 合わない言葉は二度と出さず、今日は少しだけ手をゆるめる（エネルギー「低い」扱い）
    update((x) => { x.prefs = applyFeedback(x.prefs, r.word, 'dislike'); return x; });
    session.state = { ...session.state, energy: 1, mood: Math.min(session.state.mood, 2) };
    toast(coach().ease);
    run(false);
  }
}

// 言葉への反応：「その通りっす」「なんか違うっす」
// 端末の中に記録して、戦績に「刺さった率」を出す。合わない言葉は二度と出さない。
// （匿名の集計は js/feedback.js。送る先が決まるまでは何も送らない）
function onReact(kind) {
  const r = session.result;
  if (!r || r.mode !== 'normal') return;
  const s = session.state;
  update((x) => {
    x.reactions = (x.reactions || []).filter((v) => !(v.checkinId === session.id && v.wordId === r.word.id));
    x.reactions.push({ at: new Date().toISOString(), checkinId: session.id, wordId: r.word.id, react: kind, coach: coachId, mood: s.mood, energy: s.energy, concern: s.concern });
    x.prefs = applyFeedback(x.prefs, r.word, kind === 'agree' ? 'like' : 'dislike');
    return x;
  });
  sendReaction({ wordId: r.word.id, react: kind, coach: coachId, mood: s.mood, energy: s.energy, concern: s.concern });
  $$('[data-react]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.react === kind)));
  $('#reactSay').textContent = pickOf(kind === 'agree' ? coach().agree : coach().disagree);
  renderLog();
  if (kind === 'disagree') setTimeout(() => run(false), 1300);
}

function fmtDate(iso) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function renderLog() {
  const d = load();
  const done = d.checkins.filter((c) => c.result === 'done').length;
  const rs = d.reactions || [];
  const agree = rs.filter((v) => v.react === 'agree').length;
  const rate = rs.length ? `${Math.round((agree / rs.length) * 100)}%` : '—';
  $('#stats').innerHTML = `
    <div class="stat"><div class="n">${streak(d.checkins)}</div><div class="l">日連続</div></div>
    <div class="stat"><div class="n">${done}</div><div class="l">クリア</div></div>
    <div class="stat"><div class="n">${rate}</div><div class="l">刺さった率</div></div>
    <div class="stat"><div class="n">${d.checkins.length}</div><div class="l">回 来た</div></div>`;
  $('#reactNote').textContent = rs.length ? `「${REACTIONS.agree}」${agree}回／「${REACTIONS.disagree}」${rs.length - agree}回` : `言葉に「${REACTIONS.agree}」か「${REACTIONS.disagree}」で答えると、刺さった率が出る。`;
  const items = [...d.checkins].reverse().slice(0, 10);
  $('#logList').innerHTML = items.length
    ? items.map((c) => {
      const w = findWord(c.wordId);
      const m = MOODS.find((x) => x.v === c.mood);
      const res = c.result === 'done' ? '<span class="tag ok">クリア</span>' : c.result === 'skip' ? '<span class="tag">見送り</span>' : '';
      const rv = (d.reactions || []).filter((v) => v.checkinId === c.id).at(-1);
      const rt = rv ? `<span class="tag ${rv.react === 'agree' ? 'ok' : ''}">${rv.react === 'agree' ? '刺さった' : '違った'}</span>` : '';
      return `<li><div class="log-meta"><span>${fmtDate(c.at)}</span><span>${esc(m?.t || '')}</span>${res}${rt}</div>${w ? `<p class="log-word">${esc(w.text)}</p>` : ''}</li>`;
    }).join('')
    : '<li class="empty">まだ何もない。今日から始めろ。</li>';
}

function init() {
  $('#moods').innerHTML = [...MOODS].reverse().map((m) => `<button type="button" class="chip mood" data-mood="${m.v}" aria-pressed="false"><span class="lv">${m.v}</span>${m.t}</button>`).join('');
  document.addEventListener('click', (e) => {
    const rb = e.target.closest('[data-react]');
    if (rb) { onReact(rb.dataset.react); return; }
    const b = e.target.closest('[data-mood],[data-energy],[data-concern],[data-act]');
    if (!b) return;
    if (b.dataset.mood) form.mood = Number(b.dataset.mood);
    else if (b.dataset.energy) form.energy = Number(b.dataset.energy);
    else if (b.dataset.concern) form.concern = b.dataset.concern;
    else if (b.dataset.act) { onAction(b.dataset.act); return; }
    syncForm();
  });
  $('#checkin').addEventListener('submit', (e) => { e.preventDefault(); if (form.mood != null) run(true); });
  $('#clearBtn').addEventListener('click', (e) => {
    const b = e.currentTarget;
    if (b.dataset.armed !== '1') { b.dataset.armed = '1'; b.textContent = 'もう一度押すと全部消える'; setTimeout(() => { b.dataset.armed = ''; b.textContent = '記録を全部消す'; }, 4000); return; }
    clearAll(); session = { result: null, id: null, shown: [], state: null };
    renderResult(); renderHeader(); renderLog(); toast('全部消した。ゼロからだ。');
    b.dataset.armed = ''; b.textContent = '記録を全部消す';
  });
  // 今日の教官
  const chip = $('#coachBtn');
  const paintChip = () => { chip.innerHTML = coachChipHTML(coachId); chip.className = `coach-chip ${coachId}`; };
  paintChip();
  const pick = (closable) => showCoachPicker({ closable, onPick: (id) => { coachId = id; paintChip(); if (session.result) { session.result = null; renderResult(); } } });
  chip.addEventListener('click', () => pick(true));
  if (!todayCoach()) pick(false);
  const share = $('#shareToggle');
  share.checked = sharingOn();
  share.addEventListener('change', () => { setSharing(share.checked); toast(share.checked ? '送る設定にした。協力に感謝する。' : '送らない設定にした。記録はこの端末の中だけ。'); });
  $('#corpusInfo').textContent = `言葉 ${CORPUS_INFO.total}語（古典・ことわざ ${CORPUS_INFO.quotes}語）`;
  syncForm();
  renderHeader();
  renderLog();
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
}
init();
