import { Section, SectionHead, Highlight, RainbowWord } from 'jtw-schoolhouse';

export const CreamSection = () => (
  <Section tight>
    <SectionHead kicker="Consulting · Mastermind · Book" title={<>Ways to work <Highlight>together.</Highlight></>} hasHighlight>
      Pick your entry point. No wrong door.
    </SectionHead>
  </Section>
);
export const YellowBand = () => (
  <Section tone="yellow" tight>
    <SectionHead kicker="The book" title={<>Eight <RainbowWord skip="yellow">Dominoes.</RainbowWord></>}>
      The messaging framework that compounds into awesome clients.
    </SectionHead>
  </Section>
);
export const TealBand = () => (
  <Section tone="teal" tight narrow>
    <SectionHead kicker="Free to join" title="Come work the chain.">Group consulting with Jake twice a week.</SectionHead>
  </Section>
);
