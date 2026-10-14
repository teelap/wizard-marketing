// Builds the kit: dist/index.js (ESM, React external), dist/*.d.ts (tsc), and
// dist/schoolhouse.css = the site's own ../schoolhouse.css with its web fonts imported,
// so anything that loads this one stylesheet gets the real look.
import { build } from 'esbuild';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, 'dist');
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

await build({
  entryPoints: [path.join(here, 'src/index.ts')],
  outfile: path.join(dist, 'index.js'),
  bundle: true,
  format: 'esm',
  target: 'es2020',
  jsx: 'automatic',
  external: ['react', 'react/jsx-runtime', 'react-dom'],
  loader: { '.webp': 'dataurl' },
  legalComments: 'none',
});

execFileSync(process.execPath, [path.join(here, 'node_modules/typescript/bin/tsc'), '-p', path.join(here, 'tsconfig.json')], { stdio: 'inherit' });

// The same font request the site's pages make (Fraunces pinned to the deck's SOFT/WONK cut), plus Font Awesome
// for the arrows and social glyphs the kit uses. Remote @imports must come before every other rule.
const FONTS = 'https://fonts.googleapis.com/css2?family=Courier+Prime:wght@700&family=Fraunces:ital,opsz,wght,SOFT,WONK@0,144,900,100,1;1,144,900,100,1&family=Nunito:wght@600..900&family=Permanent+Marker&display=swap';
const ICONS = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';
const kit = fs.readFileSync(path.join(here, '..', 'schoolhouse.css'), 'utf8');
fs.writeFileSync(path.join(dist, 'schoolhouse.css'),
  `@import url("${FONTS}");\n@import url("${ICONS}");\n/* Copied verbatim from ../schoolhouse.css by design-system/build.mjs. Edit the original. */\n${kit}`);

console.log('built', fs.readdirSync(dist).length, 'files in dist/');
