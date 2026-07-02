# 01 — Approved Build Plan (master spec)

> This is the plan the owner reviewed and approved. It is your source of truth. The other files in
> this folder support it: `02-RESEARCH.md` (evidence/URLs), `03-EXECUTION-FABLE.md` (how to run it),
> `04-REPO-STATE.md` (what exists today).

## Context

Evlogia Labs (evlogia.ai) is an applied-AI engineering studio that sells **shipped, fixed-price
systems** (not hours). Its current site is a polished but *generic* "editorial-cream" Next.js
marketing site — a look flagged as the saturated 2026 AI default (display serif + italic + hairline
rules + cream-paper bg + Instrument Serif). A half-finished in-tree redesign (bento components,
deleted dock) is superseded by this work.

Redesign into a new, un-defaultable visual world: a cozy **Stardew-Valley-style 2D pixel-art "farm"**,
with an **explorable interactive pixel-farm hero** (hover/click plots → services) and a game-skinned
marketing site across **6 routes**. Metaphor: *most firms sell you seeds and hours; we hand you the
harvest.*

## The strategic bet (goes into PRODUCT.md — decided on purpose)

- **Buyer:** technical decision-makers — CTO / VP Eng / technical founder / head of R&D — evaluating a
  build partner for AI, product, or hardware systems, across ~8 industries. Sophisticated, skeptical,
  risk-aware. They are the audience the whimsy must survive.
- **Site's job (primary):** **lead-gen** — book a fixed-price scoping call (Cal.com, already wired). The
  craft of the site itself is the **conversion mechanism**: the site *is* the proof they can ship.
- **The whimsy bet, made consciously:** a flawlessly-executed pixel farm reads *"look what these people
  ship."* A slightly-janky one reads *"this studio ships toys"* and actively **damages** the rigor claim
  the site exists to make. High variance. Therefore:
  - **The hero is held to a brutal quality floor** — it is *not* where "good enough" is accepted; it gets
    the largest verification budget in the build.
  - **Hard fallback rule:** if the interactive hero can't clear the bar within the session, ship a
    **gorgeous *static* pixel scene** instead of janky interactivity.
- **Copy register:** keep the current engineer-first, verifiable, no-hype voice. **Whimsy in the world,
  rigor in the words.**

## Confirmed design brief

- **Look:** Stardew-cozy 2D pixel art — 16-bit, wooden-panel UI, **dawn/day palette**.
- **Anti-cream guard:** canvas leans **sky/dawn**; warmth carried by the *world* (sprites, wood, crops),
  never a default warm-neutral background.
- **Color strategy:** Full palette (grass / dirt / sky / wood / harvest). Register: brand.
- **Hero:** explorable pixel farm; plots map to services; SSR real content underneath; game hydrates on
  top; reduced-motion + no-JS static-frame fallbacks; **every plot has an accessible DOM link equivalent**
  (DOM is source of truth, canvas is enhancement).
- **Type:** cozy pixel **display** (Pixelify Sans — NOT the Press Start 2P reflex) + readable **body**.
  Pixel fonts never carry body copy. *(Note: current repo body font is Inter, not Geist — see `04-REPO-STATE.md`.)*
- **IA / world-map (6 routes):** `/` The Farm (hero) · `/services` The Fields (each service = a plot/crop)
  · `/work` Harvests (case studies) · `/research` The Greenhouse (R&D/patents/papers) · `/about` The
  Farmhands (team as pixel characters) · `/contact` Come by (Cal.com booking).

## ONE visual language (resolves the three-grids contradiction)

Mixing packs = mixed grids/palettes/outlines = the #1 amateur pixel tell. So:
- **Sprout Lands (free pack) is the single base language** — its 16px grid, palette, and outline
  convention define everything. *(User decision: free pack despite its stated non-commercial license;
  on record and user-owned. Attribution required: credit "Cup Nooble" in the footer/credits.)*
- **Custom hero art + team characters are authored to match that exact language** (same grid, palette,
  outline). Anything borrowed gets **re-paletted** into the one language. No pack-mixing.

## Sprite pipeline (honest about what an agent can and can't do)

