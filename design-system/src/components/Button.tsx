import type { MouseEventHandler, ReactNode } from 'react';
import { cx } from '../util';

export interface ButtonProps {
  /** An order, not an ask: "Book the call", "Join free", "Get the book". Never "Learn more" or "Submit". */
  children: ReactNode;
  /** yellow = the main action; ghost = the secondary action beside it; red = buy/send; ink = on yellow or busy grounds. */
  variant?: 'yellow' | 'ghost' | 'red' | 'ink';
  /** sm is for the nav bar and tight rows. */
  size?: 'md' | 'sm';
  /** Full width of its container. */
  block?: boolean;
  /** Renders a link instead of a button. */
  href?: string;
  /** Font Awesome icon after the label, e.g. "fa-arrow-right". */
  icon?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
}

/**
 * Pill button in the display face with a thick ink outline and a hard offset shadow that lifts on hover and squashes on press.
 */
export function Button({ children, variant = 'yellow', size = 'md', block, href, icon, type = 'button', disabled, onClick, className }: ButtonProps) {
  const cls = cx('btn', variant !== 'yellow' && `btn-${variant}`, size === 'sm' && 'btn-sm', block && 'btn-block', className);
  const inner = <>{children}{icon && <i className={cx('fa-solid', icon)} aria-hidden="true" />}</>;
  return href
    ? <a className={cls} href={href} onClick={onClick}>{inner}</a>
    : <button className={cls} type={type} disabled={disabled} onClick={onClick}>{inner}</button>;
}

export interface ButtonRowProps {
  /** Usually one main `Button` and one `ghost` Button. */
  children: ReactNode;
  /** Centre the row (for centred sections). */
  center?: boolean;
}

/**
 * A wrapping row of buttons with the kit's spacing (16px rows, 22px columns).
 */
export function ButtonRow({ children, center }: ButtonRowProps) {
  return <div className={cx('cta-row', center && 'center')} style={{ marginTop: 0 }}>{children}</div>;
}
