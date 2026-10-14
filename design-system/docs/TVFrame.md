---
category: Media
---
Photo in a fat-bezel 70s TV: thick ink border, round corners, hard shadow, slight tilt. Every photo of Jake goes in one.

- Use `photo` with one of Jake's approved photos; each carries its own alt text and crop. Pick the scene for the message and rotate; don't reuse the same few:
  - **cloak** (the green wizard cloak; brand and wizard-voice posts): `wizardReach`, `wizardCloak`, `cloakGrin`, `cloakSeated`, `cloakStein`, `cloakPinball`
  - **book-mural** (book posts): `bookHeldUp`, `bookLaugh`, `bookReading`
  - **energetic** hooks: `arcadeLean`, `arcadeLaugh`, `graffitiSmile`, `graffitiGrin`, `graffitiReach`, `eyeMural`, `butterflyWelcome`, `butterflySmile`, and the rainbow wall (`castingSpell`, `armsWide`, `pointing`, `handsOnHips`, `relaxed`, `leaningIn`, `headTilt`, `endOfWall`, `walkingStripes`, `walkingArcs`, `adjustingGlasses`, `strolling`)
  - **serious / B2B / quote** posts: `headshot`, `armsCrossed`, `breezeBlock`, `thinking`, `whiteWall`, `streetWalk`, `patioReading`
- Never draw, generate, cartoon or caricature Jake. Real photos only.
- Alternate the tilt between neighbouring frames. Add a `Starburst` via `sticker` for one short fact.

```jsx
<TVFrame photo="castingSpell" aspect="4/5" width={420} />
<TVFrame photo="headTilt" tilt="left" width={340} />
```
