import type { ReactNode } from 'react';
import { cx } from '../util';

export interface KickerProps {
  /** Two to five words, plain. Rendered uppercase with wide tracking. */
  children: ReactNode;
  /** Paper pill with an ink outline instead of the solid ink pill. Use on dark or coloured grounds. */
  light?: boolean;
  className?: string;
}

/**
 * Small all-caps label pill that sits above a heading and says what the section is ("Consulting · Mastermind · Book").
 */
export function Kicker({ children, light, className }: KickerProps) {
  return <span className={cx('kicker', light && 'kicker--light', className)}>{children}</span>;
}
