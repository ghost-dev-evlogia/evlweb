"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const faqs = [
  {
    q: "Who owns the IP from an engagement?",
    a: "You do. All intellectual property developed during a client engagement belongs to the client. We handle the patent filings and publication strategy, but the IP is yours. Our standard agreement makes this explicit.",
  },
  {
    q: "What does a typical engagement look like?",
    a: "Most engagements run [X] to [X] months. We start with a 2-to-4-week discovery phase to scope the problem and define success criteria. Then we move into parallel R&D and engineering sprints. You get weekly updates and access to all work in progress.",
  },
  {
    q: "What kinds of problems are a good fit?",
    a: "Problems where the answer doesn't already exist in the literature. If you can solve it with an off-the-shelf model and some fine-tuning, you probably don't need us. We work on the problems where the existing literature doesn't have an answer yet and someone has to run the experiments to find one.",
  },
  {
    q: "Do you work with startups or only enterprises?",
    a: "We work with enterprises, research institutions, and well-funded startups. What they have in common: a real research problem, a team that can evaluate the results, and the budget to act on them. If your team has already tried the standard approaches and hit a wall, we're probably the right fit.",
  },
  {
    q: "How do you handle confidentiality?",
    a: "Every engagement starts with a mutual NDA. We don't share client work, datasets, or results without explicit written permission. When we publish research from an engagement, the client approves what's disclosed.",
  },
  {
    q: "What does it cost?",
    a: "Pricing depends on scope, team size, and duration. We price engagements on a project basis, not hourly. Book a call and we'll scope it together.",
  },
  {
    q: "Can we start with a smaller pilot before a full engagement?",
    a: "Yes. Most clients start with a focused discovery phase or a single research question. If the results warrant a larger engagement, we expand. No pressure either way.",
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
                  <p className="font-sans text-black/45 text-sm leading-relaxed mt-3 pb-1 max-w-xl">
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
