import { SectionHead, Highlight } from 'jtw-schoolhouse';

export const Centered = () => (
  <div style={{ background: 'var(--cream)', padding: '32px 16px' }}>
    <SectionHead kicker="Consulting · Mastermind · Book" title={<>Ways to work <Highlight>together.</Highlight></>} hasHighlight>
      Pick your entry point. No wrong door.
    </SectionHead>
  </div>
);
export const LeftAligned = () => (
  <div style={{ background: 'var(--cream)', padding: '32px 16px' }}>
    <SectionHead align="left" kicker="About Jake" title={<>The brutal <Highlight>truth.</Highlight></>} hasHighlight>
      Thirteen years in the trenches. No magic, only psychology and work.
    </SectionHead>
  </div>
);
