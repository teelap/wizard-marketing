import type { ReactNode } from 'react';
import { cssVar, type Hue } from '../art';
import type { Style } from '../util';

export interface PillProps {
  /** One to three words: a format, a status, a fact ("Paperback", "Free to join"). */
  children: ReactNode;
  /** Fill colour. Defaults to paper. */
  color?: Hue;
  /** A dashed outline for "coming soon" facts. */
  dashed?: boolean;
}

/**
 * Small all-caps tag with an ink outline and a brand-colour fill.
 */
export function Pill({ children, color, dashed }: PillProps) {
  const style: Style = { ...(color ? { '--c': cssVar(color) } : {}), ...(dashed ? { borderStyle: 'dashed' } : {}) };
  return <span className="pill" style={style}>{children}</span>;
}
