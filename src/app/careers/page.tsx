import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Careers | Evlogia",
  description: "Join Evlogia. Applied AI Research. We're looking for researchers and engineers who want to do work worth publishing.",
};

export default function CareersPage() {
  return (
    <>
      <SiteNav />

      <main className="pt-24 md:pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-16">
            <p className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-4">
              Careers
            </p>
            <h1
              className="font-serif text-black/90 leading-[1.07] mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.01em" }}
            >
              Work worth
              <br />
              <em>doing.</em>
            </h1>
            <p className="font-sans text-black/50 text-base leading-relaxed max-w-xl">
              Evlogia is a small, intentional team. We take on research-grade AI problems, build the systems that solve them, file the patents, and publish the science. The work is hard. The bar is high. That&apos;s the point.
            </p>
          </div>

          {/* Divider */}
          <div className="divider mb-16" />

          {/* Body */}
          <div className="space-y-12">

            <div>
              <h2 className="font-serif text-black/80 text-xl mb-4">Who we are</h2>
              <p className="font-sans text-black/50 text-sm leading-relaxed">
                We&apos;re not a large company and we don&apos;t want to be. What we are is exacting: about the problems we take on, the solutions we build, and the people we work with. Our output is peer-reviewed research, production AI systems, and filed patents. We measure success by whether the work holds up under scrutiny, not by whether it ships fast.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-black/80 text-xl mb-5">What we look for</h2>
              <ul className="space-y-3">
                {[
                  "Deep technical ability in ML research, AI systems engineering, or both",
                  "Comfort operating at the frontier, where the problem isn't fully defined",
                  "The discipline to be rigorous without being slow",
                  "A genuine interest in seeing research through to product and patent",
                  "The kind of curiosity that makes you read the paper, not just the abstract",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-sans text-black/50 text-sm leading-relaxed">
                    <span className="text-black/20 mt-0.5 shrink-0">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-black/80 text-xl mb-4">How to apply</h2>
              <p className="font-sans text-black/50 text-sm leading-relaxed mb-6">
                We don&apos;t post job listings. When we&apos;re looking, we&apos;re looking for a specific kind of person. If you think that&apos;s you, send us your CV and any relevant work: papers, code, patents, projects. Include a short note on what you&apos;re working on and what you want to build.
              </p>
              <a
                href="mailto:careers@evlogia.ai"
                className="inline-flex items-center gap-3 glass rounded-full px-8 py-3.5 text-black/80 font-sans font-medium text-sm border border-black/10 hover:bg-black/5 hover:scale-[1.02] transition-all duration-300"
              >
                careers@evlogia.ai
                <span className="text-black/35 text-xs">→</span>
              </a>
            </div>

          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
