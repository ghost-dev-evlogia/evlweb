"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealLabel({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <div ref={ref} style={{ overflow: "hidden" }}>
      <motion.p
        className={className}
        initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
        animate={
          inView
            ? { clipPath: "inset(0% 0 0 0)", opacity: 1 }
            : undefined
        }
        transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1], delay }}
      >
        {children}
      </motion.p>
    </div>
  );
}
