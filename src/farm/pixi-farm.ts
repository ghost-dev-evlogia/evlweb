/* ─────────────────────────────────────────────────────────────────────────────
   PixiJS farm controller — the live layer of the hero.
   Renders the same scene.ts the static fallback is rendered from, then adds:
   water frame animation, wandering animals, an ambling farmer, and chimney
   smoke. The scene is pure living scenery (v3): no plots, no hover states.

   Client-only: constructed inside useEffect. destroy() is StrictMode-safe.
   ──────────────────────────────────────────────────────────────────────────── */
import type { Application, Graphics, Sprite, Texture, Ticker } from "pixi.js";
import { TILE, T, SHEET_FILES, type TileRef } from "./tiles.ts";
import { buildScene, CHIMNEY, type Scene, type SceneAnimal } from "./scene.ts";
import { QUIPS } from "@/content/site";

/** what the hero animals mutter between quips */
const SOUNDS: Record<string, string[]> = {
  chicken: ["bok.", "bok bok", "…deployed.", "bok?"],
  cow: ["moo.", "mooo…", "moo?"],
};

/** what a frog says on the rare occasion it surfaces to talk */
const FROG_QUIPS = ["ribbit.", "ribbit?", "…still no PR.", "blub.", "i saw everything.", "5 stars, would pond again.", "standup's in the pond."];

const SPRITE_BASE = "/farm/sprites";

type FarmOpts = {
  host: HTMLElement;
  /** called once the canvas has rendered its first frame */
  onReady?: () => void;
};

type AnimalRig = {
  data: SceneAnimal;
  sprite: Sprite;
  /** current tile position (float while walking) */
  tx: number;
  ty: number;
  state: "idle" | "walk" | "graze";
  dir: "down" | "up" | "left" | "right";
  frame: number;
  frameClock: number;
  thinkClock: number;
  target: { x: number; y: number } | null;
};

type SmokePuff = { g: Graphics; t: number; offset: number };

type FrogRig = {
  sprite: Sprite;
  homeX: number; // sit tile x
  homeY: number; // sit tile y (top of pond ring); water is ~0.7 tile below
  state: "in" | "out";
  clock: number; // countdown to the next jump
  jump: { t: number; dur: number; fromY: number; toY: number; hideAtEnd: boolean } | null;
  speakOnLand: boolean;
};

export class PixiFarm {
  private app: Application | null = null;
  private destroyed = false;
  private textures = new Map<string, Texture>();
  private waterSprites: Sprite[] = [];
  private waterFrame = 0;
  private waterClock = 0;
  private animals: AnimalRig[] = [];
  private smoke: SmokePuff[] = [];
  private frogs: FrogRig[] = [];
  /* load intro: the farmer walks out of the house, down the trail, to the gate */
  private introFarmer: AnimalRig | null = null;
  private introWaypoints: { x: number; y: number }[] = [];
  private introIdx = 0;
  private scene: Scene;
  private reduced: boolean;
  /* one hero animal speaks at a time */
  private quipCooldown = 6 + Math.random() * 6;
  private speech: { el: HTMLDivElement; until: number } | null = null;

