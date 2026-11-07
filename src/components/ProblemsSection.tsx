import { Arrow, ArrowUpRight, Button, Container, Eyebrow, Reveal } from "./ui";
import { DOMAIN_ICONS } from "./icons";
import { PROBLEMS } from "../data/content";
import { scheduleMailto } from "../lib/site";
import { spotlightHandler } from "../lib/hooks";

export default function ProblemsSection() {
  return (
    <section
      id="problems"
      aria-labelledby="problems-title"
      className="relative border-b border-white/[0.07] bg-ink/50 py-24 sm:py-32"
    >
      <Container>
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Problems We Solve</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                id="problems-title"
                className="mt-5 text-4xl font-bold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl"
              >
                Start with the bottleneck
                <br />
                <span className="text-gradient">costing your team time or risk.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Clients rarely come to us asking for an algorithm by name. They come to us when spreadsheets break, generic chatbots guess without citing sources, security scanners flood engineering, or sensitive archives can't leave the building.
            </p>
          </Reveal>
        </div>

        {/* 6 Problem Cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map((p, i) => {
            const Icon = DOMAIN_ICONS[p.domainKey];
            return (
              <Reveal key={p.id} delay={i * 65}>
                <article
                  onPointerMove={spotlightHandler}
                  aria-labelledby={`problem-${p.id}`}
                  className="spotlight group flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-graphite/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:shadow-[0_30px_60px_-30px_rgba(34,184,207,0.3)] sm:p-7"
                >
                  <div>
                    {/* Top Meta */}
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent">
                          <Icon className="h-4 w-4" />
                        </span>
                        Problem {p.num}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10.5px] text-muted">
                        {p.timeline}
                      </span>
                    </div>

                    {/* Buyer Symptom Quote */}
                    <h3
                      id={`problem-${p.id}`}
                      className="mt-5 text-lg font-semibold leading-snug tracking-[-0.015em] text-fg sm:text-[19px]"
                    >
                      {p.symptom}
                    </h3>

                    <p className="mt-2 font-mono text-[11px] text-muted/75">
                      For: <span className="text-fg/85">{p.buyer}</span>
                    </p>

                    {/* Method & Approach */}
                    <div className="mt-5 border-t border-white/[0.07] pt-4">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">
                        How we solve it · {p.method}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{p.approach}</p>
                    </div>
                  </div>

                  {/* Outcome Footer */}
                  <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] p-3.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
                      Typical Outcome
                    </p>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-fg/90 sm:text-[13px]">
                      {p.outcome}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Discovery CTA Banner */}
        <Reveal delay={220} className="mt-12">
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-accent/25 bg-gradient-to-r from-graphite/90 via-graphite/70 to-accent/[0.08] p-6 sm:flex-row sm:items-center sm:p-8">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Not sure which approach fits your stack?
              </p>
              <p className="mt-2 text-base font-medium text-fg sm:text-lg">
                Start with a fixed-scope 2-week Problem Discovery Sprint — you get a working prototype or architecture blueprint you own 100%.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href={scheduleMailto("2-Week Problem Discovery Sprint")}>
                Scope a Discovery Sprint <ArrowUpRight />
              </Button>
              <Button href="#case-studies" variant="secondary">
                See Proof of Work <Arrow />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

