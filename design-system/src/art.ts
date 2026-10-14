/* Palette + drawing geometry, ported line for line from ../../schoolhouse.js (which ports the summit
   deck's build_deck.py). Change the art there first, then mirror it here. */

export const INK = '#1B1A17';

/** Every colour in the kit. `forest` is the deck's dark green stripe (schoolhouse.js calls it `black`). */
export const COLORS = {
  ink: INK, cream: '#FFF1D6', paper: '#FFFAF0',
  teal: '#12A4A4', pink: '#F6A8CB', red: '#E5322B', salmon: '#FF9473', yellow: '#FFC928',
  forest: '#17271F', mint: '#91DE87', maroon: '#8B1D3D', sky: '#5DB6EC', navy: '#3C3F9F', orange: '#FF7A33',
} as const;

/** A brand colour by name. */
export type Hue = 'teal' | 'pink' | 'red' | 'salmon' | 'yellow' | 'forest' | 'mint' | 'maroon' | 'sky' | 'navy' | 'orange' | 'cream' | 'paper' | 'ink';

/** The nine-stripe rainbow, outermost stripe first. Always in this order. */
export const RAINBOW: string[] = ['teal', 'pink', 'red', 'salmon', 'yellow', 'forest', 'mint', 'maroon', 'sky'].map(k => COLORS[k as Hue]);

/** Letter colours for rainbow words (the deck's rainbow_word). */
export const RAINBOW_WORD: Hue[] = ['red', 'orange', 'yellow', 'mint', 'sky', 'pink', 'teal'];

export const hex = (h: Hue | undefined, fallback: Hue): string => COLORS[h ?? fallback] ?? COLORS[fallback];
export const cssVar = (h: Hue): string => `var(--${h})`;

const f1 = (n: number) => n.toFixed(1);

export interface StrokeSpec { d: string; stroke: string; width: number }

/** Stripe band: down from the top, a 90° bend, then off to the right. Ink casing first. */
export function bend(xl: number, yb: number, w: number, colors: string[], r0: number, o: number, xr: number): StrokeSpec[] {
  const n = colors.length, R = r0 + n * w, cx = xl + R, cy = yb - R;
  const d = (r: number) => `M ${f1(cx - r)} -12 L ${f1(cx - r)} ${f1(cy)} A ${f1(r)} ${f1(r)} 0 0 0 ${f1(cx)} ${f1(cy + r)} L ${f1(xr)} ${f1(cy + r)}`;
  return [{ d: d(r0 + n * w / 2), stroke: INK, width: n * w + 2 * o },
    ...colors.map((c, i) => ({ d: d(R - (i + .5) * w), stroke: c, width: w + .6 }))];
}

export interface RingSpec { r: number; stroke: string; width: number }

/** Concentric rings (the arch). Draw each circle rotated 180° about the centre. Ink casing first. */
export function arcs(ro: number, w: number, colors: string[], o = 7): RingSpec[] {
  const n = colors.length;
  return [{ r: ro - n * w / 2, stroke: INK, width: n * w + 2 * o },
    ...colors.map((c, i) => ({ r: ro - (i + .5) * w, stroke: c, width: w + .6 }))];
}

/** Starburst polygon points: n spikes alternating between radius r1 and r2. */
export function burstPoints(cx: number, cy: number, r1: number, r2: number, n: number, rot = 0): string {
  const pts: string[] = [];
  for (let i = 0; i < 2 * n; i++) {
    const r = i % 2 ? r2 : r1, a = Math.PI * i / n + rot * Math.PI / 180;
    pts.push(`${f1(cx + r * Math.cos(a))},${f1(cy + r * Math.sin(a))}`);
  }
  return pts.join(' ');
}

/** Five-point star points. */
export function starPoints(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const rr = i % 2 ? r * .45 : r, a = (-90 + i * 36) * Math.PI / 180;
    pts.push(`${f1(cx + rr * Math.cos(a))},${f1(cy + rr * Math.sin(a))}`);
  }
  return pts.join(' ');
}

/** Hero band geometry at a given viewport width (same breakpoints as the site). */
export function heroGeometry(viewportWidth: number) {
  const small = viewportWidth < 600, mid = viewportWidth < 1060;
  const g = { w: small ? 6 : mid ? 10 : 13, xl: small ? 10 : 26, o: small ? 4 : 6, mb: small ? 12 : 24, r0: small ? 24 : 46 };
  return { ...g, band: g.xl + 9 * g.w + g.o };
}

export { f1 };
