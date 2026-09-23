import { useState } from "react";
import { Container, Eyebrow, Reveal, Tag } from "./ui";
import { SOLUTIONS, ENGAGEMENT_MODELS } from "../data/content";
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
              <Eyebrow>Solutions & Engagement</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="solutions-title" className="mt-5 text-4xl font-bold uppercase leading-[1.02] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">
                Engineered for
                <br />
                <span className="text-gradient">real-world impact.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              We translate modern AI, cloud security, and software capabilities into tangible operational systems and tailored engagement models.
            </p>
          </Reveal>
        </div>

        {/* Industry Solutions Accordion */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Core Solutions</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Select a solution domain to explore how we engineer practical outcomes for high-concurrency systems.
            </p>
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
                          "flex-1 text-lg font-semibold uppercase tracking-[-0.01em] transition-colors sm:text-xl",
                          on ? "text-fg" : "text-fg/80 group-hover:text-fg"
                        )}
                      >
                        {it.title}
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
                        <p className="max-w-2xl text-[15px] leading-relaxed text-muted sm:text-base">{it.desc}</p>
                        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Capabilities">
                          {it.tags.map((t) => (
                            <li key={t}>
                              <Tag>{t}</Tag>
                            </li>
                          ))}
                        </ul>
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
                <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight text-fg">Engagement Models</h3>
              </div>
              <p className="max-w-md text-sm text-muted">
                Transparent collaboration frameworks adapted to your team's technical readiness and project scope.
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
                      Inquire engagement <span className="transition-transform group-hover:translate-x-1">→</span>
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
