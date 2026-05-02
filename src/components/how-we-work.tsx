"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useInView } from "motion/react"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const
const STEP_INTERVAL = 6000

// ── Editorial visual panels — match site brand: serif labels, sans meta,
//    hairline dividers, 11px floor, /55+ contrast on all text. ────────────────

function PanelShell({
  eyebrow,
  meta,
  active,
  children,
  footer,
}: {
  eyebrow: string
  meta: string
  active: boolean
  children: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <div className="p-5 md:p-6 h-full flex flex-col">
      <div className="flex items-baseline justify-between mb-4">
        <span className="font-sans text-[11px] tracking-[0.2em] uppercase text-black/65">
          {eyebrow}
        </span>
        <motion.span
          className="font-sans text-[11px] tracking-wide text-black/55"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.5, ease: EASE }}
        >
          {meta}
        </motion.span>
      </div>

      <div className="flex flex-col gap-2.5 flex-1">{children}</div>

      {footer && <div className="mt-3 pt-3 border-t border-black/[0.06]">{footer}</div>}
    </div>
  )
}

function ScopeVisual({ active }: { active: boolean }) {
  const rows = [
    { label: "Problem", value: "Defined" },
    { label: "Constraints", value: "Locked" },
    { label: "Success metric", value: "Set" },
    { label: "Assumptions", value: "3 flagged" },
  ]

  return (
    <PanelShell
      eyebrow="Discovery"
      meta="4 / 4"
      active={active}
      footer={
        <span className="font-sans text-[11px] text-black/55">
          Scope locked before line one of code
        </span>
      }
    >
      {rows.map(({ label, value }, i) => (
        <motion.div
          key={label}
          className="flex items-baseline justify-between border-b border-black/[0.05] pb-2 last:border-b-0 last:pb-0"
          initial={{ opacity: 0, y: 4 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.45, delay: 0.08 * i, ease: EASE }}
        >
          <span className="font-serif italic text-black/85 text-[13px]">{label}</span>
          <span className="font-sans text-[11px] text-black/55">{value}</span>
        </motion.div>
      ))}
    </PanelShell>
  )
}