  constructor(private opts: FarmOpts) {
    this.scene = buildScene("final");
    this.reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  async init() {
    const { Application, Assets, Sprite, Container, Texture, Rectangle, TextureStyle, Graphics } =
      await import("pixi.js");
    if (this.destroyed) return;

    TextureStyle.defaultOptions.scaleMode = "nearest";

    const app = new Application();
    const W = this.scene.w * TILE;
    const H = this.scene.h * TILE;
    await app.init({
      width: W,
      height: H,
      backgroundAlpha: 0,
      resolution: 1, // upscaled via CSS at device-integer multiples
      autoDensity: false,
      roundPixels: true,
      antialias: false,
    });
    if (this.destroyed) {
      // never destroy texture sources — the sheet textures live in the global
      // Assets cache and must survive for the next mount (client-side nav)
      app.destroy({ removeView: true }, { children: true });
      return;
    }
    this.app = app;

    // load every sheet
    const base = await Promise.all(
      SHEET_FILES.map(async (name) => {
        const tex = await Assets.load<Texture>(`${SPRITE_BASE}/${name}.png`);
        return [name, tex] as const;
      })
    );
    if (this.destroyed) { this.teardown(); return; }
    const sheetTex = new Map(base);

    const texFor = (ref: TileRef): Texture => {
      const key = `${ref.s}:${ref.x},${ref.y},${ref.w ?? 1},${ref.h ?? 1}`;
      let t = this.textures.get(key);
      if (!t) {
        const sheet = sheetTex.get(ref.s as (typeof SHEET_FILES)[number]);
        if (!sheet) throw new Error(`sheet ${ref.s} not loaded`);
        t = new Texture({
          source: sheet.source,
          frame: new Rectangle(ref.x * TILE, ref.y * TILE, (ref.w ?? 1) * TILE, (ref.h ?? 1) * TILE),
        });
        this.textures.set(key, t);
      }
      return t;
    };
    this.texFor = texFor;

    /* ── build the world exactly as the static render does ── */
    const root = new Container();
    app.stage.addChild(root);

    const layerNames = ["ground", "water", "ring", "patches", "path", "crops", "house", "coop", "decor", "animals"];
    this.scene.layers.forEach((layer, li) => {
      const c = new Container();
      root.addChild(c);
      const isWater = layerNames[li] === "water";
      const isAnimals = layerNames[li] === "animals";
      if (isAnimals) return; // animals get live rigs instead
      for (const pl of layer) {
        const sp = new Sprite(texFor(pl.t));
        sp.position.set(pl.x * TILE, pl.y * TILE);
        c.addChild(sp);
        if (isWater) this.waterSprites.push(sp);
      }
    });

    /* ── animal rigs ── */
    const animalLayer = new Container();
    root.addChild(animalLayer);
    for (const a of this.scene.animals) {
      const tex =
        a.kind === "chicken" ? texFor(T.chicken.idle[0])
        : a.kind === "cow" ? texFor(T.cow.graze[0])
        : texFor(T.farmer.down[0]);
      const sp = new Sprite(tex);
      // farmer frames are 3×3 tiles with art centered; anchor mid-bottom-ish
      if (a.kind === "farmer") sp.position.set((a.x - 1) * TILE, (a.y - 1) * TILE);
      else sp.position.set(a.x * TILE, a.y * TILE);
      animalLayer.addChild(sp);
      this.animals.push({
        data: a, sprite: sp, tx: a.x, ty: a.y,
        state: a.kind === "cow" ? "graze" : "idle",
        dir: "down", frame: 0, frameClock: 0,
        thinkClock: 1 + Math.random() * 3, target: null,
      });
    }

    /* ── load intro: the farmer emerges from the house door and walks the trail
          down to the gate, then waits there. Reuses the scene's own farmer rig
          (no extra sprite). Under reduced-motion he's simply placed at the gate. */
    // the brown walker is now a single DOM sprite that walks OVER the canvas
    // (the trail) and continues onto the DOM path — so hide the canvas farmer.
    const farmer = this.animals.find((a) => a.data.kind === "farmer");
    if (farmer) farmer.sprite.visible = false;

    /* ── chimney smoke — three recycled puffs, live layer only ── */
    if (!this.reduced) {
      const smokeLayer = new Container();
      root.addChild(smokeLayer);
      for (let i = 0; i < 3; i++) {
        const g = new Graphics();
        g.rect(-2, -2, 4, 4).fill({ color: 0xf3f4e7 });
        g.rect(-1, -3, 2, 6).fill({ color: 0xf3f4e7 });
        g.alpha = 0;
        smokeLayer.addChild(g);
        this.smoke.push({ g, t: (i / 3) * 2.8, offset: i });
      }

      /* ── pond frogs — surface, sit, sometimes talk, dive back in ── */
      const frogLayer = new Container();
      root.addChild(frogLayer);
      const homes = [
        { x: 27, y: 15 },
        { x: 29.5, y: 16.3 },
      ];
      for (const h of homes) {
        const sp = new Sprite(texFor(T.wild.frog));
        sp.position.set(Math.round(h.x * TILE), Math.round((h.y + 0.7) * TILE));
        sp.alpha = 0; // starts submerged
        frogLayer.addChild(sp);
        this.frogs.push({
          sprite: sp, homeX: h.x, homeY: h.y, state: "in",
          clock: 1.5 + Math.random() * 5, jump: null, speakOnLand: false,
        });
      }
    }

    this.opts.host.appendChild(app.canvas);
    app.canvas.style.width = "100%";
    app.canvas.style.height = "100%";
    app.canvas.style.imageRendering = "pixelated";
    app.canvas.style.display = "block";
    (app.canvas as HTMLCanvasElement).setAttribute("aria-hidden", "true");

    if (this.reduced) {
      // render one frame, keep the world still (WCAG 2.3.3)
      app.render();
      app.ticker.stop();
    } else {
      app.ticker.add(this.tick);
      app.ticker.maxFPS = 60;
    }

    this.opts.onReady?.();
  }

  private texFor: ((ref: TileRef) => Texture) | null = null;

  /* ── ambient behaviours ── */
  private tick = (ticker: Ticker) => {
    const dt = ticker.deltaMS / 1000;

    // water: 4-frame cycle
    this.waterClock += dt;
    if (this.waterClock > 0.45) {
      this.waterClock = 0;
      this.waterFrame = (this.waterFrame + 1) % 4;
      const tex = this.texFor?.(T.water[this.waterFrame]);
      if (tex) for (const s of this.waterSprites) s.texture = tex;
    }

    for (const a of this.animals) {
      if (a === this.introFarmer) this.tickIntro(a, dt);
      else this.tickAnimal(a, dt);
    }

    // one of the animals has something to say
    this.quipCooldown -= dt;
    const now = performance.now();
    if (this.speech && now > this.speech.until) {
      this.speech.el.remove();
      this.speech = null;
      this.quipCooldown = 14 + Math.random() * 20;
    }
    if (!this.speech && this.quipCooldown <= 0) {
      const idle = this.animals.filter(
        (a) => a.data.kind !== "farmer" && (a.state === "idle" || a.state === "graze")
      );
      const a = idle[Math.floor(Math.random() * idle.length)];
      if (a) {
        const pool =
          Math.random() < 0.55 ? QUIPS : SOUNDS[a.data.kind] ?? QUIPS;
        const text = pool[Math.floor(Math.random() * pool.length)];
        const host = this.opts.host;
        const scale = host.clientWidth / (this.scene.w * TILE);
        const cx = (a.tx + (a.data.kind === "cow" ? 1 : 0.5)) * TILE * scale;
        const cy = a.ty * TILE * scale;
        const el = document.createElement("div");
        el.className = "quip-bubble hero-quip";
        el.textContent = text;
        el.style.left = `${Math.round(cx)}px`;
        el.style.top = `${Math.round(cy)}px`;
        host.appendChild(el);
        const dur = 2400 + Math.min(1800, text.length * 40);
        this.speech = { el, until: now + dur };
        // hold still while talking (it's polite)
        a.thinkClock = Math.max(a.thinkClock, dur / 1000 + 0.5);
      } else {
        this.quipCooldown = 3;
      }
    }

    // pond frogs: surface, sit, dive
    for (const f of this.frogs) this.tickFrog(f, dt, now);

    // chimney smoke: rise, wobble, fade, recycle
    const cx = (CHIMNEY.x + 0.5) * TILE;
    const cy = (CHIMNEY.y + 0.2) * TILE;
    for (const puff of this.smoke) {
      puff.t += dt;
      const cycle = 2.8;
      const t = (puff.t % cycle) / cycle;
      puff.g.position.set(
        Math.round(cx + Math.sin(t * 5 + puff.offset * 2.1) * 3),
        Math.round(cy - t * 22)
      );
      puff.g.alpha = t < 0.12 ? t / 0.12 * 0.55 : 0.55 * (1 - (t - 0.12) / 0.88);
      const s = 0.7 + t * 0.9;
      puff.g.scale.set(s);
    }
  };

  /* a frog rests underwater, then hops up onto the surface, sits a beat
     (sometimes with a word), and dives back in — all in place. */
  private tickFrog(f: FrogRig, _dt: number, _now: number) {
    const dt = _dt;
    const sp = f.sprite;
    if (f.jump) {
      f.jump.t += dt;
      const p = Math.min(1, f.jump.t / f.jump.dur);
      const arc = -Math.sin(p * Math.PI) * 9; // hop height, px
      sp.y = Math.round(f.jump.fromY + (f.jump.toY - f.jump.fromY) * p + arc);
      sp.alpha = f.jump.hideAtEnd ? 1 - Math.max(0, (p - 0.4) / 0.6) : Math.min(1, p / 0.4);
      if (p >= 1) {
        f.jump = null;
        if (f.jump === null && sp.alpha < 0.5) {
          sp.alpha = 0; f.state = "in"; f.clock = 3 + Math.random() * 7;
        } else {
          sp.alpha = 1; f.state = "out"; f.clock = 2.5 + Math.random() * 4;
          if (f.speakOnLand) { f.speakOnLand = false; this.frogSpeak(f); }
        }
      }
      return;
    }
    f.clock -= dt;
    if (f.clock > 0) return;
    if (f.state === "out") {
      f.jump = { t: 0, dur: 0.42, fromY: f.homeY * TILE, toY: (f.homeY + 0.7) * TILE, hideAtEnd: true };
    } else {
      sp.x = Math.round(f.homeX * TILE);
      f.jump = { t: 0, dur: 0.42, fromY: (f.homeY + 0.7) * TILE, toY: f.homeY * TILE, hideAtEnd: false };
      if (!this.speech && Math.random() < 0.4) f.speakOnLand = true;
    }
  }

  private frogSpeak(f: FrogRig) {
    if (this.speech) return;
    const host = this.opts.host;
    const scale = host.clientWidth / (this.scene.w * TILE);
    const cx = (f.homeX + 0.5) * TILE * scale;
    const cy = f.homeY * TILE * scale;
    const el = document.createElement("div");
    el.className = "quip-bubble hero-quip";
    el.textContent = FROG_QUIPS[Math.floor(Math.random() * FROG_QUIPS.length)];
    el.style.left = `${Math.round(cx)}px`;
    el.style.top = `${Math.round(cy)}px`;
    host.appendChild(el);
    this.speech = { el, until: performance.now() + 2200 };
    f.clock = Math.max(f.clock, 2.6); // stay up long enough to finish talking
  }

  /* the one-shot load intro: walk the farmer through the trail waypoints to the
     gate, animating the walk cycle + facing, then leave him idling there. */
  private tickIntro(a: AnimalRig, dt: number) {
    const wp = this.introWaypoints[this.introIdx];
    if (!wp) {
      // walked off the bottom — the DOM field-walker carries him on
      this.introFarmer = null;
      a.sprite.visible = false;
      a.data.roam = undefined;
      return;
    }
    const dx = wp.x - a.tx;
    const dy = wp.y - a.ty;
    const d = Math.hypot(dx, dy);
    if (d < 0.08) { this.introIdx++; return; }
    a.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up";
    a.frameClock += dt;
    if (a.frameClock > 0.18) {
      a.frameClock = 0;
      a.frame = (a.frame + 1) % 4;
      const tex = this.texFor?.(T.farmer[a.dir][a.frame]);
      if (tex) a.sprite.texture = tex;
    }
    const step = Math.min(d, 1.6 * dt); // tiles/sec
    a.tx += (dx / d) * step;
    a.ty += (dy / d) * step;
    a.sprite.position.set(Math.round((a.tx - 1) * TILE), Math.round((a.ty - 1) * TILE));
  }

  private tickAnimal(a: AnimalRig, dt: number) {
    a.frameClock += dt;
    a.thinkClock -= dt;

    const setTex = (ref: TileRef) => {
      const tex = this.texFor?.(ref);
      if (tex) a.sprite.texture = tex;
    };

    if (a.data.kind === "chicken") {
      if (a.state === "idle") {
        if (a.frameClock > 0.5) {
          a.frameClock = 0;
          a.frame = (a.frame + 1) % 2;
          setTex(T.chicken.idle[a.frame]);
        }
        if (a.thinkClock <= 0 && a.data.roam) {
          a.state = "walk";
          const r = a.data.roam;
          a.target = { x: r.x + Math.random() * (r.w - 1), y: r.y + Math.random() * (r.h - 1) };
        }
      } else {
        if (a.frameClock > 0.15) {
          a.frameClock = 0;
          a.frame = (a.frame + 1) % 4;
          setTex(T.chicken.walk[a.frame]);
        }
        this.walkToward(a, dt, 1.1);
        if (!a.target) { a.state = "idle"; a.thinkClock = 2 + Math.random() * 4; setTex(T.chicken.idle[0]); }
      }
      a.sprite.position.set(Math.round(a.tx * TILE), Math.round(a.ty * TILE));
    } else if (a.data.kind === "cow") {
      if (a.frameClock > 0.7) {
        a.frameClock = 0;
        a.frame = (a.frame + 1) % 2;
        setTex(T.cow.graze[a.frame]);
      }
      // cows mostly stand and graze; rare shuffle
      if (a.thinkClock <= 0 && a.data.roam) {
        const r = a.data.roam;
        a.target = { x: r.x + Math.random() * (r.w - 2), y: r.y + Math.random() * (r.h - 1) };
        a.thinkClock = 8 + Math.random() * 8;
      }
      if (a.target) this.walkToward(a, dt, 0.5);
      a.sprite.position.set(Math.round(a.tx * TILE), Math.round(a.ty * TILE));
    } else {
      // farmer: ambles around the yard, pauses to "inspect"
      if (a.state === "idle") {
        if (a.frameClock > 0.6) {
          a.frameClock = 0;
          a.frame = (a.frame + 1) % 2;
          setTex(T.farmer[a.dir][a.frame]);
        }
        if (a.thinkClock <= 0 && a.data.roam) {
          a.state = "walk";
          const r = a.data.roam;
          a.target = {
            x: r.x + Math.floor(Math.random() * r.w),
            y: r.y + Math.floor(Math.random() * r.h),
          };
        }
      } else {
        const dx = (a.target?.x ?? a.tx) - a.tx;
        const dy = (a.target?.y ?? a.ty) - a.ty;
        a.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : dy > 0 ? "down" : "up";
        if (a.frameClock > 0.18) {
          a.frameClock = 0;
          a.frame = (a.frame + 1) % 4;
          setTex(T.farmer[a.dir][a.frame]);
        }
        this.walkToward(a, dt, 1.6);
        if (!a.target) {
          a.state = "idle";
          a.thinkClock = 2.5 + Math.random() * 4;
          a.dir = "down";
          setTex(T.farmer.down[0]);
        }
      }
      a.sprite.position.set(Math.round((a.tx - 1) * TILE), Math.round((a.ty - 1) * TILE));
    }
  }

  private walkToward(a: AnimalRig, dt: number, speed: number) {
    if (!a.target) return;
    const dx = a.target.x - a.tx;
    const dy = a.target.y - a.ty;
    const d = Math.hypot(dx, dy);
    if (d < 0.08) { a.target = null; return; }
    const step = Math.min(d, speed * dt);
    a.tx += (dx / d) * step;
    a.ty += (dy / d) * step;
    // flip chicken/cow when walking left (sheets face right by default)
    if (a.data.kind !== "farmer") {
      const flip = dx < -0.05;
      a.sprite.scale.x = flip ? -1 : 1;
      a.sprite.anchor.x = flip ? 1 : 0;
    }
  }

  private teardown() {
    if (!this.app) return;
    // destroy only the frame textures WE created — never the sheet sources,
    // which live in the global Assets cache and serve the next mount
    for (const t of this.textures.values()) t.destroy(false);
    this.textures.clear();
    this.app.destroy({ removeView: true }, { children: true });
    this.app = null;
  }

  destroy() {
    this.destroyed = true;
    this.teardown();
    this.speech?.el.remove();
    this.speech = null;
    this.waterSprites = [];
    this.animals = [];
    this.smoke = [];
  }
}
