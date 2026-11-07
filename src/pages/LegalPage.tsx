import { SITE, scheduleMailto } from "../lib/site";
import type { RoutePath } from "../lib/router";
import { IconMail, IconPin } from "../components/icons";
import { ArrowUpRight, Button, Container, Eyebrow, Reveal } from "../components/ui";
import { cn } from "../utils/cn";

export type LegalDocKey = "privacy" | "terms" | "engagement";

type LegalSection = {
  heading: string;
  paragraphs: string[];
};

const LEGAL_DOCS: Record<
  LegalDocKey,
  {
    route: RoutePath;
    label: string;
    eyebrow: string;
    title: string;
    updated: string;
    summary: string;
    sections: LegalSection[];
  }
> = {
  privacy: {
    route: "/privacy",
    label: "Privacy Policy",
    eyebrow: "Privacy & Data Protection · DPDP Act 2023",
    title: "Privacy Policy",
    updated: "Effective Date: 1 November 2026",
    summary:
      "NEXMANCER PRIVATE LIMITED operates on a strict zero-tracking, data-minimization principle in compliance with India's Digital Personal Data Protection Act (DPDP Act 2023) and international privacy standards.",
    sections: [
      {
        heading: "1. Data Fiduciary & Controller",
        paragraphs: [
          `${SITE.legal}, registered in Tamil Nadu, India with its engineering headquarters at ${SITE.address.join(" ")} ("NEXMANCER", "we", "us"), acts as the Data Fiduciary under the Digital Personal Data Protection Act, 2023 (India) for personal data submitted through ${SITE.domain}.`,
        ],
      },
      {
        heading: "2. Zero Behavioral Tracking & Cookie Policy",
        paragraphs: [
          "This website does not deploy third-party advertising cookies, cross-site tracking pixels, session recording scripts, or behavioral fingerprinting.",
          "A single local preference key (nx-theme) may be stored in your browser's localStorage solely to remember your chosen dark or light display mode. Web fonts are served via Google Fonts, which receives standard HTTP request headers as part of static font delivery.",
        ],
      },
      {
        heading: "3. Information We Collect & Purpose",
        paragraphs: [
          "When you submit an inquiry via our contact form or email us directly, we collect only the details you voluntarily provide: your name, work email address, organization name, subject, and technical brief.",
          "This information is processed exclusively to respond to your inquiry, scope potential engineering engagements, or provide requested product information. We never sell, rent, broker, or share your contact details with third-party marketers.",
        ],
      },
      {
        heading: "4. Data Retention & Security",
        paragraphs: [
          "Business inquiry records are retained for up to 12 months for operational correspondence and audit continuity, after which they are securely purged unless part of an active commercial agreement.",
          "All transmissions over nexmancer.com are encrypted via TLS, and access to inquiry correspondence is restricted to authorized engineering and leadership personnel.",
        ],
      },
      {
        heading: "5. Your Rights & Grievance Redressal",
        paragraphs: [
          `Under the DPDP Act 2023 and applicable privacy laws, you have the right to request access to, correction of, or erasure of your personal data, and to withdraw consent at any time by emailing ${SITE.email}.`,
          `Grievance Officer: Designated Privacy & Grievance Officer, ${SITE.legal}, 6/35 1, Kutty Naicker Street, Pachapalayam, Perur, Coimbatore, Tamil Nadu 641010, India. Direct Email: legal@nexmancer.com.`,
        ],
      },
    ],
  },
  terms: {
    route: "/terms",
    label: "Terms of Use",
    eyebrow: "Website & Platform Terms",
    title: "Terms of Use",
    updated: "Effective Date: 1 November 2026",
    summary:
      "These Terms of Use govern your access to nexmancer.com and all informational materials published by NEXMANCER PRIVATE LIMITED.",
    sections: [
      {
        heading: "1. Scope & Acceptance",
        paragraphs: [
          `By accessing ${SITE.url} ("the Site"), you agree to these Terms of Use. Content on the Site is provided for informational and evaluation purposes regarding the engineering services, research, and software platforms of ${SITE.legal}.`,
        ],
      },
      {
        heading: "2. Intellectual Property Rights",
        paragraphs: [
          `All original architecture diagrams, source code, copy, visual designs, and the NEXMANCER wordmark and emblem are the exclusive intellectual property of ${SITE.legal} unless otherwise stated.`,
          "Third-party trademarks and technology names referenced on the Site (such as AWS, Node.js, Python, React, TypeScript, PostgreSQL, Docker, Kubernetes, and Linux) belong to their respective owners and are used solely to describe our production engineering stack.",
        ],
      },
      {
        heading: "3. Acceptable Use",
        paragraphs: [
          "You agree not to engage in unauthorized vulnerability scanning, automated scraping, denial-of-service attacks, or submission of malicious payloads or unsolicited commercial spam through our contact endpoints.",
        ],
      },
      {
        heading: "4. Disclaimers & Limitation of Liability",
        paragraphs: [
          "The Site and any linked demonstration environments are provided on an 'as is' and 'as available' basis without warranties of any kind, whether express or implied.",
          `To the maximum extent permitted by applicable law, ${SITE.legal} shall not be liable for any indirect, incidental, consequential, or special damages arising out of or related to your use of the Site.`,
        ],
      },
      {
        heading: "5. Governing Law & Jurisdiction",
        paragraphs: [
          "These Terms of Use are governed by and construed in accordance with the laws of India. Any dispute arising under these Terms shall be subject to the exclusive jurisdiction of the competent courts in Coimbatore, Tamil Nadu, India.",
        ],
      },
    ],
  },
  engagement: {
    route: "/engagement",
    label: "Engagement & Cancellation",
    eyebrow: "Commercial Delivery Standards",
    title: "Engagement & Cancellation Policy",
    updated: "Effective Date: 1 November 2026",
    summary:
      "Clear commercial terms for 2-week discovery sprints, architecture and security audits, and turnkey software engineering engagements.",
    sections: [
      {
        heading: "1. Master Services Agreement (MSA) & Statements of Work (SOW)",
        paragraphs: [
          `Information on ${SITE.domain} does not constitute a unilateral binding contract. All commercial engineering engagements, discovery sprints, and security audits with ${SITE.legal} are governed by a mutually signed Master Services Agreement (MSA), Non-Disclosure Agreement (NDA), and Statement of Work (SOW).`,
        ],
      },
      {
        heading: "2. Milestone Delivery & Acceptance",
        paragraphs: [
          "Projects are delivered in transparent milestones (typically 1-to-2-week sprints) with weekly engineering demonstrations and written acceptance criteria.",
          "Each milestone includes a standard 10-business-day client review and verification window prior to sign-off.",
        ],
      },
      {
        heading: "3. Client Intellectual Property Ownership",
        paragraphs: [
          "Unless explicitly agreed otherwise in writing (such as when licensing a pre-existing NEXMANCER platform), clients receive 100% ownership of custom source code, documentation, and deployment runbooks upon payment for the corresponding milestone.",
        ],
      },
      {
        heading: "4. Cancellation & Termination",
        paragraphs: [
          "Either party may terminate an active engagement in accordance with the written notice period specified in the applicable SOW (typically 14 calendar days for discovery sprints and 30 calendar days for multi-month builds).",
          "Upon termination, the client pays only for completed milestones and pro-rata work performed up to the effective termination date, and NEXMANCER hands over all work-in-progress artifacts paid for to date.",
        ],
      },
      {
        heading: "5. Communication & Response SLA",
        paragraphs: [
          `Inquiries sent to ${SITE.email} are acknowledged within one business day (Monday through Friday, 09:00–18:00 IST, UTC+5:30).`,
        ],
      },
    ],
  },
};

