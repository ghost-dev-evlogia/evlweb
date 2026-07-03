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
        <div className="band-grass-edge-t" style={{ height: "calc(var(--wpx) * 16)" }} aria-hidden />
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
        <div className="band-grass-edge-b" style={{ height: "calc(var(--wpx) * 16)" }} aria-hidden />
      )}
    </div>
  );
}

/** Decorative pond strip — a rest stop on the journey. */
export function PondBand() {
  return (
    <div aria-hidden className="relative">
      <div className="band-grass" style={{ height: "calc(var(--wpx) * 10)" }} />
      <div className="band-grass-edge-b rotate-180" style={{ height: "calc(var(--wpx) * 16)" }} />
      <div className="band-water relative" style={{ height: "calc(var(--wpx) * 40)" }}>
        <span className="absolute left-[18%] top-[30%]"><PixelSprite tile={T.biome.lilypadBig} scale={3} /></span>
        <span className="absolute left-[43%] top-[55%]"><PixelSprite tile={T.biome.lilypad} scale={3} /></span>
        <span className="absolute left-[71%] top-[28%]"><PixelSprite tile={T.biome.lilypad} scale={3} /></span>
        <span className="absolute left-[86%] top-[60%]"><PixelSprite tile={T.biome.lilypadBig} scale={2} /></span>
      </div>
      <div className="band-grass-edge-t rotate-180" style={{ height: "calc(var(--wpx) * 16)" }} />
      <div className="band-grass" style={{ height: "calc(var(--wpx) * 10)" }} />
    </div>
  );
}

/** The dirt road punching through a divider band so the path stays continuous
    (and the walker has a route). Same texture + X as the road; drawn above the
    band's own decor. Drop it into any `relative` crossing band. */
export function PathThrough() {
  return <div aria-hidden className="path-through" />;
}

/** A horizontal fence rail, split by a gate opening where the dirt path crosses
    — two rail segments flanking a 48px gap with posts, keyed off --path-x so
    the opening lines up with the road (matches the hero gate's language). */
