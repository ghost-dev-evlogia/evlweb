import Image from "next/image";
import { HeroSection } from "@/components/hero-section";
import { AnimatedCounter } from "@/components/animated-counter";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { SplitHeading } from "@/components/split-heading";
import { StaggerGrid, StaggerItem } from "@/components/stagger-grid";
import { MotionDivider } from "@/components/motion-divider";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Testimonials } from "@/components/testimonials";
import { TeamPortrait } from "@/components/team-portrait";
import { FAQ } from "@/components/faq";
import { HowWeWork } from "@/components/how-we-work";

// t = filter treatment:
//   "normal"    – transparent bg, dark/coloured marks  → plain grayscale
//   "white-bg"  – white/light bg, dark marks           → multiply removes the bg
//   "dark-bg"   – solid coloured bg, light marks       → invert + multiply
//   "invert"    – transparent bg, white/light marks    → invert so marks go dark
const clientLogos = [
  { src: "/10seconds.jpeg", name: "10 Seconds",  t: "white-bg" },
  { src: "/Edoxi.jpeg",     name: "Edoxi",       t: "dark-bg"  },
  { src: "/Inspire.avif",   name: "Inspire",     t: "normal"   },
  { src: "/Nitte.svg",      name: "Nitte",       t: "normal"   },
  { src: "/aambianz.webp",  name: "Aambianz",    t: "normal"   },
  { src: "/magniz.avif",    name: "Magniz",      t: "normal"   },
  { src: "/oceancharge.webp", name: "Ocean Charge", t: "invert" },
  { src: "/sellmyplot.webp",  name: "Sell My Plot", t: "invert" },
  { src: "/vanora.png",     name: "Vanora",      t: "invert"   },
];

