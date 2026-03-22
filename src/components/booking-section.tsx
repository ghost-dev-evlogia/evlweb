"use client";

import { useEffect } from "react";

export function BookingSection() {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", "strategy", { origin: "https://app.cal.com" });

      Cal.ns.strategy("inline", {
        elementOrSelector: "#my-cal-inline-strategy",
        calLink: "ethankd/strategy",
        config: {
          layout: "month_view",
          useSlotsViewOnSmallScreen: true
        }
      });

      Cal.ns.strategy("ui", {
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    `;
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="book" className="px-6 py-14 md:py-28">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-14">
          <p className="font-sans text-black/30 text-[10px] tracking-[0.3em] uppercase mb-4">
            Schedule a Call
          </p>
          <h2
            className="font-serif text-black/90 leading-[1.07] mb-5"
            style={{
              fontSize: "clamp(1.9rem, 5vw, 4rem)",
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

        <div className="w-full rounded-3xl overflow-hidden border border-black/[0.07] bg-white/40">
          <div
            id="my-cal-inline-strategy"
            className="min-h-[520px] md:min-h-[700px] w-full"
          />
        </div>
      </div>
    </section>
  );
}
