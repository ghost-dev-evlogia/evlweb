/* ─────────────────────────────────────────────────────────────────────────────
   New farm animals, authored in-palette (run: node scripts/make-critters.ts)
   Every color is SAMPLED from the Sprout Lands sheets themselves, so the new
   species can't drift off the pack's 97-color palette:
   - duck.png       — the chicken sheet recolored into a duckling (same layout)
   - wildlife.png   — bunny / pig / sheep / bird / butterfly / frog, 16px grid
   A ×4 proof sheet is written to .audit/shots/critters-proof.png for review.
   ──────────────────────────────────────────────────────────────────────────── */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pngjs from "pngjs";

const { PNG } = pngjs;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SPRITES = join(ROOT, "public/farm/sprites");

type Img = { width: number; height: number; data: Buffer };
type RGB = [number, number, number];

const load = (name: string): Img => PNG.sync.read(readFileSync(join(SPRITES, `${name}.png`)));

function save(img: Img, path: string) {
  mkdirSync(dirname(path), { recursive: true });
  const png = new PNG({ width: img.width, height: img.height });
  img.data.copy(png.data);
  writeFileSync(path, PNG.sync.write(png));
  console.log(`wrote ${path} (${img.width}×${img.height})`);
}

/** frequency-sorted opaque colors of an image (optionally a sub-rect, px) */
function colors(img: Img, rect?: [number, number, number, number]): Array<{ c: RGB; n: number }> {
  const [rx, ry, rw, rh] = rect ?? [0, 0, img.width, img.height];
  const freq = new Map<string, number>();
  for (let y = ry; y < ry + rh; y++) {
    for (let x = rx; x < rx + rw; x++) {
      const o = (y * img.width + x) * 4;
      if (img.data[o + 3] < 200) continue;
      const k = `${img.data[o]},${img.data[o + 1]},${img.data[o + 2]}`;
      freq.set(k, (freq.get(k) ?? 0) + 1);
    }
  }
  return [...freq.entries()]
    .map(([k, n]) => ({ c: k.split(",").map(Number) as RGB, n }))
    .sort((a, b) => b.n - a.n);
}

const lum = ([r, g, b]: RGB) => 0.299 * r + 0.587 * g + 0.114 * b;

/* ── sample the palette ── */
const chicken = load("chicken");
const cow = load("cow");
const biome = load("grass-biome-things");
const plants = load("plants");
const fences = load("fences");

const chickenCols = colors(chicken);
const OUTLINE = chickenCols.reduce((a, b) => (lum(a.c) < lum(b.c) ? a : b)).c;
const whites = chickenCols.filter(({ c }) => lum(c) > 200).sort((a, b) => b.n - a.n);
const WHITE = whites[0].c; // chicken body
const WHITE_SHADE = whites[1]?.c ?? WHITE;
const BEAK = chickenCols.find(({ c }) => c[0] > 190 && c[1] > 110 && c[1] < 190 && c[2] < 110)?.c ?? [224, 152, 66];
const COMB = chickenCols.find(({ c }) => c[0] > 180 && c[1] < 110)?.c ?? [214, 80, 70];

const cowCols = colors(cow);
// true pinks only: strongly red-dominant AND red≈blue-ish gap (skips the tans)
const pinks = cowCols
  .filter(({ c }) => c[0] - c[1] > 40 && c[0] - c[2] > 40 && c[0] > 170)
  .sort((a, b) => lum(b.c) - lum(a.c));
const PINK = pinks[0]?.c ?? [217, 154, 154];
const PINK_DEEP = pinks[pinks.length - 1]?.c ?? [193, 124, 124];

const bushCols = colors(biome, [16, 48, 16, 16]); // T.biome.bush
const GREEN = bushCols[0].c;
const GREEN_DEEP = bushCols.filter(({ c }) => lum(c) < lum(GREEN) - 10).sort((a, b) => b.n - a.n)[0]?.c ?? GREEN;

const wheatCols = colors(plants, [64, 0, 16, 16]); // ripe wheat
const YELLOW = wheatCols.find(({ c }) => c[0] > 200 && c[1] > 170 && c[2] < 140)?.c ?? [240, 214, 120];
const YELLOW_DEEP = wheatCols
  .filter(({ c }) => c[0] > 170 && c[1] > 120 && c[2] < 120 && lum(c) < lum(YELLOW) - 15)
  .sort((a, b) => b.n - a.n)[0]?.c ?? [216, 174, 90];

