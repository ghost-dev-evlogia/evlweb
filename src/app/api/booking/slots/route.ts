import { NextRequest, NextResponse } from "next/server";

/* Availability proxy — the pixel booking UI asks us, we ask Cal.com.
   The API key never leaves the server; responses cache for 60s. */

const CAL = "https://api.cal.com/v2";
const EVENT = { eventTypeSlug: "strategy", username: "ethankd" };

const DATE = /^\d{4}-\d{2}-\d{2}$/;

function validTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const key = process.env.CAL_API_KEY;
  if (!key) return NextResponse.json({ error: "booking unavailable" }, { status: 503 });

  const sp = req.nextUrl.searchParams;
  const start = sp.get("start") ?? "";
  const end = sp.get("end") ?? "";
  const timeZone = sp.get("timeZone") ?? "UTC";
  if (!DATE.test(start) || !DATE.test(end) || !validTimeZone(timeZone)) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const span = (Date.parse(end) - Date.parse(start)) / 86_400_000;
  if (!(span >= 0 && span <= 45)) {
    return NextResponse.json({ error: "range too wide" }, { status: 400 });
  }

  const url =
    `${CAL}/slots?eventTypeSlug=${EVENT.eventTypeSlug}&username=${EVENT.username}` +
    `&start=${start}&end=${end}&timeZone=${encodeURIComponent(timeZone)}`;
  try {
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${key}`, "cal-api-version": "2024-09-04" },
      next: { revalidate: 60 },
    });
    const j = await r.json();
    if (!r.ok || j.status !== "success") {
      return NextResponse.json({ error: "calendar unreachable" }, { status: 502 });
    }
    return NextResponse.json({ slots: j.data });
  } catch {
    return NextResponse.json({ error: "calendar unreachable" }, { status: 502 });
  }
}
