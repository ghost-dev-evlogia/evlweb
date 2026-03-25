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
            <span
              key={wIdx}
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "bottom",
                marginRight: wIdx < words.length - 1 ? "0.28em" : 0,
              }}
            >
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ y: "110%", opacity: 0 }}
                animate={
                  inView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }
                }
                transition={{
                  delay: delay + i * 0.048,
                  duration: 0.62,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
          );
        });

        return line.italic ? (
          <em key={lineIdx} className={italicClassName} style={{ display: "block", fontStyle: "italic" }}>
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
