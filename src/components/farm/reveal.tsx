"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Small IO-driven reveal helpers. Content is always in the DOM; classes only
   add the entrance. Reduced-motion + no-js are neutralized in globals.css. */

/** Section heading with a dirt row that tills in underneath, tile by tile. */
export function TilledHeading({
  children,
  tiles = 9,
  className = "",
}: {
  children: ReactNode;
  tiles?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("tilled");
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`inline-flex flex-col items-center ${className}`}>
      <h2
        className="font-display text-ink leading-tight text-center"
        style={{ fontSize: "clamp(1.7rem, 4.2vw, 2.8rem)", textWrap: "balance" }}
      >
        {children}
      </h2>
      <span
        className="till-row"
        aria-hidden
        style={{ ["--till-w" as string]: `calc(var(--px) * 8 * ${tiles})` }}
      />
    </div>
  );
}

/** Panel that wipes itself into existence on first view. */
export function RevealPanel({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}ms`;
          el.classList.add("revealed");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`panel-reveal ${className}`}>
      {children}
    </div>
  );
}
