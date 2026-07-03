import { SERVICES, CROP_STAGES } from "@/content/site";
import { PixelSprite } from "./pixel-sprite";
import { CropGrowth } from "./crop-growth";
import { RevealPanel } from "./reveal";
import { T } from "@/farm/tiles.ts";

/* The fields — one continuous farm you walk down. Each service is a real
   tilled crop row: the sign plank names it, the crops grow through their
   stages as the row enters the viewport, and the farmer walks the road
   beside you as you scroll. Server component (the walker is the only
   client bit). */

function FieldSign({
  title,
  desc,
  meta,
}: {
  title: string;
  desc: string;
  meta: string;
}) {
  return (
    <div className="relative">
      <div className="panel-wood pixel-corners">
        <div className="panel-paper px-5 py-4 md:px-6 md:py-5">
          <h3 className="font-display text-ink text-xl md:text-2xl leading-snug mb-2">{title}</h3>
          <p className="font-sans text-ink-2 text-[15px] md:text-base leading-relaxed">{desc}</p>
          <p
            className="font-display text-ink-3 text-xs tracking-wide mt-3 pt-2.5"
            style={{ borderTop: "2px solid var(--wood-pale)" }}
          >
            {meta}
          </p>
        </div>
      </div>
      {/* post legs into the grass */}
      <div className="flex justify-between px-8 md:px-12 -mt-0.5" aria-hidden>
        <PixelSprite tile={T.fence.post} scale={3} />
        <PixelSprite tile={T.fence.post} scale={3} />
      </div>
    </div>
  );
}

/** One tilled row of growing crops (decorated so no two rows read the same). */
function CropRow({ crop, seed }: { crop: keyof typeof CROP_STAGES; seed: number }) {
  const stages = CROP_STAGES[crop];
  const scales = [3, 4, 3, 4, 3, 4, 3];
  const count = 7;
  return (
    <div
      className="band-dirt pixel-corners relative flex items-end justify-around gap-1 px-3 md:px-5 pt-7 md:pt-9 pb-2.5 overflow-hidden"
      style={{ boxShadow: "inset 0 0 0 var(--px) var(--wood-shadow)" }}
    >
      {Array.from({ length: count }, (_, i) => (
        <CropGrowth
          key={i}
          stages={stages}
          scale={scales[(i + seed) % scales.length]}
          className={i > 4 ? "hidden md:inline-block" : ""}
        />
      ))}
    </div>
  );
}

export function FieldRows() {
  return (
    <div className="relative max-w-5xl mx-auto px-6 mt-10 md:mt-14 pb-16 md:pb-24">
      <div className="flex flex-col gap-10 md:gap-14">
        {SERVICES.map((s, i) => (
          <RevealPanel key={s.id} delay={i * 40}>
            <article id={s.id} className="scroll-mt-28 grid md:grid-cols-12 gap-4 md:gap-6 items-end">
              <div className={`min-w-0 md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}>
                <FieldSign title={s.title} desc={s.desc} meta={s.meta} />
              </div>
              <div className={`min-w-0 md:col-span-7 ${i % 2 ? "md:order-1" : ""}`}>
                <CropRow crop={s.crop} seed={i} />
              </div>
            </article>
          </RevealPanel>
        ))}
      </div>
    </div>
  );
}
