# Evlogia.ai — Visual & Frontend Craft Audit

**Auditor:** Senior frontend design engineer (Claude Opus 4.7)
**Date:** 2026-05-01
**URL:** https://www.evlogia.ai/
**Pages audited:** `/` (home), `/careers`. `/terms` and `/privacy` were enumerated from the footer but not visually audited; both are linked from the footer at `/terms` and `/privacy`.
**Viewports:** 375 / 768 / 1280 / 1440 px
**Browser:** Chromium (Playwright MCP). No real-device or Safari/Firefox runs.
**Tooling note:** Chrome DevTools MCP was not present in this session. All "computed style" and "contrast ratio" claims were derived by injecting JS into the live page (`getComputedStyle`, parsed against composited backgrounds) — the same values DevTools would report for non-image backgrounds. Where a text element sits over an image (notably the hero), I cannot pull a true rendered-pixel sample and have flagged that limitation in §9.

Evidence directory: `.audit/evlogia-visual-audit-2026-05-01/` (full-page captures at all four viewports plus per-section crops).

---

## 1. Overview

The site has a clear visual point of view — Instrument Serif display headlines, calm warm-cream page tone (`#F5F4F0`), and a heavy reliance on per-word reveal animations to feel "premium." Underneath the surface, however, the implementation has shipped without the discipline a buyer of an *applied AI engineering* firm would expect: a 19.8 MB raw JPEG is being served as a 32×32 testimonial avatar, every animated headline is split into adjacent `<span>` chunks with no whitespace text nodes (so screen readers and SEO crawlers receive `Webuildsystemsthatgetused`), the body copy across most of the page is `oklab(0 0 0 / 0.5)` (≈ `rgb(127,127,127)`) at 15 px, which is a textbook WCAG 2.2 AA 1.4.3 fail, and there is no `prefers-reduced-motion` rule anywhere in the stylesheet so motion-sensitive users get the full reveal cascade. CLS is 0 and FCP is fast (352 ms on a warm cache), which is the only Core Web Vital currently in good shape.

The single biggest issue is a tie between **the 19.8 MB `Koyal.jpg` shipped to every visitor** and **the headline-as-spans accessibility pattern**. One is a craft-and-bandwidth failure; the other is a legibility failure for assistive tech and likely an SEO drag on the H1. Either alone undermines the "applied AI research" positioning.

This site does not need a redesign — the visual direction is competent. It needs a polish pass focused on accessibility, asset pipeline, and design-system consolidation. **Roughly two engineering days closes 80 % of the findings below.**

---

## 2. Design System Inventory

Counts pulled live from the rendered homepage (only visible elements, post-reveal). For a coherent design system the targets are: ≤8 type sizes, ≤6 spacing units, ≤12 colors.

### Type scale (font-size × line-height × weight)

| Combo | Occurrences | Notes |
| --- | --- | --- |
| 36 / 41.4 / 400 | 73 | Service heading or large body — over-used |
| 10 / 15 / 400 | 31 | Eyebrow / chip text — too small |
| 64 / 68.48 / 400 | 21 | Mid headline |
| 9 / 13.5 / 400 | 12 | Micro-text — below readable floor |
| 15 / 24.375 / 400 | 11 | Body — below 16 px floor |
| 12 / 18 / 400 | 8 | Caption |
| 18 / 18 / 400 | 7 | Tight line-height (1.0) on 18 px text |
| 12 / 16 / 400 | 6 | Caption variant |
| 108 / 113.4 / 400 | 6 | Hero H1 |
| 14 / 22.75 / 400 | 5 | Body alt |
| 60.8 / 65.056 / 400 | 5 | Display variant — ad-hoc clamp output |
| 10 / 12.5 / 400 | 4 | Micro-text variant |
| 128 / 128 / 400 | 4 | Display |
| 24 / 33 / 400 | 4 | Sub-headline |
| 11 / 16.5 / 400 | 3 | Micro-text variant |
| 56 / 59.92 / 400 | 3 | Display variant |
| 18 / 28 / 400 | 3 | Subhead |
| 72 / 72 / 400 | 2 | Display |
| 30 / 41.25 / 400 | 1 | One-off |
| 160 / 160 / 400 | 1 | Hero giant variant |
| (10 more 1-occurrence variants) | 10 | Drift |

**Total distinct (size,line-height,weight) combos: 31.** Verdict: **drifting**. Even reducing this to size-only buckets, there are 16 distinct font-sizes (9, 10, 11, 12, 14, 15, 18, 18.4, 24, 30, 36, 56, 60.8, 64, 72, 108, 128, 160) — about double a healthy modular scale. A `clamp()`-driven approach is bleeding through as fractional sizes (60.8, 18.4) rather than landing on the named steps.

