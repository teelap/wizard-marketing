# Homepage Scene — Build Status & Handoff

> Living doc for the homepage build. Read this FIRST when resuming.
> Last updated: 2026-06-04. **v6 art is LOCKED and LIVE.**

## What this is
The homepage of jakethewizard.com is a **Lo-Fi Girl / video-game main-menu** scene that **IS
the navigation**: a cozy painterly study where Jake works at a glowing arcane laptop. Hovering
an object glows it + shows a callout AND lights the matching top-nav item (bidirectional);
clicking goes to the real page. Full-viewport hero; the existing rich homepage content scrolls
below it (hybrid → SEO preserved). Approved plan: `~/.claude/plans/jolly-popping-brooks.md`.

## Art direction (UPDATED 2026-06-04 — supersedes the old "flat chibi" lock)
Jake moved the style to **soft, painterly Studio Ghibli / "Lo-Fi Girl" anime** — thin clean
linework (NOT thick cartoon outlines, NOT flat sticker), gouache cel-shading, a **muted,
cohesive, desaturated color grade**, cozy + atmospheric. Reference set he approved: soft anime
cats, the lofi turntable-by-window, muted arcade. **Composition = a true SIDE PROFILE** like
Lo-Fi Girl (Jake at the desk, seen from the side, headphones on, facing the window).

**The locked hero = `lofi-desk-v6`** (generated via the `mcp__mcp-image__generate_image`
gemini-3-pro-image model, 2752×1536). Source: `C:\Users\jacob\Finch\generated-images\lofi-desk-v6.jpg`.
Optimized to `dev_assets/scenes/lofi-room.webp` (237KB) + `.avif`. It's a **complete baked
scene** (Jake + room in one image), so the site uses it as a single plate with invisible
hotspots — NOT separate sprite layers.

