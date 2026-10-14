import type { ReactNode } from 'react';
import { hex, type Hue } from '../art';
import { cx, type Style } from '../util';
import { BurstLayers } from './BurstLayers';

export interface StarburstProps {
  /** The big line, two or three words ("Eight Dominoes", "$400"). Use <br/> to break it. */
  title: ReactNode;
  /** Small all-caps line above the title ("Out now", "From"). */
  label?: string;
  /** Burst colour. */
  color?: Hue;
  /** Width in px. The hero sticker is 176. */
  size?: number;
  /** Tilt in degrees (the site uses -10 to 12). */
  rotate?: number;
  /** Makes the sticker a link. */
  href?: string;
  /**
   * The sticker is absolutely positioned by default so it can be slapped on a corner of a photo or card
   * (set `style` top/left/right/bottom). `inline` places it in normal flow instead.
   */
  inline?: boolean;
  /** Stop the slow spin. */
  still?: boolean;
  /** Placement when not inline, e.g. { left: -40, top: -36 }. */
  style?: Style;
  className?: string;
}

/**
 * Spinning starburst sticker with an ink shadow, slapped on the corner of a photo or card to shout one short fact.
 */
export function Starburst({ title, label, color = 'yellow', size = 176, rotate = -10, href, inline, still, style, className }: StarburstProps) {
  const s: Style = { width: size, rotate: `${rotate}deg`, ...(inline ? { position: 'relative', display: 'inline-grid' } : {}), ...style };
  const body = (
    <>
      <BurstLayers size={200} r1={92} r2={76} n={16} fill={hex(color, 'yellow')} stroke={6} still={still} />
      <span>{label && <small>{label}</small>}<b style={{ fontSize: Math.round(size * 0.142) }}>{title}</b></span>
    </>
  );
  return href
    ? <a className={cx('sticker', className)} href={href} style={s}>{body}</a>
    : <div className={cx('sticker', className)} style={s}>{body}</div>;
}
