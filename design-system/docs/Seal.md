---
category: Art
---
Starburst seal: a coloured disc on a spinning starburst, holding one big proof number.

- Only numbers from the approved stat bank: "$100M+" (generated for clients), "2 exits", "110K+" (followers), "13 years". Never invent a stat or attach $100M+ to a named client.
- Use `valueColor="cream"` on red, maroon, forest or navy discs.
- For the standard row of three, use `ProofSeals`.

```jsx
<Seal value="$100M+" fill="sky" burst="pink" />
<Seal value="110K+" fill="red" burst="orange" valueColor="cream" rotate={14} />
```
