"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    q: "What kinds of work do you take on?",
    a: "Product and platform builds, web and mobile apps, internal tools, cloud systems, admin dashboards, booking systems, and applied AI where it genuinely helps. We also do frontier R&D for clients with novel research problems that need real experiments, not just model integration.",
  },
  {
    q: "What does a typical engagement look like?",
    a: "Depends on scope. Smaller projects run 4–8 weeks. Full platforms run 3–6 months. Every engagement starts with a scoping session to define what's being built, the timeline, and what done looks like. You get weekly updates throughout.",
  },
  {
    q: "Do you work with startups or enterprises?",
    a: "Both. We work with early-stage startups, growth-stage companies, enterprises, and research institutions. What matters: a clear problem and the budget to act on it.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do. All code, assets, and IP developed during an engagement belong to you. If the work produces something patentable, we handle the filing — but it's yours. Our standard agreement makes this explicit.",
  },
  {
    q: "How do you handle confidentiality?",
    a: "Every engagement starts with a mutual NDA. We don't share client work, code, or data without explicit written permission. For research engagements, you approve everything before it goes public.",
  },
  {
    q: "What does it cost?",
    a: "We price on a project basis, not hourly — scope and timeline determine cost. Reach out and we'll put together a clear scope and estimate.",
  },
  {
    q: "Can we start small before committing to a full build?",
    a: "Yes. Most clients start with a scoped discovery phase or a smaller initial deliverable. If the work warrants a larger engagement, we expand. No pressure either way.",
  },
];

export function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <div className="flex flex-col divide-y divide-black/[0.07]">
      {faqs.map(({ q, a }) => {
        const isOpen = openKey === q;
        return (
          <div key={q} className="py-5">
            <button
              onClick={() => setOpenKey(isOpen ? null : q)}
              className="w-full font-serif text-black/80 text-base md:text-lg leading-snug cursor-pointer flex items-start justify-between gap-4 text-left"
              style={{ letterSpacing: "-0.01em" }}
              aria-expanded={isOpen}
            >
              {q}
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 font-sans text-black/25 text-lg leading-none mt-1 select-none"
                aria-hidden
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.25, ease: "easeOut" },
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="font-sans text-black/55 text-sm md:text-[15px] leading-relaxed mt-3 pb-1 max-w-xl">
                    {a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
