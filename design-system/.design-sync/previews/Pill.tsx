import { Pill } from 'jtw-schoolhouse';

export const BookFormats = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
    <Pill color="yellow">Paperback</Pill>
    <Pill color="sky">Kindle</Pill>
    <Pill color="pink">Free on Kindle Unlimited</Pill>
  </div>
);
export const ComingSoon = () => <Pill dashed>Hardcover &amp; audiobook on the way</Pill>;
export const Statuses = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
    <Pill color="mint">Free to join</Pill>
    <Pill>Out now</Pill>
  </div>
);
