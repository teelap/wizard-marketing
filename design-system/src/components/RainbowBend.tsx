import { useLayoutEffect, useRef, useState } from 'react';
import { RAINBOW, bend, heroGeometry } from '../art';

export interface RainbowBendProps {
  /** Fixed drawing size in px. Leave both out to fill the positioned parent (it measures itself). */
  width?: number;
  height?: number;
  /** Mirror it so the band runs down the right side and off to the left. */
  flip?: boolean;
  /** Stripe weight: small (phones), mid (tablets), large (desktop). Defaults to the viewport's. */
  weight?: 'small' | 'mid' | 'large';
}

const WEIGHT_WIDTH = { small: 400, mid: 800, large: 1400 } as const;

/**
 * Nine-stripe rainbow band that drops down the left edge, bends 90° and runs off along the bottom: the frame of every hero.
 */
export function RainbowBend({ width, height, flip, weight }: RainbowBendProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ w: number; h: number } | null>(width && height ? { w: width, h: height } : null);
  const fixed = Boolean(width && height);

  useLayoutEffect(() => {
    if (fixed) { setBox({ w: width as number, h: height as number }); return; }
    const el = ref.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fixed, width, height]);

  const vw = weight ? WEIGHT_WIDTH[weight] : (typeof window === 'undefined' ? 1400 : window.innerWidth);
  const g = heroGeometry(vw);
  const art = box && box.w > 0 && box.h > 0 ? (
    <svg width={box.w} height={box.h} viewBox={`0 0 ${box.w} ${box.h}`} style={{ display: 'block', transform: flip ? 'scaleX(-1)' : undefined }} aria-hidden="true" focusable="false">
      {bend(g.xl, box.h - g.mb, g.w, RAINBOW, g.r0, g.o, box.w + 12).map((p, i) => (
        <path key={i} d={p.d} stroke={p.stroke} strokeWidth={p.width} fill="none" />
      ))}
    </svg>
  ) : null;

  return fixed
    ? <div style={{ width, height, overflow: 'hidden' }}>{art}</div>
    : <div ref={ref} style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>{art}</div>;
}
