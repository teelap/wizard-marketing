import type { ReactNode } from 'react';
import { cssVar, type Hue } from '../art';

export interface PopProps {
  /** A short word or number. Does not wrap. */
  children: ReactNode;
  /** Fill colour inside the ink outline. Defaults to the surrounding text colour. */
  color?: Hue;
}

/**
 * Display word with a thick ink outline and a hard drop shadow, like cartoon lettering. Use for big numbers and single words.
 */
export function Pop({ children, color }: PopProps) {
  return <span className="pop" style={color ? { color: cssVar(color) } : undefined}>{children}</span>;
}
