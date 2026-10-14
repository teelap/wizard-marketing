import { cssVar, type Hue } from '../art';
import type { Style } from '../util';

export interface ReportCardProps {
  /** The client's company. */
  org: string;
  /** The real testimonial, verbatim, without quote marks (they are added). */
  quote: string;
  /** First name of the person quoted. */
  name: string;
  /** Pill colour. */
  color?: Hue;
  /** The red marker grade stamped in the corner. */
  grade?: string;
  /** Tilt in degrees (alternate -1.2, .8, -.5 in a row). */
  tilt?: number;
}

/**
 * Testimonial as a graded school report card: company pill, red marker "A+" stamp, the quote, and who said it.
 */
export function ReportCard({ org, quote, name, color = 'yellow', grade = 'A+', tilt = 0 }: ReportCardProps) {
  return (
    <figure className="report card" style={{ '--c': cssVar(color), rotate: `${tilt}deg` } as Style}>
      <div className="rhead"><span className="rpill">{org}</span><span className="grade" aria-hidden="true">{grade}</span></div>
      <blockquote>“{quote}”</blockquote>
      <figcaption>{name} <span>· {org}</span></figcaption>
    </figure>
  );
}
