import { TVFrame, Starburst } from 'jtw-schoolhouse';

export const WithSticker = () => (
  <div style={{ background: 'var(--cream)', padding: '56px 28px 40px 56px' }}>
    <TVFrame photo="castingSpell" width={300}
      sticker={<Starburst label="Out now" title={<>Eight<br />Dominoes</>} size={130} style={{ left: -44, top: -40 }} />} />
  </div>
);
export const TiltedLeft = () => (
  <div style={{ background: 'var(--cream)', padding: 32 }}><TVFrame photo="headTilt" tilt="left" width={260} /></div>
);
export const Landscape = () => (
  <div style={{ background: 'var(--cream)', padding: 32 }}><TVFrame photo="armsWide" aspect="3/2" width={340} /></div>
);
