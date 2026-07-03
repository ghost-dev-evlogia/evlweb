import type { CSSProperties, ReactNode } from "react";
import { PixelSprite } from "./pixel-sprite";
import { T } from "@/farm/tiles.ts";

/* World dressing — the set pieces every section is staged with.
   Server components; all art comes from the tiled assets in /farm/tiles
   (CSS-repeatable) or PixelSprite crops. */

/** A band of grass world. Children (panels, critters, decor) sit on top. */
export function GrassBand({
  children,
  className = "",
  style,
  edges = "both",
  shadows = 2,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** island edge rounding against the sky */
  edges?: "top" | "bottom" | "both" | "none";
  /** drifting cloud shadows count */
  shadows?: number;
}) {
  return (
    <div className={`relative ${className}`} style={style}>
      {(edges === "top" || edges === "both") && (
        <div className="band-grass-edge-t" style={{ height: "calc(var(--px) * 16)" }} aria-hidden />
      )}
      <div className="band-grass relative overflow-hidden">
        {Array.from({ length: shadows }, (_, i) => (
          <span
            key={i}
            className="cloud-shadow"
            aria-hidden
            style={{
              top: `${18 + i * 34}%`,
              animationDelay: `${i * -29}s`,
              animationDuration: `${64 + i * 18}s`,
            }}
          />
        ))}
        <div className="relative">{children}</div>
      </div>
      {(edges === "bottom" || edges === "both") && (
        <div className="band-grass-edge-b" style={{ height: "calc(var(--px) * 16)" }} aria-hidden />
      )}
    </div>
  );
}

/** Decorative pond strip — a rest stop on the journey. */
export function PondBand() {
  return (
    <div aria-hidden className="relative">
      <div className="band-grass" style={{ height: "calc(var(--px) * 10)" }} />
      <div className="band-grass-edge-b rotate-180" style={{ height: "calc(var(--px) * 16)" }} />
      <div className="band-water relative" style={{ height: "calc(var(--px) * 40)" }}>
        <span className="absolute left-[18%] top-[30%]"><PixelSprite tile={T.biome.lilypadBig} scale={3} /></span>
        <span className="absolute left-[43%] top-[55%]"><PixelSprite tile={T.biome.lilypad} scale={3} /></span>
        <span className="absolute left-[71%] top-[28%]"><PixelSprite tile={T.biome.lilypad} scale={3} /></span>
        <span className="absolute left-[86%] top-[60%]"><PixelSprite tile={T.biome.lilypadBig} scale={2} /></span>
      </div>
      <div className="band-grass-edge-t rotate-180" style={{ height: "calc(var(--px) * 16)" }} />
      <div className="band-grass" style={{ height: "calc(var(--px) * 10)" }} />
    </div>
  );
}

/** A horizontal fence rail with posts, for section framing. */
export function FenceRow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`band-fence ${className}`}
      style={{ height: "calc(var(--px) * 16)" }}
    />
  );
}

/** Scattered trees/bushes along a band edge. */
export function TreeLine({ variant = 0 }: { variant?: number }) {
  const sets = [
    [
      { tile: T.biome.treeBig, left: "4%", scale: 3 },
      { tile: T.biome.bush, left: "22%", scale: 3 },
      { tile: T.biome.treeApple, left: "68%", scale: 3 },
      { tile: T.biome.treeSmall, left: "90%", scale: 3 },
    ],
    [
      { tile: T.biome.treeSmall, left: "8%", scale: 3 },
      { tile: T.biome.treeBig, left: "80%", scale: 3 },
      { tile: T.biome.mushroomBig, left: "31%", scale: 3 },
      { tile: T.biome.bushBerry, left: "58%", scale: 3 },
    ],
    [
      { tile: T.biome.treeApple, left: "12%", scale: 3 },
      { tile: T.biome.sunflower, left: "45%", scale: 3 },
      { tile: T.biome.treeBig, left: "62%", scale: 2 },
      { tile: T.biome.rockBig, left: "88%", scale: 3 },
    ],
  ];
  const set = sets[variant % sets.length];
  return (
    <div aria-hidden className="relative pointer-events-none" style={{ height: 0 }}>
      {set.map(({ tile, left, scale }, i) => (
        <span key={i} className="absolute bottom-0" style={{ left }}>
          <PixelSprite tile={tile} scale={scale} />
        </span>
      ))}
    </div>
  );
}

/** The dirt road that runs the whole journey (lives inside .terrain). */
export function DirtPath() {
  return (
    <div
      aria-hidden
      className="dirt-road hidden md:block"
      style={{ left: "clamp(24px, 6vw, 110px)" }}
    />
  );
}

