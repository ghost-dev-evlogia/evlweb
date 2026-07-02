"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CAL_ATTRS } from "@/content/site";
import { PixelSprite } from "@/components/farm/pixel-sprite";
import { T } from "@/farm/tiles.ts";

/* The booking ledger — a real booking flow drawn in the farm's own hand.
   Availability comes live from Cal.com through our API routes; picking a
   slot opens the farmer's form; confirming creates the booking (Cal sends
   the invite + reschedule emails). The plain Cal calendar stays one click
   away, and email always works — the fallback row is server-rendered, so
   even no-JS visitors get somewhere. */

type Slot = { start: string };
type MonthData = Record<string, Slot[]>;
type MonthState = MonthData | "loading" | "error";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function PeckingHen({ line }: { line: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <span
        aria-hidden
        style={{
          width: 48,
          height: 48,
          backgroundImage: "url(/farm/sprites/chicken.png)",
          backgroundSize: `${64 * 3}px ${32 * 3}px`,
          imageRendering: "pixelated",
          animation: "sprite-flip 0.5s steps(1, end) infinite",
          ["--frame-a" as string]: "0px 0px",
          ["--frame-b" as string]: `${-16 * 3}px 0px`,
        }}
      />
      <p className="font-display text-ink-2 text-sm">{line}</p>
    </div>
  );
}

