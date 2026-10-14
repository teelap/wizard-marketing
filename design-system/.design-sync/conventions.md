## Building with the Jake the Wizard kit

**Setup.** No provider or wrapper. `styles.css` carries everything (it `@import`s `_ds_bundle.css`, the website's own stylesheet, plus Google Fonts and Font Awesome 6). It also styles `body`: cream ground (`--cream`), Nunito 700 at 18px, a film-grain overlay. Build pages on that body; don't set a white background. Components are at `window.JtW.*`.

**Styling idiom.** Plain CSS classes plus custom properties; no utility framework. Use the components first. For your own layout glue use the kit's classes and tokens, not new colours or fonts:

| Need | Use |
|---|---|
| Colours | `var(--ink)`, `--cream`, `--paper`, `--yellow`, `--teal`, `--pink`, `--red`, `--salmon`, `--mint`, `--sky`, `--orange`, `--maroon`, `--forest`, `--navy`; small red text `--red-ink`; nine-stripe gradient `var(--rainbow)` |
| Fonts | `var(--disp)` Fraunces Black (headings, buttons, numbers), `var(--body)` Nunito, `var(--type)` Courier Prime, `var(--marker)` Permanent Marker |
| Page structure | `Section` (or `.sec`, `.sec--yellow/teal/sky/pink/paper`, `.wrap`, `.wrap--narrow`), `SectionHead` (or `.head`) |
| Grids | `.grid` + `.grid-2` / `.grid-3` / `.grid-4`, `.split`, `.svc-grid`, `.cta-row` |
| Text bits | `.disp`, `.kicker`, `.pill`, `.hl`, `.pop`, `.lede`, `.fine`, `.muted`, `.wavy` |
| Boxes | `.card` + `.card--pad`; outlines are `4px solid var(--ink)`, shadows hard and down-right (`8px 8px 0 var(--ink)`), never blurred |

Any `h1`, `h2`, `h3` gets the display face automatically. Every coloured fill keeps an ink outline. Colour props on components take a `Hue` name (`'yellow'`, `'sky'`...), not a hex.

**Brand rules a design must keep.**
- Jake appears only as a real photo in a `TVFrame` (`photo="wizardReach"` etc.: 36 shots in `PHOTOS`, each with a `scene`; the cloak shots suit brand posts, the book-mural shots suit book posts; rotate them). Never draw, generate or cartoon him.
- One emphasised word per headline (`Highlight`, `RainbowWord` or `Pop`); headlines end with a full stop.
- One yellow main `Button` per view, labelled as an order ("Book the call", "Join free", "Get the book"). No emoji, no exclamation marks.
- Only approved numbers: 13 years, $100M+ generated for clients, 2 exits, 110K+ followers. Prices: Strategy Session $400 (30 min) / $750 (60 min), Marketing Audit $2,000, Fractional CMO from $2,500/mo, Mastermind free or $500/mo.
- Eight Dominoes' own yellow book branding is a separate brand; don't use it here.

**Where the truth lives.** `guidelines/` (voice and copy, visual foundations, photos and logo, social sizes), each component's `.prompt.md`, and `_ds_bundle.css` for every class.

```jsx
const { Section, SectionHead, Highlight, ServiceCard, Button } = window.JtW;
<Section>
  <SectionHead kicker="Consulting · Mastermind · Book" title={<>Ways to work <Highlight>together.</Highlight></>} hasHighlight>
    Pick your entry point. No wrong door.
  </SectionHead>
  <div className="svc-grid">
    <ServiceCard title="Private consulting" color="red" icon="consulting" tag="From $400" cta="Book a session">
      One-on-one strategy. Find the bottleneck, fix the message, compound the results.
    </ServiceCard>
  </div>
  <div className="cta-row center"><Button href="/consulting">Book the call</Button></div>
</Section>
```
