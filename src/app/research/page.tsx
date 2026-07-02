import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PixelSprite } from "@/components/farm/pixel-sprite";
import { ScrollReveal } from "@/components/scroll-reveal";
import { DEPTH, CAL_ATTRS } from "@/content/site";
import { T } from "@/farm/tiles.ts";

export const metadata: Metadata = {
  title: "Research | Evlogia — The Greenhouse",
  description:
    "Frontier R&D for clients with novel problems: applied AI research, hard hardware, complex platforms. Real experiments, filed IP, publishable results.",
};

const depthIcons = [T.biome.sunflower, T.biome.mushroomBig, T.biome.treeApple];

export default function ResearchPage() {
  return (
    <>
      <SiteNav />

      <main id="main" className="pt-14">
        {/* Header */}
        <section className="sky-day px-6 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
          <p className="pixel-chip mb-4">The greenhouse</p>
          <h1
            className="font-display text-ink leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
          >
            Where the hard problems grow.
          </h1>
          <p className="font-sans text-ink-2 text-[15px] md:text-[16px] leading-relaxed max-w-xl mx-auto mt-4">
            A lot of what we do follows a known pattern. Some engagements
            don&apos;t. Novel AI architectures, hardware nobody&apos;s built
            before, platforms where the data model is itself the unsolved
            problem. We&apos;re good at those.
          </p>
        </section>

        {/* R&D posture */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-5">
              <h2 className="font-display text-ink leading-tight mb-4" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.2rem)" }}>
                Real experiments, not just model integration.
              </h2>
              <p className="font-sans text-ink-2 text-[15px] leading-relaxed">
                We do frontier R&D for clients whose problems need actual
                research: hypotheses, experiments, negative results included.
                When the work produces something genuinely new, we file the
                IP — patents and publications are deliverables, not
                afterthoughts. You approve everything before it goes public.
              </p>
            </div>
            <div className="md:col-span-7 flex flex-col gap-4">
              {[
                {
                  title: "R&D engagements",
                  desc: "Scoped research phases with defined questions and honest reporting. If the answer is \"this doesn't work yet,\" you hear it early — with the evidence.",
                  icon: T.crop.wheatBag,
                },
                {
                  title: "Patents & IP",
                  desc: "Novel architectures and methods produced during an engagement get filed. It's yours — our standard agreement makes that explicit.",
                  icon: T.chest,
                },
                {
                  title: "Publications",
                  desc: "Where clients allow it, results worth publishing get published. Confidentiality first: mutual NDA on every engagement.",
                  icon: T.biome.flowerBox,
                },
              ].map(({ title, desc, icon }) => (
                <ScrollReveal key={title}>
                  <div className="panel-wood pixel-corners">
                    <div className="panel-paper px-5 py-5 flex gap-4 items-start">
                      <PixelSprite tile={icon} scale={2} className="mt-1 shrink-0" />
                      <div>
                        <h3 className="font-display text-ink text-base mb-1.5">{title}</h3>
                        <p className="font-sans text-ink-2 text-sm leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Depth areas */}
        <section className="px-6 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10">
              <span className="pixel-chip">Where we go deep</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {DEPTH.map(({ label, desc, tags }, i) => (
                <ScrollReveal key={label}>
                  <div className="panel-wood pixel-corners h-full">
                    <div className="panel-paper px-6 py-6 h-full flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <PixelSprite tile={depthIcons[i]} scale={2} />
                        <div className="font-display text-ink text-[13px] tracking-[0.18em] uppercase">{label}</div>
                      </div>
                      <p className="font-sans text-ink-2 text-sm leading-relaxed flex-1">{desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((v) => (
                          <span key={v} className="pixel-chip" style={{ fontSize: "10px" }}>
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20 md:pb-28">
          <div className="max-w-3xl mx-auto">
            <div className="panel-wood pixel-corners">
              <div className="panel-paper px-6 py-8 md:px-10 md:py-10 text-center">
                <h2 className="font-display text-ink text-xl md:text-2xl mb-3">
                  Have a problem without a known pattern?
                </h2>
                <p className="font-sans text-ink-2 text-[15px] leading-relaxed max-w-md mx-auto mb-7">
                  Bring it. Thirty minutes, no pitch — just a focused
                  conversation about whether it&apos;s solvable and what a
                  research phase would look like.
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
