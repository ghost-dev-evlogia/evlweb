"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { PixiFarm } from "@/farm/pixi-farm.ts";
import { SKY_ROWS } from "@/farm/scene.ts";
import { HeroDialog } from "./hero-dialog";

/* The hero — headline over open sky, the living farm pinned to the bottom,
   the farmer's opening cutscene docked over the world.
   - The scene's top rows are TRANSPARENT: the page's SkyCycle gradient shows
     through both the static PNG and the live canvas, so the headline sits in
     the same sky the farm lives under. Nothing floats in a box.
   - SSR/no-JS baseline: static farm PNG + the dialog's real anchor links.
   - Enhancement: PixiJS world mounts on top after hydration ('use client' +
     useEffect — NOT next/dynamic ssr:false, which breaks Turbopack HMR).
   - prefers-reduced-motion: Pixi renders a single still frame.
   Scene is 512×288 (32×18 tiles) — scaled to device-pixel integers only. */

const SCENE_PX = { w: 512, h: 288 };

export function FarmHero({ children }: { children?: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const farmRef = useRef<PixiFarm | null>(null);
  const [live, setLive] = useState(false);
  const [cssWidth, setCssWidth] = useState<number | null>(null);
  const [sink, setSink] = useState(0);

  /* integer-scale sizing: canvas CSS width is chosen so the device-pixel
     scale factor is a whole number → no shimmer at any DPR. Observe the
     full-width root (NOT the shrink-wrapped stage parent, which can never
     grow past the canvas it wraps). */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const w = rect.width;
      const dpr = window.devicePixelRatio || 1;
      const fit = w >= 1024;
      let cw: number;
      if (fit) {
        cw = (SCENE_PX.w * Math.max(2, Math.ceil((w * dpr) / SCENE_PX.w))) / dpr; // cover: crop edges
      } else {
        const dev = Math.floor((w * dpr) / SCENE_PX.w); // fit: letterbox
        // narrow low-DPR windows can't reach a 2× integer — fill the width
        cw = dev >= 2 ? (SCENE_PX.w * dev) / dpr : w;
      }
      setCssWidth(cw);
      // keep the horizon below the headline: if the tree line rides too high
      // on short viewports, sink the world (the cropped bottom hides behind
      // the fence-topped grass strip). Measure against the WORLD area — the
      // strip below it consumes root height the canvas never gets.
      const worldBottom = worldRef.current
        ? worldRef.current.getBoundingClientRect().bottom - rect.top
        : rect.height;
      const canvasH = (cw * SCENE_PX.h) / SCENE_PX.w;
      const horizonY = worldBottom - canvasH + (canvasH * SKY_ROWS) / 18;
      const target = Math.min(Math.max(330, rect.height * 0.42), 480);
      setSink(fit ? Math.max(0, Math.round(target - horizonY)) : 0);
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
      {/* headline — in normal flow, over open sky. It physically precedes the
          world, so it can never overlap the farm at any viewport. */}
      <div className="relative z-10 w-full flex justify-center px-5 pt-[clamp(2rem,7vh,4.5rem)]">
        {children}
      </div>

      {/* the world, pinned to the bottom edge; transparent sky rows crop
          first if the viewport runs short */}
      {/* in flow at the bottom of the column on mobile; absolute (with the
          horizon sink) on md+ — no base position utility (Tailwind v4) */}
      <div ref={worldRef} className="relative flex-1 md:min-h-0 mt-4 flex items-end justify-center">
        <div className="w-full flex justify-center md:absolute md:inset-x-0" style={{ bottom: -sink }}>
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

      {/* the farm ends at a fence, like farms do. The grass strip hides the
          world's crop line, carries the farmer (click → visitor card), and
          flows straight into the terrain below; the fence stands on its top
          edge, overlapping up into the scene. */}
      <div className="relative z-20 band-grass">
        <div
          className="band-fence absolute inset-x-0"
          style={{ height: "calc(var(--px) * 16)", top: "calc(var(--px) * -12)" }}
          aria-hidden
        />
        <div className="relative flex justify-center pt-4 pb-4 px-3">
          <HeroDialog />
        </div>
      </div>
    </div>
  );
}
