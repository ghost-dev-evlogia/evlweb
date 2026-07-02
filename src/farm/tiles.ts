/* ─────────────────────────────────────────────────────────────────────────────
   Sprout Lands tile atlas — named source rects into public/farm/sprites/*.png
   ONE visual language: 16px grid, official palette, Cup Nooble outlines.
   Coordinates are in 16px TILE units unless a rect carries `px: true`.
   Consumed by BOTH scripts/render-farm.ts (build-time static PNG) and the
   PixiJS hero at runtime — single source of truth.
   ──────────────────────────────────────────────────────────────────────────── */

export const TILE = 16;

export type TileRef = {
  /** sheet file name inside /farm/sprites/ (no extension) */
  s: string;
  /** source position in 16px tile units */
  x: number;
  y: number;
  /** source size in tile units (default 1×1) */
  w?: number;
  h?: number;
};

const t = (s: string, x: number, y: number, w = 1, h = 1): TileRef => ({ s, x, y, w, h });

export const T = {
  /* ── grass.png — 11×7 ── */
  grass: {
    // flat fill variants (bottom two rows, on-grass decorations)
    fill: [t("grass", 0, 5), t("grass", 1, 5), t("grass", 2, 5)],
    tuft: [t("grass", 3, 5), t("grass", 4, 5), t("grass", 5, 5)],
    fill2: [t("grass", 0, 6), t("grass", 1, 6), t("grass", 2, 6)],
    tuft2: [t("grass", 3, 6), t("grass", 4, 6), t("grass", 5, 6)],
    // transparent decor overlays
    decor: [t("grass", 6, 5), t("grass", 7, 5), t("grass", 6, 6), t("grass", 7, 6)],
    // rounded island (grass over water) 3×3
    tl: t("grass", 0, 0), tp: t("grass", 1, 0), tr: t("grass", 2, 0),
    l: t("grass", 0, 1), c: t("grass", 1, 1), r: t("grass", 2, 1),
    bl: t("grass", 0, 2), b: t("grass", 1, 2), br: t("grass", 2, 2),
  },

  /* ── water.png — 4 animation frames ── */
  water: [t("water", 0, 0), t("water", 1, 0), t("water", 2, 0), t("water", 3, 0)],

  /* ── tilled-dirt.png — 11×7, same autotile layout as grass ── */
  dirt: {
    tl: t("tilled-dirt", 0, 0), tp: t("tilled-dirt", 1, 0), tr: t("tilled-dirt", 2, 0),
    l: t("tilled-dirt", 0, 1), c: t("tilled-dirt", 1, 1), r: t("tilled-dirt", 2, 1),
    bl: t("tilled-dirt", 0, 2), b: t("tilled-dirt", 1, 2), br: t("tilled-dirt", 2, 2),
    fill: [t("tilled-dirt", 0, 5), t("tilled-dirt", 1, 5), t("tilled-dirt", 2, 5)],
  },

  /* ── fences.png — 4×4 ── */
  fence: {
    vTop: t("fences", 0, 0), vMid: t("fences", 0, 1), vBot: t("fences", 0, 2),
    post: t("fences", 0, 3),
    hLeft: t("fences", 1, 3), hMid: t("fences", 2, 3), hRight: t("fences", 3, 3),
    cornerTL: t("fences", 1, 0), tDown: t("fences", 2, 0), cornerTR: t("fences", 3, 0),
    cornerBL: t("fences", 1, 2), tUp: t("fences", 2, 2), cornerBR: t("fences", 3, 2),
    hMid2: t("fences", 2, 1),
  },

  /* ── paths.png — 4×4 wooden plank bits ── */
  path: {
    plankV: [t("paths", 2, 3), t("paths", 3, 3)],
    steps: t("paths", 0, 0, 1, 4),
  },

  /* ── house-roof.png — 7×5 ── */
  roof: {
    narrow: t("house-roof", 0, 1, 2, 4), // 2-wide roof slab w/ ridge band
    wide: t("house-roof", 4, 2, 3, 3), // 3-wide roof fill w/ ridge
    chimney: t("house-roof", 5, 0), // gray chimney pot
    chimney2: t("house-roof", 6, 0), // alt chimney pot
    scallop: t("house-roof", 3, 0, 2, 2), // scalloped edge + column piece
  },

  /* ── house-walls.png — 5×3 ── */
  wall: {
    window: t("house-walls", 0, 0, 2, 3), // tall wall w/ cream brick window
    wood: t("house-walls", 2, 0, 3, 2), // wide wooden wall w/ shutter window
    slot: t("house-walls", 2, 2, 1, 1), // small wall piece w/ white slot
  },

  /* ── wooden-house.png — 7×5 prebuilt facade ── */
  facade: {
    tower: t("wooden-house", 0, 0, 3, 4), // full tall house w/ window
    pot: t("wooden-house", 0, 4), // gray planter pot
    door: t("wooden-house", 3, 1, 2, 1),
    roofSlab: t("wooden-house", 4, 0, 3, 5),
    // roof slab split into tileable columns (L / M / R), each 1×5
    roofL: t("wooden-house", 4, 0, 1, 5),
    roofM: t("wooden-house", 5, 0, 1, 5),
    roofR: t("wooden-house", 6, 0, 1, 5),
    // tower plank base row split the same way (wall strip under the roof)
    wallL: t("wooden-house", 0, 3), wallM: t("wooden-house", 1, 3), wallR: t("wooden-house", 2, 3),
  },

  /* ── doors.png — 1×4 ── */
  door: {
    frame: t("doors", 0, 0), closed: t("doors", 0, 1),
    tallFrame: t("doors", 0, 2), open: t("doors", 0, 3),
  },

  /* ── grass-biome-things.png — 9×5 ── */
  biome: {
    treeSmall: t("grass-biome-things", 0, 0, 1, 2),
    treeBig: t("grass-biome-things", 1, 0, 2, 2),
    treeApple: t("grass-biome-things", 3, 0, 2, 2),
    mushroomBig: t("grass-biome-things", 5, 0),
    mushroom: t("grass-biome-things", 6, 0),
    mushroomPurple: t("grass-biome-things", 7, 0),
    mushroomPair: t("grass-biome-things", 8, 0),
    sprigs: t("grass-biome-things", 5, 1),
    rockSmall: t("grass-biome-things", 7, 1),
    rockBig: t("grass-biome-things", 8, 1),
    berry: t("grass-biome-things", 0, 2),
    cherry: t("grass-biome-things", 1, 2),
    apple: t("grass-biome-things", 2, 2),
    acornSmall: t("grass-biome-things", 3, 2),
    acorn: t("grass-biome-things", 4, 2),
    log: t("grass-biome-things", 5, 2),
    flowerYellow: t("grass-biome-things", 6, 2),
    flowerBigYellow: t("grass-biome-things", 7, 2),
    sunflower: t("grass-biome-things", 8, 2, 1, 2),
    bushBerry: t("grass-biome-things", 0, 3),
    bush: t("grass-biome-things", 1, 3),
    grapes: t("grass-biome-things", 4, 3),
    flowerBox: t("grass-biome-things", 5, 3),
    flowerPink: t("grass-biome-things", 6, 3),
    flowerPinkBig: t("grass-biome-things", 7, 3),
    logSmall: t("grass-biome-things", 0, 4, 2, 1),
    logBig: t("grass-biome-things", 2, 4, 3, 1),
    rockMossy: t("grass-biome-things", 5, 4),
    rockGray: t("grass-biome-things", 6, 4),
    lilypad: t("grass-biome-things", 7, 4),
    lilypadBig: t("grass-biome-things", 8, 4),
  },

  /* ── plants.png — 6×2: wheat row, beet row ── */
  crop: {
    wheatBag: t("plants", 0, 0),
    wheat: [t("plants", 1, 0), t("plants", 2, 0), t("plants", 3, 0), t("plants", 4, 0)],
    wheatItem: t("plants", 5, 0),
    beetBag: t("plants", 0, 1),
    beet: [t("plants", 1, 1), t("plants", 2, 1), t("plants", 3, 1), t("plants", 4, 1)],
    beetItem: t("plants", 5, 1),
  },

  /* ── characters (frames are 48×48 macro-cells; sprite art centered inside) ── */
  farmer: {
    // 4 cols = animation frames; rows: 0 down, 1 up, 2 left, 3 right
    down: [t("character", 0, 0, 3, 3), t("character", 3, 0, 3, 3), t("character", 6, 0, 3, 3), t("character", 9, 0, 3, 3)],
    up: [t("character", 0, 3, 3, 3), t("character", 3, 3, 3, 3), t("character", 6, 3, 3, 3), t("character", 9, 3, 3, 3)],
    left: [t("character", 0, 6, 3, 3), t("character", 3, 6, 3, 3), t("character", 6, 6, 3, 3), t("character", 9, 6, 3, 3)],
    right: [t("character", 0, 9, 3, 3), t("character", 3, 9, 3, 3), t("character", 6, 9, 3, 3), t("character", 9, 9, 3, 3)],
  },

  cow: {
    idle: [t("cow", 0, 0, 2, 2), t("cow", 2, 0, 2, 2), t("cow", 4, 0, 2, 2)],
    graze: [t("cow", 0, 2, 2, 2), t("cow", 2, 2, 2, 2)],
  },

  chicken: {
    idle: [t("chicken", 0, 0), t("chicken", 1, 0)],
    walk: [t("chicken", 0, 1), t("chicken", 1, 1), t("chicken", 2, 1), t("chicken", 3, 1)],
  },

  coop: t("chicken-house", 0, 0, 3, 3),
  chest: t("chest", 0, 0, 3, 3),
  bridge: t("wood-bridge", 0, 0, 5, 3),
  eggNest: t("egg-nest", 0, 0),

  /* ── furniture.png — 9×6 (indoor bits; signpost-ish pieces) ── */
  furniture: {
    all: t("furniture", 0, 0, 9, 6),
  },
} as const;

/** Every sheet referenced above. */
export const SHEET_FILES = [
  "grass", "water", "tilled-dirt", "fences", "paths",
  "house-roof", "house-walls", "wooden-house", "doors",
  "grass-biome-things", "plants", "character", "cow", "chicken",
  "chicken-house", "chest", "wood-bridge", "egg-nest", "furniture",
] as const;

/** Sheet pixel dimensions (for CSS background-crop sprite display in the DOM). */
export const SHEET_DIMS: Record<string, [number, number]> = {
  grass: [176, 112], water: [64, 16], "tilled-dirt": [176, 112], fences: [64, 64],
  paths: [64, 64], "house-roof": [112, 80], "house-walls": [80, 48],
  "wooden-house": [112, 80], doors: [16, 64], "grass-biome-things": [144, 80],
  plants: [96, 32], character: [192, 192], cow: [96, 64], chicken: [64, 32],
  "chicken-house": [48, 48], chest: [240, 96], "wood-bridge": [80, 48],
  "egg-nest": [64, 16], furniture: [144, 96],
};
