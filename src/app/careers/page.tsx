import type { Metadata } from "next";
import { FarmPageShell } from "@/components/farm-page-shell";

export const metadata: Metadata = {
  title: "Careers | Evlogia",
  description:
    "Join Evlogia. A lean engineering team that takes on hard problems in AI, hardware, and platforms.",
};

export default function CareersPage() {
  return (
    <FarmPageShell eyebrow="Careers" title="Work worth doing.">
      <p className="font-sans text-ink-2 text-[15px] md:text-base leading-relaxed mb-10">
        Four of us so far. We take on hard problems, ship what we promise, and keep the team
        small enough that everyone&apos;s work matters. The bar is high. That&apos;s the point.
      </p>

      <div className="space-y-10">
        <div>
          <h2 className="font-display text-ink text-lg mb-2.5">Who we are</h2>
          <p className="font-sans text-ink-2 text-[15px] leading-relaxed">
            Small on purpose. The work is production AI systems, connected hardware, and
            platforms that carry real load. We&apos;d rather do fewer things properly than many
            things adequately, and we measure success by whether the work still holds up a year
            later.
          </p>
        </div>

        <div>
          <h2 className="font-display text-ink text-lg mb-3">What we look for</h2>
          <ul className="space-y-2.5">
            {[
              "Deep ability in ML research, systems engineering, or both",
              "Comfort when the problem isn't fully defined yet",
              "Rigor at a working pace",
              "The urge to see a hard problem through to a running system",
              "You read the spec",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 font-sans text-ink-2 text-[15px] leading-relaxed"
              >
                <span className="text-ink-4 mt-0.5 shrink-0">·</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-ink text-lg mb-2.5">How to apply</h2>
          <p className="font-sans text-ink-2 text-[15px] leading-relaxed mb-5">
            No job listings. When we&apos;re looking, we&apos;re looking for a specific person.
            If you think that&apos;s you, email your CV plus anything real: papers, code,
            patents, projects. Add a short note about what you&apos;re building.
          </p>
          <a href="mailto:careers@evlogia.ai" className="pixel-btn" style={{ fontSize: "14px" }}>
            careers@evlogia.ai
          </a>
        </div>
      </div>
    </FarmPageShell>
  );
}
