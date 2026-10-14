import { RainbowBend } from 'jtw-schoolhouse';

export const FillsParent = () => (
  <div style={{ position: 'relative', height: 300, background: 'var(--cream)' }}><RainbowBend weight="large" /></div>
);
export const Flipped = () => (
  <div style={{ position: 'relative', height: 300, background: 'var(--cream)' }}><RainbowBend flip weight="mid" /></div>
);
export const FixedSize = () => <RainbowBend width={420} height={240} weight="small" />;
