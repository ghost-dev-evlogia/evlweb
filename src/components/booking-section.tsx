"use client";

import { useEffect } from "react";

/* Inline Cal.com embed (namespace "strategy"). The bootstrap snippet is safe
   to run alongside CalInit — `C.Cal = C.Cal || …` + cal.loaded guard make it
   idempotent — and self-containment avoids any mount-order race. */
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
          theme: "light",
          useSlotsViewOnSmallScreen: true
        }
      });

      Cal.ns.strategy("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
        theme: "light"
      });
    `;
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <section id="book" className="scroll-mt-20 px-6 pb-16 md:pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="panel-wood pixel-corners">
          <div className="panel-paper p-2 md:p-3">
            <div
              id="my-cal-inline-strategy"
              className="min-h-[520px] md:min-h-[680px] w-full"
              style={{ background: "#fff" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
