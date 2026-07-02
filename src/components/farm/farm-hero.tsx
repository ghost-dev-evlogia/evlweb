"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { PLOTS } from "@/farm/scene.ts";
import { T, type TileRef } from "@/farm/tiles.ts";
import type { PixiFarm } from "@/farm/pixi-farm.ts";
import { PixelSprite } from "./pixel-sprite";

/* The explorable farm hero.
   - SSR/no-JS baseline: static farm PNG + real keyboard-focusable <Link>
     hotspots for every plot (DOM is the source of truth).
   - Enhancement: PixiJS world mounts on top after hydration ('use client' +
     useEffect — NOT next/dynamic ssr:false, which breaks Turbopack HMR).
   - prefers-reduced-motion: Pixi renders a single still frame; focus
     highlights still work; nothing ambient moves.
   Scene is 512×288 (32×18 tiles) — scaled to device-pixel integers only. */

const SCENE_PX = { w: 512, h: 288 };

const CROP_ICON: Record<string, TileRef> = {
  product: T.crop.wheat[3],
  "internal-tools": T.crop.beet[3],
  "applied-ai": T.biome.sunflower,
  iot: T.crop.wheat[2],
  coaching: T.crop.wheat[0],
};

export function FarmHero({ children }: { children?: ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const farmRef = useRef<PixiFarm | null>(null);
  const [live, setLive] = useState(false);
  const [cssWidth, setCssWidth] = useState<number | null>(null);

  /* integer-scale sizing: canvas CSS width is chosen so the device-pixel
     scale factor is a whole number → no shimmer at any DPR */
  useEffect(() => {
    const el = stageRef.current?.parentElement;
    if (!el) return;
    const compute = () => {
      const w = el.clientWidth;
      const dpr = window.devicePixelRatio || 1;
      const fit = w >= 1024;
      const dev = fit
        ? Math.max(2, Math.ceil((w * dpr) / SCENE_PX.w)) // cover: crop edges
        : Math.max(2, Math.floor((w * dpr) / SCENE_PX.w)); // fit: letterbox
      setCssWidth((SCENE_PX.w * dev) / dpr);
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
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
    })();
    return () => {
      cancelled = true;
      farm?.destroy();
      farmRef.current = null;
      setLive(false);
    };
  }, []);

  const hover = (id: string | null) => farmRef.current?.setHover(id);

  return (
    <div
      className="relative h-full w-full overflow-hidden flex flex-col items-center md:justify-center"
      data-live={live || undefined}
    >
      {/* headline panel: flows above the world on mobile, floats over it on md+.
          No base position utility here — base `relative` would override
          `md:absolute` in Tailwind v4's output order. */}
      <div className="w-full flex justify-center px-4 pt-4 md:px-0 md:pt-0 md:absolute md:z-20 md:inset-x-0 md:top-[3%] md:pointer-events-none [&>*]:md:pointer-events-auto">
        {children}
      </div>

      <div className="relative flex-none max-w-full">
        <div
          ref={stageRef}
          className="relative"
          style={{
            width: cssWidth ? `${cssWidth}px` : "min(100vw, 1536px)",
            aspectRatio: `${SCENE_PX.w} / ${SCENE_PX.h}`,
          }}
        >
          {/* static baseline — replaced (not removed) once Pixi is live */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/farm/farm-static@3x.png"
            alt="Pixel-art farm — Evlogia's services drawn as field plots: wheat for product engineering, beets for internal tools, sunflowers for applied AI, young wheat for IoT, and fresh sprouts for agentic AI coaching."
            className="absolute inset-0 h-full w-full pixelated select-none"
            style={{ opacity: live ? 0 : 1, transition: "opacity 300ms" }}
            draggable={false}
          />

          {/* live layer host */}
          <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />

          {/* plot hotspots — real links sized to each plot, chip on the
              plot's bottom edge. DOM is the source of truth; canvas enhances.
              Hidden on small screens (the chip row below serves there). */}
          <nav aria-label="Our services, as farm plots" className="absolute inset-0 hidden md:block">
            {PLOTS.map((plot) => (
              <Link
                key={plot.id}
                href={plot.href}
                className="group absolute focus:outline-none"
                style={{
                  left: `${((plot.x - 0.5) / 32) * 100}%`,
                  top: `${((plot.y - 1) / 18) * 100}%`,
                  width: `${((plot.w + 1) / 32) * 100}%`,
                  height: `${((plot.h + 1.6) / 18) * 100}%`,
                }}
                onMouseEnter={() => hover(plot.id)}
                onMouseLeave={() => hover(null)}
                onFocus={() => hover(plot.id)}
                onBlur={() => hover(null)}
              >
                <span
                  className="pixel-chip absolute left-1/2 bottom-0 -translate-x-1/2 whitespace-nowrap transition-transform duration-150 group-hover:-translate-y-[2px] group-focus-visible:-translate-y-[2px] group-focus-visible:outline-2 group-focus-visible:outline-ink"
                  style={{
                    fontSize: "12px",
                    boxShadow: "inset 0 0 0 2px var(--wood-mid), 0 2px 0 var(--wood-shadow)",
                  }}
                >
                  <PixelSprite tile={CROP_ICON[plot.id]} scale={1} />
                  {plot.label}
                </span>
                <span className="sr-only"> — {plot.blurb}</span>
              </Link>
            ))}
          </nav>

        </div>
      </div>

      {/* mobile plot links — tappable chip row under the world */}
      <nav
        aria-label="Our services, as farm plots"
        className="md:hidden flex flex-wrap justify-center gap-2 px-4 pt-3 pb-6"
      >
        {PLOTS.map((plot) => (
          <Link key={plot.id} href={plot.href} className="pixel-chip" style={{ fontSize: "11px" }}>
            <PixelSprite tile={CROP_ICON[plot.id]} scale={1} />
            {plot.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
