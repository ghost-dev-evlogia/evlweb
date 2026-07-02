"use client";

import { useState } from "react";
import Image from "next/image";
import { TESTIMONIALS } from "@/content/site";

/* Word around the valley — real client quotes, delivered by villagers.
   Four palette-recolored NPCs stand on the grass; the active one speaks its
   client's words in a big bubble. Click a villager (or their name) to hear
   theirs. The quotes are verbatim; only the messengers are pixelated. */

export function NpcQuotes() {
  const [active, setActive] = useState(0);
  const [pop, setPop] = useState(0);
  const t = TESTIMONIALS[active];

  const select = (i: number) => {
    if (i === active) return;
    setActive(i);
    setPop((p) => p + 1);
  };

  return (
    <div>
      {/* the speech bubble */}
      <div key={pop} className="panel-wood pixel-corners max-w-2xl mx-auto" style={{ animation: "bubble-pop 0.25s var(--ease-snap)" }}>
        <div className="panel-paper px-6 py-6 md:px-8 md:py-7 relative">
          <p className="font-sans text-ink text-[15px] md:text-base leading-relaxed">
            &ldquo;{t.quote}&rdquo;
          </p>
          <div className="flex items-center gap-2.5 mt-4">
            <span
              className="relative w-8 h-8 overflow-hidden shrink-0"
              style={{ boxShadow: "inset 0 0 0 2px var(--wood-mid)", padding: 2, background: "var(--wood-paper)" }}
            >
              <Image
                src={t.avatar}
                alt=""
                width={64}
                height={64}
                sizes="32px"
                className="w-full h-full object-cover"
                style={{ objectPosition: t.avatarPosition ?? "center" }}
              />
            </span>
            <p className="font-display text-ink-2 text-xs tracking-wide uppercase">
              {t.author} · {t.role}
            </p>
          </div>
          {/* bubble tail */}
          <span
            aria-hidden
            className="absolute -bottom-2 left-1/2 -translate-x-1/2"
            style={{
              width: 16,
              height: 8,
              background: "var(--wood-paper)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />
        </div>
      </div>

      {/* the villagers */}
      <div
        className="flex justify-center items-end gap-6 md:gap-10 mt-6"
        role="group"
        aria-label="Choose who speaks"
      >
        {TESTIMONIALS.map((tm, i) => (
          <button
            key={tm.id}
            type="button"
            onClick={() => select(i)}
            aria-pressed={i === active}
            aria-label={`Hear from ${tm.author}, ${tm.role}`}
            className="group flex flex-col items-center gap-1 focus:outline-none"
          >
            <img
              src={tm.npc}
              alt=""
              className={`select-none transition-transform duration-150 ${
                i === active ? "sprite-bob" : "group-hover:-translate-y-[3px]"
              }`}
              style={{
                width: 48 * (i === active ? 2.4 : 2),
                imageRendering: "pixelated",
                filter: i === active ? "none" : "saturate(0.75)",
              }}
            />
            <span
              className="pixel-chip group-focus-visible:outline-2 group-focus-visible:outline-ink"
              style={{
                fontSize: "10px",
                ...(i === active
                  ? { background: "var(--harvest-pale)", boxShadow: "inset 0 0 0 2px var(--harvest-deep)" }
                  : {}),
              }}
            >
              {tm.author.split(" ")[0]}
            </span>
          </button>
        ))}
      </div>

      <p className="text-center font-sans text-ink-3 text-[11px] mt-5">
        Real quotes from real humans. The animals declined to comment.
      </p>
    </div>
  );
}
