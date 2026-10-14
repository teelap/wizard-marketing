import { cssVar, type Hue } from '../art';
import type { Style } from '../util';

/** A social network the kit has a glyph for. */
export type Network = 'tiktok' | 'linkedin' | 'youtube' | 'instagram' | 'facebook' | 'x' | 'threads';

export interface SocialLink {
  network: Network;
  href: string;
  /** Coin colour. */
  color?: Hue;
}

const GLYPH: Record<Network, string> = {
  tiktok: 'fa-tiktok', linkedin: 'fa-linkedin-in', youtube: 'fa-youtube', instagram: 'fa-instagram',
  facebook: 'fa-facebook-f', x: 'fa-x-twitter', threads: 'fa-threads',
};
const LABEL: Record<Network, string> = {
  tiktok: 'TikTok', linkedin: 'LinkedIn', youtube: 'YouTube', instagram: 'Instagram', facebook: 'Facebook', x: 'X', threads: 'Threads',
};

/** Jake's own accounts, in the order the site shows them. */
export const JAKE_SOCIALS: SocialLink[] = [
  { network: 'tiktok', href: 'https://www.tiktok.com/@itsjakethewizard', color: 'pink' },
  { network: 'linkedin', href: 'https://www.linkedin.com/in/jacob-tlapek-10b55962/', color: 'sky' },
  { network: 'youtube', href: 'https://www.youtube.com/@itsjakethewizard', color: 'red' },
  { network: 'instagram', href: 'https://www.instagram.com/itsjakethewizard/', color: 'yellow' },
];

export interface SocialLinksProps {
  /** Defaults to Jake's TikTok, LinkedIn, YouTube and Instagram. */
  links?: SocialLink[];
}

/**
 * Row of round social coins: ink outline, brand-colour fill, Font Awesome brand glyph.
 */
export function SocialLinks({ links = JAKE_SOCIALS }: SocialLinksProps) {
  return (
    <div className="socials" style={{ marginTop: 0 }}>
      {links.map(l => (
        <a key={l.network} href={l.href} style={{ '--c': cssVar(l.color ?? 'paper') } as Style} target="_blank" rel="noopener noreferrer" aria-label={LABEL[l.network]}>
          <i className={`fa-brands ${GLYPH[l.network]}`} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
