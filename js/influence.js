// メンバー限定：言葉・本 → 影響を受けた人物
import { INFLUENCES, LEVEL_LABEL } from './data/influences.js';
import { EPISODES } from './data/episodes.js';
import { WORDS } from './engine.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// アプリに出てくる、その本・言葉に関係する言葉を一つ見せる
function relatedLine(ids) {
  for (const id of ids) {
    const w = WORDS.find((x) => x.id === id);
    if (w) return w.text;
    const e = EPISODES.find((x) => x.id === id);
    if (e) return e.fire;
  }
  return '';
}

$('#infList').innerHTML = INFLUENCES.map((b) => {
  const line = relatedLine(b.related || []);
  return `
    <section class="inf-book">
      <h2>${esc(b.title)}</h2>
      <p class="inf-year">${esc(b.year)}</p>
      ${line ? `<p class="inf-line">アプリでは：「${esc(line)}」</p>` : ''}
      <div class="inf-people">
        ${b.people.map((p) => `<button type="button" class="inf-person" data-book="${b.id}" data-person="${p.id}"><span class="ip-name">${esc(p.name)}</span><span class="ip-role">${esc(p.role)}</span></button>`).join('')}
      </div>
    </section>`;
}).join('');

const dlg = $('#personDlg');
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-person]');
  if (!b) return;
  const book = INFLUENCES.find((x) => x.id === b.dataset.book);
  const p = book.people.find((x) => x.id === b.dataset.person);
  $('#personWord').textContent = book.title;
  $('#personName').textContent = p.name;
  $('#personRole').textContent = p.role;
  $('#personEpisode').textContent = p.episode;
  $('#personSns').hidden = !p.sns;
  $('#personSns').textContent = p.sns ? `SNS：${p.sns}` : '';
  $('#personLevel').textContent = LEVEL_LABEL[p.level] || '';
  $('#personLevel').className = `pd-level ${p.level}`;
  const a = $('#personSrc'); a.textContent = `出典：${p.source}`; a.href = p.url;
  if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
});
$('#personClose').addEventListener('click', () => dlg.close());
dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