### Spacing scale (padding/margin values > 4 px, top + bottom)

| Value | Occurrences |
| --- | --- |
| 6 px | 50 |
| 20 px | 28 |
| 12 px | 13 |
| 128 px | 13 |
| 8 px | 11 |
| 24 px | 10 |
| 36 px | 10 |
| 16 px | 8 |
| 40 px | 7 |
| 32 px | 7 |
| 64 px | 5 |
| 10 px | 4 |
| 48 px | 4 |
| 112 px | 3 |
| 80 px | 2 |
| 96 px | 1 |
| 28 px | 1 |
| 22.75 px | 1 |
| 56 px | 1 |

**Total distinct spacing values: 19.** Verdict: **drifting**. The bulk of the system rides a 4 pt grid (8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128) — but `6`, `10`, `22.75`, `28`, `36`, `56`, `112` break the rhythm. `22.75 px` is a clamp() calculation result, not a token. `6 px` is the most common spacing on the page, suggesting a chip/pill micro-padding token is doing too much work.

### Color tokens (text colors used on actually-visible elements)

| Color (computed) | Approx. equivalent | Occurrences |
| --- | --- | --- |
| `oklab(0 0 0 / 0.9)` | `rgba(0,0,0,0.9)` | 111 |
| `oklab(0 0 0 / 0.5)` | `rgb(127,127,127)` over cream bg | 27 |
| `oklab(0 0 0 / 0.4)` | `rgb(153,153,153)` | 17 |
| `oklab(0 0 0 / 0.25)` | `rgb(191,191,191)` | 12 |
| `oklab(0 0 0 / 0.3)` | `rgb(178,178,178)` | 11 |
| `rgb(255,255,255)` | white | 9 |
| `oklab(0 0 0 / 0.55)` | `rgb(115,115,115)` | 8 |
| `oklab(0 0 0 / 0.35)` | `rgb(166,166,166)` | 6 |
| `oklab(0 0 0 / 0.45)` | `rgb(140,140,140)` | 5 |
| `oklab(0 0 0 / 0.18)` | very faint | 5 |
| `oklab(0 0 0 / 0.04)` | hairline | 5 |
| `oklab(0 0 0 / 0.06)` | hairline | 2 |
| 3 white-with-alpha variants (`/0.9`, `/0.85`, `/0.8`) | hero text variants | 3 |

**Total distinct text colors: 20.** Verdict: **no detectable system**. Black is being modulated through *nine* alpha levels (0.18, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.9) instead of a defined `text/primary`, `text/secondary`, `text/tertiary` ladder. The Tailwind utility pattern `text-black/40` was used as the design token, which is "pick a number" rather than a system.

### Border radius scale

| Value | Occurrences |
| --- | --- |
| `1.67772e+07 px` (full pill) | 38 |
| `100 px` | 12 |
| `32 px` | 12 |
| `26 px` | 12 |
| `40 px` | 4 |
| `34 px` | 4 |
| `12 px` | 4 |

**Total distinct radii: 7.** Verdict: **drifting**. `26`, `32`, `34`, `40` are four near-duplicate large-card radii where one would do. `100 px` and the full-pill radius coexist on different pill components. A 4-step ladder (`8`, `16`, `32`, `pill`) would cover every case currently shipped.

### Shadow scale

11 distinct `box-shadow` values, including a 7-layer composite on glass pill buttons (`rgba(255,255,255,0.35) 0 2px 1px 0 inset, rgba(255,255,255,0.08) 0 4px 6px 0 inset, rgba(0,0,0,0.06) 0 -1.5px 1px 0 inset, rgba(0,0,0,0.04) 0 -3px 6px 0 inset, rgba(0,0,0,0.12) 0 1px 2px 0, rgba(0,0,0,0.08) 0 4px 8px 0, rgba(0,0,0,0.18) 0 12px 36px 0`) and a one-off green glow `rgba(52,211,153,0.55) 0 0 6px 2px` on the "Now Accepting Q3 Engagements" status dot. Verdict: **drifting**. The 7-layer composite is the headline component's signature and is fine, but most other shadows are one-offs.

---

## 3. What Works

