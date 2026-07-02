import Link from "next/link";
import { PixelSprite } from "@/components/farm/pixel-sprite";
import { T } from "@/farm/tiles.ts";

const NAV = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LEGAL = [
  { label: "Careers", href: "/careers" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export function SiteFooter() {
  return (
    <footer style={{ background: "var(--wood-paper)" }}>
      {/* grass lip on top of the footer, like the edge of a field */}
      <div
        aria-hidden
        style={{
          height: "calc(var(--px) * 3)",
          background: "var(--grass-soft)",
          boxShadow: "0 var(--px) 0 var(--grass-deep)",
        }}
      />
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-8">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2 font-display text-ink text-xl">
              <PixelSprite tile={T.chicken.idle[0]} scale={2} className="translate-y-[-2px]" />
              EVLOGIA
            </Link>
            <p className="font-sans text-ink-2 text-sm leading-relaxed max-w-xs mt-4">
              A product and engineering team. We scope, design, build, and ship
              production systems — then hand you the keys.
            </p>
            <a
              href="mailto:hello@evlogia.ai"
              className="inline-block font-display text-ink text-sm mt-4 underline decoration-[var(--harvest)] decoration-2 underline-offset-4 hover:decoration-[var(--ink)]"
            >
              hello@evlogia.ai
            </a>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="pixel-chip mb-4">Explore</p>
            <ul className="flex flex-col gap-2.5">
              {NAV.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="font-sans text-ink-2 text-sm hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal + social */}
          <div className="md:col-span-4">
            <p className="pixel-chip mb-4">The fine print</p>
            <ul className="flex flex-col gap-2.5">
              {LEGAL.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="font-sans text-ink-2 text-sm hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-4 mt-5">
              <a
                href="https://x.com/evlogia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evlogia on X"
                className="font-display text-ink-2 text-sm hover:text-ink"
              >
                X / Twitter
              </a>
              <a
                href="https://linkedin.com/company/evlogia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Evlogia on LinkedIn"
                className="font-display text-ink-2 text-sm hover:text-ink"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="pixel-divider mt-10 mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-ink-3 text-xs">
            © 2026 Evlogia Labs Private Limited
          </p>
          <p className="font-sans text-ink-3 text-xs flex items-center gap-1.5">
            <PixelSprite tile={T.crop.wheatItem} scale={1} />
            World art:{" "}
            <a
              href="https://cupnooble.itch.io/sprout-lands-asset-pack"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-ink"
            >
              Sprout Lands
            </a>{" "}
            by Cup Nooble
          </p>
        </div>
      </div>
    </footer>
  );
}