function BuildVisual({ active }: { active: boolean }) {
  const tracks = [
    { label: "Design", segments: [{ w: 32 }, { w: 40 }, { w: 28 }] },
    { label: "Engineering", segments: [{ w: 20 }, { w: 45 }, { w: 35 }] },
  ]

  return (
    <PanelShell
      eyebrow="Workstreams"
      meta="Wk 4 of 8"
      active={active}
      footer={
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-emerald-500/70"
            animate={active ? { scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="font-sans text-[11px] text-black/65">Sprint 4 active</span>
          <span className="ml-auto font-sans text-[11px] text-black/55">12 PRs merged</span>
        </motion.div>
      }
    >
      {tracks.map(({ label, segments }, ti) => (
        <div key={label} className="flex flex-col gap-1.5">
          <span className="font-serif italic text-black/85 text-[13px]">{label}</span>
          <div className="flex gap-[3px] h-[6px] rounded-full overflow-hidden bg-black/[0.04]">
            {segments.map((seg, si) => (
              <motion.div
                key={si}
                className="h-full rounded-full"
                style={{
                  background: si === 1 ? "rgba(0,0,0,0.18)" : "rgba(0,0,0,0.10)",
                }}
                initial={{ width: 0, opacity: 0 }}
                animate={
                  active
                    ? { width: `${seg.w}%`, opacity: 1 }
                    : { width: 0, opacity: 0 }
                }
                transition={{
                  duration: 0.7,
                  delay: 0.1 + ti * 0.12 + si * 0.08,
                  ease: EASE,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </PanelShell>
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
    <PanelShell
      eyebrow="Handoff"
      meta="3 / 4"
      active={active}
      footer={
        <div className="flex items-center gap-3">
          <div className="flex-1 h-[3px] rounded-full bg-black/[0.05] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-black/[0.25]"
              initial={{ width: "0%" }}
              animate={active ? { width: "75%" } : { width: "0%" }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            />
          </div>
          <span className="font-sans text-[11px] text-black/65">75%</span>
        </div>
      }
    >
      {items.map(({ label, done }, i) => (
        <motion.div
          key={label}
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -4 }}
          animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
          transition={{ duration: 0.45, delay: 0.06 * i, ease: EASE }}
        >
          <motion.div
            className={cn(
              "w-[14px] h-[14px] rounded-full flex items-center justify-center shrink-0",
              done
                ? "bg-black/[0.12] border border-black/[0.06]"
                : "border border-black/15"
            )}
            initial={{ scale: 0 }}
            animate={active ? { scale: 1 } : { scale: 0 }}
            transition={{
              duration: 0.35,
              delay: 0.15 + i * 0.08,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          >
            {done && (
              <svg
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-black/65"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </motion.div>
          <span
            className={cn(
              "font-sans text-[12px]",
              done ? "text-black/75" : "text-black/55"
            )}
          >
            {label}
          </span>
        </motion.div>
      ))}
    </PanelShell>
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
      <div
        className="doppelrand-inner overflow-hidden"
        style={{ borderRadius: "calc(2.5rem - 6px)" }}
      >
        {/* Header — matches the standard "Trusted by" pill grammar */}
        <div className="px-6 sm:px-8 md:px-10 pt-8 md:pt-10 pb-6">
          <p className="inline-flex font-sans text-black/75 text-[11px] tracking-[0.2em] uppercase mb-5 rounded-full bg-black/[0.04] px-3 py-1 border border-black/[0.06]">
            How We Work
          </p>
          <h2
            className="font-serif text-black/90 leading-[1.05] mb-3 [text-wrap:balance]"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.8rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Most agencies pitch.{" "}
            <em className="italic">We build.</em>
          </h2>
          <p className="font-sans text-black/75 text-[15px] leading-relaxed max-w-md [text-wrap:pretty]">
            Scoped properly, built cleanly, shipped on time. A team that owns the outcome.
          </p>
        </div>

        {/* Step selector — editorial, no fill chrome. Hairline progress bar
            beneath the active tab matches the divider language elsewhere. */}
        <div className="px-6 sm:px-8 md:px-10 pb-8 md:pb-10">
          <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6 border-t border-black/[0.06]">
            {steps.map((step, i) => {
              const isActive = i === active
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => handleSelect(i)}
                  className="relative text-left pt-4 pb-3 cursor-pointer transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.99] group"
                >
                  {/* Top hairline progress (auto-advance) — sits over the
                      shared border-t above so it reads as a fill, not an add */}
                  {isActive && !paused && (
                    <motion.div
                      key={timerKey}
                      className="absolute -top-px left-0 h-px bg-black/55"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: STEP_INTERVAL / 1000, ease: "linear" }}
                    />
                  )}

                  <div className="flex items-baseline gap-3">
                    <span
                      className={cn(
                        "font-serif text-[15px] md:text-[16px] leading-none transition-colors duration-300",
                        isActive ? "text-black/90" : "text-black/35 group-hover:text-black/55"
                      )}
                    >
                      {step.id}
                    </span>
                    <span
                      className={cn(
                        "font-sans text-[12px] md:text-[13px] font-medium tracking-tight transition-colors duration-300",
                        isActive
                          ? "text-black/85"
                          : "text-black/55 group-hover:text-black/75"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Content: text + visual panel side by side. 5/7 grid matches the
              site's editorial 12-col rhythm. */}
          <div className="grid md:grid-cols-12 gap-5 md:gap-6">
            {/* Text */}
            <div className="md:col-span-5 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="font-sans text-black/75 text-[14px] md:text-[15px] leading-relaxed [text-wrap:pretty]">
                    {steps[active].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual panel — fixed height preserved from prior version */}
            <div className="md:col-span-7">
              <div
                className="rounded-2xl border border-black/[0.06] overflow-hidden h-[200px] md:h-[210px]"
                style={{
                  background: "rgba(0,0,0,0.012)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.02)",
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