- **Hero composition (`hero-1440.jpeg`)** — the centered Instrument Serif headline + italic continuation + tight subhead + two-action layout is balanced and unmistakably editorial. The `text-shadow: 0 2px 40px rgba(0,0,0,0.45), 0 1px 8px rgba(0,0,0,0.3)` does meaningful work to lift the white type off the bright sky and is calibrated rather than slapdash.
- **Glass pill nav with proper z-rhythm** — the navigation chip sits 30 px from the top, doesn't compete with the hero, and the slight backdrop-blur is restrained. At 1440 px it reads as one component, not five buttons.
- **Heading order** — DOM-order H1 → H2 (×6) → H3 (×5) → H4 (×3) → H2 with no skipped levels and exactly one `<h1>`. Passes WCAG 2.4.6 / 1.3.1 at the structure level (the *content* of the headings is the problem — see §4).
- **Single-`<main>` / single-`<nav>` / single-`<header>` / single-`<footer>`** — landmark structure is correct and minimal. Nine `<section>` elements is reasonable for a long-scroll homepage.
- **Mobile reflow at 375 px** is clean — no horizontal overflow (`document.documentElement.scrollWidth === 375`), the hero collapses to a workable two-line headline at `font-size: 28.125 px` with `line-height: 1.05`, the service grid stacks one-up, and the marquee continues to rotate without breaking. (`hero-375.jpeg`)
- **CLS = 0** — no layout shift observed across full-page scroll, including over the marquee region and the lazy-loaded testimonial avatars. This is hard-earned and worth keeping.
- **Color palette discipline at the surface level** — the cream `#F5F4F0` page tone, white card surfaces, and Instrument-Serif-on-cream feel like a single brand voice. The problem is the *secondary* palette (the alpha-black ladder), not the primary tone.

## 4. What Doesn't Work

### Typography

- **Body copy at 15 px on 50 % black** is not a body-copy color — it's a hint color, used for paragraph text. Fails WCAG 2.2 AA 1.4.3 (see §5 / §7).
- **Eyebrow labels at 10 px on `text-black/40`** appear in 6+ places (`What We Do`, `FAQ`, `WHO WE ARE`, etc.). 10 px is a legibility risk on its own; 10 px at ~2.7:1 contrast is a categorical fail.
- **108 px H1 with line-height 1.05** would be tight even with neutral letterforms; with Instrument Serif's tall ascenders and descenders the italic line ("that get used.") nearly clips the upright line above. (`hero-1440.jpeg` — visible where the descender of "build" almost meets "that".)
- **`18 / 18 / 400` (line-height 1.0)** — seven elements ship with line-height equal to font-size, which is unreadable for any wrapped text. Used on labels, but easy to inherit accidentally.
- **Mixed clamp() output sizes** (`60.8 px`, `18.4 px`, `22.75 px`) leak fractional values into the type scale, making the system feel improvised.

### Color / contrast

- **`text-black/50` on `#F5F4F0`** — composed `rgb(127,127,127)` over `rgb(245,244,240)` ≈ **3.99:1**. Used for every service card description and most secondary copy. Fails AA 1.4.3 (4.5:1 required for text below 18.66 px).
- **`text-black/40` on `#F5F4F0`** — composed `rgb(153,153,153)` over `rgb(245,244,240)` ≈ **2.73:1**. Used on eyebrows. Fails AA 1.4.3 outright.
- **"View Our Research↓"** in the hero is `color: rgb(255,255,255); font-size: 14 px; font-weight: 400`, no underline, no chip background, sitting directly over the hero image (which is dominated by light sky and pastel meadow). Even with the hero's text-shadow on the headline, this 14 px link does **not** inherit a shadow strong enough to clear AA 1.4.3 over the lit portions of the image. (`hero-1440.jpeg` — visible bottom-right of the CTA row.)
- **Focus ring color: `rgba(0,0,0,0.3) solid 2px`** = composed ~`rgb(178,178,178)` on the cream page bg. Contrast ≈ **1.93:1**. Fails WCAG 2.2 AA 1.4.11 Non-text Contrast (3:1 required for focus indicators). Confirmed visually in `focus-nav.jpeg` — focus on "About" is barely a hairline.
- **Status dot "Now Accepting Q3 Engagements"** has a green glow `rgba(52,211,153,0.55) 0 0 6px 2px` that is the single saturated color on the page and feels imported from a different brand.

### Layout & spacing

