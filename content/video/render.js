// Headless brand-video renderer.
// Loads a deterministic HTML composition exposing window.seek(t), screenshots
// each frame, then encodes to MP4 with the system ffmpeg.
// Usage: node render.js <html-file> <out-mp4> [durationSeconds] [fps]
const puppeteer = require('puppeteer');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

(async () => {
  const htmlFile = process.argv[2] || 'sobv-reel.html';
  const outName = process.argv[3] || 'sobv-reel.mp4';
  const DUR = parseFloat(process.argv[4] || '7.5');
  const FPS = parseInt(process.argv[5] || '30', 10);
  const W = 1080, H = 1920;

  const htmlPath = path.resolve(__dirname, htmlFile);
  const outPath = path.resolve(__dirname, outName);
  const framesDir = path.resolve(__dirname, 'frames');
  fs.rmSync(framesDir, { recursive: true, force: true });
  fs.mkdirSync(framesDir, { recursive: true });

  const totalFrames = Math.round(DUR * FPS);
  console.log('rendering', totalFrames, 'frames at', FPS, 'fps ->', outName);

  const browser = await puppeteer.launch({
    headless: true,
    protocolTimeout: 180000,
    args: [
      '--no-sandbox', '--disable-setuid-sandbox',
      '--disable-dev-shm-usage', '--disable-gpu', '--disable-software-rasterizer',
      '--hide-scrollbars', '--force-color-profile=srgb'
    ]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  // ?static + reduced motion: schoolhouse.js paints finished art and skips its own entrances; seek(t) drives all motion.
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/') + '?static', { waitUntil: 'networkidle0' });
  await page.evaluate(async () => { if (document.fonts && document.fonts.ready) { await document.fonts.ready; } });

  for (let i = 0; i < totalFrames; i++) {
    const t = i / FPS;
    await page.evaluate((tt) => window.seek(tt), t);
    await page.screenshot({ path: path.join(framesDir, String(i).padStart(4, '0') + '.png') });
  }
  await browser.close();
  console.log('frames done, encoding...');

  execFileSync('ffmpeg', [
    '-y',
    '-framerate', String(FPS),
    '-i', path.join(framesDir, '%04d.png'),
    '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=44100',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-shortest',
    '-r', String(FPS), '-movflags', '+faststart',
    outPath
  ], { stdio: 'inherit' });

  fs.rmSync(framesDir, { recursive: true, force: true });
  console.log('done ->', outPath);
})().catch((e) => { console.error(e); process.exit(1); });
