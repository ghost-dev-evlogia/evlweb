"use client";

import { useEffect, useRef } from "react";
import { QUIPS } from "@/content/site";
import { SPRITES, type Kind } from "./critters";

/* Wanderers — every so often ONE animal crosses the viewport, stops
   somewhere in the middle, says something it read on the internet, and
   carries on. Birds and butterflies take the sky lane; everyone else walks
   the bottom band. Click a wanderer mid-monologue and it hurries off.

   One at a time, fixed overlay, aria-hidden, transform-only, pixel-snapped,
   never spawns under prefers-reduced-motion. */

type AirKind = "bird" | "butterfly";
type WKind = Kind | AirKind | "frog";

const AIR_SPRITES: Record<AirKind, { sheet: string; w: number; h: number; sheetW: number; sheetH: number; fly: number[][] }> = {
  bird: {
    sheet: "/farm/sprites/wildlife.png",
    w: 16, h: 16, sheetW: 64, sheetH: 80,
    fly: [[0, 48], [16, 48], [32, 48], [16, 48]],
  },
  butterfly: {
    sheet: "/farm/sprites/wildlife.png",
    w: 16, h: 16, sheetW: 64, sheetH: 80,
    fly: [[0, 64], [16, 64]],
  },
};
const FROG = {
  sheet: "/farm/sprites/wildlife.png",
  w: 16, h: 16, sheetW: 64, sheetH: 80,
  sit: [[32, 64], [48, 64]] as number[][],
};

const GROUND_KINDS: WKind[] = ["chicken", "chick", "bunny", "pig", "sheep", "frog"];
const AIR_KINDS: WKind[] = ["bird", "butterfly"];
const SCALE = 3;

export function Wanderers() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: number | null = null;
    let raf = 0;
    let alive = true;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

    const schedule = (ms: number) => {
      if (!alive) return;
      timer = window.setTimeout(spawn, ms);
    };

    const spawn = () => {
      if (!alive) return;
      if (document.hidden) { schedule(8000); return; }

      const air = Math.random() < 0.3;
      const kind = pick(air ? AIR_KINDS : GROUND_KINDS) as WKind;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const ltr = Math.random() < 0.5;
      const box = 16 * SCALE;

      const el = document.createElement("div");
      const sheet =
        kind === "frog" ? FROG
        : kind === "bird" || kind === "butterfly" ? AIR_SPRITES[kind]
        : SPRITES[kind as Kind];
      el.style.cssText =
        `position:absolute;left:0;top:0;width:${box}px;height:${box}px;` +
        `background-image:url(${sheet.sheet});background-size:${sheet.sheetW * SCALE}px ${sheet.sheetH * SCALE}px;` +
        `background-repeat:no-repeat;image-rendering:pixelated;pointer-events:auto;cursor:pointer;will-change:transform;`;
      host.appendChild(el);

      const frames: number[][] =
        kind === "frog" ? FROG.sit
        : kind === "bird" || kind === "butterfly" ? AIR_SPRITES[kind as AirKind].fly
        : SPRITES[kind as Kind].walk;
      const idleFrames: number[][] =
        kind === "frog" ? FROG.sit
        : kind === "bird" || kind === "butterfly" ? AIR_SPRITES[kind as AirKind].fly
        : SPRITES[kind as Kind].idle;

      const y0 = air ? rand(vh * 0.1, vh * 0.32) : vh - rand(80, 170);
      const speed =
        kind === "bird" ? rand(150, 210)
        : kind === "butterfly" ? rand(45, 65)
        : kind === "bunny" ? rand(110, 140)
        : kind === "frog" ? rand(60, 80)
        : rand(60, 100);
      const pauseX = rand(vw * 0.3, vw * 0.65);
      const pauseFor = air && kind === "bird" ? 0 : rand(2600, 4200); // birds don't stop
      let x = ltr ? -box - 20 : vw + 20;
      let paused = false;
      let pauseUntil = 0;
      let saidIt = false;
      let hurried = 1;
      let frame = 0;
      let frameClock = 0;
      let last = performance.now();

      const bubble = document.createElement("div");
      bubble.className = "quip-bubble";
      bubble.style.display = "none";
      el.appendChild(bubble);

      const say = (text: string, ms: number) => {
        bubble.textContent = text;
        bubble.style.display = "block";
        window.setTimeout(() => { bubble.style.display = "none"; }, ms);
      };

      el.addEventListener("pointerdown", () => {
        hurried = 2.6;
        if (paused) pauseUntil = 0;
        say(pick(["ok ok, leaving", "no comment!!", "my lawyer said no", "context switch!"]), 1100);
      });

      const step = (now: number) => {
        if (!alive) return;
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;

        if (paused && now < pauseUntil) {
          frameClock += dt;
          if (frameClock > 0.45) {
            frameClock = 0;
            frame++;
            const [fx, fy] = idleFrames[frame % idleFrames.length];
            el.style.backgroundPosition = `${-fx * SCALE}px ${-fy * SCALE}px`;
          }
          raf = requestAnimationFrame(step);
          return;
        }
        paused = false;

        x += (ltr ? 1 : -1) * speed * hurried * dt;

        // hit the pause point (once), stop and say the thing
        if (!saidIt && pauseFor > 0 && (ltr ? x >= pauseX : x <= pauseX)) {
          saidIt = true;
          paused = true;
          pauseUntil = now + pauseFor;
          say(pick(QUIPS), pauseFor - 300);
        }

        // vertical: butterflies float, frogs hop, birds glide a little
        let y = y0;
        if (kind === "butterfly") y = y0 + Math.sin(x / 40) * 18;
        else if (kind === "bird") y = y0 + Math.sin(x / 130) * 8;
        else if (kind === "frog") y = y0 - Math.abs(Math.sin(x / 34)) * 22;

        frameClock += dt;
        const rate = kind === "butterfly" ? 0.18 : kind === "bird" ? 0.12 : 0.14;
        if (frameClock > rate) {
          frameClock = 0;
          frame++;
          const [fx, fy] = frames[frame % frames.length];
          el.style.backgroundPosition = `${-fx * SCALE}px ${-fy * SCALE}px`;
        }

        // sheets face right → flip when heading left
        el.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px) scaleX(${ltr ? 1 : -1})`;
        // keep the bubble readable when the sprite is mirrored
        bubble.style.transform = `translateX(-50%) scaleX(${ltr ? 1 : -1})`;

        if (ltr ? x > vw + 40 : x < -box - 40) {
          el.remove();
          schedule(rand(16000, 34000));
          return;
        }
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    schedule(rand(6000, 11000));

    return () => {
      alive = false;
      if (timer) window.clearTimeout(timer);
      if (raf) cancelAnimationFrame(raf);
      host.replaceChildren();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
    />
  );
}
