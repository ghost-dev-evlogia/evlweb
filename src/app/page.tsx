import Image from "next/image";
import Link from "next/link";
import { FarmHero } from "@/components/farm/farm-hero";
import { PixelSprite } from "@/components/farm/pixel-sprite";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedCounter } from "@/components/animated-counter";
import { Testimonials } from "@/components/testimonials";
import { TeamPortrait } from "@/components/team-portrait";
import { FAQ } from "@/components/faq";
import { HowWeWork } from "@/components/how-we-work";
import { ScrollReveal } from "@/components/scroll-reveal";
import { T } from "@/farm/tiles.ts";

// t = filter treatment for logo marks on the light paper background
const clientLogos = [
  { src: "/10seconds.jpeg", name: "10 Seconds", t: "white-bg" },
  { src: "/Edoxi.jpeg", name: "Edoxi", t: "dark-bg" },
  { src: "/Inspire.avif", name: "Inspire", t: "normal" },
  { src: "/Nitte.svg", name: "Nitte", t: "normal" },
  { src: "/aambianz.webp", name: "Aambianz", t: "normal" },
  { src: "/magniz.avif", name: "Magniz", t: "normal" },
  { src: "/oceancharge.webp", name: "Ocean Charge", t: "invert" },
  { src: "/sellmyplot.webp", name: "Sell My Plot", t: "invert" },
  { src: "/vanora.png", name: "Vanora", t: "invert" },
];

const services = [
  {
    id: "product",
    icon: T.crop.wheat[3],
    title: "Product & Platform Engineering",
    desc: "Websites, apps, platforms. We own the full build. You don't end up managing four vendors who don't talk to each other.",
    meta: "Typical engagement · 8–24 weeks · fixed scope · shipped product + handoff",
  },
  {
    id: "internal-tools",
    icon: T.crop.beet[3],
    title: "Internal Tools & Systems",
    desc: "Dashboards, admin panels, booking systems, workflow tools. The software your team actually depends on.",
    meta: "4–10 weeks · fixed scope",
  },
  {
    id: "applied-ai",
    icon: T.biome.sunflower,
    title: "Applied AI",
    desc: "AI where it actually solves something. We integrate models into real products and build custom solutions when off-the-shelf doesn't cut it.",
    meta: "Pilots 4–6 weeks · production builds 3–6 months",
  },
  {
    id: "iot",
    icon: T.crop.wheat[2],
    title: "IoT & Connected Devices",
    desc: "Sensor pipelines, embedded firmware, connected hardware. From prototype through production.",
    meta: "Prototype 6–10 weeks · production 4–8 months",
  },
  {
    id: "coaching",
    icon: T.crop.wheat[0],
    title: "Agentic AI Coaching",
    desc: "We sit inside your team, write real code, and ship alongside your engineers. Six months in, they just work differently. That's the point.",
    meta: "Embed 12–26 weeks · 1–3 engineers",
  },
];

const depth = [
  {
    label: "Applied AI",
    icon: T.biome.sunflower,
    desc: "Production AI systems, not prototypes. LLMs, computer vision, multimodal pipelines, and retrieval infrastructure. Built to run in the real world.",
    tags: ["LLMs", "Vision", "Multimodal", "Agents", "RAG"],
  },
  {
    label: "IoT & Hardware",
    icon: T.chest,
    desc: "Connected hardware that does what it's supposed to. Sensor pipelines, embedded firmware, cloud-connected devices. We've built things worth building properly.",
    tags: ["Firmware", "Sensors", "Edge", "Protocols", "Cloud"],
  },
  {
    label: "Complex Platforms",
    icon: T.coop,
    desc: "Multi-tenant systems, high-stakes data flows, and platforms where getting the architecture wrong is expensive. We've built them and handed them off clean.",
    tags: ["Multi-tenant", "APIs", "Data pipelines", "Infrastructure"],
  },
];

