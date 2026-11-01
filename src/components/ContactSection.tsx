import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Arrow, ArrowUpRight, Container, Eyebrow, Reveal } from "./ui";
import { IconGlobe, IconMail, IconPin, IconX } from "./icons";
import { SITE, scheduleMailto } from "../lib/site";
import { PRODUCTS } from "../data/content";
import { spotlightHandler } from "../lib/hooks";
import {
  LIMITS,
  buildMailto,
  getEndpoint,
  submitContact,
  validate,
  type ContactErrors,
  type ContactFields,
  type SubmitResult,
} from "../lib/contact";
import { cn } from "../utils/cn";

const EMPTY: ContactFields = { name: "", email: "", company: "", subject: "", message: "" };
const ORDER: (keyof ContactFields)[] = ["name", "email", "company", "subject", "message"];

const TOPICS = [
  ...PRODUCTS.map((p) => ({ label: p.name, subject: `Product Inquiry — ${p.name} (${p.code})` })),
  { label: "Custom AI / R&D", subject: "Enterprise AI & Applied R&D Inquiry" },
  { label: "Security Audit", subject: "Architecture & Security Audit Inquiry" },
  { label: "Partnership", subject: "Strategic Partnership & Commercial Inquiry" },
];

type Status = "idle" | "submitting" | SubmitResult["status"];

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          {label}
          {required ? (
            <span className="ml-1 text-accent" aria-hidden>
              *
            </span>
          ) : (
            <span className="ml-1.5 text-[10px] lowercase tracking-normal text-muted/60">(opt)</span>
          )}
        </label>
        {hint}
      </div>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[12px] text-rose-500 dark:text-rose-300" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls = (invalid?: boolean) =>
  cn(
    "w-full rounded-xl border bg-ink/80 px-3.5 text-[14px] text-fg placeholder:text-muted/45 outline-none transition focus:ring-2",
    invalid ? "border-rose-400/60 focus:border-rose-400 focus:ring-rose-400/15" : "border-white/10 focus:border-accent/60 focus:ring-accent/15"
  );

