import type { ReactNode } from 'react';

export interface FaqItem {
  /** The question as a buyer would ask it. */
  q: string;
  /** A direct answer. Lead with yes/no or the number. */
  a: ReactNode;
}

export interface FaqListProps {
  items: FaqItem[];
  /** Open the first answer. */
  openFirst?: boolean;
}

/**
 * Accordion of questions: each a paper card with a yellow "+" coin that turns pink and rotates to "×" when open.
 */
export function FaqList({ items, openFirst }: FaqListProps) {
  return (
    <div className="faq">
      {items.map((it, i) => (
        <details key={i} open={openFirst && i === 0}>
          <summary>{it.q}</summary>
          <div>{typeof it.a === 'string' ? <p>{it.a}</p> : it.a}</div>
        </details>
      ))}
    </div>
  );
}
