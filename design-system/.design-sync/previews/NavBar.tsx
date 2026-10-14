import { NavBar } from 'jtw-schoolhouse';

export const SiteMenu = () => <NavBar links={[
  { label: 'Consulting', href: '#', current: true },
  { label: 'Mastermind', href: '#' },
  { label: 'Eight Dominoes', href: '#' },
  { label: 'Grimoire', href: '#' },
  { label: 'Projects', href: '#' },
]} />;
