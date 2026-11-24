const envScheduler =
  typeof import.meta !== "undefined" && import.meta.env
    ? (import.meta.env.VITE_SCHEDULER_URL || "").trim()
    : "";

export const SITE = {
  name: "NEXMANCER",
  legal: "NEXMANCER PRIVATE LIMITED",
  tagline: "We turn complex business challenges into intelligent technology.",
  url: "https://nexmancer.com/",
  domain: "nexmancer.com",
  email: "business@nexmancer.com",
  altEmail: "admin.nexmancer@gmail.com",
  legalEmail: "legal@nexmancer.com",
  responseSla: "Within 1 business day (Mon–Fri, 09:00–18:00 IST)",
  schedulerUrl: envScheduler,
  github: "https://github.com/NEXMANCER",
  githubLabel: "github.com/NEXMANCER",
  x: "https://x.com/nexmancer",
  xLabel: "x.com/nexmancer",
  linkedin: "https://www.linkedin.com/company/nexmancer",
  linkedinLabel: "linkedin.com/company/nexmancer",
  city: "Coimbatore, Tamil Nadu, India",
  address: ["6/35 1, Kutty Naicker Street,", "Pachapalayam, Perur,", "Coimbatore,", "Tamil Nadu, India"],
} as const;

export type NavMenuKey = "services" | "work" | "products";

export const NAV: readonly { label: string; href: string; menu?: NavMenuKey }[] = [
  { label: "Services", href: "/services", menu: "services" },
  { label: "Work", href: "/work", menu: "work" },
  { label: "Products", href: "/products", menu: "products" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

/** URL-safe id for in-page anchors, e.g. "Hyperlocal Heat" → "hyperlocal-heat". */
export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const mailto = (subject = "Problem Discovery — NEXMANCER", body = "") =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

/**
 * Returns the external scheduler URL (Cal.com / Calendly) when `VITE_SCHEDULER_URL` is set;
 * otherwise routes smoothly to the on-page `#contact` console with the topic pre-filled
 * (avoiding broken desktop `mailto:` popups).
 */
export const scheduleMailto = (topic = "Discovery Call") => {
  if (SITE.schedulerUrl) {
    const sep = SITE.schedulerUrl.includes("?") ? "&" : "?";
    return `${SITE.schedulerUrl}${sep}topic=${encodeURIComponent(topic)}`;
  }
  return `/#contact?topic=${encodeURIComponent(`Discovery Call — ${topic}`)}`;
};

/** Direct mailto link for users who explicitly click "Email App" inside the Contact section. */
export const directScheduleMailto = (topic = "30-Min Discovery Call") =>
  mailto(
    `Book a Discovery Call — ${topic}`,
    "Hi NEXMANCER team,\n\nI'd like to schedule a discovery call to discuss:\n- Problem we're trying to solve:\n- Current bottleneck or system:\n- Target timeline:\n\nThank you!"
  );

export const isExternal = (href: string) => /^https?:\/\//.test(href);