- **Cardinal spacing values 6 px and 22.75 px** are the two most-used spacing values that don't belong to a 4-pt or 8-pt grid. They generate visible micro-misalignment between chip rows and card rows.
- **Section vertical rhythm is irregular**: the "Real systems. Not just R&D." section sits at a 128 px gap from the hero, but the gap between "Real systems" and "Most agencies pitch" is closer to 96 px. The "When the problem is genuinely hard" section pushes 112 px above. No detectable single vertical rhythm. (`home-1440-forced.jpeg` — measured gap variance ≥ 32 px between adjacent section breaks.)
- **Logo marquee row** at 1280 px renders some logos at 96×28 (Inspire AVIF, Nitte SVG) but the 9× upscaled `lionel.png` becomes visibly soft — even though the visible row is 32×32, the source is 435×713 stretched.

### Motion & interaction

- **No `prefers-reduced-motion` rule exists** — `motionRules.length === 0` on the entire shipped CSS. Per-word reveals, scaled card reveals, marquee rotation, and the bouncing "Scroll to Explore" indicator all play even when the OS asks for reduced motion. Fails WCAG 2.3.3 (AAA target) and is a poor signal for an "applied AI research" brand.
- **Marquee runs continuously, no pause/play control, no `aria-hidden`.** Logo names (10 Seconds, Edoxi, Inspire, Nitte, Aambianz, Magniz, Ocean Charge, Sell My Plot, Vanora) are read in an infinite loop by screen readers. Fails WCAG 2.2.2 Pause, Stop, Hide.
- **Testimonial cards are `<button type="submit">` with `onclick`** but live outside any `<form>` and don't appear to do anything visible (they don't open a modal that I could verify with the snapshot). Either they should not be buttons, or they should announce a meaningful purpose via `aria-label`.
- **"Scroll to Explore" caption** is white at **20 % alpha** (`text-white/20`) at 10 px on the hero image — by design unreadable. The animation runs forever. Either remove it or raise it to a contrast that respects the user.

### Imagery & assets

- **`Koyal.jpg` is 19.8 MB** (`Content-Length: 19806283`) for a 32×32 displayed avatar. Source is 9504×6336 raw JPEG, served from `/public` directly — bypasses Next/Image. (`heaviestT[0]` — 19,806,283 bytes per HEAD response.)
- **`lionel.png` is 250 KB** for a 32×32 avatar (435×713 source PNG, also served raw).
- **`bg.png` (hero background) is 725 KB PNG** at 1920 wide. PNG is the wrong format for a photographic hero — AVIF or WebP would be ~150–250 KB.
- **`evlogia-combination-mark.png` (footer logo)** is 89.5 KB, 3001×3001 source for a 120×130 display, no AVIF/WebP, `loading="auto"`.

### Accessibility (covered fully in §7)

- **Per-word headline span pattern** strips whitespace from every animated headline. Screen readers read `Webuildsystemsthatgetused` instead of "We build systems that get used." Fails WCAG 1.3.1.
- **No skip-to-content link** — first Tab lands on the logo, then nav links, before users can reach the H1 / main. Fails WCAG 2.4.1.
- **Marquee region has no controls** (covered above).

---

## 5. Critical Issues

**1) Headlines are unreadable to screen readers. (Home, all viewports.)**
The `<h1>` markup is `<h1><span>We</span><span>build</span><span>systems</span>…</h1>` — every word is an `<span style="display:inline-block;margin-right:0.25em">` with **no whitespace text node between siblings**. `h1.textContent` returns `Webuildsystemsthatgetused.`, which is exactly what NVDA/JAWS/VoiceOver will announce. Same pattern on every animated H2 (`Realsystems.NotjustR&D.`, `Whentheproblemisgenuinelyhard.`, `Whoweare.`, `Questionswegetasked.`). Impact: catastrophic for assistive tech, measurable SEO drag (Google's ranker tokenizes on text nodes). Fix: either insert real space text nodes between sibling spans (`<span>We</span> <span>build</span>`) or apply `aria-label="We build systems that get used."` on the `<h1>` plus `aria-hidden="true"` on each word span. Either fix is a one-character-per-word patch in the headline component.

**2) Body copy fails WCAG 2.2 AA contrast across the whole page. (Home, all viewports.)**
Every service-card paragraph, "When the problem is genuinely hard" subhead, "Who we are" body, FAQ body — anywhere `text-black/50` is used at 15 px — composes to `rgb(127,127,127)` on `rgb(245,244,240)` for **3.99:1**. AA 1.4.3 requires 4.5:1 for body text. The `text-black/40` at 10 px on eyebrows composes to `rgb(153,153,153)` for **2.73:1**, which is the worst offender. Impact: the site is technically inaccessible for low-vision users and will fail any commercial accessibility audit a procurement team runs. Fix: redefine `text-black/50` → `text-black/70` (`rgba(0,0,0,0.7)` ≈ 5.74:1, AA pass), and `text-black/40` → `text-black/65` for eyebrows. CSS-token-level change, no markup edits required.