/** Divider: a hedge of bushes across the land. */
export function HedgeRow() {
  const bushes = [
    T.biome.bush, T.biome.bushBerry, T.biome.bush, T.biome.bush, T.biome.bushBerry,
    T.biome.bush, T.biome.bushBerry, T.biome.bush, T.biome.bush, T.biome.bushBerry,
    T.biome.bush, T.biome.bush, T.biome.bushBerry, T.biome.bush,
  ];
  return (
    <div aria-hidden className="flex justify-center gap-4 overflow-hidden py-2" style={{ maxHeight: 16 * 3 + 16 }}>
      {bushes.map((tile, i) => (
        <span key={i} style={{ transform: i % 2 ? "translateY(4px)" : undefined }}>
          <PixelSprite tile={tile} scale={3} />
        </span>
      ))}
    </div>
  );
}

/** Divider: a stream crossing the land; the road crosses it on a bridge,
    and the koi have places to be. */
export function StreamBand() {
  const fish = [
    { left: "18%", top: "34%", dur: 34, delay: -6, rtl: false },
    { left: "55%", top: "58%", dur: 46, delay: -20, rtl: true },
    { left: "80%", top: "22%", dur: 40, delay: -33, rtl: false },
  ];
  return (
    <div aria-hidden className="relative">
      <div className="band-grass-edge-b rotate-180" style={{ height: "calc(var(--px) * 16)" }} />
      <div className="band-water relative overflow-hidden" style={{ height: "calc(var(--px) * 24)" }}>
        {fish.map(({ left, top, dur, delay, rtl }, i) => (
          <span
            key={i}
            className="koi-track absolute"
            style={{
              left,
              top,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              animationDirection: rtl ? "reverse" : "normal",
            }}
          >
            <span className="koi block" style={{ transform: rtl ? "scaleX(-1)" : undefined }} />
          </span>
        ))}
      </div>
      <div className="band-grass-edge-t rotate-180" style={{ height: "calc(var(--px) * 16)" }} />
      {/* the bridge carries the dirt road over the water */}
      <span
        className="hidden md:block absolute top-1/2 -translate-y-1/2"
        style={{ left: "clamp(0px, calc(6vw - 40px), 86px)" }}
      >
        <PixelSprite tile={T.bridge} scale={3} />
      </span>
    </div>
  );
}

/** The hero's land meets the journey's land at a country lane — a plain
    packed-dirt road running the full width. Simple, unmistakable, and the
    vertical road T-joins it below. */
export function HeroBoundary() {
  return (
    <div aria-hidden className="relative">
      <div className="band-grass-edge-b rotate-180" style={{ height: "calc(var(--px) * 16)" }} />
      <div className="band-dirt" style={{ height: "calc(var(--px) * 20)" }} />
      <div className="band-grass-edge-t rotate-180" style={{ height: "calc(var(--px) * 16)" }} />
    </div>
  );
}

/** Divider: a band of ripe crop rows. */
export function CropRowsBand({ crop = "wheat" }: { crop?: "wheat" | "beet" }) {
  const tile = crop === "wheat" ? T.crop.wheat[3] : T.crop.beet[3];
  return (
    <div aria-hidden className="band-dirt overflow-hidden" style={{ boxShadow: "inset 0 0 0 var(--px) var(--wood-shadow)" }}>
      <div className="flex justify-center gap-3 py-1">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className="shrink-0" style={{ transform: i % 3 === 1 ? "translateY(2px)" : undefined }}>
            <PixelSprite tile={tile} scale={3} />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Divider: scattered wildflowers on the open grass. */
export function FlowerMeadow() {
  const flowers = [
    { tile: T.biome.flowerPinkBig, left: "6%" }, { tile: T.biome.flowerYellow, left: "14%" },
    { tile: T.biome.flowerPink, left: "23%" }, { tile: T.biome.flowerBigYellow, left: "31%" },
    { tile: T.biome.flowerYellow, left: "42%" }, { tile: T.biome.flowerPinkBig, left: "52%" },
    { tile: T.biome.flowerPink, left: "61%" }, { tile: T.biome.flowerYellow, left: "70%" },
    { tile: T.biome.flowerBigYellow, left: "79%" }, { tile: T.biome.flowerPink, left: "88%" },
    { tile: T.biome.flowerPinkBig, left: "95%" },
  ];
  return (
    <div aria-hidden className="relative overflow-hidden" style={{ height: 16 * 3 + 20 }}>
      {flowers.map(({ tile, left }, i) => (
        <span key={i} className="absolute" style={{ left, top: i % 2 ? 8 : 24 }}>
          <PixelSprite tile={tile} scale={3} />
        </span>
      ))}
    </div>
  );
}

/** Wooden signpost with a label plate. */
export function Signpost({ label }: { label: string }) {
  return (
    <span className="inline-flex flex-col items-center gap-0" aria-hidden>
      <span
        className="pixel-chip"
        style={{ fontSize: "11px", marginBottom: "-2px", zIndex: 1 }}
      >
        {label}
      </span>
      <img
        src="/farm/tiles/signpost.png"
        alt=""
        style={{ width: 16 * 3, imageRendering: "pixelated" }}
      />
    </span>
  );
}
