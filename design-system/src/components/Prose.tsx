import type { ReactNode } from 'react';

export interface ProseProps {
  /** Plain HTML elements: h2, h3, p, ul/ol, blockquote, a, code, hr, img, table. */
  children: ReactNode;
}

/**
 * Long-form text (articles, legal pages): 72-character measure, display-face headings, wavy red links, coloured dot bullets, carded blockquotes, rainbow rules.
 */
export function Prose({ children }: ProseProps) {
  return <div className="prose">{children}</div>;
}
