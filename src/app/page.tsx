import { HeroSection } from "@/components/hero-section";
import { AnimatedCounter } from "@/components/animated-counter";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SplitHeading } from "@/components/split-heading";
import { StaggerGrid, StaggerItem } from "@/components/stagger-grid";
import { MotionDivider } from "@/components/motion-divider";
import { ScrollReveal } from "@/components/scroll-reveal";
import { RevealLabel } from "@/components/reveal-label";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { HowWeWork } from "@/components/how-we-work";

const marqueeItems = [
  "NeurIPS",
  "·",
  "Applied AI Research",
  "·",
  "ICML",
  "·",
  "Patent Strategy",
  "·",
  "ICLR",
  "·",
  "Foundation Models",
  "·",
  "AAAI",
  "·",
  "R&D Consulting",
  "·",
  "CVPR",
  "·",
  "AI Products",
  "·",
  "ECCV",
  "·",
  "Research Publications",
  "·",
];

export default function Home() {
  return (
    <>
      <SiteNav />

      <main>
        {/* ─── Hero ─── */}
        <HeroSection />

        {/* ─── Marquee band ─── */}
        <div className="border-y" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
          <div className="marquee-wrapper py-5">
            <div className="marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span
                  key={i}
                  className="font-sans text-[11px] sm:text-xs tracking-[0.2em] uppercase whitespace-nowrap"
                  style={{
                    color:
                      item === "·" ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.32)",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Stats ─── */}
        <section className="px-6 py-10 md:py-20">
          <StaggerGrid className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { target: 40, suffix: "+", label: "R&D Projects" },
              { target: 12, suffix: "+", label: "Patents Filed" },
              { target: 20, suffix: "+", label: "Papers Published" },
              { target: 8, suffix: "", label: "Industries Served" },
            ].map(({ target, suffix, label }) => (
              <StaggerItem key={label} className="h-full">
                <div className="glass-card card-hover rounded-2xl p-5 md:p-6 text-center h-full flex flex-col items-center justify-center min-h-[110px]">
                  <div className="font-serif text-black/90 text-3xl md:text-4xl mb-1.5 leading-none">
                    <AnimatedCounter target={target} suffix={suffix} />
                  </div>
                  <div className="font-sans text-black/35 text-[9px] md:text-[10px] tracking-widest uppercase leading-tight">
                    {label}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <MotionDivider />
        </div>

        {/* ─── Services ─── */}
        <section id="services" className="scroll-mt-20 px-6 py-12 md:py-28">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <RevealLabel className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-3">
                What We Do
              </RevealLabel>
              <SplitHeading
                lines={[
                  { text: "Four pillars." },
                  { text: "One partner.", italic: true },
                ]}
                className="font-serif text-black/90 leading-[1.07]"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  letterSpacing: "-0.01em",
                }}
              />
            </div>

            <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {/* 01 — Applied AI R&D — featured wide */}
              <StaggerItem className="md:col-span-2 h-full">
                <div className="glass-card card-hover rounded-2xl p-6 md:p-9 relative overflow-hidden h-full">
                  {/* Watermark number */}
                  <div
                    className="absolute -right-4 -bottom-6 font-serif text-black/[0.04] leading-none select-none pointer-events-none"
                    style={{ fontSize: "clamp(6rem, 12vw, 10rem)" }}
                    aria-hidden
                  >
                    01
                  </div>
                  <div className="relative">
                    <div className="font-sans text-black/18 text-[10px] tracking-widest mb-5">01</div>
                    <h3
                      className="font-serif text-black/90 text-2xl md:text-3xl mb-4 leading-snug"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      Applied AI R&D
                    </h3>
                    <p className="font-sans text-black/45 text-sm leading-relaxed max-w-lg">
                      Novel architectures. Unsolved problems. We run the experiments — you get a deployed system, not a slide deck.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* 02 — Product Development */}
              <StaggerItem className="h-full">
                <div className="glass-card card-hover rounded-2xl p-6 md:p-9 relative overflow-hidden h-full">
                  {/* Watermark number */}
                  <div
                    className="absolute -right-3 -bottom-5 font-serif text-black/[0.04] leading-none select-none pointer-events-none"
                    style={{ fontSize: "clamp(5rem, 9vw, 8rem)" }}
                    aria-hidden
                  >
                    02
                  </div>
                  <div className="font-sans text-black/18 text-[10px] tracking-widest mb-5">02</div>
                  <h3
                    className="font-serif text-black/90 text-xl md:text-2xl mb-3 leading-snug"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    Product Development
                  </h3>
                  <p className="font-sans text-black/45 text-sm leading-relaxed">
                    Research that never ships is overhead. We move findings from notebook to production — inference pipelines, APIs, full deployment.
                  </p>
                </div>
              </StaggerItem>

              {/* 03 — Patent Strategy */}
              <StaggerItem className="h-full">
                <div className="glass-card card-hover rounded-2xl p-6 md:p-9 relative overflow-hidden h-full">
                  {/* Watermark number */}
                  <div
                    className="absolute -right-3 -bottom-5 font-serif text-black/[0.04] leading-none select-none pointer-events-none"
                    style={{ fontSize: "clamp(5rem, 9vw, 8rem)" }}
                    aria-hidden
                  >
                    03
                  </div>
                  <div className="font-sans text-black/18 text-[10px] tracking-widest mb-5">03</div>
                  <h3
                    className="font-serif text-black/90 text-xl md:text-2xl mb-3 leading-snug"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    Patent Strategy &amp; Filing
                  </h3>
                  <p className="font-sans text-black/45 text-sm leading-relaxed">
                    You&apos;re generating IP you don&apos;t own yet. We surface what&apos;s novel and file before someone else does — US, EU, and international.
                  </p>
                </div>
              </StaggerItem>

              {/* 04 — Research Publications — featured wide */}
              <StaggerItem className="md:col-span-2 h-full">
                <div className="glass-card card-hover rounded-2xl p-6 md:p-9 relative overflow-hidden h-full">
                  {/* Watermark number */}
                  <div
                    className="absolute -right-4 -bottom-6 font-serif text-black/[0.04] leading-none select-none pointer-events-none"
                    style={{ fontSize: "clamp(6rem, 12vw, 10rem)" }}
                    aria-hidden
                  >
                    04
                  </div>
                  <div className="relative">
                    <div className="font-sans text-black/18 text-[10px] tracking-widest mb-5">04</div>
                    <h3
                      className="font-serif text-black/90 text-2xl md:text-3xl mb-4 leading-snug"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      Research Publications
                    </h3>
                    <p className="font-sans text-black/45 text-sm leading-relaxed mb-6 max-w-lg">
                      Top-tier venues. Peer-reviewed. Builds credibility and attracts the talent that reads papers before job listings.
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {["NeurIPS", "ICML", "ICLR", "AAAI", "CVPR", "ECCV"].map((v) => (
                        <span
                          key={v}
                          className="font-sans text-[10px] tracking-wide text-black/50 border border-black/10 rounded-full px-2.5 py-0.5"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </StaggerGrid>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <MotionDivider />
        </div>

        {/* ─── How We Work ─── */}
        <section id="how-we-work" className="scroll-mt-20 px-6 py-12 md:py-28">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal variant="scale">
              <HowWeWork />
            </ScrollReveal>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <MotionDivider />
        </div>

        {/* ─── Research & IP ─── */}
        <section id="research" className="scroll-mt-20 px-6 py-12 md:py-28">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <RevealLabel className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-3">
                Research &amp; IP
              </RevealLabel>
              <SplitHeading
                lines={[
                  { text: "Science is" },
                  { text: "our product.", italic: true },
                ]}
                className="font-serif text-black/90 leading-[1.07] mb-4"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  letterSpacing: "-0.01em",
                }}
              />
              <ScrollReveal>
                <p className="font-sans text-black/40 text-sm max-w-sm mx-auto leading-relaxed">
                  Papers go to peer review. Architectures stay proprietary. IP filing runs in parallel — nothing goes public unprotected.
                </p>
              </ScrollReveal>
            </div>

            <StaggerGrid className="grid md:grid-cols-3 gap-3 md:gap-4">
              {/* Publications card */}
              <StaggerItem className="h-full">
                <div className="glass-card card-hover rounded-2xl p-6 md:p-8 h-full flex flex-col gap-4">
                  <div className="font-sans text-black/30 text-[10px] tracking-[0.25em] uppercase">
                    Publication Venues
                  </div>
                  <div className="font-serif text-black/85 text-4xl md:text-5xl leading-none">
                    20+
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {["NeurIPS", "ICML", "ICLR", "AAAI", "CVPR"].map((v) => (
                      <span
                        key={v}
                        className="font-sans text-[10px] tracking-wide text-black/50 border border-black/10 rounded-full px-2.5 py-0.5"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <div className="font-sans text-black/30 text-[10px] tracking-wide">
                    Peer-reviewed conference papers accepted at top-tier venues
                  </div>
                </div>
              </StaggerItem>

              {/* Patents card */}
              <StaggerItem className="h-full">
                <div className="glass-card card-hover rounded-2xl p-6 md:p-8 h-full flex flex-col gap-4">
                  <div className="font-sans text-black/30 text-[10px] tracking-[0.25em] uppercase">
                    Patent Portfolio
                  </div>
                  <div className="font-serif text-black/85 text-4xl md:text-5xl leading-none">
                    12+
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {["US", "EU", "International"].map((v) => (
                      <span
                        key={v}
                        className="font-sans text-[10px] tracking-wide text-black/50 border border-black/10 rounded-full px-2.5 py-0.5"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <div className="font-sans text-black/30 text-[10px] tracking-wide">
                    Filed, pending &amp; granted
                  </div>
                </div>
              </StaggerItem>

              {/* Domains card */}
              <StaggerItem className="h-full">
                <div className="glass-card card-hover rounded-2xl p-6 md:p-8 h-full flex flex-col gap-4">
                  <div className="font-sans text-black/30 text-[10px] tracking-[0.25em] uppercase">
                    Research Domains
                  </div>
                  <div className="font-serif text-black/85 text-4xl md:text-5xl leading-none">
                    8
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {["LLMs", "Vision", "Multimodal", "Agents"].map((v) => (
                      <span
                        key={v}
                        className="font-sans text-[10px] tracking-wide text-black/50 border border-black/10 rounded-full px-2.5 py-0.5"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                  <div className="font-sans text-black/30 text-[10px] tracking-wide">
                    Active research areas
                  </div>
                </div>
              </StaggerItem>
            </StaggerGrid>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <MotionDivider />
        </div>

        {/* ─── Testimonials ─── */}
        <section id="testimonials" className="scroll-mt-20 px-6 py-12 md:py-28">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-4">
              <RevealLabel className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-3">
                What Clients Say
              </RevealLabel>
              <SplitHeading
                lines={[
                  { text: "Trusted by teams" },
                  { text: "that build seriously.", italic: true },
                ]}
                className="font-serif text-black/90 leading-[1.07]"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  letterSpacing: "-0.01em",
                }}
              />
            </div>
            <ScrollReveal>
              <Testimonials />
            </ScrollReveal>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <MotionDivider />
        </div>

        {/* ─── About ─── */}
        <section id="about" className="scroll-mt-20 px-6 py-12 md:py-28">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal variant="scale">
              <div className="glass-card rounded-3xl p-7 sm:p-10 md:p-16 relative overflow-hidden">
                <div className="relative">
                  <p className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-4">
                    Who We Are
                  </p>
                  <SplitHeading
                    lines={[{ text: "Who we are." }]}
                    className="font-serif text-black/90 mb-5 leading-[1.07] max-w-2xl"
                    style={{
                      fontSize: "clamp(1.4rem, 4.5vw, 3.5rem)",
                      letterSpacing: "-0.01em",
                    }}
                  />
                  <p className="font-sans text-black/40 text-sm leading-relaxed max-w-lg mb-10 md:mb-14">
                    We solve AI problems without published solutions, ship the systems that prove them, and file patents before the science goes public.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 md:gap-10">
                    {[
                      {
                        title: "We do the work.",
                        desc: "No strategy decks, no handoffs. We write the code, run the experiments, and ship the system.",
                      },
                      {
                        title: "We protect what we build.",
                        desc: "IP review is built into every engagement. If it&apos;s novel, it gets filed — not later, now.",
                      },
                      {
                        title: "We publish what we find.",
                        desc: "Good science goes to peer review. It attracts better talent and forces rigor on every project.",
                      },
                    ].map(({ title, desc }) => (
                      <div key={title}>
                        <h4 className="font-serif text-black/90 text-base md:text-lg mb-2">
                          {title}
                        </h4>
                        <p className="font-sans text-black/40 text-sm leading-relaxed">
                          {desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <MotionDivider />
        </div>

        {/* ─── FAQ ─── */}
        <section id="faq" className="scroll-mt-20 px-6 py-12 md:py-28">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <RevealLabel className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-3">
                FAQ
              </RevealLabel>
              <SplitHeading
                lines={[
                  { text: "Questions we" },
                  { text: "get asked.", italic: true },
                ]}
                className="font-serif text-black/90 leading-[1.07]"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  letterSpacing: "-0.01em",
                }}
              />
            </div>

            <ScrollReveal>
              <FAQ />
            </ScrollReveal>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <MotionDivider />
        </div>

        {/* ─── CTA ─── */}
        <section id="contact" className="px-6 pb-20 md:pb-28 pt-6 md:pt-8">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal variant="scale">
              <div className="glass-card rounded-3xl p-6 sm:p-12 md:p-20 text-center relative overflow-hidden">
                <div className="relative">
                  <RevealLabel className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-4">
                    Get Started
                  </RevealLabel>
                  <SplitHeading
                    lines={[
                      { text: "Let's solve something" },
                      { text: "worth publishing.", italic: true },
                    ]}
                    className="font-serif text-black/90 leading-[1.07] mb-5"
                    style={{
                      fontSize: "clamp(1.4rem, 5vw, 3.8rem)",
                      letterSpacing: "-0.01em",
                    }}
                  />
                  <p className="font-sans text-black/40 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                    Bring us your hardest AI problem. Thirty minutes. No pitch. We&apos;ll tell you if we&apos;re the right fit.
                  </p>
                  <div className="flex justify-center">
                    <a
                      href="mailto:hello@evlogia.ai"
                      className="inline-flex items-center gap-2 sm:gap-3 glass rounded-full px-5 sm:px-8 py-3 sm:py-3.5 text-black/80 font-sans font-medium text-xs sm:text-sm border border-black/10 hover:bg-black/5 hover:scale-[1.03] transition-all duration-300"
                    >
                      Start a Conversation
                      <span className="text-black/35 text-xs">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
