"use client";

import Image from "next/image";
import { LiquidGlassCard } from "./liquid-glass";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24 text-center overflow-hidden">
      {/* Video background */}
      {/* <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        /> */}
      <Image
        src="/bg.png"
        alt="Evlogia"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover object-bottom"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl">
        {/* Badge */}

        <LiquidGlassCard
          glowIntensity="none"
          shadowIntensity="md"
          borderRadius="100px"
          blurIntensity="sm"
          draggable={false}
          className="rounded-full px-1 pr-3 py-1 relative z-2 text-white inline-flex items-center gap-2.5 mb-8 md:mb-10 text-xs"
          // style={{ animationDelay: "100ms" }}
        >
          <span className="w-10 py-1 relative z-1 rounded-full bg-white text-black">
            New
          </span>
          <span className="relative z-1 uppercase font-sans">
            Applied AI Research
          </span>
        </LiquidGlassCard>

        {/* Headline */}
        <h1
          className="anim-fade-up font-serif text-white leading-[1.05] mb-6 md:mb-7 text-center w-full"
          style={{
            fontSize: "clamp(1.5rem, 7.5vw, 7rem)",
            animationDelay: "200ms",
            textShadow: "0 4px 80px rgba(0,0,0,0.5)",
            letterSpacing: "-0.01em",
          }}
        >
          The Applied AI Lab
          <br />
          <em className="text-white">That Ships.</em>
        </h1>

        {/* Sub */}
        <p
          className="anim-fade-up font-sans text-neutral-200 leading-relaxed mb-10 md:mb-12 max-w-md md:max-w-lg text-center"
          style={{
            fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
            animationDelay: "360ms",
          }}
        >
          We partner with enterprises and research institutions to turn hard AI
          problems into production systems, filed patents, and published
          research — end to end.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
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
        </div>
      </div>

      {/* Scroll hint — uses CSS animation that handles translate */}
      <p className="scroll-bounce absolute bottom-7 left-1/2 text-white/20 text-[9px] tracking-[0.3em] uppercase font-sans whitespace-nowrap pointer-events-none">
        Scroll to Explore
      </p>

      {/* Gradient fade into next section */}
      <div className="absolute h-96 scale-110 w-full left-0 bottom-0 bg-linear-to-t from-[#f5f4f0] from-30% to-transparent pointer-events-none" />
    </section>
  );
}