export default function Home() {
  return (
    <>
      <SiteNav />

      <main id="main">
        {/* ─── Hero ─── */}
        <HeroSection />

        {/* ─── Client logos ─── */}
        <section
          aria-label="Companies we've worked with"
          className="border-y py-10 md:py-12"
          style={{ borderColor: "rgba(0,0,0,0.07)" }}
        >
          {/* Eyebrow — centered pill above the marquee, separated by enough
              vertical breathing room that it never overlaps the logos */}
          <div className="text-center mb-7 md:mb-9">
            <span className="inline-flex font-sans text-black/75 text-[11px] tracking-[0.22em] uppercase rounded-full bg-black/[0.04] px-3 py-1 border border-black/[0.06]">
              Trusted by
            </span>
          </div>
          {/* Visual marquee — decorative duplicate, hidden from AT.
              Edge-fade mask softens where logos enter / exit. */}
          <div
            className="marquee-wrapper"
            aria-hidden="true"
            role="presentation"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
            }}
          >
            <div
              className="marquee-track"
              style={{ animationDuration: "44s", gap: "3.5rem" }}
            >
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div
                  key={i}
                  className="relative h-7 w-24 shrink-0"
                  style={
                    logo.t === "white-bg"
                      ? { filter: "grayscale(1) opacity(0.55)", mixBlendMode: "multiply" }
                      : logo.t === "dark-bg"
                      ? { filter: "grayscale(1) invert(1) opacity(0.5)", mixBlendMode: "multiply" }
                      : logo.t === "invert"
                      ? { filter: "grayscale(1) invert(1) opacity(0.45)" }
                      : { filter: "grayscale(1) opacity(0.4)" }
                  }
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
          {/* Accessible client list — visually hidden, surfaces names to AT/SEO */}
          <ul className="sr-only">
            {clientLogos.map((logo) => (
              <li key={logo.name}>{logo.name}</li>
            ))}
          </ul>
        </section>

        {/* ─── Stats ─── */}
        <section className="px-6 py-16 md:py-28">
          <p className="max-w-4xl mx-auto text-center font-sans text-black/55 text-[11px] tracking-[0.18em] uppercase mb-6">
            Track record · across 8 industries since 2021
          </p>
          <StaggerGrid className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { target: 50, suffix: "+", label: "Systems Shipped" },
              { target: 20, suffix: "+", label: "Clients Served" },
              { target: 10, suffix: "+", label: "Production AI Builds" },
              { target: 8, suffix: "", label: "Industries Served" },
            ].map(({ target, suffix, label }) => (
              <StaggerItem key={label} className="h-full">
                <div className="doppelrand h-full">
                  <div className="doppelrand-inner card-hover p-5 md:p-6 text-center h-full flex flex-col items-center justify-center min-h-[110px]">
                    <div className="font-serif text-black/90 text-3xl md:text-4xl mb-1.5 leading-none">
                      <AnimatedCounter target={target} suffix={suffix} />
                    </div>
                    <div className="font-sans text-black/75 text-[11px] md:text-[11px] tracking-widest uppercase leading-tight">
                      {label}
                    </div>
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
        <section id="services" className="scroll-mt-20 px-6 py-32 md:py-48">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 items-end gap-8 mb-14 md:mb-20">
              <div className="md:col-span-7">
                <SplitHeading
                  lines={[
                    { text: "Real systems." },
                    { text: "Not just R&D.", italic: true },
                  ]}
                  className="font-serif text-black/90 leading-[1.02]"
                  style={{
                    fontSize: "clamp(2.25rem, 6vw, 5rem)",
                    letterSpacing: "-0.015em",
                  }}
                />
              </div>
              <div className="md:col-span-4 md:col-start-9 md:pb-3">
                <ScrollReveal>
                  <p className="font-sans text-black/80 text-[15px] leading-relaxed [text-wrap:pretty]">
                    Five practices, one team. The work below is everything we
                    actually ship — scoped, built, handed off.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            <StaggerGrid
              className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
              style={{ gridAutoFlow: "dense" }}
            >
              {/* 01 — Product & Platform Engineering — featured wide */}
              <StaggerItem className="md:col-span-2 h-full">
                <div className="doppelrand h-full">
                  <div className="doppelrand-inner card-hover p-6 md:p-9 relative overflow-hidden h-full">
                    <div
                      className="absolute -right-4 -bottom-6 font-serif text-black/[0.04] leading-none select-none pointer-events-none"
                      style={{ fontSize: "clamp(6rem, 12vw, 10rem)" }}
                      aria-hidden
                    >
                      01
                    </div>
                    <div className="relative">
                      <div className="font-sans text-black/40 text-[11px] tracking-widest mb-5">01</div>
                      <h3
                        className="font-serif text-black/90 text-2xl md:text-3xl mb-4 leading-snug"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        Product & Platform Engineering
                      </h3>
                      <p className="font-sans text-black/75 text-sm md:text-[15px] leading-relaxed max-w-lg">
                        Websites, web apps, mobile apps, platforms. We scope it, design it, build it, and ship it. No in-house team to manage.
                      </p>
                      <p className="font-sans text-black/65 text-[11px] tracking-wide mt-4 pt-3 border-t border-black/[0.06] max-w-lg">
                        Typical engagement · 8–24 weeks · fixed scope · shipped product + handoff
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* 02 — Internal Tools & Systems */}
              <StaggerItem className="h-full">
                <div className="doppelrand h-full">
                  <div className="doppelrand-inner card-hover p-6 md:p-9 relative overflow-hidden h-full">
                    <div
                      className="absolute -right-3 -bottom-5 font-serif text-black/[0.04] leading-none select-none pointer-events-none"
                      style={{ fontSize: "clamp(5rem, 9vw, 8rem)" }}
                      aria-hidden
                    >
                      02
                    </div>
                    <div className="font-sans text-black/40 text-[11px] tracking-widest mb-5">02</div>
                    <h3
                      className="font-serif text-black/90 text-xl md:text-2xl mb-3 leading-snug"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      Internal Tools & Systems
                    </h3>
                    <p className="font-sans text-black/75 text-sm md:text-[15px] leading-relaxed">
                      Dashboards, admin panels, booking systems, workflow tools. The software your team actually depends on.
                    </p>
                    <p className="font-sans text-black/65 text-[11px] tracking-wide mt-4 pt-3 border-t border-black/[0.06]">
                      4–10 weeks · fixed scope
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* 03 — Applied AI */}
              <StaggerItem className="h-full">
                <div className="doppelrand h-full">
                  <div className="doppelrand-inner card-hover p-6 md:p-9 relative overflow-hidden h-full">
                    <div
                      className="absolute -right-3 -bottom-5 font-serif text-black/[0.04] leading-none select-none pointer-events-none"
                      style={{ fontSize: "clamp(5rem, 9vw, 8rem)" }}
                      aria-hidden
                    >
                      03
                    </div>
                    <div className="font-sans text-black/40 text-[11px] tracking-widest mb-5">03</div>
                    <h3
                      className="font-serif text-black/90 text-xl md:text-2xl mb-3 leading-snug"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      Applied AI
                    </h3>
                    <p className="font-sans text-black/75 text-sm md:text-[15px] leading-relaxed">
                      AI where it actually solves something. We integrate models into real products and build custom solutions when off-the-shelf doesn&apos;t cut it.
                    </p>
                    <p className="font-sans text-black/65 text-[11px] tracking-wide mt-4 pt-3 border-t border-black/[0.06]">
                      Pilots 4–6 weeks · production builds 3–6 months
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* 04 — IoT & Connected Devices */}
              <StaggerItem className="h-full">
                <div className="doppelrand h-full">
                  <div className="doppelrand-inner card-hover p-6 md:p-9 relative overflow-hidden h-full">
                    <div
                      className="absolute -right-3 -bottom-5 font-serif text-black/[0.04] leading-none select-none pointer-events-none"
                      style={{ fontSize: "clamp(5rem, 9vw, 8rem)" }}
                      aria-hidden
                    >
                      04
                    </div>
                    <div className="font-sans text-black/40 text-[11px] tracking-widest mb-5">04</div>
                    <h3
                      className="font-serif text-black/90 text-xl md:text-2xl mb-3 leading-snug"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      IoT & Connected Devices
                    </h3>
                    <p className="font-sans text-black/75 text-sm md:text-[15px] leading-relaxed">
                      Sensor pipelines, embedded firmware, connected hardware. From prototype through production.
                    </p>
                    <p className="font-sans text-black/65 text-[11px] tracking-wide mt-4 pt-3 border-t border-black/[0.06]">
                      Prototype 6–10 weeks · production 4–8 months
                    </p>
                  </div>
                </div>
              </StaggerItem>

              {/* 05 — Agentic AI Coaching */}
              <StaggerItem className="h-full">
                <div className="doppelrand h-full">
                  <div className="doppelrand-inner card-hover p-6 md:p-9 relative overflow-hidden h-full">
                    <div
                      className="absolute -right-3 -bottom-5 font-serif text-black/[0.04] leading-none select-none pointer-events-none"
                      style={{ fontSize: "clamp(5rem, 9vw, 8rem)" }}
                      aria-hidden
                    >
                      05
                    </div>
                    <div className="font-sans text-black/40 text-[11px] tracking-widest mb-5">05</div>
                    <h3
                      className="font-serif text-black/90 text-xl md:text-2xl mb-3 leading-snug"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      Agentic AI Coaching
                    </h3>
                    <p className="font-sans text-black/75 text-sm md:text-[15px] leading-relaxed">
                      We embed engineers inside your teams to coach AI-first practices across the full SDLC. Real delivery work, sustained behavior change.
                    </p>
                    <p className="font-sans text-black/65 text-[11px] tracking-wide mt-4 pt-3 border-t border-black/[0.06]">
                      Embed 12–26 weeks · 1–3 engineers
                    </p>
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
        <section id="how-we-work" className="scroll-mt-20 px-6 py-24 md:py-32">
          <div className="max-w-5xl mx-auto">
            <HowWeWork />
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <MotionDivider />
        </div>

        {/* ─── Technical Depth ─── secondary section, lighter weight than Services ─── */}
        <section id="depth" className="scroll-mt-20 px-6 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 items-end gap-8 mb-10 md:mb-14">
              <div className="md:col-span-8">
                <SplitHeading
                  lines={[
                    { text: "When the problem is" },
                    { text: "genuinely hard.", italic: true },
                  ]}
                  className="font-serif text-black/90 leading-[1.02]"
                  style={{
                    fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)",
                    letterSpacing: "-0.015em",
                  }}
                />
              </div>
              <div className="md:col-span-4 md:pb-3">
                <ScrollReveal>
                  <p className="font-sans text-black/80 text-[15px] leading-relaxed [text-wrap:pretty]">
                    Some work asks for more than a standard build. AI systems,
                    connected hardware, multi-tenant platforms — where the
                    technical bar <em className="font-serif italic text-black/90">is</em> the brief.
                  </p>
                </ScrollReveal>
              </div>
            </div>

            <StaggerGrid className="grid md:grid-cols-3 gap-3 md:gap-4">
              {/* Applied AI card */}
              <StaggerItem className="h-full">
                <div className="doppelrand h-full">
                  <div className="doppelrand-inner card-hover p-6 md:p-8 h-full flex flex-col gap-4">
                    <div className="font-sans text-black/85 text-[11px] tracking-[0.25em] uppercase">
                      Applied AI
                    </div>
                    <p className="font-sans text-black/75 text-sm leading-relaxed">
                      Production AI systems, not prototypes. LLMs, computer vision, multimodal pipelines, and retrieval infrastructure. Built to run in the real world.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {["LLMs", "Vision", "Multimodal", "Agents", "RAG"].map((v) => (
                        <span
                          key={v}
                          className="font-sans text-[11px] tracking-wide text-black/65 border border-black/10 rounded-full px-2.5 py-0.5"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* IoT card */}
              <StaggerItem className="h-full">
                <div className="doppelrand h-full">
                  <div className="doppelrand-inner card-hover p-6 md:p-8 h-full flex flex-col gap-4">
                    <div className="font-sans text-black/85 text-[11px] tracking-[0.25em] uppercase">
                      IoT & Hardware
                    </div>
                    <p className="font-sans text-black/75 text-sm leading-relaxed">
                      Connected hardware that does what it&apos;s supposed to. Sensor pipelines, embedded firmware, cloud-connected devices. We&apos;ve built things worth building properly.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {["Firmware", "Sensors", "Edge", "Protocols", "Cloud"].map((v) => (
                        <span
                          key={v}
                          className="font-sans text-[11px] tracking-wide text-black/65 border border-black/10 rounded-full px-2.5 py-0.5"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Complex Platforms card */}
              <StaggerItem className="h-full">
                <div className="doppelrand h-full">
                  <div className="doppelrand-inner card-hover p-6 md:p-8 h-full flex flex-col gap-4">
                    <div className="font-sans text-black/85 text-[11px] tracking-[0.25em] uppercase">
                      Complex Platforms
                    </div>
                    <p className="font-sans text-black/75 text-sm leading-relaxed">
                      Multi-tenant systems, high-stakes data flows, and platforms where getting the architecture wrong is expensive. We&apos;ve built them and handed them off clean.
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {["Multi-tenant", "APIs", "Data pipelines", "Infrastructure"].map((v) => (
                        <span
                          key={v}
                          className="font-sans text-[11px] tracking-wide text-black/65 border border-black/10 rounded-full px-2.5 py-0.5"
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

        {/* ─── Testimonials ─── */}
        <section id="testimonials" className="scroll-mt-20 px-6 py-32 md:py-48">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-2">
              <SplitHeading
                lines={[
                  { text: "Trusted by teams" },
                  { text: "that build seriously.", italic: true },
                ]}
                className="font-serif text-black/90 leading-[1.02]"
                style={{
                  fontSize: "clamp(2.25rem, 6vw, 5rem)",
                  letterSpacing: "-0.015em",
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

        {/* ─── About + Team (consolidated) ─── */}
        {/* TODO: drop real photos at /arjun.jpg, /aneesh.jpg, /karthik.jpg — initials fall back automatically */}
        <section id="about" className="scroll-mt-20 px-6 py-32 md:py-48">
          <div className="max-w-6xl mx-auto">
            {/* Editorial intro: headline left, manifesto right */}
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-20 md:mb-28">
              <div className="md:col-span-7">
                <SplitHeading
                  lines={[
                    { text: "Built by people" },
                    { text: "who ship.", italic: true },
                  ]}
                  className="font-serif text-black/90 leading-[1.02] mb-7"
                  style={{
                    fontSize: "clamp(2.25rem, 6.5vw, 5.5rem)",
                    letterSpacing: "-0.02em",
                  }}
                />
                <ScrollReveal>
                  <p className="font-sans text-black/80 text-[17px] md:text-[18px] leading-relaxed max-w-xl [text-wrap:pretty]">
                    A product and engineering team. We scope, build, and ship —
                    web, mobile, internal platforms, applied AI, IoT.
                    You work directly with the people writing the code,
                    not an account manager between you and the work.
                  </p>
                </ScrollReveal>
              </div>

              <div className="md:col-span-5 md:pt-3 grid sm:grid-cols-2 md:grid-cols-1 gap-7 md:gap-10">
                {[
                  {
                    title: "We build, not advise.",
                    desc: "No strategy decks, no handoffs to someone else. We write the code and ship the system.",
                  },
                  {
                    title: "We own the outcome.",
                    desc: "Scope shifts mid-engagement, we adapt. We don't disappear into a Jira backlog.",
                  },
                  {
                    title: "We protect what's novel.",
                    desc: "If the work produces something genuinely new, we file the IP. It's a deliverable, not an afterthought.",
                  },
                ].map(({ title, desc }) => (
                  <ScrollReveal key={title}>
                    <div className="border-t border-black/[0.08] pt-4">
                      <h4 className="font-serif text-black/90 text-lg md:text-xl mb-2 leading-snug">
                        {title}
                      </h4>
                      <p className="font-sans text-black/75 text-[14px] md:text-[15px] leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Co-founder grid — bento with portrait + bio rows */}
            <div id="team" className="scroll-mt-20">
              <StaggerGrid
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
                style={{ gridAutoFlow: "dense" }}
              >
                {[
                  {
                    name: "Arjun",
                    initials: "A",
                    role: "Engineering",
                    bio: "Distributed systems, platform architecture. Owns the heaviest infrastructure work.",
                    photo: "/arjun.jpg",
                    linkedin: "https://linkedin.com/in/arjun",
                  },
                  {
                    name: "Aneesh",
                    initials: "An",
                    role: "Applied AI",
                    bio: "Production AI, end-to-end. LLM, vision, and retrieval systems from problem framing through deployment.",
                    photo: "/aneesh.jpg",
                    linkedin: "https://linkedin.com/in/aneesh",
                  },
                  {
                    name: "Ethan",
                    initials: "E",
                    role: "Product & Delivery",
                    bio: "Web, mobile, IoT. Turns ambiguous problems into shipped systems on a clear timeline.",
                    photo: "/founder.JPG",
                    linkedin: "https://linkedin.com/in/ethankd",
                  },
                  {
                    name: "Karthik",
                    initials: "K",
                    role: "Hardware & Systems",
                    bio: "Embedded firmware, IoT. Connected devices and sensor pipelines, prototype to production.",
                    photo: "/karthik.jpg",
                    linkedin: "https://linkedin.com/in/karthik",
                  },
                ].map(({ name, initials, role, bio, photo, linkedin }) => (
                  <StaggerItem key={name} className="h-full">
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full"
                      aria-label={`${name}, ${role} — open LinkedIn`}
                    >
                      <div className="doppelrand h-full">
                        <div className="doppelrand-inner card-hover p-5 md:p-6 h-full flex flex-col">
                          {/* Square portrait — graceful initials fallback if photo missing */}
                          <TeamPortrait
                            src={photo}
                            alt={`${name}, ${role} co-founder of Evlogia`}
                            initials={initials}
                          />

                          <h3
                            className="font-serif text-black/90 text-xl md:text-2xl leading-tight"
                            style={{ letterSpacing: "-0.01em" }}
                          >
                            {name}
                          </h3>
                          <p className="font-sans text-black/65 text-[11px] tracking-[0.16em] uppercase mt-1.5 mb-3">
                            {role}
                          </p>
                          <p className="font-sans text-black/75 text-[13px] md:text-[14px] leading-relaxed flex-1">
                            {bio}
                          </p>

                          <span className="font-sans text-black/55 text-[11px] inline-flex items-center gap-1.5 mt-4 pt-3 border-t border-black/[0.06] self-start group-hover:text-black/90 transition-colors duration-300">
                            LinkedIn
                            <span className="text-[10px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px">↗</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  </StaggerItem>
                ))}
              </StaggerGrid>
            </div>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <MotionDivider />
        </div>

        {/* ─── FAQ ─── */}
        <section id="faq" className="scroll-mt-20 px-6 py-32 md:py-48">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-8 md:gap-14 items-start">
              <div className="md:col-span-5 md:sticky md:top-32">
                <SplitHeading
                  lines={[
                    { text: "Questions we" },
                    { text: "get asked.", italic: true },
                  ]}
                  className="font-serif text-black/90 leading-[1.02] mb-5"
                  style={{
                    fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
                    letterSpacing: "-0.015em",
                  }}
                />
                <ScrollReveal>
                  <p className="font-sans text-black/75 text-[15px] leading-relaxed max-w-sm">
                    Don&apos;t see yours? <a href="mailto:hello@evlogia.ai" className="text-black/90 underline decoration-black/30 underline-offset-4 hover:decoration-black/90 transition-colors">Email us directly</a>.
                  </p>
                </ScrollReveal>
              </div>

              <div className="md:col-span-7">
                <ScrollReveal>
                  <FAQ />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Divider ─── */}
        <div className="max-w-5xl mx-auto px-6">
          <MotionDivider />
        </div>

        {/* ─── CTA — editorial close ─── */}
        <section id="contact" className="px-6 pb-32 md:pb-48 pt-16 md:pt-24">
          <div className="max-w-5xl mx-auto text-center">
            <SplitHeading
              lines={[
                { text: "Let's build something" },
                { text: "worth using.", italic: true },
              ]}
              className="font-serif text-black/90 leading-[1.0] mb-8 md:mb-10"
              style={{
                fontSize: "clamp(2.5rem, 9vw, 8rem)",
                letterSpacing: "-0.025em",
              }}
            />
            <ScrollReveal>
              <p className="font-sans text-black/80 text-[16px] md:text-[18px] leading-relaxed mb-12 md:mb-14 max-w-md mx-auto [text-wrap:pretty]">
                Tell us what you need. We&apos;ll tell you if we&apos;re the right
                team to build it — and if not, we&apos;ll point you somewhere that is.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
                <button
                  data-cal-link="ethankd/strategy"
                  data-cal-namespace="strategy"
                  data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
                  className="group inline-flex items-center gap-3 rounded-full pl-7 pr-2.5 py-2.5 bg-[#0a0a0a] text-white font-sans text-sm font-medium hover:bg-black active:scale-[0.98] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer"
                >
                  Book a 30-min call
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                    <span className="text-white/85 text-xs">&#8599;</span>
                  </span>
                </button>
                <a
                  href="mailto:hello@evlogia.ai"
                  className="font-sans text-black/85 text-sm hover:text-black underline decoration-black/30 underline-offset-4 hover:decoration-black transition-colors"
                >
                  Or email hello@evlogia.ai
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
