import { Display, Highlight } from 'jtw-schoolhouse';

export const InHeading = () => (
  <div style={{ background: 'var(--cream)', padding: 28 }}><Display size="lg" hasHighlight>The brutal <Highlight>truth.</Highlight></Display></div>
);
export const OnPaper = () => (
  <Display size="md" hasHighlight>Pick your <Highlight>entry point.</Highlight></Display>
);
