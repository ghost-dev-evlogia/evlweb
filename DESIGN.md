# DESIGN.md — Evlogia "The Farm" pixel design system

The one visual language for evlogia.ai. **Whimsy in the world, rigor in the words**: the pixel
farm is the brand metaphor (*most firms sell you seeds and hours; we hand you the harvest*), but
every sentence stays engineer-first and verifiable.

## Overall aesthetic & atmosphere

Cozy Stardew-Valley-style 2D pixel art, 16-bit register, dawn/day light. The canvas leans
**sky/dawn** (cool green-paper + pale blue-teal washes) — warmth is carried by the *world*
(wood panels, crops, sprites), never by a warm-neutral page background. The site should feel
like a lovingly-tended game HUD laid over a living farm: chunky wooden panels, hard pixel
edges, zero blur, zero gradients except the dawn sky.

## The ONE pixel language (non-negotiable)

- **Base art:** Sprout Lands free packs by Cup Nooble (sprites + UI). Attribution required and
  present in the footer. License readmes: `docs/licenses/`.
- **Grid:** 16px tiles. Every sprite, tile, and atlas obeys it. Character frames are 48×48
  macro-cells on the same grid.
- **No pack mixing.** Anything new is authored to Sprout Lands' grid, palette, and outline
  convention (`#353738` outlines).
- **Integer scaling only** (2×/3×/4×; device-pixel integers for the hero canvas).
  `image-rendering: pixelated` on every sprite layer (`.pixelated`, inline on canvas).
- Scene source of truth: `src/farm/scene.ts` + `src/farm/tiles.ts` — consumed by both the
  build-time static PNG (`scripts/render-farm.ts`) and the PixiJS hero. Never hand-edit one side.

## Color system (decoded from the pack's official palette — `public/farm/sprites/palette.png`)

CSS custom properties in `globals.css`; Tailwind tokens via `@theme inline` (`text-ink`,
`bg-paper`, `text-harvest`, …).

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#353738` | text, outlines (the Sprout outline dark) |
| `--ink-2/3/4/5` | `#474a4b → #818b83` | secondary text ramp |
| `--paper` | `#f3f4e7` | page background (green-leaning, NOT cream) |
| `--sky-pale / --sky-mist` | `#cbe0de / #d6f1cd` | dawn-sky section washes |
| `--dawn / --dawn-deep` | `#f3d8c5 / #e8b5ac` | horizon glow only |
| `--grass*` | `#67835c → #c0d470` | grass ramp, footer lip |
| `--wood-shadow → --wood-paper` | `#754c60 → #f3e5c2` | panel chrome ramp |
| `--harvest*` | `#ba7c54 / #d79e61 / #eeba77 / #f2cf8c` | primary action (CTA buttons) |
| `--berry*` | `#a35b70 / #bd757e / #d99a9a` | secondary accent |

Anti-cream guard: `--paper` and the sky ramp are the only allowed page canvases.

## Typography

- **Display / UI chrome:** Pixelify Sans (`--font-pixel`, `font-display`) — headings, nav,
  buttons, chips, numbers. Never body copy.
- **Body:** Geist (`--font-geist`, `font-sans`) — paragraphs, meta, anything longer than a line.
- Floor: 11px; uppercase pixel labels get `tracking-[0.14em]`+.

## Component chrome (pure CSS, in globals.css)

- `.panel-wood` + `.pixel-corners` — outer tan board: `--wood-pale` fill, `--wood-shadow`
  outline (1 px-unit), `--wood-paper` top rim, `--wood-mid` bottom lip, stepped 2-unit corners
  via clip-path. Content goes in an inner `.panel-paper`.
- `.panel-paper` — cream inner surface w/ `--wood-mid` inset ring.
- `.pixel-btn` (harvest) / `.pixel-btn--wood` — chunky game buttons; hover brightens one ramp
  step, active presses down exactly one `--px`.
- `.pixel-chip` — small wooden label plate for eyebrows/badges/plot labels.
- `.pixel-divider` — dashed soil line between sections.
- `.sky-dawn` / `.sky-day` — hero/CTA washes (the only gradients allowed).
- `--px` is the DOM pixel unit: 3px mobile, 4px ≥768px. All chrome scales from it.
- Sprites in the DOM: `<PixelSprite tile={T.…} scale={n}/>` (background-crop, integer scale).

## Motion canon

- **Micro 150–200ms, scene 300–400ms.** Sprite/UI-chrome motion uses `steps()` easing (pixel
  snap); DOM content uses `--ease-out` (cubic-bezier(0.16,1,0.3,1)).
- Juice: press-down buttons, `.sprite-hop` pop on hover, crop bounce + double-outline highlight
  on plot hover (Pixi side).
- Ambient (hero only): water 4-frame cycle ~450ms, chickens/cow/farmer wander at Stardew pace.
- `prefers-reduced-motion`: ambient world freezes to a still frame (ticker stopped), reveals
  and marquee disabled — enforced in CSS *and* in `pixi-farm.ts` via matchMedia.

## Accessibility rules

- The DOM is the source of truth; canvas is enhancement. Every farm plot has a real `<Link>`
  hotspot with a visible chip label + `sr-only` blurb. Keyboard reaches every plot; focus
  drives the same canvas highlight as hover.
- Focus ring: `--px`-thick ink outline (paper on canvas surfaces).
- Static farm PNG (`public/farm/farm-static@3x.png`) serves no-JS/crawlers, alt text describes
  the plot→service mapping. Regenerate with `node scripts/render-farm.ts static` after any
  scene change.
- Text contrast: ink on paper ≈ 12:1; `--ink-3` is the floor for meta text on paper.

## Quality bar

Every route is compared against the committed style frame
(`docs/farm-handoff/style-frames/homestead.png`) for language drift. The hero is held to a
brutal floor: crisp at every DPR, 60fps ambient, keyboard-traversable, StrictMode-clean.