**3) Single asset is 19.8 MB. (Home, testimonial row.)**
`https://www.evlogia.ai/Koyal.jpg` returns `Content-Length: 19806283` (~19.8 MB) for a 9504×6336 raw photo, displayed as a 32×32 testimonial avatar. The other three avatars (`lionel.png` 250 KB, `srikar.jpeg` 47 KB, `fasil.jpeg` 60 KB) are smaller but still oversize for a 32 px circle. On a cold cache and a 4G connection (1.6 Mbps), `Koyal.jpg` alone takes ~100 seconds to deliver. Impact: bandwidth burn, terrible LCP for any user whose connection has to download this asset before the testimonial paints (it does not currently dominate LCP because the hero word `<span>` paints first, but it dominates total weight by 95×). Fix: route every testimonial avatar through `next/image` with `width={64}` and a 2× source variant; replace `/public/Koyal.jpg` with a 128×128 AVIF (~2 KB).

**4) Focus indicator fails WCAG 2.2 AA 1.4.11. (Home, all interactive elements except the dark-pill primary button.)**
The shipped focus rule is `*:focus-visible { outline: rgba(0,0,0,0.3) solid 2px; outline-offset: 2px }`. On the cream page background that composes to ~1.93:1 — below the 3:1 minimum for non-text UI components. Visible in `focus-nav.jpeg`: focus on the "About" link is a hairline barely distinguishable from the glass pill. Impact: keyboard-only users cannot tell where they are on the page. Fix: change the focus rule to `outline: 2px solid #0A0A0A; outline-offset: 3px` on light surfaces, and add a paired rule `[data-on-image] :focus-visible { outline-color: #fff; outline-offset: 3px }` for the hero CTAs over the photographic background.

**5) No `prefers-reduced-motion` support anywhere. (Whole site.)**
Zero CSS rules in any of the 11 stylesheets reference `prefers-reduced-motion`. Every animation — per-word reveal, card scale-in, marquee, scroll-explore bounce, FAQ accordion — runs unconditionally. Impact: motion-sensitive and vestibular-disorder users get the full cascade. WCAG 2.3.3 (AAA) miss; also a brand-trust signal for a company selling AI engineering. Fix: add a single global rule, `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; animation-iteration-count: 1 !important; } }`, plus an explicit guard in the IntersectionObserver-driven reveal component to set the final state immediately when `matchMedia('(prefers-reduced-motion: reduce)').matches`.

**6) Hero copy disappears under noscript / SEO crawlers / when the IntersectionObserver doesn't fire. (Home, all viewports.)**
On the very first full-page screenshot before any scroll, the hero rendered correctly but every section below the fold rendered blank (`home-1440.jpeg`). Investigation showed 30+ elements with `opacity: 0` and `transform: translateY(28-40 px) scale(0.97)` — initial state for `.reveal` / `.reveal-scale` IntersectionObserver triggers. After a programmatic scroll loop, only some recovered (`home-1440-after-scroll.jpeg`); only after force-reset of opacity (`home-1440-forced.jpeg`) did the page show all content. Impact: Googlebot rendering with no scroll sees a near-blank page; share-card crawlers that take a snapshot before scrolling capture nothing. Fix: ship the page with content visible by default (`opacity: 1`) and **animate-in only on first viewport intersection**, not animate-in **from** hidden — this is the pattern the page already half-uses for above-the-fold content.

**7) Hero background is a 725 KB photographic PNG. (Home, all viewports.)**
`/_next/image?url=%2Fbg.png&w=1920&q=75` returns `Content-Length: 725349` and `Content-Type: image/png`. PNG is a lossless format and is the wrong tool for a photographic background. Next/Image is being used (so resizing works), but the source `/public/bg.png` should be replaced with `/public/bg.jpg` or `/public/bg.avif` to let Next's pipeline serve AVIF/WebP. Impact: ~500 KB of avoidable transfer on every cold visit, mostly hits LCP at slow bandwidth. Fix: re-export the source as a 75 % quality AVIF; expected output ~150–200 KB.

---

## 6. Recommendations

