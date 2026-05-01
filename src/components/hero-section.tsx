"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { LiquidGlassCard } from "./liquid-glass";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      data-on-image
      className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 pt-28 pb-24 text-center overflow-hidden"
    >
      {/* Parallax video background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: bgY }}
      >
        <Image
          src="/bg.png"
          alt="Evlogia"
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-bottom"
          priority
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <LiquidGlassCard
            glowIntensity="none"
            shadowIntensity="md"
            borderRadius="100px"
            blurIntensity="sm"
            draggable={false}
            className="rounded-full px-4 py-2 relative z-2 text-white inline-flex items-center gap-2.5 mb-8 md:mb-10"
          >
            <span
              className="relative z-1 shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ boxShadow: "0 0 6px 2px rgba(52,211,153,0.55)" }}
            />
            <span className="relative z-1 font-sans text-[11px] tracking-[0.12em] uppercase text-white/90 whitespace-nowrap">
              Booking Q3 2026 engagements
            </span>
          </LiquidGlassCard>
        </motion.div>

        {/* Headline — word-by-word with blur-to-sharp.
            aria-label provides the real accessible name; word spans are
            aria-hidden so SR/SEO see the full sentence. */}
        <h1
          aria-label="We build systems that get used."
          className="font-serif text-white leading-[1.05] mb-6 md:mb-7 text-center w-full [text-wrap:balance]"
          style={{
            fontSize: "clamp(1.5rem, 7.5vw, 7rem)",
            textShadow: "0 2px 40px rgba(0,0,0,0.45), 0 1px 8px rgba(0,0,0,0.3)",
            letterSpacing: "-0.01em",
          }}
        >
          <span aria-hidden="true">
            {["We", "build", "systems"].map((word, i) => (
              <motion.span
                key={word + i}
                style={{ display: "inline-block", marginRight: "0.25em" }}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.5 + i * 0.07, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            <em className="text-white">
              {["that", "get", "used."].map((word, i) => (
                <motion.span
                  key={word + i}
                  style={{ display: "inline-block", marginRight: i < 2 ? "0.25em" : 0 }}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.5 + (3 + i) * 0.07, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </em>
          </span>
        </h1>

        {/* Sub */}
        <motion.p
          className="font-sans text-white/85 leading-relaxed mb-10 md:mb-12 max-w-md text-center [text-wrap:pretty]"
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
            textShadow: "0 1px 16px rgba(0,0,0,0.65), 0 2px 32px rgba(0,0,0,0.45)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          Production AI, internal tools, IoT, and platforms. Built for teams that need to ship in months — not prototype in slides.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 md:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            type="button"
            data-cal-link="ethankd/strategy"
            data-cal-namespace="strategy"
            data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
            className="cursor-pointer"
          >
            <LiquidGlassCard
              glowIntensity="none"
              shadowIntensity="sm"
              borderRadius="100px"
              blurIntensity="sm"
              draggable={false}
              className="group rounded-full pl-5 pr-2 py-2 text-white inline-flex items-center gap-2.5 active:scale-[0.98] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
            >
              <span className="relative z-2 text-sm">Book a 30-min call</span>
              <span className="relative z-2 flex items-center justify-center w-7 h-7 rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                <span className="text-white/80 text-xs">&#8599;</span>
              </span>
            </LiquidGlassCard>
          </button>
          <a
            href="/#testimonials"
            className="text-white font-sans text-sm hover:text-white/85 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-1.5 active:scale-[0.98] underline decoration-white/40 underline-offset-4 decoration-[1.5px] hover:decoration-white"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.55), 0 2px 24px rgba(0,0,0,0.4)" }}
          >
            See Client Work
            <span className="text-xs opacity-80 no-underline">↓</span>
          </a>
        </motion.div>

        {/* Risk reducer */}
        <motion.p
          className="font-sans text-white/85 text-[11px] tracking-wide mt-4 text-center"
          style={{ textShadow: "0 1px 16px rgba(0,0,0,0.65), 0 2px 24px rgba(0,0,0,0.4)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35, duration: 0.5 }}
        >
          No prep needed. We'll come with a take on your stack.
        </motion.p>
      </div>

      {/* Scroll hint */}
      <p
        className="scroll-bounce absolute bottom-7 left-1/2 text-white/75 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-sans whitespace-nowrap pointer-events-none"
        style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
      >
        Scroll to Explore
      </p>

      {/* Gradient fade into next section */}
      <div className="absolute h-96 w-full left-0 bottom-0 bg-linear-to-t from-[#f5f4f0] to-transparent pointer-events-none" />
    </section>
  );
}
