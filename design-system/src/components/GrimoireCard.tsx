import { cssVar, type Hue } from '../art';

export interface GrimoireCardProps {
  /** Post title. */
  title: string;
  /** One or two plain sentences: the post's point. */
  excerpt: string;
  /** Topic pill: "Sales", "SEO", "AI". */
  category: string;
  /** Format pill: "Essay", "Case study", "Video". */
  type?: string;
  /** Display date, e.g. "September 3, 2026". */
  date: string;
  /** Minutes to read. */
  minutes?: number;
  /** Cover image URL (16:9). Without one the card is a typed index card with a red rule. */
  cover?: string;
  /** Category pill colour (the site cycles salmon, sky, mint). */
  color?: Hue;
  href?: string;
}

/**
 * Blog post card for the Grimoire: optional 16:9 cover, topic and format pills, title, a typewriter excerpt, date and read time.
 */
export function GrimoireCard({ title, excerpt, category, type, date, minutes = 5, cover, color = 'salmon', href = '#' }: GrimoireCardProps) {
  return (
    <a className={cover ? 'grimoire-card' : 'grimoire-card grimoire-card--text'} href={href} style={{ maxWidth: 380 }}>
      {cover && <img className="grimoire-card-cover" src={cover} alt="" />}
      <div className="grimoire-card-body">
        <div className="grimoire-card-meta">
          <span className="grimoire-cat" style={{ background: cssVar(color) }}>{category}</span>
          {type && <span className="grimoire-type">{type}</span>}
        </div>
        <h3 className="grimoire-card-title">{title}</h3>
        <p className="grimoire-card-excerpt">{excerpt}</p>
        <div className="grimoire-card-foot"><span>{date} · {minutes} min read</span><span>Read →</span></div>
      </div>
    </a>
  );
}
