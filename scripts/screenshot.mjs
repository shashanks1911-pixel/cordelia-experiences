/**
 * Screenshot the prototype across breakpoints for visual review.
 * Usage: node scripts/screenshot.mjs [baseUrl] [pathList] [widthList] [tag]
 *   node scripts/screenshot.mjs http://localhost:5173 /,/explore 1440,375 pass1
 * Screenshots land in screenshots/<tag>/<page>-<width>.png (full page).
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';

const executablePath = `${homedir()}/Library/Caches/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-mac-arm64/chrome-headless-shell`;

const [base = 'http://localhost:5173', pathsArg = '/', widthsArg = '1440', tag = 'shots'] =
  process.argv.slice(2);
const paths = pathsArg.split(',');
const widths = widthsArg.split(',').map(Number);

const outDir = `screenshots/${tag}`;
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath });
try {
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: width < 500 ? 812 : 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    for (const path of paths) {
      const name = path === '/' ? 'home' : path.replaceAll('/', '-').replace(/^-/, '');
      await page.goto(base + path, { waitUntil: 'networkidle', timeout: 45_000 });
      await page.waitForTimeout(1_200);
      // Walk the page so in-view reveals fire, then return to top.
      await page.evaluate(async () => {
        const step = window.innerHeight * 0.7;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 220));
        }
        await new Promise((resolve) => setTimeout(resolve, 900));
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1_500); // let entrance animations settle
      await page.screenshot({ path: `${outDir}/${name}-${width}.png`, fullPage: true });
      console.log(`✓ ${name} @ ${width}`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}
