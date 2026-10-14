import { SocialLinks } from 'jtw-schoolhouse';

export const JakesAccounts = () => <div style={{ padding: 12 }}><SocialLinks /></div>;
export const AllNetworks = () => (
  <div style={{ padding: 12 }}>
    <SocialLinks links={[
      { network: 'tiktok', href: '#', color: 'pink' },
      { network: 'linkedin', href: '#', color: 'sky' },
      { network: 'youtube', href: '#', color: 'red' },
      { network: 'instagram', href: '#', color: 'yellow' },
      { network: 'facebook', href: '#', color: 'mint' },
      { network: 'x', href: '#', color: 'paper' },
      { network: 'threads', href: '#', color: 'salmon' },
    ]} />
  </div>
);
