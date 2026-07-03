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
      className="fixed z-50 flex flex-col items-end gap-3 transition-opacity duration-300 right-3 bottom-4 md:right-5 md:bottom-auto md:top-1/2 md:-translate-y-1/2"
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }}
    >
      {/* sun dial — the day at a glance. The sun rises on the left, peaks at
          the top, sets on the right; it never crosses the caption. */}
      <div
        ref={dialRef}
        aria-hidden
        className="relative hidden md:block panel-paper"
        style={{ width: 56, height: 46, boxShadow: "inset 0 0 0 2px var(--wood-mid)" }}
      >
        {/* horizon line the sun arcs over */}
        <span
          className="absolute inset-x-2"
          style={{ bottom: 15, height: 2, background: "var(--wood-mid)" }}
        />
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: "50%",
            bottom: 16,
            width: 0,
            height: 0,
            transform: "rotate(calc((var(--day-p, 0) - 0.5) * 160deg))",
            transition: "transform 0.2s linear",
          }}
        >
          <span style={{ transform: "translateY(-14px) rotate(calc((var(--day-p, 0) - 0.5) * -160deg))" }}>
            <span className="dial-sun" style={{ display: "inline-block" }}>
              <PixelSprite tile={T.biome.flowerBigYellow} scale={1} />
            </span>
          </span>
        </div>
        <span
          className="absolute inset-x-0 bottom-0.5 text-center font-display text-[10px] text-ink-2"
        >
          the day
        </span>
      </div>

      {/* signpost stack: every stop named, planks point back at the page */}
      <nav
        aria-label="Jump to a part of the farm"
        className="hud-signpost hidden md:flex flex-col items-stretch gap-1"
      >
        {JOURNEY.map((j) => (
          <a
            key={j.id}
            href={`#${j.id}`}
            className="hud-sign"
            aria-current={active === j.id ? "true" : undefined}
            data-active={active === j.id || undefined}
          >
            {j.label}
          </a>
        ))}
      </nav>

      {/* egg counter (appears once the easter hunt starts) */}
      {eggs > 0 && (
        <div
          className="pixel-chip"
          style={{ fontSize: "12px" }}
          role="status"
          aria-label={`${eggs} eggs collected`}
        >
          <PixelSprite tile={T.eggNest} scale={1} />
          ×{eggs}
          {golden && <span aria-hidden> ✨</span>}
        </div>
      )}

      {/* the one persistent CTA */}
      <button {...CAL_ATTRS} className="pixel-btn" style={{ fontSize: "13px" }}>
        Book a call
      </button>
    </div>
  );
}
