"use client";

import { useState } from "react";
import { CUTSCENE, CAL_ATTRS } from "@/content/site";
import { PixelSprite } from "./pixel-sprite";
import { TypeLine } from "./type-line";

/* The opening cutscene — the farmer walks up and greets you, Stardew style.
   Docked at the bottom of the hero world. The navigation choices are REAL
   anchor links (keyboard + no-JS safe); only the in-dialog aside is a button.
   html { scroll-behavior: smooth } carries the "tour" feel. */

export function HeroDialog() {
  const [line, setLine] = useState<"greeting" | "aside">("greeting");
  const text = line === "greeting" ? CUTSCENE.greeting : CUTSCENE.aside;

  return (
    <div className="panel-wood pixel-corners w-full" style={{ maxWidth: 640 }}>
      <div className="panel-paper px-4 py-4 md:px-6 md:py-5">
        <div className="flex items-start gap-4">
          {/* the farmer, portrait-boxed */}
          <div
            className="hidden sm:block panel-paper pixel-corners p-2 shrink-0"
            style={{ boxShadow: "inset 0 0 0 2px var(--wood-mid)" }}
            aria-hidden
          >
            <PixelSprite tile={{ s: "character", x: 0.75, y: 0.75, w: 1.5, h: 1.75 }} scale={3} />
          </div>
          <div className="flex-1 min-w-0 flex flex-col">
            <p className="font-display text-ink-3 text-[11px] tracking-[0.14em] uppercase mb-1.5">
              the farmer
            </p>
            <div className="min-h-[72px] md:min-h-[76px] flex flex-col">
              <TypeLine key={line} text={text} />
            </div>
          </div>
        </div>

        {/* choices */}
        <div className="flex flex-wrap gap-2 mt-3 sm:pl-[72px]" role="group" aria-label="Where to next">
          <a href="#fields" className="pixel-btn" style={{ fontSize: "13px" }}>
            show me around
          </a>
          <a href="#quests" className="pixel-btn pixel-btn--wood" style={{ fontSize: "13px" }}>
            skip to the work
          </a>
          {line === "greeting" ? (
            <button
              type="button"
              onClick={() => setLine("aside")}
              className="pixel-chip"
              style={{ fontSize: "12px" }}
            >
              what IS this place?
            </button>
          ) : (
            <button {...CAL_ATTRS} className="pixel-chip" style={{ fontSize: "12px" }}>
              book a call, then
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
