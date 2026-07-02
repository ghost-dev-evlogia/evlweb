"use client";

import { useEffect, useRef, useState } from "react";

/* Game-dialog typewriter line. SSR/first paint renders the FULL text
   (crawlers + no-JS always get the words); after hydration it restarts from
   zero and types in. Click to skip; instant under reduced-motion. */

export function TypeLine({ text, hint }: { text: string; hint?: string }) {
  const [n, setN] = useState(text.length);
  const timer = useRef<number | null>(null);
  const done = n >= text.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // restart from zero on mount, asynchronously (no sync setState in effect)
    timer.current = window.setTimeout(() => {
      setN(0);
      timer.current = window.setInterval(() => {
        setN((v) => {
          if (v + 2 >= text.length && timer.current) window.clearInterval(timer.current);
          return Math.min(text.length, v + 2);
        });
      }, 18) as unknown as number;
    }, 10) as unknown as number;
    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
        window.clearInterval(timer.current);
      }
    };
  }, [text]);

  const skip = () => {
    if (timer.current) window.clearInterval(timer.current);
    setN(text.length);
  };

  return (
    <>
      <p
        aria-live="polite"
        aria-atomic="true"
        onClick={skip}
        className="font-sans text-ink text-[15px] md:text-base leading-relaxed flex-1"
      >
        {text.slice(0, n)}
        {!done && <span className="dialog-caret">▌</span>}
      </p>
      {hint && (
        <p
          className="font-display text-ink-4 text-[11px] self-end mt-3"
          style={{ visibility: done ? "visible" : "hidden" }}
          aria-hidden
        >
          {hint}
        </p>
      )}
    </>
  );
}
