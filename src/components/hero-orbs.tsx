"use client";

import { motion } from "motion/react";

interface OrbProps {
  delay?: number;
  width: number;
  height: number;
  rotate: number;
  floatRange?: number;
  floatDuration?: number;
  className?: string;
}

function FloatingOrb({
  delay = 0,
  width,
  height,
  rotate,
  floatRange = 18,
  floatDuration = 14,
  className = "",
}: OrbProps) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.6 },
      }}
    >
      <motion.div
        animate={{ y: [0, floatRange, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: [0.32, 0.72, 0, 1],
        }}
        style={{
          width,
          height,
          rotate,
          borderRadius: "120px",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      />
    </motion.div>
  );
}

export function HeroOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]">
      {/* Top-left — large diagonal pill */}
      <FloatingOrb
        delay={0.25}
        width={720}
        height={160}
        rotate={-26}
        floatRange={16}
        floatDuration={18}
        className="-top-16 -left-52"
      />
      {/* Top-right — medium pill */}
      <FloatingOrb
        delay={0.5}
        width={500}
        height={108}
        rotate={20}
        floatRange={22}
        floatDuration={13}
        className="top-4 -right-28"
      />
      {/* Mid-left — small accent */}
      <FloatingOrb
        delay={0.4}
        width={280}
        height={72}
        rotate={-10}
        floatRange={14}
        floatDuration={20}
        className="top-1/2 -left-12"
      />
      {/* Center-right — tiny accent */}
      <FloatingOrb
        delay={0.65}
        width={180}
        height={50}
        rotate={32}
        floatRange={26}
        floatDuration={11}
        className="top-1/3 right-1/4"
      />
    </div>
  );
}
