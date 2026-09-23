import { useState } from "react";
import { Arrow, Button, Container, Eyebrow, Reveal, Tag } from "./ui";
import { CASE_STUDIES } from "../data/content";
import { spotlightHandler } from "../lib/hooks";
import { scheduleMailto } from "../lib/site";
import { cn } from "../utils/cn";

export default function CaseStudies() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = CASE_STUDIES[activeIdx];

  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="relative border-t border-white/[0.07] py-24 sm:py-32">
      <Container>
        {/* Section Header */}
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Proof of Work · Case Studies</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="case-studies-title" className="mt-5 text-4xl font-bold uppercase leading-[1.02] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">
                Engineered. Tested.
                <br />
                <span className="text-gradient">Measurably proven.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Behind every architecture is a measurable operational impact. Explore how we resolve latency, security isolation, and throughput bottlenecks.
            </p>
          </Reveal>
        </div>

        {/* Project Selector Tabs */}
        <div className="mt-14 flex flex-wrap gap-2 border-b border-white/[0.08] pb-4">
          {CASE_STUDIES.map((cs, i) => {
            const on = i === activeIdx;
            return (
              <button
                key={cs.id}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300",
                  on
                    ? "border-accent/40 bg-accent/[0.08] shadow-[0_0_24px_-4px_rgba(91,140,255,0.3)]"
                    : "border-white/[0.08] bg-graphite/40 hover:border-white/20 hover:bg-graphite/80"
                )}
              >
                <span className={cn("font-mono text-xs transition-colors", on ? "text-accent" : "text-muted/60")}>
                  0{i + 1}
                </span>
                <span className={cn("text-sm font-semibold tracking-tight transition-colors", on ? "text-fg" : "text-muted group-hover:text-fg")}>
                  {cs.title}
                </span>
                <span className="hidden rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-muted/80 md:inline-block">
                  {cs.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Case Study Detail Card */}
        <Reveal delay={100} className="mt-8">
          <div
            onPointerMove={spotlightHandler}
            className="spotlight relative overflow-hidden rounded-3xl border border-white/[0.09] bg-graphite/50 p-6 sm:p-10"
          >
            {/* Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-accent/30 bg-accent/15 px-3 py-1 font-mono text-xs text-accent">
                  {current.tag}
                </span>
                <span className="font-mono text-xs text-muted/70">
                  Target Sector: <strong className="font-medium text-fg/90">{current.clientType}</strong>
                </span>
              </div>
              <Button href={scheduleMailto(`Architecture Review — ${current.title}`)} variant="secondary" className="!min-h-9 !px-4 !text-xs">
                Discuss Similar Architecture <Arrow />
              </Button>
            </div>

            {/* Title & High-Level Summary */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl lg:text-4xl">
                {current.title}
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
                {current.summary}
              </p>
            </div>

            {/* Problem vs Architecture Grid */}
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {/* Problem */}
              <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] p-6 sm:p-7">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-rose-300">
                  <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
                  The Problem & Bottleneck
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-fg/85 sm:text-base">
                  {current.problem}
                </p>
              </div>

              {/* Architecture & Stack */}
              <div className="rounded-2xl border border-accent/20 bg-accent/[0.03] p-6 sm:p-7">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  Engineered Architecture
                </div>
                <p className="mt-4 text-[15px] leading-relaxed text-fg/85 sm:text-base">
                  {current.architecture}
                </p>
                <div className="mt-6 pt-4 border-t border-white/[0.07]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Stack:</span>
                  <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Tech Stack">
                    {current.stack.map((s) => (
                      <li key={s}>
                        <Tag>{s}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Measurable Impact Metrics Callouts */}
            <div className="mt-8 rounded-2xl border border-white/[0.08] bg-ink/80 p-6 sm:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Verifiable Operational Outcomes
              </p>
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {current.metrics.map((m, i) => (
                  <div key={m.label} className={cn(i > 0 && "sm:border-l sm:border-white/[0.08] sm:pl-6")}>
                    <div className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-5xl">
                      <span className="text-gradient">{m.value}</span>
                    </div>
                    <p className="mt-2 text-sm font-semibold tracking-tight text-fg">
                      {m.label}
                    </p>
                    <p className="mt-1 font-mono text-xs text-muted/70">
                      {m.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
