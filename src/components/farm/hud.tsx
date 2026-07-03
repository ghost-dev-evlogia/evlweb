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
      {/* time of day — no box. A pixel sun arcs across by day and sets; the
          moon fades in for the night. Driven by scroll progress (--day-p). */}
      <div ref={dialRef} aria-hidden className="day-dial hidden md:block">
        <div
          className="day-dial-arc"
          style={{ transform: "rotate(calc((var(--day-p, 0) - 0.5) * 150deg))" }}
        >
          <span
            className="day-sun"
            style={{ transform: "translateY(-15px) rotate(calc((var(--day-p, 0) - 0.5) * -150deg))" }}
          >
            <svg viewBox="0 0 16 16" width="15" height="15" shapeRendering="crispEdges">
              <g fill="#e6a92c">
                <rect x="7" y="0" width="2" height="2" /><rect x="7" y="14" width="2" height="2" />
                <rect x="0" y="7" width="2" height="2" /><rect x="14" y="7" width="2" height="2" />
                <rect x="2" y="2" width="2" height="2" /><rect x="12" y="2" width="2" height="2" />
                <rect x="2" y="12" width="2" height="2" /><rect x="12" y="12" width="2" height="2" />
              </g>
              <g fill="#f5c542">
                <rect x="5" y="4" width="6" height="8" /><rect x="4" y="5" width="8" height="6" />
              </g>
            </svg>
          </span>
        </div>
        <span className="day-moon">
          <svg viewBox="0 0 16 16" width="14" height="14" shapeRendering="crispEdges">
            <g fill="#eef1f5">
              <rect x="4" y="4" width="3" height="8" /><rect x="5" y="3" width="3" height="10" />
              <rect x="6" y="2" width="2" height="2" /><rect x="6" y="12" width="2" height="2" />
            </g>
          </svg>
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
