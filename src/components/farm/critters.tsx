"use client";

import { useEffect, useRef } from "react";

/* Wandering critters — the animals that live on the grass between sections.
   Pure DOM sprites (background-crop), logic ticks at 10Hz, positions snapped
   to whole pixels, all movement transform-only.

   Funny business:
   - hover a critter → it emotes ("?", "♪", "!")
   - click a chicken → it panics, flees, and leaves an egg behind
   - click the egg → collected (the HUD counts; 3 eggs summon the golden one)
   - click the cow → "moo." + a tiny screen shake (she insists)
   - the others answer in their own words

   Entirely decorative: aria-hidden, pointer-only, frozen under
   prefers-reduced-motion. */

export type Kind = "chicken" | "cow" | "chick" | "bunny" | "pig" | "sheep";

type Actor = {
  kind: Kind;
  el: HTMLDivElement;
  x: number;
  y: number;
  tx: number;
  ty: number;
  state: "idle" | "walk" | "flee";
  frame: number;
  clock: number;
  think: number;
  flip: boolean;
  bubbleUntil: number;
};

export const SPRITES: Record<Kind, { sheet: string; w: number; h: number; sheetW: number; sheetH: number; idle: number[][]; walk: number[][] }> = {
  chicken: {
    sheet: "/farm/sprites/chicken.png",
    w: 16, h: 16, sheetW: 64, sheetH: 32,
    idle: [[0, 0], [16, 0]],
    walk: [[0, 16], [16, 16], [32, 16], [48, 16]],
  },
  cow: {
    sheet: "/farm/sprites/cow.png",
    w: 32, h: 32, sheetW: 96, sheetH: 64,
    idle: [[0, 32], [32, 32]],
    walk: [[0, 0], [32, 0], [64, 0]],
  },
  chick: {
    sheet: "/farm/sprites/duck.png",
    w: 16, h: 16, sheetW: 64, sheetH: 32,
    idle: [[0, 0], [16, 0]],
    walk: [[0, 16], [16, 16], [32, 16], [48, 16]],
  },
  bunny: {
    sheet: "/farm/sprites/wildlife.png",
    w: 16, h: 16, sheetW: 64, sheetH: 96,
    idle: [[0, 0], [16, 0]],
    walk: [[32, 0], [48, 0]],
  },
  pig: {
    sheet: "/farm/sprites/wildlife.png",
    w: 16, h: 16, sheetW: 64, sheetH: 96,
    idle: [[0, 16], [16, 16]],
    walk: [[32, 16], [48, 16]],
  },
  sheep: {
    sheet: "/farm/sprites/wildlife.png",
    w: 16, h: 16, sheetW: 64, sheetH: 96,
    idle: [[0, 32], [16, 32]],
    walk: [[32, 32], [48, 32]],
  },
};

/** what each species says when poked */
const POKE: Partial<Record<Kind, string>> = {
  cow: "moo.",
  pig: "oink. five stars.",
  sheep: "baa. no comment.",
  bunny: "!!",
  chick: "peep peep",
};

const SCALE = 3;
const EMOTES = ["?", "♪", "!", "…"];

