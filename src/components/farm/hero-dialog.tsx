"use client";

import { useEffect, useRef, useState } from "react";
import { CUTSCENE, CAL_ATTRS } from "@/content/site";
import { PixelSprite } from "./pixel-sprite";
import { TypeLine } from "./type-line";

/* The farmer stands at the gate with a bouncing "!" — click them and the
   visitor card pops up, Stardew style (no permanent box over the farm).
   The navigation choices inside are REAL anchor links; Esc or the ×
   closes and focus returns to the farmer. An sr-only copy of the greeting
   and links is always in the DOM for no-JS readers and crawlers. */

export function HeroDialog() {
  const [open, setOpen] = useState(false);
  const [line, setLine] = useState<"greeting" | "aside">("greeting");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(e.target as Node) &&
        !toggleRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const text = line === "greeting" ? CUTSCENE.greeting : CUTSCENE.aside;

  return (
    <div className="relative flex flex-col items-center">
      {/* the visitor card, popped above the farmer. Positioning lives on a
          plain wrapper: panel-wood is unlayered CSS with its own `position`
          and would beat the `absolute` utility (Tailwind v4). */}
      {open && (
        <div
          className="absolute left-1/2 -translate-x-1/2 w-[min(92vw,600px)] z-30"
          style={{ bottom: "calc(100% + 10px)" }}
        >
        <div
          ref={cardRef}
          id="visitor-card"
          role="dialog"
          aria-label="A word from the farmer"
          className="panel-wood pixel-corners"
          style={{ animation: "bubble-pop 0.22s var(--ease-snap)" }}
        >
          <div className="panel-paper px-4 py-4 md:px-6 md:py-5">
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-ink-3 text-[12px] tracking-[0.14em] uppercase">
                the farmer
              </p>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label="Close"
                className="font-display text-ink-3 hover:text-ink text-base leading-none -mt-1"
              >
                ×
              </button>
            </div>
            <div className="min-h-[64px] flex flex-col mt-1">
              <TypeLine key={line} text={text} />
            </div>
            <div className="flex flex-wrap gap-2 mt-3" role="group" aria-label="Where to next">
              <a href="#fields" className="pixel-btn" style={{ fontSize: "13px" }}>
                show me around
              </a>
              <a href="#quests" className="pixel-btn pixel-btn--wood" style={{ fontSize: "13px" }}>
                skip to the work
              </a>
              {line === "greeting" ? (
                /* distinct keys: React must REMOUNT here, not mutate — otherwise
                   the same click lands on a data-cal-link node and Cal's document
                   listener opens the modal over the answer */
                <button
                  key="aside"
                  type="button"
                  onClick={() => setLine("aside")}
                  className="pixel-chip"
                  style={{ fontSize: "12px" }}
                >
                  what IS this place?
                </button>
              ) : (
                <button key="cal" {...CAL_ATTRS} className="pixel-chip" style={{ fontSize: "12px" }}>
                  book a call, then
                </button>
              )}
            </div>
          </div>
        </div>
        </div>
      )}

      {/* the farmer at the gate */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="visitor-card"
        className="group flex flex-col items-center focus:outline-none"
      >
        {/* visibility (not unmount): the badge must keep its layout space or
            the whole column shifts every time the card opens */}
        <span
          className="farmer-alert font-display"
          style={{ visibility: open ? "hidden" : "visible" }}
          aria-hidden
        >
          !
        </span>
        {/* the farmer himself, standing on the grass — no frame, no box */}
        <span
          className="transition-transform duration-150 group-hover:-translate-y-1 group-focus-visible:-translate-y-1"
          style={{ filter: "drop-shadow(0 3px 0 rgba(53,55,56,0.25))" }}
          aria-hidden
        >
          <PixelSprite tile={{ s: "character", x: 0.8, y: 0.55, w: 1.4, h: 2.15 }} scale={3} />
        </span>
        <span
          className="pixel-chip mt-1.5 group-focus-visible:outline-2 group-focus-visible:outline-ink"
          style={{ fontSize: "12px" }}
        >
          talk to the farmer
        </span>
      </button>

      {/* the whole conversation, always in the DOM for no-JS and crawlers */}
      <div className="sr-only">
        <p>{CUTSCENE.greeting}</p>
        <p>{CUTSCENE.aside}</p>
        <a href="#fields">Take the tour of the farm</a>
        <a href="#quests">Skip to the work</a>
      </div>
    </div>
  );
}
