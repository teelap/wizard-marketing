import type { ReactNode } from 'react';
import { cssVar, type Hue } from '../art';
import type { Style } from '../util';
import { Icon, type IconName } from './Icon';

export interface ServiceCardProps {
  /** Offer name: "Private consulting". */
  title: string;
  /** Two or three plain sentences: what it is and who it's for. */
  children: ReactNode;
  /** Colour of the top band and the CTA underline. */
  color?: Hue;
  /** Illustrated icon that sits on the band's edge. */
  icon?: IconName;
  /** Small pill in the band's corner: a price or status ("From $400", "Free to join", "Out now"). */
  tag?: string;
  /** All-caps link line at the bottom: an order ("Book a session"). */
  cta?: string;
  /** Makes the card a link. */
  href?: string;
}

/**
 * Offer card: coloured top band, illustrated icon on its edge, price pill, title, two lines of copy and an all-caps call to action.
 */
export function ServiceCard({ title, children, color = 'yellow', icon, tag, cta, href }: ServiceCardProps) {
  const style: Style = { '--c': cssVar(color) };
  const body = (
    <>
      <div className="svc-top">
        {icon && <span className="svc-icon svc-icon--art"><Icon name={icon} size={88} /></span>}
        {tag && <span className="svc-tag">{tag}</span>}
      </div>
      <div className="svc-body">
        <h3>{title}</h3>
        <p>{children}</p>
        {cta && <span className="svc-cta">{cta}<i className="fa-solid fa-arrow-right" aria-hidden="true" /></span>}
      </div>
    </>
  );
  return href ? <a className="svc card" href={href} style={style}>{body}</a> : <div className="svc card" style={style}>{body}</div>;
}
