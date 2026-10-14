import { useEffect, useState, type ReactNode } from 'react';
import { heroGeometry, type Hue } from '../art';
import { PHOTOS, type PhotoName } from '../photos';
import { cx, type Style } from '../util';
import { RainbowBend } from './RainbowBend';
import { Starburst } from './Starburst';

export interface HeroSticker {
  /** Big line. */
  title: ReactNode;
  /** Small all-caps line above it. */
  label?: string;
  color?: Hue;
}

export interface HeroProps {
  /** The headline. On inner pages: a short phrase with one Highlight or RainbowWord. */
  title: ReactNode;
  /** Small display line above a giant title (the homepage pattern: "People don't buy features." then "They buy dreams."). */
  lead?: ReactNode;
  /** Label pill above the headline. */
  kicker?: string;
  /** One or two plain sentences under the headline. */
  lede?: ReactNode;
  /** Usually a ButtonRow with a main and a ghost Button. */
  actions?: ReactNode;
  /** One of Jake's approved photos, shown in a TV frame. Leave out for a text-only hero. */
  photo?: PhotoName;
  /** Starburst slapped on the photo's corner. */
  sticker?: HeroSticker;
  /** Mirror the layout: rainbow down the right, photo on the left. */
  flip?: boolean;
  /** Anything else under the actions (fine print, breadcrumbs). */
  children?: ReactNode;
  /** Set when the title contains a Highlight. */
  hasHighlight?: boolean;
}

/**
 * Page opener framed by the rainbow bend: kicker, headline, lede and buttons on one side, Jake's photo in a tilted TV with a starburst sticker on the other.
 */
export function Hero({ title, lead, kicker, lede, actions, photo, sticker, flip, children, hasHighlight }: HeroProps) {
  const [vw, setVw] = useState(() => (typeof window === 'undefined' ? 1400 : window.innerWidth));
  useEffect(() => {
    const on = () => setVw(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  const p = photo ? PHOTOS[photo] : undefined;
  return (
    <section className={cx('hero', flip && 'hero--flip', !p && 'hero--solo')} style={{ '--band': `${heroGeometry(vw).band}px` } as Style}>
      <div className="hero-art" aria-hidden="true"><RainbowBend /></div>
      <div className="hero-grid">
        <div className="hero-copy">
          {kicker && <span className="kicker">{kicker}</span>}
          {lead
            ? <h1 className="hero-title disp"><span className="lead">{lead}</span><span className="big">{title}</span></h1>
            : <h1 className={hasHighlight ? 'has-hl' : undefined}>{title}</h1>}
          {lede && <p className="lede">{lede}</p>}
          {actions && <div className="cta-row">{actions}</div>}
          {children}
        </div>
        {p && (
          <div className="hero-photo">
            {sticker && <Starburst title={sticker.title} label={sticker.label} color={sticker.color} />}
            <div className="tv"><img src={p.src} alt={p.alt} style={{ objectPosition: p.position }} /></div>
          </div>
        )}
      </div>
    </section>
  );
}
