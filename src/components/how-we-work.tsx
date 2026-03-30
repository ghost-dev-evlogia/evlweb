"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"

const STEP_DURATION = 5000

const steps = [
  {
    id: "01",
    title: "Discover & Define",
    desc: "We scope the problem with your domain experts and research leads before writing a line of code. The goal is to find the real constraint, not the assumed one. Most projects change direction in this phase. That's the point.",
  },
  {
    id: "02",
    title: "Research & Build",
    desc: "R&D and production engineering run on the same timeline, not sequentially. The researchers know what the engineers need. The engineers know what the researchers found. Nothing gets lost between a paper and a pull request.",
  },
  {
    id: "03",
    title: "Ship & Protect",
    desc: "Deploy the system. File the patents. Publish the research. Your IP stays yours. Your competitive advantage is documented, protected, and public in exactly the ways you choose.",
  },
]

// ── Visual panels ─────────────────────────────────────────────────────────────

function DiscoverVisual() {
  const cards = [
    { label: "Root problem", note: "Stated vs. actual" },
    { label: "Key constraint", note: "Time / budget / data" },
    { label: "Success criteria", note: "How we know it worked" },
    { label: "Team map", note: "Domain experts involved" },
    { label: "Data inventory", note: "Available signals" },
    { label: "Assumptions", note: "To test in week one" },
  ]
  return (
    <div className="relative w-full h-full overflow-hidden p-5 md:p-7 flex flex-col">
      <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-black/20 mb-4 shrink-0">
        Discovery artifacts
      </p>
      <div className="grid grid-cols-2 gap-2 flex-1 content-start">
        {cards.map(({ label, note }, i) => (
          <motion.div
            key={label}
            className="rounded-lg border border-black/[0.08] bg-white/50 px-2.5 py-2 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-sans text-[10px] font-medium text-black/60 leading-tight">{label}</p>
            <p className="font-sans text-[9px] text-black/30 leading-tight mt-0.5">{note}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function BuildVisual() {
  const lanes = [
    {
      track: "Research",
      color: "bg-black/15",
      segments: [
        { label: "Literature", start: 0, width: 28 },
        { label: "Architecture", start: 22, width: 35 },
        { label: "Experiments", start: 50, width: 50 },
      ],
    },
    {
      track: "Engineering",
      color: "bg-black/10",
      segments: [
        { label: "Setup", start: 8, width: 18 },
        { label: "API", start: 22, width: 32 },
        { label: "Integration", start: 48, width: 52 },
      ],
    },
  ]
  return (
    <div className="relative w-full h-full flex items-center overflow-hidden p-5 md:p-8">
      <div className="w-full">
        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-black/20 mb-5">
          Parallel workstreams
        </p>
        <div className="flex flex-col gap-5">
          {lanes.map(({ track, segments }, li) => (
            <div key={track}>
              <p className="font-sans text-[9px] tracking-[0.14em] uppercase text-black/35 mb-2">{track}</p>
              <div className="relative h-7 bg-black/[0.03] rounded-md overflow-hidden">
                {segments.map(({ label, start, width }, i) => (
                  <motion.div
                    key={label}
                    className="absolute top-0.5 bottom-0.5 rounded flex items-center px-2 bg-black/10"
                    style={{ left: `${start}%`, width: `${width}%` }}
                    initial={{ opacity: 0, scaleX: 0.5 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.5, delay: li * 0.12 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="font-sans text-[8px] tracking-wide text-black/45 whitespace-nowrap overflow-hidden">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Week markers */}
        <div className="flex justify-between mt-3 px-0.5">
          {["Wk 1", "Wk 2", "Wk 4", "Wk 6", "Wk 8+"].map((w) => (
            <span key={w} className="font-sans text-[8px] text-black/20">{w}</span>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          {["Paper draft", "PR merged", "Deployed"].map((tag) => (
            <span key={tag} className="font-sans text-[9px] tracking-[0.1em] text-black/30 border border-black/[0.08] rounded-full px-2.5 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ShipVisual() {
  const outputs = [
    {
      label: "Deploy",
      status: "System in production",
      items: ["Inference pipeline", "API endpoints", "Monitoring"],
    },
    {
      label: "Patent",
      status: "IP protected",
      items: ["Novel architecture", "Training method", "US + EU filing"],
    },
    {
      label: "Publish",
      status: "Research public",
      items: ["Peer-reviewed paper", "Conference submission", "Client-approved scope"],
    },
  ]
  return (
    <div className="relative w-full h-full overflow-hidden p-5 md:p-7 flex flex-col">
      <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-black/20 mb-4 shrink-0">
        Deliverables
      </p>
      <div className="grid grid-cols-3 gap-2">
        {outputs.map(({ label, status, items }, i) => (
          <motion.div
            key={label}
            className="flex flex-col gap-2.5 border border-black/[0.07] rounded-xl p-2.5 md:p-3 bg-white/40"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <p className="font-sans text-[10px] font-semibold text-black/55 tracking-wide">{label}</p>
              <p className="font-sans text-[8px] text-black/30 leading-tight mt-0.5">{status}</p>
            </div>
            <div className="flex flex-col gap-1">
              {items.map((item) => (
                <div key={item} className="flex items-start gap-1">
                  <span className="text-black/25 text-[8px] mt-[1px] shrink-0">·</span>
                  <span className="font-sans text-[8px] text-black/35 leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const visuals = [DiscoverVisual, BuildVisual, ShipVisual]

// ── Component ─────────────────────────────────────────────────────────────────

export function HowWeWork() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [timerKey, setTimerKey] = useState(0)

  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % steps.length)
    setTimerKey((k) => k + 1)
  }, [])

  useEffect(() => {
    const id = setTimeout(advance, STEP_DURATION)
    return () => clearTimeout(id)
  }, [timerKey, advance])

  const handleSelect = (index: number) => {
    if (index === activeIndex) return
    setActiveIndex(index)
    setTimerKey((k) => k + 1)
  }

  const VisualComponent = visuals[activeIndex]

  return (
    <div className="glass-card rounded-3xl overflow-hidden">

      {/* ── Card header ── */}
      <div className="px-7 sm:px-10 md:px-14 pt-10 md:pt-14 pb-8 md:pb-10">
        <p className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-4">
          How We Work
        </p>
        <h2
          className="font-serif text-black/90 leading-[1.07] mb-4"
          style={{
            fontSize: "clamp(1.4rem, 4.5vw, 3.5rem)",
            letterSpacing: "-0.01em",
            maxWidth: "38ch",
          }}
        >
          Most consultants advise.{" "}
          <em className="not-italic text-black/90">We build, file, and publish.</em>
        </h2>
        <p className="font-sans text-black/40 text-sm leading-relaxed max-w-lg">
          The gap between AI research and production is where most engagements stall.
          We run research and engineering in parallel so the system you ship is the system the science describes.
        </p>
      </div>

      {/* ── Divider ── */}
      <div className="border-t border-black/[0.07]" />

      {/* ── Carousel ── */}
      <div className="flex flex-col md:flex-row">

        {/* Left: step text */}
        <div className="flex flex-col justify-between p-7 sm:p-10 md:p-12 md:w-[48%]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="font-serif text-black/[0.06] leading-none select-none mb-1"
                style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
                aria-hidden
              >
                {steps[activeIndex].id}
              </div>
              <h3
                className="font-serif text-black/90 mb-3 leading-snug"
                style={{
                  fontSize: "clamp(1.2rem, 3vw, 1.75rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {steps[activeIndex].title}
              </h3>
              <p className="font-sans text-black/40 text-sm leading-relaxed max-w-xs">
                {steps[activeIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Step pills */}
          <div className="flex gap-2 mt-8 flex-wrap">
            {steps.map((step, i) => (
              <button
                key={step.id}
                onClick={() => handleSelect(i)}
                className={cn(
                  "font-sans text-[10px] tracking-[0.15em] uppercase rounded-full px-4 py-2 transition-all duration-300 cursor-pointer",
                  i === activeIndex
                    ? "bg-black/85 text-white"
                    : "bg-black/[0.04] text-black/45 hover:bg-black/[0.07] hover:text-black/60",
                )}
              >
                {step.id}
              </button>
            ))}
          </div>
        </div>

        {/* Right: visual */}
        <div
          className="relative md:w-[52%] border-t border-black/[0.07] md:border-t-0 md:border-l overflow-hidden"
          style={{ background: "rgba(0,0,0,0.018)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="w-full"
              style={{ minHeight: "260px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <VisualComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  )
}
