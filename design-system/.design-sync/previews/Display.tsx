import { Display, Highlight, RainbowWord } from 'jtw-schoolhouse';

export const HeroHeadline = () => (
  <div style={{ background: 'var(--cream)', padding: 28 }}><Display as="h1" size="xl">They buy <RainbowWord>dreams.</RainbowWord></Display></div>
);
export const SectionTitle = () => (
  <div style={{ background: 'var(--cream)', padding: 28 }}><Display size="lg" hasHighlight>Ways to work <Highlight>together.</Highlight></Display></div>
);
export const CardTitle = () => <Display as="h3" size="sm">Private consulting</Display>;