function ContactForm() {
  const [values, setValues] = useState<ContactFields>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const endpointReady = getEndpoint() !== null;

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const onChange = (k: keyof ContactFields) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors((prev) => ({ ...prev, [k]: validate(next)[k] }));
    if (status !== "idle" && status !== "submitting") setStatus("idle");
  };

  const onBlur = (k: keyof ContactFields) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((prev) => ({ ...prev, [k]: validate(values)[k] }));
  };

  const selectTopic = (subject: string) => {
    const next = { ...values, subject };
    setValues(next);
    if (touched.subject) setErrors((prev) => ({ ...prev, subject: validate(next).subject }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, company: true, subject: true, message: true });
    const first = ORDER.find((k) => errs[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#cf-${first}`)?.focus();
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    setFeedback("");
    const res = await submitContact(values, { honeypot, startedAt: startedAt.current });
    setStatus(res.status);
    if (res.status === "sent") {
      setFeedback(`Thank you — your message has been sent. We'll reply to ${values.email.trim()}.`);
      setValues(EMPTY);
      setTouched({});
      startedAt.current = Date.now();
    } else if (res.status === "error" || res.status === "blocked") {
      setFeedback(res.message);
    } else if (res.status === "unconfigured") {
      setFeedback("Online delivery isn't connected yet — send directly via your email client or copy below.");
    }
  };

  const copyMessage = async () => {
    const text = `To: ${SITE.email}\nSubject: ${values.subject}\n\n${values.message}\n\n— ${values.name}${values.company ? `, ${values.company}` : ""}\n${values.email}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const msgLen = values.message.trim().length;

  return (
    <form
      id="contact-form"
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      onPointerMove={spotlightHandler}
      aria-labelledby="contact-form-title"
      className="spotlight relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.09] bg-graphite/60 p-5 sm:p-7"
    >
      {/* Terminal Header Bar */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.07] pb-4">
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(34,184,207,0.8)]" aria-hidden />
            <h3 id="contact-form-title" className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-fg">
              Direct Dispatch // Initiate Scope
            </h3>
          </div>
          <span className="font-mono text-[10.5px] text-muted">
            SLA: <strong className="font-medium text-accent">&lt; 24h response</strong>
          </span>
        </div>

        {/* Honeypot */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="cf-website">Website</label>
          <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
        </div>

        {/* Quick Topic Selector Chips */}
        <div className="mt-4">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">Quick-Select Topic</p>
          <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Quick topic presets">
            {TOPICS.map((t) => {
              const active = values.subject === t.subject;
              return (
                <button
                  key={t.label}
                  type="button"
                  onClick={() => selectTopic(t.subject)}
                  className={cn(
                    "rounded-full border px-2.5 py-1 font-mono text-[11px] transition-all",
                    active
                      ? "border-accent bg-accent/15 text-fg shadow-[0_0_12px_rgba(34,184,207,0.25)]"
                      : "border-white/10 bg-ink/50 text-muted hover:border-white/25 hover:text-fg"
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Form Grid */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field id="cf-name" label="Name" required error={errors.name}>
            <input
              id="cf-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength={LIMITS.name.max}
              value={values.name}
              onChange={onChange("name")}
              onBlur={onBlur("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "cf-name-error" : undefined}
              className={cn(inputCls(!!errors.name), "h-10")}
              placeholder="Your name"
            />
          </Field>
          <Field id="cf-email" label="Work Email" required error={errors.email}>
            <input
              id="cf-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              maxLength={LIMITS.email.max}
              value={values.email}
              onChange={onChange("email")}
              onBlur={onBlur("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "cf-email-error" : undefined}
              className={cn(inputCls(!!errors.email), "h-10")}
              placeholder="you@company.com"
            />
          </Field>
          <Field id="cf-company" label="Organization" error={errors.company}>
            <input
              id="cf-company"
              name="company"
              type="text"
              autoComplete="organization"
              maxLength={LIMITS.company.max}
              value={values.company}
              onChange={onChange("company")}
              onBlur={onBlur("company")}
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? "cf-company-error" : undefined}
              className={cn(inputCls(!!errors.company), "h-10")}
              placeholder="Company or team"
            />
          </Field>
          <Field id="cf-subject" label="Subject" required error={errors.subject}>
            <input
              id="cf-subject"
              name="subject"
              type="text"
              required
              maxLength={LIMITS.subject.max}
              value={values.subject}
              onChange={onChange("subject")}
              onBlur={onBlur("subject")}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "cf-subject-error" : undefined}
              className={cn(inputCls(!!errors.subject), "h-10")}
              placeholder="Select a chip or type subject"
            />
          </Field>
          <div className="sm:col-span-2">
            <Field
              id="cf-message"
              label="Technical Brief / Message"
              required
              error={errors.message}
              hint={
                <span className={cn("font-mono text-[10.5px]", msgLen > LIMITS.message.max ? "text-rose-500" : "text-muted/70")} aria-live="off">
                  {msgLen}/{LIMITS.message.max}
                </span>
              }
            >
              <textarea
                id="cf-message"
                name="message"
                rows={3}
                required
                value={values.message}
                onChange={onChange("message")}
                onBlur={onBlur("message")}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "cf-message-error cf-message-help" : "cf-message-help"}
                className={cn(inputCls(!!errors.message), "resize-y py-2.5 leading-relaxed")}
                placeholder="Share your architecture goals, product interest, or timeline..."
              />
            </Field>
            <p id="cf-message-help" className="sr-only">
              Between {LIMITS.message.min} and {LIMITS.message.max} characters. No more than three links.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Submit Bar */}
      <div className="mt-4 border-t border-white/[0.07] pt-4">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11.5px] leading-snug text-muted">
            Zero tracking. Used solely to respond to your inquiry.
            {!endpointReady && " Direct email fallback ready."}
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-fg px-6 text-xs font-semibold uppercase tracking-[0.1em] text-ink transition-all hover:opacity-90 hover:shadow-[0_0_0_4px_rgba(34,184,207,0.2)] disabled:cursor-wait disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden />
                Dispatching…
              </>
            ) : (
              <>
                Transmit Message <Arrow />
              </>
            )}
          </button>
        </div>

        {/* Status feedback */}
        <div role="status" aria-live="polite" className="mt-3 empty:hidden">
          {status === "sent" && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.08] p-3 text-xs text-fg">{feedback}</div>
          )}
          {(status === "error" || status === "blocked") && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/[0.08] p-3 text-xs text-fg">
              {feedback}{" "}
              <a href={buildMailto(SITE.email, values)} className="font-medium text-fg underline underline-offset-4">
                Email {SITE.email}
              </a>
            </div>
          )}
          {status === "unconfigured" && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-accent/30 bg-accent/[0.06] p-3">
              <p className="text-xs text-fg/90">{feedback}</p>
              <div className="flex items-center gap-2">
                <a
                  href={buildMailto(SITE.email, values)}
                  className="group inline-flex h-8 items-center gap-1.5 rounded-full bg-fg px-3.5 text-xs font-semibold text-ink"
                >
                  Open Email <Arrow />
                </a>
                <button
                  type="button"
                  onClick={copyMessage}
                  className="inline-flex h-8 items-center rounded-full border border-white/15 px-3 text-xs text-fg hover:border-white/30"
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyDirectEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const channels = [
    { label: "X / Twitter", value: SITE.xLabel, href: SITE.x, Icon: IconX },
    { label: "Domain", value: SITE.domain, href: SITE.url, Icon: IconGlobe },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="noise relative flex min-h-[calc(100svh-4.5rem)] items-center overflow-hidden border-t border-white/[0.07] py-12 sm:py-16"
    >
      <div className="grid-bg grid-fade absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute left-1/2 top-0 -z-10 h-[500px] w-[min(960px,100%)] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(34,184,207,0.16), rgba(30,127,184,0.07) 45%, transparent 70%)" }}
        aria-hidden
      />

      <Container>
        <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Command Header + Direct Channels + HQ */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <Eyebrow>Contact &amp; Discovery</Eyebrow>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> IST (UTC+5:30) · Online
                  </span>
                </div>
              </Reveal>

              <Reveal delay={60}>
                <h2
                  id="contact-title"
                  className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-fg sm:text-5xl"
                >
                  Have a hard
                  <br />
                  <span className="text-gradient">tech problem?</span>
                </h2>
              </Reveal>

              <Reveal delay={120}>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-[15px]">
                  Initiate a technical discovery call, request a product demo, or scope an engineering engagement directly with our team.
                </p>
              </Reveal>

              {/* Direct Email Copy / Action Card */}
              <Reveal delay={160}>
                <div className="mt-5 rounded-2xl border border-white/[0.08] bg-graphite/60 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Direct Dispatch</span>
                    <span className="font-mono text-[10px] text-muted">Mon–Fri · 09:00–18:00 IST</span>
                  </div>
                  <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                    <a
                      href={`mailto:${SITE.email}`}
                      className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-fg transition-colors hover:text-accent sm:text-base"
                    >
                      <IconMail className="h-4 w-4 text-accent" />
                      {SITE.email}
                    </a>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={copyDirectEmail}
                        className="rounded-lg border border-white/10 bg-ink/70 px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent/40 hover:text-fg"
                      >
                        {copiedEmail ? "Copied ✓" : "Copy"}
                      </button>
                      <a
                        href={scheduleMailto("15-Min Discovery Call")}
                        className="inline-flex items-center gap-1 rounded-lg border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[11px] font-medium text-accent transition-colors hover:bg-accent/20"
                      >
                        Book 15m Call <ArrowUpRight />
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Bottom Left: Compact HQ + Social Channels */}
            <Reveal delay={220} className="mt-5">
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink/80">
                <address className="flex items-start gap-3 border-b border-white/[0.07] p-4 not-italic">
                  <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <div className="min-w-0 text-xs leading-relaxed text-muted">
                    <p className="font-semibold text-fg">{SITE.legal}</p>
                    <p className="mt-0.5 truncate sm:whitespace-normal">{SITE.address.join(" ")}</p>
                  </div>
                </address>
                <ul className="grid grid-cols-2 divide-x divide-white/[0.07]">
                  {channels.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-2 px-3.5 py-3 transition-colors hover:bg-graphite"
                      >
                        <span className="flex items-center gap-2 min-w-0">
                          <c.Icon className="h-3.5 w-3.5 shrink-0 text-muted group-hover:text-accent transition-colors" />
                          <span className="truncate font-mono text-[11px] font-medium text-fg">{c.label}</span>
                        </span>
                        <ArrowUpRight className="text-xs text-muted group-hover:text-fg" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Interactive Single-Fold Dispatch Console */}
          <Reveal delay={120} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
