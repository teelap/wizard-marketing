import type { ReactNode } from 'react';

export interface HighlightProps {
  /** One or two words, usually the last word of a display heading, including its full stop. */
  children: ReactNode;
}

/**
 * Yellow highlighter box with an ink outline and offset shadow, for the key word in a display heading ("Ways to work together.").
 */
export function Highlight({ children }: HighlightProps) {
  return <span className="hl">{children}</span>;
}
