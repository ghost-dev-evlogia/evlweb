"use client";

import { useEffect, useRef, ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  variant?: "up" | "scale";
  className?: string;
  threshold?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
  threshold = 0.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const cls = variant === "scale" ? "reveal-scale" : "reveal";

  return (
    <div ref={ref} className={`${cls} ${className}`}>
      {children}
    </div>
  );
}
