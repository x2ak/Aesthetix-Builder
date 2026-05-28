---
name: Hero mobile grid text bug
description: Text inside a CSS grid container is invisible on mobile in the Replit preview (headless Chrome), while backgrounds and borders render fine. Text outside the grid renders correctly.
---

## The Rule
On mobile in the Replit preview environment, text inside a `display: grid` container does not render (completely invisible). Backgrounds, borders, and gradients DO render. Text outside a grid renders normally.

**Why:** The headless Chrome used by the screenshot tool (and seemingly the Replit preview iframe on mobile) has a rendering quirk where text in grid items loses visibility. The exact cause is unknown — possibly related to GPU compositing layers and how grid layout interacts with font rasterisation in this environment.

**How to apply:** For any component that conditionally uses a grid on mobile, split into two separate `return` paths:
- Mobile path: `if (isMobile) { return <section>...(plain block/flex layout)...</section>; }`
- Desktop path: `return <section>...(grid layout)...</section>;`

The mobile path should NOT use `display: grid`. Use plain block elements or `display: flex; flex-direction: column` instead. The parent section/div wrapping mobile content should have no `display: grid`.

Confirmed workarounds that did NOT work:
- `transform: translateZ(0)` on text elements
- `will-change: transform` on text elements  
- Removing `overflow: hidden`
- Using `<span>` instead of `<p>` / `<h1>`
- Inline styles vs CSS classes
