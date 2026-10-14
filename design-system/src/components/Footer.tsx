import type { ReactNode } from 'react';
import { Logo } from './Logo';
import { RainbowArch } from './RainbowArch';

export interface FooterLink { label: string; href: string }

export interface FooterProps {
  /** Pill links under the badge. Defaults to the site's pages. */
  links?: FooterLink[];
  /** Small underlined legal links. */
  legal?: FooterLink[];
  /** Line inside the arch. */
  note?: ReactNode;
}

const LINKS: FooterLink[] = [
  { label: 'Consulting', href: '/consulting' }, { label: 'Mastermind', href: '/mastermind' },
  { label: 'Eight Dominoes', href: '/eight-dominoes' }, { label: 'Podcast', href: '/podcast-guest' },
  { label: 'Tools', href: '/tools' }, { label: 'Grimoire', href: '/grimoire' }, { label: 'Projects', href: '/projects' },
];
const LEGAL: FooterLink[] = [
  { label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' }, { label: 'AI Information', href: '/ai-information' },
];

const NOTES = [
  { ch: '♪', style: { left: '4%', top: '38%', fontSize: 'clamp(40px,7vw,86px)', rotate: '-12deg' } },
  { ch: '♫', style: { right: '5%', top: '30%', fontSize: 'clamp(44px,8vw,96px)', rotate: '10deg' } },
  { ch: '♫', style: { left: '33%', top: '70%', fontSize: 'clamp(22px,3.4vw,44px)', rotate: '8deg' } },
  { ch: '♪', style: { right: '33%', top: '68%', fontSize: 'clamp(22px,3.6vw,48px)', rotate: '-10deg' } },
];

/**
 * Site footer: the badge logo, pill links, legal links, and a giant rainbow arch with floating music notes and the copyright inside.
 */
export function Footer({ links = LINKS, legal = LEGAL, note = `© ${new Date().getFullYear()} Jake Tlapek. All rights reserved. Built with scars.` }: FooterProps) {
  return (
    <footer className="foot">
      <Logo variant="badge" size={68} textSize={34} href="/" className="foot-brand" />
      <nav className="foot-nav" aria-label="Footer navigation">{links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}</nav>
      <nav className="legal" aria-label="Legal links">{legal.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}</nav>
      <div className="arch">
        <RainbowArch variant="arch" />
        {NOTES.map((n, i) => <span key={i} className="note" aria-hidden="true" style={n.style}>{n.ch}</span>)}
        <p className="inside">{note}</p>
      </div>
    </footer>
  );
}