Jake's character: NO hat, dark glasses, short brown beard, silver-gray front hair streak,
**hoodie-style** layered Jedi robe (red/purple/gold), over-ear headphones, glowing arcane laptop.
Tasteful nods in v6: **lightsaber-hilt desk lamp**, **owl** at a snowy **Hogwarts-like castle**
window, **straw hat** (One Piece) + **ship-in-a-bottle**, a **chef's-toque rat** (Ratatouille),
crystal orb, potions, star-chart, world map, hanging plants, fairy-lights.
(Dropped from later experiments after they caused AI-edit "whack-a-mole": board-game boxes incl.
Grifters, Gandalf bobblehead, podcast mic, "SOLD"/boxers frames, Middle-Earth map. Re-add later
as clean one-offs if wanted — see NEXT.) NO R2-D2 (copyright — Jake's call).

## What's LIVE (in `index.html`)
New modular files **`scene.css`** + **`scene.js`** (cache `?v=2`); old `script.js` hero code
removed (`?v=7.2`). Scene = `#scene-hero` (100vh/svh) as the first block of `<main>`; all the
existing sections scroll below. `dev_assets/` ships via build (no build.js change needed for the
plate). `scene.css`/`scene.js` are in `build.js` PUBLIC_FILES.

**Object → destination map (hotspots, calibrated to v6 via a % grid overlay):**
| Object | hotspot id | → |
|---|---|---|
| arcane laptop (center) | `#h-consulting` | Consulting |
| open spellbook (desk) | `#h-book` | Eight Dominoes / book |
| crystal orb (far left) | `#a-social` (button) | Socials — blooms the **orb fan** (TikTok/LI/YT/IG/X) |
| desk potions (right) | `#h-tools` | Tools |
| headphones (on Jake) | `#h-podcast` | Podcast |
| castle in window | `#h-arcanum` | Mastermind (hotspot id unchanged) |
| **owl** outside window | `#h-contact` | Contact (`#contact` form below) — *Jake: owl = "get a hold of Jake"* |
Easter eggs (`[data-egg]`, toast only): `lamp`, `hat` (One Piece), `ship`, `rat` (Ratatouille) + Konami.

**Verified working** (via `preview_eval`): plate loads; bidirectional nav↔scene sync (both ways);
orb fan open/close; easter eggs; owl→#contact; Reveal; day/night; muted audio; mouse parallax
(whole-scene pan + 1.04 overscan — see note); mobile fallback; hybrid scroll; **no console errors**.
One clean full screenshot confirmed the live look.

## KEY IMPLEMENTATION NOTES / GOTCHAS
- **Baked plate ⇒ pan parallax, never counter-move the room.** Hotspots are children of `.scene`;
  `scene.js` pans the WHOLE `.scene` (translate + `scale(1.04)` overscan) so hotspots stay glued to
  their painted objects. Do NOT re-introduce a separate `.room` transform (it drifts hotspots off).
- **Hover = glow + callout, not a physical lift** (objects are baked into one image). For true
  lift-on-hover, extract layers (Jake / orb / owl / laptop) from v6 and composite — future polish.
- **Calibrate hotspots with a % grid overlay on the plate**, not the flaky live screenshot. Script
  pattern: SVG grid (lines+labels every 10%) composited over the webp with `sharp` → read object %s.
- **Claude_Preview `preview_screenshot` is flaky** (letterboxes at forced desktop sizes; timed out in
  `reveal` mode with many blend-mode glows). Use `preview_eval` for geometry/interaction truth; it
  DID return one clean full shot at 1280×800. chrome-devtools-mcp browser was LOCKED this session.

## Asset + edit pipeline (fal.ai — set up + proven this session)
- **Generate**: `mcp__mcp-image__generate_image` (gemini-3-pro-image). Crisp 2K, good style control.
- **Instruction edits / nuanced changes**: **fal.ai** (`FAL_KEY` in project `.env`). Scripts in
  `C:\Users\jacob\Finch\matte\`:
  - `fal-edit.js <promptFile> <out> <model> <img1> [img2…]` → instruction edit; uses
    `fal-ai/nano-banana/edit` (Gemini 2.5 Flash Image), supports a reference image. Body forces
    `aspect_ratio:'16:9'`. ⚠️ nano-banana **softens each pass** (cumulative), is unreliable at
    "move object" and at faithfully placing a referenced box, and sometimes dissolves composited
    elements — prefer ONE pass from a crisp base, or composite + a single light blend.
  - `fal-bg.js <in> <out> [model]` → background removal (`fal-ai/birefnet/v2`).
  - `fal-gen.js` → generic fal text/img2img caller.
  - ⚠️ never `require` `@imgly` and `sharp` in the same node process (segfault). Matte + sharp in
    separate processes.
- Grifters box art (Jake's real game, "Jake Tlapek & David Fulton") downloaded to
  `generated-images/grifters-ref.png` (+ `grifters-cut.png` bg-removed) for any future composite.

## NEXT (optional polish — get Jake's call)
1. **Music**: Suno track (Jake generates) → wire to the muted sound toggle (`Audio_` in scene.js
   already supports `dev_assets/audio/ambient.mp3`). Brief: lofi + mystical, subtle heroic-horn,
   seamless ~2–3 min loop.
2. **Re-add nods cleanly** if wanted: Grifters box (composite the real art as a last step, no blend),
   podcast mic, framed boxers (no tiara). Do as deterministic composites, not AI multi-edits.
3. **True lift-on-hover**: extract Jake/orb/owl/laptop as layers from v6 for physical pop + depth parallax.
4. **Final crisp pass**: if any editing softened the plate, upscale (fal clarity-upscaler) to 2K.
5. **Tune**: hotspot positions/copy, callout styling, day/night plates, mobile crop framing.
6. **Site-wide vibe (v2)**: carry the motifs into sub-page headers.

## Run / preview / deploy
- Serve: Claude_Preview `preview_start` config **`wiz-site`** (:5173), or `npm run serve`. Open `/`.
- Deploy: Vercel runs `npm run build` (`build.js` → `public/`).
- `workshop.html` (old point-and-click adventure) is archived `noindex`, unlinked. Retire later.
