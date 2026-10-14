---
category: Layout
---
Page opener framed by the rainbow bend: kicker, headline, lede and buttons on one side, Jake's photo in a tilted TV with a starburst sticker on the other.

- One per page, at the top. Headline: a short plain statement with one `RainbowWord` or `Highlight`. Lede: one sentence a stranger understands.
- Leave out `photo` for a text-only page (legal, info). Use `flip` to alternate pages.

```jsx
<Hero
  kicker="Jake Tlapek · The Wizard of Marketing"
  lead="People don’t buy features."
  title={<>They buy <RainbowWord>dreams.</RainbowWord></>}
  lede="Marketing strategy for founders and teams who are done with theory."
  actions={<><Button href="/consulting">Work with Jake</Button><Button variant="ghost">See the framework</Button></>}
  photo="castingSpell"
  sticker={{ label: 'Out now', title: <>Eight<br />Dominoes</> }}
/>
```
