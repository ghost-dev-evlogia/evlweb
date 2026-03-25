"use client";

import { motion, useInView } from "motion/react";
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

  let globalWordIndex = 0;

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={style}>
      {lines.map((line, lineIdx) => {
        const words = line.text.split(" ");
        const wordEls = words.map((word, wIdx) => {
          const i = globalWordIndex++;
          return (
            <motion.span
              key={wIdx}
              className={line.italic ? italicClassName : undefined}
              style={{
                display: "inline-block",
                marginRight: wIdx < words.length - 1 ? "0.28em" : 0,
              }}
              initial={{ y: 8, opacity: 0, filter: "blur(5px)" }}
              animate={
                inView
                  ? { y: 0, opacity: 1, filter: "blur(0px)" }
                  : { y: 8, opacity: 0, filter: "blur(5px)" }
              }
              transition={{
                delay: delay + i * 0.052,
                duration: 0.68,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          );
        });

        return line.italic ? (
          <em key={lineIdx} style={{ display: "block", fontStyle: "italic" }}>
            {wordEls}
          </em>
        ) : (
          <span key={lineIdx} style={{ display: "block" }}>
            {wordEls}
          </span>
        );
      })}
    </Tag>
  );
}
