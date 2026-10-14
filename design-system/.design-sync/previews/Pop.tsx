import { Pop, Display } from 'jtw-schoolhouse';

export const BigNumber = () => (
  <div style={{ background: 'var(--red)', padding: 24, textAlign: 'center' }}><Display size="xl" as="p"><Pop color="paper">01</Pop></Display></div>
);
export const OnYellow = () => (
  <div style={{ background: 'var(--yellow)', padding: 24 }}><Display size="lg" as="p"><Pop color="paper">110K+</Pop></Display></div>
);
