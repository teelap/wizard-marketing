import type { ReactNode } from 'react';
import { cx } from '../util';

export interface CardProps {
  /** Card content: usually a Display size="sm" heading and a paragraph or two. */
  children: ReactNode;
  /**
   * plain = paper card; index = ruled index card (newsletter, notes); legal = yellow legal pad (fine print);
   * sticky = pink sticky note, tilted 2° (asides).
   */
  variant?: 'plain' | 'index' | 'legal' | 'sticky';
  /** Inner padding (on by default). */
  pad?: boolean;
  /** Makes the whole card a link that lifts on hover. */
  href?: string;
  className?: string;
}

/**
 * The base card: paper fill, 4px ink outline, 20px corners, 10px hard shadow. Everything boxed in the kit is one of these.
 */
export function Card({ children, variant = 'plain', pad = true, href, className }: CardProps) {
  const cls = cx('card', pad && 'card--pad', variant !== 'plain' && `card--${variant}`, className);
  return href ? <a className={cls} href={href}>{children}</a> : <div className={cls}>{children}</div>;
}
