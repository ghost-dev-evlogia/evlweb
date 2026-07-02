/* ─────────────────────────────────────────────────────────────────────────────
   THE FARM — scene definition (single source of truth)
   Consumed by scripts/render-farm.ts (static fallback PNG) and the PixiJS
   hero (live layer). Map coordinates are in 16px tiles.
   ──────────────────────────────────────────────────────────────────────────── */
import { T, type TileRef } from "./tiles.ts";

export type Placement = {
  t: TileRef;
  x: number;
  y: number;
  /** owning plot id (crop placements only) — used for hover juice grouping */
  pid?: string;
};

export type Plot = {
  id: string;
  label: string;
  crop: string;
  href: string;
  /** plot rect in tile coords */
  x: number;
  y: number;
  w: number;
  h: number;
  /** one-line description shown in the dialog panel on hover/focus */
  blurb: string;
};

export type SceneAnimal = {
  kind: "chicken" | "cow" | "farmer";
  x: number;
  y: number;
  /** roaming rect (tiles) for ambient wandering */
  roam?: { x: number; y: number; w: number; h: number };
};

export type Scene = {
  w: number;
  h: number;
  /** draw-ordered layers of placements (static render draws all) */
  layers: Placement[][];
  /** water tiles (for frame animation at runtime) */
  water: { x: number; y: number }[];
  plots: Plot[];
  animals: SceneAnimal[];
  /** where the farmhouse door is (walk target, tiles) */
  door: { x: number; y: number };
};

/* Deterministic PRNG so every render of the scene is identical. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const p = (t: TileRef, x: number, y: number): Placement => ({ t, x, y });

/** 4-wide × 3-tall rounded dirt plot from the 3×3 autotile. */
function dirtPatch(x: number, y: number, w: number, h: number): Placement[] {
  const d = T.dirt;
  const out: Placement[] = [];
  for (let yy = 0; yy < h; yy++) {
    for (let xx = 0; xx < w; xx++) {
      const top = yy === 0, bot = yy === h - 1, left = xx === 0, right = xx === w - 1;
      let tile = d.c;
      if (top && left) tile = d.tl;
      else if (top && right) tile = d.tr;
      else if (bot && left) tile = d.bl;
      else if (bot && right) tile = d.br;
      else if (top) tile = d.tp;
      else if (bot) tile = d.b;
      else if (left) tile = d.l;
      else if (right) tile = d.r;
      out.push(p(tile, x + xx, y + yy));
    }
  }
  return out;
}

/** Rectangular pond: water fill + inward-facing grass ring (island tiles mirrored). */
function pond(x: number, y: number, w: number, h: number, W: number, H: number) {
  const g = T.grass;
  const water: { x: number; y: number }[] = [];
  const ring: Placement[] = [];
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
      water.push({ x: xx, y: yy });
      const top = yy === y, bot = yy === y + h - 1, left = xx === x, right = xx === x + w - 1;
      // grass overhangs the water on each pond edge — mirror the island tiles
      let tile: TileRef | null = null;
      if (top && left) tile = g.br;
      else if (top && right) tile = g.bl;
      else if (bot && left) tile = g.tr;
      else if (bot && right) tile = g.tl;
      else if (top) tile = g.b;
      else if (bot) tile = g.tp;
      else if (left) tile = g.r;
      else if (right) tile = g.l;
      if (tile) ring.push(p(tile, xx, yy));
    }
  }
  return { water, ring };
}

/** Fence rectangle outline with an optional gap on the bottom edge. */
function fenceRect(x: number, y: number, w: number, h: number, gap?: { x: number; w: number }): Placement[] {
  const f = T.fence;
  const out: Placement[] = [];
  for (let xx = x + 1; xx < x + w - 1; xx++) {
    out.push(p(f.hMid, xx, y));
    const inGap = gap && xx >= gap.x && xx < gap.x + gap.w;
    if (!inGap) out.push(p(f.hMid, xx, y + h - 1));
  }
  for (let yy = y + 1; yy < y + h - 1; yy++) {
    out.push(p(f.vMid, x, yy), p(f.vMid, x + w - 1, yy));
  }
  out.push(
    p(f.cornerTL, x, y), p(f.cornerTR, x + w - 1, y),
    p(f.cornerBL, x, y + h - 1), p(f.cornerBR, x + w - 1, y + h - 1)
  );
  return out;
}

/** Farmhouse assembled the way Cup Nooble's own promo art does it:
    a wide scalloped roof (tileable L/M/R columns, 5 tall) over a plank wall
    strip carrying the door and a shuttered window. Footprint w×6 at (x, y). */
