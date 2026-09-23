import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Arrow, ArrowUpRight, Button, Container, Eyebrow, Reveal } from "./ui";
import { IconGithub, IconGlobe, IconMail, IconPin, IconX } from "./icons";
import { SITE, scheduleMailto } from "../lib/site";
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
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
          {required ? (
            <span className="ml-1 text-accent" aria-hidden>
              *
            </span>
          ) : (
            <span className="ml-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted/70">optional</span>
          )}
        </label>
        {hint}
      </div>
      <div className="mt-2">{children}</div>
      <p id={`${id}-error`} className={cn("mt-1.5 min-h-[1.1rem] text-[13px] text-rose-300", !error && "invisible")} role={error ? "alert" : undefined}>
        {error || "\u00a0"}
      </p>
    </div>
  );
}

const inputCls = (invalid?: boolean) =>
  cn(
    "w-full rounded-xl border bg-ink/80 px-4 text-[15px] text-fg placeholder:text-muted/50 outline-none transition focus:ring-4",
    invalid ? "border-rose-400/60 focus:border-rose-400 focus:ring-rose-400/10" : "border-white/10 focus:border-accent/60 focus:ring-accent/10"
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
      setFeedback("Online delivery isn't connected yet, so your message has not been sent. You can send it by email instead — your details are ready below.");
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
      aria-labelledby="contact-form-title"
      className="relative h-full rounded-2xl border border-white/[0.08] bg-graphite/60 p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="contact-form-title" className="text-xl font-semibold tracking-tight text-fg">
          Send a message
        </h3>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
          <span className="text-accent">*</span> required
        </p>
      </div>

      {/* Honeypot — hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div className="mt-6 grid gap-x-4 gap-y-1 sm:grid-cols-2">
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
            aria-describedby="cf-name-error"
            className={cn(inputCls(!!errors.name), "h-12")}
            placeholder="Your full name"
          />
        </Field>
        <Field id="cf-email" label="Email" required error={errors.email}>
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
            aria-describedby="cf-email-error"
            className={cn(inputCls(!!errors.email), "h-12")}
            placeholder="you@company.com"
          />
        </Field>
        <Field id="cf-company" label="Company" error={errors.company}>
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
            aria-describedby="cf-company-error"
            className={cn(inputCls(!!errors.company), "h-12")}
            placeholder="Organization"
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
            aria-describedby="cf-subject-error"
            className={cn(inputCls(!!errors.subject), "h-12")}
            placeholder="e.g. AI-driven security automation"
          />
        </Field>
        <div className="sm:col-span-2">
          <Field
            id="cf-message"
            label="Message"
            required
            error={errors.message}
            hint={
              <span className={cn("font-mono text-[11px]", msgLen > LIMITS.message.max ? "text-rose-300" : "text-muted/70")} aria-live="off">
                {msgLen}/{LIMITS.message.max}
              </span>
            }
          >
            <textarea
              id="cf-message"
              name="message"
              rows={6}
              required
              value={values.message}
              onChange={onChange("message")}
              onBlur={onBlur("message")}
              aria-invalid={!!errors.message}
              aria-describedby="cf-message-error cf-message-help"
              className={cn(inputCls(!!errors.message), "resize-y py-3 leading-relaxed")}
              placeholder="Describe the problem you're working on, what you'd like to build, or how you'd like to collaborate."
            />
          </Field>
          <p id="cf-message-help" className="sr-only">
            Between {LIMITS.message.min} and {LIMITS.message.max} characters. No more than three links.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-muted">
          We use your details only to respond to your enquiry.
          {!endpointReady && " Online delivery is being set up — if it's unavailable you'll be offered an email option."}
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-fg px-7 text-sm font-semibold uppercase tracking-[0.08em] text-ink transition-all hover:shadow-[0_0_0_4px_rgba(91,140,255,0.2)] disabled:cursor-wait disabled:opacity-70"
        >
          {status === "submitting" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send Message <Arrow />
            </>
          )}
        </button>
      </div>

      {/* Status region */}
      <div role="status" aria-live="polite" className="mt-5 empty:hidden">
        {status === "sent" && (
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/[0.06] p-4 text-sm text-emerald-200">{feedback}</div>
        )}
        {(status === "error" || status === "blocked") && (
          <div className="rounded-xl border border-rose-400/30 bg-rose-400/[0.06] p-4 text-sm text-rose-200">
            {feedback}{" "}
            <a href={buildMailto(SITE.email, values)} className="font-medium text-fg underline underline-offset-4">
              Email {SITE.email}
            </a>
          </div>
        )}
        {status === "unconfigured" && (
          <div className="rounded-xl border border-accent/30 bg-accent/[0.06] p-4">
            <p className="text-sm leading-relaxed text-fg/90">{feedback}</p>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <a
                href={buildMailto(SITE.email, values)}
                className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-fg px-5 text-sm font-semibold text-ink"
              >
                Open in email app <Arrow />
              </a>
              <button
                type="button"
                onClick={copyMessage}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm text-fg hover:border-white/30"
              >
                {copied ? "Copied ✓" : "Copy message"}
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default function ContactSection() {
  const channels = [
    { label: "Email", value: SITE.email, href: `mailto:${SITE.email}`, Icon: IconMail },
    { label: "Website", value: SITE.domain, href: SITE.url, Icon: IconGlobe },
    { label: "GitHub", value: SITE.githubLabel, href: SITE.github, Icon: IconGithub },
    { label: "X", value: SITE.xLabel, href: SITE.x, Icon: IconX },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="noise relative overflow-hidden border-t border-white/[0.07] py-24 sm:py-32">
      <div className="grid-bg grid-fade absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute left-1/2 top-0 -z-10 h-[600px] w-[min(1000px,100%)] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(91,140,255,0.16), rgba(139,92,246,0.07) 45%, transparent 70%)" }}
        aria-hidden
      />
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="contact-title" className="mt-6 text-[clamp(2.4rem,8vw,6rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.05em] text-fg">
              Have a technology
              <br />
              <span className="text-gradient">problem?</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg text-muted sm:text-xl">Let's explore what we can build.</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button href="#contact-form">
                Start a Conversation <Arrow />
              </Button>
              <Button href={scheduleMailto("Contact CTA")} variant="secondary">
                Book Intro Call <ArrowUpRight />
              </Button>
              <Button href={SITE.github} variant="secondary" external>
                <IconGithub className="h-4 w-4" /> GitHub <ArrowUpRight />
              </Button>
              <Button href={SITE.x} variant="secondary" external>
                <IconX className="h-3.5 w-3.5" /> X <ArrowUpRight />
              </Button>
            </div>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-8 inline-block font-mono text-sm text-muted underline decoration-white/20 underline-offset-8 transition-colors hover:text-fg hover:decoration-accent"
            >
              {SITE.email}
            </a>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-4 lg:grid-cols-12">
          <Reveal delay={100} className="lg:col-span-5">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink">
              <address className="border-b border-white/[0.07] p-6 not-italic sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Registered company</p>
                <p className="mt-3 text-lg font-semibold tracking-tight text-fg">{SITE.legal}</p>
                <div className="mt-4 flex gap-3 text-[15px] leading-relaxed text-muted">
                  <IconPin className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  <span>
                    {SITE.address.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                </div>
              </address>
              <ul className="grid flex-1 divide-y divide-white/[0.07]">
                {channels.map((c) => {
                  const ext = c.href.startsWith("http");
                  return (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex h-full items-center gap-4 px-6 py-4 transition-colors hover:bg-graphite sm:px-8"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                          <c.Icon className="h-[18px] w-[18px]" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">{c.label}</span>
                          <span className="mt-0.5 block truncate text-[15px] font-medium text-fg">{c.value}</span>
                        </span>
                        {ext ? <ArrowUpRight className="text-muted group-hover:text-fg" /> : <Arrow className="text-muted group-hover:text-fg" />}
                        {ext && <span className="sr-only">(opens in a new tab)</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={180} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
