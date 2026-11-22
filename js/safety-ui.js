import { HOTLINES, EMERGENCY, OFFICIAL_URL, SNS_NOTE } from './data/hotlines.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function renderSafetyBox({ heading = 'いま、話せる場所があります' } = {}) {
  return `
    <section class="safety-box" aria-labelledby="safetyHeading">
      <h2 id="safetyHeading">${esc(heading)}</h2>
      <p class="small" style="margin-top:6px">つらい気持ちを、専門の相談員が聞いてくれます。うまく話せなくても大丈夫。「つらい」の一言からで構いません。</p>
      <div class="hotlines">
        ${HOTLINES.map((h) => `
          <div class="hotline">
            <div><div class="name">${esc(h.name)}</div><div class="meta">${esc(h.meta)}</div></div>
            <a class="tel" href="tel:${h.tel.replace(/-/g, '')}">${esc(h.tel)}</a>
          </div>`).join('')}
      </div>
      <p class="small" style="margin-top:12px"><strong>${esc(EMERGENCY.meta)}</strong></p>
      <p class="xs muted" style="margin-top:6px">${esc(SNS_NOTE)} <a href="${OFFICIAL_URL}" target="_blank" rel="noopener">厚生労働省「まもろうよ こころ」</a>（受付時間は変わることがあります）</p>
    </section>`;
}