function farmhouse(x: number, y: number, w = 6): Placement[] {
  const f = T.facade;
  const out: Placement[] = [];
  // wall strip first — the roof's scallop tips overhang it (promo-authentic)
  out.push(p(f.wallL, x, y + 4));
  for (let i = 1; i < w - 1; i++) out.push(p(f.wallM, x + i, y + 4));
  out.push(p(f.wallR, x + w - 1, y + 4));
  out.push(p(T.door.closed, x + 2, y + 4));
  out.push(p(t2(T.wall.wood, 1, 0), x + w - 2, y + 4)); // shuttered window
  // roof over the wall
  out.push(p(f.roofL, x, y));
  for (let i = 1; i < w - 1; i++) out.push(p(f.roofM, x + i, y));
  out.push(p(f.roofR, x + w - 1, y));
  out.push(p(T.biome.flowerPinkBig, x - 1, y + 4)); // flowers by the wall
  return out;
}

/** Crop a 1×1 tile out of a larger ref at tile offset (ox, oy). */
function t2(ref: TileRef, ox: number, oy: number): TileRef {
  return { s: ref.s, x: ref.x + ox, y: ref.y + oy, w: 1, h: 1 };
}

export const CROPS: Record<string, TileRef[]> = {
  wheat: [T.crop.wheat[3]],
  wheatYoung: [T.crop.wheat[1], T.crop.wheat[2]],
  beet: [T.crop.beet[2], T.crop.beet[3]],
  sunflower: [T.biome.sunflower],
  sprout: [T.crop.wheat[0], T.crop.beet[0]],
};

/* The five services, as farm plots. Copy stays engineer-first. */
export const PLOTS: Plot[] = [
  {
    id: "product",
    label: "Product & Platform",
    crop: "wheat",
    href: "/services#product",
    x: 9, y: 9, w: 4, h: 3,
    blurb: "Full product builds — web, mobile, platforms. 8–24 weeks, fixed scope.",
  },
  {
    id: "internal-tools",
    label: "Internal Tools",
    crop: "beet",
    href: "/services#internal-tools",
    x: 14, y: 9, w: 4, h: 3,
    blurb: "Dashboards, admin panels, workflow tools. 4–10 weeks, fixed scope.",
  },
  {
    id: "applied-ai",
    label: "Applied AI",
    crop: "sunflower",
    href: "/services#applied-ai",
    x: 19, y: 9, w: 4, h: 3,
    blurb: "Production AI systems — LLMs, vision, retrieval. Pilots in 4–6 weeks.",
  },
  {
    id: "iot",
    label: "IoT & Devices",
    crop: "wheatYoung",
    href: "/services#iot",
    x: 11, y: 12, w: 4, h: 3,
    blurb: "Firmware, sensors, connected hardware. Prototype to production.",
  },
  {
    id: "coaching",
    label: "Agentic AI Coaching",
    crop: "sprout",
    href: "/services#coaching",
    x: 16, y: 12, w: 4, h: 3,
    blurb: "We embed with your engineers and ship alongside them. 12–26 weeks.",
  },
];

