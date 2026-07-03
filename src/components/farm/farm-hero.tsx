"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { PixiFarm } from "@/farm/pixi-farm.ts";
import { SKY_ROWS } from "@/farm/scene.ts";
import { HeroDialog } from "./hero-dialog";
import { SkyBirds } from "./sky-birds";

/* The hero — headline over open sky, the WHOLE farm always visible below it,
   the farmer waiting at the gate (click → visitor card).
   - The scene's top rows are TRANSPARENT: the page's SkyCycle gradient shows
     through both the static PNG and the live canvas, so the headline sits in
     the same sky the farm lives under.
   - The scale is chosen so the farm's GROUND always fits the space between
     the headline and the bottom edge — the farm is never cropped. Only the
     transparent sky rows may extend up behind the headline. On viewports
     wider than the scene, a CSS grass ground (same tiles) continues the
     horizon to both edges.
   - SSR/no-JS baseline: static farm PNG + sr-only conversation links.
   - Enhancement: PixiJS world mounts on top after hydration ('use client' +
     useEffect — NOT next/dynamic ssr:false, which breaks Turbopack HMR).
   - prefers-reduced-motion: Pixi renders a single still frame.
   Scene is 512×288 (32×18 tiles) — scaled to device-pixel integers only. */

const SCENE_PX = { w: 512, h: 288 };
const GROUND_PX = (SCENE_PX.h * (18 - SKY_ROWS)) / 18; // 208 — must always fit

export function FarmHero({ children }: { children?: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const farmRef = useRef<PixiFarm | null>(null);
  const [live, setLive] = useState(false);
  const [cssWidth, setCssWidth] = useState<number | null>(null);
  const [tile, setTile] = useState<number | null>(null); // one scene tile, CSS px

  /* integer-scale sizing: canvas CSS width is chosen so the device-pixel
     scale factor is a whole number → no shimmer at any DPR. The scale is the
     largest integer whose GROUND height fits the world area (so nothing is
     ever cut off), capped at cover-width (so we never crop more than the
     scene's own margins horizontally). */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const w = rect.width;
      const dpr = window.devicePixelRatio || 1;
      let cw: number;
      if (w >= 1024) {
        const worldH = worldRef.current?.getBoundingClientRect().height ?? rect.height * 0.55;
        const devH = Math.floor((worldH * dpr) / GROUND_PX); // whole farm fits
        const devW = Math.ceil((w * dpr) / SCENE_PX.w); // never wider than cover
        const dev = Math.max(2, Math.min(devH, devW));
        cw = (SCENE_PX.w * dev) / dpr;
      } else {
        // Mobile: fill the full width so the whole farm is as large as possible.
        // Integer-scale letterboxing left the farm shrunken with side margins on
        // high-DPR phones (e.g. 430px@3× fit to only 341px). Whole-farm-visible +
        // fill-width beats a clean integer scale here; `pixelated` keeps it crisp.
        cw = w;
      }
      setCssWidth(cw);
      setTile(cw / 32);
      // where the horizon line sits inside the world area — the CSS ground
      // that extends the scene sideways starts exactly there
      const worldH2 = worldRef.current?.getBoundingClientRect().height ?? 0;
      const canvasH = (cw * SCENE_PX.h) / SCENE_PX.w;
      const horizon = worldH2 - canvasH + (canvasH * SKY_ROWS) / 18;
      el.style.setProperty("--hero-horizon", `${Math.round(horizon)}px`);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    // DPR changes (monitor drag, zoom) don't fire the ResizeObserver — re-arm
    // a one-shot resolution media query each time it trips
    let mql: MediaQueryList | null = null;
    const armDpr = () => {
      mql = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
      mql.addEventListener("change", onDprChange, { once: true });
    };
    const onDprChange = () => {
      compute();
      armDpr();
    };
    armDpr();
    return () => {
      ro.disconnect();
      mql?.removeEventListener("change", onDprChange);
    };
  }, []);

  /* mount the live Pixi layer */
  useEffect(() => {
    let cancelled = false;
    let farm: PixiFarm | null = null;
    (async () => {
      if (!hostRef.current) return;
      const { PixiFarm } = await import("@/farm/pixi-farm.ts");
      if (cancelled || !hostRef.current) return;
      farm = new PixiFarm({
        host: hostRef.current,
        onReady: () => { if (!cancelled) setLive(true); },
      });
      farmRef.current = farm;
      await farm.init();
    })().catch((err) => {
      // degrade gracefully: the static PNG stays visible, live never flips
      console.warn("farm hero: live layer failed to start", err);
    });
    return () => {
      cancelled = true;
      farm?.destroy();
      farmRef.current = null;
      setLive(false);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative flex-1 h-full w-full overflow-hidden flex flex-col"
      data-live={live || undefined}
    >
      {/* far-off birds drifting across the sky, behind the headline */}
      <SkyBirds />

      {/* headline — in normal flow, over open sky. Only the scene's
          TRANSPARENT sky rows may reach up behind it. */}
      <div className="relative z-10 w-full flex justify-center px-5 pt-[clamp(1.25rem,4.5vh,3rem)]">
        {children}
      </div>

      {/* the world — the full farm, bottom-anchored, never cropped */}
      <div ref={worldRef} className="relative flex-1 md:min-h-0 mt-2 flex items-end justify-center">
        {/* on wide viewports the scene is narrower than the screen: the same
            ground continues to both edges (same tiles, same pixel size) */}
        {tile !== null && (
          <div
            aria-hidden
            className="hidden md:flex flex-col absolute inset-x-0 bottom-0"
            style={{ top: "var(--hero-horizon, 55%)" }}
          >
            <div
              style={{
                height: tile,
                backgroundImage: "url(/farm/tiles/grass-edge-t.png)",
                backgroundSize: `${tile}px ${tile}px`,
                backgroundRepeat: "repeat-x",
                imageRendering: "pixelated",
              }}
            />
            <div
              className="flex-1"
              style={{
                backgroundImage: "url(/farm/tiles/grass-a.png)",
                backgroundSize: `${tile}px ${tile}px`,
                imageRendering: "pixelated",
              }}
            />
          </div>
        )}

        <div className="w-full flex justify-center md:absolute md:inset-x-0 md:bottom-0">
          <div
            ref={stageRef}
            className="relative flex-none max-w-none"
            style={{
              width: cssWidth ? `${cssWidth}px` : "min(100vw, 1536px)",
              aspectRatio: `${SCENE_PX.w} / ${SCENE_PX.h}`,
            }}
          >
            {/* static baseline — replaced (not removed) once Pixi is live */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/farm/farm-static@3x.png"
              alt="Pixel-art farm at dawn: a farmhouse breaking the horizon, fields of wheat, beets and sunflowers, chickens by the coop, a cow in her paddock, and a pond in the corner."
              className="absolute inset-0 h-full w-full pixelated select-none"
              style={{ opacity: live ? 0 : 1, transition: "opacity 300ms" }}
              draggable={false}
            />
            {/* live layer host */}
            <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* the farmer waits at the bottom of the world; the visitor card pops
          above him. In flow on mobile grass, floating over the farm on md+
          (no base position utility next to md:absolute — Tailwind v4). */}
      <div className="z-20 w-full flex-1 hero-ground px-3 pt-1 pb-2 flex justify-center items-start md:flex-none md:px-0 md:pt-0 md:pb-0 md:absolute md:inset-x-0 md:bottom-2">
        <HeroDialog />
      </div>
    </div>
  );
}
