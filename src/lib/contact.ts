/**
 * Contact submission layer.
 *
 * - Sanitizes + validates input on the client (the receiving server MUST validate again).
 * - Basic spam protection: honeypot field, minimum fill time, link-count heuristic, client rate limit.
 * - Sends JSON to VITE_CONTACT_ENDPOINT when configured.
 * - When no endpoint is configured it returns `unconfigured` — the UI then offers an email
 *   fallback. It never reports a fake success.
 */

export type ContactFields = {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

export type SubmitResult =
  | { status: "sent" }
  | { status: "unconfigured" }
  | { status: "error"; message: string }
  | { status: "blocked"; message: string };

export const LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  company: { max: 100 },
  subject: { min: 3, max: 120 },
  message: { min: 20, max: 4000 },
} as const;

const MIN_FILL_MS = 1200;
const RATE_LIMIT_MS = 60_000;
const RATE_KEY = "nx_contact_last";
const MAX_LINKS = 3;

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,24}$/i;

/** Remove control chars and angle brackets, normalise whitespace, trim. */
export function sanitize(value: string, multiline = false): string {
  let v = value.normalize("NFKC");
  // strip control chars (keep \n and \t in multiline)
  // eslint-disable-next-line no-control-regex
  v = v.replace(multiline ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, "");
  v = v.replace(/[<>]/g, "");
  if (multiline) {
    v = v.replace(/\r\n?/g, "\n").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n");
  } else {
    v = v.replace(/\s+/g, " ");
  }
  return v.trim();
}

export function sanitizeAll(f: ContactFields): ContactFields {
  return {
    name: sanitize(f.name).slice(0, LIMITS.name.max),
    email: sanitize(f.email).toLowerCase().slice(0, LIMITS.email.max),
    company: sanitize(f.company).slice(0, LIMITS.company.max),
    subject: sanitize(f.subject).slice(0, LIMITS.subject.max),
    message: sanitize(f.message, true).slice(0, LIMITS.message.max),
  };
}

export function validate(raw: ContactFields): ContactErrors {
  const f = sanitizeAll(raw);
  const e: ContactErrors = {};

  if (!f.name) e.name = "Please enter your name.";
  else if (f.name.length < LIMITS.name.min) e.name = `Name must be at least ${LIMITS.name.min} characters.`;

  if (!f.email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(f.email)) e.email = "Please enter a valid email address.";

  if (f.company.length > LIMITS.company.max) e.company = `Keep this under ${LIMITS.company.max} characters.`;

  if (!f.subject) e.subject = "Please add a subject.";
  else if (f.subject.length < LIMITS.subject.min) e.subject = `Subject must be at least ${LIMITS.subject.min} characters.`;

  if (!f.message) e.message = "Please describe what you'd like to discuss.";
  else if (f.message.length < LIMITS.message.min) e.message = `Please write at least ${LIMITS.message.min} characters.`;
  else if (raw.message.length > LIMITS.message.max) e.message = `Please keep your message under ${LIMITS.message.max} characters.`;
  else if ((f.message.match(/https?:\/\//gi) || []).length > MAX_LINKS) e.message = `Please include no more than ${MAX_LINKS} links.`;

  return e;
}

export function spamCheck(opts: { honeypot: string; startedAt: number }): string | null {
  if (opts.honeypot.trim() !== "") return "Submission blocked.";
  if (Date.now() - opts.startedAt < MIN_FILL_MS) return "That was quick — please take a moment and try again.";
  try {
    const last = Number(localStorage.getItem(RATE_KEY) || 0);
    if (last && Date.now() - last < RATE_LIMIT_MS) return "You've just sent a message. Please wait a minute before sending another.";
  } catch {
    /* storage unavailable — ignore */
  }
  return null;
}

function markSent() {
  try {
    localStorage.setItem(RATE_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function getEndpoint(): string | null {
  const url = (import.meta.env.VITE_CONTACT_ENDPOINT || "").trim();
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.hostname === "localhost" ? u.toString() : null;
  } catch {
    return null;
  }
}

export async function submitContact(raw: ContactFields, spam: { honeypot: string; startedAt: number }): Promise<SubmitResult> {
  const blocked = spamCheck(spam);
  if (blocked) return { status: "blocked", message: blocked };

  const data = sanitizeAll(raw);
  const endpoint = getEndpoint();
  if (!endpoint) return { status: "unconfigured" };

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...data, source: "nexmancer.com" }),
      signal: controller.signal,
      credentials: "omit",
      referrerPolicy: "strict-origin-when-cross-origin",
    });
    if (!res.ok) return { status: "error", message: `The server responded with ${res.status}. Please try again or email us directly.` };
    markSent();
    return { status: "sent" };
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === "AbortError";
    return { status: "error", message: aborted ? "The request timed out. Please try again or email us directly." : "Network error. Please try again or email us directly." };
  } finally {
    window.clearTimeout(timer);
  }
}

/** Builds a mailto: fallback with the (sanitized) message pre-filled. */
export function buildMailto(to: string, raw: ContactFields): string {
  const f = sanitizeAll(raw);
  const body = [f.message, "", "—", f.name, f.company, f.email].filter((l, i) => i < 3 || l).join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(f.subject || "Enquiry via nexmancer.com")}&body=${encodeURIComponent(body)}`;
}