export function buildScene(variant: "homestead" | "riverside" | "orchard" | "final" = "final"): Scene {
  const W = 32, H = 18;
  const rnd = mulberry32(variant.length * 1000 + 7);

  /* ── layer 0: grass base with seeded variation ── */
  const ground: Placement[] = [];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const r = rnd();
      const g = T.grass;
      let tile = g.fill[0];
      if (r > 0.92) tile = g.tuft[Math.floor(rnd() * 3)];
      else if (r > 0.82) tile = g.fill2[Math.floor(rnd() * 3)];
      else if (r > 0.55) tile = g.fill[Math.floor(rnd() * 3)];
      ground.push(p(tile, x, y));
    }
  }

  /* ── water + pond ring ── */
  const pondRect =
    variant === "riverside"
      ? { x: 26, y: 0, w: 6, h: 18 }
      : variant === "orchard"
        ? { x: 0, y: 13, w: 8, h: 5 }
        : { x: 25, y: 13, w: 7, h: 5 };
  const { water, ring } = pond(pondRect.x, pondRect.y, pondRect.w, pondRect.h, W, H);
  const waterLayer: Placement[] = water.map((w2) => p(T.water[0], w2.x, w2.y));

  /* ── plots + crops ── */
  const plotLayer: Placement[] = [];
  const cropLayer: Placement[] = [];
  for (const plot of PLOTS) {
    plotLayer.push(...dirtPatch(plot.x, plot.y, plot.w, plot.h));
    const crops = CROPS[plot.crop];
    if (plot.crop === "sunflower") {
      // sunflowers are 1×2 — plant a row along the plot's back edge
      for (let xx = 0; xx < plot.w; xx++) {
        cropLayer.push({ ...p(T.biome.sunflower, plot.x + xx, plot.y - 1), pid: plot.id });
      }
      for (let xx = 0; xx < plot.w - 1; xx++) {
        cropLayer.push({
          ...p(T.crop.wheat[1], plot.x + xx + Math.round(rnd()), plot.y + 1 + Math.floor(rnd() * 2)),
          pid: plot.id,
        });
      }
    } else {
      for (let yy = 0; yy < plot.h; yy++) {
        for (let xx = 0; xx < plot.w; xx++) {
          const c = crops[Math.floor(rnd() * crops.length)];
          cropLayer.push({ ...p(c, plot.x + xx, plot.y + yy), pid: plot.id });
        }
      }
    }
  }

  /* ── farmhouse + coop + fences ── */
  const houseAt = variant === "orchard" ? { x: 25, y: 1 } : { x: 4, y: 1 };
  const house = farmhouse(houseAt.x, houseAt.y);
  const door = { x: houseAt.x + 2, y: houseAt.y + 4 };

  const coopAt = variant === "riverside" ? { x: 20, y: 2 } : variant === "orchard" ? { x: 3, y: 2 } : { x: 26, y: 2 };
  const coop: Placement[] = [
    p(T.coop, coopAt.x, coopAt.y),
    ...fenceRect(coopAt.x - 2, coopAt.y + 2, 7, 4, { x: coopAt.x + 1, w: 1 }),
    p(T.eggNest, coopAt.x - 1, coopAt.y + 4),
  ];

  /* ── animals ── */
  const animals: SceneAnimal[] = [
    { kind: "chicken", x: coopAt.x, y: coopAt.y + 3, roam: { x: coopAt.x - 1, y: coopAt.y + 2, w: 4, h: 3 } },
    { kind: "chicken", x: coopAt.x + 2, y: coopAt.y + 4, roam: { x: coopAt.x - 1, y: coopAt.y + 2, w: 4, h: 3 } },
    { kind: "cow", x: 25, y: 8, roam: { x: 24.5, y: 7, w: 4, h: 3 } },
    { kind: "farmer", x: 6, y: 9, roam: { x: 5, y: 7, w: 4, h: 6 } },
  ];
  const animalLayer: Placement[] = [
    // both chickens use idle[0] so the live layer's first frame matches exactly
    p(T.chicken.idle[0], animals[0].x, animals[0].y),
    p(T.chicken.idle[0], animals[1].x, animals[1].y),
    p(T.cow.graze[0], animals[2].x, animals[2].y),
    // farmer frame is 3×3 with the sprite centered — offset so feet land on tile
    p(T.farmer.down[0], animals[3].x - 1, animals[3].y - 1),
  ];

  /* ── worn dirt trail from the door toward the fields ── */
  const path: Placement[] = [];
  for (let yy = door.y + 1; yy <= 11; yy++) {
    path.push(p(T.dirt.fill[yy % 3], door.x, yy));
  }

  /* ── trees, bushes, decor around the edges ── */
  const decor: Placement[] = [
    p(T.biome.treeBig, 0, 0),
    p(T.biome.treeApple, 12, 0),
    p(T.biome.treeBig, 17, 0),
    p(T.biome.treeSmall, 20, 1),
    p(T.biome.treeBig, 29, 9),
    p(T.biome.treeSmall, 0, 8),
    p(T.biome.bushBerry, 1, 12),
    p(T.biome.bush, 2, 6),
    p(T.biome.bushBerry, 15, 5),
    p(T.biome.mushroom, 1, 15),
    p(T.biome.mushroomBig, 3, 14),
    p(T.biome.rockBig, 5, 16),
    p(T.biome.rockSmall, 8, 15),
    p(T.biome.flowerPinkBig, 4, 7),
    p(T.biome.flowerBigYellow, 13, 6),
    p(T.biome.flowerPink, 21, 5),
    p(T.biome.flowerYellow, 24, 11),
    p(T.biome.logSmall, 27, 11),
    p(T.biome.sunflower, 0, 5),
    p(T.biome.lilypadBig, pondRect.x + 2, pondRect.y + 2),
    p(T.biome.lilypad, pondRect.x + 4, pondRect.y + 3),
    p(T.chest, 29, 14),
    p(T.biome.grapes, 10, 16),
    p(T.biome.flowerBox, 6, 16),
    p(T.biome.flowerPink, 12, 16),
    p(T.biome.flowerYellow, 18, 16),
    p(T.biome.bush, 22, 16),
  ];

  return {
    w: W,
    h: H,
    layers: [ground, waterLayer, ring, plotLayer, path, cropLayer, house, coop, decor, animalLayer],
    water,
    plots: PLOTS,
    animals,
    door,
  };
}
