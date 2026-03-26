"use client";

import { useState } from "react";
import { motion, AnimatePresence, animate } from "motion/react";

type Phase = "idle" | "scanning" | "granted" | "fading" | "done";

const RING_R = 46;
const CIRCUMFERENCE = 2 * Math.PI * RING_R;
const RING_BOX = RING_R * 2 + 20;

export function AuthLoader() {
  const [phase, setPhase]         = useState<Phase>("idle");
  const [scanDash, setScanDash]   = useState(CIRCUMFERENCE);
  const [ringColor, setRingColor] = useState("rgba(0,0,0,0.4)");

  const handlePress = () => {
    if (phase !== "idle") return;
    setPhase("scanning");

    animate(CIRCUMFERENCE, 0, {
      duration: 0.95,
      ease: [0.4, 0, 0.2, 1],
      onUpdate: (v: number) => setScanDash(v),
      onComplete: () => {
        setRingColor("rgb(5,150,105)");
        setPhase("granted");
        setTimeout(() => setPhase("fading"), 650);
      },
    });
  };

  if (phase === "done") return null;

  const isIdle     = phase === "idle";
  const isScanning = phase === "scanning";
  const isGranted  = phase === "granted" || phase === "fading";
  const isFading   = phase === "fading";

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[#f5f4f0]"
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={() => { if (isFading) setPhase("done"); }}
      onClick={handlePress}
      style={{ cursor: isIdle ? "pointer" : "default" }}
      role="button"
      aria-label="Touch to authorize"
    >
      <div className="flex flex-col items-center gap-5 select-none">

        {/* Fingerprint + scan ring */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: RING_BOX, height: RING_BOX }}
        >
          {/* Ring track + sweep */}
          <svg
            width={RING_BOX}
            height={RING_BOX}
            className="absolute inset-0"
            style={{ transform: "rotate(-90deg)" }}
            aria-hidden
          >
            <circle
              cx={RING_BOX / 2} cy={RING_BOX / 2} r={RING_R}
              fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1"
            />
            <motion.circle
              cx={RING_BOX / 2} cy={RING_BOX / 2} r={RING_R}
              fill="none"
              stroke={ringColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={scanDash}
              style={{ transition: "stroke 0.3s ease" }}
            />
          </svg>

          {/* Expand pulse on granted */}
          <AnimatePresence>
            {isGranted && (
              <motion.div
                className="absolute rounded-full"
                style={{ border: "1px solid rgba(5,150,105,0.25)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                initial={{ width: RING_BOX, height: RING_BOX, opacity: 0.5 }}
                animate={{ width: RING_BOX + 36, height: RING_BOX + 36, opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            )}
          </AnimatePresence>

          {/* Fingerprint */}
          <motion.img
            src="/fingerprint.svg"
            alt="Fingerprint"
            width={52}
            height={52}
            draggable={false}
            className="relative z-10"
            style={{
              opacity: isGranted ? 0.6 : isScanning ? 0.48 : 0.28,
              filter: isGranted
                ? "invert(35%) sepia(80%) saturate(500%) hue-rotate(115deg) brightness(85%)"
                : "none",
              transition: "opacity 0.4s ease, filter 0.5s ease",
            }}
            whileHover={isIdle ? { opacity: 0.44 } : {}}
            animate={isScanning ? { scale: [1, 1.02, 1, 1.02, 1] } : { scale: 1 }}
            transition={isScanning ? { duration: 0.9 } : { duration: 0.3 }}
          />
        </div>

        {/* Caption */}
        <AnimatePresence mode="wait">
          {isIdle && (
            <motion.p key="idle"
              className="font-sans text-[10px] tracking-[0.3em] uppercase text-black/30"
              initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.2 }}
            >
              Touch to Authorize
            </motion.p>
          )}
          {isScanning && (
            <motion.p key="scanning"
              className="font-sans text-[10px] tracking-[0.3em] uppercase text-black/40"
              initial={{ opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.2 }}
            >
              Scanning
            </motion.p>
          )}
          {isGranted && (
            <motion.p key="granted"
              className="font-sans text-[10px] tracking-[0.3em] uppercase"
              style={{ color: "rgb(5,150,105,0.75)" } as React.CSSProperties}
              initial={{ opacity: 0, y: 3 }} animate={{ opacity: 0.75, y: 0 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              Access Granted
            </motion.p>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
