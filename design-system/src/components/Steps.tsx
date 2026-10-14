import type { ReactNode } from 'react';
import { cssVar, type Hue } from '../art';
import type { Style } from '../util';

export interface Step {
  /** Short step name. */
  title: string;
  /** One or two sentences. */
  text: ReactNode;
  /** Number coin colour (cycles yellow, sky, pink, mint when left out). */
  color?: Hue;
}

export interface StepsProps {
  /** The steps, in order. */
  items: Step[];
}

const CYCLE: Hue[] = ['yellow', 'sky', 'pink', 'mint'];

/**
 * Numbered steps: a coloured number coin beside each step's title and text. Only for things that really happen in order.
 */
export function Steps({ items }: StepsProps) {
  return (
    <ol className="steps">
      {items.map((s, i) => (
        <li key={i}>
          <span className="num" style={{ '--c': cssVar(s.color ?? CYCLE[i % CYCLE.length]) } as Style}>{i + 1}</span>
          <div><h3>{s.title}</h3><p>{s.text}</p></div>
        </li>
      ))}
    </ol>
  );
}
