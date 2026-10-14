import { COLORS, INK, RAINBOW, arcs, f1 } from '../art';

export interface VinylRecordProps {
  /** Width in px. */
  size?: number;
  /** Spin the rainbow label (on by default). */
  spin?: boolean;
}

/**
 * Vinyl record with a rainbow label that spins under a fixed glare, for quotes and anything audio.
 */
export function VinylRecord({ size = 250, spin = true }: VinylRecordProps) {
  const cx = 190, cy = 190, r = 180;
  const grooves: number[] = [];
  for (let rr = Math.round(r * .36); rr < r - 10; rr += 12) grooves.push(rr);
  const lr = r * .33, lw = lr / 9 * .85;
  const svgProps = { viewBox: '0 0 400 400', 'aria-hidden': true, focusable: false } as const;
  return (
    <div className="rec" style={{ width: size }}>
      <svg {...svgProps}>
        <circle cx={cx + 14} cy={cy + 14} r={r} fill={COLORS.maroon} />
        <circle cx={cx} cy={cy} r={r} fill={INK} />
        {grooves.map(g => <circle key={g} cx={cx} cy={cy} r={g} stroke="#3A3833" strokeWidth={2.5} fill="none" />)}
      </svg>
      <svg {...svgProps} className={spin ? 'rec-spin' : undefined}>
        {arcs(lr, lw, RAINBOW, 4).map((ring, i) => (
          <circle key={i} cx={cx} cy={cy} r={ring.r} stroke={ring.stroke} strokeWidth={ring.width} fill="none" transform={`rotate(180 ${cx} ${cy})`} />
        ))}
        <circle cx={cx} cy={cy} r={f1(lr - 9 * lw)} fill={COLORS.cream} stroke={INK} strokeWidth={4} />
        <circle cx={cx} cy={cy} r={8} fill={INK} />
        {[-1, 1].map(sgn => <circle key={sgn} cx={f1(cx + sgn * lr * .55)} cy={cy} r={6} fill={COLORS.cream} stroke={INK} strokeWidth={3} />)}
      </svg>
      <svg {...svgProps} className="rec-glare">
        <path d={`M ${f1(cx - r * .75)} ${f1(cy - r * .45)} A ${f1(r * .87)} ${f1(r * .87)} 0 0 1 ${f1(cx - r * .2)} ${f1(cy - r * .84)}`} stroke="#6B675E" strokeWidth={9} fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}