const woodCols = colors(fences);
const BROWN = woodCols[0].c;
const BROWN_DEEP = woodCols.filter(({ c }) => lum(c) < lum(BROWN) - 20).sort((a, b) => b.n - a.n)[0]?.c ?? woodCols[1].c;

console.log("sampled:", { OUTLINE, WHITE, WHITE_SHADE, BEAK, COMB, PINK, PINK_DEEP, GREEN, GREEN_DEEP, YELLOW, YELLOW_DEEP, BROWN, BROWN_DEEP });

/* ── duck: chicken recolored (white ramp → wheat-yellow ramp, comb → beak) ── */
function recolor(src: Img, map: Array<[RGB, RGB]>): Img {
  const out: Img = { width: src.width, height: src.height, data: Buffer.from(src.data) };
  for (let o = 0; o < out.data.length; o += 4) {
    if (out.data[o + 3] < 10) continue;
    for (const [from, to] of map) {
      if (out.data[o] === from[0] && out.data[o + 1] === from[1] && out.data[o + 2] === from[2]) {
        out.data[o] = to[0]; out.data[o + 1] = to[1]; out.data[o + 2] = to[2];
        break;
      }
    }
  }
  return out;
}

const duck = recolor(chicken, [
  [WHITE, YELLOW],
  [WHITE_SHADE, YELLOW_DEEP],
  [COMB, BEAK], // no comb — reads as a duckling bill tuft
]);
save(duck, join(SPRITES, "duck.png"));

/* ── wildlife.png: hand-drawn 16px frames, colors from the samples above ── */
type Pal = Record<string, RGB | null>;

function draw(img: Img, map: string[], pal: Pal, ox: number, oy: number) {
  map.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const c = pal[ch];
      if (!c) return;
      const o = ((oy + y) * img.width + ox + x) * 4;
      img.data[o] = c[0]; img.data[o + 1] = c[1]; img.data[o + 2] = c[2]; img.data[o + 3] = 255;
    });
  });
}

const sheet: Img = { width: 64, height: 96, data: Buffer.alloc(64 * 96 * 4) };

/* bunny — cream, tall ears, facing right */
const bunnyPal: Pal = { ".": null, o: OUTLINE, b: WHITE, s: WHITE_SHADE, e: OUTLINE, x: PINK };
const bunnyIdle = [
  "................",
  "................",
  "......oo..oo....",
  ".....obxo.obxo..",
  ".....obxo.obxo..",
  ".....obbo.obbo..",
  "......obbobbo...",
  ".....obbbbbbbo..",
  "....obbbbbbbbo..",
  "...obbbbbbebbo..",
  "..osbbbbbbbbxo..",
  "..obbbbbbbbbbo..",
  "...obbsbbsbbo...",
  "....obo..obo....",
  ".....o....o.....",
  "................",
];
const bunnyBlink = bunnyIdle.map((r, i) => (i === 9 ? r.replace("e", "s") : r));
const bunnyHop0 = [
  "................",
  "................",
  "................",
  ".....oo..oo.....",
  "....obxo.obxo...",
  "....obxo.obxo...",
  ".....obboobo....",
  "....obbbbbbbo...",
  "...obbbbbbbbbo..",
  "..obbbbbbbebbo..",
  "..osbbbbbbbbxo..",
  "..obbsbbbsbbbo..",
  "...oobo..oboo...",
  "................",
  "................",
  "................",
];
const bunnyHop1 = [
  "................",
  "................",
  "................",
  "................",
  ".....oo..oo.....",
  "....obxo.obxo...",
  "....obxo.obxo...",
  ".....obboobo....",
  "...oobbbbbbbo...",
  "..obbbbbbbebbo..",
  "..osbbbbbbbbxo..",
  "...obbbbbbbbo...",
  "....osbo.obso...",
  ".....oo...oo....",
  "................",
  "................",
];

