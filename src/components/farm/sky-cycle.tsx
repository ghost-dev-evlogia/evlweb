"use client";

import { useEffect, useRef } from "react";

/* The day-cycle sky — the page's signature element.
   A fixed layer behind everything whose gradient interpolates from dawn to
   night as you scroll. Clouds drift on their own clock and fade out at dusk;
   stars fade in for the last act. Reduced-motion / no-JS: a pleasant static
   day sky via the initial style. All work happens in one rAF-throttled scroll
   handler mutating CSS custom properties — no React re-renders. */

import { SKY_STOPS as STOPS } from "@/farm/sky-stops.ts";

const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

const STARS = [
  [8, 12], [22, 6], [37, 18], [51, 9], [66, 15], [79, 5], [91, 12],
  [15, 28], [45, 30], [72, 26], [86, 33], [30, 38], [60, 40], [5, 42],
] as const;

export function SkyCycle() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // keep the static initial sky
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const seg = p * (STOPS.length - 1);
      const i = Math.min(STOPS.length - 2, Math.floor(seg));
      const t = seg - i;
      const a = STOPS[i], b = STOPS[i + 1];
      const top = a.top.map((c, k) => lerp(c, b.top[k], t));
      const bot = a.bottom.map((c, k) => lerp(c, b.bottom[k], t));
      el.style.background = `linear-gradient(180deg, rgb(${top.join(",")}) 0%, rgb(${bot.join(",")}) 100%)`;
      // clouds thin out after golden hour; stars own the night
      const night = Math.max(0, (p - 0.72) / 0.28);
      el.style.setProperty("--cloud-alpha", String(Math.max(0, 1 - night * 1.6)));
      el.style.setProperty("--star-alpha", String(night));
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
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background: "linear-gradient(180deg, #cbe0de 0%, #d6f1cd 100%)",
      }}
    >
      {/* drifting pixel clouds — their own clock, alpha follows the day */}
      <div style={{ opacity: "var(--cloud-alpha, 1)" }}>
        {[
          { img: "cloud-1", top: "9%", dur: 95, delay: -20, scale: 4 },
          { img: "cloud-2", top: "17%", dur: 120, delay: -75, scale: 3 },
          { img: "cloud-1", top: "26%", dur: 150, delay: -40, scale: 3 },
          { img: "cloud-2", top: "6%", dur: 135, delay: -110, scale: 5 },
        ].map(({ img, top, dur, delay, scale }, i) => (
          <img
            key={i}
            src={`/farm/sprites/${img}.png`}
            alt=""
            className="absolute pixelated select-none"
            style={{
              top,
              left: 0,
              width: (img === "cloud-1" ? 32 : 16) * scale,
              imageRendering: "pixelated",
              animation: `cloud-drift ${dur}s linear ${delay}s infinite`,
              opacity: 0.85,
            }}
          />
        ))}
      </div>
      {/* stars — hidden until the night act */}
      <div style={{ opacity: "var(--star-alpha, 0)" }}>
        {STARS.map(([x, y], i) => (
          <span
            key={i}
            className="star"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i % 5) * 0.5}s` }}
          />
        ))}
      </div>
    </div>
  );
}
