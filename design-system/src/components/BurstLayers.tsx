import { INK, burstPoints } from '../art';
import { cx } from '../util';

/* The ink shadow and the coloured burst as two whole-<svg> layers, so they spin on the compositor
   (same structure as schoolhouse.js burstLayers; .spin-layer in the CSS sets the offsets and the spin). */
export function BurstLayers({ size, r1, r2, n, fill, stroke, rot = 0, reverse, still }: {
  size: number; r1: number; r2: number; n: number; fill: string; stroke: number; rot?: number; reverse?: boolean; still?: boolean;
}) {
  const c = size / 2;
  const pts = burstPoints(c, c, r1, r2, n, rot);
  const cls = cx('spin-layer', reverse && 'rev');
  const style = still ? { animation: 'none' } : undefined;
  return (
    <>
      <svg className={cx(cls, 'spin-shadow')} style={style} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
        <polygon points={pts} fill={INK} />
      </svg>
      <svg className={cls} style={style} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false">
        <polygon points={pts} fill={fill} stroke={INK} strokeWidth={stroke} strokeLinejoin="round" />
      </svg>
    </>
  );
}