export function Critters({ kinds = "chicken,chicken" }: { kinds?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const kindList = kinds.split(",").map((k) => k.trim()) as Kind[];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const actors: Actor[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const bounds = () => ({
      w: host.clientWidth,
      h: host.clientHeight,
    });

    const setSprite = (a: Actor, frames: number[][], i: number) => {
      const [fx, fy] = frames[i % frames.length];
      a.el.style.backgroundPosition = `${-fx * SCALE}px ${-fy * SCALE}px`;
    };

    const bubble = (a: Actor, text: string, ms = 1200) => {
      let b = a.el.querySelector<HTMLSpanElement>(".critter-bubble");
      if (!b) {
        b = document.createElement("span");
        b.className = "critter-bubble";
        a.el.appendChild(b);
      }
      b.textContent = text;
      b.style.display = "block";
      a.bubbleUntil = performance.now() + ms;
    };

    const spawnEgg = (x: number, y: number) => {
      const egg = document.createElement("div");
      egg.className = "critter";
      egg.style.cssText = `left:0;top:0;width:${16 * SCALE}px;height:${16 * SCALE}px;` +
        `background-image:url(/farm/sprites/egg-nest.png);background-size:${64 * SCALE}px ${16 * SCALE}px;` +
        `background-position:0 0;transform:translate(${x}px,${y}px);`;
      egg.addEventListener("pointerdown", () => {
        egg.remove();
        window.dispatchEvent(new CustomEvent("egg-collected"));
      });
      host.appendChild(egg);
    };

    /* build actors */
    kindList.forEach((kind, i) => {
      const s = SPRITES[kind];
      const el = document.createElement("div");
      el.className = "critter";
      el.style.cssText = `left:0;top:0;width:${s.w * SCALE}px;height:${s.h * SCALE}px;` +
        `background-image:url(${s.sheet});background-size:${s.sheetW * SCALE}px ${s.sheetH * SCALE}px;`;
      const { w, h } = bounds();
      const a: Actor = {
        kind, el,
        x: rand(0.1, 0.85) * Math.max(60, w - s.w * SCALE),
        y: rand(0.1, 0.6) * Math.max(20, h - s.h * SCALE),
        tx: 0, ty: 0, state: "idle", frame: 0,
        clock: 0, think: rand(1, 4) + i, flip: false, bubbleUntil: 0,
      };
      a.tx = a.x; a.ty = a.y;
      el.style.transform = `translate(${Math.round(a.x)}px, ${Math.round(a.y)}px)`;
      setSprite(a, s.idle, 0);

      el.addEventListener("pointerenter", () => {
        if (a.state !== "flee") bubble(a, EMOTES[Math.floor(Math.random() * EMOTES.length)]);
      });
      el.addEventListener("pointerdown", () => {
        if (kind === "chicken") {
          bubble(a, "!!", 900);
          spawnEgg(a.x, a.y + 10);
          a.state = "flee";
          const { w, h } = bounds();
          a.tx = rand(0, Math.max(40, w - s.w * SCALE));
          a.ty = rand(0, Math.max(10, h - s.h * SCALE));
          a.think = 2;
        } else if (kind === "cow") {
          bubble(a, "moo.", 1400);
          document.body.classList.remove("cow-shake");
          void document.body.offsetWidth;
          document.body.classList.add("cow-shake");
          setTimeout(() => document.body.classList.remove("cow-shake"), 700);
        } else if (kind === "bunny" || kind === "chick") {
          bubble(a, POKE[kind] ?? "!", 900);
          a.state = "flee";
          const { w, h } = bounds();
          a.tx = rand(0, Math.max(40, w - s.w * SCALE));
          a.ty = rand(0, Math.max(10, h - s.h * SCALE));
          a.think = 2;
        } else {
          bubble(a, POKE[kind] ?? "…", 1400);
        }
      });

      host.appendChild(el);
      actors.push(a);
    });

    if (reduced) return () => actors.forEach((a) => a.el.remove());

    /* 10Hz logic tick */
    const tick = window.setInterval(() => {
      const now = performance.now();
      for (const a of actors) {
        const s = SPRITES[a.kind];
        a.clock += 0.1;
        a.think -= 0.1;

        const b = a.el.querySelector<HTMLSpanElement>(".critter-bubble");
        if (b && now > a.bubbleUntil) b.style.display = "none";

        if (a.state === "idle") {
          if (a.clock > 0.5) {
            a.clock = 0;
            a.frame++;
            setSprite(a, s.idle, a.frame);
          }
          if (a.think <= 0) {
            const { w, h } = bounds();
            a.state = "walk";
            a.tx = Math.max(0, Math.min(w - s.w * SCALE, a.x + (Math.random() - 0.5) * 300));
            a.ty = Math.max(0, Math.min(h - s.h * SCALE, a.y + (Math.random() - 0.5) * 80));
          }
        } else {
          const speed =
            a.state === "flee" ? 26
            : a.kind === "cow" ? 4
            : a.kind === "pig" || a.kind === "sheep" ? 6
            : a.kind === "bunny" ? 13
            : 9;
          const dx = a.tx - a.x;
          const dy = a.ty - a.y;
          const d = Math.hypot(dx, dy);
          if (d < 4) {
            a.state = "idle";
            a.think = 2 + Math.random() * 5;
            setSprite(a, s.idle, 0);
          } else {
            a.x += (dx / d) * speed;
            a.y += (dy / d) * speed;
            a.flip = dx < 0;
            if (a.clock > 0.15) {
              a.clock = 0;
              a.frame++;
              setSprite(a, s.walk, a.frame);
            }
          }
        }
        a.el.style.transform =
          `translate(${Math.round(a.x)}px, ${Math.round(a.y)}px) scaleX(${a.flip ? -1 : 1})`;
      }
    }, 100);

    return () => {
      window.clearInterval(tick);
      actors.forEach((a) => a.el.remove());
      host.querySelectorAll(".critter").forEach((n) => n.remove());
    };
  }, [kinds]);

  // overflow-x clip keeps a wanderer from ever causing horizontal scroll, but
  // overflow-y stays visible so a speech bubble above an animal near the top
  // is never clipped (it layers up over the section, not inside a box).
  return <div ref={hostRef} aria-hidden className="absolute inset-0 overflow-x-clip overflow-y-visible" />;
}
