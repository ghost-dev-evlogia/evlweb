"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { AsciiMotionLogo } from "@/components/ascii-motion-logo";

export function SiteFooter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });
  const siteLinks = [
    { label: "Services", href: "/#services" },
    { label: "Research", href: "/#research" },
    { label: "About", href: "/#about" },
  ];

  const workLinks = [
    { label: "Book a Call", href: "/#book" },
    { label: "Careers", href: "/careers" },
    { label: "hello@evlogia.ai", href: "mailto:hello@evlogia.ai" },
  ];

  const legalLinks = [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="px-4 pb-6 pt-2 md:px-6 md:pb-8">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          className="glass-card rounded-3xl px-7 py-8 md:px-10 md:py-10"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >

          {/* Top row: ASCII logo + nav */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-6 mb-8 md:mb-10">
            {/* Brand */}
            <div className="shrink-0">
              <AsciiMotionLogo />
              <p className="font-sans text-black/30 text-[10px] tracking-[0.18em] uppercase mt-3">
                Applied AI Research
              </p>
            </div>

            {/* Nav — three columns */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-14">
              <div className="flex flex-col gap-2.5">
                <p className="font-sans text-black/25 text-[9px] tracking-[0.2em] uppercase mb-0.5">Site</p>
                {siteLinks.map(({ label, href }) => (
                  <a key={label} href={href} className="font-sans text-black/40 text-[12px] hover:text-black/70 transition-colors duration-200">
                    {label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                <p className="font-sans text-black/25 text-[9px] tracking-[0.2em] uppercase mb-0.5">Work</p>
                {workLinks.map(({ label, href }) => (
                  <a key={label} href={href} className="font-sans text-black/40 text-[12px] hover:text-black/70 transition-colors duration-200">
                    {label}
                  </a>
                ))}
              </div>
              <div className="flex flex-col gap-2.5">
                <p className="font-sans text-black/25 text-[9px] tracking-[0.2em] uppercase mb-0.5">Legal</p>
                {legalLinks.map(({ label, href }) => (
                  <a key={label} href={href} className="font-sans text-black/40 text-[12px] hover:text-black/70 transition-colors duration-200">
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="divider mb-6" />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="font-sans text-black/25 text-[11px]">
              © 2026 Evlogia. All rights reserved.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/evlogia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="flex items-center text-black/30 hover:text-black/60 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/evlogia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex items-center text-black/30 hover:text-black/60 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>

            <p className="font-sans text-black/20 text-[11px]">Built by us.</p>
          </div>

        </motion.div>
      </div>
    </footer>
  );
}
