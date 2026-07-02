# BUILD-NOTES — pixel-farm execution log

One lesson per entry. Newest at the bottom. Written by the executing agent as it goes.

- **Repo state at start:** editorial WIP preserved on `wip/editorial-redesign` (929b398);
  pixel build runs on `feat/pixel-farm` off `main` (d55506f). Handoff kit + `.audit/` harness +
  `founder.JPG` carried onto the pixel branch (untracked files vanish on branch switch otherwise).
- **Dev server:** port 3000 was taken by another process → `next dev` runs at **localhost:3001**.
  `.audit/playwright-check.mjs` conveniently defaults to 3001.
- **itch.io free-pack download without login:** GET game page → POST `/download_url` with
  `csrf_token` → GET the returned keyed page (key expires in ~30 s, use immediately) → POST
  `/file/{upload_id}?source=game_download&as_props=1` with csrf + `Referer: <keyed page>` → JSON
  `{url}` → fetch zip. The `as_props=1` + Referer combo is what makes it return the signed URL.
- **Sprout Lands ground truth:** basic pack + UI pack downloaded, needed sheets copied to
  `public/farm/sprites/` (kebab-case). ALL sheet dimensions divide by 16 — one 16px grid confirmed.
  Official palette PNG decoded: **97 colors in 12 ramps + paper white** (see DESIGN.md). Outline
  dark = `#353738`. License readmes archived in `docs/licenses/` — credit "Cup Nooble" required.
- **Character sheet layout (character.png 192×192):** 4×4 macro-grid of **48×48 frames**; the
  drawn farmer (a cream cat-person in overalls) is ~16×22 px centered in each frame. Rows top→bottom:
  front idle ×2cols? — actually 4 columns = animation frames; rows = facing (down, up, right, left).
  Cow 32×32 ×3+2 frames; chicken 16×16 ×2 idle + walk row.
- **Scene = single source of truth:** `src/farm/scene.ts` (tilemap + plots + objects) is consumed
  by BOTH the build-time PNG compositor (`scripts/render-farm.mjs`, pngjs) that makes the static
  no-JS fallback AND the PixiJS runtime. Fallback and live hero can never drift apart.
- **Style-frames self-checkpoint (committed):** three scene variants rendered from the same
  scene.ts engine → `docs/farm-handoff/style-frames/{homestead,riverside,orchard}.png`.
  **Selected: HOMESTEAD** — balanced diagonal (house TL → trail → plots C → pond BR), zero
  collisions, quiet top band for the DOM headline. Riverside has a coop/sunflower collision;
  orchard drops mushrooms into the pond. `buildScene("final")` ≡ homestead layout.
