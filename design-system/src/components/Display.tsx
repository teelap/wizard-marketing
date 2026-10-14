import type { ReactNode } from 'react';
import { cx } from '../util';

const SIZES = {
  xl: 'clamp(3.4rem,8vw,7.2rem)',
  lg: 'clamp(2.6rem,7vw,5.4rem)',
  md: 'clamp(1.9rem,3.4vw,2.5rem)',
  sm: '1.6rem',
} as const;

export interface DisplayProps {
  /** The heading text. Mix in `Highlight`, `Pop` or `RainbowWord` for the one word that matters. */
  children: ReactNode;
  /** The element to render. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** xl = hero headline, lg = section title, md = in-article heading, sm = card title. */
  size?: keyof typeof SIZES;
  /** Set when the heading contains a `Highlight`, so the yellow box has room. */
  hasHighlight?: boolean;
  className?: string;
}

/**
 * Display heading in Fraunces Black (soft, wonky cut): the brand's voice in type. Tight leading, slight negative tracking.
 */
export function Display({ children, as: Tag = 'h2', size = 'lg', hasHighlight, className }: DisplayProps) {
  return <Tag className={cx('disp', hasHighlight && 'has-hl', className)} style={{ fontSize: SIZES[size] }}>{children}</Tag>;
}
