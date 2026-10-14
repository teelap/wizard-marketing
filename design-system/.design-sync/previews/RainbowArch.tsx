import { RainbowArch } from 'jtw-schoolhouse';

export const FooterArch = () => (
  <div style={{ background: 'var(--cream)', paddingTop: 16 }}>
    <RainbowArch variant="arch">© 2026 Jake Tlapek. All rights reserved. Built with scars.</RainbowArch>
  </div>
);
export const LowArc = () => <div style={{ background: 'var(--cream)', paddingTop: 16 }}><RainbowArch variant="arc" width={360} /></div>;
