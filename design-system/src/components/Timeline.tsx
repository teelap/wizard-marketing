import type { ReactNode } from 'react';
import { cssVar, type Hue } from '../art';
import type { Style } from '../util';

export interface TimelineStop {
  /** The year in the coin. */
  year: string;
  title: string;
  text: ReactNode;
  /** Coin and card-stripe colour. */
  color?: Hue;
  /** Use `cream` on red, maroon, forest or navy coins. */
  yearColor?: Hue;
}

export interface TimelineProps {
  /** Newest first. Cards alternate sides of the road on desktop. */
  stops: TimelineStop[];
}

/**
 * A rainbow road running down the page with year coins on it and cards on alternating sides: Jake's story, a company history.
 */
export function Timeline({ stops }: TimelineProps) {
  return (
    <ol className="road">
      {stops.map((s, i) => (
        <li key={i} className="stop" style={{ '--c': cssVar(s.color ?? 'yellow') } as Style}>
          <span className="year" style={s.yearColor ? { color: cssVar(s.yearColor) } : undefined}>{s.year}</span>
          <div className="card"><h3>{s.title}</h3><p>{s.text}</p></div>
        </li>
      ))}
    </ol>
  );
}
