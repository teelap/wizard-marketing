import { useState } from 'react';
import { Logo } from './Logo';

export interface NavLink {
  label: string;
  href: string;
  /** Marks the current page (ink pill). */
  current?: boolean;
}

export interface NavBarProps {
  /** Defaults to the site's main menu. */
  links?: NavLink[];
  /** The yellow button on the right. */
  cta?: { label: string; href: string };
}

const SITE_LINKS: NavLink[] = [
  { label: 'Consulting', href: '/consulting' },
  { label: 'Mastermind', href: '/mastermind' },
  { label: 'Eight Dominoes', href: '/eight-dominoes' },
  { label: 'Grimoire', href: '/grimoire' },
  { label: 'Projects', href: '/projects' },
];

/**
 * Sticky top bar: hat logo and "The Wizard", all-caps pill links, a small yellow call-to-action button. Folds into a round menu button below 1200px.
 */
export function NavBar({ links = SITE_LINKS, cta = { label: 'Work with Jake', href: '/consulting' } }: NavBarProps) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav-in" style={{ position: 'relative' }}>
        <Logo href="/" />
        <ul className={open ? 'nav-links active' : 'nav-links'}>
          {links.map(l => <li key={l.href}><a href={l.href} aria-current={l.current ? 'page' : undefined}>{l.label}</a></li>)}
        </ul>
        {cta && <a className="btn btn-sm nav-cta" href={cta.href}>{cta.label}</a>}
        <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          <i className={open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
