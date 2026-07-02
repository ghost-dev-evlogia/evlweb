"use client";

import { useEffect, useRef, useState } from "react";
import { JOURNEY, CAL_ATTRS } from "@/content/site";
import { PixelSprite } from "./pixel-sprite";
import { T } from "@/farm/tiles.ts";

/* The game HUD — replaces the nav bar on a single-page site.
   Right edge: a sun/moon dial showing time-of-day (scroll progress), a
   signpost mini-map for jumping between journey stops, the persistent
   booking button, and the egg counter once the visitor starts collecting. */

export function Hud() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("top");
  const [eggs, setEggs] = useState(0);
  const [golden, setGolden] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);

  /* show after the hero; track active section */
  useEffect(() => {
    const hero = document.getElementById("top");
    let heroIo: IntersectionObserver | null = null;
    if (hero) {
      heroIo = new IntersectionObserver(
        ([e]) => setVisible(e.intersectionRatio < 0.35),
        { threshold: [0.35] }
      );
      heroIo.observe(hero);
    }
    const sections = JOURNEY.map((j) => document.getElementById(j.id)).filter(
      Boolean
    ) as HTMLElement[];
    const secIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => secIo.observe(s));
    return () => {
      heroIo?.disconnect();
      secIo.disconnect();
    };
  }, []);

  /* sun/moon dial follows scroll progress */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      const el = dialRef.current;
      if (el) {
        el.style.setProperty("--day-p", String(p));
        el.dataset.night = p > 0.78 ? "true" : "false";
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* egg economy (critters dispatch these) */
  useEffect(() => {
    const onEgg = () => {
      setEggs((n) => {
        const next = n + 1;
        if (next === 3) {
          setGolden(true);
          window.dispatchEvent(new CustomEvent("golden-chicken"));
          setTimeout(() => setGolden(false), 20000);
        }
        return next;
      });
    };
    window.addEventListener("egg-collected", onEgg);
    return () => window.removeEventListener("egg-collected", onEgg);
  }, []);

  return (
    <div
      className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      {/* sun / moon dial */}
      <div
        ref={dialRef}
        aria-hidden
        className="relative hidden md:block"
        style={{ width: 46, height: 46 }}
      >
        <div
          className="absolute inset-0 panel-paper pixel-corners"
          style={{ boxShadow: "inset 0 0 0 2px var(--wood-mid)" }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: "rotate(calc(var(--day-p, 0) * 180deg))",
            transition: "transform 0.2s linear",
          }}
        >
          <span style={{ transform: "translateY(-11px) rotate(calc(var(--day-p, 0) * -180deg))" }}>
            <span className="dial-sun" style={{ display: "inline-block" }}>
              <PixelSprite tile={T.biome.flowerBigYellow} scale={1} />
            </span>
          </span>
        </div>
        <span
          className="absolute inset-0 flex items-center justify-center font-display text-[9px] text-ink-3"
          style={{ paddingTop: 18 }}
        >
          scroll
        </span>
      </div>

      {/* mini-map: signpost jumps */}
      <nav
        aria-label="Jump to a part of the farm"
        className="hidden md:flex flex-col items-end gap-1.5 panel-paper pixel-corners px-2 py-2.5"
        style={{ boxShadow: "inset 0 0 0 2px var(--wood-mid)" }}
      >
        {JOURNEY.map((j) => (
          <a
            key={j.id}
            href={`#${j.id}`}
            className="group flex items-center gap-1.5 font-display text-[10px] uppercase tracking-wide"
            aria-current={active === j.id ? "true" : undefined}
            style={{ color: active === j.id ? "var(--ink)" : "var(--ink-4)" }}
          >
            <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
              {j.label}
            </span>
            <span
              aria-hidden
              style={{
                width: 8,
                height: 8,
                background: active === j.id ? "var(--harvest)" : "var(--wood-soft)",
                boxShadow: "inset 0 0 0 1px var(--wood-shadow)",
              }}
            />
          </a>
        ))}
      </nav>

      {/* egg counter (appears once the easter hunt starts) */}
      {eggs > 0 && (
        <div
          className="pixel-chip"
          style={{ fontSize: "11px" }}
          role="status"
          aria-label={`${eggs} eggs collected`}
        >
          <PixelSprite tile={T.eggNest} scale={1} />
          ×{eggs}
          {golden && <span aria-hidden> ✨</span>}
        </div>
      )}

      {/* the one persistent CTA */}
      <button {...CAL_ATTRS} className="pixel-btn" style={{ fontSize: "12px" }}>
        Book a call
      </button>
    </div>
  );
}
