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

            <StaggerGrid className="grid md:grid-cols-2 gap-3 md:gap-4">
              {[
                {
                  num: "01",
                  title: "Applied AI R&D",
                  desc: "We embed with your research and engineering teams to work on problems that don't have known answers yet. Novel architectures, domain-specific models, training methodologies that don't exist in the literature. We run the experiments, validate the results, and hand you a system that works. Not a report about what might work.",
                },
                {
                  num: "02",
                  title: "Product Development",
                  desc: "A paper without a product is a citation. We build the production systems that turn research outputs into things your customers actually use. Full-stack engineering, inference pipelines, APIs, deployment. The model works in a notebook. We make it work at scale.",
                },
                {
                  num: "03",
                  title: "Patent Strategy & Filing",
                  desc: "Most AI companies generate patentable IP without realizing it. We surface what's novel in your model design, training process, and application layer, then file before someone else does. [X] patents filed so far across US, EU, and international jurisdictions.",
                },
                {
                  num: "04",
                  title: "Research Publications",
                  desc: "We publish at venues that matter. NeurIPS, ICML, ICLR, AAAI, CVPR. Peer-reviewed papers that build your institution's scientific credibility and attract the kind of talent that reads papers before job listings.",
                },
              ].map(({ num, title, desc }) => (
                <StaggerItem key={title} className="h-full">
                  <div className="glass-card card-hover rounded-2xl p-6 md:p-9 relative overflow-hidden h-full">
                    <div className="font-sans text-black/18 text-[10px] tracking-widest mb-5">
                      {num}
                    </div>
                    <h3
                      className="font-serif text-black/90 text-xl md:text-2xl mb-3 leading-snug"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {title}
                    </h3>
                    <p className="font-sans text-black/45 text-sm leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
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
                  We contribute to the global AI research body while protecting
                  your competitive position through strategic IP filings. The
                  science gets published. The implementation stays yours.
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

        {/* ─── Case Studies ─── */}
        <section id="work" className="scroll-mt-20 px-6 py-12 md:py-28">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <RevealLabel className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-3">
                Case Studies
              </RevealLabel>
              <SplitHeading
                lines={[
                  { text: "What this looks like" },
                  { text: "in practice.", italic: true },
                ]}
                className="font-serif text-black/90 leading-[1.07]"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  letterSpacing: "-0.01em",
                }}
              />
            </div>

            <StaggerGrid className="grid md:grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  tag: "[Industry] Enterprise",
                  problem:
                    "[Client description] needed to [specific technical challenge]. Their existing approach [specific limitation].",
                  work: "We [specific methodology/approach]. Over [X] weeks, we [specific research and engineering activities]. The work produced [specific technical output].",
                  result:
                    "[Specific measurable outcome]. [X] patent(s) filed on the novel [technique/architecture]. Paper accepted at [venue].",
                },
                {
                  tag: "[Industry] Research Institution",
                  problem:
                    "[Institution description] had [specific research challenge] but lacked the engineering capacity to [specific gap].",
                  work: "We embedded a team of [X] researchers and engineers for [X] months. We [specific technical work].",
                  result:
                    "[Specific measurable outcome]. The system is now [current status]. [X] publications resulted from the engagement.",
                },
                {
                  tag: "[Industry] Company",
                  problem:
                    "[Company description] was generating [specific type of data/IP] but had no strategy for protecting or publishing it.",
                  work: "We audited their [specific technical area], identified [X] patentable innovations, and [specific actions taken].",
                  result:
                    "[X] patents filed. [X] papers published. Their R&D team now has a repeatable process for identifying and protecting novel work.",
                },
              ].map(({ tag, problem, work, result }) => (
                <StaggerItem key={tag} className="h-full">
                  <div className="glass-card card-hover rounded-2xl p-6 md:p-8 h-full flex flex-col gap-5">
                    <div className="font-sans text-black/30 text-[10px] tracking-[0.25em] uppercase">
                      {tag}
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                      <div>
                        <p className="font-sans text-black/25 text-[10px] tracking-[0.2em] uppercase mb-1.5">The Problem</p>
                        <p className="font-sans text-black/50 text-xs leading-relaxed">{problem}</p>
                      </div>
                      <div>
                        <p className="font-sans text-black/25 text-[10px] tracking-[0.2em] uppercase mb-1.5">What We Did</p>
                        <p className="font-sans text-black/50 text-xs leading-relaxed">{work}</p>
                      </div>
                      <div className="mt-auto pt-4 border-t border-black/[0.06]">
                        <p className="font-sans text-black/25 text-[10px] tracking-[0.2em] uppercase mb-1.5">The Result</p>
                        <p className="font-sans text-black/50 text-xs leading-relaxed">{result}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGrid>
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
                    Evlogia is an applied AI research lab. We exist to solve
                    hard technical problems, protect the IP that comes out of
                    that work, and publish the science that advances the field.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 md:gap-10">
                    {[
                      {
                        title: "We do the work.",
                        desc: "We don't advise on AI strategy and leave you to figure out the execution. We write the code, run the experiments, build the systems, and stand behind the results.",
                      },
                      {
                        title: "We protect what we build.",
                        desc: "Every engagement includes an IP review. If the work produces something novel — and it usually does — we file. Most firms treat patents as an afterthought. We treat them as a deliverable.",
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
              <div className="flex flex-col divide-y divide-black/[0.07]">
                {[
                  {
                    q: "Who owns the IP from an engagement?",
                    a: "You do. All intellectual property developed during a client engagement belongs to the client. We handle the patent filings and publication strategy, but the IP is yours. Our standard agreement makes this explicit.",
                  },
                  {
                    q: "What does a typical engagement look like?",
                    a: "Most engagements run [X] to [X] months. We start with a 2-to-4-week discovery phase to scope the problem and define success criteria. Then we move into parallel R&D and engineering sprints. You get weekly updates and access to all work in progress.",
                  },
                  {
                    q: "What kinds of problems are a good fit?",
                    a: "Problems where the answer doesn't already exist in the literature. If you can solve it with an off-the-shelf model and some fine-tuning, you probably don't need us. We're built for research-grade challenges that require novel approaches.",
                  },
                  {
                    q: "Do you work with startups or only enterprises?",
                    a: "We work with organizations that have real technical problems and the resources to act on the results. That includes enterprises, research institutions, and well-funded startups with serious R&D needs.",
                  },
                  {
                    q: "How do you handle confidentiality?",
                    a: "Every engagement starts with a mutual NDA. We don't share client work, datasets, or results without explicit written permission. When we publish research from an engagement, the client approves what's disclosed.",
                  },
                  {
                    q: "What does it cost?",
                    a: "Pricing depends on scope, team size, and duration. We price engagements on a project basis, not hourly. Book a call and we'll scope it together.",
                  },
                  {
                    q: "Can we start with a smaller pilot before a full engagement?",
                    a: "Yes. Most clients start with a focused discovery phase or a single research question. If the results warrant a larger engagement, we expand. No pressure either way.",
                  },
                ].map(({ q, a }) => (
                  <details key={q} className="group py-5">
                    <summary className="font-serif text-black/80 text-base md:text-lg leading-snug cursor-pointer list-none flex items-start justify-between gap-4" style={{ letterSpacing: "-0.01em" }}>
                      {q}
                      <span className="shrink-0 font-sans text-black/25 text-lg mt-0.5 group-open:rotate-45 transition-transform duration-200">+</span>
                    </summary>
                    <p className="font-sans text-black/45 text-sm leading-relaxed mt-3 max-w-xl">
                      {a}
                    </p>
                  </details>
                ))}
              </div>
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
                <div
                  className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(0,0,0,0.03), transparent 70%)",
                  }}
                />
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
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <a
                      href="/#book"
                      className="inline-flex items-center gap-2 sm:gap-3 glass rounded-full px-5 sm:px-8 py-3 sm:py-3.5 text-black/80 font-sans font-medium text-xs sm:text-sm border border-black/10 hover:bg-black/5 hover:scale-[1.03] transition-all duration-300"
                    >
                      Book a Strategy Call
                      <span className="text-black/35 text-xs">→</span>
                    </a>
                    <a
                      href="mailto:hello@evlogia.ai"
                      className="font-sans text-black/35 text-xs sm:text-sm hover:text-black/60 transition-colors duration-200"
                    >
                      hello@evlogia.ai
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
