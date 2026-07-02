"use client";

import { useEffect, useRef, useState } from "react";
import { TILE, SHEET_DIMS, type TileRef } from "@/farm/tiles.ts";

/* Scroll-driven crop growth: when the sprite enters the viewport it grows
   through its real growth stages, one pop at a time. Reduced-motion (and
   no-JS via SSR default) shows the mature crop immediately. */

export function CropGrowth({
  stages,
  scale = 3,
  className = "",
}: {
  stages: readonly TileRef[];
  scale?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [stage, setStage] = useState(stages.length - 1); // SSR: mature
  const grown = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || grown.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || grown.current) return;
        grown.current = true;
        io.disconnect();
        setStage(0);
        let i = 0;
        const grow = window.setInterval(() => {
          i++;
          setStage(i);
          if (i >= stages.length - 1) window.clearInterval(grow);
        }, 280);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stages.length]);

  const tile = stages[Math.min(stage, stages.length - 1)];
  const [sw, sh] = SHEET_DIMS[tile.s] ?? [0, 0];
  const w = (tile.w ?? 1) * TILE * scale;
  const h = (tile.h ?? 1) * TILE * scale;

  return (
    <span
      ref={ref}
      aria-hidden
      className={`inline-block ${className}`}
      style={{
        width: w,
        height: h,
        backgroundImage: `url(/farm/sprites/${tile.s}.png)`,
        backgroundPosition: `${-tile.x * TILE * scale}px ${-tile.y * TILE * scale}px`,
        backgroundSize: `${sw * scale}px ${sh * scale}px`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
        transform: `scale(${grown.current && stage < stages.length - 1 ? 1.08 : 1})`,
        transition: "transform 120ms steps(2, end)",
      }}
    />
  );
}
