import type { ReactNode } from 'react';
import { INK, cssVar, hex, type Hue } from '../art';
import { BurstLayers } from './BurstLayers';

export interface SealProps {
  /** A proof number from the approved bank: "$100M+", "2 exits", "110K+", "13 years". */
  value: ReactNode;
  /** Centre disc colour. */
  fill?: Hue;
  /** Starburst colour around the disc. */
  burst?: Hue;
  /** Burst rotation in degrees, so neighbouring seals don't line up. */
  rotate?: number;
  /** Spin the other way. */
  reverse?: boolean;
  /** Text colour; use `cream` on red, maroon, forest or navy discs. */
  valueColor?: Hue;
  /** Width in px (defaults to the site's 236). */
  size?: number;
  /** Stop the slow spin. */
  still?: boolean;
}

/**
 * Starburst seal: a coloured disc on a spinning starburst, holding one big proof number.
 */
export function Seal({ value, fill = 'sky', burst = 'pink', rotate = 0, reverse, valueColor, size, still }: SealProps) {
  return (
    <div className="seal" style={size ? { width: size } : undefined}>
      <BurstLayers size={300} r1={128} r2={108} n={18} fill={hex(burst, 'pink')} stroke={7} rot={rotate} reverse={reverse} still={still} />
      <svg viewBox="0 0 300 300" aria-hidden="true" focusable="false">
        <circle cx={156} cy={156} r={94} fill={INK} />
        <circle cx={146} cy={146} r={94} fill={hex(fill, 'sky')} stroke={INK} strokeWidth={7} />
      </svg>
      <b style={valueColor ? { color: cssVar(valueColor) } : undefined}>{value}</b>
    </div>
  );
}

export interface ProofSealItem extends SealProps {
  /** One line under the seal saying what the number means. */
  caption: ReactNode;
}

export interface ProofSealsProps {
  /** Three seals is the standard row. */
  items: ProofSealItem[];
}

/**
 * A row of starburst seals with captions: the proof strip under a hero.
 */
export function ProofSeals({ items }: ProofSealsProps) {
  return (
    <div className="proof-grid">
      {items.map(({ caption, ...seal }, i) => (
        <div className="proof-item" key={i}>
          <Seal reverse={i % 2 === 1} rotate={i * 7} {...seal} />
          <p>{caption}</p>
        </div>
      ))}
    </div>
  );
}
