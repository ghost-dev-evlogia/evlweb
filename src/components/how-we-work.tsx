"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useInView } from "motion/react"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const
const STEP_INTERVAL = 6000

// ── Animated visual panels (compact, premium) ───────────────────────────────

function ScopeVisual({ active }: { active: boolean }) {
  const artifacts = [
    { label: "Problem", value: "Defined", progress: 100 },
    { label: "Constraints", value: "Locked", progress: 100 },
    { label: "Success metric", value: "Set", progress: 85 },
    { label: "Assumptions", value: "3 flagged", progress: 60 },
  ]

  return (
    <div className="p-4 md:p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-black/25">
          Discovery
        </span>
        <motion.span
          className="font-mono text-[9px] text-black/30"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
        >
          4 / 4
        </motion.span>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {artifacts.map(({ label, value, progress }, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -8 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
          >
            {/* Progress ring */}
            <div className="relative w-6 h-6 shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" className="rotate-[-90deg]">
                <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="2" />
                <motion.circle
                  cx="12" cy="12" r="10" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 10}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 10 }}
                  animate={active ? { strokeDashoffset: 2 * Math.PI * 10 * (1 - progress / 100) } : { strokeDashoffset: 2 * Math.PI * 10 }}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.1, ease: EASE }}
                />
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between">
                <span className="font-sans text-[10px] text-black/55 font-medium">{label}</span>
                <motion.span
                  className="font-sans text-[9px] text-black/30"
                  initial={{ opacity: 0 }}
                  animate={active ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.08, ease: EASE }}
                >
                  {value}
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function BuildVisual({ active }: { active: boolean }) {
  const tracks = [
    { label: "Design", segments: [{ w: 32 }, { w: 40 }, { w: 28 }] },
    { label: "Eng", segments: [{ w: 20 }, { w: 45 }, { w: 35 }] },
  ]

  return (
    <div className="p-4 md:p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-black/25">
          Workstreams
        </span>
        <motion.span
          className="font-mono text-[9px] text-black/30"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
        >
          Wk 4 / 8
        </motion.span>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        {tracks.map(({ label, segments }, ti) => (
          <div key={label}>
            <span className="font-sans text-[8px] tracking-[0.12em] uppercase text-black/30 mb-1 block">{label}</span>
            <div className="flex gap-[2px] h-5 rounded-md overflow-hidden bg-black/[0.02]">
              {segments.map((seg, si) => (
                <motion.div
                  key={si}
                  className="h-full rounded-[3px]"
                  style={{
                    background: si === 1 ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.05)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
                  }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={active ? { width: `${seg.w}%`, opacity: 1 } : { width: 0, opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 + ti * 0.12 + si * 0.08, ease: EASE }}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Active sprint indicator */}
        <motion.div
          className="mt-auto flex items-center gap-2"
          initial={{ opacity: 0, y: 6 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-emerald-500/60"
            animate={active ? { scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-sans text-[9px] text-black/35">Sprint 4 active</span>
          <span className="ml-auto font-sans text-[9px] text-black/25">12 PRs merged</span>
        </motion.div>
      </div>
    </div>
  )
}

function ShipVisual({ active }: { active: boolean }) {
  const items = [
    { label: "Deployed to production", done: true },
    { label: "Documentation complete", done: true },
    { label: "Codebase transferred", done: true },
    { label: "IP filing submitted", done: false },
  ]

  return (
    <div className="p-4 md:p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="font-sans text-[8px] tracking-[0.2em] uppercase text-black/25">
          Handoff
        </span>
        <motion.span
          className="font-mono text-[9px] text-black/30"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
        >
          3 / 4
        </motion.span>
      </div>

      <div className="flex flex-col gap-2 flex-1">
        {items.map(({ label, done }, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, x: -6 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
            transition={{ duration: 0.45, delay: 0.06 * i, ease: EASE }}
          >
            <motion.div
              className={cn(
                "w-4 h-4 rounded-full flex items-center justify-center shrink-0",
                done ? "bg-black/[0.08]" : "border border-black/10"
              )}
              initial={{ scale: 0 }}
              animate={active ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.08, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {done && (
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-black/35">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </motion.div>
            <span className={cn(
              "font-sans text-[10px]",
              done ? "text-black/50" : "text-black/30"
            )}>
              {label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Completion bar */}
      <div className="mt-auto">
        <div className="h-1 rounded-full bg-black/[0.04] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-black/[0.12]"
            initial={{ width: "0%" }}
            animate={active ? { width: "75%" } : { width: "0%" }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          />
        </div>
      </div>
    </div>
  )
}

// ── Data ──────────────────────────────────────────────────────────────────────

const steps = [
  {
    id: "01",
    title: "Scope & Define",
    desc: "We define what's being built before writing a line of code. What problem does it solve? What does done look like?",
    Visual: ScopeVisual,
  },
  {
    id: "02",
    title: "Design & Build",
    desc: "Design and engineering run in parallel. You see progress weekly. Nothing gets lost between a Figma file and a pull request.",
    Visual: BuildVisual,
  },
  {
    id: "03",
    title: "Ship & Hand Off",
    desc: "We deploy the system and hand it off clean. You keep the codebase, the IP, and full ownership.",
    Visual: ShipVisual,
  },
]

// ── Main component ───────────────────────────────────────────────────────────

export function HowWeWork() {
  const [active, setActive] = useState(0)
  const [timerKey, setTimerKey] = useState(0)
  const [paused, setPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(containerRef, { once: true, margin: "-5% 0px" })

  const advance = useCallback(() => {
    setActive((i) => (i + 1) % steps.length)
    setTimerKey((k) => k + 1)
  }, [])

  useEffect(() => {
    if (!inView || paused) return
    const id = setTimeout(advance, STEP_INTERVAL)
    return () => clearTimeout(id)
  }, [timerKey, advance, inView, paused])

  const handleSelect = (i: number) => {
    setPaused(true)
    if (i === active) return
    setActive(i)
    setTimerKey((k) => k + 1)
  }

  const ActiveVisual = steps[active].Visual

  return (
    <div ref={containerRef} className="doppelrand" style={{ borderRadius: "2.5rem" }}>
      <div className="doppelrand-inner overflow-hidden" style={{ borderRadius: "calc(2.5rem - 6px)" }}>

        {/* Header */}
        <div className="px-6 sm:px-8 md:px-10 pt-8 md:pt-10 pb-6">
          <p className="inline-flex font-sans text-black/65 text-[10px] tracking-[0.2em] uppercase mb-4 rounded-full bg-black/[0.04] px-3.5 py-1.5 border border-black/[0.06]">
            How We Work
          </p>
          <h2
            className="font-serif text-black/90 leading-[1.07] mb-3 [text-wrap:balance]"
            style={{
              fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Most agencies pitch. <em>We build.</em>
          </h2>
          <p className="font-sans text-black/70 text-sm leading-relaxed max-w-md [text-wrap:pretty]">
            Scoped properly, built cleanly, shipped on time. A team that owns the outcome.
          </p>
        </div>

        {/* Step selector + content */}
        <div className="px-6 sm:px-8 md:px-10 pb-8 md:pb-10">
          {/* Step tabs */}
          <div className="flex gap-1.5 mb-5">
            {steps.map((step, i) => (
              <button
                key={step.id}
                onClick={() => handleSelect(i)}
                className={cn(
                  "relative flex-1 text-left rounded-xl px-4 py-3 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] overflow-hidden",
                  i === active
                    ? "bg-black/[0.06]"
                    : "bg-transparent hover:bg-black/[0.03]"
                )}
              >
                {/* Progress bar (auto-advance indicator) */}
                {i === active && !paused && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-black/[0.12] rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: STEP_INTERVAL / 1000, ease: "linear" }}
                    key={timerKey}
                  />
                )}

                <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-black/30 block mb-0.5">
                  {step.id}
                </span>
                <span className={cn(
                  "font-sans text-[12px] font-medium block transition-colors duration-300",
                  i === active ? "text-black/85" : "text-black/55"
                )}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          {/* Content: text + visual panel side by side */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Text */}
            <div className="md:w-[42%] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="font-sans text-black/70 text-sm leading-relaxed [text-wrap:pretty]">
                    {steps[active].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual panel */}
            <div className="md:w-[58%]">
              <div
                className="rounded-xl border border-black/[0.05] overflow-hidden h-[200px] md:h-[210px]"
                style={{
                  background: "rgba(0,0,0,0.012)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35), 0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                    <ActiveVisual active={true} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
