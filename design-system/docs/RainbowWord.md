---
category: Type
---
A word set in rainbow letters (red, orange, yellow, mint, sky, pink, teal) with the cartoon ink outline. The signature move: one per screen, on the payoff word.

- Use it once per view, on the word the line is about: "They buy dreams.", "Work with the wizard."
- On a yellow ground pass `skip="yellow"` so no letter disappears.
- Screen readers get the plain word; the letters are decoration.

```jsx
<Display as="h1" size="xl">They buy <RainbowWord>dreams.</RainbowWord></Display>
<RainbowWord skip="yellow">Mastermind.</RainbowWord>
```
