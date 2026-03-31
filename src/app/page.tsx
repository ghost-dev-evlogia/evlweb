import Image from "next/image";
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

const clientLogos = [
  { src: "/10seconds.jpeg", name: "10 Seconds" },
  { src: "/Edoxi.jpeg", name: "Edoxi" },
  { src: "/Inspire.avif", name: "Inspire" },
  { src: "/Nitte.svg", name: "Nitte" },
  { src: "/aambianz.webp", name: "Aambianz" },
  { src: "/magniz.avif", name: "Magniz" },
  { src: "/oceancharge.webp", name: "Ocean Charge" },
  { src: "/sellmyplot.webp", name: "Sell My Plot" },
  { src: "/vanora.png", name: "Vanora" },
];

export default function Home() {
  return (
    <>
      <SiteNav />

      <main>
        {/* ─── Hero ─── */}
        <HeroSection />

        {/* ─── Client logos ─── */}
        <div className="border-y" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
          <div className="pt-5 pb-1">
            <p
              className="text-center font-sans text-[9px] tracking-[0.28em] uppercase mb-4"
              style={{ color: "rgba(0,0,0,0.22)" }}
            >
              Trusted by
            </p>
          </div>
          <div className="marquee-wrapper pb-5">
            <div
              className="marquee-track"
              style={{ animationDuration: "44s", gap: "3.5rem" }}
            >
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div
                  key={i}
                  className="relative h-7 w-24 shrink-0"
                  style={{ filter: "grayscale(1) brightness(0.15) opacity(0.45)" }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain"
                    sizes="96px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Stats ─── */}
        <section className="px-6 py-10 md:py-20">
          <StaggerGrid className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { target: 50, suffix: "+", label: "Systems Shipped" },
              { target: 20, suffix: "+", label: "Clients Served" },
              { target: 12, suffix: "+", label: "Patents Filed" },
              { target: 8, suffix: "", label: "Industries" },
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
                  { text: "Real systems." },
                  { text: "Not just R&D.", italic: true },
                ]}
                className="font-serif text-black/90 leading-[1.07]"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  letterSpacing: "-0.01em",
                }}
              />
            </div>

            <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {/* 01 — Product & Platform Engineering — featured wide */}
              <StaggerItem className="md:col-span-2 h-full">
                <div className="glass-card card-hover rounded-2xl p-6 md:p-9 relative overflow-hidden h-full">
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
                      Product & Platform Engineering
                    </h3>
                    <p className="font-sans text-black/50 text-sm md:text-[15px] leading-relaxed max-w-lg">
                      Websites, web apps, mobile apps, platforms. We scope it, design it, build it, and ship it — without you managing an in-house team.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* 02 — Internal Tools & Systems */}
              <StaggerItem className="h-full">
                <div className="glass-card card-hover rounded-2xl p-6 md:p-9 relative overflow-hidden h-full">
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
                    Internal Tools & Systems
                  </h3>
                  <p className="font-sans text-black/50 text-sm md:text-[15px] leading-relaxed">
                    Dashboards, admin panels, booking systems, workflow tools. The software your team actually depends on.
                  </p>
                </div>
              </StaggerItem>

              {/* 03 — Applied AI */}
              <StaggerItem className="h-full">
                <div className="glass-card card-hover rounded-2xl p-6 md:p-9 relative overflow-hidden h-full">
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
                    Applied AI
                  </h3>
                  <p className="font-sans text-black/50 text-sm md:text-[15px] leading-relaxed">
                    AI where it actually solves something. We integrate models into real products and build custom solutions when off-the-shelf doesn&apos;t cut it.
                  </p>
                </div>
              </StaggerItem>

              {/* 04 — Research & IP — featured wide */}
              <StaggerItem className="md:col-span-2 h-full">
                <div className="glass-card card-hover rounded-2xl p-6 md:p-9 relative overflow-hidden h-full">
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
                      Research & IP
                    </h3>
                    <p className="font-sans text-black/50 text-sm md:text-[15px] leading-relaxed mb-6 max-w-lg">
                      For clients working on frontier problems — we run experiments, file patents, and submit to peer-reviewed venues.
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
                  { text: "When you need to" },
                  { text: "go deeper.", italic: true },
                ]}
                className="font-serif text-black/90 leading-[1.07] mb-4"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  letterSpacing: "-0.01em",
                }}
              />
              <ScrollReveal>
                <p className="font-sans text-black/50 text-[15px] max-w-md mx-auto leading-relaxed">
                  For clients doing frontier work — we run the experiments, protect the IP, and publish what holds up.
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
                  <p className="font-sans text-black/50 text-[15px] leading-relaxed max-w-xl mb-10 md:mb-14">
                    We&apos;re a product and engineering team that builds real systems — products, platforms, internal tools, and applied AI. We&apos;ve shipped across industries and we own the outcome, not just the deliverable.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 md:gap-10">
                    {[
                      {
                        title: "We build, not advise.",
                        desc: "No strategy decks, no handoffs. We write the code and ship the system.",
                      },
                      {
                        title: "We own the outcome.",
                        desc: "Scope, build, ship. When something needs to change mid-engagement, we adapt — not disappear.",
                      },
                      {
                        title: "We protect what's novel.",
                        desc: "When the work produces something genuinely new, we file the IP. It's a deliverable, not an afterthought.",
                      },
                    ].map(({ title, desc }) => (
                      <div key={title}>
                        <h4 className="font-serif text-black/90 text-base md:text-lg mb-2">
                          {title}
                        </h4>
                        <p className="font-sans text-black/50 text-sm md:text-[15px] leading-relaxed">
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
                      { text: "Let's build something" },
                      { text: "worth using.", italic: true },
                    ]}
                    className="font-serif text-black/90 leading-[1.07] mb-5"
                    style={{
                      fontSize: "clamp(1.4rem, 5vw, 3.8rem)",
                      letterSpacing: "-0.01em",
                    }}
                  />
                  <p className="font-sans text-black/55 text-[15px] leading-relaxed mb-10 max-w-sm mx-auto">
                    Tell us what you need. We&apos;ll tell you if we&apos;re the right team for it.
                  </p>
                  <div className="flex justify-center">
                    <button
                      data-cal-link="ethankd/strategy"
                      data-cal-namespace="strategy"
                      data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
                      className="inline-flex items-center gap-2 sm:gap-3 glass rounded-full px-5 sm:px-8 py-3 sm:py-3.5 text-black/80 font-sans font-medium text-xs sm:text-sm border border-black/10 hover:bg-black/5 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
                    >
                      Start a Conversation
                      <span className="text-black/35 text-xs">→</span>
                    </button>
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
