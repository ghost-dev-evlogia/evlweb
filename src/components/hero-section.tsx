"use client";

import { LiquidGlassCard } from "./liquid-glass";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24 text-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl">
        {/* Badge */}
        <div
          className="anim-fade-up glass rounded-full px-5 py-2 inline-flex items-center gap-2.5 mb-8 md:mb-10"
          style={{ animationDelay: "100ms" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/60 shrink-0" />
          <span className="text-white/50 text-[10px] md:text-xs tracking-[0.25em] uppercase font-sans">
            Applied AI Research
          </span>
        </div>

        {/* Headline */}
        <h1
          className="anim-fade-up font-serif text-white leading-[1.05] mb-6 md:mb-7 text-center w-full"
          style={{
            fontSize: "clamp(2.4rem, 8vw, 7rem)",
            animationDelay: "200ms",
            textShadow: "0 4px 80px rgba(0,0,0,0.5)",
            letterSpacing: "-0.01em",
          }}
        >
          The Applied AI Lab
          <br />
          <em className="text-gradient">That Ships.</em>
        </h1>

        {/* Sub */}
        <p
          className="anim-fade-up font-sans text-white/50 leading-relaxed mb-10 md:mb-12 max-w-md md:max-w-lg text-center"
          style={{
            fontSize: "clamp(0.875rem, 1.6vw, 1.05rem)",
            animationDelay: "360ms",
          }}
        >
          We partner with enterprises and research institutions to turn hard AI
          problems into production systems, filed patents, and published
          research — end to end.
        </p>

        {/* CTAs */}
        <div
          className="anim-fade-up flex flex-col sm:flex-row items-center gap-3 md:gap-4"
          style={{ animationDelay: "480ms" }}
        >
          <a href="#book" className="cursor-pointer">
            <LiquidGlassCard
              glowIntensity="lg"
              shadowIntensity="md"
              borderRadius="100px"
              blurIntensity="sm"
              draggable={false}
              className="p-3 w-full bg-black/20 text-white font-sans text-sm"
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
        </div>
      </div>

      {/* Scroll hint — uses CSS animation that handles translate */}
      <p className="scroll-bounce absolute bottom-7 left-1/2 text-white/20 text-[9px] tracking-[0.3em] uppercase font-sans whitespace-nowrap pointer-events-none">
        Scroll to Explore
      </p>
    </section>
  );
}
