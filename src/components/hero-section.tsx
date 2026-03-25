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
            className="rounded-full px-1 pr-3 py-1 relative z-2 text-white inline-flex items-center gap-2.5 mb-8 md:mb-10 text-xs"
          >
            <span className="w-10 py-1 relative z-1 rounded-full bg-white text-black">
              New
            </span>
            <span className="relative z-1 uppercase font-sans">
              Applied AI Research
            </span>
          </LiquidGlassCard>
        </motion.div>

        {/* Headline — staggered words */}
        <h1
          className="font-serif text-white leading-[1.05] mb-6 md:mb-7 text-center w-full"
          style={{
            fontSize: "clamp(1.5rem, 7.5vw, 7rem)",
            textShadow: "0 4px 80px rgba(0,0,0,0.5)",
            letterSpacing: "-0.01em",
          }}
        >
          {["The", "Applied", "AI", "Lab"].map((word, i) => (
            <span
              key={word + i}
              style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: "0.25em" }}
            >
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.55 + i * 0.06, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
          <br />
          <em className="text-white">
            {["That", "Ships."].map((word, i) => (
              <span
                key={word + i}
                style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom", marginRight: i === 0 ? "0.25em" : 0 }}
              >
                <motion.span
                  style={{ display: "inline-block" }}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.55 + (4 + i) * 0.06, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </em>
        </h1>

        {/* Sub */}
        <motion.p
          className="font-sans text-neutral-200 leading-relaxed mb-10 md:mb-12 max-w-md md:max-w-lg text-center"
          style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)" }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ delay: 1.05, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#">
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
