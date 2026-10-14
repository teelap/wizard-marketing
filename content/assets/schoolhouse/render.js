// Render every .slide in a Jake the Wizard template to PNG + WebP (TikTok photo posts take WebP or JPEG only).
// Usage: node content/assets/schoolhouse/render.js <html-file> <out-prefix>
//   -> <dir of html>/<out-prefix>-slides/<out-prefix>-NN.png and .webp, one pair per slide, at the slide's own size.
// The page loads with ?static and reduced motion, so schoolhouse.js paints the finished art with no entrances.
// Reuses the puppeteer install in content/video (npm install --prefix content/video once).
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const puppeteer = require(path.resolve(__dirname, '../../video/node_modules/puppeteer'));

(async () => {
  const [htmlArg, prefix] = process.argv.slice(2);
  if (!htmlArg || !prefix) {
    console.error('usage: node render.js <html-file> <out-prefix>');
    process.exit(2);
  }
  const htmlPath = path.resolve(htmlArg);
  if (!fs.existsSync(htmlPath)) throw new Error(`no such file: ${htmlPath}`);
  const outDir = path.join(path.dirname(htmlPath), `${prefix}-slides`);
  // Clear the old images rather than the folder itself (Windows refuses to remove a folder that is open anywhere).
  fs.mkdirSync(outDir, { recursive: true });
  for (const f of fs.readdirSync(outDir)) if (/\.(png|webp)$/i.test(f)) fs.rmSync(path.join(outDir, f));

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars', '--force-color-profile=srgb', '--allow-file-access-from-files'],
  });
  try {
    const page = await browser.newPage();
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
    await page.goto(`${pathToFileURL(htmlPath).href}?static`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      await Promise.all([...document.images].map(i => (i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))));
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
    });
    const broken = await page.evaluate(() => [...document.images].filter(i => !i.naturalWidth).map(i => i.getAttribute('src')));
    if (broken.length) console.warn('! images that did not load:', broken.join(', '));

    const slides = await page.$$('.slide');
    console.log(`found ${slides.length} slides`);
    for (let i = 0; i < slides.length; i++) {
      const base = path.join(outDir, `${prefix}-${String(i + 1).padStart(2, '0')}`);
      await slides[i].screenshot({ path: `${base}.png` });
      await slides[i].screenshot({ path: `${base}.webp`, type: 'webp', quality: 92 });
      console.log(`wrote ${path.relative(process.cwd(), base)}.png + .webp`);
    }
  } finally {
    await browser.close();
  }
})().catch(err => { console.error(err); process.exit(1); });