There is **no MCP "drawing" loop** (the Aseprite-only `pixel-plugin` was rejected; see `02-RESEARCH.md`).
Pixel craft is human + AI-gen; the agent orchestrates, it does not draw.
- **Editor: Pixelorama** (MIT, macOS, actively maintained, has **CLI export automation**). Fallback:
  LibreSprite.
- **Base world:** Sprout Lands free tiles → the base language.
- **Custom hero + team characters:** AI pixel-gen (**PixelLab.ai** — you own outputs, commercial on paid;
  or **Retro Diffusion**) seeded to the Sprout Lands look → import to Pixelorama → re-palette / clean to
  the one language (human-in-the-loop) → export **atlas PNG/WebP + JSON Hash** via Pixelorama CLI.
- **Style-frames are a self-checkpoint** (not an approval gate — this is an autonomous, pre-approved run):
  generate them, commit them for later review, self-select the strongest, and proceed without waiting.

## Curated skill set (use as taste/reference + verification, NOT rigid scripts)

**Drive the build:** `frontend-design` (official anthropics anti-generic direction + motion) · `impeccable`
(orchestration refs + `critique`/`audit`/`polish`) · `design-motion-principles` · `overdrive` (hero wow,
sparingly) · `full-output-enforcement` (keep the big Pixi component complete).
**Art direction / style-frames:** `brandkit` + `imagegen-frontend-web` + `image-to-code` (reference
imagery, not sprites).
**Taste gates:** `redesign-existing-projects` (audit current site first) · `design-taste-frontend` ·
`high-end-visual-design` · `minimalist-ui`.
**UX:** `ux-psychology-skill` (make the explorable hero legible) · `ux-concepts` · `ui-ux-pro-max`.
**Verification (fresh-context maker/checker):** `critique` · `audit` · `code-review` · `polish` +
`simplify`. Optional `verifier-forge` + `loop-engineering`.
**Architecture references (study, not install):** `Michaelliv/claude-quest`, `pixel-agents-hq/pixel-agents`.

*(If your account doesn't have these exact skills, `02-RESEARCH.md` has the underlying principles and
repo URLs so you can proceed without them.)*

## Technical approach (verified against Next 16 / Turbopack / React 19)

- **Stack:** Next.js 16 App Router + TS + Tailwind v4. Marketing pages = Server Components (SSR/SEO/a11y).
- **Turbopack is the Next 16 default** (dev + build; opt out `--webpack`).
- **Hero renderer: PixiJS v8**, mounted as a **`'use client'` component that initializes Pixi inside
  `useEffect`** — NOT `next/dynamic(...,{ssr:false})` (breaks HMR under Turbopack, disallowed in Server
  Components). `useEffect` never runs on server → Pixi stays client-only and HMR survives. Never
  `@pixi/react` v7 on React 19. Raw Pixi preferred for one self-contained hero.
- **Pixel-perfect:** `NEAREST` scale mode + `roundPixels:true` + `resolution:devicePixelRatio` +
  `autoDensity:true`; **extrude/pad atlas tiles** to kill 1px seams; **integer-only scaling** (2/4/8×);
  `image-rendering: pixelated` on every sprite layer.
- **Accessibility/fallback:** the `'use client'` component renders the **static farm PNG/WebP + real
  `<a>`/`<button>` plot hotspots** first; Pixi enhances on top after mount. `matchMedia` for reduced motion.
- **Cleanup:** full `app.destroy(...)` in effect cleanup (React 19 StrictMode double-mount safe); Pixi
  `resizeTo`; tree-shake Pixi imports; guard double-init.
- **Verify the Pixi bundle under Turbopack EARLY** (step 2), not at polish.
- **DOM animation:** **GSAP + ScrollTrigger** (100% free incl. commercial) + **Motion** (already a dep) +
  optional **Lenis** (reduced-motion-guarded).

## Anti-slop pixel rules (encode into DESIGN.md)