const team = [
  {
    name: "Arjun",
    initials: "A",
    role: "Engineering",
    bio: "Distributed systems, platform architecture. Owns the heaviest infrastructure work.",
    photo: "/arjun.jpg",
    linkedin: "https://linkedin.com/in/arjun",
    sprite: T.cow.idle[0],
  },
  {
    name: "Aneesh",
    initials: "An",
    role: "Applied AI",
    bio: "Production AI, end-to-end. LLM, vision, and retrieval systems from problem framing through deployment.",
    photo: "/aneesh.jpg",
    linkedin: "https://linkedin.com/in/aneesh",
    sprite: T.biome.sunflower,
  },
  {
    name: "Ethan",
    initials: "E",
    role: "Product & Delivery",
    bio: "Web, mobile, IoT. Turns ambiguous problems into shipped systems on a clear timeline.",
    photo: "/founder.JPG",
    linkedin: "https://linkedin.com/in/ethankd",
    sprite: T.chicken.idle[0],
  },
  {
    name: "Karthik",
    initials: "K",
    role: "Hardware & Systems",
    bio: "Embedded firmware, IoT. Connected devices and sensor pipelines, prototype to production.",
    photo: "/karthik.jpg",
    linkedin: "https://linkedin.com/in/karthik",
    sprite: T.chest,
  },
];

