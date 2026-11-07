import { SOLUTIONS, ENGAGEMENT_MODELS, PIPELINE, type ServiceSlug } from "../data/content";
import { spotlightHandler } from "../lib/hooks";
import { SITE, scheduleMailto } from "../lib/site";
import { Arrow, ArrowUpRight, Button, Container, Eyebrow, Reveal, Tag } from "../components/ui";
import { cn } from "../utils/cn";

export default function ServicesPage({ slug }: { slug?: ServiceSlug }) {
  const activeTrack = slug ? SOLUTIONS.find((s) => s.slug === slug) : undefined;

  const schema = activeTrack
    ? {
        "@context": "https://schema.org",
        "@type": "Service",
        name: activeTrack.title,
        serviceType: activeTrack.title,
        description: `${activeTrack.tagline} ${activeTrack.desc}`,
        url: `${SITE.url}services/${activeTrack.slug}`,
        provider: {
          "@type": "Organization",
          name: SITE.legal,
          url: SITE.url,
        },
        areaServed: "Worldwide",
      }
    : {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "NEXMANCER Engineering Services & Engagement Models",
        numberOfItems: SOLUTIONS.length,
        itemListElement: SOLUTIONS.map((s, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.tagline,
            url: `${SITE.url}services/${s.slug}`,
            provider: {
              "@type": "Organization",
              name: SITE.legal,
              url: SITE.url,
            },
          },
        })),
      };

  return (
    <section
      id="services-page"
      aria-labelledby="services-page-title"
      className="noise relative isolate min-h-[calc(100svh-5rem)] overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="grid-bg grid-fade absolute inset-0 -z-20" aria-hidden />
      <div
        className="absolute -right-40 -top-40 -z-10 h-[560px] w-[560px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,184,207,0.18), rgba(30,127,184,0.08) 45%, transparent 70%)" }}
        aria-hidden
      />

      <Container>
        {/* Top Breadcrumb & Track Switcher */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div className="flex items-center gap-3 font-mono text-xs text-muted">
              <a href="/" className="transition-colors hover:text-accent">
                ← Home
              </a>
              <span aria-hidden className="text-white/20">/</span>
              <a
                href="/services"
                className={cn("transition-colors hover:text-accent", !activeTrack && "font-semibold text-fg")}
              >
                Services
              </a>
              {activeTrack && (
                <>
                  <span aria-hidden className="text-white/20">/</span>
                  <span className="font-semibold text-accent">{activeTrack.code}</span>
                </>
              )}
            </div>

            <nav aria-label="Service tracks" className="flex flex-wrap gap-1.5">
              <a
                href="/services"
                aria-current={!activeTrack ? "page" : undefined}
                className={cn(
                  "rounded-full border px-3 py-1 font-mono text-[11px] transition-all",
                  !activeTrack
                    ? "border-accent bg-accent/15 font-semibold text-fg"
                    : "border-white/10 bg-graphite/60 text-muted hover:border-white/25 hover:text-fg"
                )}
              >
                All Tracks
              </a>
              {SOLUTIONS.map((s) => {
                const isCurrent = activeTrack?.slug === s.slug;
                return (
                  <a
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "rounded-full border px-3 py-1 font-mono text-[11px] transition-all",
                      isCurrent
                        ? "border-accent bg-accent/15 font-semibold text-fg"
                        : "border-white/10 bg-graphite/60 text-muted hover:border-white/25 hover:text-fg"
                    )}
                  >
                    {s.code}
                  </a>
                );
              })}
            </nav>
          </div>
        </Reveal>

        {activeTrack ? (
          /* ================= SINGLE SERVICE DEEP-DIVE (/services/:slug) ================= */
          <div className="mt-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Reveal>
                  <Eyebrow>
                    Service Track · {activeTrack.code} · {activeTrack.timeline}
                  </Eyebrow>
                </Reveal>
                <Reveal delay={80}>
                  <h1
                    id="services-page-title"
                    className="mt-4 text-3xl font-extrabold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl"
                  >
                    {activeTrack.title}
                  </h1>
                </Reveal>
                <Reveal delay={140}>
                  <p className="mt-5 max-w-3xl text-lg font-medium leading-snug text-fg/90 sm:text-xl">
                    {activeTrack.tagline}
                  </p>
                  <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
                    {activeTrack.desc}
                  </p>
                </Reveal>
              </div>

              <Reveal delay={180} className="lg:col-span-4">
                <div className="rounded-2xl border border-accent/25 bg-graphite/70 p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                    Ideal Buyer Profile
                  </p>
                  <p className="mt-1 text-base font-semibold text-fg">{activeTrack.buyer}</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                    Typical Delivery Window
                  </p>
                  <p className="mt-1 font-mono text-sm text-fg/90">{activeTrack.timeline}</p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <Button href={scheduleMailto(activeTrack.title)} className="w-full">
                      Book a Discovery Call <ArrowUpRight />
                    </Button>
                    <Button href="/engagement" variant="secondary" className="w-full !text-xs">
                      Review Commercial &amp; IP Terms <Arrow />
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Problem vs Engineered Architecture */}
            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-rose-500/25 bg-rose-500/[0.04] p-7 sm:p-8">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-rose-400">
                      <span className="h-2 w-2 rounded-full bg-rose-500" />
                      The Operational Bottleneck
                    </div>
                    <h2 className="mt-4 text-xl font-bold tracking-tight text-fg sm:text-2xl">
                      Why teams bring us in
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-fg/85 sm:text-base">
                      {activeTrack.problemStatement}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-white/[0.08] pt-4 font-mono text-xs text-muted">
                    Diagnosed in a 2-Week Problem Discovery Sprint before full commitment.
                  </div>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-accent/25 bg-accent/[0.04] p-7 sm:p-8">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      Engineered Architecture
                    </div>
                    <h2 className="mt-4 text-xl font-bold tracking-tight text-fg sm:text-2xl">
                      How we solve it in production
                    </h2>
                    <p className="mt-3 text-[15px] leading-relaxed text-fg/85 sm:text-base">
                      {activeTrack.architecture}
                    </p>
                  </div>
                  <div className="mt-6 border-t border-white/[0.08] pt-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Production Stack:</span>
                    <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Technology stack">
                      {activeTrack.stack.map((tech) => (
                        <li key={tech}>
                          <Tag>{tech}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Deliverables & Verifiable Outcomes */}
            <div className="mt-8 grid gap-6 lg:grid-cols-12">
              <Reveal className="lg:col-span-6">
                <div className="h-full rounded-3xl border border-white/[0.09] bg-graphite/60 p-7 sm:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    What You Receive at Handover
                  </p>
                  <h2 className="mt-2 text-xl font-bold tracking-tight text-fg">
                    Concrete engineering deliverables
                  </h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {activeTrack.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-ink/70 px-4 py-3 text-sm font-medium text-fg"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={90} className="lg:col-span-6">
                <div className="h-full rounded-3xl border border-white/[0.09] bg-graphite/60 p-7 sm:p-8">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-400">
                    Business &amp; Technical Impact
                  </p>
                  <h2 className="mt-2 text-xl font-bold tracking-tight text-fg">
                    Verifiable operational outcomes
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {activeTrack.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-3 text-sm leading-relaxed text-fg/90">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>

            {/* Service Track FAQs */}
            <Reveal delay={140} className="mt-12">
              <div className="rounded-3xl border border-white/[0.09] bg-graphite/50 p-7 sm:p-10">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  Buyer FAQ · {activeTrack.code}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-fg">
                  Common questions before kicking off
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  {activeTrack.faqs.map((faq) => (
                    <div key={faq.q} className="rounded-2xl border border-white/[0.07] bg-ink/70 p-6">
                      <h3 className="text-base font-bold text-fg">{faq.q}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Other Service Tracks Navigation */}
            <Reveal delay={180} className="mt-12">
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-8">
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent hover:text-fg"
                >
                  ← View all 5 service tracks &amp; engagement models
                </a>
                <a
                  href="/work"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-fg/80 hover:text-accent"
                >
                  Inspect related case studies (/work) →
                </a>
              </div>
            </Reveal>
          </div>
        ) : (
          /* ================= ALL SERVICES OVERVIEW (/services) ================= */
          <div className="mt-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <Eyebrow>Services &amp; Engagement Models</Eyebrow>
                </Reveal>
                <Reveal delay={80}>
                  <h1
                    id="services-page-title"
                    className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl"
                  >
                    Production engineering,
                    <br />
                    <span className="text-gradient">scoped around your bottleneck.</span>
                  </h1>
                </Reveal>
              </div>
              <Reveal delay={160} className="lg:col-span-5">
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  Every NEXMANCER engagement starts with the concrete operational problem you need solved — delivering verifiable software, cited private AI, reachability-first security, or cloud scale with 100% client IP ownership.
                </p>
              </Reveal>
            </div>

            {/* 5 Service Tracks Grid */}
            <ul className="mt-12 grid gap-6 lg:grid-cols-2">
              {SOLUTIONS.map((s, i) => (
                <Reveal
                  as="li"
                  key={s.slug}
                  delay={i * 60}
                  className={cn(i === 0 && "lg:col-span-2")}
                >
                  <article
                    onPointerMove={spotlightHandler}
                    className="spotlight group flex h-full flex-col justify-between rounded-3xl border border-white/[0.09] bg-graphite/60 p-6 transition-all duration-300 hover:border-white/20 hover:bg-graphite/85 sm:p-8"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs font-semibold text-accent">
                          {s.code} · {s.timeline}
                        </span>
                        <span className="font-mono text-xs text-muted">
                          Built for: <strong className="text-fg/90">{s.buyer}</strong>
                        </span>
                      </div>

                      <h2 className="mt-4 text-2xl font-bold tracking-tight text-fg group-hover:text-accent transition-colors sm:text-3xl">
                        <a href={`/services/${s.slug}`}>{s.title}</a>
                      </h2>
                      <p className="mt-2 text-base font-medium text-fg/90">{s.tagline}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted sm:text-[15px]">{s.desc}</p>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                      <ul className="flex flex-wrap gap-1.5" aria-label="Deliverables">
                        {s.deliverables.map((d) => (
                          <li key={d}>
                            <Tag>{d}</Tag>
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center gap-4">
                        <a
                          href={`/services/${s.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-4 py-2 font-mono text-xs font-semibold text-fg transition-all hover:border-accent hover:bg-accent/20"
                        >
                          Full Service Scope <Arrow />
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>

            {/* 3 Engagement Models */}
            <div className="mt-20">
              <Reveal>
                <Eyebrow>How We Collaborate</Eyebrow>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                  Three ways to engage our engineering team
                </h2>
              </Reveal>
              <div className="mt-8 grid gap-5 md:grid-cols-3">
                {ENGAGEMENT_MODELS.map((em, i) => (
                  <Reveal key={em.title} delay={i * 70}>
                    <div className="flex h-full flex-col justify-between rounded-2xl border border-white/[0.09] bg-graphite/50 p-6">
                      <div>
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                          {em.badge}
                        </span>
                        <h3 className="mt-4 text-lg font-bold text-fg">{em.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{em.desc}</p>
                      </div>
                      <div className="mt-6 border-t border-white/[0.06] pt-4">
                        <a
                          href={scheduleMailto(em.title)}
                          className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:text-fg"
                        >
                          Scope this model <Arrow />
                        </a>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* 6-Step Engineering Methodology */}
            <div className="mt-20">
              <Reveal>
                <Eyebrow>Delivery Lifecycle</Eyebrow>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                  From diagnosis to 100% IP handover
                </h2>
              </Reveal>
              <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PIPELINE.map((step, idx) => (
                  <Reveal as="li" key={step.t} delay={idx * 50}>
                    <div className="h-full rounded-2xl border border-white/[0.08] bg-ink/70 p-5">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-accent">0{idx + 1} · {step.t}</span>
                        <span className="text-muted">{step.fn}</span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{step.d}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

