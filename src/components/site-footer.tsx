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
      {/* the farm asleep — the land simply darkens into night; animals are
          bedded down, fireflies out. No transition strips. */}
      <div className="relative" aria-hidden>
        <div className="band-grass" style={{ filter: "brightness(0.5) saturate(0.8)" }}>
          <div style={{ height: "calc(var(--wpx) * 30)" }} />
        </div>
        {/* sleepers (dimmed to match the hour) */}
        <div className="absolute inset-0 overflow-hidden" style={{ filter: "brightness(0.62) saturate(0.85)" }}>
          {/* the road walks all the way to the night's edge */}
          <div className="dirt-road hidden md:block" style={{ left: "clamp(24px, 6vw, 110px)" }} />
          <span className="absolute" style={{ left: "16%", bottom: 8 }}>
            <PixelSprite tile={T.cow.idle[0]} scale={3} />
          </span>
          <span className="absolute" style={{ left: "30%", bottom: 12 }}>
            <PixelSprite tile={T.chicken.idle[0]} scale={3} />
          </span>
          <span className="absolute hidden md:block" style={{ left: "72%", bottom: 10 }}>
            <PixelSprite tile={T.chicken.idle[0]} scale={3} />
          </span>
          <span className="absolute hidden md:block" style={{ right: "8%", bottom: 6 }}>
            <PixelSprite tile={T.biome.treeBig} scale={3} />
          </span>
        </div>
        {/* the zzz's read at full brightness */}
        <span className="absolute font-display text-[13px]" style={{ left: "19%", bottom: 64, color: "var(--wood-paper)", opacity: 0.75 }}>
          z z z
        </span>
        <span className="absolute font-display text-[11px]" style={{ left: "32%", bottom: 56, color: "var(--wood-paper)", opacity: 0.6 }}>
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
          <p className="font-sans text-[11px] mt-3 text-center sm:text-left" style={{ color: "var(--ink-3)" }}>
            psst: try typing &ldquo;harvest&rdquo;.
          </p>
        </div>
      </div>
    </footer>
  );
}
