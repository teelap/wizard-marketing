---
category: Brand
---
Jake the Wizard's logo: the classic blue wizard hat, or the hat on a starburst badge, with an optional "The Wizard" wordmark.

- Use the `hat` in headers and nav bars, the `badge` in footers, avatars, stickers and anything square.
- The wordmark is always "The Wizard", set in the display face. Never retype it in another font.
- Never redraw, recolour, outline or put the hat on a different shape. These are the only two marks.
- Never pair the logo with a drawing, cartoon or AI image of Jake. Jake only appears as a real photo (see `TVFrame`).

```jsx
<Logo />                                   {/* nav: 46px hat + wordmark */}
<Logo variant="badge" size={68} textSize={34} />
<Logo variant="badge" size={120} wordmark={false} />
```
