import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TeamPortrait } from "@/components/team-portrait";
import { HowWeWork } from "@/components/how-we-work";
import { TEAM, PRINCIPLES, CAL_ATTRS } from "@/content/site";

export const metadata: Metadata = {
  title: "About | Evlogia — The Farmhands",
  description:
    "Four co-founders who write the code you're paying for. No account manager layer. Everything we build belongs to you.",
};

export default function AboutPage() {
  return (
    <>
      <SiteNav />

      <main id="main" className="pt-14">
        {/* Header */}
        <section className="sky-day px-6 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
          <p className="pixel-chip mb-4">The farmhands</p>
          <h1
            className="font-display text-ink leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
          >
            Built by people who ship.
          </h1>
          <p className="font-sans text-ink-2 text-[15px] md:text-[16px] leading-relaxed max-w-xl mx-auto mt-4">
            Send us an email and you&apos;ll get an engineer. There&apos;s no
            account manager layer. The people you&apos;re talking to are
            writing the code, and when it&apos;s done, everything belongs to
            you.
          </p>
        </section>

        {/* Team */}
        <section id="team" className="px-6 py-16 md:py-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM.map(({ name, initials, role, bio, photo, linkedin }) => (
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
                      <h2 className="font-display text-ink text-lg leading-tight">{name}</h2>
                      <p className="font-sans text-ink-3 text-[11px] tracking-[0.16em] uppercase mt-1 mb-2.5">{role}</p>
                      <p className="font-sans text-ink-2 text-[13px] leading-relaxed flex-1">{bio}</p>
                      <span
                        className="font-display text-ink-3 text-[11px] inline-flex items-center gap-1.5 mt-4 pt-3 self-start group-hover:text-ink transition-colors"
                        style={{ borderTop: "2px solid var(--wood-pale)" }}
                      >
                        LinkedIn ↗
                      </span>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Principles */}
        <section className="px-6 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="pixel-chip">How we run</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {PRINCIPLES.map(({ title, desc }) => (
                <ScrollReveal key={title}>
                  <div className="panel-wood pixel-corners h-full">
                    <div className="panel-paper px-6 py-6 h-full">
                      <h3 className="font-display text-ink text-base mb-2">{title}</h3>
                      <p className="font-sans text-ink-2 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="px-6 pb-16 md:pb-24">
          <div className="max-w-5xl mx-auto">
            <HowWeWork />
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20 md:pb-28">
          <div className="max-w-3xl mx-auto">
            <div className="panel-wood pixel-corners">
              <div className="panel-paper px-6 py-8 md:px-10 md:py-10 text-center">
                <h2 className="font-display text-ink text-xl md:text-2xl mb-3">
                  Talk to an engineer, not a pipeline.
                </h2>
                <p className="font-sans text-ink-2 text-[15px] leading-relaxed max-w-md mx-auto mb-7">
                  Thirty minutes with someone who will actually build your
                  system. No prep needed.
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
