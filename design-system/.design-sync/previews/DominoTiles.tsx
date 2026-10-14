import { DominoTiles } from 'jtw-schoolhouse';

export const FirstFour = () => (
  <div style={{ background: 'var(--yellow)', padding: 32 }}>
    <DominoTiles items={[
      { n: '01', color: 'red', title: 'Core Attraction', children: 'The emotion your customer is actually buying.' },
      { n: '02', color: 'sky', title: 'Attention Catalyst', children: 'The hook that earns the first three seconds.' },
      { n: '03', color: 'mint', title: 'Value Proposition', children: 'The promise that earns the next sixty.' },
      { n: '04', color: 'pink', title: 'Impact Chain', children: 'The stakes that make inaction feel unbearable.' },
    ]} />
  </div>
);
