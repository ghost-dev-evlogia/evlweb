/* Shared site content — single source for Home and the route pages.
   All of it is real: keep claims literal, timelines honest. */
import { T, type TileRef } from "@/farm/tiles.ts";

export type Service = {
  id: string;
  icon: TileRef;
  title: string;
  desc: string;
  meta: string;
  includes: string[];
};

export const SERVICES: Service[] = [
  {
    id: "product",
    icon: T.crop.wheat[3],
    title: "Product & Platform Engineering",
    desc: "Websites, apps, platforms. We own the full build. You don't end up managing four vendors who don't talk to each other.",
    meta: "Typical engagement · 8–24 weeks · fixed scope · shipped product + handoff",
    includes: [
      "Web and mobile apps, end to end",
      "Multi-tenant platforms and APIs",
      "Design + engineering in one team",
      "Clean handoff: code, docs, infra, ownership",
    ],
  },
  {
    id: "internal-tools",
    icon: T.crop.beet[3],
    title: "Internal Tools & Systems",
    desc: "Dashboards, admin panels, booking systems, workflow tools. The software your team actually depends on.",
    meta: "4–10 weeks · fixed scope",
    includes: [
      "Admin panels and dashboards",
      "Booking and workflow systems",
      "Integrations with the tools you already run",
      "Built for the people who use them daily",
    ],
  },
  {
    id: "applied-ai",
    icon: T.biome.sunflowerHead,
    title: "Applied AI",
    desc: "AI where it actually solves something. We integrate models into real products and build custom solutions when off-the-shelf doesn't cut it.",
    meta: "Pilots 4–6 weeks · production builds 3–6 months",
    includes: [
      "LLM, vision, and multimodal systems",
      "Retrieval infrastructure that holds up in production",
      "Agents where they genuinely help",
      "Evaluation before scale — pilots prove value first",
    ],
  },
  {
    id: "iot",
    icon: T.crop.wheat[2],
    title: "IoT & Connected Devices",
    desc: "Sensor pipelines, embedded firmware, connected hardware. From prototype through production.",
    meta: "Prototype 6–10 weeks · production 4–8 months",
    includes: [
      "Embedded firmware and sensor pipelines",
      "Cloud-connected devices and edge processing",
      "Prototyping through manufacturing support",
      "Device fleets you can actually operate",
    ],
  },
  {
    id: "coaching",
    icon: T.crop.wheat[0],
    title: "Agentic AI Coaching",
    desc: "We sit inside your team, write real code, and ship alongside your engineers. Six months in, they just work differently. That's the point.",
    meta: "Embed 12–26 weeks · 1–3 engineers",
    includes: [
      "Embedded engineers, not slide decks",
      "Real shipping work as the training ground",
      "Agentic tooling and workflow design",
      "Your team keeps the capability when we leave",
    ],
  },
];

export const DEPTH = [
  {
    label: "Applied AI",
    desc: "Production AI systems, not prototypes. LLMs, computer vision, multimodal pipelines, and retrieval infrastructure. Built to run in the real world.",
    tags: ["LLMs", "Vision", "Multimodal", "Agents", "RAG"],
  },
  {
    label: "IoT & Hardware",
    desc: "Connected hardware that does what it's supposed to. Sensor pipelines, embedded firmware, cloud-connected devices. We've built things worth building properly.",
    tags: ["Firmware", "Sensors", "Edge", "Protocols", "Cloud"],
  },
  {
    label: "Complex Platforms",
    desc: "Multi-tenant systems, high-stakes data flows, and platforms where getting the architecture wrong is expensive. We've built them and handed them off clean.",
    tags: ["Multi-tenant", "APIs", "Data pipelines", "Infrastructure"],
  },
];

export const TEAM = [
  {
    name: "Arjun",
    initials: "A",
    role: "Engineering",
    bio: "Distributed systems, platform architecture. Owns the heaviest infrastructure work.",
    photo: "/team-pixel/arjun.png",
    linkedin: "https://linkedin.com/in/arjun",
  },
  {
    name: "Aneesh",
    initials: "An",
    role: "Applied AI",
    bio: "Production AI, end-to-end. LLM, vision, and retrieval systems from problem framing through deployment.",
    photo: "/team-pixel/aneesh.png",
    linkedin: "https://linkedin.com/in/aneesh",
  },
  {
    name: "Ethan",
    initials: "E",
    role: "Product & Delivery",
    bio: "Web, mobile, IoT. Turns ambiguous problems into shipped systems on a clear timeline.",
    photo: "/team-pixel/ethan.png",
    linkedin: "https://linkedin.com/in/ethankd",
  },
  {
    name: "Karthik",
    initials: "K",
    role: "Hardware & Systems",
    bio: "Embedded firmware, IoT. Connected devices and sensor pipelines, prototype to production.",
    photo: "/team-pixel/karthik.png",
    linkedin: "https://linkedin.com/in/karthik",
  },
];

export const CLIENT_LOGOS = [
  { src: "/10seconds.jpeg", name: "10 Seconds", t: "white-bg" },
  { src: "/Edoxi.jpeg", name: "Edoxi", t: "dark-bg" },
  { src: "/Inspire.avif", name: "Inspire", t: "normal" },
  { src: "/Nitte.svg", name: "Nitte", t: "normal" },
  { src: "/aambianz.webp", name: "Aambianz", t: "normal" },
  { src: "/magniz.avif", name: "Magniz", t: "normal" },
  { src: "/oceancharge.webp", name: "Ocean Charge", t: "invert" },
  { src: "/sellmyplot.webp", name: "Sell My Plot", t: "invert" },
  { src: "/vanora.png", name: "Vanora", t: "invert" },
];

export const STATS = [
  { target: 50, suffix: "+", label: "Systems Shipped" },
  { target: 20, suffix: "+", label: "Clients Served" },
  { target: 10, suffix: "+", label: "Production AI Builds" },
  { target: 8, suffix: "", label: "Industries Served" },
];

export const PRINCIPLES = [
  {
    title: "We build, not advise.",
    desc: "No strategy decks, no handoffs to someone else. We write the code and ship the system.",
  },
  {
    title: "We own the outcome.",
    desc: "Scope shifts mid-engagement, we adapt. We don't disappear into a Jira backlog.",
  },
  {
    title: "We protect what's novel.",
    desc: "If the work produces something genuinely new, we file the IP. It's a deliverable, not an afterthought.",
  },
];

export const CAL_ATTRS = {
  "data-cal-link": "ethankd/strategy",
  "data-cal-namespace": "strategy",
  "data-cal-config":
    '{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}',
} as const;
