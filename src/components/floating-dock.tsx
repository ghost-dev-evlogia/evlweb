"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Dock, DockIcon } from "@/components/ui/dock"

const EASE = [0.16, 1, 0.3, 1] as const

// ── Hairline SVG glyphs — 1px stroke, matches the site's editorial language.
//    Each icon is rendered at 22-24px, ultra-light. ────────────────────────────

const IconHome = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11.5L12 4l9 7.5" />
    <path d="M5 10v9.5h14V10" />
  </svg>
)

const IconServices = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="7" height="7" />
    <rect x="13" y="4" width="7" height="7" />
    <rect x="4" y="13" width="7" height="7" />
    <rect x="13" y="13" width="7" height="7" />
  </svg>
)

const IconProcess = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="2" />
    <circle cx="18" cy="18" r="2" />
    <path d="M8 6h6a4 4 0 0 1 4 4v6" />
  </svg>
)

const IconWork = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h16v13H4z" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </svg>
)

const IconTeam = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="9" r="3" />
    <circle cx="17" cy="10" r="2.4" />
    <path d="M3 19c0-3 3-5 6-5s6 2 6 5" />
    <path d="M15 19c0-2 2-3.5 4-3.5s2 .8 2 2" />
  </svg>
)

const IconFAQ = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.6 2.25c-.7.35-1.1.9-1.1 1.75v.5" />
    <circle cx="12" cy="17" r="0.4" fill="currentColor" />
  </svg>
)

const IconCalendar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="5" width="16" height="15" rx="1" />
    <path d="M4 10h16" />
    <path d="M9 3v4M15 3v4" />
  </svg>
)

const DOCK_ITEMS = [
  { label: "Home", href: "/", Icon: IconHome },
  { label: "Services", href: "/#services", Icon: IconServices },
  { label: "Process", href: "/#how-we-work", Icon: IconProcess },
  { label: "Work", href: "/#testimonials", Icon: IconWork },
  { label: "Team", href: "/#team", Icon: IconTeam },
  { label: "FAQ", href: "/#faq", Icon: IconFAQ },
] as const

function DockTooltipIcon({
  label,
  href,
  children,
  external = false,
  calBooking = false,
}: {
  label: string
  href?: string
  children: React.ReactNode
  external?: boolean
  calBooking?: boolean
}) {
  const [hover, setHover] = useState(false)

  const inner = (
    <div
      className="relative w-full h-full flex items-center justify-center text-black/70 hover:text-black/95 transition-colors duration-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
      <AnimatePresence>
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-full bg-black/90 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/95"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )

  if (calBooking) {
    return (
      <button
        type="button"
        data-cal-link="ethankd/strategy"
        data-cal-namespace="strategy"
        data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
        aria-label={label}
        className="w-full h-full bg-transparent border-0 p-0 cursor-pointer"
      >
        {inner}
      </button>
    )
  }

  if (!href) return inner

  return (
    <Link
      href={href}
      aria-label={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="w-full h-full block"
    >
      {inner}
    </Link>
  )
}

export function FloatingDock({ visible }: { visible: boolean }) {
  // Don't render on small screens — too cramped, mobile menu handles nav
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)")
    const handler = () => setIsMobile(mq.matches)
    handler()
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  if (isMobile) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          initial={{ y: 80, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: 80, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="pointer-events-auto">
            <Dock
              iconSize={42}
              iconMagnification={64}
              iconDistance={120}
              className="mt-0 bg-white/60 border-black/[0.07] shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_6px_rgba(0,0,0,0.04)] backdrop-blur-xl rounded-full px-3"
            >
              {DOCK_ITEMS.map(({ label, href, Icon }) => (
                <DockIcon key={label} className="hover:bg-black/[0.04] transition-colors">
                  <DockTooltipIcon label={label} href={href}>
                    <Icon />
                  </DockTooltipIcon>
                </DockIcon>
              ))}

              {/* Divider */}
              <div className="w-px h-7 bg-black/10 mx-1" aria-hidden />

              {/* Book a call — accent */}
              <DockIcon className="bg-black/90 hover:bg-black transition-colors">
                <DockTooltipIcon label="Book a call" calBooking>
                  <span className="text-white/95 flex items-center justify-center">
                    <IconCalendar />
                  </span>
                </DockTooltipIcon>
              </DockIcon>
            </Dock>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
