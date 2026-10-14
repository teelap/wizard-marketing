---
category: Type
---
Display heading in Fraunces Black (soft, wonky cut): the brand's voice in type. Tight leading, slight negative tracking.

- Headings are short, plain statements that end with a full stop: "Work with the wizard.", "The brutal truth."
- Put the one word that matters in a `Highlight`, `Pop` or `RainbowWord`. One treatment per heading.
- Body copy is never in the display face; it is Nunito (the page default).

```jsx
<Display as="h1" size="xl">They buy <RainbowWord>dreams.</RainbowWord></Display>
<Display size="lg" hasHighlight>Ways to work <Highlight>together.</Highlight></Display>
<Display as="h3" size="sm">Private consulting</Display>
```
