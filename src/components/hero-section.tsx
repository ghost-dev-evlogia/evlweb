"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
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
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24 text-center overflow-hidden"
    >
      {/* Parallax background */}
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
              Now accepting Q3 engagements
            </span>
          </LiquidGlassCard>
        </motion.div>

        {/* Headline — word-by-word with blur-to-sharp */}
        <h1
          className="font-serif text-white leading-[1.05] mb-6 md:mb-7 text-center w-full"
          style={{
            fontSize: "clamp(1.5rem, 7.5vw, 7rem)",
            textShadow: "0 2px 40px rgba(0,0,0,0.45), 0 1px 8px rgba(0,0,0,0.3)",
            letterSpacing: "-0.01em",
          }}
        >
          {["The", "Applied", "AI", "Lab"].map((word, i) => (
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
            {["That", "Ships."].map((word, i) => (
              <motion.span
                key={word + i}
                style={{ display: "inline-block", marginRight: i === 0 ? "0.25em" : 0 }}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.5 + (4 + i) * 0.07, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </em>
        </h1>

        {/* Sub */}
        <motion.p
          className="font-sans text-neutral-200 leading-relaxed mb-10 md:mb-12 max-w-md md:max-w-lg text-center"
          style={{
            fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
            textShadow: "0 1px 12px rgba(0,0,0,0.5), 0 2px 28px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          We partner with enterprises and research institutions to turn hard AI
          problems into production systems, filed patents, and published
          research — end to end.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-3 md:gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="/#book">
            <LiquidGlassCard
              glowIntensity="none"
              shadowIntensity="sm"
              borderRadius="100px"
              blurIntensity="sm"
              draggable={false}
              className="rounded-full p-2 px-3 text-white inline-flex items-center gap-2.5"
            >
              <span className="relative z-2">Start a Project →</span>
            </LiquidGlassCard>
          </a>
          <a
            href="#research"
            className="text-white font-sans text-sm hover:text-white/65 transition-colors duration-300 flex items-center gap-1.5"
          >
            View Research
            <span className="text-xs opacity-60">↓</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <p className="scroll-bounce absolute bottom-7 left-1/2 text-white/20 text-[10px] sm:text-xs tracking-[0.3em] uppercase font-sans whitespace-nowrap pointer-events-none">
        Scroll to Explore
      </p>

      {/* Gradient fade into next section */}
      <div className="absolute h-96 w-full left-0 bottom-0 bg-linear-to-t from-[#f5f4f0] to-transparent pointer-events-none" />
    </section>
  );
}
