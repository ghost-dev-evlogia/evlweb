import Image from "next/image";
import { FarmHero } from "@/components/farm/farm-hero";
import { PixelSprite } from "@/components/farm/pixel-sprite";
import { SkyCycle } from "@/components/farm/sky-cycle";
import { Hud } from "@/components/farm/hud";
import { Fx } from "@/components/farm/fx";
import { Critters } from "@/components/farm/critters";
import { GrassBand, PondBand, FenceRow, TreeLine, Signpost } from "@/components/farm/props";
import { TilledHeading, RevealPanel } from "@/components/farm/reveal";
import { CropGrowth } from "@/components/farm/crop-growth";
import { QuestBoard } from "@/components/farm/quest-board";
import { NpcQuotes } from "@/components/farm/npc-quotes";
import { FarmerDialog } from "@/components/farm/farmer-dialog";
import { BookingSection } from "@/components/booking-section";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedCounter } from "@/components/animated-counter";
import { TeamPortrait } from "@/components/team-portrait";
import { T } from "@/farm/tiles.ts";
import {
  SERVICES,
  CROP_STAGES,
  TEAM,
  CLIENT_LOGOS,
  STATS,
  CAL_ATTRS,
} from "@/content/site";

const statIcons = [T.crop.wheat[3], T.biome.apple, T.biome.flowerBigYellow, T.biome.acorn];

