import hat from '../assets/wizard-hat.webp';
import badge from '../assets/wizard-badge.webp';
import { cx } from '../util';

export interface LogoProps {
  /** `hat` is the main mark (headers, nav). `badge` is the hat on a starburst coin (footers, avatars, app icons). */
  variant?: 'hat' | 'badge';
  /** Mark size in px. The nav uses 46, the footer badge 68. */
  size?: number;
  /** Set "The Wizard" beside the mark in the display face. */
  wordmark?: boolean;
  /** Wordmark size in px (defaults to 60% of the mark). */
  textSize?: number;
  /** Makes the logo a link. */
  href?: string;
  className?: string;
}

/**
 * Jake the Wizard's logo: the classic blue wizard hat, or the hat on a starburst badge, with an optional "The Wizard" wordmark.
 */
export function Logo({ variant = 'hat', size = 46, wordmark = true, textSize, href, className }: LogoProps) {
  const mark = <img className="brand-mark" src={variant === 'badge' ? badge : hat} width={size} height={size} alt="" style={{ width: size, height: size }} />;
  const label = wordmark ? 'The Wizard' : null;
  const style = { fontSize: textSize ?? Math.round(size * 0.6) };
  return href
    ? <a className={cx('brand disp', className)} href={href} style={style} aria-label={wordmark ? undefined : 'The Wizard'}>{mark}{label}</a>
    : <span className={cx('brand disp', className)} style={style} role={wordmark ? undefined : 'img'} aria-label={wordmark ? undefined : 'The Wizard'}>{mark}{label}</span>;
}
