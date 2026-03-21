"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export function BookingSection() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: "evlogia-booking" });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          dark: {
            "cal-brand": "#ffffff",
            "cal-brand-emphasis": "rgba(255,255,255,0.8)",
            "cal-brand-text": "#020b1a",
            "cal-bg": "rgba(2, 11, 26, 0)",
            "cal-bg-emphasis": "rgba(255, 255, 255, 0.04)",
            "cal-bg-muted": "rgba(255, 255, 255, 0.03)",
            "cal-border": "rgba(255, 255, 255, 0.07)",
            "cal-border-emphasis": "rgba(255, 255, 255, 0.12)",
            "cal-border-booker": "rgba(255, 255, 255, 0.07)",
            "cal-text": "rgba(255, 255, 255, 0.85)",
            "cal-text-emphasis": "#ffffff",
            "cal-text-muted": "rgba(255, 255, 255, 0.35)",
          },
          light: {
            "cal-brand": "#020b1a",
            "cal-brand-text": "#ffffff",
          },
        },
      });
    })();
  }, []);

  return (
    <section id="book" className="px-6 py-28">
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
            Book a 30-minute discovery call. No pitch — just a focused
            conversation about your AI challenge and whether we&apos;re the
            right fit.
          </p>
        </div>

        {/* Cal embed wrapped in glass card */}
        <div
          className="glass-card rounded-3xl overflow-hidden relative"
          style={{
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {/* Top accent glow */}
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
            }}
          />

          <Cal
            namespace="evlogia-booking"
            calLink="ethankd"
            style={{
              width: "100%",
              height: "auto",
              minHeight: "700px",
              overflow: "hidden",
            }}
            config={{
              layout: "month_view",
              theme: "light",
            }}
          />
        </div>
      </div>
    </section>
  );
}
