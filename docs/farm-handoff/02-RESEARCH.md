# 02 — Research Dossier (skills, tech, assets, motion, anti-slop)

All findings from the setup session's research, consolidated and URL-cited so you don't re-research.
Facts marked ✅ were verified against primary sources during setup.

---

## A. Rendering tech for the interactive pixel hero

**Recommendation: PixiJS v8** (lightest pure-2D WebGL/WebGPU sprite renderer; not a heavy game engine).
Alternatives considered: Phaser (full game engine — overkill for a marketing hero), plain Canvas2D
(you'd re-implement batching/atlases/hit-testing), react-three-fiber (3D — wrong tool for 2D pixel).
- Phaser vs Pixi: https://generalistprogrammer.com/tutorials/phaser-vs-pixijs-renderer-comparison ·
  https://dev.to/ritza/phaser-vs-pixijs-for-making-2d-games-2j8c · benchmark:
  https://github.com/Shirajuki/js-game-rendering-benchmark

### The critical Next.js 16 / Turbopack / React 19 gotchas ✅
- **Turbopack is the Next 16 default bundler** (dev + build; opt out with `next dev --webpack` /
  `next build --webpack`). Config moved from `experimental.turbopack` to top-level `turbopack`. Dev and
  build use separate output dirs; a lockfile blocks concurrent `next dev`.
  https://nextjs.org/blog/next-16
- **`next/dynamic(..., { ssr:false })` breaks HMR under Turbopack** and is disallowed in Server
  Components. **Do not use it for the hero.** Instead: a **`'use client'` component that inits Pixi inside
  `useEffect`** — `useEffect` never runs on the server, so Pixi stays client-only *and* live-reload keeps
  working. https://nextjs.org/docs/app/guides/lazy-loading · https://github.com/pixijs/pixijs/issues/6990
  · https://github.com/vercel/next.js/issues/72613 · https://nextjs.org/blog/next-16-2-turbopack
- **`@pixi/react`:** v8 was rebuilt for React 19 / Pixi v8. **v7.x breaks on React 19 / Next 15+** (used
  changed React internals). Use v8 or raw Pixi. For one self-contained hero, **raw Pixi in a client
  component** is the more robust choice. https://pixijs.com/blog/pixi-react-v8-live ·
  https://react.pixijs.io/ · https://github.com/pixijs/pixi-react/issues/551
- **Pixel-perfect (Pixi v8):** `NEAREST` scale mode, `roundPixels:true`, `resolution:devicePixelRatio`,
  `autoDensity:true`. NEAREST can cause 1px seams between touching tiles → extrude/pad atlas tiles +
  integer scaling. https://pixijs.com/8.x/guides/migrations/v8 · seam issue:
  https://github.com/pixijs/pixijs/issues/6676
- **Cleanup / memory:** React 19 StrictMode double-mounts effects in dev → without cleanup you get two
  WebGL contexts. Call `app.destroy({ removeView:true }, { children:true, texture:true, textureSource:true,
  context:true })` in the effect cleanup; guard double-init; use Pixi `resizeTo`.
  https://pixijs.download/dev/docs/app.Application.html
- **Bundle:** import only the Pixi extensions you use; keep the hero in its own client component.

### Accessibility + fallback
- SSR the real marketing DOM (Server Components). The hero component renders a **static pre-rendered farm
  PNG/WebP with real `<a>`/`<button>` plot hotspots** as the baseline; Pixi mounts on top after hydration.
  Every plot→service link works with no JS, for screen readers, and for SEO. Canvas = enhancement only.
- `prefers-reduced-motion` via CSS **and** `window.matchMedia('(prefers-reduced-motion: reduce)')` (the
  hero is JS-driven): static frame / pause the ticker. Satisfies WCAG 2.3.3.
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion ·
  https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html

---

## B. Asset pipeline — pixel sprites/tiles

### Editor ✅
- **Pixelorama** — MIT, open-source, macOS/Win/Linux/Web, **very actively maintained** (v1.1.10, Apr 2026;
  42 releases), animation timeline/onion-skinning, palette management, spritesheet export, and **Command
  Line Automation for bulk exports**. Built on Godot. https://github.com/Orama-Interactive/Pixelorama
- **LibreSprite** (fallback) — GPL fork of the last free Aseprite; macOS; scripting API; last release
  Dec 2023. https://github.com/LibreSprite/LibreSprite
- **`willibrandon/pixel-plugin` (Aseprite MCP) — REJECTED.** ✅ Requires **Aseprite v1.3.0+ specifically**;
  no Pixelorama/LibreSprite/headless support. Since we're not using Aseprite, there is no MCP drawing loop.
  https://github.com/willibrandon/pixel-plugin

### Asset packs & licenses ✅ (be precise)
- **Sprout Lands (Cup Nooble)** — the canonical Stardew-cozy farm look. **FREE pack license = NON-commercial
  only**, verbatim: *"This asset pack can't be used in any commercial project, resold/redistributed, even if
  modified."* Attribution required ("Credit: Cup Nooble"). **Premium ($3.99+)** grants commercial rights.
  **Owner has chosen the FREE pack anyway — decision on record, owner-owned. Keep the Cup Nooble credit.**
  https://cupnooble.itch.io/sprout-lands-asset-pack · https://cupnooble.itch.io/sprout-lands-ui-pack
- **Kenney.nl — CC0** (public domain, safest) — considered as a base but **dropped** to avoid grid/palette
  mixing. https://kenney.nl/support
- **LPC / OpenGameArt** — CC-BY-SA 3.0 / GPLv3 (attribution + ShareAlike). Not used.
  https://opengameart.org/content/lpc-crops

### AI pixel-art generation ✅
- **PixelLab.ai** — purpose-built sprite/animation generator; per ToS you **retain output ownership,
  commercial included on paid plans** (can't train other models on outputs). https://www.pixellab.ai/ ·
  https://www.pixellab.ai/termsofservice
- **Retro Diffusion** — dedicated pixel-art diffusion, marketed as trained on licensed data. Verify current
  terms. https://retrodiffusion.ai/
- Caveat: purely AI-generated images may not be copyrightable in the US (no human authorship) — for anything
  you need to legally "own," prefer human-edited output. https://terms.law/ai-output-rights/stable-diffusion/

### Format & tooling
- **Aseprite JSON export not available** → use Pixelorama's exporter or **TexturePacker / PixiJS AssetPack**
  → **atlas PNG/WebP + JSON Hash** (the Pixi/Phaser standard). Compress final PNGs to WebP/AVIF for web.
  https://pixijs.io/guides/basics/sprite-sheets.html · https://pixijs.io/assetpack/ ·
  https://www.codeandweb.com/texturepacker/tutorials/how-to-create-sprite-sheets-and-animations-with-pixijs

### Crisp pixel rendering on the web ✅
- `image-rendering: pixelated` on all sprite layers; **only scale by integer multiples** (2/4/8×) to avoid
  shimmer; author at a fixed base resolution; snap canvas to whole pixels for fractional DPR.
  https://developer.mozilla.org/en-US/docs/Games/Techniques/Crisp_pixel_art_look ·
  https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/image-rendering ·
  https://css-tricks.com/keep-pixelated-images-pixelated-as-they-scale/ · https://caniuse.com/css-crisp-edges

---

## C. DOM animation libraries

- **GSAP + ScrollTrigger** — the workhorse for scroll-driven pixel/parallax storytelling. ✅ **100% free
  incl. commercial and all plugins** (Webflow now funds it) — no licensing caveat. https://gsap.com/pricing/
- **Motion** (formerly Framer Motion) — React-native micro-interactions/hover/exit. **Already installed**
  in the repo (`motion@^12`). https://motion.dev/docs/gsap-vs-motion
- **Lenis** — optional smooth-scroll layer that pairs with GSAP ScrollTrigger; **disable under
  `prefers-reduced-motion`**. https://github.com/darkroomengineering/lenis
- Recommendation: GSAP+ScrollTrigger (scroll storytelling) + Motion (components) + optional Lenis.

---

## D. Motion design canon (encode as build guidance)

- **Disney's 12 principles → UI:** https://ixdf.org/literature/article/ui-animation-how-to-apply-disney-s-12-principles-of-animation-to-ui-design
- **Issara Willenskomer — UI Animation Principles ("Disney is Dead"):** https://medium.com/ux-in-motion/ui-animation-principles-disney-is-dead-8bf6c66207f9
- **Val Head — *Designing Interface Animation*:** https://rosenfeldmedia.com/books/designing-interface-animation/
- **Rachel Nabors — *Animation at Work*:** https://abookapart.com/products/animation-at-work
- **Material motion — easing & duration:** https://m3.material.io/styles/motion/easing-and-duration ·
  choreography: https://m2.material.io/design/motion/choreography.html
- **Game "juice":** *Juice it or Lose it* https://gamejuice.co.uk/resources/juice-it-or-lose-it ·
  CSS game juice https://mccormick.cx/news/entries/css-animations-for-game-juice ·
  Juicy UI https://medium.com/@mezoistvan/juicy-ui-why-the-smallest-interactions-make-the-biggest-difference-5cb5a5ffc752

**The 5 principles that matter most for this pixel-game UI:**
1. Squash & stretch + slow-in/slow-out easing (never linear; decelerate on entrances).
2. "Juice" — disproportionate feedback (pop-scale on click, particle bursts: leaves/dirt/sparkles).
3. Staging & choreography (one thing leads the eye; sequence/offset entrances).
4. Timing discipline (150–200ms micro-interactions, 300–400ms scene transitions).
5. Appeal + responsible motion (personality without overload; honor reduced-motion; ambient loops for
   fireflies/swaying grass that disable gracefully).

---

## E. Anti-AI-slop, made specific to pixel/game aesthetics

**General anti-slop:** specificity is the antidote to generic AI design; replace taste-only prompts with
tokens/spacing/type constraints. https://www.925studios.co/blog/ai-slop-web-design-guide ·
https://www.managed-code.com/blog-post/ai-slop-in-design

**Pixel-art craft (the rules that keep it from looking templated):**
- **ONE opinionated limited palette** (Stardew-warm earthy set): https://medium.com/@ansimuz/how-to-create-retro-color-palettes-for-your-pixel-art-game-a-practical-guide-7beae8ee9c97
  · https://www.wayline.io/blog/pixel-art-limited-color-palettes
- **ONE consistent pixel resolution/grid everywhere** — mixed pixel sizes is the #1 amateur/templated tell.
- Constraint = cohesion: https://www.winkingworks.com/winking-talks-the-rise-of-pixel-art-from-hardware-limitations-to-style-choices-and-its-value-in-modern-games/
- Personalize sprites so they carry individuality (esp. team characters).

**Premium pixel-art site anchors (the quality bar to match):**
- Miu Miu "Twist: The Game" (playable pixel-art brand marketing — the "explorable hero" precedent):
  https://www.awwwards.com/inspiration/pixel-art-game-miu-miu-fragrance
- Basement Chronicles (pixel + storytelling + interactive):
  https://www.awwwards.com/inspiration/pixelated-gaming-aesthetic

---

## F. Claude Code skills — external repos worth borrowing (execution-time)

- **Official `anthropics/skills`** — esp. **`frontend-design`** (anti-generic direction + motion, React+Tailwind),
  plus `canvas-design`, `algorithmic-art` (p5.js particles for "juice"), `theme-factory`, `brand-guidelines`.
  https://github.com/anthropics/skills
- **Sprite production (community):** `aldegad/sprite-gen` (atlas from one base image + manifest)
  https://github.com/aldegad/sprite-gen · `Clad3815/character-sprite-maker`
  https://github.com/Clad3815/character-sprite-maker · `TamerinTECH/claude-skill-klingai-animation`
  (image → CSS sprite animation) https://github.com/TamerinTECH/claude-skill-klingai-animation
- **Architecture references** for event-reactive pixel characters (our hover/click model — study, don't
  install): `Michaelliv/claude-quest` https://github.com/Michaelliv/claude-quest ·
  `pixel-agents-hq/pixel-agents` https://github.com/pixel-agents-hq/pixel-agents
- Skill lists: https://github.com/travisvn/awesome-claude-skills · https://github.com/ComposioHQ/awesome-claude-skills

*(The setup account also had a large local "impeccable" skill suite — `frontend-design`, `impeccable`,
`design-motion-principles`, `overdrive`, `critique`, `audit`, `polish`, `brandkit`, `imagegen-frontend-web`,
`ux-psychology-skill`, `ui-ux-pro-max`, etc. If your account lacks them, the principles above stand on
their own; install `anthropics/frontend-design` at minimum.)*
