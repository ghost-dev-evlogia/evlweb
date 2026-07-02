import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { PixelSprite } from "@/components/farm/pixel-sprite";
import { BookingSection } from "@/components/booking-section";
import { T } from "@/farm/tiles.ts";

export const metadata: Metadata = {
  title: "Contact | Evlogia — Come by",
  description:
    "Book a 30-minute scoping call or email hello@evlogia.ai. Bring your hardest problem — no prep needed, no pitch.",
};

export default function ContactPage() {
  return (
    <>
      <SiteNav />

      <main id="main" className="pt-14">
        {/* Header */}
        <section className="sky-dawn px-6 pt-16 pb-14 md:pt-24 md:pb-20 text-center">
          <p className="pixel-chip mb-4">Come by</p>
          <h1
            className="font-display text-ink leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
          >
            The gate&apos;s open.
          </h1>
          <p className="font-sans text-ink-2 text-[15px] md:text-[16px] leading-relaxed max-w-xl mx-auto mt-4">
            Bring us your hardest problem. Thirty minutes. No pitch. Just a
            focused conversation about whether we&apos;re the right fit — and
            if we&apos;re not, we&apos;ll point you somewhere that is.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6" aria-hidden>
            <PixelSprite tile={T.chicken.idle[0]} scale={3} />
            <PixelSprite tile={T.eggNest} scale={3} />
          </div>
        </section>

        {/* What to expect */}
        <section className="px-6 py-12 md:py-16">
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4">
            {[
              { title: "No prep needed", desc: "Come as you are. A rough problem statement is plenty." },
              { title: "An engineer answers", desc: "You talk to someone who will actually build the thing." },
              { title: "A real number", desc: "If there's a fit, you get a clear scope and a fixed price." },
            ].map(({ title, desc }) => (
              <div key={title} className="panel-paper pixel-corners px-5 py-5 text-center">
                <h2 className="font-display text-ink text-[15px] mb-1.5">{title}</h2>
                <p className="font-sans text-ink-2 text-[13px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Inline booking */}
        <BookingSection />

        {/* Email fallback */}
        <section className="px-6 pb-20 md:pb-28 text-center">
          <p className="font-sans text-ink-2 text-[15px]">
            Prefer email?{" "}
            <a
              href="mailto:hello@evlogia.ai"
              className="text-ink underline decoration-[var(--harvest)] decoration-2 underline-offset-4 hover:decoration-[var(--ink)]"
            >
              hello@evlogia.ai
            </a>
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
