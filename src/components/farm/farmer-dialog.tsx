"use client";

import { useEffect, useRef, useState } from "react";
import { FAQ } from "@/content/site";
import { PixelSprite } from "./pixel-sprite";
import { T } from "@/farm/tiles.ts";

/* Ask the farmer — the FAQ as a game dialog. Pick a question chip, the
   farmer answers with a typewriter effect (click the text to skip; instant
   under reduced-motion). SSR renders the full answer, so no-JS readers and
   crawlers always get the words. */

function TypeLine({ text }: { text: string }) {
  // SSR/first paint: full text (crawlers + no-JS read everything)
  const [n, setN] = useState(text.length);
  const timer = useRef<number | null>(null);
  const done = n >= text.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // restart from zero on mount, asynchronously (no sync setState in effect)
    timer.current = window.setTimeout(() => {
      setN(0);
      timer.current = window.setInterval(() => {
        setN((v) => {
          if (v + 2 >= text.length && timer.current) window.clearInterval(timer.current);
          return Math.min(text.length, v + 2);
        });
      }, 18) as unknown as number;
    }, 10) as unknown as number;
    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
        window.clearInterval(timer.current);
      }
    };
  }, [text]);

  const skip = () => {
    if (timer.current) window.clearInterval(timer.current);
    setN(text.length);
  };

  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        onClick={skip}
        className="font-sans text-ink text-[15px] leading-relaxed flex-1"
      >
        {text.slice(0, n)}
        {!done && <span className="dialog-caret">▌</span>}
      </p>
      <p
        className="font-display text-ink-4 text-[10px] self-end mt-3"
        style={{ visibility: done ? "visible" : "hidden" }}
        aria-hidden
      >
        ▼ pick another question
      </p>
    </>
  );
}

export function FarmerDialog() {
  const [qi, setQi] = useState(0);

  return (
    <div>
      <div className="grid md:grid-cols-12 gap-4 items-start">
        {/* the farmer */}
        <div className="md:col-span-3 flex md:flex-col items-center gap-3">
          <div
            className="panel-paper pixel-corners p-3"
            style={{ boxShadow: "inset 0 0 0 2px var(--wood-mid)" }}
            aria-hidden
          >
            <PixelSprite tile={{ s: "character", x: 0.75, y: 0.75, w: 1.5, h: 1.75 }} scale={4} />
          </div>
          <p className="font-display text-xs text-center" style={{ color: "var(--wood-paper)" }}>
            the farmer
            <br />
            <span style={{ color: "var(--wood-soft)" }}>(knows things)</span>
          </p>
        </div>

        {/* the dialog box */}
        <div className="md:col-span-9">
          <div className="panel-wood pixel-corners">
            <div className="panel-paper px-5 py-5 md:px-7 md:py-6 min-h-[190px] flex flex-col">
              <p className="font-display text-ink-3 text-[11px] tracking-[0.14em] uppercase mb-2">
                {FAQ[qi].q}
              </p>
              <TypeLine key={qi} text={FAQ[qi].a} />
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
