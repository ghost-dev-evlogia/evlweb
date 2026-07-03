"use client";

import { useEffect, useRef, useState } from "react";
import { TILE, T, SHEET_DIMS } from "@/farm/tiles.ts";

/* The farmer walks the road beside you while you scroll the fields.
   Scroll-driven position (rAF-throttled, pixel-snapped), walk frames only
   while actually moving. Decorative: aria-hidden, md+ only (the road is
   hidden on mobile), frozen under reduced-motion. */

const FRAMES = T.farmer.down;
const SCALE = 2;
const BOX = 3 * TILE * SCALE; // 96px frame box, art centered

export function FieldWalker() {
  const ref = useRef<HTMLDivElement>(null);
  const spriteRef = useRef<HTMLSpanElement>(null);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const el = ref.current;
    const sprite = spriteRef.current;
    if (!el || !sprite) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let lastY = -1;
    let lastMove = 0;
    let frameTimer: number | null = null;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.55 - rect.top) / (rect.height - BOX)));
      const y = Math.round((p * (rect.height - BOX)) / 2) * 2; // snap to whole 2px
      if (y !== lastY) {
        lastY = y;
        sprite.style.transform = `translateY(${y}px)`;
        lastMove = performance.now();
        if (!frameTimer) {
          frameTimer = window.setInterval(() => {
            if (performance.now() - lastMove > 220 && frameTimer) {
              window.clearInterval(frameTimer);
              frameTimer = null;
              setFrame(0);
              return;
            }
            setFrame((f) => (f + 1) % FRAMES.length);
          }, 120);
        }
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      if (frameTimer) window.clearInterval(frameTimer);
    };
  }, []);

  const tile = FRAMES[frame];
  const [sw, sh] = SHEET_DIMS[tile.s];

  // left: centred on the shared dirt path (--path-x is the 48px road's left;
  // the 96px frame box centres on it). This IS the cat that walked out of the
  // hero — the caramel sheet matches the hero walker's tint exactly.
  return (
    <div
      ref={ref}
      aria-hidden
      className="hidden md:block absolute top-0 bottom-0 pointer-events-none"
      style={{ left: "calc(var(--path-x) - 24px)" }}
    >
      <span
        ref={spriteRef}
        className="block will-change-transform"
        style={{
          width: BOX,
          height: BOX,
          backgroundImage: "url(/farm/sprites/character-caramel.png)",
          backgroundPosition: `${-tile.x * TILE * SCALE}px ${-tile.y * TILE * SCALE}px`,
          backgroundSize: `${sw * SCALE}px ${sh * SCALE}px`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
