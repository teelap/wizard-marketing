---
category: Media
---
Photo in a fat-bezel 70s TV: thick ink border, round corners, hard shadow, slight tilt. Every photo of Jake goes in one.

- Use `photo` with one of Jake's approved rainbow-wall photos (`castingSpell`, `armsWide`, `pointing`, `handsOnHips`, `relaxed`, `leaningIn`, `headTilt`, `endOfWall`, `walkingStripes`, `walkingArcs`, `adjustingGlasses`, `strolling`). They carry their own alt text and crop.
- Never draw, generate, cartoon or caricature Jake. Real photos only.
- Alternate the tilt between neighbouring frames. Add a `Starburst` via `sticker` for one short fact.

```jsx
<TVFrame photo="castingSpell" aspect="4/5" width={420} />
<TVFrame photo="headTilt" tilt="left" width={340} />
```