| Priority | Page/Area | Specific Fix | Implementation Notes | Effort |
| --- | --- | --- | --- | --- |
| **High** | All headlines | Insert whitespace text nodes between word spans, **or** add `aria-label` on H1/H2 + `aria-hidden="true"` on visual spans | In the headline component, replace `words.map(w => <span>{w}</span>)` with `words.map((w, i) => <><span aria-hidden>{w}</span>{i<words.length-1?' ':''}</>)` and keep the parent heading's accessible name from a single source string | S |
| **High** | Global text styles | Lift body / secondary contrast above 4.5:1 | Replace `text-black/50` → `text-black/70`; replace `text-black/40` → `text-black/65`; replace `text-black/55` → `text-black/75`. Tailwind config or single CSS sweep | S |
| **High** | `/public/Koyal.jpg` (and other testimonial avatars) | Re-export to 128×128 AVIF and serve through `next/image` | `npx @squoosh/cli --avif '{quality:60}' Koyal.jpg`; replace `<img src="/Koyal.jpg" />` with `<Image src="/koyal.avif" width={64} height={64} alt="Koyal Kiran" />`. Apply same to `lionel.png`, `srikar.jpeg`, `fasil.jpeg` | S |
| **High** | `/public/bg.png` | Re-export hero to AVIF (quality ~70) | Replace `/public/bg.png` with `/public/bg.avif`; update the `<Image src="/bg.avif" />` reference in the hero. Expected: 725 KB → ~180 KB | S |
| **High** | Global focus styles | Bring focus indicator ≥ 3:1 on every surface | In `globals.css`: `:focus-visible { outline: 2px solid #0A0A0A; outline-offset: 3px; border-radius: 4px; }` and a second rule scoped to the hero: `[data-hero] :focus-visible { outline-color: #ffffff; }` | S |
| **High** | All animation rules | Add `prefers-reduced-motion` guard | Append to `globals.css`: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } .reveal, .reveal-scale { opacity: 1 !important; transform: none !important; } }` | S |
| **High** | Reveal pattern | Default-show content; animate enter only when JS confirms intersection | In the reveal component, swap initial CSS from `opacity:0; transform:translateY(40px)` to a JS-toggled class that the component adds after mount and removes on intersection. SSR delivers content visible | M |
| **High** | "View Our Research" hero link | Raise contrast over hero photo | Either wrap in a `bg-black/30 backdrop-blur-sm` chip (matches the "Now Accepting" pill aesthetic), or change `color: rgba(255,255,255,1)` to `color: rgba(255,255,255,1)` plus `text-shadow: 0 1px 2px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)`, and add `text-decoration: underline` so it reads as a link | S |
| **High** | Layout root | Add a skip-to-content link | At the top of `<body>`: `<a href="#main" class="sr-only focus:not-sr-only ...">Skip to content</a>`; mark `<main id="main">` | S |
| **Medium** | Marquee (`marquee-wrapper`) | Pause on hover/focus; respect reduced-motion; mark decorative | Add `aria-hidden="true"` to the rotating row (logos are listed once visibly elsewhere, so they aren't hidden content). Add `:hover, :focus-within { animation-play-state: paused }` to the marquee track. Already covered by reduced-motion rule above once added | S |
| **Medium** | Testimonial cards (`<button type="submit">`) | Either make them open a modal with the full quote and add `aria-label`, or change them to `<article>` / `<figure>` if they're not interactive | If non-interactive: `<figure><blockquote>…</blockquote><figcaption>Koyal Kiran, …</figcaption></figure>`. If interactive: `<button type="button" aria-label="Read full testimonial from Koyal Kiran">…</button>` and make sure something happens on click | M |
| **Medium** | Type scale | Consolidate to 8 named steps | Define `text-xs (12)`, `text-sm (14)`, `text-base (16)`, `text-lg (18)`, `text-xl (24)`, `text-2xl (36)`, `text-display (64)`, `text-hero (clamp(56,8vw,128))`. Migrate all uses; remove 9, 10, 11, 15, 18.4, 22.75, 30, 56, 60.8, 72, 108, 160 px occurrences | M |
| **Medium** | Spacing scale | Snap all values to a 4-pt grid | Replace `6 px` (use 4 or 8), `22.75 px` (use 24), `28 px` (use 32), `36 px` (use 32 or 40), `56 px` (use 48 or 64), `112 px` (use 96 or 128) | M |
| **Medium** | Color tokens | Define a 4-step text contrast ladder | `--text-1: #0A0A0A` (primary, ≥ 12:1), `--text-2: rgba(10,10,10,0.78)` (~7:1), `--text-3: rgba(10,10,10,0.6)` (~4.7:1), `--text-4: rgba(10,10,10,0.45)` (~3:1, reserved for ≥ 18.66 px or ≥ 14 px bold). Replace every ad-hoc black-alpha utility with one of these | M |
| **Medium** | Border radius | Reduce to 4 steps | Define `--r-sm (8)`, `--r-md (16)`, `--r-lg (32)`, `--r-pill (9999)`. Drop 26, 34, 40, 100 px occurrences | S |
| **Medium** | "Scroll to Explore" caption | Either lift contrast or remove | At 10 px white/20 % it's decorative noise. Either bump to `text-white/70` and 11 px, or delete | S |
| **Low** | Logo marquee thumbs | Constrain `next/image` `sizes` so AVIF variants are picked over PNG raws | Some logos already serve via `_next/image?url=…&w=96&q=75` which is correct. The two raw assets (`Nitte.svg`, `lionel.png` for testimonial) bypass it — route them through `next/image` | S |
| **Low** | 7-layer button shadow | Document as the official "primary button" recipe | Move to a CSS variable / Tailwind plugin so the recipe isn't redefined inline on each button | S |
| **Low** | Status dot green glow | Either bring the green into the brand palette intentionally or replace with a subtler pulse | The single saturated color on the page reads as imported. Consider matching it to brand or replacing with a gentle scale-pulse on the dot | S |

