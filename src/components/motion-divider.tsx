"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function MotionDivider({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -4% 0px" });

  return (
    <motion.div
      ref={ref}
      className={`divider ${className ?? ""}`}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : undefined}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "center" }}
    />
  );
}