/* pig — cow pinks, snout right */
const pigPal: Pal = { ".": null, o: OUTLINE, b: PINK, s: PINK_DEEP, e: OUTLINE, x: PINK_DEEP };
const pigIdle = [
  "................",
  "................",
  "................",
  "................",
  "....oo.....oo...",
  "...obso...obso..",
  "...obbooooobbo..",
  "..obbbbbbbbbbo..",
  ".obbbbbbbbbbbboo",
  ".obbebbbbbbbsxxo",
  ".obbbbbbbbbbsxxo",
  ".obbbbbbbbbbbbo.",
  "..obsobbbbosbo..",
  "...oo.obbo.oo...",
  ".......oo.......",
  "................",
];
const pigBlink = pigIdle.map((r, i) => (i === 9 ? r.replace("e", "b") : r));
const pigWalk0 = pigIdle.map((r, i) =>
  i === 12 ? "..obso.bbb.obo.." : i === 13 ? "...oo..obo..oo.." : i === 14 ? "........o......." : r
);
const pigWalk1 = pigIdle.map((r, i) =>
  i === 12 ? "..obo.bbbb.osbo." : i === 13 ? "..oo...obo...oo." : i === 14 ? "........o......." : r
);

/* sheep — chicken-white fluff, wood-brown face, facing right */
const sheepPal: Pal = { ".": null, o: OUTLINE, b: WHITE, s: WHITE_SHADE, f: BROWN, d: BROWN_DEEP, e: WHITE };
const sheepIdle = [
  "................",
  "................",
  "..........ooo...",
  "...oooooooffdo..",
  "..obbbbbbofedo..",
  ".obbbbbbboffdo..",
  ".obbbbbbbboddo..",
  ".obbbbbbbbboo...",
  ".obbbbbbbbbbo...",
  ".obbbbbbbbbbo...",
  "..obbbbbbbbo....",
  "...obsoosbo.....",
  "....odo.odo.....",
  "....odo.odo.....",
  ".....o...o......",
  "................",
];
const sheepBlink = sheepIdle.map((r, i) => (i === 4 ? r.replace("e", "f") : r));
const sheepWalk0 = sheepIdle.map((r, i) =>
  i === 12 ? "...odo...odo...." : i === 13 ? "...odo..odo....." : r
);
const sheepWalk1 = sheepIdle.map((r, i) =>
  i === 12 ? "....odo.odo....." : i === 13 ? ".....odo.odo...." : r
);

/* bird — little wood-brown sparrow, flying right */
const birdPal: Pal = { ".": null, o: OUTLINE, b: BROWN, s: BROWN_DEEP, w: WHITE, x: BEAK, e: OUTLINE };
const birdFly0 = [
  "................",
  "................",
  "................",
  "................",
  "....oo...oo.....",
  "...obbo.obbo....",
  "....obbobbo.....",
  ".....obbbbo.....",
  "....obbbbbebo...",
  "...obbbbbbbboxo.",
  "....owbbbwoo....",
  ".....ooooo......",
  "................",
  "................",
  "................",
  "................",
];
const birdFly1 = [
  "................",
  "................",
  "................",
  "................",
  "................",
  "................",
  "................",
  ".....obbbbo.....",
  "..oobbbbbbebo...",
  ".obbbbbbbbbboxo.",
  "..oobwbbbwoo....",
  ".....ooooo......",
  "................",
  "................",
  "................",
  "................",
];
const birdFly2 = [
  "................",
  "................",
  "................",
  "................",
  "................",
  "................",
  "................",
  ".....obbbbo.....",
  "....obbbbbebo...",
  "...obbbbbbbboxo.",
  "..obbowbbwoo....",
  ".obbo.ooooo.....",
  "..oo............",
  "................",
  "................",
  "................",
];

/* butterfly — pink wings, tiny */
const flutterPal: Pal = { ".": null, o: OUTLINE, x: PINK, d: PINK_DEEP, b: OUTLINE, y: YELLOW };
const flutterOpen = [
  "................",
  "................",
  "................",
  "................",
  "...oo....oo.....",
  "..oxxo..oxxo....",
  "..oxyxooxyxo....",
  "...oxxobxxo.....",
  "....oobboo......",
  "...odo..odo.....",
  "....oo..oo......",
  "................",
  "................",
  "................",
  "................",
  "................",
];
const flutterClosed = [
  "................",
  "................",
  "................",
  "................",
  "................",
  "....oo..oo......",
  "...oxxo.oxo.....",
  "...oxyxobxo.....",
  "....oxxbbo......",
  ".....oboo.......",
  "......o.........",
  "................",
  "................",
  "................",
  "................",
  "................",
];

