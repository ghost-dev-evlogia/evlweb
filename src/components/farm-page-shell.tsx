import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { Critters } from "@/components/farm/critters";
import { TreeLine } from "@/components/farm/props";
import { PixelSprite } from "@/components/farm/pixel-sprite";
import { T } from "@/farm/tiles.ts";

/* Every page is on the farm — including the fine print. Sky above the
   horizon, title in the air, content on a wooden panel standing on the
   grass, one chicken on duty, night footer below. */

export function FarmPageShell({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <>
      {/* a calm morning sky behind everything */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #9bd4c3 0%, #d6f1cd 100%)" }}
      />

      <header
        className="fixed top-0 inset-x-0 z-50"
        style={{ background: "var(--wood-paper)", boxShadow: "0 var(--px) 0 var(--wood-mid)" }}
      >
        <div className="max-w-5xl mx-auto px-6 h-12 flex items-center">
          <Link href="/" className="font-display text-ink text-sm flex items-center gap-2">
            <PixelSprite tile={T.chicken.idle[0]} scale={1} />
            ← back to the farm
          </Link>
        </div>
      </header>

      <main className="relative z-10 overflow-x-clip">
        {/* the title lives in the sky */}
        <div className="pt-28 md:pt-32 pb-10 md:pb-12 text-center px-6">
          <p className="pixel-chip mb-4">{eyebrow}</p>
          <h1
            className="font-display text-ink leading-[1.07] hero-title"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", textWrap: "balance" }}
          >
            {title}
          </h1>
          {updated && (
            <p className="font-sans text-ink-2 text-[12.5px] tracking-wide mt-3">{updated}</p>
          )}
        </div>

        {/* horizon, then land (variant 0 keeps the center clear of the title) */}
        <TreeLine variant={0} />
        <div className="band-grass-edge-t" style={{ height: "calc(var(--px) * 16)" }} aria-hidden />
        <div className="band-grass relative">
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
            <div className="relative">
              <div className="panel-wood pixel-corners">
                <div className="panel-paper px-6 py-8 md:px-10 md:py-10">{children}</div>
              </div>
              {/* the panel stands on posts */}
              <div className="flex justify-between px-10 md:px-16 -mt-0.5" aria-hidden>
                <PixelSprite tile={T.fence.post} scale={3} />
                <PixelSprite tile={T.fence.post} scale={3} />
              </div>
            </div>
          </div>
          {/* someone's always working */}
          <div className="relative" style={{ minHeight: 90 }}>
            <Critters kinds="chicken" />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
