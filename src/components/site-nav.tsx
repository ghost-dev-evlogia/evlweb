import { LiquidGlassCard } from "@/components/liquid-glass";

export function SiteNav() {
  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <LiquidGlassCard
        glowIntensity="none"
        shadowIntensity="none"
        borderRadius="100px"
        blurIntensity="sm"
        draggable={false}
        className="p-0 w-full"
      >
        <nav
          className="liquid-glass rounded-full relative z-40 px-5 py-2.5 flex items-center justify-between gap-6"
        >
          {/* Logo */}
          <a href="/" className="shrink-0 overflow-hidden relative block" style={{ width: "120px", height: "26px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/evlogia-combination-mark.png"
              alt="Evlogia"
              style={{
                position: "absolute",
                width: "130px",
                height: "130px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                filter: "invert(1)",
                opacity: 0.85,
              }}
            />
          </a>

          {/* Links */}
          <div className="hidden md:flex items-center gap-7">
            {[
              { label: "About", href: "/#about" },
              { label: "Services", href: "/#services" },
              { label: "Research", href: "/#research" },
              { label: "Book a Call", href: "/#book" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="nav-link text-black/45 text-xs font-sans hover:text-black transition-colors duration-200 tracking-wide"
              >
                {label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/#book"
            className="liquid-glass rounded-full px-4 py-1.5 text-xs font-sans font-medium text-black/80 hover:bg-black/5 transition-all duration-200 whitespace-nowrap shrink-0"
          >
            Work With Us
          </a>
        </nav>
      </LiquidGlassCard>
    </header>
  );
}
