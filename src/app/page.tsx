import { HeroSection } from "@/components/hero-section";
import { AnimatedCounter } from "@/components/animated-counter";
import { BookingSection } from "@/components/booking-section";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SplitHeading } from "@/components/split-heading";
import { StaggerGrid, StaggerItem } from "@/components/stagger-grid";
import { MotionDivider } from "@/components/motion-divider";
import { ScrollReveal } from "@/components/scroll-reveal";
import { RevealLabel } from "@/components/reveal-label";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";

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
                      We embed with your research and engineering teams to work on problems that don&apos;t have known answers yet. Novel architectures, domain-specific models, training methodologies that don&apos;t exist in the literature. We run the experiments, validate the results, and hand you a system that works. Not a report about what might work.
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
                    A paper without a product is a citation. We build the systems that put research findings in front of users. Inference pipelines, APIs, deployment infrastructure. The model works in a notebook. We make it run in production.
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
                    Most AI companies generate patentable IP without realizing it. We surface what&apos;s novel in your model design, training process, and application layer, then file before someone else does. Patents filed across US, EU, and international jurisdictions.
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
                      We publish at venues that matter. Peer-reviewed papers that build your institution&apos;s scientific credibility and attract the kind of talent that reads papers before job listings.
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
              <div className="glass-card rounded-3xl p-7 sm:p-10 md:p-16 relative overflow-hidden">
                <div className="relative">
                  <p className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-4">
                    How We Work
                  </p>
                  <SplitHeading
                    lines={[
                      { text: "Most consultants advise." },
                      { text: "We build, file, and publish.", italic: true },
                    ]}
                    className="font-serif text-black/90 mb-5 leading-[1.07] max-w-2xl"
                    style={{
                      fontSize: "clamp(1.4rem, 4.5vw, 3.5rem)",
                      letterSpacing: "-0.01em",
                    }}
                  />
                  <p className="font-sans text-black/40 text-sm leading-relaxed max-w-lg mb-8 md:mb-16">
                    The gap between AI research and production is where most
                    engagements stall. Someone writes a promising paper. Someone
                    else tries to build it. Six months later, the prototype
                    doesn&apos;t match the theory. We run research and engineering
                    in parallel so the system you ship is the system the science
                    describes.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 md:gap-10">
                    {[
                      {
                        step: "01",
                        title: "Discover & Define",
                        desc: "We scope the problem with your domain experts and research leads before writing a line of code. The goal is to find the real constraint, not the assumed one. Most projects change direction in this phase. That's the point.",
                      },
                      {
                        step: "02",
                        title: "Research & Build",
                        desc: "R&D and production engineering run on the same timeline, not sequentially. The researchers know what the engineers need. The engineers know what the researchers found. Nothing gets lost between a paper and a pull request.",
                      },
                      {
                        step: "03",
                        title: "Ship & Protect",
                        desc: "Deploy the system. File the patents. Publish the research. Your IP stays yours. Your competitive advantage is documented, protected, and public in exactly the ways you choose.",
                      },
                    ].map(({ step, title, desc }, i) => (
                      <div key={step} className="relative">
                        <div
                          className="font-serif text-black/[0.06] leading-none mb-2 select-none"
                          style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                        >
                          {step}
                        </div>
                        <h4 className="font-serif text-black/90 text-base md:text-lg mb-2">
                          {title}
                        </h4>
                        <p className="font-sans text-black/40 text-sm leading-relaxed">
                          {desc}
                        </p>
                        {i < 2 && (
                          <div
                            className="hidden md:block absolute top-8 -right-5 w-10 h-px"
                            style={{
                              background:
                                "linear-gradient(90deg, rgba(0,0,0,0.08), transparent)",
                            }}
                          />
                        )}
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
                  The papers go to peer review. The architecture stays
                  proprietary. We run IP filings in parallel with every
                  research engagement so nothing goes public before it&apos;s
                  protected.
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
                    Evlogia is an applied AI research lab. We solve AI problems
                    that don&apos;t have published solutions yet, build the
                    systems that act on what we find, and file the patents
                    before the research goes public.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 md:gap-10">
                    {[
                      {
                        title: "We do the work.",
                        desc: "We don't advise on AI strategy and leave you to figure out the execution. We write the code, run the experiments, build the systems, and stand behind the results.",
                      },
                      {
                        title: "We protect what we build.",
                        desc: "Every engagement includes an IP review. If the work produces something novel, it gets filed. Most firms treat patents as an afterthought. We treat them as a deliverable.",
                      },
                      {
                        title: "We publish what we find.",
                        desc: "If the science is good enough, it goes to peer review. This isn't a marketing exercise. Published research attracts better talent, builds institutional credibility, and forces rigor on every project.",
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

        {/* ─── Booking ─── */}
        <ScrollReveal>
          <BookingSection />
        </ScrollReveal>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="divider" />
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
                    italicClassName="text-gradient"
                    style={{
                      fontSize: "clamp(1.4rem, 5vw, 3.8rem)",
                      letterSpacing: "-0.01em",
                    }}
                  />
                  <p className="font-sans text-black/40 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                    Bring us your hardest AI problem. We&apos;ll scope it, build
                    it, protect it, and if the science holds up, publish it.
                    Thirty minutes. No pitch. Just a focused conversation about
                    whether we&apos;re the right fit.
                  </p>
                  <div className="flex justify-center">
                    <a
                      href="/#book"
                      className="inline-flex items-center gap-2 sm:gap-3 glass rounded-full px-5 sm:px-8 py-3 sm:py-3.5 text-black/80 font-sans font-medium text-xs sm:text-sm border border-black/10 hover:bg-black/5 hover:scale-[1.03] transition-all duration-300"
                    >
                      Book a Strategy Call
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
