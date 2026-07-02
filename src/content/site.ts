/* Shared site content — the single source for the one-page journey.
   Voice: PostHog-warm, dbrand-nerved. Claims stay literal (real numbers,
   real timelines); the jokes live in the margins, never in the claims. */
import { T, type TileRef } from "@/farm/tiles.ts";

export type Service = {
  id: string;
  icon: TileRef;
  crop: keyof typeof CROP_STAGES;
  title: string;
  desc: string;
  meta: string;
};

/* growth-stage frame sets for the scroll-driven crop growth effect */
export const CROP_STAGES = {
  wheat: [T.crop.wheatBag, T.crop.wheat[0], T.crop.wheat[1], T.crop.wheat[2], T.crop.wheat[3]],
  beet: [T.crop.beetBag, T.crop.beet[0], T.crop.beet[1], T.crop.beet[2], T.crop.beet[3]],
  sunflower: [T.crop.wheatBag, T.crop.wheat[0], T.biome.flowerYellow, T.biome.flowerBigYellow, T.biome.sunflowerHead],
} as const;

export const SERVICES: Service[] = [
  {
    id: "product",
    icon: T.crop.wheat[3],
    crop: "wheat",
    title: "Products & platforms",
    desc: "Websites, apps, whole platforms. One team owns the build — you skip the part where four vendors blame each other.",
    meta: "8–24 weeks · fixed scope · you keep everything",
  },
  {
    id: "internal-tools",
    icon: T.crop.beet[3],
    crop: "beet",
    title: "Internal tools",
    desc: "Dashboards and workflow tools your team will open on purpose. Not the kind that quietly die in a bookmarks folder.",
    meta: "4–10 weeks · fixed scope",
  },
  {
    id: "applied-ai",
    icon: T.biome.sunflowerHead,
    crop: "sunflower",
    title: "Applied AI",
    desc: "AI where it earns its keep. If a regex would do the job, we'll tell you — then charge you for a much smaller project.",
    meta: "pilots 4–6 weeks · production 3–6 months",
  },
  {
    id: "iot",
    icon: T.crop.wheat[2],
    crop: "wheat",
    title: "IoT & devices",
    desc: "Firmware, sensors, connected hardware. Built to survive contact with reality, which is famously undefeated.",
    meta: "prototype 6–10 weeks · production 4–8 months",
  },
  {
    id: "coaching",
    icon: T.crop.wheat[0],
    crop: "wheat",
    title: "Agentic AI coaching",
    desc: "We embed with your engineers, ship real code together, and make ourselves unnecessary. On purpose.",
    meta: "12–26 weeks · 1–3 engineers embedded",
  },
];

/* ── The quest board — real work only. Client names appear exactly where the
   clients already speak publicly (testimonials below). ── */
export type Quest = {
  id: string;
  title: string;
  client?: string;
  desc: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  status: "shipped" | "open";
};

export const QUESTS: Quest[] = [
  {
    id: "lms",
    title: "Build the foundation of an LMS",
    client: "10 Seconds",
    desc: "Complex requirements, one clean architecture. Their words: \"lasting impact on our product development.\"",
    difficulty: 4,
    status: "shipped",
  },
  {
    id: "oceancharge",
    title: "Full-stack build on a hard deadline",
    client: "OceanCharge",
    desc: "\"Whenever we need to deliver, we can trust the Evlogia team to push as hard as they need.\" We pushed.",
    difficulty: 3,
    status: "shipped",
  },
  {
    id: "edoxi",
    title: "Replatform a training company's web presence",
    client: "Edoxi",
    desc: "Understand the business fast, rebuild the platform, reposition the services. Shipped and measured.",
    difficulty: 3,
    status: "shipped",
  },
  {
    id: "magniz",
    title: "A product site that carries the brand",
    client: "Magniz",
    desc: "Smooth, stress-free, elevated how they present themselves. The chickens claim they could have done this one.",
    difficulty: 2,
    status: "shipped",
  },
  {
    id: "novel-ai",
    title: "Novel AI architectures",
    desc: "Problems where model integration isn't enough and someone has to do actual research. Hypotheses, experiments, honest negative results.",
    difficulty: 5,
    status: "open",
  },
  {
    id: "hard-hardware",
    title: "Hardware nobody's built before",
    desc: "Sensor pipelines, embedded firmware, devices with no reference design to copy. Our favorite kind of unreasonable.",
    difficulty: 5,
    status: "open",
  },
  {
    id: "data-model",
    title: "Platforms where the data model IS the problem",
    desc: "Multi-tenant systems and high-stakes data flows where getting the architecture wrong is very expensive. We enjoy this. Genuinely.",
    difficulty: 5,
    status: "open",
  },
];

