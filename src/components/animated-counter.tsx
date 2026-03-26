"use client";

import { useEffect, useRef } from "react";
import { useInView, useSpring, useTransform, motion } from "motion/react";

const SLOT_EM = 1.15; // digit slot height in em

function DigitRoller({ target }: { target: number }) {
  const spring = useSpring(0, { stiffness: 72, damping: 13, mass: 0.75 });

  useEffect(() => {
    spring.set(target);
  }, [spring, target]);

  const y = useTransform(spring, (v) => `${-v * SLOT_EM}em`);

  return (
    <span
      className="relative inline-block overflow-hidden align-top"
      style={{ height: `${SLOT_EM}em`, width: "1ch" }}
    >
      <motion.span
        style={{ y }}
        className="absolute top-0 left-0 w-full"
        aria-hidden
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className="block text-center"
            style={{ height: `${SLOT_EM}em`, lineHeight: `${SLOT_EM}em` }}
          >
            {i}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

interface Props {
  target: number;
  suffix?: string;
}

export function AnimatedCounter({ target, suffix = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const digits = String(target).split("").map(Number);

  return (
    <span ref={ref} className="inline-flex items-center tabular-nums">
      {digits.map((digit, i) => (
        <DigitRoller key={i} target={inView ? digit : 0} />
      ))}
      {suffix && (
        <span
          className="inline-block"
          style={{ lineHeight: `${SLOT_EM}em` }}
        >
          {suffix}
        </span>
      )}
    </span>
  );
}