---

## 7. Accessibility Findings (Standalone)

- **1.3.1 Info and Relationships — H1 and all animated H2s** — accessible name is concatenated word-spans (e.g., "Webuildsystemsthatgetused.") because adjacent `<span>`s have no whitespace text nodes between them. **Fix:** insert space text nodes or add `aria-label` on the heading + `aria-hidden` on the spans.
- **1.4.3 Contrast (Minimum) — body copy across all sections** — `text-black/50` (~`rgb(127,127,127)`) on `#F5F4F0` ≈ **3.99:1** at 15 px. Required: 4.5:1. **Fix:** lift to `text-black/70`.
- **1.4.3 Contrast (Minimum) — eyebrow labels (`What We Do`, `WHO WE ARE`, `FAQ`, etc.)** — `text-black/40` at 10 px ≈ **2.73:1**. **Fix:** lift to `text-black/65` and 11 px minimum.
- **1.4.3 Contrast (Minimum) — "View Our Research" hero link** — 14 px white (`#FFFFFF`) over a photographic hero image with bright sky and meadow regions, no chip background. Cannot give an exact ratio without rendered-pixel sampling, but visibly insufficient over the brighter regions of the image. **Fix:** add a translucent dark chip background, or stronger text-shadow + underline.
- **1.4.3 Contrast (Minimum) — "Scroll to Explore" caption** — `text-white/20` over hero photo, ~1.4:1 in best-case region. **Fix:** raise contrast or remove.
- **1.4.11 Non-text Contrast — focus indicator** — global focus-visible outline is `rgba(0,0,0,0.3)` ≈ `rgb(178,178,178)` on `#F5F4F0`, **1.93:1**. Required: 3:1. **Fix:** `outline: 2px solid #0A0A0A` on light surfaces; `outline: 2px solid #FFF` on dark/photo surfaces.
- **2.2.2 Pause, Stop, Hide — logo marquee** — auto-rotating, runs continuously, no pause control, not marked decorative. **Fix:** `aria-hidden="true"` on the rotating row + pause on hover/focus + reduced-motion guard.
- **2.3.3 Animation from Interactions (AAA) — no `prefers-reduced-motion` rule** — all motion plays unconditionally. **Fix:** global media query (see §6).
- **2.4.1 Bypass Blocks — no skip-to-content link** — first Tab on the page lands on the logo link, then nav. Keyboard users cannot jump to `<main>`. **Fix:** add a visually-hidden, focus-visible skip link as the first focusable element.
- **2.4.7 Focus Visible — focus indicator** — present but below the contrast threshold (covered above by 1.4.11). Combined fix.
- **4.1.2 Name, Role, Value — testimonial `<button type="submit">` cards** — labelled as buttons but have no clear interactive purpose, no `aria-label`, and live outside any form (so `type="submit"` is misleading). **Fix:** convert to `<figure>` if non-interactive, or to `<button type="button" aria-label="…">` plus a verifiable click handler if interactive.

---

## 8. Performance Findings (Standalone)

### Core Web Vitals snapshot (homepage, Chromium, 1440 viewport)

The numbers below were captured on a warmed cache after a `?cachebust=1` reload — they reflect the *machine pipeline* (parse, layout, JS) rather than network. The cold-cache picture is reconstructed from `Content-Length` HEAD probes against each asset (right column).

