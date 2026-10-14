import { Hero, Button, RainbowWord, Highlight } from 'jtw-schoolhouse';

export const Homepage = () => (
  <div style={{ background: 'var(--cream)' }}>
    <Hero
      kicker="Jake Tlapek · The Wizard of Marketing"
      lead="People don’t buy features."
      title={<>They buy <RainbowWord>dreams.</RainbowWord></>}
      lede="Marketing strategy for founders and teams who are done with theory."
      actions={<><Button href="#">Work with Jake</Button><Button variant="ghost" href="#">See the framework</Button></>}
      photo="castingSpell"
      sticker={{ label: 'Out now', title: <>Eight<br />Dominoes</> }}
    />
  </div>
);
export const Flipped = () => (
  <div style={{ background: 'var(--cream)' }}>
    <Hero flip kicker="Private & hourly" title={<>Work with the <RainbowWord>wizard.</RainbowWord></>}
      lede="Bring your hardest problem. Leave with the message that fixes it."
      actions={<><Button href="#">Book a Session</Button><Button variant="ghost" href="#">Read the Diagnosis First</Button></>}
      photo="handsOnHips" sticker={{ label: 'From', title: '$400' }} />
  </div>
);
export const TextOnly = () => (
  <div style={{ background: 'var(--cream)' }}>
    <Hero kicker="The fine print" title={<>Terms &amp; <Highlight>conditions.</Highlight></>} hasHighlight lede="The rules of the road for using this site." />
  </div>
);
