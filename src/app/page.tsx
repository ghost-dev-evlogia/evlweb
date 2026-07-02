import { FarmHero } from "@/components/farm/farm-hero";

export default function Home() {
  return (
    <main id="main">
      {/* ─── Hero: the explorable farm, headline floating HUD-style ─── */}
      <section
        className="sky-dawn relative overflow-hidden"
        style={{ height: "clamp(600px, 94vh, 920px)" }}
      >
        <div className="absolute inset-0">
          <FarmHero>
            {/* Headline panel — floats over the world's quiet top band */}
            <div
              className="absolute z-20 left-1/2 -translate-x-1/2 text-center panel-wood pixel-corners"
              style={{ top: "3%", width: "min(92vw, 600px)" }}
            >
              <div className="panel-paper px-5 py-5 md:px-8 md:py-6">
                <p className="pixel-chip mb-3">Evlogia · Applied AI Engineering</p>
                <h1
                  className="font-display text-ink leading-[1.08]"
                  style={{ fontSize: "clamp(1.7rem, 3.6vw, 2.6rem)" }}
                >
                  We build systems
                  <br />
                  that get used.
                </h1>
                <p className="font-sans text-ink-2 text-[14px] md:text-[15px] leading-relaxed max-w-md mx-auto mt-2.5">
                  Production AI, internal tools, IoT, and platforms — scoped
                  properly, built cleanly, shipped on time.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
                  <button
                    data-cal-link="ethankd/strategy"
                    data-cal-namespace="strategy"
                    data-cal-config='{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}'
                    className="pixel-btn"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Book a 30-min call
                  </button>
                  <a
                    href="/services"
                    className="pixel-btn pixel-btn--wood"
                    style={{ fontSize: "0.9rem" }}
                  >
                    Walk the fields
                  </a>
                </div>
                <p className="font-sans text-ink-3 text-[11px] mt-3">
                  Hover a field plot to see what it grows ↓
                </p>
              </div>
            </div>
          </FarmHero>
        </div>
      </section>

      <section className="px-6 py-24 text-center">
        <p className="font-sans text-ink-3">— sections being replanted —</p>
      </section>
    </main>
  );
}
