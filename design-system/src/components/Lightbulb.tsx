import { COLORS, INK, f1 } from '../art';

export interface LightbulbProps {
  /** Width in px. */
  size?: number;
  /** Blink the rays (on by default). */
  blink?: boolean;
}

/**
 * Cartoon lightbulb with blinking rays, for "idea" moments: tips, takeaways, the newsletter.
 */
export function Lightbulb({ size = 120, blink = true }: LightbulbProps) {
  const cx = 200, cy = 200, r = 90;
  const nw = r * .9, by = cy + r * .82;
  const bulb = `M ${f1(cx - r * .62)} ${f1(by)} A ${r} ${r} 0 1 1 ${f1(cx + r * .62)} ${f1(by)} L ${f1(cx + nw / 2)} ${f1(by + 70)} L ${f1(cx - nw / 2)} ${f1(by + 70)} Z`;
  const rays = Array.from({ length: 9 }, (_, k) => {
    const a = (-180 + k * 22.5) * Math.PI / 180;
    return { k, x1: f1(cx + (r + 40) * Math.cos(a)), y1: f1(cy + (r + 40) * Math.sin(a)), x2: f1(cx + (r + 110) * Math.cos(a)), y2: f1(cy + (r + 110) * Math.sin(a)) };
  });
  return (
    <div className="bulb" style={{ width: size }}>
      <svg viewBox="-20 -10 440 560" aria-hidden="true" focusable="false">
        {rays.map(ray => (
          <line key={ray.k} x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2} stroke={INK} strokeWidth={18} strokeLinecap="round"
            className={blink ? 'ray' : undefined} style={{ '--r': ray.k } as Record<string, number>} />
        ))}
        <path d={bulb} fill={INK} transform="translate(14 14)" />
        <path d={bulb} fill={COLORS.yellow} stroke={INK} strokeWidth={9} strokeLinejoin="round" />
        <path d={`M ${cx - 60} ${cy + 36} q 30 -52 60 0 q 30 52 60 0`} stroke={COLORS.orange} strokeWidth={12} fill="none" strokeLinecap="round" />
        <circle cx={f1(cx - r * .45)} cy={f1(cy - r * .35)} r={f1(r * .16)} fill="#FFF6C9" />
        {[COLORS.sky, COLORS.teal, COLORS.sky].map((col, k) => (
          <rect key={k} x={f1(cx - nw / 2 + 6)} y={f1(by + 80 + k * 46)} width={f1(nw - 12)} height={40} rx={14} fill={col} stroke={INK} strokeWidth={8} />
        ))}
        <path d={`M ${cx - 46} ${f1(by + 80 + 3 * 46)} q 46 46 92 0`} fill={INK} />
      </svg>
    </div>
  );
}
