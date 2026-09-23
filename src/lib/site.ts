export const SITE = {
  name: "NEXMANCER",
  legal: "NEXMANCER PRIVATE LIMITED",
  tagline: "Building what's next.",
  url: "https://nexmancer.com/",
  domain: "nexmancer.com",
  email: "business@nexmancer.com",
  github: "https://github.com/NEXMANCER",
  githubLabel: "github.com/NEXMANCER",
  x: "https://x.com/nexmancer",
  xLabel: "x.com/nexmancer",
  city: "Coimbatore, Tamil Nadu, India",
  address: ["6/35 1, Kutty Naicker Street,", "Pachapalayam, Perur,", "Coimbatore,", "Tamil Nadu, India"],
} as const;

export const NAV = [
  { label: "Technology", href: "#technology" },
  { label: "Methodology", href: "#pipeline" },
  { label: "Products", href: "#products" },
  { label: "Work", href: "#case-studies" },
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const mailto = (subject = "Let's build with NEXMANCER", body = "") =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;

export const scheduleMailto = (topic = "General Discovery") =>
  mailto(`Schedule a Discovery Call — ${topic}`, "Hi NEXMANCER team,\n\nI'd like to schedule a 15-minute intro call to discuss:\n- Project/Problem:\n- Target Timeline:\n- Preferred Dates/Times:\n\nThank you!");

export const isExternal = (href: string) => /^https?:\/\//.test(href);
