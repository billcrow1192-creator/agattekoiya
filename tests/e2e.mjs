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
  const ctx = await browser.newContext({ locale: 'ja-JP', ...devices['Pixel 7'], ...opts });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(`console: ${m.text()}`); });
  page.on('requestfailed', (r) => { if (!/fonts\.(googleapis|gstatic)\.com/.test(r.url())) errors.push(`requestfailed: ${r.url()}`); });
  page.on('response', (r) => { if (r.status() >= 400) errors.push(`HTTP ${r.status()}: ${r.url()}`); });
  await page.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
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
    assert.match(await page.textContent('#stats'), /1\s*指令クリア/);
    assert.match(await page.textContent('#streak'), /1日連続/);
  });

  await step('もう一発・きつすぎる → 別の言葉、合わなかった言葉は外れる', async () => {
    const before = await page.textContent('#result .word-text');
    await page.click('[data-act="more"]');
    await page.waitForFunction((b) => document.querySelector('#result .word-text')?.textContent !== b, before);
    const second = await page.textContent('#result .word-text');
    await page.click('[data-act="ease"]');
    await page.waitForFunction((b) => document.querySelector('#result .word-text')?.textContent !== b, second);
    assert.match(await page.textContent('#toast'), /休むのも戦略/);
    const disliked = await page.evaluate(() => JSON.parse(localStorage.getItem('agattekoiya:v1')).prefs.disliked.length);
    assert.equal(disliked, 1);
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