export const TEAM = [
  {
    name: "Arjun",
    initials: "A",
    role: "Engineering",
    bio: "Distributed systems, platform architecture. If it has to stay up, it's his.",
    photo: "/team-pixel/arjun.png",
    linkedin: "https://linkedin.com/in/arjun",
  },
  {
    name: "Aneesh",
    initials: "An",
    role: "Applied AI",
    bio: "Production AI end-to-end — from \"is this even possible?\" to deployed and boring.",
    photo: "/team-pixel/aneesh.png",
    linkedin: "https://linkedin.com/in/aneesh",
  },
  {
    name: "Ethan",
    initials: "E",
    role: "Product & Delivery",
    bio: "Web, mobile, IoT. Turns \"vague idea\" into \"shipped\" on an actual schedule.",
    photo: "/team-pixel/ethan.png",
    linkedin: "https://linkedin.com/in/ethankd",
  },
  {
    name: "Karthik",
    initials: "K",
    role: "Hardware & Systems",
    bio: "Firmware and connected devices, prototype to production. Speaks fluent oscilloscope.",
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
  { target: 50, suffix: "+", label: "systems shipped" },
  { target: 20, suffix: "+", label: "clients served" },
  { target: 10, suffix: "+", label: "production AI builds" },
  { target: 8, suffix: "", label: "industries" },
];

/* ── Real quotes, verbatim. The presentation is whimsical; the words are not. ── */
export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  avatarPosition?: string;
  /* which palette-recolored villager delivers it */
  npc: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "koyal",
    quote:
      "The team did an amazing job building a product website for my brand, which really elevated how we present ourselves to customers. They made the whole process smooth and stress-free.",
    author: "Koyal Kiran",
    role: "CEO, Magniz",
    avatar: "/Koyal.jpg",
    npc: "/farm/npc/npc-berry.png",
  },
  {
    id: "lionel",
    quote:
      "Whenever we need to deliver, there is no doubt that we can trust the Evlogia team to push as hard as they need to get results on time. They have all the expertise needed to give us the right recommendation for the development of the full stack.",
    author: "Lionel Moh",
    role: "Founder, OceanCharge",
    avatar: "/lionel.png",
    avatarPosition: "top",
    npc: "/farm/npc/npc-sky.png",
  },
  {
    id: "srikar",
    quote:
      "The team brought a strong blend of technical expertise and practical execution, playing a key role in shaping the foundation of our LMS. What truly stood out was their ability to simplify complex requirements into an efficient, well-structured architecture. Their contributions have had a lasting impact on our product development.",
    author: "Srikar HK",
    role: "Head of Operations, 10 Seconds",
    avatar: "/srikar.jpeg",
    npc: "/farm/npc/npc-grass.png",
  },
  {
    id: "fasil",
    quote:
      "The team demonstrated exceptional technical expertise in evaluating and enhancing our website strategy. Their ability to quickly understand our business needs and translate them into practical, scalable solutions was impressive. Thanks to their guidance, we significantly refined our online platform and better positioned our services in the market.",
    author: "Muhammed Fasil",
    role: "Center Manager, Edoxi Training",
    avatar: "/fasil.jpeg",
    npc: "/farm/npc/npc-dusk.png",
  },
];

/* ── Ask the farmer — same real answers, delivered as game dialog. ── */
export const FAQ = [
  {
    q: "What kind of work do you take on?",
    a: "Products, platforms, internal tools, applied AI, and connected hardware. Plus frontier R&D for clients whose problems need real experiments, not just model integration. The harder it is, the faster we reply.",
  },
  {
    q: "What does an engagement look like?",
    a: "Smaller projects run 4–8 weeks. Full platforms run 3–6 months. Every engagement starts with a scoping session that defines what's being built and what \"done\" means. You get weekly updates — from the engineers, because that's everyone here.",
  },
  {
    q: "What does it cost?",
    a: "We price by project, not by the hour. Pilots and smaller builds typically land in the low five figures. Full platforms and production AI run mid-five to mid-six figures depending on scope. Send us your problem, and we'll come back with a real number.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do. All of it. If the work produces something patentable, we handle the filing — in your name. Our standard agreement says this in writing, not in a farm metaphor.",
  },
  {
    q: "Startups or enterprises?",
    a: "Both, plus research institutions. What matters is a clear problem and the budget to act on it. What doesn't matter is how many people are in your org chart.",
  },
  {
    q: "How do you handle confidentiality?",
    a: "Mutual NDA on every engagement. We don't share client work, code, or data without written permission. Most of our best work is invisible for exactly this reason.",
  },
  {
    q: "Can we start small?",
    a: "Yes — most clients start with a scoped discovery phase or a small first deliverable. If it warrants more, we grow it. No pressure either way; the farm is patient.",
  },
];

export const CAL_ATTRS = {
  "data-cal-link": "ethankd/strategy",
  "data-cal-namespace": "strategy",
  "data-cal-config":
    '{"layout":"month_view","theme":"light","useSlotsViewOnSmallScreen":"true"}',
} as const;

/* Journey sections — powers the HUD mini-map signposts. */
export const JOURNEY = [
  { id: "top", label: "The gate" },
  { id: "fields", label: "The fields" },
  { id: "quests", label: "Quest board" },
  { id: "greenhouse", label: "Greenhouse" },
  { id: "team", label: "The barn" },
  { id: "valley", label: "The valley" },
  { id: "ask", label: "Ask the farmer" },
  { id: "hi", label: "Come say hi" },
] as const;
