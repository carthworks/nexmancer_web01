export const SITE = {
  name: "NEXMANCER",
  legal: "NEXMANCER PRIVATE LIMITED",
  tagline: "We turn complex business challenges into intelligent technology.",
  url: "https://nexmancer.com/",
  domain: "nexmancer.com",
  email: "business@nexmancer.com",
  github: "https://github.com/NEXMANCER",
  githubLabel: "github.com/NEXMANCER",
  x: "https://x.com/nexmancer",
  xLabel: "x.com/nexmancer",
  linkedin: "https://www.linkedin.com/in/carthworks",
  linkedinLabel: "linkedin.com/in/carthworks",
  city: "Coimbatore, Tamil Nadu, India",
  address: ["6/35 1, Kutty Naicker Street,", "Pachapalayam, Perur,", "Coimbatore,", "Tamil Nadu, India"],
} as const;

export const NAV = [
  { label: "Problems", href: "#problems" },
  { label: "Capabilities", href: "#technology" },
  { label: "Services", href: "#solutions" },
  { label: "Work", href: "#case-studies" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
] as const;

export const mailto = (subject = "Problem Discovery — NEXMANCER", body = "") =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const scheduleMailto = (topic = "30-Min Discovery Call") =>
  mailto(
    `Book a 30-min call — ${topic}`,
    "Hi NEXMANCER team,\n\nI'd like to book a 30-minute call to discuss:\n- Problem we're trying to solve:\n- Current bottleneck or system:\n- Target timeline:\n\nThank you!"
  );

export const isExternal = (href: string) => /^https?:\/\//.test(href);
