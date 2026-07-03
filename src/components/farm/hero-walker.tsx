"use client";

import { useEffect, useRef, useState } from "react";
import { TILE, T, SHEET_DIMS } from "@/farm/tiles.ts";

/* ONE brown cat, walking the whole path. A page-level sprite (not trapped in
   the hero canvas): on load it strolls out of the farmhouse, down the trail,
   through the connector to the road; after that it's scroll-driven down the
   road as you journey the fields. Positions itself in document coords from the
   hero-stage geometry (--hero-tile/-stage-left/-stage-top) the hero publishes,
   and the road's real screen X. Decorative, md+ only, off under reduced-motion. */

const SCALE = 2;
const BOX = 3 * TILE * SCALE; // 96px frame box, art centred
const FRAMES = { down: T.farmer.down, left: T.farmer.left, right: T.farmer.right };
type Dir = keyof typeof FRAMES;

export function HeroWalker() {
  const ref = useRef<HTMLSpanElement>(null);
  const [frame, setFrame] = useState(0);
  const [dir, setDir] = useState<Dir>("down");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "0"; // no walk; the path just sits there
      return;
    }

    const geom = () => {
      // measure the live hero stage (the canvas's box) directly — CSS vars can
      // be stale before layout settles. Convert to document coords.
      const canvas = document.querySelector<HTMLElement>("#top canvas");
      const stage = canvas?.parentElement ?? document.querySelector<HTMLElement>("#top [style*='aspect-ratio']");
      const s = stage?.getBoundingClientRect();
      // stage geometry: measured rect first; else the hero's published vars
      // (before the WebGL canvas mounts the rect is absent) — never the origin.
      const root = getComputedStyle(document.documentElement);
      const varN = (n: string, fb: number) => parseFloat(root.getPropertyValue(n)) || fb;
      const tile = s ? s.width / 32 : varN("--hero-tile", 32);
      const sLeft = s ? s.left : varN("--hero-stage-left", 128);
      const sTop = (s ? s.top + window.scrollY : varN("--hero-stage-top", 224));
      const road = document.querySelector<HTMLElement>(".dirt-road");
      const rr = road?.getBoundingClientRect();
      const band = rr ? rr.width : 48;
      const roadCX = rr ? Math.round(rr.left + rr.width / 2) : sLeft + 1.5 * tile;
      // the terrain seam (top of the road) and where the hero trail lands there
      const seamY = (rr ? rr.top : sTop - window.scrollY + (s ? s.height : 13 * tile)) + window.scrollY;
      const terrain = document.querySelector<HTMLElement>(".terrain");
      const trailRaw = terrain ? getComputedStyle(terrain).getPropertyValue("--trail-x") : "";
      // --trail-x is the LEFT of the 48px trail band; +half a band centres it
      const trailCX = (parseFloat(trailRaw) || sLeft + 7 * tile) + band / 2;
      const cornerY = seamY + tile * 0.6; // mid-connector, where the L turns
      // waypoints [docY, centreX]: house door → straight DOWN the trail to the
      // seam → LEFT along the connector onto the road. Real dirt the whole way.
      return {
        tile,
        roadCX,
        wp: [
          [sTop + 8 * tile, sLeft + 5.5 * tile], // door
          [cornerY, trailCX], // down the trail to the connector
          [cornerY, roadCX], // left along the connector onto the road
        ] as [number, number][],
      };
    };

    const place = (cx: number, cy: number, d: Dir) => {
      el.style.transform = `translate(${Math.round(cx - BOX / 2)}px, ${Math.round(cy - BOX * 0.72)}px)`;
      setDir(d);
    };

    // frame ticker while moving
    let lastMove = performance.now();
    let ticker: number | null = null;
    const moved = () => {
      lastMove = performance.now();
      if (!ticker) {
        ticker = window.setInterval(() => {
          if (performance.now() - lastMove > 200) {
            if (ticker) { clearInterval(ticker); ticker = null; }
            setFrame(0);
            return;
          }
          setFrame((f) => (f + 1) % 4);
        }, 120);
      }
    };

    // ── phase 1: scripted load walk along the hero waypoints ──
    // constant natural pace: duration is derived from each segment's real
    // distance, so the cat strolls (not glides) whether the leg is long or short
    let phase: "load" | "scroll" = "load";
    let raf = 0;
    let segStart = 0;
    let seg = 0;
    const SPEED_TPS = 2.2; // tiles per second — a calm walking gait
    const loadStart = performance.now();

    const loadStep = (now: number) => {
      const g = geom();
      if (seg === 0 && segStart === 0) segStart = now;
      const from = g.wp[seg];
      const to = g.wp[seg + 1];
      const dist = Math.hypot(to[1] - from[1], to[0] - from[0]);
      const dur = Math.max(500, (dist / (SPEED_TPS * g.tile)) * 1000);
      const p = Math.min(1, (now - segStart) / dur);
      const cx = from[1] + (to[1] - from[1]) * p;
      const cy = from[0] + (to[0] - from[0]) * p;
      const dx = to[1] - from[1];
      const dy = to[0] - from[0];
      // face the dominant axis: front (down) while descending, side only when
      // the leg is mostly horizontal (the turn along the connector)
      place(cx, cy, Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : "down");
      moved();
      if (p >= 1) {
        seg += 1;
        segStart = now;
        // hand off to scroll phase — clear raf FIRST so onScroll's !raf guard
        // passes and actually schedules scrollStep (else the cat freezes here)
        if (seg >= g.wp.length - 1) { phase = "scroll"; raf = 0; onScroll(); return; }
      }
      raf = requestAnimationFrame(loadStep);
    };

    // ── phase 2: scroll-driven down the road ──
    const scrollStep = () => {
      raf = 0;
      const g = geom();
      const roadTopY = g.wp[g.wp.length - 1][0]; // where the load walk ended
      const target = window.scrollY + window.innerHeight * 0.5;
      const cy = Math.max(roadTopY, target);
      place(g.roadCX, cy, "down");
      if (Math.abs(cy - lastCy) > 1) moved();
      lastCy = cy;
    };
    let lastCy = 0;
    const onScroll = () => { if (phase === "scroll" && !raf) raf = requestAnimationFrame(scrollStep); };

    raf = requestAnimationFrame(loadStep);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    void loadStart;
    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (ticker) clearInterval(ticker);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const t = FRAMES[dir][frame];
  const [sw, sh] = SHEET_DIMS[t.s];
  return (
    <span
      ref={ref}
      aria-hidden
      className="hidden md:block absolute top-0 left-0 pointer-events-none will-change-transform"
      style={{
        width: BOX,
        height: BOX,
        zIndex: 6,
        backgroundImage: "url(/farm/sprites/character-caramel.png)",
        backgroundPosition: `${-t.x * TILE * SCALE}px ${-t.y * TILE * SCALE}px`,
        backgroundSize: `${sw * SCALE}px ${sh * SCALE}px`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
      }}
    />
  );
}
