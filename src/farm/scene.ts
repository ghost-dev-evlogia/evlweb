/* ─────────────────────────────────────────────────────────────────────────────
   THE FARM — scene definition (single source of truth)
   Consumed by scripts/render-farm.ts (static fallback PNG + OG) and the PixiJS
   hero (live layer). Map coordinates are in 16px tiles.

   v3: the top SKY_ROWS rows are TRANSPARENT — the page's scroll-driven sky
   gradient shows through in both the static PNG and the live canvas, so the
   headline sits over real sky and the seam can't drift. The farm is pure
   living scenery now: no service plots, no hotspots — the copy moved into
   the page and the opening cutscene.
   ──────────────────────────────────────────────────────────────────────────── */
import { T, type TileRef } from "./tiles.ts";

/** Rows 0..SKY_ROWS-1 are open sky (alpha 0). Ground starts at SKY_ROWS. */
export const SKY_ROWS = 5;

/** Chimney tile position (smoke puffs spawn here in the live layer). */
export const CHIMNEY = { x: 6, y: 4 };

export type Placement = {
  t: TileRef;
  x: number;
  y: number;
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

/** Rounded dirt patch from the 3×3 autotile. */
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
  out.push(p(T.roof.chimney, CHIMNEY.x, CHIMNEY.y)); // smoke spawns here (live)
  out.push(p(T.biome.flowerPinkBig, x - 1, y + 4)); // flowers by the wall
  return out;
}

/** Crop a 1×1 tile out of a larger ref at tile offset (ox, oy). */
function t2(ref: TileRef, ox: number, oy: number): TileRef {
  return { s: ref.s, x: ref.x + ox, y: ref.y + oy, w: 1, h: 1 };
}

