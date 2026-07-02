import { TILE, SHEET_DIMS, type TileRef } from "@/farm/tiles.ts";

/* Renders a single Sprout Lands tile (or multi-tile sprite) in the DOM via
   background-crop — crisp at integer scales, zero canvas required.
   Server-component friendly. */
export function PixelSprite({
  tile,
  scale = 3,
  className,
  label,
}: {
  tile: TileRef;
  scale?: number;
  className?: string;
  /** accessible name; omit for decorative sprites (aria-hidden) */
  label?: string;
}) {
  const [sw, sh] = SHEET_DIMS[tile.s] ?? [0, 0];
  const w = (tile.w ?? 1) * TILE * scale;
  const h = (tile.h ?? 1) * TILE * scale;
  return (
    <span
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{
        display: "inline-block",
        width: w,
        height: h,
        backgroundImage: `url(/farm/sprites/${tile.s}.png)`,
        backgroundPosition: `${-tile.x * TILE * scale}px ${-tile.y * TILE * scale}px`,
        backgroundSize: `${sw * scale}px ${sh * scale}px`,
        backgroundRepeat: "no-repeat",
        imageRendering: "pixelated",
      }}
    />
  );
}
