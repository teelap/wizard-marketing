---
category: Art
---
Spinning starburst sticker with an ink shadow, slapped on the corner of a photo or card to shout one short fact.

- Two to four words: "Out now / Eight Dominoes", "From / $400", "Live calls / Twice a week". The small `label` line is optional.
- One sticker per photo or card, overlapping its corner (absolute by default: pass `style={{ left: -40, top: -36 }}`). Use `inline` to place it in normal flow.

```jsx
<TVFrame photo="castingSpell" sticker={<Starburst label="Out now" title={<>Eight<br />Dominoes</>} style={{ left: -48, top: -40 }} />} />
<Starburst inline label="From" title="$400" color="yellow" />
```