export default function Home() {
  return (
    <>
      {/* the day happens behind everything */}
      <SkyCycle />
      <Fx />
      <Hud />

      <main id="main" className="relative z-10">
        {/* ═══ 1 · THE GATE — dawn ═══ */}
        <section
          id="top"
          className="relative overflow-hidden"
          style={{ height: "clamp(600px, 94vh, 920px)" }}
        >
          <div className="absolute inset-0">
            <FarmHero>
              <div
                className="text-center panel-wood pixel-corners"
                style={{ width: "min(92vw, 600px)" }}
              >
                <div className="panel-paper px-5 py-5 md:px-8 md:py-6">
                  <p className="pixel-chip mb-3">Evlogia · a lean engineering team</p>
                  <h1
                    className="font-display text-ink leading-[1.08]"
                    style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.6rem)" }}
                  >
                    We build hard things
                    <br />
                    for fun.
                  </h1>
                  <p className="font-sans text-ink-2 text-[14px] md:text-[15px] leading-relaxed max-w-md mx-auto mt-2.5">
                    Web, AI, hardware, firmware — whatever the problem needs.
                    The difficult ones are the fun ones. That&apos;s the whole
                    business model.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                    <button {...CAL_ATTRS} className="pixel-btn" style={{ fontSize: "0.9rem" }}>
                      Book a call
                    </button>
                    <a href="#fields" className="pixel-btn pixel-btn--wood" style={{ fontSize: "0.9rem" }}>
                      Take the tour
                    </a>
                  </div>
                  <p className="font-sans text-ink-3 text-[11px] mt-3">
                    <span className="hidden md:inline">
                      The farm is interactive. Hover a field. The chickens are not ready.
                    </span>
                    <span className="md:hidden">Tap a field below to see what grows there ↓</span>
                  </p>
                  <p className="press-start font-display text-ink-2 text-[12px] mt-2" aria-hidden>
                    ▶ scroll to begin the day
                  </p>
                </div>
              </div>
            </FarmHero>
          </div>
        </section>

        {/* ═══ 2 · THE FIELDS — morning ═══ */}
        <section id="fields" className="scroll-mt-10 relative pt-16 md:pt-24 pb-0">
          <div className="text-center px-6">
            <TilledHeading>What we grow around here</TilledHeading>
            <p className="font-sans text-ink text-[15px] leading-relaxed max-w-lg mx-auto mt-5">
              Five fields, one team. The person who scopes your build is the
              person who reviews the PRs, mostly because there&apos;s nobody
              to hand it to.
            </p>
          </div>

          <div className="max-w-5xl mx-auto px-6 mt-10 md:mt-14 flex flex-col gap-6 md:gap-8 pb-16 md:pb-24">
            {SERVICES.map((s, i) => (
              <RevealPanel key={s.id} delay={i * 60}>
                <article
                  id={s.id}
                  className={`scroll-mt-24 grid md:grid-cols-12 gap-5 md:gap-8 items-center ${
                    i % 2 ? "md:[direction:rtl]" : ""
                  }`}
                >
                  {/* the plot */}
                  <div className="md:col-span-4 [direction:ltr]">
                    <div
                      className="band-dirt pixel-corners flex items-end justify-center gap-3 px-4 pt-6 pb-3"
                      style={{ boxShadow: "inset 0 0 0 var(--px) var(--wood-shadow)" }}
                    >
                      <CropGrowth stages={CROP_STAGES[s.crop]} scale={3} />
                      <CropGrowth stages={CROP_STAGES[s.crop]} scale={4} />
                      <CropGrowth stages={CROP_STAGES[s.crop]} scale={3} />
                    </div>
                  </div>
                  {/* the words */}
                  <div className="md:col-span-8 [direction:ltr]">
                    <div className="panel-wood pixel-corners">
                      <div className="panel-paper px-5 py-5 md:px-7 md:py-6">
                        <h3 className="font-display text-ink text-lg md:text-xl leading-snug mb-2">
                          {s.title}
                        </h3>
                        <p className="font-sans text-ink-2 text-sm md:text-[15px] leading-relaxed">
                          {s.desc}
                        </p>
                        <p
                          className="font-display text-ink-3 text-[11px] tracking-wide mt-3 pt-2.5"
                          style={{ borderTop: "2px solid var(--wood-pale)" }}
                        >
                          {s.meta}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </RevealPanel>
            ))}
          </div>

          {/* the fields sit on grass; chickens live here */}
          <GrassBand edges="top" shadows={2}>
            <TreeLine variant={0} />
            <div className="relative" style={{ minHeight: 150 }}>
              <Critters kinds="chicken,chicken,chicken" />
            </div>
          </GrassBand>
        </section>

        {/* ═══ 3 · THE QUEST BOARD — noon ═══ */}
        <section id="quests" className="scroll-mt-10 relative pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="text-center px-6 mb-10">
            <TilledHeading>The quest board</TilledHeading>
            <p className="font-sans text-ink text-[15px] leading-relaxed max-w-lg mx-auto mt-5">
              Some teams pick projects by billable hours. We pick by
              &ldquo;ooh, that&apos;s hard.&rdquo; A few from the log:
            </p>
          </div>
          <div className="max-w-5xl mx-auto px-6">
            <QuestBoard />
          </div>
        </section>

        <PondBand />

        {/* ═══ 4 · THE GREENHOUSE — afternoon ═══ */}
        <section id="greenhouse" className="scroll-mt-10 relative pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="text-center px-6 mb-10">
            <TilledHeading>The greenhouse</TilledHeading>
          </div>
          <div className="max-w-4xl mx-auto px-6">
            <RevealPanel>
              <div className="panel-wood pixel-corners">
                <div className="panel-paper px-6 py-7 md:px-10 md:py-9 grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-4 flex justify-center gap-4" aria-hidden>
                    <PixelSprite tile={T.crop.wheatBag} scale={4} />
                    <PixelSprite tile={T.biome.sunflower} scale={4} />
                  </div>
                  <div className="md:col-span-8">
                    <h3 className="font-display text-ink text-lg md:text-xl leading-snug mb-3">
                      R&amp;D isn&apos;t a department here. It&apos;s the point.
                    </h3>
                    <p className="font-sans text-ink-2 text-[15px] leading-relaxed">
                      It&apos;s the part we&apos;d do for free — the patents
                      just make it defensible. We run real experiments with
                      honest negative results, and when an engagement grows
                      something genuinely new, we file the IP in your name.
                      Yours, in writing. Not in a farm metaphor.
                    </p>
                    <p className="font-sans text-ink-3 text-[12px] mt-4">
                      Domains so far: LLM systems · computer vision · retrieval
                      · embedded &amp; sensors · multi-tenant platforms · and
                      whatever you&apos;re about to bring us.
                    </p>
                  </div>
                </div>
              </div>
            </RevealPanel>
          </div>
        </section>

        {/* ═══ 5 · THE BARN — the farmhands ═══ */}
        <section id="team" className="scroll-mt-10 relative pt-16 md:pt-24">
          <div className="text-center px-6 mb-10">
            <TilledHeading>The farmhands</TilledHeading>
            <p className="font-sans text-ink text-[15px] leading-relaxed max-w-lg mx-auto mt-5">
              Four of us. Zero account managers. Email the farm and an engineer
              answers; there is nobody else who could.
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-16 md:pb-20">
            {TEAM.map(({ name, initials, role, bio, photo, linkedin }, i) => (
              <RevealPanel key={name} delay={i * 70}>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full"
                  aria-label={`${name}, ${role} — open LinkedIn`}
                >
                  <div className="panel-wood pixel-corners h-full transition-transform duration-150 group-hover:-translate-y-1">
                    <div className="panel-paper px-4 py-5 h-full flex flex-col">
                      <TeamPortrait src={photo} alt={`${name}, ${role}`} initials={initials} />
                      <h3 className="font-display text-ink text-lg leading-tight">{name}</h3>
                      <p className="font-sans text-ink-3 text-[11px] tracking-[0.16em] uppercase mt-1 mb-2.5">
                        {role}
                      </p>
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
              </RevealPanel>
            ))}
          </div>

          {/* the cow pasture */}
          <GrassBand edges="top" shadows={1}>
            <TreeLine variant={1} />
            <div className="relative" style={{ minHeight: 170 }}>
              <Critters kinds="cow,chicken" />
            </div>
          </GrassBand>
        </section>

        {/* ═══ 6 · WORD AROUND THE VALLEY — golden hour ═══ */}
        <section id="valley" className="scroll-mt-10 relative pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="text-center px-6 mb-8">
            <TilledHeading>Word around the valley</TilledHeading>
          </div>

          {/* trusted-by marquee */}
          <div className="mb-12" aria-label="Companies we've worked with">
            <div className="marquee-wrapper" aria-hidden="true" role="presentation">
              <div className="marquee-track" style={{ animationDuration: "44s", gap: "3.5rem" }}>
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
                  <div
                    key={i}
                    className="relative h-7 w-24 shrink-0"
                    style={
                      logo.t === "white-bg"
                        ? { filter: "grayscale(1) opacity(0.6)", mixBlendMode: "multiply" }
                        : logo.t === "dark-bg"
                        ? { filter: "grayscale(1) invert(1) opacity(0.55)", mixBlendMode: "multiply" }
                        : logo.t === "invert"
                        ? { filter: "grayscale(1) invert(1) opacity(0.5)" }
                        : { filter: "grayscale(1) opacity(0.5)" }
                    }
                  >
                    <Image src={logo.src} alt={logo.name} fill className="object-contain" sizes="96px" />
                  </div>
                ))}
              </div>
            </div>
            <ul className="sr-only">
              {CLIENT_LOGOS.map((logo) => (
                <li key={logo.name}>{logo.name}</li>
              ))}
            </ul>
          </div>

          {/* villagers with the quotes */}
          <div className="max-w-4xl mx-auto px-6">
            <NpcQuotes />
          </div>

          {/* the harvest ledger */}
          <div className="max-w-4xl mx-auto px-6 mt-14">
            <p className="text-center font-display text-ink text-[12px] tracking-[0.14em] uppercase mb-5">
              The harvest ledger · since 2021
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {STATS.map(({ target, suffix, label }, i) => (
                <RevealPanel key={label} delay={i * 60}>
                  <div className="panel-wood pixel-corners h-full">
                    <div className="panel-paper px-4 py-5 text-center h-full flex flex-col items-center justify-center min-h-[110px]">
                      <PixelSprite tile={statIcons[i]} scale={2} className="mb-2" />
                      <div className="font-display text-ink text-3xl leading-none mb-1.5">
                        <AnimatedCounter target={target} suffix={suffix} />
                      </div>
                      <div className="font-sans text-ink-2 text-[11px] tracking-widest uppercase leading-tight">
                        {label}
                      </div>
                    </div>
                  </div>
                </RevealPanel>
              ))}
            </div>
            <p className="text-center font-sans text-ink-2 text-[11px] mt-4">
              Ledger audited by the cow. She&apos;s thorough.
            </p>
          </div>
        </section>

        <FenceRow />

        {/* ═══ 7 · ASK THE FARMER — dusk ═══ */}
        <section id="ask" className="scroll-mt-10 relative pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="text-center px-6 mb-10">
            <TilledHeading>
              <span style={{ color: "var(--paper)" }}>Ask the farmer</span>
            </TilledHeading>
            <p className="font-sans text-[15px] leading-relaxed max-w-lg mx-auto mt-5" style={{ color: "var(--wood-paper)" }}>
              Everything people usually want to know, answered by the one
              character here who never stops working.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-6">
            <FarmerDialog />
          </div>
        </section>

        {/* ═══ 8 · COME SAY HI — night falls ═══ */}
        <section id="hi" className="scroll-mt-10 relative pt-10 md:pt-14 pb-20 md:pb-28">
          <div className="max-w-3xl mx-auto px-6 text-center mb-8">
            <div className="flex justify-center mb-4" aria-hidden>
              <Signpost label="come say hi" />
            </div>
            <h2
              className="font-display leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", color: "var(--paper)", textWrap: "balance" }}
            >
              Bring us something difficult.
            </h2>
            <p className="font-sans text-[15px] leading-relaxed max-w-md mx-auto mt-4" style={{ color: "var(--wood-paper)" }}>
              Thirty minutes with an engineer. Nobody says &ldquo;circling
              back.&rdquo; If we&apos;re not the right team, we&apos;ll say so
              and point you at who is.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-6">
            <BookingSection />
            <p className="text-center font-sans text-[13px] mt-6" style={{ color: "var(--wood-paper)" }}>
              Calendars are a lot. Email works too:{" "}
              <a
                href="mailto:hello@evlogia.ai"
                className="underline decoration-2 underline-offset-4"
                style={{ color: "var(--paper)", textDecorationColor: "var(--harvest)" }}
              >
                hello@evlogia.ai
              </a>
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
