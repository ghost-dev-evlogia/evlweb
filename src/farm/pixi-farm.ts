/* ─────────────────────────────────────────────────────────────────────────────
   PixiJS farm controller — the live layer of the hero.
   Renders the same scene.ts the static fallback is rendered from, then adds:
   water frame animation, wandering animals, an ambling farmer, plot
   highlight/juice on hover or keyboard focus.

   Client-only: constructed inside useEffect. destroy() is StrictMode-safe.
   ──────────────────────────────────────────────────────────────────────────── */
import type { Application, Container, Sprite, Texture, Ticker } from "pixi.js";
import { TILE, T, SHEET_FILES, type TileRef } from "./tiles.ts";
import { buildScene, type Scene, type SceneAnimal } from "./scene.ts";

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

export class PixiFarm {
  private app: Application | null = null;
  private destroyed = false;
  private textures = new Map<string, Texture>();
  private waterSprites: Sprite[] = [];
  private waterFrame = 0;
  private waterClock = 0;
  private animals: AnimalRig[] = [];
  private cropSprites = new Map<string, Sprite[]>();
  private highlight: Container | null = null;
  private hl: import("pixi.js").Graphics | null = null;
  private hovered: string | null = null;
  private juiceClock = 0;
  private scene: Scene;
  private reduced: boolean;

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

    const layerNames = ["ground", "water", "ring", "plots", "path", "crops", "house", "coop", "decor", "animals"];
    this.scene.layers.forEach((layer, li) => {
      const c = new Container();
      root.addChild(c);
      const isWater = layerNames[li] === "water";
      const isAnimals = layerNames[li] === "animals";
      const isCrops = layerNames[li] === "crops";
      if (isAnimals) return; // animals get live rigs instead
      for (const pl of layer) {
        const sp = new Sprite(texFor(pl.t));
        sp.position.set(pl.x * TILE, pl.y * TILE);
        c.addChild(sp);
        if (isWater) this.waterSprites.push(sp);
        if (isCrops && pl.pid) {
          // crops carry their owning plot id from scene.ts — exact grouping
          const arr = this.cropSprites.get(pl.pid) ?? [];
          arr.push(sp);
          this.cropSprites.set(pl.pid, arr);
          // anchor at foot so bounce scales from the ground
          sp.anchor.set(0, 1);
          sp.y += sp.height;
        }
      }
    });

    /* ── plot highlight overlay (under animals) — one persistent Graphics ── */
    this.highlight = new Container();
    root.addChild(this.highlight);
    this.hl = new Graphics();
    this.highlight.addChild(this.hl);

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

    for (const a of this.animals) this.tickAnimal(a, dt);

    // juice: crop bounce on the hovered plot
    if (this.hovered) {
      this.juiceClock += dt;
      const crops = this.cropSprites.get(this.hovered);
      if (crops) {
        crops.forEach((s, i) => {
          const phase = this.juiceClock * 7 - i * 0.35;
          const sy = phase > 0 ? 1 + Math.max(0, Math.sin(phase)) * 0.08 : 1;
          s.scale.y = sy;
        });
      }
    }
  };

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
      // farmer: ambles up and down the trail, pauses to "inspect"
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

  /** Highlight a plot (hover/focus from the DOM chips). Pass null to clear.
      Synchronous — draws into one persistent Graphics created at init. */
  setHover(plotId: string | null) {
    if (this.destroyed || !this.app || !this.hl) return;
    if (this.hovered === plotId) return;
    this.hovered = plotId;
    this.juiceClock = 0;
    this.hl.clear();
    if (plotId) {
      const plot = this.scene.plots.find((p2) => p2.id === plotId);
      if (plot) {
        // pixel-chunky highlight: outer ink frame + soft paper glow
        const x = plot.x * TILE, y = plot.y * TILE, w = plot.w * TILE, h = plot.h * TILE;
        this.hl.rect(x - 2, y - 2, w + 4, h + 4).stroke({ width: 2, color: 0x353738, alpha: 0.9 });
        this.hl.rect(x, y, w, h).stroke({ width: 2, color: 0xf3f4e7, alpha: 0.9 });
        this.hl.rect(x, y, w, h).fill({ color: 0xf7ebaa, alpha: 0.14 });
      }
    }
    if (this.reduced) this.app.render(); // static mode still shows focus state
  }

  private teardown() {
    if (!this.app) return;
    // destroy only the frame textures WE created — never the sheet sources,
    // which live in the global Assets cache and serve the next mount
    for (const t of this.textures.values()) t.destroy(false);
    this.textures.clear();
    this.app.destroy({ removeView: true }, { children: true });
    this.app = null;
    this.hl = null;
  }

  destroy() {
    this.destroyed = true;
    this.teardown();
    this.waterSprites = [];
    this.animals = [];
    this.cropSprites.clear();
  }
}
