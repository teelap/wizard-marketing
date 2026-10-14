import type { ReactNode } from 'react';
import { RAINBOW, arcs } from '../art';

const SHAPES = {
  /** The footer arch: wide and tall. */
  arch: { vb: '0 0 1100 520', cx: 550, cy: 580, ro: 540, w: 30 },
  /** The low arc that sits behind a photo. */
  arc: { vb: '0 0 660 420', cx: 330, cy: 440, ro: 320, w: 24 },
} as const;

export interface RainbowArchProps {
  /** arch = the tall footer arch; arc = the lower arc behind a photo. */
  variant?: 'arch' | 'arc';
  /** Width (px or any CSS length). Height follows the artwork's proportions. */
  width?: number | string;
  /** Text centred under the arch, inside the opening (the footer's copyright line). */
  children?: ReactNode;
}

/**
 * Nine-stripe rainbow arch in ink casing, for footers and behind photos. Optional text sits inside the opening.
 */
export function RainbowArch({ variant = 'arch', width = '100%', children }: RainbowArchProps) {
  const s = SHAPES[variant];
  return (
    <div style={{ position: 'relative', width, maxWidth: '100%' }}>
      <svg viewBox={s.vb} style={{ display: 'block', width: '100%', height: 'auto' }} aria-hidden="true" focusable="false">
        {arcs(s.ro, s.w, RAINBOW).map((r, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={r.r} stroke={r.stroke} strokeWidth={r.width} fill="none" transform={`rotate(180 ${s.cx} ${s.cy})`} />
        ))}
      </svg>
      {children && (
        <div style={{ position: 'absolute', left: '50%', bottom: 20, translate: '-50% 0', width: '44%', fontSize: '.85rem', fontWeight: 800, lineHeight: 1.4, textAlign: 'center' }}>{children}</div>
      )}
    </div>
  );
}
