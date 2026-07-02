import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.env.URL || "http://localhost:3001";
const OUT = ".audit/shots";
mkdirSync(OUT, { recursive: true });

const issues = [];
const ok = [];

const browser = await chromium.launch();

async function audit(viewport, label) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 2 });
  const page = await ctx.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  const pageErrors = [];
  page.on("pageerror", (e) => pageErrors.push(e.message));
  const failedReqs = [];
  page.on("requestfailed", (r) => failedReqs.push(`${r.url()} (${r.failure()?.errorText})`));
  const badStatus = [];
  page.on("response", (r) => {
    if (r.status() >= 400) badStatus.push(`${r.status()} ${r.url()}`);
  });

  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1500);

  // Screenshots
  await page.screenshot({ path: `${OUT}/${label}-hero.png`, fullPage: false });
  await page.screenshot({ path: `${OUT}/${label}-full.png`, fullPage: true });

  const log = (cond, msg) => (cond ? ok.push(`[${label}] ${msg}`) : issues.push(`[${label}] ${msg}`));

  // Hero copy
  const h1 = (await page.locator("h1").first().innerText()).replace(/\s+/g, " ").trim();
  log(/We build systems that get used/i.test(h1), `hero H1 present: "${h1}"`);

  const heroSub = await page.locator("p", { hasText: /Production AI, internal tools/i }).count();
  log(heroSub > 0, "hero subhead rewritten (specific)");

  const status = await page.locator("text=Booking Q3 2026 engagements").count();
  log(status > 0, "status pill updated to Q3 2026");

  // Hero primary CTA: Cal.com data attributes present, not anchor to /#contact
  const heroPrimary = page.locator("button[data-cal-link='ethankd/strategy']").first();
  const heroPrimaryCount = await page.locator("button[data-cal-link='ethankd/strategy']").count();
  log(heroPrimaryCount >= 3, `Cal.com booking buttons wired: ${heroPrimaryCount} (expected ≥3: hero + nav + bottom CTA)`);
  const heroBtnText = (await heroPrimary.innerText()).replace(/\s+/g, " ").trim();
  log(/Book a 30-min call/i.test(heroBtnText), `hero primary CTA text: "${heroBtnText}"`);

  // Hero secondary CTA: should point to #testimonials, not #research
  const seeWork = await page.locator("a[href='/#testimonials']").first();
  log((await seeWork.count()) > 0, "hero 'See Client Work' anchor → /#testimonials present");
  const research = await page.locator("a[href='/#research']").count();
  log(research === 0, "no broken /#research links remaining");

  // Risk reducer
  const risk = await page.locator("text=No prep needed").count();
  log(risk > 0, "risk-reducer line under hero CTAs");

  // Stats labels
  const statBuilds = await page.locator("text=Production AI Builds").count();
  log(statBuilds > 0, "stat label 'Production AI Builds'");

  // Service cards engagement shape lines
  const eng1 = await page.locator("text=Typical engagement").count();
  log(eng1 > 0, "service card 01 engagement-shape line");
  const eng3 = await page.locator("text=Pilots 4–6 weeks").count();
  log(eng3 > 0, "service card 03 (Applied AI) engagement-shape line");

  // Leadership block — Arjun, Aneesh, Karthik
  for (const name of ["Arjun", "Aneesh", "Ethan", "Karthik"]) {
    const nameNode = await page.locator(`#team h3, #team h4`).filter({ hasText: new RegExp(`^${name}$`) }).count();
    log(nameNode > 0, `team: '${name}' name rendered`);
    const img = page.locator(`img[alt^='${name},']`).first();
    const imgCount = await img.count();
    log(imgCount > 0, `leadership: '${name}' image element present`);
    if (imgCount > 0) {
      const nw = await img.evaluate((el) => el.naturalWidth);
      log(nw > 0, `leadership: '${name}' photo loaded (naturalWidth=${nw})`);
    }
  }

  // FAQ pricing answer — open it and check
  await page.locator("button", { hasText: /What does it cost\?/ }).first().click();
  await page.waitForTimeout(400);
  const priced = await page.locator("text=/low five figures/i").count();
  log(priced > 0, "FAQ pricing answer includes 'low five figures'");

  // Bottom CTA
  const bottomCTA = await page.locator("text=Book a 30-min call").count();
  log(bottomCTA >= 2, `'Book a 30-min call' CTAs visible (count=${bottomCTA})`);

  // Errors
  log(consoleErrors.length === 0, `console errors: ${consoleErrors.length}${consoleErrors.length ? " — " + consoleErrors.slice(0, 3).join(" | ") : ""}`);
  log(pageErrors.length === 0, `page exceptions: ${pageErrors.length}`);
  log(failedReqs.length === 0, `failed requests: ${failedReqs.length}${failedReqs.length ? " — " + failedReqs.slice(0, 3).join(" | ") : ""}`);
  log(badStatus.length === 0, `4xx/5xx responses: ${badStatus.length}${badStatus.length ? " — " + badStatus.slice(0, 3).join(" | ") : ""}`);

  // Cal.com click smoke test (only on desktop)
  if (label === "desktop") {
    await page.locator("button[data-cal-link='ethankd/strategy']").first().click();
    await page.waitForTimeout(2500);
    const overlay = await page.locator("[data-cal-namespace='strategy'], iframe").count();
    log(overlay > 0, `Cal.com overlay opened on hero CTA click`);
    await page.screenshot({ path: `${OUT}/${label}-cal-open.png` });
  }

  // Mobile menu test
  if (label === "mobile") {
    await page.locator("button[aria-label='Open menu']").click();
    await page.waitForTimeout(600);
    const processLink = await page.locator("a", { hasText: /^Process$/ }).count();
    const workLink = await page.locator("a", { hasText: /^Work$/ }).count();
    log(processLink > 0, "mobile menu has 'Process' link");
    log(workLink > 0, "mobile menu has 'Work' link");
    await page.screenshot({ path: `${OUT}/${label}-menu.png` });
  }

  await ctx.close();
}

await audit({ width: 1440, height: 900 }, "desktop");
await audit({ width: 375, height: 812 }, "mobile");

await browser.close();

console.log("\n=== PASS ===");
ok.forEach((m) => console.log("  ✓ " + m));
console.log(`\n=== FAIL (${issues.length}) ===`);
issues.forEach((m) => console.log("  ✗ " + m));
process.exit(issues.length ? 1 : 0);
