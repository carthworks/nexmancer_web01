import { CASE_STUDIES, type CaseStudySlug } from "../data/content";
import { spotlightHandler } from "../lib/hooks";
import { SITE, scheduleMailto } from "../lib/site";
import { Arrow, ArrowUpRight, Button, Container, Eyebrow, Reveal, Tag } from "../components/ui";
import { cn } from "../utils/cn";

export default function WorkPage({ slug }: { slug?: CaseStudySlug }) {
  const activeStudy = slug ? CASE_STUDIES.find((c) => c.id === slug) : undefined;

  const schema = activeStudy
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: activeStudy.title,
        description: activeStudy.summary,
        url: `${SITE.url}work/${activeStudy.id}`,
        author: {
          "@type": "Organization",
          name: SITE.legal,
          url: SITE.url,
        },
      }
    : {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Proof of Work & Engineering Case Studies — NEXMANCER",
        description:
          "How NEXMANCER solves high-consequence bottlenecks in vulnerability reachability triage, deterministic psychometric grading, and air-gapped document RAG.",
        url: `${SITE.url}work`,
      };

  return (
    <section
      id="work-page"
      aria-labelledby="work-page-title"
      className="noise relative isolate min-h-[calc(100svh-5rem)] overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="grid-bg grid-fade absolute inset-0 -z-20" aria-hidden />
      <div
        className="absolute -left-40 -top-40 -z-10 h-[560px] w-[560px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,184,207,0.18), rgba(30,127,184,0.08) 45%, transparent 70%)" }}
        aria-hidden
      />

      <Container>
        {/* Top Breadcrumb & Case Study Switcher */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div className="flex items-center gap-3 font-mono text-xs text-muted">
              <a href="/" className="transition-colors hover:text-accent">
                ← Home
              </a>
              <span aria-hidden className="text-white/20">/</span>
              <a
                href="/work"
                className={cn("transition-colors hover:text-accent", !activeStudy && "font-semibold text-fg")}
              >
                Proof of Work
              </a>
              {activeStudy && (
                <>
                  <span aria-hidden className="text-white/20">/</span>
                  <span className="font-semibold text-accent">{activeStudy.tag}</span>
                </>
              )}
            </div>

            <nav aria-label="Case studies" className="flex flex-wrap gap-1.5">
              <a
                href="/work"
                aria-current={!activeStudy ? "page" : undefined}
                className={cn(
                  "rounded-full border px-3 py-1 font-mono text-[11px] transition-all",
                  !activeStudy
                    ? "border-accent bg-accent/15 font-semibold text-fg"
                    : "border-white/10 bg-graphite/60 text-muted hover:border-white/25 hover:text-fg"
                )}
              >
                All Case Studies
              </a>
              {CASE_STUDIES.map((cs, i) => {
                const isCurrent = activeStudy?.id === cs.id;
                return (
                  <a
                    key={cs.id}
                    href={`/work/${cs.id}`}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "rounded-full border px-3 py-1 font-mono text-[11px] transition-all",
                      isCurrent
                        ? "border-accent bg-accent/15 font-semibold text-fg"
                        : "border-white/10 bg-graphite/60 text-muted hover:border-white/25 hover:text-fg"
                    )}
                  >
                    0{i + 1} · {cs.tag}
                  </a>
                );
              })}
            </nav>
          </div>
        </Reveal>

        {activeStudy ? (
          /* ================= SINGLE CASE STUDY DEEP-DIVE (/work/:slug) ================= */
          <div className="mt-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <Reveal>
                  <Eyebrow>
                    Case Study · {activeStudy.tag} · {activeStudy.clientType}
                  </Eyebrow>
                </Reveal>
                <Reveal delay={80}>
                  <h1
                    id="work-page-title"
                    className="mt-4 text-3xl font-extrabold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl"
                  >
                    {activeStudy.title}
                  </h1>
                </Reveal>
                <Reveal delay={140}>
                  <p className="mt-5 max-w-3xl text-lg leading-relaxed text-fg/90">
                    {activeStudy.summary}
                  </p>
                </Reveal>
              </div>

              <Reveal delay={180} className="lg:col-span-4">
                <div className="rounded-2xl border border-white/[0.09] bg-graphite/70 p-6">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                    Target Sector
                  </p>
                  <p className="mt-1 text-base font-semibold text-fg">{activeStudy.clientType}</p>
                  <div className="mt-4 border-t border-white/[0.07] pt-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      Core Engineering Stack
                    </span>
                    <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Tech stack">
                      {activeStudy.stack.map((s) => (
                        <li key={s}>
                          <Tag>{s}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-5">
                    <Button
                      href={scheduleMailto(`Case Study Inquiry — ${activeStudy.title}`)}
                      className="w-full"
                    >
                      Scope a Similar Build <ArrowUpRight />
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Key Metrics Strip */}
            <Reveal delay={120} className="mt-10">
              <div className="rounded-3xl border border-white/[0.09] bg-ink/85 p-6 sm:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                  Verifiable Operational Outcomes
                </p>
                <div className="mt-5 grid gap-6 sm:grid-cols-3">
                  {activeStudy.metrics.map((m, i) => (
                    <div key={m.label} className={cn(i > 0 && "sm:border-l sm:border-white/[0.08] sm:pl-6")}>
                      <div className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
                        <span className="text-gradient">{m.value}</span>
                      </div>
                      <p className="mt-1.5 text-sm font-semibold text-fg">{m.label}</p>
                      <p className="mt-0.5 font-mono text-xs text-muted">{m.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* The Bottleneck & Architecture */}
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-3xl border border-rose-500/25 bg-rose-500/[0.04] p-7 sm:p-8">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-rose-400">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    01 · The Problem &amp; Bottleneck
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-fg/90">{activeStudy.problem}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-white/[0.08] pt-4 text-sm text-muted">
                    {activeStudy.challengeDetails.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <div className="flex h-full flex-col justify-between rounded-3xl border border-accent/25 bg-accent/[0.04] p-7 sm:p-8">
                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      02 · Engineered Architecture
                    </div>
                    <p className="mt-4 text-base leading-relaxed text-fg/90">{activeStudy.architecture}</p>
                  </div>
                  <div className="mt-6 rounded-2xl border border-white/[0.08] bg-ink/75 p-5">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-emerald-400">
                      03 · Production Verification
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{activeStudy.verification}</p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* 3-Step Implementation Breakdown */}
            <div className="mt-12">
              <Reveal>
                <Eyebrow>Implementation Architecture</Eyebrow>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                  How the system was engineered step by step
                </h2>
              </Reveal>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {activeStudy.approachSteps.map((st, idx) => (
                  <Reveal key={st.step} delay={idx * 70}>
                    <div className="h-full rounded-2xl border border-white/[0.09] bg-graphite/60 p-6">
                      <span className="font-mono text-xs font-semibold text-accent">{st.step}</span>
                      <h3 className="mt-3 text-lg font-bold tracking-tight text-fg">{st.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{st.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Live Reference Platform Proof (Audit Rule: Named only on /work/:slug and /products) */}
            {activeStudy.relatedPlatforms.length > 0 && (
              <Reveal delay={160} className="mt-12">
                <div className="rounded-3xl border border-accent/30 bg-gradient-to-r from-graphite/90 via-graphite/70 to-accent/[0.08] p-7 sm:p-9">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    Inspect the Live Reference Implementation
                  </p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-fg">
                    Experience this architecture in our live platform builds
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {activeStudy.relatedPlatforms.map((rp) => (
                      <div
                        key={rp.name}
                        className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-ink/80 p-5"
                      >
                        <div>
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg font-bold text-fg">{rp.name}</span>
                            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[10px] font-medium text-accent">
                              {rp.status}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted">{rp.role}</p>
                        </div>
                        <a
                          href={rp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-4 py-2 font-mono text-xs font-semibold text-fg transition-all hover:border-accent hover:bg-accent/20"
                        >
                          Open {rp.name} <ArrowUpRight className="text-accent" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Footer Navigation */}
            <Reveal delay={200} className="mt-12">
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-8">
                <a
                  href="/work"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent hover:text-fg"
                >
                  ← Back to all Case Studies (/work)
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-fg/80 hover:text-accent"
                >
                  Explore Service Tracks (/services) →
                </a>
              </div>
            </Reveal>
          </div>
        ) : (
          /* ================= ALL CASE STUDIES HUB (/work) ================= */
          <div className="mt-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <Eyebrow>Proof of Work · Engineering Case Studies</Eyebrow>
                </Reveal>
                <Reveal delay={80}>
                  <h1
                    id="work-page-title"
                    className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl"
                  >
                    Real bottlenecks solved,
                    <br />
                    <span className="text-gradient">from problem to result.</span>
                  </h1>
                </Reveal>
              </div>
              <Reveal delay={160} className="lg:col-span-5">
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  Inspect how we architect systems to eliminate CVE scanner noise, score adaptive assessments deterministically, and run citation-backed document AI completely offline.
                </p>
              </Reveal>
            </div>

            <ul className="mt-12 space-y-8">
              {CASE_STUDIES.map((cs, idx) => (
                <Reveal as="li" key={cs.id} delay={idx * 80}>
                  <article
                    onPointerMove={spotlightHandler}
                    className="spotlight rounded-3xl border border-white/[0.09] bg-graphite/60 p-6 transition-all duration-300 hover:border-white/20 hover:bg-graphite/80 sm:p-9"
                  >
                    <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                      <div className="lg:col-span-7">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-accent/30 bg-accent/15 px-3 py-1 font-mono text-xs text-accent">
                            0{idx + 1} · {cs.tag}
                          </span>
                          <span className="font-mono text-xs text-muted">
                            Sector: <strong className="text-fg/90">{cs.clientType}</strong>
                          </span>
                        </div>

                        <h2 className="mt-4 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                          <a href={`/work/${cs.id}`} className="hover:text-accent transition-colors">
                            {cs.title}
                          </a>
                        </h2>
                        <p className="mt-3 text-base leading-relaxed text-muted">{cs.summary}</p>

                        <div className="mt-5 flex flex-wrap gap-1.5">
                          {cs.stack.map((s) => (
                            <Tag key={s}>{s}</Tag>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-4">
                          <Button href={`/work/${cs.id}`}>
                            Read Full Case Study <Arrow />
                          </Button>
                          <Button
                            href={scheduleMailto(`Case Study — ${cs.title}`)}
                            variant="secondary"
                          >
                            Discuss Similar Problem <ArrowUpRight />
                          </Button>
                        </div>
                      </div>

                      <div className="grid gap-4 rounded-2xl border border-white/[0.08] bg-ink/80 p-6 lg:col-span-5">
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                          Verifiable Outcomes
                        </p>
                        {cs.metrics.map((m) => (
                          <div key={m.label} className="border-t border-white/[0.07] pt-3 first:border-t-0 first:pt-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-2xl font-extrabold text-gradient">{m.value}</span>
                              <span className="text-sm font-semibold text-fg">{m.label}</span>
                            </div>
                            <p className="mt-0.5 font-mono text-xs text-muted">{m.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}

