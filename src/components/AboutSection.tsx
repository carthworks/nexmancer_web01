import { Arrow, ArrowUpRight, Button, Container, Eyebrow, Reveal, Tag } from "./ui";
import { IconGlobe, IconPin } from "./icons";
import { SITE, scheduleMailto } from "../lib/site";
import { ABOUT_CAPABILITIES, ABOUT_FOCUS, ABOUT_STATS, ETHOS_PRINCIPLES, PRODUCTS } from "../data/content";
import { spotlightHandler } from "../lib/hooks";

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative overflow-hidden border-t border-white/[0.07] py-24 sm:py-32">
      <div className="grid-bg grid-fade absolute inset-0 -z-10 opacity-50" aria-hidden />
      <Container>
        {/* Top Row: Narrative + Corporate Dossier */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>About NEXMANCER</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="about-title" className="mt-5 text-4xl font-bold uppercase leading-[1.02] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">
                A deep-tech studio
                <br className="hidden sm:block" /> built on <span className="text-gradient">first principles.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg/90 sm:text-xl">
                <strong className="font-semibold text-fg">NEXMANCER PRIVATE LIMITED</strong> is an independent software and applied R&amp;D company building proprietary platforms and mission-critical systems across AI, cybersecurity, data intelligence, and cloud infrastructure.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Headquartered in Coimbatore, India, we operate at the intersection of rigorous mathematical modeling and production software engineering. Whether we are scoring psychometric assessments with Bayesian Item Response Theory, triaging CVEs against live exploit telemetry, preserving archival records in offline PDF/A packages, or forecasting street-level urban heat stress, our work is defined by verifiability, privacy, and resilience.
              </p>
            </Reveal>

            {/* Key Metrics Strip */}
            <Reveal delay={260}>
              <dl className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {ABOUT_STATS.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/[0.08] bg-graphite/60 p-4 transition-colors hover:border-accent/30"
                  >
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">{s.label}</dt>
                    <dd className="mt-2 text-2xl font-extrabold tracking-tight text-fg sm:text-3xl">
                      <span className="text-gradient">{s.value}</span>
                    </dd>
                    <p className="mt-1 font-mono text-[11px] text-muted/75">{s.detail}</p>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="#products">
                  Explore Live Products <Arrow />
                </Button>
                <Button href={scheduleMailto("Company & R&D Inquiry")} variant="secondary">
                  Partner With Us <ArrowUpRight />
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Corporate Identity & Architecture Dossier */}
          <Reveal delay={180} className="lg:col-span-5">
            <div
              onPointerMove={spotlightHandler}
              className="spotlight overflow-hidden rounded-3xl border border-white/[0.09] bg-graphite/60"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] bg-ink/60 px-6 py-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Corporate Dossier</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Active · IN
                </span>
              </div>

              <dl className="divide-y divide-white/[0.07]">
                <div className="p-6">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">Legal Entity</dt>
                  <dd className="mt-1.5 text-lg font-semibold tracking-tight text-fg">{SITE.legal}</dd>
                  <p className="mt-1 font-mono text-xs text-muted/80">Private Limited Company · Registered in India</p>
                </div>

                <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">Engineering Hub</dt>
                    <dd className="mt-1.5 flex items-start gap-2 text-sm font-medium text-fg">
                      <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{SITE.city}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">Operating Model</dt>
                    <dd className="mt-1.5 flex items-start gap-2 text-sm font-medium text-fg">
                      <IconGlobe className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Product Studio &amp; Enterprise R&amp;D</span>
                    </dd>
                  </div>
                </div>

                <div className="p-6">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">Live Product Portfolio</dt>
                  <dd className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {PRODUCTS.map((p) => (
                      <a
                        key={p.name}
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-ink/60 px-3.5 py-2.5 text-xs transition-all hover:border-accent/40 hover:bg-ink"
                      >
                        <span>
                          <strong className="font-semibold text-fg group-hover:text-accent">{p.name}</strong>
                          <span className="ml-2 font-mono text-[10px] text-muted">{p.code}</span>
                        </span>
                        <span className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                          ↗
                        </span>
                      </a>
                    ))}
                  </dd>
                </div>

                <div className="p-6">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">Core Disciplines</dt>
                  <dd className="mt-3 flex flex-wrap gap-1.5">
                    {ABOUT_FOCUS.map((f) => (
                      <Tag key={f}>{f}</Tag>
                    ))}
                  </dd>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 bg-ink/40 px-6 py-4 text-xs">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-mono text-muted transition-colors hover:text-accent"
                  >
                    {SITE.email}
                  </a>
                  <span className="font-mono text-muted/80">{SITE.domain}</span>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        {/* Applied R&D Capabilities */}
        <div className="mt-20 border-t border-white/[0.07] pt-16">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">What Sets Us Apart</p>
                <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight text-fg sm:text-3xl">
                  Applied R&amp;D &amp; Domain Depth
                </h3>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Every platform we ship is backed by specialized domain engineering — combining deterministic algorithms with modern cloud and AI runtimes.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_CAPABILITIES.map((cap, i) => (
              <Reveal key={cap.code} delay={80 + i * 60}>
                <div
                  onPointerMove={spotlightHandler}
                  className="spotlight group flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-graphite/40 p-6 transition-all duration-300 hover:border-white/20 hover:bg-graphite/70"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-accent">{cap.code}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/60 transition-transform group-hover:scale-150" />
                    </div>
                    <h4 className="mt-4 text-lg font-semibold tracking-tight text-fg">{cap.title}</h4>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{cap.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Engineering Ethos */}
        <div className="mt-20 border-t border-white/[0.07] pt-16">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Our Engineering Ethos</p>
                <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight text-fg sm:text-3xl">
                  Principles that govern our code
                </h3>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Non-negotiable architectural standards applied across every client system and internal product we build.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ETHOS_PRINCIPLES.map((ep, i) => (
              <Reveal key={ep.num} delay={100 + i * 70}>
                <div
                  onPointerMove={spotlightHandler}
                  className="spotlight group flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-graphite/50 p-6 transition-all duration-300 hover:border-white/20 hover:bg-graphite/80 sm:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 font-mono text-xs font-semibold text-accent">
                        {ep.num}
                      </span>
                      <span className="font-mono text-[10.5px] uppercase tracking-wider text-muted">{ep.tag}</span>
                    </div>
                    <h4 className="mt-5 text-lg font-semibold tracking-tight text-fg group-hover:text-accent transition-colors">
                      {ep.title}
                    </h4>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{ep.desc}</p>
                  </div>
                  <div className="mt-6 border-t border-white/[0.06] pt-3.5">
                    <span className="font-mono text-[11px] text-fg/80">✓ {ep.metric}</span>
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
