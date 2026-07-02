import { NextRequest, NextResponse } from "next/server";

/* Booking creation — validates the form, creates the booking via Cal.com
   (which sends the confirmation/reschedule emails), never exposes the key.
   Light per-IP throttle: bookings are rare; bursts are not humans. */

const CAL = "https://api.cal.com/v2";
const EVENT = { eventTypeSlug: "strategy", username: "ethankd" };

const recent = new Map<string, number[]>();
function throttled(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

function validTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const key = process.env.CAL_API_KEY;
  if (!key) return NextResponse.json({ error: "booking unavailable" }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (throttled(ip)) return NextResponse.json({ error: "slow down" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const str = (k: string, max: number) =>
    typeof body[k] === "string" ? (body[k] as string).trim().slice(0, max) : "";

  const start = str("start", 40);
  const firstName = str("firstName", 60);
  const lastName = str("lastName", 60);
  const email = str("email", 200);
  const phone = str("phone", 20).replace(/[\s()-]/g, "");
  const company = str("company", 120);
  const challenge = str("challenge", 1000);
  const journey = str("journey", 60);
  const heard = str("heard", 80);
  const timeZone = str("timeZone", 60) || "UTC";

  /* the strategy event type's own required fields (mirrors Cal exactly) */
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

  if (
    Number.isNaN(Date.parse(start)) ||
    firstName.length < 1 ||
    lastName.length < 1 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !/^\+?\d{7,15}$/.test(phone) ||
    company.length < 1 ||
    challenge.length < 1 ||
    !JOURNEY_OPTS.includes(journey) ||
    !HEARD_OPTS.includes(heard) ||
    !validTimeZone(timeZone)
  ) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  try {
    const r = await fetch(`${CAL}/bookings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "cal-api-version": "2024-08-13",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start: new Date(start).toISOString(), // Cal expects UTC
        ...EVENT,
        attendee: {
          name: `${firstName} ${lastName}`,
          email,
          phoneNumber: phone,
          timeZone,
          language: "en",
        },
        bookingFieldsResponses: {
          splitName: { firstName, lastName },
          attendeePhoneNumber: phone,
          title: company,
          "business-info-improve": challenge,
          invest: journey,
          "where-did-you-hear-about-us": heard,
          // hidden-but-required on the event type; stamped by the ledger
          "no-show": "(booked through the evlogia.ai ledger)",
        },
        metadata: { source: "evlogia.ai" },
      }),
    });
    const j = await r.json();
    if (!r.ok || j.status !== "success") {
      const taken = r.status === 400 || r.status === 409;
      return NextResponse.json(
        { error: taken ? "slot taken" : "calendar unreachable" },
        { status: taken ? 409 : 502 }
      );
    }
    const data = Array.isArray(j.data) ? j.data[0] : j.data;
    return NextResponse.json({ booking: { uid: data.uid, start: data.start, end: data.end } });
  } catch {
    return NextResponse.json({ error: "calendar unreachable" }, { status: 502 });
  }
}
