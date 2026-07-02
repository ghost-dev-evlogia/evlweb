import { QUESTS, CAL_ATTRS, RND_LINE } from "@/content/site";
import { PixelSprite } from "./pixel-sprite";
import { T } from "@/farm/tiles.ts";

/* The quest board — a big wooden notice board with pinned paper quests.
   Shipped quests are the real, already-public client work; the open ones
   are the standing invitations (the hard stuff). Server component. */

const TILT = ["-1.2deg", "0.8deg", "-0.6deg", "1.4deg", "-1deg", "0.7deg", "-1.5deg"];

export function QuestBoard() {
  return (
    <div className="relative">
    <div className="panel-wood pixel-corners">
      <div
        className="px-4 py-6 md:px-8 md:py-8"
        style={{
          background: "var(--wood-soft)",
          boxShadow: "inset 0 0 0 var(--px) var(--wood-shadow), inset 0 calc(var(--px)*2) 0 var(--wood-pale)",
        }}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {QUESTS.map((q, i) => (
            <article
              key={q.id}
              className="relative panel-paper px-4 pt-5 pb-4 transition-transform duration-150 hover:scale-[1.02] hover:rotate-0"
              style={{
                rotate: TILT[i % TILT.length],
                boxShadow: "inset 0 0 0 2px var(--wood-mid), 3px 4px 0 rgba(53,55,56,0.25)",
              }}
            >
              {/* pin */}
              <span
                aria-hidden
                className="absolute -top-1.5 left-1/2 -translate-x-1/2"
                style={{
                  width: 8,
                  height: 8,
                  background: "var(--berry-deep)",
                  boxShadow: "inset -2px -2px 0 rgba(53,55,56,0.4)",
                }}
              />
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-display text-ink text-[15px] leading-snug">{q.title}</p>
                {q.status === "shipped" ? (
                  <span
                    className="font-display text-[11px] tracking-[0.12em] uppercase px-1.5 py-1 shrink-0"
                    style={{
                      color: "var(--paper)",
                      background: "var(--grass-deep)",
                      rotate: "6deg",
                      boxShadow: "inset 0 0 0 1px var(--ink-3)",
                    }}
                  >
                    shipped
                  </span>
                ) : (
                  <span
                    className="font-display text-[11px] tracking-[0.12em] uppercase px-1.5 py-1 shrink-0"
                    style={{
                      color: "var(--ink)",
                      background: "var(--harvest-pale)",
                      rotate: "-5deg",
                      boxShadow: "inset 0 0 0 1px var(--harvest-deep)",
                    }}
                  >
                    open quest
                  </span>
                )}
              </div>
              {q.client && (
                <p className="font-display text-ink-3 text-[11px] tracking-[0.14em] uppercase mb-1.5">
                  for {q.client}
                </p>
              )}
              <p className="font-sans text-ink-2 text-[14px] leading-relaxed mb-3">{q.desc}</p>
              <div
                className="flex items-center gap-1"
                aria-label={`Difficulty ${q.difficulty} out of 5`}
              >
                <span className="font-display text-ink-3 text-[11px] uppercase tracking-wide mr-1">
                  difficulty
                </span>
                {Array.from({ length: 5 }, (_, s) => (
                  <span key={s} aria-hidden style={{ opacity: s < q.difficulty ? 1 : 0.22 }}>
                    <PixelSprite tile={T.crop.wheatItem} scale={1} />
                  </span>
                ))}
              </div>
            </article>
          ))}

          {/* post-a-quest card — the conversion tie-in */}
          <article
            className="relative panel-paper px-4 pt-5 pb-4 flex flex-col items-center justify-center text-center gap-3"
            style={{
              rotate: "0.9deg",
              boxShadow: "inset 0 0 0 2px dashed var(--wood-mid), 3px 4px 0 rgba(53,55,56,0.25)",
              outline: "2px dashed var(--wood-mid)",
              outlineOffset: "-6px",
            }}
          >
            <p className="font-display text-ink text-[15px]">Your problem here</p>
            <p className="font-sans text-ink-2 text-[14px] leading-relaxed">
              The board has room. Difficult submissions get reviewed first.
            </p>
            <button {...CAL_ATTRS} className="pixel-btn" style={{ fontSize: "12px" }}>
              Post a quest
            </button>
          </article>
        </div>

        <p className="text-center font-sans text-[13px] leading-relaxed max-w-xl mx-auto mt-6" style={{ color: "var(--wood-paper)" }}>
          {RND_LINE}
        </p>
        <p className="text-center font-sans text-[12.5px] mt-3" style={{ color: "var(--wood-paper)" }}>
          Quests are accepted in order of difficulty. The easy ones go to the chickens.
        </p>
      </div>
    </div>
    {/* the board stands on real posts */}
    <div className="flex justify-between px-10 md:px-20 -mt-0.5" aria-hidden>
      <PixelSprite tile={T.fence.post} scale={4} />
      <PixelSprite tile={T.fence.post} scale={4} />
    </div>
    </div>
  );
}
