import { useState } from "react";
import { Container, Eyebrow, Reveal, Tag } from "./ui";
import { SOLUTIONS, ENGAGEMENT_MODELS } from "../data/content";
import { scheduleMailto } from "../lib/site";
import { cn } from "../utils/cn";

export default function ObjectivesSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="solutions" aria-labelledby="solutions-title" className="relative border-t border-white/[0.07] py-24 sm:py-32">
      <Container>
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Services &amp; Engagement</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="solutions-title" className="mt-5 text-4xl font-bold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">
                Clear service tracks,
                <br />
                <span className="text-gradient">built around outcomes.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Whether you need a 2-week discovery sprint, an independent security and architecture review, or a full production build, every engagement has clear deliverables and 100% client IP ownership.
            </p>
          </Reveal>
        </div>

        {/* Service Tracks Accordion */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Service Tracks</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Select a service track to inspect the buyer problem we address, our engineering approach, and what your team receives at handover.
            </p>
            <a
              href="/services"
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent transition-colors hover:text-fg"
            >
              Explore dedicated service pages (/services) <span aria-hidden>→</span>
            </a>
          </div>

          <ul className="border-t border-white/10 lg:col-span-8">
            {SOLUTIONS.map((it, i) => {
              const on = open === i;
              return (
                <li key={it.title} className="border-b border-white/10">
                  <h3>
                    <button
                      type="button"
                      id={`sol-btn-${i}`}
                      aria-expanded={on}
                      aria-controls={`sol-${i}`}
                      onClick={() => setOpen(on ? -1 : i)}
                      className="group flex w-full items-center gap-5 py-6 text-left sm:gap-8 sm:py-7"
                    >
                      <span className={cn("font-mono text-xs transition-colors", on ? "text-accent" : "text-muted")}>0{i + 1}</span>
                      <span
                        className={cn(
                          "flex-1 text-lg font-semibold tracking-[-0.01em] transition-colors sm:text-xl",
                          on ? "text-fg" : "text-fg/80 group-hover:text-fg"
                        )}
                      >
                        {it.title}
                        <span className="ml-3 inline-flex items-center rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 align-middle font-mono text-[10.5px] font-medium uppercase tracking-wider text-accent">
                          {it.code}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          on ? "border-accent/50 bg-accent/10" : "border-white/15 group-hover:border-white/30"
                        )}
                      >
                        <span className="absolute h-px w-3 bg-fg" />
                        <span className={cn("absolute h-3 w-px bg-fg transition-transform duration-300", on && "scale-y-0")} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`sol-${i}`}
                    role="region"
                    aria-labelledby={`sol-btn-${i}`}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-7 pl-10 sm:pl-14">
                        <p className="font-mono text-xs text-muted/80">
                          Built for: <strong className="font-medium text-fg/90">{it.buyer}</strong>
                        </p>
                        <p className="mt-2 max-w-2xl text-[15px] font-medium leading-snug text-fg/90">{it.tagline}</p>
                        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">{it.desc}</p>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                          <ul className="flex flex-wrap gap-2" aria-label="Deliverables">
                            {it.deliverables.map((t) => (
                              <li key={t}>
                                <Tag>{t}</Tag>
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap items-center gap-4">
                            <a
                              href={`/services/${it.slug}`}
                              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-fg transition-colors hover:text-accent"
                            >
                              Full service page <span aria-hidden>→</span>
                            </a>
                            <a
                              href={scheduleMailto(it.title)}
                              className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-accent transition-colors hover:text-fg"
                            >
                              Scope this track <span aria-hidden>→</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Engagement Models Cards */}
        <div className="mt-20">
          <Reveal>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">How We Collaborate</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-fg">Fixed-scope &amp; turnkey engagement models</h3>
              </div>
              <p className="max-w-md text-sm text-muted">
                Start small with a 2-week discovery sprint or audit, then scale into full engineering delivery when the ROI is proven.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ENGAGEMENT_MODELS.map((em, i) => (
              <Reveal key={em.title} delay={i * 80}>
                <div className="group relative flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-graphite/40 p-6 transition-all duration-300 hover:border-white/20 hover:bg-graphite/70">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-muted/70">0{i + 1}</span>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                        {em.badge}
                      </span>
                    </div>
                    <h4 className="mt-5 text-lg font-semibold tracking-tight text-fg group-hover:text-accent transition-colors">
                      {em.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{em.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/[0.06]">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-fg/80 group-hover:text-fg"
                    >
                      Scope this engagement <span className="transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
