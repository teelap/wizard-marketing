import { GrimoireCard } from 'jtw-schoolhouse';

export const TextCard = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}>
    <GrimoireCard title="The Objection Is Never the Objection" category="Sales" type="Essay" date="September 3, 2026" minutes={5}
      excerpt="When a buyer says your price is too high, they are almost never talking about price." />
  </div>
);
export const WithCover = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}>
    <GrimoireCard title="Share of Brand Voice" category="Strategy" type="Case study" date="June 14, 2026" minutes={7} color="sky"
      cover="https://www.jakethewizard.com/dev_assets/photos/jake-rainbow-wall-5684-800.webp"
      excerpt="The one metric most business owners overlook, and how to measure it." />
  </div>
);
