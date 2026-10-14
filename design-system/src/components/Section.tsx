import type { ReactNode } from 'react';
import { cx } from '../util';

export interface SectionProps {
  children: ReactNode;
  /** Ground colour. cream is the page; yellow, teal, sky, pink and paper are full-bleed bands with ink rules top and bottom. */
  tone?: 'cream' | 'yellow' | 'teal' | 'sky' | 'pink' | 'paper';
  /** Less vertical padding (48 to 80px instead of 72 to 128px). */
  tight?: boolean;
  /** 860px reading column instead of the 1240px page width. */
  narrow?: boolean;
  id?: string;
}

/**
 * A page section: full-bleed ground colour, generous vertical rhythm, content centred in the 1240px column with the responsive gutter.
 */
export function Section({ children, tone = 'cream', tight, narrow, id }: SectionProps) {
  return (
    <section id={id} className={cx('sec', tight && 'sec--tight', tone !== 'cream' && `sec--${tone}`)}>
      <div className={cx('wrap', narrow && 'wrap--narrow')}>{children}</div>
    </section>
  );
}

export interface SectionHeadProps {
  /** The display heading. End it with a full stop; put the key word in a Highlight. */
  title: ReactNode;
  /** Label pill above the heading. */
  kicker?: string;
  /** One or two sentences under the heading. */
  children?: ReactNode;
  align?: 'center' | 'left';
  /** Set when the title contains a Highlight. */
  hasHighlight?: boolean;
}

/**
 * Section opener: kicker pill, big display heading, and a short plain lead line.
 */
export function SectionHead({ title, kicker, children, align = 'center', hasHighlight }: SectionHeadProps) {
  return (
    <div className={cx('head', align === 'left' && 'head--left')}>
      {kicker && <span className="kicker">{kicker}</span>}
      <h2 className={hasHighlight ? 'has-hl' : undefined}>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