- **Farmhouse assembly (from Cup Nooble's own promo art):** wide house = roof-slab columns
  L/M/R (wooden-house.png cols 4/5/6, 1×5 each, tileable) drawn OVER a plank wall strip
  (tower base row L/M/R) at roof-y+4, door + window in the wall row, scallop tips overhang.
  Trying to pair roof.wide + wall.wood 3×2 reads as a burnt cabin — don't.
- **Pond trick:** rectangular water fill + the grass ISLAND tiles mirrored inward as the ring
  (pond-TL ← island-BR etc.) — grass rounds into the water exactly like the pack's promo.
- **Turbopack panic "Next.js package not found → Failed to write app endpoint":** caused by
  running `npm i` while `next dev` runs. Fix: kill server, `rm -rf .next`, restart. Also:
  `pkill -f "next dev"` killed an unrelated stale process that held :3000 — dev server now
  lives at **localhost:3000**.
- **Node 25 runs .ts scripts natively** (type stripping) — `node scripts/render-farm.ts` works
  with explicit `.ts` import specifiers; pngjs is CJS → `import pkg from "pngjs"`.
- **Tailwind v4 footgun — responsive position swap:** `relative md:absolute` does NOT work:
  base `.relative` sorts after `.md\:absolute` in v4's output (same specificity, later wins),
  so the element stays relative at md+. Same class of bug for `md:-translate-x-1/2` overriding.
  Fix: never mix base + variant position utilities on one element — hoist positioning into a
  dedicated wrapper that has ONLY the `md:` utilities (base = static flow).
- **Hero responsive model:** desktop = HUD panel absolutely overlaid at top-3% + in-plot chip
  links; mobile = panel in flow above the canvas, chip-link ROW below the canvas (in-canvas
  chips unusable at ~390px). Letterboxed device-integer scale everywhere; reduced-motion =
  still frame (verified identical screenshots 1.2s apart); no-JS = static PNG + real links.
- **fullPage Playwright screenshots lie about ScrollReveal content** — IO reveals don't fire
  during the stitched capture, sections look blank. Scroll the page first, or shoot per-section
  viewports. The live DOM was always fine.
- **OG card pipeline:** crop 1200×630 from `farm-static@3x.png` (bias toward the plots), then
  composite the wooden headline panel in a throwaway HTML page screenshotted with Playwright.
  Pixelify Sans must load via the Google Fonts CSS URL — guessing gstatic woff2 URLs fails
  silently to a serif fallback.
- **Perf snapshot (1440×900, dev build):** hero animates at display refresh (120fps measured via
  rAF), 36 MB JS heap after idle. Pixi ticker capped at maxFPS 60; rAF measures the browser loop.
- **Verification pass:** two fresh-context subagents dispatched per the plan — design critique
  (hero + /services, screenshots at both breakpoints) and adversarial code review of the hero
  stack (StrictMode/destroy paths, texture lifecycle, DPR math, a11y, Cal double-init).
- **Pixelify Sans ships a broken lowercase "fi" ligature** — "fields" rendered as "Aelds" in the
  /services H1 (uppercase text never ligates, which hid it elsewhere). Fix: `font-variant-ligatures:
  none` + `font-feature-settings: "liga" 0, "calt" 0` on every pixel-font class. Note: after editing
  globals.css via scripts, Turbopack served STALE CSS — rule was absent from document.styleSheets
  until `rm -rf .next` + restart. Verify CSS fixes against the built stylesheet, not just the source.
- **Unlayered custom CSS beats Tailwind's layered utilities**: `.pixel-btn { display:inline-flex }`
  (unlayered, globals.css) overrides `md:hidden` (inside @layer utilities) regardless of order —
  responsive hiding of chrome-classed elements must live on a wrapper element.
- **Team = pixel farmhands** (critique P0): four palette-swapped recolors of the Sprout farmer
  (overalls ramp #5c4e92/#766daa remapped per member: berry/grass/harvest/sky) with role props
  (chest/sunflower/egg/tools), composed at public/team-pixel/*.png (160×200, 4:5). Generator logic
  lives in this repo's history (scratchpad script); consistent > one real photo + three initials.
- **Verifier findings triaged:** code review P0 (texture-cache destruction on nav) + P1s fixed and
  regression-tested; design critique P0s (ligature, team placeholders) + P1s (blurb tooltip, tap
  copy, sunflower chip height, avatar frames, CTA deserts, mobile nav Book) all fixed. Deferred:
  logo source-asset normalization (Edoxi gray plate, Vanora contrast) — needs owner-supplied marks.
- **BUILD COMPLETE (2026-07-03).** feat/pixel-farm: 6 routes + 3 legal pages in one Sprout Lands
  language; interactive hero passed its quality gates (crisp DPR-integer pixels, keyboard
  traversal, reduced-motion still frame, no-JS static+links, StrictMode-clean, nav-loop
  regression, 120fps, 0 console errors) — the static-scene fallback was NOT needed. Production
  build: 11 static routes. Verifier P0/P1s all fixed. Remaining for the owner: real LinkedIn
  URLs (arjun/aneesh/karthik are placeholders from the old site), logo source-asset cleanup
  (Edoxi plate, Vanora contrast), and the decision whether to keep pixel farmhands or swap in
  photos once all four exist.
- **V2 "A Day on the Farm" (2026-07-03):** single-page journey rebuild on owner direction —
  new voice (PostHog-warm + dbrand-nerve; refs in ~/Downloads/{posthog,dbrand}.md), day-cycle
  sky, living critters, game HUD instead of a nav bar. 15 UI upgrades shipped (cat-paw cursors,
  scroll-grown crops, tilled headings, quest board, NPC testimonials, golden-chicken easter egg,
  'harvest' konami, chicken Cal loader, pond band, cloud shadows, star-pop buttons…).
- **Reveal-animation rule proven again:** clip-hidden panels + IO missed in the first sweep —
  entrances must ENHANCE a visible default (animate ON class-add, no hidden initial state,
  no `forwards` fill needed).
- **SkyCycle architecture:** fixed z-0 layer + content z-10 (a -z layer hides behind the body
  background). One rAF-throttled scroll handler mutates background + two CSS vars
  (--cloud-alpha/--star-alpha); clouds drift on pure-CSS clocks. Reduced-motion keeps the
  SSR-inlined static day sky.
- **Critters are DOM sprites** (background-crop + 10Hz interval + transform snapped to whole
  px) — no canvas needed for a handful of actors; eggs/golden-chicken coordinate through
  window CustomEvents ('egg-collected' / 'golden-chicken') between Critters, Hud, and Fx.
- **Old routes → 308 redirects to anchors** via next.config.ts redirects(); deleted pages'
  stale `.next/types` validator errors clear with `rm -rf .next`.