export function buildScene(variant: "homestead" | "riverside" | "orchard" | "final" = "final"): Scene {
  const W = 32, H = 18;
  const rnd = mulberry32(variant.length * 1000 + 7);

  /* ── layer 0: grass ground starting at the horizon (rows above stay sky) ── */
  const ground: Placement[] = [];
  const g = T.grass;
  for (let x = 0; x < W; x++) ground.push(p(g.tp, x, SKY_ROWS)); // horizon edge
  for (let y = SKY_ROWS + 1; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const r = rnd();
      let tile = g.fill[0];
      if (r > 0.92) tile = g.tuft[Math.floor(rnd() * 3)];
      else if (r > 0.82) tile = g.fill2[Math.floor(rnd() * 3)];
      else if (r > 0.55) tile = g.fill[Math.floor(rnd() * 3)];
      ground.push(p(tile, x, y));
    }
  }

  /* ── pond, bottom-right ── */
  const pondRect = { x: 25, y: 14, w: 7, h: 4 };
  const { water, ring } = pond(pondRect.x, pondRect.y, pondRect.w, pondRect.h, W, H);
  const waterLayer: Placement[] = water.map((w2) => p(T.water[0], w2.x, w2.y));

  /* ── decorative crop patches (scenery, not services) ── */
  const patchLayer: Placement[] = [];
  const cropLayer: Placement[] = [];
  const plant = (patch: { x: number; y: number; w: number; h: number }, crops: TileRef[]) => {
    patchLayer.push(...dirtPatch(patch.x, patch.y, patch.w, patch.h));
    for (let yy = 0; yy < patch.h; yy++) {
      for (let xx = 0; xx < patch.w; xx++) {
        cropLayer.push(p(crops[Math.floor(rnd() * crops.length)], patch.x + xx, patch.y + yy));
      }
    }
  };
  plant({ x: 10, y: 7, w: 4, h: 3 }, [T.crop.wheat[3], T.crop.wheat[2]]);
  plant({ x: 16, y: 8, w: 3, h: 3 }, [T.crop.beet[2], T.crop.beet[3]]);
  // sunflower stand: 1×2 sunflowers along the back edge of a shallow patch
  patchLayer.push(...dirtPatch(20, 8, 3, 2));
  for (let xx = 0; xx < 3; xx++) cropLayer.push(p(T.biome.sunflower, 20 + xx, 7));

  /* ── farmhouse on the hill, breaking the horizon ── */
  const houseAt = { x: 3, y: 4 };
  const house = farmhouse(houseAt.x, houseAt.y);
  const door = { x: houseAt.x + 2, y: houseAt.y + 4 };

  /* ── coop + pen (right), cow paddock (left) ── */
  const coopAt = { x: 26, y: 6 };
  const coop: Placement[] = [
    p(T.coop, coopAt.x, coopAt.y),
    ...fenceRect(24, 9, 7, 4, { x: 26, w: 1 }),
    p(T.eggNest, 25, 10),
    ...fenceRect(1, 13, 5, 4, { x: 3, w: 1 }),
  ];

  /* ── animals ── */
  const animals: SceneAnimal[] = [
    { kind: "chicken", x: 25, y: 10, roam: { x: 24.5, y: 9.5, w: 5.5, h: 2.5 } },
    { kind: "chicken", x: 27, y: 11, roam: { x: 24.5, y: 9.5, w: 5.5, h: 2.5 } },
    { kind: "chicken", x: 28, y: 10, roam: { x: 24.5, y: 9.5, w: 5.5, h: 2.5 } },
    { kind: "cow", x: 2.5, y: 14, roam: { x: 1.5, y: 13.5, w: 2.5, h: 2 } },
    { kind: "farmer", x: 9, y: 12, roam: { x: 7, y: 10, w: 7, h: 4 } },
  ];
  const animalLayer: Placement[] = [
    // chickens use idle[0] so the live layer's first frame matches exactly
    p(T.chicken.idle[0], animals[0].x, animals[0].y),
    p(T.chicken.idle[0], animals[1].x, animals[1].y),
    p(T.chicken.idle[0], animals[2].x, animals[2].y),
    p(T.cow.graze[0], animals[3].x, animals[3].y),
    // farmer frame is 3×3 with the sprite centered — offset so feet land on tile
    p(T.farmer.down[0], animals[4].x - 1, animals[4].y - 1),
  ];

  /* ── worn dirt trail: door → winds south-east → exits the bottom edge
        (the page's dirt path picks it up below the hero) ── */
  const path: Placement[] = [];
  const trail: Array<[number, number]> = [
    [5, 9], [5, 10], [5, 11], [6, 11], [6, 12], [6, 13], [7, 13], [7, 14], [7, 15], [7, 16], [7, 17],
  ];
  trail.forEach(([x, y], i) => path.push(p(T.dirt.fill[i % 3], x, y)));
  // gate posts where the trail leaves the farm
  path.push(p(T.fence.post, 6, 16), p(T.fence.post, 8, 16));

  /* ── trees on the horizon + decor everywhere ── */
  const decor: Placement[] = [
    p(T.biome.treeBig, 0, 4),
    p(T.biome.treeSmall, 2, 5),
    p(T.biome.treeApple, 13, 4),
    p(T.biome.treeBig, 17, 4),
    p(T.biome.treeSmall, 22, 5),
    p(T.biome.treeBig, 29, 4),
    p(T.biome.bush, 9, 6),
    p(T.biome.bushBerry, 15, 6),
    p(T.biome.flowerBigYellow, 14, 7),
    p(T.biome.flowerPink, 19, 6),
    p(T.biome.sunflower, 0, 9),
    p(T.biome.flowerYellow, 23, 11),
    p(T.biome.mushroom, 1, 10),
    p(T.biome.mushroomBig, 3, 11),
    p(T.biome.rockSmall, 12, 11),
    p(T.biome.rockBig, 21, 13),
    p(T.biome.logSmall, 17, 12),
    p(T.biome.bushBerry, 10, 15),
    p(T.biome.flowerPinkBig, 12, 16),
    p(T.biome.flowerYellow, 15, 15),
    p(T.biome.grapes, 18, 16),
    p(T.biome.bush, 21, 16),
    p(T.biome.flowerBox, 2, 17),
    p(T.chest, 22, 12),
    p(T.biome.lilypadBig, pondRect.x + 2, pondRect.y + 1),
    p(T.biome.lilypad, pondRect.x + 4, pondRect.y + 2),
  ];

  return {
    w: W,
    h: H,
    layers: [ground, waterLayer, ring, patchLayer, path, cropLayer, house, coop, decor, animalLayer],
    water,
    animals,
    door,
  };
}
