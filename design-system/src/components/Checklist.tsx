import type { ReactNode } from 'react';

export interface ChecklistItem {
  /** What's included or what to do, as a plain statement. */
  text: ReactNode;
  /** Optional muted second line. */
  note?: ReactNode;
}

export interface ChecklistProps {
  items: Array<ChecklistItem | string>;
}

/**
 * Legal-pad checklist: square ink boxes ticked with a red marker check. For what's included and what you get.
 */
export function Checklist({ items }: ChecklistProps) {
  return (
    <ul className="checks">
      {items.map((it, i) => {
        const item = typeof it === 'string' ? { text: it } : it;
        return <li key={i}>{item.text}{item.note && <small>{item.note}</small>}</li>;
      })}
    </ul>
  );
}
