"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface Line {
  text: string;
  italic?: boolean;
}

interface Props {
  lines: Line[];
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  italicClassName?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export function SplitHeading({
  lines,
  as: Tag = "h2",
  className,
  italicClassName,
  style,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-8% 0px" });
  const prefersReducedMotion = useReducedMotion();

  // Single accessible name; word spans are aria-hidden so screen readers
  // and SEO crawlers receive the real sentence, not concatenated tokens.
  const accessibleName = lines.map((l) => l.text).join(" ");

  let globalWordIndex = 0;

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={style} aria-label={accessibleName}>
      {lines.map((line, lineIdx) => {
        const words = line.text.split(" ");
        const wordEls = words.map((word, wIdx) => {
          const i = globalWordIndex++;
          return (
            <motion.span
              key={wIdx}
              aria-hidden="true"
              className={line.italic ? italicClassName : undefined}
              style={{
                display: "inline-block",
                marginRight: wIdx < words.length - 1 ? "0.28em" : 0,
              }}
              initial={
                prefersReducedMotion
                  ? { y: 0, opacity: 1, filter: "blur(0px)" }
                  : { y: 8, opacity: 0, filter: "blur(5px)" }
              }
              animate={
                inView || prefersReducedMotion
                  ? { y: 0, opacity: 1, filter: "blur(0px)" }
                  : { y: 8, opacity: 0, filter: "blur(5px)" }
              }
              transition={{
                delay: prefersReducedMotion ? 0 : delay + i * 0.052,
                duration: prefersReducedMotion ? 0 : 0.68,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          );
        });

        return line.italic ? (
          <em key={lineIdx} aria-hidden="true" style={{ display: "block", fontStyle: "italic" }}>
            {wordEls}
          </em>
        ) : (
          <span key={lineIdx} aria-hidden="true" style={{ display: "block" }}>
            {wordEls}
          </span>
        );
      })}
    </Tag>
  );
}
