"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function BookingSection() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "strategy" });
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <section id="book" className="px-6 py-28 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-4">
            Schedule a Call
          </p>
          <h2
            className="font-serif text-black/90 leading-[1.07] mb-5"
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Let&apos;s talk about
            <br />
            <em className="text-gradient">your problem.</em>
          </h2>
          <p className="font-sans text-black/40 text-sm max-w-sm mx-auto leading-relaxed">
            Book a 30-minute strategy call. No pitch — just a focused
            conversation about your AI challenge and whether we&apos;re the
            right fit.
          </p>
        </div>

        <Cal
          namespace="strategy"
          calLink="ethankd/strategy"
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" }}
        />
      </div>
    </section>
  );
}