export default function Home() {
  return (
    <>
      <SiteNav />

      <main id="main">
        {/* ─── Hero: the explorable farm, headline floating HUD-style ─── */}
        <section
          className="sky-dawn relative overflow-hidden"
          style={{ height: "clamp(600px, 94vh, 920px)", paddingTop: "3.5rem" }}
        >
          <div className="absolute inset-0 top-14">
            <FarmHero>
              <div
                className="absolute z-20 left-1/2 -translate-x-1/2 text-center panel-wood pixel-corners"
                style={{ top: "3%", width: "min(92vw, 600px)" }}
              >
                <div className="panel-paper px-5 py-5 md:px-8 md:py-6">
                  <p className="pixel-chip mb-3">Evlogia · Applied AI Engineering</p>
                  <h1
                    className="font-display text-ink leading-[1.08]"
                    style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.6rem)" }}
                  >
                    We build systems
                    <br />
                    that get used.
                  </h1>
                  <p className="font-sans text-ink-2 text-[14px] md:text-[15px] leading-relaxed max-w-md mx-auto mt-2.5">
                    Production AI, internal tools, IoT, and platforms — scoped
                    properly, built cleanly, shipped on time.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                    <button
                      data-cal-link="ethankd/strategy"
                      data-cal-namespace="strategy"
                      data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
                      className="pixel-btn"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Book a 30-min call
                    </button>
                    <a
                      href="/services"
                      className="pixel-btn pixel-btn--wood"
                      style={{ fontSize: "0.9rem" }}
                    >
                      Walk the fields
                    </a>
                  </div>
                  <p className="font-sans text-ink-3 text-[11px] mt-3">
                    Hover a field plot to see what it grows ↓
                  </p>
                </div>
              </div>
            </FarmHero>
          </div>
        </section>

        {/* ─── Client logos ─── */}
        <section aria-label="Companies we've worked with" className="py-12">
          <div className="text-center mb-8">
            <span className="pixel-chip">Trusted by</span>
          </div>
          <div
            className="marquee-wrapper"
            aria-hidden="true"
            role="presentation"
          >
            <div className="marquee-track" style={{ animationDuration: "44s", gap: "3.5rem" }}>
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
                  <Image src={logo.src} alt={logo.name} fill className="object-contain" sizes="96px" />
                </div>
              ))}
            </div>
          </div>
          <ul className="sr-only">
            {clientLogos.map((logo) => (
              <li key={logo.name}>{logo.name}</li>
            ))}
          </ul>
        </section>

        {/* ─── Stats: the harvest tally ─── */}
        <section className="px-6 py-14 md:py-20">
          <p className="max-w-4xl mx-auto text-center font-display text-ink-3 text-[12px] tracking-[0.14em] uppercase mb-6">
            Track record · across 8 industries since 2021
          </p>
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { target: 50, suffix: "+", label: "Systems Shipped", icon: T.crop.wheatItem },
              { target: 20, suffix: "+", label: "Clients Served", icon: T.biome.apple },
              { target: 10, suffix: "+", label: "Production AI Builds", icon: T.biome.flowerBigYellow },
              { target: 8, suffix: "", label: "Industries Served", icon: T.biome.acorn },
            ].map(({ target, suffix, label, icon }) => (
              <ScrollReveal key={label}>
                <div className="panel-wood pixel-corners h-full">
                  <div className="panel-paper px-4 py-5 text-center h-full flex flex-col items-center justify-center min-h-[120px]">
                    <PixelSprite tile={icon} scale={2} className="mb-2" />
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

        <div className="max-w-5xl mx-auto px-6"><div className="pixel-divider" /></div>

        {/* ─── Services: the fields ─── */}
        <section id="services" className="scroll-mt-20 px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="pixel-chip mb-4">The fields</p>
              <h2 className="font-display text-ink leading-tight" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}>
                Real systems. Not just R&D.
              </h2>
              <p className="font-sans text-ink-2 text-[15px] leading-relaxed max-w-md mx-auto mt-3">
                One team across the whole stack. The person who scoped it is the
                person who reviews the PR.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map(({ id, icon, title, desc, meta }, i) => (
                <ScrollReveal key={id} className={i === 0 ? "md:col-span-2" : ""}>
                  <Link href={`/services#${id}`} className="group block h-full">
                    <div className="panel-wood pixel-corners h-full transition-transform duration-150 group-hover:-translate-y-1">
                      <div className="panel-paper px-6 py-7 h-full flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <PixelSprite tile={icon} scale={2} />
                          <span className="font-display text-ink-4 text-xs">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                        <h3 className="font-display text-ink text-lg md:text-xl leading-snug mb-2.5">{title}</h3>
                        <p className="font-sans text-ink-2 text-sm md:text-[15px] leading-relaxed flex-1">{desc}</p>
                        <p className="font-sans text-ink-3 text-[11px] tracking-wide mt-4 pt-3" style={{ borderTop: "2px solid var(--wood-pale)" }}>
                          {meta}
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6"><div className="pixel-divider" /></div>

        {/* ─── How we work: plant → grow → harvest ─── */}
        <section id="how-we-work" className="scroll-mt-20 px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto">
            <HowWeWork />
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6"><div className="pixel-divider" /></div>

        {/* ─── Technical depth ─── */}
        <section id="depth" className="scroll-mt-20 px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <p className="pixel-chip mb-4">The greenhouse</p>
              <h2 className="font-display text-ink leading-tight" style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)" }}>
                When the problem is genuinely hard.
              </h2>
              <p className="font-sans text-ink-2 text-[15px] leading-relaxed max-w-lg mx-auto mt-3">
                A lot of what we do follows a known pattern. Some engagements
                don&apos;t. Novel AI architectures, hardware nobody&apos;s built
                before, platforms where the data model is itself the unsolved
                problem. We&apos;re good at those.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {depth.map(({ label, desc, tags }) => (
                <ScrollReveal key={label}>
                  <div className="panel-wood pixel-corners h-full">
                    <div className="panel-paper px-6 py-6 h-full flex flex-col gap-4">
                      <div className="font-display text-ink text-[13px] tracking-[0.18em] uppercase">{label}</div>
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

        <div className="max-w-5xl mx-auto px-6"><div className="pixel-divider" /></div>

        {/* ─── Testimonials ─── */}
        <section id="testimonials" className="scroll-mt-20 px-6 py-20 md:py-28">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <p className="pixel-chip mb-4">Word around the valley</p>
              <h2 className="font-display text-ink leading-tight" style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)" }}>
                Trusted by teams that build seriously.
              </h2>
            </div>
            <ScrollReveal>
              <Testimonials />
            </ScrollReveal>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6"><div className="pixel-divider" /></div>

        {/* ─── About + Team ─── */}
        <section id="about" className="scroll-mt-20 px-6 py-20 md:py-28">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-10 md:gap-14 mb-16">
              <div className="md:col-span-7">
                <p className="pixel-chip mb-4">The farmhands</p>
                <h2 className="font-display text-ink leading-[1.08] mb-5" style={{ fontSize: "clamp(1.8rem, 5vw, 3.4rem)" }}>
                  Built by people who ship.
                </h2>
                <p className="font-sans text-ink-2 text-[16px] md:text-[17px] leading-relaxed max-w-xl">
                  Send us an email and you&apos;ll get an engineer. There&apos;s
                  no account manager layer. The people you&apos;re talking to are
                  writing the code, and when it&apos;s done, everything belongs
                  to you.
                </p>
              </div>
              <div className="md:col-span-5 grid sm:grid-cols-2 md:grid-cols-1 gap-6 md:pt-2">
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
                    <div style={{ borderTop: "3px solid var(--wood-soft)" }} className="pt-3">
                      <h4 className="font-display text-ink text-base mb-1.5">{title}</h4>
                      <p className="font-sans text-ink-2 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div id="team" className="scroll-mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {team.map(({ name, initials, role, bio, photo, linkedin }) => (
                <ScrollReveal key={name}>
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                    aria-label={`${name}, ${role} — open LinkedIn`}
                  >
                    <div className="panel-wood pixel-corners h-full transition-transform duration-150 group-hover:-translate-y-1">
                      <div className="panel-paper px-4 py-5 h-full flex flex-col">
                        <TeamPortrait src={photo} alt={`${name}, ${role} co-founder of Evlogia`} initials={initials} />
                        <h3 className="font-display text-ink text-lg leading-tight">{name}</h3>
                        <p className="font-sans text-ink-3 text-[11px] tracking-[0.16em] uppercase mt-1 mb-2.5">{role}</p>
                        <p className="font-sans text-ink-2 text-[13px] leading-relaxed flex-1">{bio}</p>
                        <span className="font-display text-ink-3 text-[11px] inline-flex items-center gap-1.5 mt-4 pt-3 self-start group-hover:text-ink transition-colors" style={{ borderTop: "2px solid var(--wood-pale)" }}>
                          LinkedIn ↗
                        </span>
                      </div>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6"><div className="pixel-divider" /></div>

        {/* ─── FAQ ─── */}
        <section id="faq" className="scroll-mt-20 px-6 py-20 md:py-28">
          <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-5 md:sticky md:top-24">
              <p className="pixel-chip mb-4">Questions</p>
              <h2 className="font-display text-ink leading-[1.08] mb-4" style={{ fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)" }}>
                Questions we get asked.
              </h2>
              <p className="font-sans text-ink-2 text-[15px] leading-relaxed max-w-sm">
                Don&apos;t see yours?{" "}
                <a
                  href="mailto:hello@evlogia.ai"
                  className="text-ink underline decoration-[var(--harvest)] decoration-2 underline-offset-4 hover:decoration-[var(--ink)]"
                >
                  Email us directly
                </a>
                .
              </p>
            </div>
            <div className="md:col-span-7">
              <FAQ />
            </div>
          </div>
        </section>

        {/* ─── CTA: come by the farm ─── */}
        <section id="contact" className="sky-dawn px-6 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="max-w-3xl mx-auto">
            <div className="panel-wood pixel-corners">
              <div className="panel-paper px-6 py-10 md:px-12 md:py-12 text-center">
                <div className="flex justify-center gap-2 mb-5" aria-hidden>
                  <PixelSprite tile={T.crop.wheat[3]} scale={3} />
                  <PixelSprite tile={T.crop.wheatItem} scale={3} />
                </div>
                <h2 className="font-display text-ink leading-[1.05] mb-4" style={{ fontSize: "clamp(1.9rem, 5vw, 3.2rem)" }}>
                  Let&apos;s build something worth using.
                </h2>
                <p className="font-sans text-ink-2 text-[15px] md:text-[16px] leading-relaxed max-w-md mx-auto mb-8">
                  Tell us what you need. We&apos;ll tell you if we&apos;re the
                  right team to build it — and if not, we&apos;ll point you
                  somewhere that is.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    data-cal-link="ethankd/strategy"
                    data-cal-namespace="strategy"
                    data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
                    className="pixel-btn"
                  >
                    Book a 30-min call
                  </button>
                  <a
                    href="mailto:hello@evlogia.ai"
                    className="font-sans text-ink-2 text-sm hover:text-ink underline decoration-[var(--harvest)] decoration-2 underline-offset-4"
                  >
                    Or email hello@evlogia.ai
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
