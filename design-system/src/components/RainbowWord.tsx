import { COLORS, RAINBOW_WORD, type Hue } from '../art';
import { cx } from '../util';

export interface RainbowWordProps {
  /** The word (or two) to colour letter by letter. Keep the full stop: "dreams." */
  children: string;
  /** Leave one colour out of the cycle, e.g. `yellow` when the word sits on a yellow ground. */
  skip?: Hue;
  /** Ink outline and shadow around the letters (on by default, as on the site). */
  outline?: boolean;
  className?: string;
}

/**
 * A word set in rainbow letters (red, orange, yellow, mint, sky, pink, teal) with the cartoon ink outline. The signature move: one per screen, on the payoff word.
 */
export function RainbowWord({ children, skip, outline = true, className }: RainbowWordProps) {
  const cols = RAINBOW_WORD.filter(k => k !== skip).map(k => COLORS[k]);
  let k = 0;
  const letters = Array.from(children).map((ch, i) => {
    if (/\s/.test(ch)) return ch;
    const isLetter = /\p{L}/u.test(ch);
    const style = { '--k': k, ...(isLetter ? { color: cols[k % cols.length] } : {}) } as Record<string, string | number>;
    if (isLetter) k++;
    return <span key={i} style={style}>{ch}</span>;
  });
  return (
    <span className={cx(outline && 'pop', 'rainbow', className)}>
      <span className="vh">{children}</span>
      <span className="rainbow-letters" aria-hidden="true">{letters}</span>
    </span>
  );
}
