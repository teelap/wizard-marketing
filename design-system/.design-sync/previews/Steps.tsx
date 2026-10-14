import { Steps } from 'jtw-schoolhouse';

export const HowItWorks = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}>
    <Steps items={[
      { title: 'Book the call', text: 'Thirty minutes, $400. Bring the numbers.' },
      { title: 'Find the bottleneck', text: 'We look at what your buyer actually wants.' },
      { title: 'Fix the message', text: 'You leave with the rewrite, not a deck.' },
    ]} />
  </div>
);