export function FenceRow({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative ${className}`} style={{ height: "calc(var(--wpx) * 16)" }}>
      {/* rail from the left edge to the gate's left post */}
      <div
        className="band-fence absolute inset-y-0 left-0"
        style={{ width: "calc(var(--path-x) - var(--wpx) * 16)" }}
      />
      {/* rail from the gate's right post to the right edge */}
      <div
        className="band-fence absolute inset-y-0 right-0"
        style={{ left: "calc(var(--path-x) + var(--wpx) * 32)" }}
      />
      {/* the two gate posts flanking the road opening */}
      <span className="absolute bottom-0" style={{ left: "calc(var(--path-x) - var(--wpx) * 16)" }}>
        <PixelSprite tile={T.fence.post} scale={3} />
      </span>
      <span className="absolute bottom-0" style={{ left: "calc(var(--path-x) + var(--wpx) * 16)" }}>
        <PixelSprite tile={T.fence.post} scale={3} />
      </span>
    </div>
  );
}

/** Scattered trees/bushes along a band edge. */
export function TreeLine({ variant = 0 }: { variant?: number }) {
  // leftmost props start at ≥16% so nothing sits in the dirt-path corridor on
  // the left (~6–13% across desktop widths) where the walker cat travels.
  const sets = [
    [
      { tile: T.biome.treeBig, left: "16%", scale: 3 },
      { tile: T.biome.bush, left: "34%", scale: 3 },
      { tile: T.biome.treeApple, left: "68%", scale: 3 },
      { tile: T.biome.treeSmall, left: "90%", scale: 3 },
    ],
    [
      { tile: T.biome.treeSmall, left: "18%", scale: 3 },
      { tile: T.biome.treeBig, left: "80%", scale: 3 },
      { tile: T.biome.mushroomBig, left: "31%", scale: 3 },
      { tile: T.biome.bushBerry, left: "58%", scale: 3 },
    ],
    [
      { tile: T.biome.treeApple, left: "17%", scale: 3 },
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
      className="dirt-road"
      style={{ left: "var(--path-x)" }}
    />
  );
}

/** Joins the two open dirt ends: the hero trail exits at --trail-x (centre-ish)
    while the DOM road sits at --path-x (left). This horizontal dirt band spans
    from the road to the trail so the path reads as continuous across the
    hero → fields seam. Keeps the road on the left — nothing is repositioned. */
export function DirtConnector() {
  return (
    <div aria-hidden className="relative" style={{ height: "calc(var(--wpx) * 16)" }}>
      <div
        className="absolute inset-y-0"
        style={{
          left: "var(--path-x)",
          // road-left → trail-right; +1 tile covers the trail band's own width.
          width:
            "calc(var(--trail-x, var(--path-x)) - var(--path-x) + var(--wpx) * 16)",
          backgroundImage: "url(/farm/tiles/dirt-path.png)",
          // match the road's texture scale (16×48 sheet at 3×) — a smaller
          // height here squished the patches and made them look stretched
          backgroundSize: "calc(var(--wpx) * 16) calc(var(--wpx) * 48)",
          backgroundRepeat: "repeat",
          imageRendering: "pixelated",
        }}
      />
    </div>
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
    <div aria-hidden className="relative flex justify-center gap-4 overflow-hidden py-2" style={{ maxHeight: 16 * 3 + 16 }}>
      {bushes.map((tile, i) => (
        <span key={i} style={{ transform: i % 2 ? "translateY(4px)" : undefined }}>
          <PixelSprite tile={tile} scale={3} />
        </span>
      ))}
      {/* the hedge is centred and doesn't reach the left path — the continuous
          road shows through this transparent band on its own (no overlay, which
          would sit out of phase with the road and read as a pale patch) */}
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
      <div className="band-grass-edge-b rotate-180" style={{ height: "calc(var(--wpx) * 16)" }} />
      <div className="band-water relative overflow-hidden" style={{ height: "calc(var(--wpx) * 24)" }}>
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
      <div className="band-grass-edge-t rotate-180" style={{ height: "calc(var(--wpx) * 16)" }} />
      {/* one bridge, on the dirt road so the path visibly crosses the water.
          Bridge is 1 tile (48px) = road width; reads the shared --path-x so it
          lines up with the road on every breakpoint. */}
      <span
        className="absolute top-1/2 -translate-y-1/2"
        style={{ left: "var(--path-x)" }}
      >
        <PixelSprite tile={T.bridge} scale={3} />
      </span>
    </div>
  );
}

/** The hero's yard meets the journey through a GATE. The grass flows straight
    through (no dirt band — same grass-a.png above and below), and a fence line
    marks the boundary with an opening on the left, exactly where the dirt path
    descends — so it reads as "the farmer came through the gate and headed down
    the path." Rails + gap all key off the shared --path-x, so the opening lines
    up with the road at every width. */
export function HeroBoundary() {
  return (
    <div aria-hidden className="relative" style={{ height: "calc(var(--wpx) * 16)" }}>
      {/* rail from the left edge up to the gate's left post */}
      <div
        className="band-fence absolute inset-y-0 left-0"
        style={{ width: "calc(var(--path-x) - var(--wpx) * 16)" }}
      />
      {/* rail from the gate's right post to the right edge */}
      <div
        className="band-fence absolute inset-y-0 right-0"
        style={{ left: "calc(var(--path-x) + var(--wpx) * 32)" }}
      />
      {/* the two gate posts flanking the 48px road opening */}
      <span className="absolute bottom-0" style={{ left: "calc(var(--path-x) - var(--wpx) * 16)" }}>
        <PixelSprite tile={T.fence.post} scale={3} />
      </span>
      <span className="absolute bottom-0" style={{ left: "calc(var(--path-x) + var(--wpx) * 16)" }}>
        <PixelSprite tile={T.fence.post} scale={3} />
      </span>
    </div>
  );
}

/** Divider: a band of ripe crop rows. */
export function CropRowsBand({ crop = "wheat" }: { crop?: "wheat" | "beet" }) {
  const tile = crop === "wheat" ? T.crop.wheat[3] : T.crop.beet[3];
  return (
    <div
      aria-hidden
      className="band-dirt relative"
      // clip the wheat's horizontal overflow, but let the corner stubs poke out
      // vertically so they sit ON the top/bottom border lines
      style={{ boxShadow: "inset 0 0 0 var(--px) var(--wood-shadow)", overflowX: "clip", overflowY: "visible" }}
    >
      <div className="flex justify-center gap-3 py-1">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className="shrink-0" style={{ transform: i % 3 === 1 ? "translateY(2px)" : undefined }}>
            <PixelSprite tile={tile} scale={3} />
          </span>
        ))}
      </div>
      {/* the path runs through the crop rows */}
      <PathThrough />
      {/* a wooden stub superimposed on each of the 4 corners of the opening —
          centred on the path's vertical edge AND straddling the top/bottom
          border line (−16px = half the 32px post on each axis), so it sits ON
          the end of the line, overlapping it, rather than tucked inside. */}
      {(["top", "bottom"] as const).map((edge) =>
        (
          [
            { key: "l", left: "calc(var(--path-x) - 16px)" },
            { key: "r", left: "calc(var(--path-x) + var(--wpx) * 16 - 16px)" },
          ] as const
        ).map(({ key, left }) => (
          <span
            key={`${edge}-${key}`}
            className="absolute"
            style={{ left, [edge]: "-16px", zIndex: 2 }}
          >
            <PixelSprite tile={T.fence.post} scale={2} />
          </span>
        ))
      )}
    </div>
  );
}

/** Divider: scattered wildflowers on the open grass. */
export function FlowerMeadow() {
  // no flower sits on the path corridor (left ~6% desktop / ~31% mobile) — the
  // continuous road shows through this transparent band cleanly, no flower blocks it
  const flowers = [
    { tile: T.biome.flowerYellow, left: "14%" },
    { tile: T.biome.flowerPink, left: "23%" },
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
      {/* transparent band: the continuous road shows through on its own — no
          overlay (which would sit out of phase with the road as a pale patch) */}
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
