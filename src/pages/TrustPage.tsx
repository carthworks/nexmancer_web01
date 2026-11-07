import { TRUST_PILLARS, TRUST_CONTROLS, ABOUT_STATS } from "../data/content";
import { IconMail, IconPin, IconShield } from "../components/icons";
import { Arrow, ArrowUpRight, Button, Container, Eyebrow, Reveal } from "../components/ui";
import { SITE, scheduleMailto } from "../lib/site";

export default function TrustPage() {
  return (
    <section
      id="trust-page"
      aria-labelledby="trust-page-title"
      className="noise relative isolate min-h-[calc(100svh-5rem)] overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36"
    >
      <div className="grid-bg grid-fade absolute inset-0 -z-20" aria-hidden />

      <Container>
        {/* Top Breadcrumb */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <a
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs font-medium text-muted transition-colors hover:text-accent"
            >
              <span aria-hidden>←</span> Back to Home
            </a>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
              <a href="/privacy" className="text-muted hover:text-fg">Privacy (DPDP 2023)</a>
              <span aria-hidden className="text-white/20">·</span>
              <a href="/terms" className="text-muted hover:text-fg">Terms</a>
              <span aria-hidden className="text-white/20">·</span>
              <a href="/engagement" className="text-muted hover:text-fg">Engagement &amp; IP Policy</a>
            </div>
          </div>
        </Reveal>

        {/* Hero Header */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Trust, Security &amp; Procurement Center</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1
                id="trust-page-title"
                className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl"
              >
                Built for technical
                <br />
                <span className="text-gradient">and legal diligence.</span>
              </h1>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Transparent security posture, 100% client IP ownership, local-first deployment options, and registered corporate governance for CTOs, CISOs, and procurement teams.
            </p>
          </Reveal>
        </div>

        {/* 4 Core Trust Pillars */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {TRUST_PILLARS.map((pillar, idx) => (
            <Reveal key={pillar.code} delay={idx * 70}>
              <article className="flex h-full flex-col justify-between rounded-3xl border border-white/[0.09] bg-graphite/60 p-7 sm:p-8">
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs font-semibold text-accent">{pillar.code}</span>
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-0.5 font-mono text-[11px] font-medium text-emerald-400">
                      {pillar.badge}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-fg">{pillar.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{pillar.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Security & Governance Controls Matrix */}
        <div className="mt-16">
          <Reveal>
            <Eyebrow>Security &amp; Governance Posture</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              Technical and commercial safeguards across every build
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {TRUST_CONTROLS.map((group, idx) => (
              <Reveal key={group.domain} delay={idx * 80}>
                <div className="h-full rounded-3xl border border-white/[0.09] bg-ink/80 p-7">
                  <div className="flex items-center gap-2.5 text-accent">
                    <IconShield className="h-5 w-5" />
                    <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                      {group.domain}
                    </h3>
                  </div>
                  <ul className="mt-5 space-y-3.5 text-sm leading-relaxed text-fg/90">
                    {group.controls.map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Corporate Procurement Dossier */}
        <Reveal delay={160} className="mt-16">
          <div className="rounded-3xl border border-white/[0.09] bg-graphite/65 p-7 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  Vendor Onboarding &amp; Procurement Dossier
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                  {SITE.legal}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  Registered Indian Private Limited company headquartered in Coimbatore, Tamil Nadu. We execute mutual NDAs prior to architecture review and contract through milestone-based Statements of Work (SOW).
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {ABOUT_STATS.map((st) => (
                    <div key={st.label} className="rounded-2xl border border-white/[0.07] bg-ink/70 p-4">
                      <p className="text-xl font-extrabold text-fg">{st.value}</p>
                      <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-accent">{st.label}</p>
                      <p className="mt-0.5 text-xs text-muted">{st.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-ink/80 p-6 lg:col-span-5">
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Registered Office</p>
                    <p className="mt-1 flex items-start gap-2 text-xs leading-relaxed text-fg/90">
                      <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{SITE.address.join(" ")} — 641010</span>
                    </p>
                  </div>

                  <div className="border-t border-white/[0.07] pt-3">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Direct Procurement &amp; NDA Desk</p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="mt-1 inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline"
                    >
                      <IconMail className="h-4 w-4" />
                      {SITE.email}
                    </a>
                    <p className="mt-1 text-xs text-muted">Response SLA: {SITE.responseSla}</p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 border-t border-white/[0.07] pt-4">
                    <Button href={scheduleMailto("Mutual NDA & Security Review")}>
                      Request Mutual NDA <ArrowUpRight />
                    </Button>
                    <Button href="/engagement" variant="secondary">
                      MSA &amp; IP Terms <Arrow />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

