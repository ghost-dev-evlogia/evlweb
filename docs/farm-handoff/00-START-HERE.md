# START HERE — Evlogia "The Farm" pixel redesign · Handoff kit

You are a fresh Claude session picking up a project mid-stream. The person who set this up
worked through **research + planning** in another session (a different Claude account) and stopped
right before execution. **This folder is your entire context — you have none of that prior
conversation.** Read these five files in order; everything you need is here.

## What this project is (one paragraph)

Evlogia Labs (evlogia.ai) is an applied-AI engineering studio. Its current website is a polished but
**generic "editorial-cream"** Next.js marketing site. The owner wants a **full redesign into a cozy,
Stardew-Valley-style 2D pixel-art "farm" world** — with an **explorable interactive pixel-farm hero**
(hover/click plots → services) and a game-skinned marketing site across **6 routes**. The farm is the
brand metaphor: *most firms sell you seeds and hours; we hand you the harvest.* **Whimsy in the
world, rigor in the words** — the copy stays engineer-first and verifiable; only the visual world
becomes playful.

## Status: where the previous session stopped

- ✅ Discovery + design brief confirmed (visual direction, 6-route IA).
- ✅ Research done (skills to use, rendering tech, asset licensing, motion/anti-slop rules) — all in
  `02-RESEARCH.md`, fully cited. **You should not need to re-research; reuse it.**
- ✅ A build **plan is approved** — reproduced in full in `01-PLAN.md`.
- ✅ Repo state inspected and captured in `04-REPO-STATE.md`.
- ⛔ **No redesign code written yet.** The pixel farm does not exist. This is where you begin.

## The files in this kit (read in order)

1. **`01-PLAN.md`** — the approved, master build plan. This is your spec. Follow it.
2. **`02-RESEARCH.md`** — research dossier: curated skills, rendering tech (with the Turbopack/React-19
   gotchas), asset licenses, motion canon, anti-slop pixel rules. All URL-cited.
3. **`03-EXECUTION-FABLE.md`** — how to actually run the build: intended for the **Claude Fable 5**
   model, with effort levers, the verification loop, prompt hygiene, checkpoints, and usage pacing.
4. **`04-REPO-STATE.md`** — the real current state of the repo: stack versions, deps present vs.
   needed, existing files to keep/supersede, routes, integrations, font drift, the existing audit harness.

## Operating mode: AUTONOMOUS (pre-approved)

The owner has **pre-approved this build and does not want to be asked for approval.** Run it end to end.
Proceed on all reversible actions without pausing. Do **not** stop for style-frame sign-off, git
decisions, or "shall I continue?" checkpoints — just make the call the plan implies and keep going.
The owner may watch localhost passively; that is not a request for interaction. Only stop if you hit
something genuinely irreversible or truly outside this plan (deployment, deleting unrelated work, spending
money) — and there is nothing like that in this build.

## Your exact next action

1. Read all five files.
2. Do the **prereqs** (plan §Build sequence step 0): install deps, install Pixelorama, grab the
   Sprout Lands free asset pack, start `next dev` (Turbopack) for live preview.
3. **Style-frames self-checkpoint** (plan step 1): produce 2–3 pixel-art hero style-frames, **commit them
   to the repo** so the owner can review later, **pick the strongest direction yourself, and proceed** —
   do not wait for approval.
4. Then build in order: Foundations → custom sprites → Home `/` (perfect the hero) → the other 5
   routes → global polish. Commit at each checkpoint.

## Hard rules / warnings (do not skip)

- **The hero has a brutal quality floor.** A mediocre interactive pixel hero *damages* the studio's
  "serious systems" credibility. If you can't make it flawless, ship a **gorgeous static** pixel scene
  instead. See the "whimsy bet" in `01-PLAN.md`.
- **ONE pixel visual language.** Do not mix asset packs with different grids/palettes — that's the #1
  amateur tell. Sprout Lands (16px grid) is the single base language; everything is authored/re-paletted to it.
- **PixiJS must be `'use client'` + inited inside `useEffect`.** Do NOT use `next/dynamic(...,{ssr:false})`
  — it breaks HMR under Turbopack (Next 16 default) and kills the live-preview workflow. Details in `02-RESEARCH.md`.
- **Accessibility is non-negotiable:** every clickable farm plot needs a real, keyboard-focusable DOM
  `<a>`/`<button>` equivalent; the canvas is enhancement only. Honor `prefers-reduced-motion`.
- **Licensing note (owner-decided, on record):** the Sprout Lands *free* pack states non-commercial use;
  the owner has explicitly chosen to proceed with it. **Required:** credit "Cup Nooble" in the footer/credits.
- **Don't lose the existing site's substance.** Real client logos, real testimonials, real team, Cal.com
  booking, and PostHog analytics are already wired — carry them into the new skin, don't drop them. See `04-REPO-STATE.md`.

## The owner's working style (from the setup session)

Design-literate, decisive, cost-aware. Wants to **watch localhost live** while you build. Pushes back
hard and expects you to surface contradictions rather than paper over them. Give recommendations, not
option-surveys. Lead with outcomes.
