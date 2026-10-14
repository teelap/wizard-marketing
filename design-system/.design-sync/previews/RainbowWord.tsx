import { RainbowWord, Display } from 'jtw-schoolhouse';

export const Headline = () => (
  <div style={{ background: 'var(--cream)', padding: 28 }}><Display as="h1" size="xl">They buy <RainbowWord>dreams.</RainbowWord></Display></div>
);
export const OnYellowSkipsYellow = () => (
  <div style={{ background: 'var(--yellow)', padding: 28 }}><Display size="lg">Eight <RainbowWord skip="yellow">Dominoes.</RainbowWord></Display></div>
);
export const NoOutline = () => (
  <Display size="md">Work with the <RainbowWord outline={false}>wizard.</RainbowWord></Display>
);
