"use client";

import { useState } from "react";
import { FAQ } from "@/content/site";
import { PixelSprite } from "./pixel-sprite";
import { T } from "@/farm/tiles.ts";
import { TypeLine } from "./type-line";

/* Ask the farmer — the FAQ as a game dialog. Pick a question chip, the
   farmer answers with a typewriter effect (click the text to skip; instant
   under reduced-motion). SSR renders the full answer, so no-JS readers and
   crawlers always get the words. */

export function FarmerDialog() {
  const [qi, setQi] = useState(0);

  return (
    <div>
      <div className="grid md:grid-cols-12 gap-4 items-start">
        {/* the farmer — no box, just him, dancing */}
        <div className="md:col-span-3 flex md:flex-col items-center gap-3">
          <span
            className="farmer-dance"
            style={{ filter: "drop-shadow(0 3px 0 rgba(53,55,56,0.22))" }}
            aria-hidden
          >
            <PixelSprite tile={{ s: "character", x: 0.75, y: 0.75, w: 1.5, h: 1.75 }} scale={4} />
          </span>
          <p
            className="font-display text-xs text-center"
            style={{ color: "var(--wood-paper)", textShadow: "0 1px 2px rgba(53,55,56,0.6)" }}
          >
            the farmer
            <br />
            <span style={{ opacity: 0.82 }}>(knows things)</span>
          </p>
        </div>

        {/* the dialog box */}
        <div className="md:col-span-9">
          <div className="panel-wood pixel-corners">
            <div className="panel-paper px-5 py-5 md:px-7 md:py-6 min-h-[190px] flex flex-col">
              <p className="font-display text-ink-3 text-[12px] tracking-[0.14em] uppercase mb-2">
                {FAQ[qi].q}
              </p>
              <TypeLine key={qi} text={FAQ[qi].a} hint="▼ pick another question" />
            </div>
          </div>

          {/* every Q&A, always in the DOM — screen readers and no-JS get the
              whole conversation even though the dialog shows one at a time */}
          <div className="sr-only">
            {FAQ.map((f) => (
              <p key={f.q}>
                {f.q} {f.a}
              </p>
            ))}
          </div>

          {/* question chips */}
          <div className="flex flex-wrap gap-2 mt-4" role="group" aria-label="Questions for the farmer">
            {FAQ.map((f, i) => (
              <button
                key={f.q}
                type="button"
                onClick={() => setQi(i)}
                aria-pressed={i === qi}
                className="pixel-chip transition-transform duration-150 hover:-translate-y-[2px]"
                style={{
                  fontSize: "11px",
                  ...(i === qi
                    ? { background: "var(--harvest-pale)", boxShadow: "inset 0 0 0 2px var(--harvest-deep)" }
                    : {}),
                }}
              >
                {f.q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
