import { PixelSprite } from "@/components/farm/pixel-sprite";
import { T } from "@/farm/tiles.ts";

/* How we work — plant → grow → harvest.
   Whimsy in the sprites; the words stay exactly what we do. */

const steps = [
  {
    id: "01",
    title: "Scope & Define",
    verb: "Plant",
    sprites: [T.crop.wheatBag, T.crop.wheat[0]],
    desc: "We define what's being built before writing a line of code. What problem does it solve? What does done look like? Scope locked before line one.",
  },
  {
    id: "02",
    title: "Design & Build",
    verb: "Grow",
    sprites: [T.crop.wheat[1], T.crop.wheat[2]],
    desc: "Design and engineering run in parallel. You see progress weekly. Nothing gets lost between a Figma file and a pull request.",
  },
  {
    id: "03",
    title: "Ship & Hand Off",
    verb: "Harvest",
    sprites: [T.crop.wheat[3], T.crop.wheatItem],
    desc: "We deploy the system and hand it off clean. You keep the codebase, the IP, and full ownership.",
  },
];

export function HowWeWork() {
  return (
    <div>
      <div className="text-center mb-10">
        <p className="pixel-chip mb-4">How we work</p>
        <h2
          className="font-display text-ink leading-tight"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}
        >
          Most agencies pitch. We build.
        </h2>
        <p className="font-sans text-ink-2 text-[15px] leading-relaxed max-w-lg mx-auto mt-3">
          The reason most projects go sideways isn&apos;t bad engineering.
          It&apos;s that nobody agreed on what done looks like before anyone
          touched the keyboard. We spend real time on that upfront.
        </p>
      </div>

      <ol className="grid md:grid-cols-3 gap-4 md:gap-5">
        {steps.map(({ id, title, verb, sprites, desc }) => (
          <li key={id} className="panel-wood pixel-corners h-full">
            <div className="panel-paper px-5 py-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="pixel-chip">{verb}</span>
                <span className="font-display text-ink-4 text-sm">{id}</span>
              </div>
              <div className="flex items-end gap-3 h-14 mb-4" aria-hidden>
                {sprites.map((s, i) => (
                  <PixelSprite key={i} tile={s} scale={3} />
                ))}
              </div>
              <h3 className="font-display text-ink text-lg mb-2">{title}</h3>
              <p className="font-sans text-ink-2 text-sm leading-relaxed">{desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
