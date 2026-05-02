"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FlowFieldCanvas } from "./flow-field-canvas";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-28 pb-24 text-center overflow-hidden">
      {/* Generative flow-field background — cream + dark hairlines.
          Fills the section, sits behind everything, aria-hidden. */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <FlowFieldCanvas className="w-full h-full" />
        {/* Center vignette — softens the field around the headline so the
            type reads as the focal point, not the field. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(245,244,240,0.92) 0%, rgba(245,244,240,0.55) 35%, rgba(245,244,240,0) 75%)",
          }}
        />
        {/* Bottom gradient fade into next section — preserves continuity */}
        <div className="absolute h-48 w-full left-0 bottom-0 bg-gradient-to-t from-[#f5f4f0] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl">
        {/* Booking pill — editorial chip, not glass-on-image */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 mb-8 md:mb-10 rounded-full bg-white/60 backdrop-blur-sm border border-black/[0.07] px-3.5 py-1.5"
        >
          <span
            className="shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500"
            aria-hidden="true"
          />
          <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-black/80 whitespace-nowrap">
            Booking Q3 2026 engagements
          </span>
        </motion.div>

        {/* Headline — full text in DOM for SR/SEO; per-word animation via spans.
            The visually-hidden `<span className="sr-only">` is the canonical
            accessible name; the animated words are aria-hidden duplicates. */}
        <h1
          className="font-serif text-black/90 leading-[1.02] mb-7 md:mb-9 text-center w-full [text-wrap:balance]"
          style={{
            fontSize: "clamp(2rem, 8vw, 8rem)",
            letterSpacing: "-0.02em",
          }}
        >
          <span className="sr-only">We build systems that get used.</span>
          <span aria-hidden="true">
            {["We", "build", "systems"].map((word, i) => (
              <motion.span
                key={word + i}
                style={{ display: "inline-block", marginRight: "0.22em" }}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.35 + i * 0.07,
                  duration: 0.75,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <em className="text-black/90 italic">
              {["that", "get", "used."].map((word, i) => (
                <motion.span
                  key={word + i}
                  style={{
                    display: "inline-block",
                    marginRight: i < 2 ? "0.22em" : 0,
                  }}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    delay: 0.35 + (3 + i) * 0.07,
                    duration: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </em>
          </span>
        </h1>

        {/* Subhead */}
        <motion.p
          className="font-sans text-black/75 leading-relaxed mb-10 md:mb-12 max-w-md text-center [text-wrap:pretty]"
          style={{ fontSize: "clamp(1rem, 1.55vw, 1.1rem)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          Production AI, internal tools, IoT, and platforms. Built for teams
          that need to ship in months — not prototype in slides.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            data-cal-link="ethankd/strategy"
            data-cal-namespace="strategy"
            data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
            className="group inline-flex items-center gap-3 rounded-full pl-7 pr-2.5 py-2.5 bg-[#0a0a0a] text-white font-sans text-sm font-medium hover:bg-black active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer"
          >
            Book a 30-min call
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
              <span className="text-white/85 text-xs">&#8599;</span>
            </span>
          </button>

          <Link
            href="/#testimonials"
            className="font-sans text-sm text-black/85 hover:text-black underline decoration-black/30 underline-offset-4 hover:decoration-black transition-colors flex items-center gap-1.5"
          >
            See Client Work
            <span className="text-xs opacity-60 no-underline">↓</span>
          </Link>
        </motion.div>

        {/* Risk reducer */}
        <motion.p
          className="font-sans text-black/65 text-[12px] tracking-wide mt-5 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25, duration: 0.5 }}
        >
          No prep needed. We&apos;ll come with a take on your stack.
        </motion.p>
      </div>

    </section>
  );
}