const TABS: LegalDocKey[] = ["privacy", "terms", "engagement"];

export default function LegalPage({ docKey }: { docKey: LegalDocKey }) {
  const current = LEGAL_DOCS[docKey];

  return (
    <section
      id="legal-page"
      aria-labelledby="legal-page-title"
      className="noise relative isolate min-h-[calc(100svh-5rem)] overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36"
    >
      <div className="grid-bg grid-fade absolute inset-0 -z-20" aria-hidden />

      <Container>
        {/* Top Breadcrumb & Route Switcher */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <a
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs font-medium text-muted transition-colors hover:text-accent"
            >
              <span aria-hidden>←</span> Back to Home
            </a>

            <nav aria-label="Legal documents" className="flex flex-wrap gap-1.5">
              {TABS.map((k) => {
                const item = LEGAL_DOCS[k];
                const active = k === docKey;
                return (
                  <a
                    key={k}
                    href={item.route}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all",
                      active
                        ? "border-accent bg-accent/15 font-semibold text-fg"
                        : "border-white/10 bg-graphite/60 text-muted hover:border-white/25 hover:text-fg"
                    )}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Document Content */}
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>{current.eyebrow}</Eyebrow>
              <h1
                id="legal-page-title"
                className="mt-4 text-3xl font-extrabold tracking-tight text-fg sm:text-5xl"
              >
                {current.title}
              </h1>
              <p className="mt-2 font-mono text-xs text-muted">{current.updated}</p>
              <p className="mt-5 text-base leading-relaxed text-fg/90 sm:text-lg">
                {current.summary}
              </p>
            </Reveal>

            <div className="mt-10 space-y-6">
              {current.sections.map((sec, idx) => (
                <Reveal key={sec.heading} delay={idx * 50}>
                  <article className="rounded-2xl border border-white/[0.08] bg-graphite/55 p-6 sm:p-7">
                    <h2 className="text-lg font-bold tracking-tight text-fg sm:text-xl">
                      {sec.heading}
                    </h2>
                    <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted">
                      {sec.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right Column: Registered Entity & Compliance Card */}
          <Reveal delay={140} className="lg:col-span-4 lg:sticky lg:top-28">
            <aside
              aria-label="Registered corporate details"
              className="overflow-hidden rounded-3xl border border-white/[0.09] bg-graphite/70"
            >
              <div className="border-b border-white/[0.08] bg-ink/60 px-6 py-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  Registered Entity Details
                </p>
              </div>
              <div className="divide-y divide-white/[0.07] p-6 text-sm">
                <div className="pb-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Legal Name</p>
                  <p className="mt-1 font-semibold text-fg">{SITE.legal}</p>
                  <p className="mt-0.5 text-xs text-muted">Private Limited · Incorporated in India</p>
                </div>

                <div className="py-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Registered Address</p>
                  <p className="mt-1.5 flex items-start gap-2 text-xs leading-relaxed text-fg/90">
                    <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{SITE.address.join(" ")} — 641010</span>
                  </p>
                </div>

                <div className="py-4">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Legal &amp; Grievance Desk</p>
                  <a
                    href="mailto:legal@nexmancer.com"
                    className="mt-1.5 inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline"
                  >
                    <IconMail className="h-4 w-4" />
                    legal@nexmancer.com
                  </a>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted">Business &amp; NDA Requests</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-1 inline-flex items-center gap-2 font-mono text-xs text-fg hover:text-accent"
                  >
                    <IconMail className="h-4 w-4 text-accent" />
                    {SITE.email}
                  </a>
                </div>

                <div className="pt-4">
                  <Button
                    href={scheduleMailto("NDA & Procurement Inquiry")}
                    variant="secondary"
                    className="w-full !text-xs"
                  >
                    Request Mutual NDA <ArrowUpRight />
                  </Button>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

