"use client"

import { useEffect, useState } from "react"
import { useScroll, useMotionValueEvent } from "motion/react"
import { SiteNav } from "@/components/site-nav"
import { FloatingDock } from "@/components/floating-dock"

// Threshold (in px) past which the top navbar fades out and the dock fades in.
// Roughly mid-hero so the handoff feels intentional, not jumpy.
const HANDOFF_PX = 320

export function NavController() {
  const { scrollY } = useScroll()
  const [pastHero, setPastHero] = useState(false)

  useMotionValueEvent(scrollY, "change", (y) => {
    // Hysteresis: fade the dock in slightly later than it fades out, to avoid
    // a flicker when the user scrolls right around the threshold.
    if (y > HANDOFF_PX + 40 && !pastHero) setPastHero(true)
    else if (y < HANDOFF_PX - 40 && pastHero) setPastHero(false)
  })

  // Set initial state on mount (in case the page loads scrolled)
  useEffect(() => {
    setPastHero(window.scrollY > HANDOFF_PX)
  }, [])

  return (
    <>
      <SiteNav visible={!pastHero} />
      <FloatingDock visible={pastHero} />
    </>
  )
}
