"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { LiquidGlassCard } from "@/components/liquid-glass";
import { LiquidButton } from "@/components/ui/button";

export function SiteNav() {
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", "strategy", { origin: "https://app.cal.com" });

      Cal.ns.strategy("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light"
      });
    `;
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <motion.header
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
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
          <a href="/" onClick={handleLogoClick} className="shrink-0 overflow-hidden relative block" style={{ width: "120px", height: "26px" }}>
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
              { label: "Services", href: "/#services" },
              { label: "Research", href: "/#research" },
              { label: "About", href: "/#about" },
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

          {/* CTA — opens Cal.com popup */}
          <LiquidButton
            data-cal-link="ethankd/strategy"
            data-cal-namespace="strategy"
            data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
            size="sm"
          >
            Work With Us
          </LiquidButton>
        </nav>
      </LiquidGlassCard>
    </motion.header>
  );
}
