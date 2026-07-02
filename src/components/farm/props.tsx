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