/* koi — comb-red body, beak-tan fins, swims right */
const koiPal: Pal = { ".": null, o: OUTLINE, x: COMB, b: BEAK, w: WHITE, e: OUTLINE };
const koiSwim0 = [
  "................",
  "................",
  "................",
  "................",
  "................",
  "...oo...oooo....",
  "..obbo.oxxxxoo..",
  "...obooxwxxxxeo.",
  "..obbo.oxxxxoo..",
  "...oo...oooo....",
  "................",
  "................",
  "................",
  "................",
  "................",
  "................",
];
const koiSwim1 = [
  "................",
  "................",
  "................",
  "................",
  "...oo...........",
  "..obbo..oooo....",
  "...obo.oxxxxoo..",
  "...obooxwxxxxeo.",
  "...obo.oxxxxoo..",
  "..obbo..oooo....",
  "...oo...........",
  "................",
  "................",
  "................",
  "................",
  "................",
];

/* frog — bush greens */
const frogPal: Pal = { ".": null, o: OUTLINE, b: GREEN, s: GREEN_DEEP, e: OUTLINE, w: WHITE };
const frogSit = [
  "................",
  "................",
  "................",
  "................",
  "................",
  "................",
  "..ooo....ooo....",
  ".owweo..owweo...",
  ".owweo..owweo...",
  "..obbboobbbo....",
  ".obbbbbbbbbbo...",
  ".obbbbbbbbbbo...",
  ".obsbbbbbbsbo...",
  "..obo.oo..obo...",
  "...oo.oo...oo...",
  "................",
];
const frogBlink = frogSit.map((r) => r.replaceAll("wwe", "bbb").replaceAll("ww", "bb"));

/* layout — 4 cols × 6 rows of 16px:
   row0 bunny idle,blink,hop0,hop1 · row1 pig idle,blink,walk0,walk1
   row2 sheep idle,blink,walk0,walk1 · row3 bird fly0,fly1,fly2
   row4 butterfly open,closed, frog sit,blink · row5 koi swim0,swim1 */
const cells: Array<[string[], Pal]> = [
  [bunnyIdle, bunnyPal], [bunnyBlink, bunnyPal], [bunnyHop0, bunnyPal], [bunnyHop1, bunnyPal],
  [pigIdle, pigPal], [pigBlink, pigPal], [pigWalk0, pigPal], [pigWalk1, pigPal],
  [sheepIdle, sheepPal], [sheepBlink, sheepPal], [sheepWalk0, sheepPal], [sheepWalk1, sheepPal],
  [birdFly0, birdPal], [birdFly1, birdPal], [birdFly2, birdPal], [birdFly0, birdPal],
  [flutterOpen, flutterPal], [flutterClosed, flutterPal], [frogSit, frogPal], [frogBlink, frogPal],
  [koiSwim0, koiPal], [koiSwim1, koiPal],
];
cells.forEach(([map, pal], i) => {
  const col = i % 4, row = Math.floor(i / 4);
  draw(sheet, map, pal, col * 16, row * 16);
});
save(sheet, join(SPRITES, "wildlife.png"));

/* proof sheet at ×4 on checkerboard */
const proof: Img = { width: sheet.width * 4, height: sheet.height * 4, data: Buffer.alloc(sheet.width * 4 * sheet.height * 4 * 4) };
for (let y = 0; y < proof.height; y++) {
  for (let x = 0; x < proof.width; x++) {
    const o = (y * proof.width + x) * 4;
    const src = ((Math.floor(y / 4) * sheet.width + Math.floor(x / 4)) * 4);
    if (sheet.data[src + 3] > 0) {
      sheet.data.copy(proof.data, o, src, src + 4);
    } else {
      const chk = (Math.floor(x / 32) + Math.floor(y / 32)) % 2 ? 205 : 185;
      proof.data[o] = chk; proof.data[o + 1] = chk + 8; proof.data[o + 2] = chk;
      proof.data[o + 3] = 255;
    }
  }
}
save(proof, join(ROOT, ".audit/shots/critters-proof.png"));
