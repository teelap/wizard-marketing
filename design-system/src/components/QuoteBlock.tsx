import type { ReactNode } from 'react';
import { VinylRecord } from './VinylRecord';

export interface QuoteBlockProps {
  /** The quote, verbatim, without quote marks (a big red mark is drawn). */
  quote: ReactNode;
  /** Who said it and why they matter, in one line. */
  cite: ReactNode;
  /** Spinning record beside the quote (on by default; stacks above on phones). */
  record?: boolean;
}

/**
 * Big italic pull quote with an oversized red quote mark, beside a spinning vinyl record. For endorsements and Jake's signature lines.
 */
export function QuoteBlock({ quote, cite, record = true }: QuoteBlockProps) {
  return (
    <figure className="quote" style={record ? undefined : { gridTemplateColumns: 'minmax(0,1fr)' }}>
      {record && <VinylRecord size={250} />}
      <div>
        <span className="mark" aria-hidden="true">“</span>
        <blockquote>{quote}”</blockquote>
        <cite>{cite}</cite>
      </div>
    </figure>
  );
}
