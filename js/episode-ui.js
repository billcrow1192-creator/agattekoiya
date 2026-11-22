// 先人の戦歴の表示（アプリとLPで共通）
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export function episodeHTML(e) {
  return `
      <aside class="episode">
        <div class="ep-head"><span class="ep-badge">戦歴</span><span class="ep-who">${esc(e.who)}</span><span class="ep-role">${esc(e.role)}</span></div>
        <p class="ep-story">${esc(e.story)}</p>
        <p class="ep-fire">${esc(e.fire)}</p>
        <p class="ep-src">${e.url ? `出典：<a href="${esc(e.url)}" target="_blank" rel="noopener">${esc(e.source)}</a>` : esc(e.source)}</p>
      </aside>`;
}
