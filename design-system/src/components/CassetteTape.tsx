import { cssVar, type Hue } from '../art';
import type { Style } from '../util';

export interface CassetteTapeProps {
  /** Handwritten label on the tape: the show's name. */
  label: string;
  /** Title under the tape: the episode or show. */
  title: string;
  /** One line under the title: the episode name and host. */
  subtitle?: string;
  /** Shell colour. */
  color?: Hue;
  /** Side letter in the label's corner. */
  side?: 'A' | 'B';
  /** Link to the episode. */
  href?: string;
}

/**
 * Cassette tape with a marker label and turning reels, for podcast episodes, interviews and anything you can listen to.
 */
export function CassetteTape({ label, title, subtitle, color = 'red', side = 'A', href }: CassetteTapeProps) {
  const body = (
    <>
      <div className="tape" aria-hidden="true">
        <div className="tape-label">
          <strong>{label}</strong><span className="tape-side">{side}</span>
          <div className="tape-window"><span className="reel" /><span className="reel" /></div>
        </div>
        <div className="tape-foot" />
      </div>
      <div className="tape-meta"><h3>{title}</h3>{subtitle && <p>{subtitle}</p>}</div>
    </>
  );
  const style = { '--c': cssVar(color), maxWidth: 380 } as Style;
  return href
    ? <a className="tape-link" style={style} href={href} target="_blank" rel="noopener noreferrer">{body}</a>
    : <div className="tape-link" style={style}>{body}</div>;
}