ONE opinionated limited palette; ONE consistent pixel resolution/grid everywhere; integer scaling only;
`image-rendering: pixelated`; author at a fixed base resolution. **Motion canon:** Disney-12→UI + Val Head
+ Material durations (150–200ms micro, 300–400ms scene) + game-"juice" (pop-scale, particle bursts,
decelerate easing). **Quality-bar anchors:** Miu Miu **"Twist"** and **Basement Chronicles** (Awwwards).

## Execution shape (not a one-shot)

One continuous, live-watched session, whole site (6 routes), Home built first to set patterns. **The hero
does NOT one-shot** — reduced-motion, no-JS, keyboard traversal, DPR crispness, and StrictMode cleanup each
earn their own visual pass. Levers:
- **Effort:** highest for the hero + the DESIGN.md/PRODUCT.md spec; normal for boilerplate routes.
- **Subagents:** parallel fresh-context verifiers on the **hero + one template route**, not all six.
- **Watch the screenshot-comparison loop** — that's where token cost quietly compounds.
- **Localhost-live-first:** dev server (Turbopack HMR) up from the start; the `useEffect`-mounted Pixi keeps
  HMR intact.

## Build sequence

0. **Prereqs** — install **Pixelorama**; get Sprout Lands free pack; `npm i pixi.js gsap lenis` (motion is
   already installed) + add the Pixelify Sans font; **spin up `next dev` and keep it open for live preview.**
1. **Style-frames self-checkpoint** — 2–3 pixel-art hero style-frames; commit them, self-select the
   strongest, and proceed (autonomous run — no approval wait).
2. **Foundations** — rewrite `DESIGN.md` (pixel-farm system: OKLCH palette, the ONE grid/resolution,
   wooden-panel chrome, motion, pixel-rendering rules) + write `PRODUCT.md` (buyer, site-job, whimsy bet);
   Tailwind tokens + fonts; audit/strip the current site; **smoke-test a throwaway PixiJS canvas under
   Turbopack** to confirm the `useEffect` client pattern + HMR.
3. **Custom sprites** — AI-gen hero + team characters → Pixelorama cleanup → atlas + JSON Hash via CLI.
   Base world uses Sprout Lands tiles.
4. **Home `/`** — PixiJS explorable hero (static fallback + DOM hotspots + a11y) + skinned marketing
   sections. Sets the component + token vocabulary. Iterate the hero to the quality floor (multiple passes).
5. **Remaining 5 routes** — `/services`, `/work`, `/research`, `/about`, `/contact`, reusing Home's
   components/tokens. Verify each as it lands (`critique` + `audit` + `code-review`, fix P0/P1).
6. **Global polish** — `polish` + `simplify`, hero perf budget, keyboard-only plot→service traversal,
   reduced-motion/no-JS/mobile states, OG images, **Cup Nooble attribution** in footer/credits.

## Verification (hero gets the brutal budget)

- **Per-route:** browser screenshot vs approved style-frame; `critique` + `audit`; contrast/readability on
  wood panels; reduced-motion + no-JS + mobile.
- **Hero-specific (highest bar):** crisp pixels at all DPRs (no shimmer/seams); smooth 60fps ambient;
  keyboard-only plot→service traversal; Lighthouse/perf budget; StrictMode double-mount + unmount-leak check.
  **Miss the bar → static-scene fallback.**
- The repo already has a Playwright screenshot harness at `.audit/playwright-check.mjs` — reuse it.

## Decisions (confirmed)

1. **Art = ONE language, Sprout Lands free pack** as base + **custom hero/team characters authored to match**.
   Free-pack license non-commercial (on record); **user-owned decision to proceed**; Cup Nooble attribution required.
2. **Editor = Pixelorama** (manual/CLI authoring); `pixel-plugin` + Aseprite **dropped**. AI pixel-gen
   (PixelLab/Retro Diffusion) seeds custom art.
3. **Scope = whole site, one continuous live-watched session**; Home first; hero iterated over multiple passes.
4. **Hero = `'use client'` + Pixi-in-`useEffect`** (Turbopack-HMR-safe), not `dynamic ssr:false`.
5. **No audio in v1** (add muted ambient/SFX toggle later). **Autonomous, pre-approved run** — style-frames
   are a commit-and-continue self-checkpoint, not an approval gate.
