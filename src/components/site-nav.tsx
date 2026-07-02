"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PixelSprite } from "@/components/farm/pixel-sprite";
import { T } from "@/farm/tiles.ts";

const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: "var(--wood-paper)",
        boxShadow: "0 var(--px) 0 var(--wood-mid), 0 calc(var(--px) * 2) 0 rgba(117, 76, 96, 0.25)",
      }}
    >
      <nav aria-label="Main" className="max-w-6xl mx-auto flex items-center gap-6 px-4 md:px-6 h-14">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-ink text-lg tracking-wide"
          aria-label="Evlogia — home"
        >
          <PixelSprite tile={T.chicken.idle[0]} scale={2} className="translate-y-[-2px]" />
          EVLOGIA
        </Link>

        <div className="hidden md:flex items-center gap-5 ml-auto">
          {LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="nav-link font-display text-[13px] tracking-[0.08em] uppercase text-ink-2 hover:text-ink"
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <button
            data-cal-link="ethankd/strategy"
            data-cal-namespace="strategy"
            data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
            className="pixel-btn"
            style={{ fontSize: "12px", padding: "calc(var(--px)*2.5) calc(var(--px)*4) calc(var(--px)*3.5)" }}
          >
            Book a call
          </button>
        </div>

        {/* mobile toggle */}
        <button
          type="button"
          className="md:hidden ml-auto font-display text-ink text-sm px-2 py-1"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕ CLOSE" : "☰ MENU"}
        </button>
      </nav>

      {/* mobile sheet */}
      {open && (
        <div
          className="md:hidden px-6 pb-5 pt-2 flex flex-col gap-4"
          style={{ background: "var(--wood-paper)", boxShadow: "0 var(--px) 0 var(--wood-mid)" }}
        >
          {LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="font-display text-[15px] tracking-[0.08em] uppercase text-ink-2"
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
          <button
            data-cal-link="ethankd/strategy"
            data-cal-namespace="strategy"
            data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
            className="pixel-btn self-start"
            style={{ fontSize: "13px" }}
          >
            Book a call
          </button>
        </div>
      )}
    </header>
  );
}
