# 03 — Execution Guide (built for the Claude Fable 5 model)

The owner intends to run this build on **Claude Fable 5**. This file distills how to run it well.
Source: Anthropic's official Fable 5 prompting guide
(https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5).

## Why Fable, and what to exploit

- **Best on hard, well-specified, long-horizon work with first-shot correctness.** The plan + this kit
  are that specification — lean on them; don't re-derive.
- **Excellent vision:** reads screenshots/web apps accurately. → the build loop is
  **implement → browser-screenshot → compare to the approved style-frame → fix.** The repo has a
  Playwright harness at `.audit/playwright-check.mjs` — reuse it for screenshots.
- **Dispatches parallel subagents well;** benefits from a **memory file** (one lesson per file).

## Prompt hygiene (do / don't) — these materially change Fable's output

- **Effort:** run **`xhigh`** for the hero + the DESIGN.md/PRODUCT.md spec; drop to **`normal`** for the
  boilerplate routes (`/services`, `/work`, `/research`, `/about`, `/contact`) once Home sets the patterns.
- **Curate skills, don't pile them on.** Over-prescriptive legacy skills *degrade* Fable. Use the skills in
  `01-PLAN.md` as taste/reference + verification, not rigid step-scripts.
- **No "show/echo your reasoning" instructions** anywhere in prompts or skills — this trips Fable's
  `reasoning_extraction` refusal and silently falls back to Opus. If a skill contains such lines, ignore them.
- **Ground progress claims against tool results.** Before reporting a route "done," point to the actual
  screenshot/audit output. Don't fabricate status.
- **Verification:** fresh-context verifier subagents beat self-critique. Run `critique` + `audit` +
  `code-review` as **separate** subagents against the DESIGN.md/PRODUCT.md spec. Scope them to the **hero +
  ONE template route**, not all six (cost control).
- **Memory:** keep a running notes file (e.g. `docs/farm-handoff/BUILD-NOTES.md`) — one lesson per entry
  (sprite scale that worked, palette hex set, a Pixi hydration fix, a Turbopack quirk). Reference it as you go.
- Give the reason behind requests; state boundaries (don't refactor unrelated code, don't add unrequested
  features).
- **This is an autonomous, pre-approved run.** The owner is not watching in real time to answer questions.
  Proceed on all reversible actions without asking; do not end a turn on a plan, a question, or a promise —
  do the work. There are no approval gates in this build (style-frames are commit-and-continue). Only stop
  for something genuinely irreversible or outside the plan — of which there is none here.

## The one thing that won't one-shot

The **interactive hero**. Budget multiple visual passes: (1) static scene + DOM hotspots + a11y baseline,
(2) Pixi mount + pixel-perfect crispness across DPRs, (3) ambient motion + juice, (4) hover/click plot
interactions, (5) reduced-motion + no-JS + keyboard + StrictMode-cleanup hardening. If after honest effort
it isn't flawless, **ship the great static scene** (plan's hard fallback rule).

## Usage / pacing (real numbers from the owner's account at handoff time)

Checked via Claude Code `/usage` during setup:
- **Weekly — Fable: ~2% used** (resets ~Jul 6). ⇒ **Huge headroom; finishing the whole build this week is
  safe.** Fable has its *own* weekly bucket, barely touched.
- **Weekly — all models: ~7% used.**
- **5-hour session window: ~58% used, resets ~3:49am (Asia/Calcutta)** — most of it spent by the *setup/
  planning* session, not the build.

**Implication:** the build is **pacing-constrained, not quota-constrained.** Don't try to cram all 6 routes
into a single 5-hour window. Use the plan's checkpoints (style-frames gate → **Home to completion, commit**
→ per-route). After Home, re-check `/usage` to see the per-route cost, then pace the rest across windows.

**Cost multipliers the owner's `/usage` flagged:**
- ~95% of recent usage came from **subagent-heavy** sessions → be deliberate about spawning subagents.
- ~30% of usage was at **>150k context** → **start execution in a fresh session** (this kit is on disk;
  read it cold with minimal context). `/clear` or `/compact` when switching tasks.

## First moves in the fresh session

1. Read `00-START-HERE.md` → `01-PLAN.md` → `02-RESEARCH.md` → `04-REPO-STATE.md`.
2. Prereqs (plan step 0): `npm i pixi.js gsap lenis`; add Pixelify Sans; install Pixelorama; download the
   Sprout Lands free pack; `npm run dev` (Turbopack) and keep it open.
3. **Smoke-test a throwaway `'use client'` + `useEffect` PixiJS canvas** to confirm HMR under Turbopack
   before building anything real.
4. Style-frames self-checkpoint → commit them, self-select the strongest → proceed (no approval wait).
5. Commit at every checkpoint (style-frames committed, Home done, each route done, polish done). Work on a
   feature branch, not `main`.
