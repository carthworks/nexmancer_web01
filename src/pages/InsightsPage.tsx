import { useState } from "react";
import { INSIGHTS, READINESS_CHECKLIST, type InsightSlug } from "../data/content";
import { spotlightHandler } from "../lib/hooks";
import { SITE, scheduleMailto } from "../lib/site";
import { Arrow, ArrowUpRight, Button, Container, Eyebrow, Reveal } from "../components/ui";
import { cn } from "../utils/cn";

export default function InsightsPage({ slug }: { slug?: InsightSlug }) {
  const activeArticle = slug ? INSIGHTS.find((a) => a.slug === slug) : undefined;
  const totalChecks = READINESS_CHECKLIST.reduce((acc, g) => acc + g.items.length, 0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (item: string) => {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const checkedCount = Object.values(checked).filter(Boolean).length;

  const schema = activeArticle
    ? {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: activeArticle.title,
        description: activeArticle.summary,
        datePublished: "2026-11-01",
        author: {
          "@type": "Organization",
          name: SITE.legal,
          url: SITE.url,
        },
        publisher: {
          "@type": "Organization",
          name: SITE.legal,
          url: SITE.url,
        },
        url: `${SITE.url}insights/${activeArticle.slug}`,
      }
    : {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Engineering Notes & Architecture Insights — NEXMANCER",
        description:
          "Practical engineering notes on cited private RAG, reachability-first CVE triage, offline OCR archival, and our interactive readiness checklist.",
        url: `${SITE.url}insights`,
      };

  return (
    <section
      id="insights-page"
      aria-labelledby="insights-page-title"
      className="noise relative isolate min-h-[calc(100svh-5rem)] overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="grid-bg grid-fade absolute inset-0 -z-20" aria-hidden />

      <Container>
        {/* Top Breadcrumb & Article Switcher */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div className="flex items-center gap-3 font-mono text-xs text-muted">
              <a href="/" className="transition-colors hover:text-accent">
                ← Home
              </a>
              <span aria-hidden className="text-white/20">/</span>
              <a
                href="/insights"
                className={cn("transition-colors hover:text-accent", !activeArticle && "font-semibold text-fg")}
              >
                Engineering Notes
              </a>
              {activeArticle && (
                <>
                  <span aria-hidden className="text-white/20">/</span>
                  <span className="font-semibold text-accent">{activeArticle.code}</span>
                </>
              )}
            </div>

            <nav aria-label="Engineering notes" className="flex flex-wrap gap-1.5">
              <a
                href="/insights"
                aria-current={!activeArticle ? "page" : undefined}
                className={cn(
                  "rounded-full border px-3 py-1 font-mono text-[11px] transition-all",
                  !activeArticle
                    ? "border-accent bg-accent/15 font-semibold text-fg"
                    : "border-white/10 bg-graphite/60 text-muted hover:border-white/25 hover:text-fg"
                )}
              >
                All Notes &amp; Checklist
              </a>
              {INSIGHTS.map((art) => {
                const isCurrent = activeArticle?.slug === art.slug;
                return (
                  <a
                    key={art.slug}
                    href={`/insights/${art.slug}`}
                    aria-current={isCurrent ? "page" : undefined}
                    className={cn(
                      "rounded-full border px-3 py-1 font-mono text-[11px] transition-all",
                      isCurrent
                        ? "border-accent bg-accent/15 font-semibold text-fg"
                        : "border-white/10 bg-graphite/60 text-muted hover:border-white/25 hover:text-fg"
                    )}
                  >
                    {art.code}
                  </a>
                );
              })}
            </nav>
          </div>
        </Reveal>

        {activeArticle ? (
          /* ================= SINGLE ENGINEERING NOTE (/insights/:slug) ================= */
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-8">
              <Reveal>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 text-accent">
                    {activeArticle.code} · {activeArticle.category}
                  </span>
                  <span>{activeArticle.published}</span>
                  <span aria-hidden>·</span>
                  <span>{activeArticle.readTime}</span>
                </div>

                <h1
                  id="insights-page-title"
                  className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-fg sm:text-5xl"
                >
                  {activeArticle.title}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  {activeArticle.subtitle}
                </p>
              </Reveal>

              {/* Key Takeaways Box */}
              <Reveal delay={80} className="mt-8">
                <div className="rounded-2xl border border-accent/25 bg-accent/[0.05] p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    Executive Summary &amp; Key Takeaways
                  </p>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-fg/90">
                    {activeArticle.takeaways.map((t) => (
                      <li key={t} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              {/* Article Body Sections */}
              <div className="mt-8 space-y-6">
                {activeArticle.sections.map((sec, idx) => (
                  <Reveal key={sec.heading} delay={idx * 60}>
                    <article className="rounded-2xl border border-white/[0.08] bg-graphite/55 p-6 sm:p-8">
                      <h2 className="text-xl font-bold tracking-tight text-fg sm:text-2xl">
                        {sec.heading}
                      </h2>
                      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">
                        {sec.body.map((p, i) => (
                          <p key={i}>{p}</p>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right Sidebar: Related Service, Case Study & Discovery CTA */}
            <Reveal delay={140} className="lg:col-span-4 lg:sticky lg:top-28">
              <aside className="space-y-5">
                <div className="rounded-3xl border border-white/[0.09] bg-graphite/70 p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    Related Engineering Track
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Need to deploy this architecture inside your environment? Inspect our related service scope and proof of work:
                  </p>
                  <div className="mt-4 flex flex-col gap-2.5">
                    <a
                      href={`/services/${activeArticle.relatedServiceSlug}`}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-ink/80 px-4 py-3 font-mono text-xs font-semibold text-fg transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      <span>View Service Track</span>
                      <Arrow />
                    </a>
                    <a
                      href={`/work/${activeArticle.relatedCaseStudySlug}`}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-ink/80 px-4 py-3 font-mono text-xs font-semibold text-fg transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      <span>Read Matching Case Study</span>
                      <Arrow />
                    </a>
                  </div>

                  <div className="mt-5 border-t border-white/[0.08] pt-5">
                    <Button
                      href={scheduleMailto(`Architecture Brief — ${activeArticle.code}`)}
                      className="w-full"
                    >
                      Book a Discovery Call <ArrowUpRight />
                    </Button>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        ) : (
          /* ================= INSIGHTS HUB & READINESS CHECKLIST (/insights) ================= */
          <div className="mt-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Reveal>
                  <Eyebrow>Engineering Notes &amp; Architecture Briefs</Eyebrow>
                </Reveal>
                <Reveal delay={80}>
                  <h1
                    id="insights-page-title"
                    className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl"
                  >
                    Practical guides for
                    <br />
                    <span className="text-gradient">technical decision-makers.</span>
                  </h1>
                </Reveal>
              </div>
              <Reveal delay={160} className="lg:col-span-5">
                <p className="text-base leading-relaxed text-muted sm:text-lg">
                  Field notes from our systems architects on cited private RAG, reachability-first CVE triage, and offline ISO PDF/A preservation — plus our interactive readiness checklist.
                </p>
              </Reveal>
            </div>

            {/* 3 Articles Grid */}
            <ul className="mt-12 grid gap-6 lg:grid-cols-3">
              {INSIGHTS.map((art, idx) => (
                <Reveal as="li" key={art.slug} delay={idx * 70}>
                  <article
                    onPointerMove={spotlightHandler}
                    className="spotlight group flex h-full flex-col justify-between rounded-3xl border border-white/[0.09] bg-graphite/60 p-6 transition-all duration-300 hover:border-white/20 hover:bg-graphite/85 sm:p-7"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs text-muted">
                        <span className="text-accent font-semibold">{art.code} · {art.category}</span>
                        <span>{art.readTime}</span>
                      </div>
                      <h2 className="mt-4 text-xl font-bold leading-snug tracking-tight text-fg group-hover:text-accent transition-colors">
                        <a href={`/insights/${art.slug}`}>{art.title}</a>
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{art.summary}</p>
                    </div>

                    <div className="mt-6 border-t border-white/[0.07] pt-4">
                      <a
                        href={`/insights/${art.slug}`}
                        className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent group-hover:text-fg"
                      >
                        Read Architecture Note <Arrow />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>

            {/* Interactive & Printable Readiness Checklist */}
            <Reveal delay={160} className="mt-16">
              <div className="rounded-3xl border border-accent/25 bg-graphite/65 p-7 sm:p-10">
                <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/[0.08] pb-6">
                  <div className="max-w-2xl">
                    <Eyebrow>Interactive Self-Assessment · Printable Resource</Eyebrow>
                    <h2 className="mt-3 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                      Enterprise AI, Security &amp; Archival Readiness Checklist
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                      Use this 9-point engineering checklist before shipping internal AI, passing a customer security audit, or digitising sensitive records. Click any item to track your readiness or print/save as PDF.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-accent/30 bg-ink/80 px-4 py-2 font-mono text-xs font-semibold text-accent">
                      Score: {checkedCount} / {totalChecks} Verified
                    </span>
                    <button
                      type="button"
                      onClick={() => typeof window !== "undefined" && window.print()}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-xs font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
                    >
                      Print / Save as PDF ↗
                    </button>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                  {READINESS_CHECKLIST.map((group) => (
                    <div key={group.category} className="rounded-2xl border border-white/[0.08] bg-ink/75 p-6">
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                        {group.category}
                      </h3>
                      <ul className="mt-4 space-y-3">
                        {group.items.map((item) => {
                          const isChecked = !!checked[item];
                          return (
                            <li key={item}>
                              <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-fg/90 select-none">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleCheck(item)}
                                  className="mt-1 h-4 w-4 shrink-0 rounded border-white/25 bg-graphite text-accent focus:ring-accent"
                                />
                                <span className={cn(isChecked && "line-through text-muted")}>
                                  {item}
                                </span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}

