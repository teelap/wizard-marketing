import { Starburst } from 'jtw-schoolhouse';

export const OutNow = () => (
  <div style={{ padding: 24 }}><Starburst inline label="Out now" title={<>Eight<br />Dominoes</>} /></div>
);
export const Price = () => (
  <div style={{ padding: 24 }}><Starburst inline label="From" title="$400" color="yellow" rotate={8} size={150} /></div>
);
export const Pink = () => (
  <div style={{ padding: 24 }}><Starburst inline label="Live calls" title={<>Twice a<br />week</>} color="pink" rotate={-6} size={160} /></div>
);
