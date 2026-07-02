/* ─────────────────────────────────────────────────────────────────────────────
   Build-time farm renderer (Node 23+ type-stripping; run: node scripts/render-farm.ts)
   Modes:
     node scripts/render-farm.ts testcard   → tile-atlas verification card
     node scripts/render-farm.ts frames     → style-frame scene variants
     node scripts/render-farm.ts static     → the shipped hero fallback PNGs
   Composites Sprout Lands sheets per src/farm/scene.ts so the static fallback
   and the PixiJS runtime share one source of truth.
   ──────────────────────────────────────────────────────────────────────────── */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import pngjs from "pngjs";
import { TILE, T, SHEET_FILES, type TileRef } from "../src/farm/tiles.ts";

const { PNG } = pngjs;
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SPRITES = join(ROOT, "public/farm/sprites");

type Img = { width: number; height: number; data: Buffer };

const sheets = new Map<string, Img>();
for (const name of SHEET_FILES) {
  const png = PNG.sync.read(readFileSync(join(SPRITES, `${name}.png`)));
  sheets.set(name, png);
}

function makeCanvas(w: number, h: number): Img {
  return { width: w, height: h, data: Buffer.alloc(w * h * 4) };
}

function fillRect(dst: Img, x: number, y: number, w: number, h: number, rgba: [number, number, number, number]) {
  for (let yy = y; yy < y + h; yy++) {
    if (yy < 0 || yy >= dst.height) continue;
    for (let xx = x; xx < x + w; xx++) {
      if (xx < 0 || xx >= dst.width) continue;
      const o = (yy * dst.width + xx) * 4;
      dst.data[o] = rgba[0]; dst.data[o + 1] = rgba[1]; dst.data[o + 2] = rgba[2]; dst.data[o + 3] = rgba[3];
    }
  }
}

/** Alpha-composite a source rect (pixels) onto dst at (dx,dy) pixels. */
function blitPx(dst: Img, src: Img, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number) {
  for (let yy = 0; yy < sh; yy++) {
    const ty = dy + yy;
    if (ty < 0 || ty >= dst.height) continue;
    for (let xx = 0; xx < sw; xx++) {
      const tx = dx + xx;
      if (tx < 0 || tx >= dst.width) continue;
      const so = ((sy + yy) * src.width + (sx + xx)) * 4;
      const a = src.data[so + 3] / 255;
      if (a === 0) continue;
      const doff = (ty * dst.width + tx) * 4;
      const da = dst.data[doff + 3] / 255;
      const outA = a + da * (1 - a);
      for (let c = 0; c < 3; c++) {
        dst.data[doff + c] = Math.round(
          (src.data[so + c] * a + dst.data[doff + c] * da * (1 - a)) / (outA || 1)
        );
      }
      dst.data[doff + 3] = Math.round(outA * 255);
    }
  }
}

/** Blit a TileRef onto dst at tile coords (tx,ty). */
export function blit(dst: Img, ref: TileRef, tx: number, ty: number) {
  const sheet = sheets.get(ref.s);
  if (!sheet) throw new Error(`unknown sheet ${ref.s}`);
  blitPx(
    dst, sheet,
    ref.x * TILE, ref.y * TILE, (ref.w ?? 1) * TILE, (ref.h ?? 1) * TILE,
    tx * TILE, ty * TILE
  );
}

function upscale(src: Img, s: number): Img {
  const out = makeCanvas(src.width * s, src.height * s);
  for (let y = 0; y < out.height; y++) {
    const sy = Math.floor(y / s);
    for (let x = 0; x < out.width; x++) {
      const sx = Math.floor(x / s);
      const so = (sy * src.width + sx) * 4;
      const o = (y * out.width + x) * 4;
      out.data[so + 3] !== undefined && src.data.copy(out.data, o, so, so + 4);
    }
  }
  return out;
}

function save(img: Img, path: string) {
  mkdirSync(dirname(path), { recursive: true });
  const png = new PNG({ width: img.width, height: img.height });
  img.data.copy(png.data);
  writeFileSync(path, PNG.sync.write(png));
  console.log(`wrote ${path} (${img.width}×${img.height})`);
}

/* ═══ TEST CARD — verify every named tile before composing the scene ═══ */
function testcard() {
  const entries: Array<[string, TileRef]> = [];
  const walk = (obj: unknown, prefix: string) => {
    if (Array.isArray(obj)) {
      obj.forEach((v, i) => walk(v, `${prefix}[${i}]`));
    } else if (obj && typeof obj === "object") {
      if ("s" in (obj as TileRef) && "x" in (obj as TileRef)) {
        entries.push([prefix, obj as TileRef]);
      } else {
        for (const [k, v] of Object.entries(obj)) walk(v, prefix ? `${prefix}.${k}` : k);
      }
    }
  };
  walk(T, "");

  const cols = 10;
  const cellW = 6, cellH = 6; // tiles per cell
  const rows = Math.ceil(entries.length / cols);
  const img = makeCanvas(cols * cellW * TILE, rows * cellH * TILE);

  // checkerboard bg
  for (let cy = 0; cy < rows * cellH; cy++)
    for (let cx = 0; cx < cols * cellW; cx++)
      fillRect(img, cx * TILE, cy * TILE, TILE, TILE,
        (cx + cy) % 2 ? [210, 215, 205, 255] : [190, 197, 188, 255]);

  const legend: string[] = [];
  entries.forEach(([name, ref], i) => {
    const cx = (i % cols) * cellW, cy = Math.floor(i / cols) * cellH;
    // cell frame
    fillRect(img, cx * TILE, cy * TILE, cellW * TILE, 2, [255, 0, 60, 255]);
    fillRect(img, cx * TILE, cy * TILE, 2, cellH * TILE, [255, 0, 60, 255]);
    blit(img, ref, cx + 1, cy + 1);
    legend.push(`r${Math.floor(i / cols)} c${i % cols}  ${name}  (${ref.s} ${ref.x},${ref.y} ${ref.w ?? 1}×${ref.h ?? 1})`);
  });

  save(upscale(img, 2), join(ROOT, ".audit/shots/tile-testcard.png"));
  console.log(legend.join("\n"));
}

/* ═══ SCENE RENDER ═══ */
async function renderScene(variant: string, outPath: string, scale: number) {
  const { buildScene } = await import("../src/farm/scene.ts");
  const scene = buildScene(variant as never);
  const img = makeCanvas(scene.w * TILE, scene.h * TILE);
  for (const layer of scene.layers) {
    for (const p of layer) blit(img, p.t, p.x, p.y);
  }
  save(scale > 1 ? upscale(img, scale) : img, outPath);
}

const mode = process.argv[2] ?? "testcard";
if (mode === "testcard") {
  testcard();
} else if (mode === "frames") {
  for (const v of ["homestead", "riverside", "orchard"]) {
    await renderScene(v, join(ROOT, `docs/farm-handoff/style-frames/${v}.png`), 3);
  }
} else if (mode === "static") {
  await renderScene("final", join(ROOT, "public/farm/farm-static.png"), 1);
  await renderScene("final", join(ROOT, "public/farm/farm-static@3x.png"), 3);
} else {
  throw new Error(`unknown mode ${mode}`);
}
