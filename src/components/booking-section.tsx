"use client";

import { useEffect, useRef, useState } from "react";

/* Inline Cal.com embed (namespace "strategy") with a chicken-pecking loader —
   the calendar takes a couple of seconds to arrive, so a hen fetches it.
   The bootstrap snippet is idempotent alongside CalInit. */
export function BookingSection() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

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

    /* swap the loader out once the embed iframe actually arrives */
    const host = hostRef.current;
    let mo: MutationObserver | null = null;
    if (host) {
      mo = new MutationObserver(() => {
        if (host.querySelector("iframe")) {
          setLoaded(true);
          mo?.disconnect();
        }
      });
      mo.observe(host, { childList: true, subtree: true });
    }

    return () => {
      mo?.disconnect();
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="panel-wood pixel-corners">
      <div className="panel-paper p-2 md:p-3 relative">
        {!loaded && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3"
            style={{ background: "var(--wood-paper)" }}
          >
            <span
              aria-hidden
              style={{
                width: 48,
                height: 48,
                backgroundImage: "url(/farm/sprites/chicken.png)",
                backgroundSize: `${64 * 3}px ${32 * 3}px`,
                imageRendering: "pixelated",
                // two-frame idle peck via discrete background-position swap
                animation: "sprite-flip 0.5s steps(1, end) infinite",
                ["--frame-a" as string]: "0px 0px",
                ["--frame-b" as string]: `${-16 * 3}px 0px`,
              }}
            />
            <p className="font-display text-ink-2 text-sm">
              fetching the calendar… usually takes a few seconds
            </p>
          </div>
        )}
        <div
          ref={hostRef}
          id="my-cal-inline-strategy"
          className="min-h-[520px] md:min-h-[660px] w-full"
          style={{ background: "#fff" }}
        />
      </div>
    </div>
  );
}
