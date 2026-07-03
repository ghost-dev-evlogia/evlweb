import Image from "next/image";
import { FarmHero } from "@/components/farm/farm-hero";
import { PixelSprite } from "@/components/farm/pixel-sprite";
import { SkyCycle } from "@/components/farm/sky-cycle";
import { Hud } from "@/components/farm/hud";
import { Fx } from "@/components/farm/fx";
import { Critters } from "@/components/farm/critters";
import { Wanderers } from "@/components/farm/wanderers";
import {
  FenceRow,
  TreeLine,
  Signpost,
  DirtPath,
  DirtConnector,
  HedgeRow,
  StreamBand,
  CropRowsBand,
  FlowerMeadow,
  HeroBoundary,
} from "@/components/farm/props";
import { TilledHeading, RevealPanel } from "@/components/farm/reveal";
import { FieldRows } from "@/components/farm/field-rows";
import { HeroWalker } from "@/components/farm/hero-walker";
import { BarnRoster } from "@/components/farm/barn-roster";
import { QuestBoard } from "@/components/farm/quest-board";
import { NpcQuotes } from "@/components/farm/npc-quotes";
import { FarmerDialog } from "@/components/farm/farmer-dialog";
import { PixelBooking } from "@/components/pixel-booking";
import { SiteFooter } from "@/components/site-footer";
import { AnimatedCounter } from "@/components/animated-counter";
import { T } from "@/farm/tiles.ts";
import { CLIENT_LOGOS, STATS, HERO } from "@/content/site";

const statIcons = [T.crop.wheat[3], T.biome.apple, T.biome.flowerBigYellow, T.biome.acorn];

export default function Home() {
  return (
    <>
      {/* the day happens behind everything */}
      <SkyCycle />
      <Fx />
      <Hud />
      <Wanderers />

      <main id="main" className="relative z-10">
        {/* the brown cat: one page-level sprite that walks out of the house,
            over the trail, and down the road into the fields */}
        <HeroWalker />
        {/* ═══ 1 · THE GATE — dawn, headline in the open sky ═══ */}
        <section
          id="top"
          className="relative overflow-hidden flex flex-col h-[88svh] md:h-[clamp(680px,100svh,1000px)]"
        >
          <FarmHero>
            <div className="text-center max-w-2xl">
              <p className="pixel-chip mb-4">{HERO.chip}</p>
              <h1
                className="font-display text-ink leading-[1.06] hero-title"
                style={{
                  fontSize: "clamp(2.1rem, 4.8vw, 3.4rem)",
                  textWrap: "balance",
                  textShadow: "0 2px 6px rgba(243,244,231,0.7)",
                }}
              >
                {HERO.h1a}
                <br />
                {HERO.h1b}
              </h1>
              {/* light halo so the sub-headline stays legible where the farm
                  (roof, trees) rises behind it on the mobile slice */}
              <p
                className="font-sans text-ink-2 text-[15px] md:text-base leading-relaxed max-w-lg mx-auto mt-3"
                style={{ textShadow: "0 1px 2px rgba(243,244,231,0.95), 0 0 10px rgba(243,244,231,0.85)" }}
              >
                {HERO.sub}
              </p>
            </div>
          </FarmHero>
        </section>

        {/* ═══ from here to the footer, everything stands on the same land ═══ */}
        <div className="terrain">
        <DirtPath />
        {/* bridge the hero trail (centre) to the left road so the dirt reads
            as one continuous path across the seam */}
        <DirtConnector />
        {/* the hero's farm ends at a hedge; the road passes the gate posts */}
        <HeroBoundary />

        {/* ═══ 2 · THE FIELDS — morning ═══ */}
        <section id="fields" className="scroll-mt-10 relative pt-16 md:pt-24 pb-0">
          <div className="text-center px-6">
            <TilledHeading>What we grow around here</TilledHeading>
            <p className="font-sans text-ink text-[15px] md:text-base leading-relaxed max-w-lg mx-auto mt-5">
              Five fields, one team. The person who scopes your build is the
              person who reviews the PRs, mostly because there&apos;s nobody
              to hand it to.
            </p>
          </div>

          <FieldRows />

          {/* chickens work the open ground below the rows */}
          <div className="relative" style={{ minHeight: 130 }}>
            <TreeLine variant={0} />
            <Critters kinds="chicken,chicken,bunny,chick" />
          </div>
        </section>

        {/* fields → quest board: through the crop rows */}
        <CropRowsBand />

        {/* ═══ 3 · THE QUEST BOARD — noon ═══ */}
        <section id="quests" className="scroll-mt-10 relative pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="text-center px-6 mb-10">
            <TilledHeading>The quest board</TilledHeading>
            <p className="font-sans text-ink text-[15px] md:text-base leading-relaxed max-w-lg mx-auto mt-5">
              Some teams pick projects by billable hours. We pick by
              &ldquo;ooh, that&apos;s hard.&rdquo; A few from the log:
            </p>
          </div>
          <div className="max-w-5xl mx-auto px-6">
            <QuestBoard />
          </div>
        </section>

        {/* quests → barn: over the stream, across the bridge */}
        <StreamBand />

        {/* ═══ 4 · THE BARN — the farmhands ═══ */}
        <section id="team" className="scroll-mt-10 relative pt-16 md:pt-24">
          <div className="text-center px-6 mb-10">
            <TilledHeading>The farmhands</TilledHeading>
            <p className="font-sans text-ink text-[15px] md:text-base leading-relaxed max-w-lg mx-auto mt-5">
              Four of us. Zero account managers. Email the farm and an engineer
              answers; there is nobody else who could. Click one of us.
            </p>
          </div>

          <div className="px-6 pb-16 md:pb-20">
            <RevealPanel>
              <BarnRoster />
            </RevealPanel>
          </div>

          {/* the cow pasture */}
          <div className="relative" style={{ minHeight: 150 }}>
            <TreeLine variant={1} />
            <Critters kinds="cow,pig,sheep,chicken" />
          </div>
        </section>

        {/* barn → valley: through the hedge */}
        <HedgeRow />

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
                      <div className="font-sans text-ink-2 text-[12px] tracking-widest uppercase leading-tight">
                        {label}
                      </div>
                    </div>
                  </div>
                </RevealPanel>
              ))}
            </div>
            <p className="text-center font-sans text-ink-2 text-[12.5px] mt-4">
              Ledger audited by the cow. She&apos;s thorough.
            </p>
          </div>
        </section>

        <FenceRow />

        {/* ═══ 6 · ASK THE FARMER — dusk ═══ */}
        <section id="ask" className="scroll-mt-10 relative pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="text-center px-6 mb-10">
            <TilledHeading>
              <span style={{ color: "var(--paper)" }}>Ask the farmer</span>
            </TilledHeading>
            <p className="font-sans text-[15px] md:text-base leading-relaxed max-w-lg mx-auto mt-5" style={{ color: "var(--wood-paper)" }}>
              Everything people usually want to know, answered by the one
              character here who never stops working.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-6">
            <FarmerDialog />
          </div>
        </section>

        {/* ask → hi: the meadow thins into the night */}
        <FlowerMeadow />

        {/* ═══ 7 · COME SAY HI — night falls ═══ */}
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
            <p className="font-sans text-[15px] md:text-base leading-relaxed max-w-md mx-auto mt-4" style={{ color: "var(--wood-paper)" }}>
              Thirty minutes with an engineer. Nobody says &ldquo;circling
              back.&rdquo; If we&apos;re not the right team, we&apos;ll say so
              and point you at who is.
            </p>
          </div>
          <div className="max-w-4xl mx-auto px-6">
            <PixelBooking />
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
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
