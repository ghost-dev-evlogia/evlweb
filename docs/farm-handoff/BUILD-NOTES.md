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
