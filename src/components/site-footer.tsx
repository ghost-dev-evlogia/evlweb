import Link from "next/link";
import { PixelSprite } from "@/components/farm/pixel-sprite";
import { T } from "@/farm/tiles.ts";

/* Night has fallen. The footer is the farm after dark: silhouetted grass,
   fireflies, and the fine print where the jokes live. */

const LEGAL = [
  { label: "Careers", href: "/careers" },
  { label: "Terms", href: "/terms" },
  { label: "Privacy", href: "/privacy" },
];

const FIREFLIES = [
  { left: "12%", top: "30%", delay: 0 },
  { left: "28%", top: "55%", delay: 1.4 },
  { left: "47%", top: "38%", delay: 2.6 },
  { left: "63%", top: "60%", delay: 0.8 },
  { left: "78%", top: "34%", delay: 3.2 },
  { left: "90%", top: "52%", delay: 1.9 },
] as const;

export function SiteFooter() {
  return (
    <footer className="relative z-10">
      {/* the farm asleep — a seamless continuation of the terrain: the SAME
          grass tile and road, picking the dusk tint up exactly where the
          terrain's day-tint leaves off (rgba(45,42,60,.38)) and deepening to
          night. The tint sits BELOW the sleepers, so — like the terrain's own
          props — the animals keep their colour and just rest. */}
      <div
        className="relative overflow-hidden"
        aria-hidden
        style={{ height: "calc(var(--wpx) * 36)" }}
      >
        {/* grass — identical tile & size to .terrain::before, so no seam */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url(/farm/tiles/grass-a.png)",
            backgroundSize: "calc(var(--wpx) * 16) calc(var(--wpx) * 16)",
            imageRendering: "pixelated",
          }}
        />
        {/* the road runs on, unbroken — same tile & left as the terrain road */}
        <div
          className="hidden md:block absolute top-0 bottom-0"
          style={{
            left: "clamp(24px, 6vw, 110px)",
            width: "calc(var(--wpx) * 16)",
            backgroundImage: "url(/farm/tiles/dirt.png)",
            backgroundSize: "calc(var(--wpx) * 16) calc(var(--wpx) * 16)",
            backgroundRepeat: "repeat-y",
            imageRendering: "pixelated",
          }}
        />
        {/* dusk → night, continuing the terrain's own tint. Below the sleepers. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(45,42,60,0.38) 0%, rgba(53,55,56,0.80) 60%, var(--night) 100%)",
          }}
        />
        {/* sleepers — full colour, bedded down; a slow breathing bob keeps them alive */}
        <span className="sleep-breathe absolute" style={{ left: "16%", bottom: 6 }}>
          <PixelSprite tile={T.cow.idle[0]} scale={3} />
        </span>
        <span className="sleep-breathe sleep-breathe--slow absolute" style={{ left: "30%", bottom: 10 }}>
          <PixelSprite tile={T.chicken.idle[0]} scale={3} />
        </span>
        <span className="sleep-breathe absolute hidden md:block" style={{ left: "72%", bottom: 8 }}>
          <PixelSprite tile={T.chicken.idle[0]} scale={3} />
        </span>
        <span className="absolute hidden md:block" style={{ right: "8%", bottom: 2 }}>
          <PixelSprite tile={T.biome.treeBig} scale={3} />
        </span>
        {/* the zzz's drift up and fade */}
        <span className="zzz-float absolute font-display text-[13px]" style={{ left: "19%", bottom: 70, color: "var(--wood-paper)" }}>
          z z z
        </span>
        <span className="zzz-float absolute font-display text-[11px]" style={{ left: "32%", bottom: 62, color: "var(--wood-paper)", animationDelay: "1.4s" }}>
          z z
        </span>
      </div>

      <div className="relative" style={{ background: "var(--night)" }}>
        {/* fireflies over the dark field */}
        <div aria-hidden className="absolute inset-x-0 -top-14 h-24 pointer-events-none">
          {FIREFLIES.map((f, i) => (
            <span key={i} className="firefly" style={{ left: f.left, top: f.top, animationDelay: `${f.delay}s` }} />
          ))}
        </div>

        <div className="max-w-5xl mx-auto px-6 pt-10 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="flex items-center gap-2 font-display text-lg justify-center md:justify-start" style={{ color: "var(--paper)" }}>
                <PixelSprite tile={T.chicken.idle[0]} scale={2} className="translate-y-[-2px]" />
                EVLOGIA
              </p>
              <p className="font-sans text-sm leading-relaxed max-w-xs mt-3" style={{ color: "var(--ink-5)" }}>
                A lean engineering team that builds hard things for fun. The
                farm is closed for the night; the inbox never is.
              </p>
              <a
                href="mailto:hello@evlogia.ai"
                className="inline-block font-display text-sm mt-3 underline decoration-2 underline-offset-4"
                style={{ color: "var(--paper)", textDecorationColor: "var(--harvest)" }}
              >
                hello@evlogia.ai
              </a>
            </div>

            <div className="flex flex-col items-center md:items-end gap-3">
              <div className="flex gap-4">
                {LEGAL.map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="font-sans text-sm hover:underline"
                    style={{ color: "var(--ink-5)" }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href="https://x.com/evlogia"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Evlogia on X"
                  className="font-display text-sm hover:underline"
                  style={{ color: "var(--ink-5)" }}
                >
                  X / Twitter
                </a>
                <a
                  href="https://linkedin.com/company/evlogia"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Evlogia on LinkedIn"
                  className="font-display text-sm hover:underline"
                  style={{ color: "var(--ink-5)" }}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2" style={{ borderTop: "2px solid var(--ink-2)" }}>
            <p className="font-sans text-xs" style={{ color: "var(--ink-4)" }}>
              © 2026 Evlogia Labs Private Limited · the chickens are unionized
            </p>
            <p className="font-sans text-xs flex items-center gap-1.5" style={{ color: "var(--ink-4)" }}>
              <PixelSprite tile={T.crop.wheatItem} scale={1} />
              World art:{" "}
              <a
                href="https://cupnooble.itch.io/sprout-lands-asset-pack"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                Sprout Lands
              </a>{" "}
              by Cup Nooble
            </p>
          </div>
          <p className="font-sans text-[12px] mt-3 text-center sm:text-left" style={{ color: "var(--ink-3)" }}>
            psst: try typing &ldquo;harvest&rdquo;.
          </p>
        </div>
      </div>
    </footer>
  );
}
