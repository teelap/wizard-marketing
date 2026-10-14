import { Star } from 'jtw-schoolhouse';

export const Scatter = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, padding: 12 }}>
    <Star color="yellow" size={72} />
    <Star color="pink" size={48} />
    <Star color="sky" size={36} />
  </div>
);
export const Mint = () => <div style={{ padding: 12 }}><Star color="mint" size={64} /></div>;
