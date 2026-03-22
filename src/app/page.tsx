import { HeroSection } from "@/components/hero-section";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedCounter } from "@/components/animated-counter";
import { BookingSection } from "@/components/booking-section";
import { LiquidGlassCard } from "@/components/liquid-glass";

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
      {/* ─── Nav — floating glass pill ─── */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
        <LiquidGlassCard
          glowIntensity="none"
          shadowIntensity="none"
          borderRadius="100px"
          blurIntensity="sm"
          draggable={false}
          className="p-0 w-full"
        >
          <nav
            className="liquid-glass rounded-full px-5 py-2.5 flex items-center justify-between gap-6"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}
          >
            {/* Logo — crop square canvas to just the combination mark */}
            <div
              className="shrink-0 overflow-hidden relative"
              style={{ width: "120px", height: "26px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/evlogia-combination-mark.png"
                alt="Evlogia"
                style={{
                  position: "absolute",
                  width: "130px",
                  height: "130px",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  filter: "invert(1)",
                  opacity: 0.85,
                }}
              />
            </div>

            {/* Links */}
            <div className="hidden md:flex items-center gap-7">
              {[
                { label: "About", href: "#about" },
                { label: "Services", href: "#services" },
                { label: "Research", href: "#research" },
                { label: "Book a Call", href: "#book" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="nav-link text-black/45 text-xs font-sans hover:text-black transition-colors duration-200 tracking-wide"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#book"
              className="liquid-glass rounded-full px-4 py-1.5 text-xs font-sans font-medium text-black/80 hover:bg-black/5 transition-all duration-200 whitespace-nowrap shrink-0"
            >
              Work With Us
            </a>
          </nav>
        </LiquidGlassCard>
      </header>

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
                  className="font-sans text-[11px] tracking-[0.2em] uppercase whitespace-nowrap"
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
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { target: 40, suffix: "+", label: "R&D Projects" },
              { target: 12, suffix: "+", label: "Patents Filed" },
              { target: 20, suffix: "+", label: "Papers Published" },
              { target: 8, suffix: "", label: "Industries Served" },
            ].map(({ target, suffix, label }, i) => (
              <ScrollReveal
                key={label}
                delay={i * 80}
                variant="scale"
                className="h-full"
              >
                <div className="glass-card card-hover rounded-2xl p-5 md:p-6 text-center h-full flex flex-col items-center justify-center min-h-[110px]">
                  <div className="font-serif text-black/90 text-3xl md:text-4xl mb-1.5 leading-none">
                    <AnimatedCounter target={target} suffix={suffix} />
                  </div>
                  <div className="font-sans text-black/35 text-[9px] md:text-[10px] tracking-widest uppercase leading-tight">
                    {label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="divider" />
          </ScrollReveal>
        </div>

        {/* ─── Services ─── */}
        <section id="services" className="px-6 py-12 md:py-28">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-10 md:mb-16">
              <p className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-3">
                What We Do
              </p>
              <h2
                className="font-serif text-black/90 leading-[1.07]"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                Four pillars.
                <br />
                <em>One partner.</em>
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-3 md:gap-4">
              {[
                {
                  num: "01",
                  title: "Applied AI R&D",
                  desc: "We embed with your team to tackle research-grade problems — from novel model architectures to domain-specific systems. Rigorous methodology, production mindset.",
                },
                {
                  num: "02",
                  title: "Product Development",
                  desc: "Research without a product is just a paper. We engineer the systems that bring AI capabilities to market — full-stack, scalable, and built to endure.",
                },
                {
                  num: "03",
                  title: "Patent Strategy & Filing",
                  desc: "We identify and protect novel IP before competitors do. Our work consistently surfaces patentable innovations across model design, training, and applications.",
                },
                {
                  num: "04",
                  title: "Research Publications",
                  desc: "We publish. Peer-reviewed papers, white papers, and technical reports — building scientific credibility alongside your commercial capability.",
                },
              ].map(({ num, title, desc }, i) => (
                <ScrollReveal key={title} delay={i * 80} className="h-full">
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
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal>
            <div className="divider" />
          </ScrollReveal>
        </div>

        {/* ─── Why Evlogia ─── */}
        <section id="about" className="px-6 py-12 md:py-28">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal variant="scale">
              <div className="glass-card rounded-3xl p-7 md:p-16 relative overflow-hidden">
                <div className="relative">
                  <p className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-4">
                    Why Evlogia
                  </p>
                  <h2
                    className="font-serif text-black/90 mb-5 leading-[1.07] max-w-2xl"
                    style={{
                      fontSize: "clamp(1.4rem, 4.5vw, 3.5rem)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Most consultants advise.
                    <br />
                    <em>We build, file, and publish.</em>
                  </h2>
                  <p className="font-sans text-black/40 text-sm leading-relaxed max-w-lg mb-8 md:mb-16">
                    The gap between AI research and production is where most
                    firms fail. We operate across the full spectrum — from
                    whiteboard to weight file to patent to paper — so nothing
                    gets lost in translation.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 md:gap-10">
                    {[
                      {
                        step: "01",
                        title: "Discover & Define",
                        desc: "Deep problem scoping with your domain experts and research leads. We find the real constraint before writing a line of code.",
                      },
                      {
                        step: "02",
                        title: "Research & Build",
                        desc: "Rigorous R&D cycles with production-grade engineering running in parallel — not sequentially. Velocity without shortcuts.",
                      },
                      {
                        step: "03",
                        title: "Ship & Protect",
                        desc: "Deploy, file patents, publish the research. Your IP stays yours. Your competitive advantage stays yours.",
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
          <ScrollReveal>
            <div className="divider" />
          </ScrollReveal>
        </div>

        {/* ─── Research & IP ─── */}
        <section id="research" className="px-6 py-12 md:py-28">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-10 md:mb-16">
              <p className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-3">
                Research & IP
              </p>
              <h2
                className="font-serif text-black/90 leading-[1.07] mb-4"
                style={{
                  fontSize: "clamp(2rem, 5vw, 4rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                Science is <em>our product.</em>
              </h2>
              <p className="font-sans text-black/40 text-sm max-w-sm mx-auto leading-relaxed">
                We contribute to the global AI research canon while protecting
                your competitive advantage through strategic IP filings.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-3 md:gap-4">
              {[
                {
                  label: "Publication Venues",
                  value: "NeurIPS · ICML · ICLR · AAAI · CVPR",
                  sub: "Peer-reviewed conference papers",
                },
                {
                  label: "Patent Portfolio",
                  value: "US · EU · International",
                  sub: "Filed, pending & granted",
                },
                {
                  label: "Research Domains",
                  value: "LLMs · Vision · Multimodal · Agents",
                  sub: "Active research areas",
                },
              ].map(({ label, value, sub }, i) => (
                <ScrollReveal key={label} delay={i * 80} className="h-full">
                  <div className="glass-card card-hover rounded-2xl p-6 md:p-8 text-center h-full flex flex-col items-center justify-center gap-2.5">
                    <div className="font-sans text-black/30 text-[10px] tracking-[0.25em] uppercase">
                      {label}
                    </div>
                    <div className="font-serif text-black/80 text-sm md:text-base leading-snug">
                      {value}
                    </div>
                    <div className="font-sans text-black/30 text-[10px] tracking-wide">
                      {sub}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

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
              <div className="glass-card rounded-3xl p-6 md:p-20 text-center relative overflow-hidden">
                <div
                  className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse, rgba(0,0,0,0.03), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <p className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-4">
                    Ready to Begin
                  </p>
                  <h2
                    className="font-serif text-black/90 leading-[1.07] mb-5"
                    style={{
                      fontSize: "clamp(1.4rem, 5vw, 3.8rem)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Let&apos;s solve something
                    <br />
                    <em className="text-gradient">worth publishing.</em>
                  </h2>
                  <p className="font-sans text-black/40 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                    Bring us your hardest AI problem. We&apos;ll scope it, build
                    it, patent it — and if the science warrants it, publish it.
                  </p>
                  <a
                    href="mailto:hello@evlogia.ai"
                    className="inline-flex items-center gap-3 glass rounded-full px-8 py-3.5 text-black/80 font-sans font-medium text-sm border border-black/10 hover:bg-black/5 hover:scale-[1.03] transition-all duration-300"
                  >
                    hello@evlogia.ai
                    <span className="text-black/35 text-xs">→</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer
        className="border-t px-6 pt-12 pb-10 md:pt-16 md:pb-14"
        style={{ borderColor: "rgba(0,0,0,0.08)" }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Brand + nav row */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-6 mb-10 md:mb-12">
            {/* Brand */}
            <div>
              <div
                className="shrink-0 overflow-hidden relative mb-3"
                style={{ width: "120px", height: "26px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/evlogia-combination-mark.png"
                  alt="Evlogia"
                  style={{
                    position: "absolute",
                    width: "130px",
                    height: "130px",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    filter: "invert(1)",
                    opacity: 0.7,
                  }}
                />
              </div>
              <p className="font-sans text-black/30 text-[11px] tracking-wide">
                Applied AI Research
              </p>
            </div>

            {/* Nav links */}
            <nav className="grid grid-cols-2 sm:flex sm:flex-row gap-y-3 gap-x-8 sm:gap-10">
              {[
                { label: "Services", href: "#services" },
                { label: "Research", href: "#research" },
                { label: "About", href: "#about" },
                { label: "Book a Call", href: "#book" },
                { label: "hello@evlogia.ai", href: "mailto:hello@evlogia.ai" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="font-sans text-black/40 text-xs hover:text-black/70 transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="divider mb-6" />

          {/* Copyright row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <p className="font-sans text-black/25 text-[11px]">
              © 2026 Evlogia. All rights reserved.
            </p>
            <p className="font-sans text-black/20 text-[11px]">Built by us.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
