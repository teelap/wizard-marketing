import { INK, hex, starPoints, type Hue } from '../art';

export interface StarProps {
  /** Fill colour. */
  color?: Hue;
  /** Width in px. */
  size?: number;
  /** Gentle twinkle (scale + turn). */
  twinkle?: boolean;
}

/**
 * Five-point star with an ink outline and offset shadow, for scattering around a heading or photo.
 */
export function Star({ color = 'yellow', size = 64, twinkle }: StarProps) {
  const pts = starPoints(50, 50, 44);
  return (
    <span style={{ display: 'inline-block', width: size, lineHeight: 0, ...(twinkle ? { animation: 'twinkle 2.6s ease-in-out infinite' } : {}) }} aria-hidden="true">
      <svg viewBox="0 0 100 100" style={{ display: 'block', width: '100%', overflow: 'visible' }} focusable="false">
        <g transform="translate(6 6)"><polygon points={pts} fill={INK} stroke={INK} strokeWidth={6} strokeLinejoin="round" /></g>
        <polygon points={pts} fill={hex(color, 'yellow')} stroke={INK} strokeWidth={6} strokeLinejoin="round" />
      </svg>
    </span>
  );
}