export function PixelBooking() {
  const tz = useMemo(
    () => (typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC"),
    []
  );
  const [monthOff, setMonthOff] = useState(0);
  const [months, setMonths] = useState<Record<string, MonthState>>({});
  const [selDay, setSelDay] = useState<string | null>(null);
  const [selSlot, setSelSlot] = useState<Slot | null>(null);
  const [view, setView] = useState<"cal" | "form" | "sending" | "done" | "error">("cal");
  const [errLine, setErrLine] = useState("");
  const [booked, setBooked] = useState<{ start: string; email: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const today = useMemo(() => new Date(), []);
  const monthDate = useMemo(
    () => new Date(today.getFullYear(), today.getMonth() + monthOff, 1),
    [today, monthOff]
  );
  const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`;
  const monthState = months[monthKey];

  /* fetch availability for the visible month (from today onward) */
  useEffect(() => {
    if (months[monthKey]) return;
    const first = new Date(monthDate);
    const last = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0);
    const start = first < today ? today : first;
    setMonths((m) => ({ ...m, [monthKey]: "loading" }));
    fetch(`/api/booking/slots?start=${iso(start)}&end=${iso(last)}&timeZone=${encodeURIComponent(tz)}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => setMonths((m) => ({ ...m, [monthKey]: j.slots as MonthData })))
      .catch(() => setMonths((m) => ({ ...m, [monthKey]: "error" })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthKey, tz]);

  const daySlots: Slot[] =
    selDay && monthState && typeof monthState === "object" ? monthState[selDay] ?? [] : [];

  const fmtDay = (d: string) =>
    new Date(`${d}T12:00:00`).toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  const fmtTime = (s: string) =>
    new Date(s).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });

  const [journey, setJourney] = useState("");
  const [heard, setHeard] = useState("");
  const [formErr, setFormErr] = useState("");

  const JOURNEY_OPTS = [
    "Just exploring options",
    "Running small pilots",
    "Deploying into production",
    "Scaling across the organization",
  ];
  const HEARD_OPTS = [
    "LinkedIn",
    "Referral from a Client/Business Contact",
    "Website/Search Engine (Google, Bing, etc.)",
    "Podcast/Webinar",
    "Twitter/X",
    "Newsletter",
  ];

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selSlot) return;
    if (!journey || !heard) {
      setFormErr("The two multiple-choice questions need an answer too.");
      return;
    }
    setFormErr("");
    const fd = new FormData(e.currentTarget);
    const field = (k: string) => String(fd.get(k) ?? "").trim();
    const email = field("email");
    setView("sending");
    try {
      const r = await fetch("/api/booking/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selSlot.start,
          firstName: field("firstName"),
          lastName: field("lastName"),
          email,
          phone: field("phone"),
          company: field("company"),
          challenge: field("challenge"),
          journey,
          heard,
          timeZone: tz,
        }),
      });
      if (r.status === 409) {
        setMonths((m) => ({ ...m, [monthKey]: undefined as unknown as MonthState }));
        setSelSlot(null);
        setErrLine("Someone grabbed that slot mid-sentence. Pick another; the calendar re-checked itself.");
        setView("error");
        return;
      }
      if (!r.ok) throw new Error();
      setBooked({ start: selSlot.start, email });
      setView("done");
    } catch {
      setErrLine("The calendar wandered off. Try again in a minute, or use the plain one below.");
      setView("error");
    }
  };

  /* ── calendar grid cells ── */
  const cells: Array<{ day?: number; date?: string; open?: boolean }> = [];
  {
    const lead = monthDate.getDay();
    for (let i = 0; i < lead; i++) cells.push({});
    const daysIn = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
    for (let d = 1; d <= daysIn; d++) {
      const date = `${monthKey}-${String(d).padStart(2, "0")}`;
      const open =
        !!monthState &&
        typeof monthState === "object" &&
        (monthState[date]?.length ?? 0) > 0;
      cells.push({ day: d, date, open });
    }
  }

  return (
    <div className="panel-wood pixel-corners">
      <div className="panel-paper px-4 py-5 md:px-7 md:py-6">
        {view === "sending" && <PeckingHen line="penciling you in…" />}

        {view === "done" && booked && (
          <div className="text-center py-8">
            <div className="flex justify-center gap-1 mb-4" aria-hidden>
              <span className="dial-sun inline-block" style={{ animationDelay: "0.2s" }}>✦</span>
              <span
                style={{
                  width: 48,
                  height: 48,
                  display: "inline-block",
                  backgroundImage: "url(/farm/sprites/chicken-golden.png)",
                  backgroundSize: `${64 * 3}px ${32 * 3}px`,
                  imageRendering: "pixelated",
                  animation: "sprite-flip 0.5s steps(1, end) infinite",
                  ["--frame-a" as string]: "0px 0px",
                  ["--frame-b" as string]: `${-16 * 3}px 0px`,
                }}
              />
              <span className="dial-sun inline-block">✦</span>
            </div>
            <h3 className="font-display text-ink text-2xl mb-2">Booked.</h3>
            <p className="font-sans text-ink-2 text-[15px] md:text-base leading-relaxed max-w-md mx-auto">
              {fmtDay(booked.start.slice(0, 10))} at {fmtTime(booked.start)}. The invite is on its
              way to {booked.email}, reschedule link included. No judgment.
            </p>
            <p className="font-sans text-ink-3 text-[12.5px] mt-4">
              Bringing a teammate? Forward the invite.
            </p>
          </div>
        )}

        {view === "error" && (
          <div className="text-center py-8">
            <p className="font-display text-ink text-lg mb-3">Hm.</p>
            <p className="font-sans text-ink-2 text-[15px] leading-relaxed max-w-md mx-auto mb-5">{errLine}</p>
            <button type="button" className="pixel-btn" style={{ fontSize: "13px" }} onClick={() => setView("cal")}>
              back to the calendar
            </button>
          </div>
        )}

        {view === "form" && selSlot && selDay && (
          <form ref={formRef} onSubmit={submit} className="max-w-xl mx-auto">
            <div className="flex items-start gap-4 mb-5">
              <div
                className="hidden sm:block panel-paper pixel-corners p-2 shrink-0"
                style={{ boxShadow: "inset 0 0 0 2px var(--wood-mid)" }}
                aria-hidden
              >
                <PixelSprite tile={{ s: "character", x: 0.75, y: 0.75, w: 1.5, h: 1.75 }} scale={3} />
              </div>
              <div>
                <p className="font-display text-ink-3 text-[12px] tracking-[0.14em] uppercase mb-1">
                  the farmer
                </p>
                <p className="font-sans text-ink text-[15px] leading-relaxed">
                  {fmtDay(selDay)}, {fmtTime(selSlot.start)}. Who should I expect, and what are you
                  bringing us?
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <label className="block">
                <span className="font-display text-ink-2 text-[12px] uppercase tracking-wide">first name</span>
                <input name="firstName" required maxLength={60} className="pixel-input mt-1" autoComplete="given-name" />
              </label>
              <label className="block">
                <span className="font-display text-ink-2 text-[12px] uppercase tracking-wide">last name</span>
                <input name="lastName" required maxLength={60} className="pixel-input mt-1" autoComplete="family-name" />
              </label>
              <label className="block">
                <span className="font-display text-ink-2 text-[12px] uppercase tracking-wide">work email</span>
                <input name="email" type="email" required maxLength={200} className="pixel-input mt-1" autoComplete="email" />
              </label>
              <label className="block">
                <span className="font-display text-ink-2 text-[12px] uppercase tracking-wide">phone</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  maxLength={20}
                  pattern="\+?[0-9\s()-]{7,18}"
                  placeholder="+91…"
                  className="pixel-input mt-1"
                  autoComplete="tel"
                />
              </label>
            </div>
            <label className="block mb-3">
              <span className="font-display text-ink-2 text-[12px] uppercase tracking-wide">company</span>
              <input name="company" required maxLength={120} className="pixel-input mt-1" autoComplete="organization" />
            </label>
            <label className="block mb-4">
              <span className="font-display text-ink-2 text-[12px] uppercase tracking-wide">
                the difficult thing — your #1 challenge right now
              </span>
              <textarea name="challenge" required rows={3} maxLength={1000} className="pixel-input mt-1 resize-y" />
            </label>

            <fieldset className="mb-4">
              <legend className="font-display text-ink-2 text-[12px] uppercase tracking-wide mb-2">
                where are you in your AI journey?
              </legend>
              <div className="flex flex-wrap gap-2">
                {JOURNEY_OPTS.map((o) => (
                  <label
                    key={o}
                    className="pixel-chip cursor-pointer"
                    style={{
                      fontSize: "11.5px",
                      ...(journey === o
                        ? { background: "var(--harvest-pale)", boxShadow: "inset 0 0 0 2px var(--harvest-deep)" }
                        : {}),
                    }}
                  >
                    <input
                      type="radio"
                      name="journey"
                      value={o}
                      checked={journey === o}
                      onChange={() => setJourney(o)}
                      className="sr-only"
                    />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-5">
              <legend className="font-display text-ink-2 text-[12px] uppercase tracking-wide mb-2">
                where did you hear about us?
              </legend>
              <div className="flex flex-wrap gap-2">
                {HEARD_OPTS.map((o) => (
                  <label
                    key={o}
                    className="pixel-chip cursor-pointer"
                    style={{
                      fontSize: "11.5px",
                      ...(heard === o
                        ? { background: "var(--harvest-pale)", boxShadow: "inset 0 0 0 2px var(--harvest-deep)" }
                        : {}),
                    }}
                  >
                    <input
                      type="radio"
                      name="heard"
                      value={o}
                      checked={heard === o}
                      onChange={() => setHeard(o)}
                      className="sr-only"
                    />
                    {o}
                  </label>
                ))}
              </div>
            </fieldset>

            {formErr && (
              <p className="font-sans text-[13px] mb-3" style={{ color: "var(--berry-deep)" }} role="alert">
                {formErr}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <button type="submit" className="pixel-btn" style={{ fontSize: "14px" }}>
                Confirm {fmtTime(selSlot.start)}
              </button>
              <button
                type="button"
                className="pixel-chip"
                style={{ fontSize: "12px" }}
                onClick={() => setView("cal")}
              >
                ← different time
              </button>
            </div>
          </form>
        )}

        {view === "cal" && (
          <div className="grid md:grid-cols-2 gap-5 md:gap-7 items-start">
            {/* month grid */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <button
                  type="button"
                  className="pixel-chip disabled:opacity-40"
                  style={{ fontSize: "12px" }}
                  onClick={() => setMonthOff((m) => Math.max(0, m - 1))}
                  disabled={monthOff === 0}
                  aria-label="Previous month"
                >
                  ‹
                </button>
                <p className="font-display text-ink text-base">
                  {monthDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                </p>
                <button
                  type="button"
                  className="pixel-chip disabled:opacity-40"
                  style={{ fontSize: "12px" }}
                  onClick={() => setMonthOff((m) => Math.min(2, m + 1))}
                  disabled={monthOff === 2}
                  aria-label="Next month"
                >
                  ›
                </button>
              </div>

              {monthState === "loading" || !monthState ? (
                <PeckingHen line="fetching the calendar…" />
              ) : monthState === "error" ? (
                <p className="font-sans text-ink-2 text-[14px] text-center py-8">
                  Availability didn&apos;t load. The plain calendar below still works.
                </p>
              ) : (
                <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Pick a day">
                  {WEEKDAYS.map((w) => (
                    <span key={w} className="text-center font-display text-ink-3 text-[11px] py-1">
                      {w}
                    </span>
                  ))}
                  {cells.map((c, i) =>
                    c.day ? (
                      <button
                        key={i}
                        type="button"
                        disabled={!c.open}
                        onClick={() => {
                          setSelDay(c.date!);
                          setSelSlot(null);
                        }}
                        aria-label={`${fmtDay(c.date!)}${c.open ? "" : " — no slots"}`}
                        className="day-cell"
                        data-selected={selDay === c.date || undefined}
                      >
                        {c.day}
                        {c.open && <span className="day-dot" aria-hidden />}
                      </button>
                    ) : (
                      <span key={i} />
                    )
                  )}
                </div>
              )}
            </div>

            {/* slots for the picked day */}
            <div className="min-h-[220px]">
              <p className="font-display text-ink-3 text-[12px] tracking-[0.14em] uppercase mb-3">
                {selDay ? fmtDay(selDay) : "pick a day"}
              </p>
              {selDay && daySlots.length === 0 && (
                <p className="font-sans text-ink-3 text-[14px]">Nothing free that day. The dots know more.</p>
              )}
              <div className="flex flex-wrap gap-2">
                {daySlots.map((s) => (
                  <button
                    key={s.start}
                    type="button"
                    className="pixel-btn pixel-btn--wood"
                    style={{ fontSize: "13px" }}
                    onClick={() => {
                      setSelSlot(s);
                      setView("form");
                    }}
                  >
                    {fmtTime(s.start)}
                  </button>
                ))}
              </div>
              {selDay && daySlots.length > 0 && (
                <p className="font-sans text-ink-3 text-[12px] mt-4">times in {tz.replace("_", " ")}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* always-rendered fallback row (works without JavaScript too) */}
      <div
        className="px-4 py-3 md:px-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-sans text-[13px]"
        style={{ background: "var(--wood-paper)", boxShadow: "inset 0 2px 0 var(--wood-mid)" }}
      >
        <span className="text-ink-2">Prefer the plain calendar?</span>
        <button {...CAL_ATTRS} className="underline decoration-2 underline-offset-4 text-ink">
          open it
        </button>
        <span className="text-ink-3" aria-hidden>·</span>
        <a
          href="https://cal.com/ethankd/strategy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-2 underline-offset-4 text-ink"
        >
          cal.com/ethankd/strategy
        </a>
      </div>
    </div>
  );
}
