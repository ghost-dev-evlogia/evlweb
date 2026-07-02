import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PixelSprite } from "@/components/farm/pixel-sprite";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SERVICES, CAL_ATTRS } from "@/content/site";
import { T } from "@/farm/tiles.ts";

export const metadata: Metadata = {
  title: "Services | Evlogia — The Fields",
  description:
    "Product & platform engineering, internal tools, applied AI, IoT, and agentic AI coaching. Fixed scope, real timelines, shipped systems.",
};

export default function ServicesPage() {
  return (
    <>
      <SiteNav />

      <main id="main" className="pt-14">
        {/* Header */}
        <section className="sky-day px-6 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
          <p className="pixel-chip mb-4">The fields</p>
          <h1
            className="font-display text-ink leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
          >
            Five fields. One team.
          </h1>
          <p className="font-sans text-ink-2 text-[15px] md:text-[16px] leading-relaxed max-w-xl mx-auto mt-4">
            Everything below is priced by project, not by the hour, and scoped
            before we write a line of code. The person who scopes it is the
            person who reviews the PR.
          </p>
        </section>

        {/* Services, one plot at a time */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto flex flex-col gap-10 md:gap-14">
            {SERVICES.map((s, i) => (
              <ScrollReveal key={s.id}>
                <article id={s.id} className="scroll-mt-24">
                  <div className="panel-wood pixel-corners">
                    <div className="panel-paper px-6 py-7 md:px-10 md:py-9">
                      <div className="grid md:grid-cols-12 gap-6 md:gap-10">
                        <div className="md:col-span-7">
                          <div className="flex items-center gap-4 mb-4">
                            <PixelSprite tile={s.icon} scale={3} />
                            <span className="font-display text-ink-4 text-sm">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                          <h2 className="font-display text-ink text-xl md:text-2xl leading-snug mb-3">
                            {s.title}
                          </h2>
                          <p className="font-sans text-ink-2 text-[15px] leading-relaxed max-w-lg">
                            {s.desc}
                          </p>
                          <p
                            className="font-sans text-ink-3 text-[12px] tracking-wide mt-5 pt-3"
                            style={{ borderTop: "2px solid var(--wood-pale)" }}
                          >
                            {s.meta}
                          </p>
                        </div>
                        <div className="md:col-span-5">
                          <p className="font-display text-ink-3 text-[11px] tracking-[0.18em] uppercase mb-3">
                            What this covers
                          </p>
                          <ul className="flex flex-col gap-2.5">
                            {s.includes.map((line) => (
                              <li key={line} className="flex items-start gap-2.5 font-sans text-ink-2 text-sm leading-relaxed">
                                <PixelSprite tile={T.crop.wheat[0]} scale={1} className="mt-0.5 shrink-0" />
                                {line}
                              </li>
                            ))}
                          </ul>
                          <button
                            {...CAL_ATTRS}
                            className="pixel-btn pixel-btn--wood mt-5"
                            style={{ fontSize: "0.85rem" }}
                          >
                            Scope this →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Pricing note + CTA */}
        <section className="px-6 pb-20 md:pb-28">
          <div className="max-w-3xl mx-auto">
            <div className="panel-wood pixel-corners">
              <div className="panel-paper px-6 py-8 md:px-10 md:py-10 text-center">
                <h2 className="font-display text-ink text-xl md:text-2xl mb-3">
                  What does it cost?
                </h2>
                <p className="font-sans text-ink-2 text-[15px] leading-relaxed max-w-lg mx-auto mb-7">
                  Pilots and smaller scoped builds typically run in the low five
                  figures. Full platforms and production AI builds run mid-five
                  to mid-six figures, depending on scope and timeline. Send us
                  your problem and we&apos;ll come back with a clear scope and a
                  real number.
                </p>
                <button {...CAL_ATTRS} className="pixel-btn">
                  Book a scoping call
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
