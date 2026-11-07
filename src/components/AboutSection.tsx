import { Arrow, ArrowUpRight, Button, Container, Eyebrow, Reveal, Tag } from "./ui";
import { IconGlobe, IconLinkedin, IconPin } from "./icons";
import { SITE, scheduleMailto } from "../lib/site";
import { ABOUT_CAPABILITIES, ABOUT_FOCUS, ABOUT_STATS, ETHOS_PRINCIPLES, TEAM } from "../data/content";
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
              <h2 id="about-title" className="mt-5 text-4xl font-bold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">
                An engineering partner
                <br className="hidden sm:block" /> built on <span className="text-gradient">first principles.</span>
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg/90 sm:text-xl">
                <strong className="font-semibold text-fg">NEXMANCER PRIVATE LIMITED</strong> is an independent software engineering and applied R&amp;D partner helping organizations solve high-consequence operational, AI, security, and data problems.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Headquartered in Coimbatore, India, we work directly with founders, CTOs, universities, and enterprise teams. Instead of selling generic hours or black-box AI hype, we diagnose the root bottleneck and engineer verifiable, production-ready systems — from deterministic psychometric engines and reachability-based vulnerability triage to offline ISO PDF/A archival pipelines.
              </p>
            </Reveal>

            {/* Factual Checkable Metrics Strip */}
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
                <Button href={scheduleMailto("30-Min Discovery Call")}>
                  Book a 30-min call <ArrowUpRight />
                </Button>
                <Button href="#problems" variant="secondary">
                  See problems we solve <Arrow />
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
                      <span>Problem-First Engineering &amp; R&amp;D</span>
                    </dd>
                  </div>
                </div>

                <div className="p-6">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">Core Disciplines</dt>
                  <dd className="mt-3 flex flex-wrap gap-1.5">
                    {ABOUT_FOCUS.map((f) => (
                      <Tag key={f}>{f}</Tag>
                    ))}
                  </dd>
                </div>

                <div className="p-6">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">Proprietary Platforms</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted">
                    Alongside client engineering, we also build and maintain our own software platforms —{" "}
                    <a
                      href="#products"
                      className="font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-fg"
                    >
                      explore our products →
                    </a>
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

        {/* Founders & Leadership */}
        <div className="mt-20 border-t border-white/[0.07] pt-16">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Leadership &amp; Accountability</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                  Led by practicing systems architects
                </h3>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Every discovery sprint and architecture review is led directly by senior engineering leadership — never handed off to junior account managers.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6">
            {TEAM.map((member) => (
              <Reveal key={member.name} delay={100}>
                <div
                  onPointerMove={spotlightHandler}
                  className="spotlight rounded-3xl border border-white/[0.09] bg-graphite/50 p-6 sm:p-8"
                >
                  <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                    <div className="max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="text-xl font-bold tracking-tight text-fg sm:text-2xl">{member.name}</h4>
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 font-mono text-xs font-medium text-accent">
                          {member.role}
                        </span>
                      </div>
                      <p className="mt-1.5 font-mono text-xs text-muted/80">{member.credentials}</p>
                      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{member.bio}</p>
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Areas of expertise">
                        {member.focus.map((f) => (
                          <li key={f}>
                            <Tag>{f}</Tag>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-3 lg:flex-col lg:items-end">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-fg transition-colors hover:border-accent/50 hover:text-accent"
                      >
                        <IconLinkedin className="h-4 w-4 text-accent" />
                        LinkedIn Profile <ArrowUpRight />
                      </a>
                      <a
                        href={scheduleMailto(`Direct Architecture Call with ${member.name}`)}
                        className="font-mono text-xs text-muted transition-colors hover:text-accent"
                      >
                        Schedule intro call →
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Applied R&D Capabilities */}
        <div className="mt-20 border-t border-white/[0.07] pt-16">
          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">What Sets Us Apart</p>
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                  Applied R&amp;D &amp; domain depth
                </h3>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Every system we deliver combines deterministic mathematical foundations with modern cloud and AI engineering.
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
                <h3 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                  Principles that govern our code
                </h3>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Non-negotiable architectural standards applied across every client system we build.
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
