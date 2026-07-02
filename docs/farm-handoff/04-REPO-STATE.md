# 04 — Repo State (ground truth at handoff)

Inspected live during setup. This is what actually exists, so you don't have to rediscover it.

## Stack (from package.json)

- **Next.js `16.2.1`** (App Router) · **React `19.2.4`** · **Tailwind CSS v4** (`@tailwindcss/postcss`) ·
  **TypeScript 5** · npm.
- ⚠️ **Read `AGENTS.md` + `CLAUDE.md` at the repo root first.** AGENTS.md warns this Next.js version has
  breaking changes vs training data and says to consult `node_modules/next/dist/docs/` before writing code.

### Deps already present
`@calcom/embed-react`, `@radix-ui/react-slot`, `class-variance-authority`, `clsx`, **`motion` ^12.38**
(Framer Motion — already available for DOM micro-interactions), `posthog-js`, `tailwind-merge`, `shadcn` ^4.

### Deps you must add (plan step 0)
`pixi.js` (v8), `gsap` (+ ScrollTrigger), `lenis` (optional). **Not yet installed.** Also add the
**Pixelify Sans** display font.

## Fonts — real state (differs from the plan's assumption)

`src/app/layout.tsx` currently loads **Inter** (`--font-inter`) + **Instrument Serif**
(`--font-instrument-serif`) via `next/font/google`. (Git history shows earlier experiments with
"Pixelta"/"NeueMontreal" — there are custom fonts in `public/fonts/`.) The plan text says "keep Geist" but
the repo does not use Geist. **Redesign reality:** replace the display face with **Pixelify Sans**; keep a
clean readable **body** (Inter is fine, or swap deliberately). Pixel font for headings/labels only.

## Routes

- **Exist:** `/` (`src/app/page.tsx`), `/careers`, `/privacy`, `/terms`.
- **New IA to add:** `/services`, `/work`, `/research`, `/about`, `/contact`. Keep + re-skin careers/privacy/terms.

## Real content to PRESERVE into the new skin (do not drop)

- **Client logos** (`public/`): 10seconds, Edoxi, Inspire, Nitte, aambianz, magniz, oceancharge, sellmyplot,
  vanora — used in a marquee in `page.tsx`.
- **Testimonials** (`src/components/testimonials.tsx`) + person photos in `public/` (fasil, Koyal, lionel,
  srikar, Trivikram, etc.).
- **Team:** Arjun (Engineering), Aneesh (Applied AI), Ethan (Product & Delivery), Karthik (Hardware) — in
  `page.tsx`. `public/founder.JPG` is new/untracked.
- **FAQ** (`faq.tsx`), **How We Work** (`how-we-work.tsx`).
- **Cal.com booking:** `@calcom/embed-react`; trigger uses `data-cal-link="ethankd/strategy"`,
  `data-cal-namespace="strategy"`. Keep it wired.
- **PostHog analytics:** `posthog-provider.tsx` + manual App Router pageview tracking (recent commit). Keep it.
- Logo marks: `public/evlogia-combination-mark.png`, `evlogia-logomark-.png`. OG images: `og-image.jpg/png`.

## Current uncommitted working tree — READ THIS BEFORE TOUCHING GIT

The repo is on `main` with a **half-finished EDITORIAL redesign uncommitted** (a *different* direction from
the pixel farm — it's being superseded):
- **Untracked (editorial WIP):** `DESIGN.md` (the editorial design system — the pixel redesign replaces it),
  `src/components/{closing-cta,editorial-testimonial,manifesto-split,metrics-band,services-bento,team-bento}.tsx`,
  `public/founder.JPG`, `skills-lock.json`, `.audit/` (see below).
- **Modified:** `globals.css`, `layout.tsx`, `page.tsx`, `faq.tsx`, `hero-section.tsx`, `how-we-work.tsx`,
  `site-footer.tsx`, `site-nav.tsx`, `team-portrait.tsx`.
- **Deleted:** `floating-dock.tsx`, `nav-controller.tsx`, `ui/dock.tsx` (an abandoned floating-dock experiment).

**Git hygiene (do this autonomously — no need to ask):** don't build on top of this messy state and don't
discard it. First **preserve the current editorial WIP on its own branch**:
`git switch -c wip/editorial-redesign && git add -A && git commit -m "wip: editorial redesign (superseded)"`.
Then **start the pixel redesign on a fresh branch off `main`** (e.g. `git switch main && git switch -c
feat/pixel-farm`). Nothing is discarded, so this is safe to do without confirmation.

## Existing components worth knowing about

- **`src/components/ui/background.tsx`** (`Animals`) — a **canvas "sheep" background** already rendered
  globally in `layout.tsx` (`<Animals animal="sheep" .../>`). Farm-adjacent; a prior experiment. Decide
  whether to repurpose or remove for the pixel farm.
- Other visual/experimental components you can mine or delete: `ascii-motion-logo`, `flow-field-canvas`,
  `flickering-grid`, `hero-orbs`, `liquid-glass`, `ripple`, `page-transition`, `scroll-reveal`,
  `stagger-grid`, `split-heading`, `motion-divider`, `reveal-label`, `animated-counter`.
- `layout.tsx` patterns to preserve/adapt: skip-link (`#main`), the `no-js`→`js` class toggle (keeps reveal
  animations opt-in for crawlers/no-JS), `PostHogProvider`, `PageTransition`.

## Verification harness already in the repo

- **`.audit/playwright-check.mjs`** + `.audit/shots/` — a Playwright screenshot script. **Reuse this for the
  implement→screenshot→compare loop** instead of building a new one.

## Where this kit lives

`docs/farm-handoff/` — `00-START-HERE.md`, `01-PLAN.md`, `02-RESEARCH.md`, `03-EXECUTION-FABLE.md`,
`04-REPO-STATE.md`. Consider adding `BUILD-NOTES.md` (one lesson per entry) as you execute.
