"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { LiquidGlassCard } from "@/components/liquid-glass";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#how-we-work" },
  { label: "Work", href: "/#testimonials" },
  { label: "About", href: "/#about" },
  { label: "Team", href: "/#team" },
  { label: "FAQ", href: "/#faq" },
];

const DESKTOP_NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Team", href: "/#team" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

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
    <>
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
            <a
              href="/"
              onClick={handleLogoClick}
              aria-label="Evlogia — home"
              className="shrink-0 overflow-hidden relative block"
              style={{ width: "120px", height: "26px" }}
            >
              <Image
                src="/evlogia-combination-mark.png"
                alt="Evlogia"
                width={260}
                height={260}
                priority
                sizes="130px"
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

            {/* Links — desktop */}
            <div className="hidden md:flex items-center gap-7">
              {DESKTOP_NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="nav-link text-black/65 text-xs font-sans hover:text-black transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] tracking-wide"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* CTA — desktop */}
            <button
              data-cal-link="ethankd/strategy"
              data-cal-namespace="strategy"
              data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
              className="group liquid-glass rounded-full pl-4 pr-1.5 py-1 text-xs font-sans font-medium text-black/80 hover:bg-black/5 active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] whitespace-nowrap shrink-0 cursor-pointer hidden md:inline-flex items-center gap-2"
            >
              Book a call
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-black/[0.06] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <span className="text-black/50 text-[10px]">&#8599;</span>
              </span>
            </button>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden relative w-8 h-8 flex items-center justify-center cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className="absolute w-4 h-[1.5px] bg-black/60 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  transform: menuOpen
                    ? "rotate(45deg) translateY(0)"
                    : "rotate(0) translateY(-3px)",
                }}
              />
              <span
                className="absolute w-4 h-[1.5px] bg-black/60 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  transform: menuOpen
                    ? "rotate(-45deg) translateY(0)"
                    : "rotate(0) translateY(3px)",
                  opacity: 1,
                }}
              />
            </button>
          </nav>
        </LiquidGlassCard>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{
              background: "rgba(245, 244, 240, 0.92)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-black/80 text-3xl tracking-tight"
                  style={{ letterSpacing: "-0.01em" }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 + i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {label}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{
                  duration: 0.5,
                  delay: 0.08 + NAV_LINKS.length * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <button
                  data-cal-link="ethankd/strategy"
                  data-cal-namespace="strategy"
                  data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
                  onClick={() => setMenuOpen(false)}
                  className="group inline-flex items-center gap-3 rounded-full pl-7 pr-2.5 py-2.5 bg-black/90 text-white font-sans text-sm font-medium active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer mt-4"
                >
                  Book a 30-min call
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                    <span className="text-white/70 text-xs">&#8599;</span>
                  </span>
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
