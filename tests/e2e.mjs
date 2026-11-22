// ブラウザでの通し確認： node tests/e2e.mjs [screenshotDir]
import assert from 'node:assert/strict';
import { createServer } from '../scripts/serve.mjs';
import { chromium, devices } from '../scripts/pw.mjs';

const shotDir = process.argv[2];
const server = createServer().listen(0);
const base = `http://localhost:${server.address().port}`;
const browser = await chromium.launch();
const errors = [];
let passed = 0;

async function newPage(opts = {}) {
  const { pickCoach, ...ctxOpts } = opts;
  const ctx = await browser.newContext({ locale: 'ja-JP', ...devices['Pixel 7'], ...ctxOpts });
  // 「今日の教官は…」は専用のテスト以外では選び済みにしておく
  if (!pickCoach) {
    await ctx.addInitScript(() => {
      const d = new Date();
      try { localStorage.setItem('agattekoiya:coach', JSON.stringify({ id: 'male', date: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` })); } catch { /* noop */ }
    });
  }
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(`console: ${m.text()}`); });
  page.on('requestfailed', (r) => { if (!/fonts\.(googleapis|gstatic)\.com/.test(r.url())) errors.push(`requestfailed: ${r.url()}`); });
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url()}`); });
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  // 反応の集計API（本番には送らない）
  page.sent = [];
  await page.route('**/api/agattekoiya-feedback', (r) => { page.sent.push(JSON.parse(r.request().postData() || '{}')); r.fulfill({ status: 200, contentType: 'application/json', body: '{"recorded":true}' }); });
  return { ctx, page };
}
async function step(name, fn) {
  try { await fn(); passed++; console.log(`ok - ${name}`); } catch (e) { console.log(`not ok - ${name}\n  ${e.message}`); process.exitCode = 1; }
}
async function noHScroll(page) {
  const w = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  assert.ok(w <= 1, `横スクロールが発生 (${w}px)`);
}
const shot = async (page, name, full = false) => { if (shotDir) await page.screenshot({ path: `${shotDir}/${name}.png`, fullPage: full }); };

try {
  await step('LP：表示とデモ', async () => {
    const { ctx, page } = await newPage();
    await page.goto(`${base}/index.html`);
    assert.match(await page.title(), /あがってこいや/);
    await shot(page, 'lp-top');
    await page.click('[data-demo="3"]');
    await page.waitForSelector('#demoResult .word-text');
    assert.ok((await page.textContent('#demoResult .order-text')).length > 3);
    await noHScroll(page);
    await ctx.close();
  });

  const { ctx, page } = await newPage();
  await step('アプリ：状態を選ぶ → ハードモードの言葉と指令', async () => {
    await page.goto(`${base}/app.html`);
    assert.ok(await page.isDisabled('#goBtn'), '気分を選ぶまで押せない');
    await page.click('[data-mood="2"]');
    await page.click('[data-concern="work"]');
    await page.click('#goBtn');
    await page.waitForSelector('#result .hard-card');
    for (const s of ['.opener', '.jab', '.word-text', '.order-text', '.closer']) assert.ok((await page.textContent(`#result ${s}`)).trim().length > 1, s);
    await shot(page, 'app-result');
    await noHScroll(page);
  });

  await step('やった → クリアが数えられる・連続日数', async () => {
    await page.click('[data-act="done"]');
    await page.waitForSelector('#verdict .v-done');
    assert.match(await page.textContent('#stats'), /1\s*クリア/);
    assert.match(await page.textContent('#streak'), /1日連続/);
  });

  await step('もう一発・きつすぎる → 別の言葉、合わなかった言葉は外れる', async () => {
    const before = await page.textContent('#result .word-text');
    await page.click('[data-act="more"]');
    await page.waitForFunction((b) => document.querySelector('#result .word-text')?.textContent !== b, before);
    const second = await page.textContent('#result .word-text');
    assert.equal((await page.textContent('#result .nuki')).trim(), '……ようしらんけど。', 'ふだんは抜きが付く');
    await page.click('[data-act="ease"]');
    await page.waitForFunction((b) => document.querySelector('#result .word-text')?.textContent !== b, second);
    assert.match(await page.textContent('#toast'), /休むのも戦略/);
    const disliked = await page.evaluate(() => JSON.parse(localStorage.getItem('agattekoiya:v1')).prefs.disliked.length);
    assert.equal(disliked, 1);
    assert.equal(await page.$('#result .nuki'), null, '「きつすぎる」の後は抜きを付けない');
  });

  await step('ガードレール：命に関わる言葉 → ハードモード停止・相談窓口', async () => {
    await page.fill('#freeText', 'もう消えたい');
    await page.click('#goBtn');
    await page.waitForSelector('#result .safety-box');
    assert.equal(await page.$('#result .hard-card'), null, '叩く言葉は出ない');
    assert.match(await page.textContent('#result'), /ハードモードを止める/);
    assert.match(await page.textContent('#result'), /0120-279-338/);
    await shot(page, 'app-safety');
    await page.fill('#freeText', '');
  });

  await step('XSS：入力はそのまま実行されない', async () => {
    await page.fill('#freeText', '<img src=x onerror="window.__x=1">');
    await page.click('#goBtn');
    await page.waitForSelector('#result .hard-card');
    assert.equal(await page.evaluate(() => window.__x), undefined);
  });

  await step('記録は再読み込み後も残り、2回押しで全部消える', async () => {
    await page.reload();
    assert.match(await page.textContent('#stats'), /回 来た/);
    const n = await page.evaluate(() => JSON.parse(localStorage.getItem('agattekoiya:v1')).checkins.length);
    assert.ok(n >= 3);
    await page.click('#clearBtn');
    assert.ok(await page.evaluate(() => localStorage.getItem('agattekoiya:v1')) !== null, '1回では消えない');
    await page.click('#clearBtn');
    assert.equal(await page.evaluate(() => localStorage.getItem('agattekoiya:v1')), null);
    assert.match(await page.textContent('#logList'), /まだ何もない/);
  });
  await ctx.close();

  await step('最初に「今日の教官は…」→ 女性鬼教官を選ぶと、その口調で表紙・アプリへ', async () => {
    const { ctx: c, page: p } = await newPage({ pickCoach: true });
    await p.goto(`${base}/index.html`);
    await p.waitForSelector('.coach-pick');
    assert.match(await p.textContent('.cp-title'), /今日の教官は/);
    await shot(p, 'coach-pick');
    await p.click('[data-coach="female"]');
    await p.waitForSelector('.cp-intro-line');
    assert.match(await p.textContent('.cp-intro-line'), /私/);
    await p.waitForSelector('.coach-pick', { state: 'detached' });
    assert.match(await p.textContent('#coachBtn'), /女性鬼教官/);
    // アプリでは選び直さなくていい
    await p.goto(`${base}/app.html`);
    assert.equal(await p.$('.coach-pick'), null, '同じ日はもう聞かない');
    await p.click('[data-mood="3"]');
    await p.click('#goBtn');
    await p.waitForSelector('#result .hard-card');
    const { COACHES } = await import('../js/coaches.js');
    const opener = (await p.textContent('#result .opener')).trim();
    const { EPISODES } = await import('../js/data/episodes.js');
    const fire = (await p.textContent('#result .ep-fire')).trim();
    assert.ok(EPISODES.some((e) => e.fireF === fire), `戦歴の決め台詞も女性鬼教官の口調: ${fire}`);
    assert.ok(Object.values(COACHES.female.openers).flat().includes(opener), `女性鬼教官の一言: ${opener}`);
    // 教官ボタンで選び直せる
    await p.click('#coachBtn');
    await p.click('[data-coach="male"]');
    await p.waitForSelector('.coach-pick', { state: 'detached' });
    assert.match(await p.textContent('#coachBtn'), /男性鬼教官/);
    await c.close();
  });

  await step('言葉への反応：「その通りっす」で刺さった率、「なんか違うっす」で別の言葉に', async () => {
    const { ctx: c, page: p } = await newPage();
    await p.goto(`${base}/app.html`);
    await p.click('[data-mood="4"]');
    await p.click('#goBtn');
    await p.waitForSelector('#result .react');
    await p.click('[data-react="agree"]');
    assert.match(await p.textContent('#reactSay'), /.+/);
    assert.match(await p.textContent('#stats'), /100%\s*刺さった率/);
    // 同じ言葉で押し直すと、反応は上書き（気が変わってもいい）。別の言葉で「なんか違うっす」
    const first = await p.textContent('#result .word-text');
    await p.click('[data-act="more"]');
    await p.waitForFunction((b) => document.querySelector('#result .word-text')?.textContent !== b, first);
    const before = await p.textContent('#result .word-text');
    await p.click('[data-react="disagree"]');
    await p.waitForFunction((b) => document.querySelector('#result .word-text')?.textContent !== b, before);
    const d = await p.evaluate(() => JSON.parse(localStorage.getItem('agattekoiya:v1')));
    assert.equal(d.reactions.length, 2);
    assert.equal(d.prefs.disliked.length, 1, '違った言葉は二度と出さない');
    assert.match(await p.textContent('#reactNote'), /その通りっす」1回／「なんか違うっす」1回/);
    // 名前なしで送るのは決まった項目だけ（ひとことは送らない）
    assert.equal(p.sent.length, 2);
    assert.deepEqual(Object.keys(p.sent[0]).sort(), ['coach', 'concern', 'energy', 'mood', 'react', 'visitorId', 'wordId']);
    assert.match(p.sent[0].visitorId, /^[0-9a-f-]{36}$/);
    // 送らない設定にすると、送らない
    await p.uncheck('#shareToggle');
    await p.click('[data-act="more"]');
    await p.waitForTimeout(200);
    await p.click('[data-react="agree"]');
    assert.equal(p.sent.length, 2, '送らない設定では送らない');
    await shot(p, 'app-react');
    await c.close();
  });

  await step('落ちません。の「……ぬるい？」から来た人：答えが入っていて、迎えの一言と戻るリンク', async () => {
    const { ctx: c6, page: p6 } = await newPage();
    await p6.goto(`${base}/app.html`);
    assert.ok(await p6.isHidden('#fromOchi'), 'ふつうに開いた時は出さない');
    await p6.goto(`${base}/app.html#from=ochimasen&m=3&e=3&c=money`);
    await p6.reload();
    await p6.waitForSelector('#fromOchi:not([hidden])');
    assert.match(await p6.textContent('#fromOchi'), /落ちません。から来たな。/);
    assert.equal(await p6.getAttribute('#fromOchi a', 'href'), 'https://ochimasen.h3y.jp/app.html');
    assert.equal(await p6.getAttribute('[data-mood="3"]', 'aria-pressed'), 'true');
    assert.equal(await p6.getAttribute('[data-energy="3"]', 'aria-pressed'), 'true');
    assert.equal(await p6.getAttribute('[data-concern="money"]', 'aria-pressed'), 'true');
    assert.equal(await p6.inputValue('#freeText'), '', 'ひとことは受け取らない');
    assert.ok(!(await p6.isDisabled('#goBtn')), 'そのまま押せる');
    await p6.click('#goBtn');
    await p6.waitForSelector('#result .nuki');
    await p6.waitForTimeout(1900);
    await shot(p6, 'from-ochimasen-nuki', true);
    await noHScroll(p6);
    await c6.close();
  });

  await step('メンバー限定：言葉・本ごとに人物、押すとエピソードと出典', async () => {
    const { ctx: c, page: p } = await newPage();
    await p.goto(`${base}/members/influence.html`);
    await p.waitForSelector('.inf-book');
    assert.ok((await p.$$('.inf-book')).length >= 10);
    assert.equal(await p.getAttribute('meta[name="robots"]', 'content'), 'noindex, nofollow');
    await p.click('[data-person="steve-jobs"]');
    await p.waitForSelector('#personDlg[open]');
    assert.match(await p.textContent('#personEpisode'), /Stay hungry/);
    assert.match(await p.getAttribute('#personSrc', 'href'), /^https:/);
    await shot(p, 'members-influence');
    await noHScroll(p);
    await c.close();
  });

  await step('相談窓口・プライバシー・404', async () => {
    const { ctx: c, page: p } = await newPage();
    await p.goto(`${base}/safety.html`);
    await p.waitForSelector('.safety-box .tel');
    await p.goto(`${base}/privacy.html`);
    assert.match(await p.textContent('main'), /外部には送信されません/);
    await noHScroll(p);
    await c.close();
  });

  await step('コンソールエラーなし', async () => {
    assert.deepEqual(errors, []);
  });
} finally {
  await browser.close();
  server.close();
}
console.log(`\n${passed} passed${process.exitCode ? ' (some failed)' : ''}`);