| Metric | Warm-cache value | Cold-cache risk | Throttle profile |
| --- | --- | --- | --- |
| TTFB | 152 ms | Same (server time) | Unthrottled (Chromium default) |
| FCP | 352 ms | + bg.png download (≥ 600 ms on Fast 3G) | Unthrottled |
| LCP | 352 ms (element: a `<span>` of the hero word) | + bg.png + Koyal.jpg if not lazy-deferred — likely 2–3.5 s on 4G | Unthrottled |
| CLS | **0** | Same | Unthrottled |
| Total transfer | 5 KB (cached) | ~21 MB if Koyal.jpg not deferred; ~1.1 MB JS+CSS+fonts otherwise | — |
| INP | not directly measured (no interaction tested under throttle) | — | — |

### Top performance issues

1. **`Koyal.jpg` ships at 19,806,283 bytes (~19.8 MB)** for a 32×32 testimonial avatar. Source is a 9504×6336 raw photo placed in `/public` and referenced as `<img src="/Koyal.jpg">`, bypassing Next/Image's resize pipeline. Even with `loading="auto"` (which on most browsers behaves as eager for above-the-fold images), the asset is requested on first paint. On a 4G connection (~5 Mbps down) this single asset adds ~32 seconds to Speed Index. Fix: re-export as 128×128 AVIF and route via `<Image>` — expected ~2 KB.

2. **Hero `bg.png` is a 725 KB PNG** served via `_next/image?url=%2Fbg.png&w=1920&q=75`. Next/Image is used (so dimensions are correct), but Next can only serve the format you give it; PNG-to-PNG transformation can't materially shrink a photographic image. Re-export source to AVIF; expected output ~180 KB at q=70 visually indistinguishable.

3. **`lionel.png` ships at 250 KB** for a 32×32 avatar (435×713 PNG source, no resize). Same fix as `Koyal.jpg`.

4. **`evlogia-combination-mark.png` is 89.5 KB** for a 120×130 footer logo. The source is a 3001×3001 PNG, no AVIF/WebP variant. Either re-export to a small AVIF or accept the 89 KB cost — it's the smallest of the offenders.

5. **JS budget is healthy on warm cache** — the heaviest chunk is 400 KB decoded (`0vssi8tm93jtr.js`). Total JS decoded: 894 KB, total CSS decoded: 67 KB. Nothing screamingly oversized for a Next.js App Router site, but the Framer-Motion / per-word-reveal infrastructure is part of the cost. Worth profiling whether the reveal animations could be CSS-only (animation-name + animation-delay staggered via `--i: var(--word-index)`) rather than JS-driven.

---

## 9. What I Could Not Verify

- **True rendered-pixel contrast over the hero image.** Without Chrome DevTools MCP (or canvas sampling, which Playwright `browser_evaluate` cannot do via cross-origin `<img>`), I cannot give an exact contrast ratio for the hero subhead and "View Our Research" link against the photographic background. The findings are anchored on visible legibility in `hero-1440.jpeg` and in the source CSS. A second pass with rendered-pixel sampling would convert "borderline" into a hard ratio.
- **Cold-cache LCP / INP.** I report warm-cache LCP only. A throttled-network cold-cache trace (Fast 3G profile) was not run because the available MCP environment does not expose Chrome's `Network.emulateNetworkConditions` directly. Cold LCP is reconstructed from `Content-Length` headers, not measured.
- **Cross-browser rendering.** Audited Chromium only. Safari-specific quirks (backdrop-filter blur intensity, Instrument Serif italic kerning, font-feature-settings) and Firefox quirks (CSS `clip-path` behavior on the hero shadow, the marquee `transform: translate3d` GPU layer) were not verified.
- **Real-device touch behavior.** The marquee was viewed but I did not simulate touch interaction; whether it pauses on touch-hold or accepts swipe-to-pause is not verified.
- **Reduced-motion *behavior* under OS toggle.** I verified the *absence of CSS rules* for `prefers-reduced-motion` (definitive). I did not run the page with the OS-level reduced-motion flag set to confirm the JS-driven reveals also do not check `matchMedia('(prefers-reduced-motion: reduce)').matches` — but absence of CSS guards combined with no observable reveal-pattern bypass strongly suggests they do not.
- **`/terms` and `/privacy` pages.** Linked from the footer but not visually audited under this run. Findings are likely a subset of the home/careers findings (same global tokens), but a fresh sweep would confirm.
- **Form interactions.** No public form was reached during the sweep (the email link is `mailto:`). Field-level a11y patterns (programmatic labels, error states) are not in evidence.
