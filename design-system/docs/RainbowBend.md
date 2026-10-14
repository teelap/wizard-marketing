---
category: Art
---
Nine-stripe rainbow band that drops down the left edge, bends 90° and runs off along the bottom: the frame of every hero.

- The stripe order is fixed: teal, pink, red, salmon, yellow, forest, mint, maroon, sky, in an ink casing.
- `Hero` already draws one. Use this directly for posters, slides and social frames: give it `width` and `height`, or leave them out to fill a positioned parent. `flip` mirrors it.

```jsx
<div style={{ position: 'relative', height: 480 }}><RainbowBend /></div>
<RainbowBend width={1080} height={1350} weight="large" />
```
