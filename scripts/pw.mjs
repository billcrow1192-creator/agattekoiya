// Playwright をローカル or グローバルから読み込む
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch {
  const g = execSync('npm root -g').toString().trim();
  pw = require(`${g}/playwright`);
}
export const { chromium, devices } = pw;
