import type { Metadata } from "next";
import Image from "next/image";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PixelSprite } from "@/components/farm/pixel-sprite";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { Testimonials } from "@/components/testimonials";
import { CLIENT_LOGOS, STATS, CAL_ATTRS } from "@/content/site";
import { T } from "@/farm/tiles.ts";

export const metadata: Metadata = {
  title: "Work | Evlogia — Harvests",
  description:
    "50+ systems shipped for 20+ clients across 8 industries since 2021. Client logos, testimonials, and the track record behind them.",
};

const statIcons = [T.crop.wheat[3], T.biome.apple, T.biome.flowerBigYellow, T.biome.acorn];

export default function WorkPage() {
  return (
    <>
      <SiteNav />

      <main id="main" className="pt-14">
        {/* Header */}
        <section className="sky-day px-6 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
          <p className="pixel-chip mb-4">Harvests</p>
          <h1
            className="font-display text-ink leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
          >
            What we&apos;ve brought in.
          </h1>
          <p className="font-sans text-ink-2 text-[15px] md:text-[16px] leading-relaxed max-w-xl mx-auto mt-4">
            Since 2021: 50+ shipped systems across 8 industries. Most of our
            work runs under NDA, so what you see here is what clients let us
            show — logos, words, and numbers.
          </p>
        </section>

        {/* Stats */}
        <section className="px-6 py-14 md:py-18">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {STATS.map(({ target, suffix, label }, i) => (
              <ScrollReveal key={label}>
                <div className="panel-wood pixel-corners h-full">
                  <div className="panel-paper px-4 py-5 text-center h-full flex flex-col items-center justify-center min-h-[120px]">
                    <PixelSprite tile={statIcons[i]} scale={2} className="mb-2" />
                    <div className="font-display text-ink text-3xl md:text-4xl leading-none mb-1.5">
                      <AnimatedCounter target={target} suffix={suffix} />
                    </div>
                    <div className="font-sans text-ink-2 text-[11px] tracking-widest uppercase leading-tight">
                      {label}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Client logo grid */}
        <section className="px-6 py-14 md:py-20" aria-label="Clients">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="pixel-chip">Clients</span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {CLIENT_LOGOS.map((logo) => (
                <div key={logo.name} className="panel-paper pixel-corners flex items-center justify-center px-4 py-6">
                  <div
                    className="relative h-8 w-full"
                    style={
                      logo.t === "white-bg"
                        ? { filter: "grayscale(1) opacity(0.6)", mixBlendMode: "multiply" }
                        : logo.t === "dark-bg"
                        ? { filter: "grayscale(1) invert(1) opacity(0.55)", mixBlendMode: "multiply" }
                        : logo.t === "invert"
                        ? { filter: "grayscale(1) invert(1) opacity(0.5)" }
                        : { filter: "grayscale(1) opacity(0.45)" }
                    }
                  >
                    <Image src={logo.src} alt={logo.name} fill className="object-contain" sizes="140px" />
                  </div>
                </div>
              ))}
              <div className="panel-paper pixel-corners flex items-center justify-center px-4 py-6">
                <span className="font-display text-ink-3 text-xs text-center leading-relaxed">
                  + more under NDA
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-6 py-14 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="pixel-chip mb-4">Word around the valley</p>
              <h2 className="font-display text-ink leading-tight" style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}>
                In their words.
              </h2>
            </div>
            <Testimonials />
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20 md:pb-28">
          <div className="max-w-3xl mx-auto">
            <div className="panel-wood pixel-corners">
              <div className="panel-paper px-6 py-8 md:px-10 md:py-10 text-center">
                <h2 className="font-display text-ink text-xl md:text-2xl mb-3">
                  Want references for your industry?
                </h2>
                <p className="font-sans text-ink-2 text-[15px] leading-relaxed max-w-md mx-auto mb-7">
                  Book a call and tell us what you&apos;re building — we&apos;ll
                  walk you through the closest work we&apos;ve shipped.
                </p>
                <button {...CAL_ATTRS} className="pixel-btn">
                  Book a 30-min call
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
