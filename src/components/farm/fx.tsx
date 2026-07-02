"use client";

import { useEffect } from "react";

/* Global juice layer:
   - every .pixel-btn click pops 3 star particles at the pointer
   - the golden chicken (summoned by the HUD after 3 eggs) follows the cursor
   - typing "harvest" rains crops (hinted in the footer fine print)
   All decorative, all skipped under prefers-reduced-motion. */

export function Fx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* ── button star pop ── */
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest?.(".pixel-btn");
      if (!btn) return;
      for (let i = 0; i < 3; i++) {
        const star = document.createElement("span");
        star.className = "btn-star";
        star.style.left = `${e.clientX - 3}px`;
        star.style.top = `${e.clientY - 3}px`;
        star.style.setProperty("--fly-x", `${(Math.random() - 0.5) * 60}px`);
        star.style.setProperty("--fly-y", `${-16 - Math.random() * 36}px`);
        document.body.appendChild(star);
        setTimeout(() => star.remove(), 500);
      }
    };
    document.addEventListener("click", onClick);

    /* ── golden chicken follows the cursor for 20s ── */
    let chicken: HTMLDivElement | null = null;
    let mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...mouse };
    let raf = 0;
    let frame = 0;
    let frameClock = 0;
    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
    };
    const step = (t: number) => {
      if (!chicken) return;
      pos.x += (mouse.x - pos.x) * 0.06;
      pos.y += (mouse.y - pos.y) * 0.06;
      if (t - frameClock > 140) {
        frameClock = t;
        frame = (frame + 1) % 4;
        chicken.style.backgroundPosition = `${-frame * 16 * 3}px ${-16 * 3}px`;
      }
      const flip = mouse.x < pos.x;
      chicken.style.transform = `translate(${Math.round(pos.x - 24)}px, ${Math.round(pos.y - 40)}px) scaleX(${flip ? -1 : 1})`;
      raf = requestAnimationFrame(step);
    };
    const onGolden = () => {
      if (chicken) return;
      chicken = document.createElement("div");
      chicken.setAttribute("aria-hidden", "true");
      chicken.style.cssText =
        `position:fixed;left:0;top:0;width:48px;height:48px;z-index:80;pointer-events:none;` +
        `background-image:url(/farm/sprites/chicken-golden.png);background-size:${64 * 3}px ${32 * 3}px;` +
        `image-rendering:pixelated;filter:drop-shadow(0 0 6px rgba(242,207,140,0.9));`;
      document.body.appendChild(chicken);
      document.addEventListener("mousemove", onMove);
      raf = requestAnimationFrame(step);
      setTimeout(() => {
        chicken?.remove();
        chicken = null;
        document.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(raf);
      }, 20000);
    };
    window.addEventListener("golden-chicken", onGolden);

    /* ── the "harvest" incantation ── */
    let typed = "";
    const CROPS = [
      { x: 64, y: 0 }, // wheat item (plants.png col 5? drawn via sprite frames below)
    ];
    void CROPS;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === "INPUT" || (e.target as HTMLElement)?.tagName === "TEXTAREA") return;
      typed = (typed + e.key.toLowerCase()).slice(-7);
      if (typed === "harvest") {
        typed = "";
        for (let i = 0; i < 26; i++) {
          const drop = document.createElement("span");
          drop.className = "harvest-drop";
          const isWheat = Math.random() > 0.5;
          drop.style.cssText +=
            `left:${Math.random() * 100}vw;width:32px;height:32px;` +
            `background-image:url(/farm/sprites/plants.png);background-size:${96 * 2}px ${32 * 2}px;` +
            `background-position:${-5 * 16 * 2}px ${isWheat ? 0 : -16 * 2}px;` +
            `animation-delay:${Math.random() * 0.7}s;animation-duration:${1.2 + Math.random() * 0.9}s;`;
          document.body.appendChild(drop);
          setTimeout(() => drop.remove(), 2800);
        }
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("golden-chicken", onGolden);
      cancelAnimationFrame(raf);
      chicken?.remove();
    };
  }, []);

  return null;
}
