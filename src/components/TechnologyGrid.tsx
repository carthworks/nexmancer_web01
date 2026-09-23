import { Container, Reveal, SectionHeading, Tag } from "./ui";
import { DOMAIN_ICONS } from "./icons";
import { DOMAINS, type DomainKey } from "../data/content";
import { spotlightHandler } from "../lib/hooks";
import { cn } from "../utils/cn";

const SPANS: Record<DomainKey, string> = {
  software: "lg:col-span-3",
  ai: "lg:col-span-3",
  security: "lg:col-span-2",
  data: "lg:col-span-2",
  cloud: "md:col-span-2 lg:col-span-2",
};

function Visual({ kind }: { kind: DomainKey }) {
  switch (kind) {
    case "software":
      return (
        <div className="overflow-hidden font-mono text-[11px] leading-6 text-muted/80">
          <p className="whitespace-nowrap"><span className="text-violet">const</span> platform = <span className="text-accent">await</span> nx.build({"{"}</p>
          <p className="whitespace-nowrap pl-4">api: <span className="text-cyan">"v1"</span>, tenancy: <span className="text-cyan">"multi"</span>,</p>
          <p className="whitespace-nowrap pl-4">deploy: <span className="text-cyan">"cloud"</span></p>
          <p>{"});"} <span className="blink text-fg">▍</span></p>
        </div>
      );
    case "ai":
      return (
        <svg viewBox="0 0 220 80" className="h-20 w-full max-w-[260px]" aria-hidden>
          {[0, 1].map((c) =>
            [0, 1, 2, 3].map((r) =>
              [0, 1, 2, 3].map((r2) => (
                <line
                  key={`${c}${r}${r2}`}
                  x1={30 + c * 80}
                  y1={10 + r * 20}
                  x2={110 + c * 80}
                  y2={10 + r2 * 20}
                  stroke="rgba(91,140,255,.18)"
                  strokeWidth=".6"
                  className="transition-all duration-500 group-hover:stroke-[rgba(139,92,246,.45)]"
                />
              ))
            )
          )}
          {[0, 1, 2].map((c) =>
            [0, 1, 2, 3].map((r) => <circle key={`n${c}${r}`} cx={30 + c * 80} cy={10 + r * 20} r="3" fill="#0E121B" stroke="rgba(245,247,250,.6)" strokeWidth="1" />)
          )}
        </svg>
      );
    case "security":
      return (
        <div className="relative h-20 overflow-hidden rounded-lg border border-white/[0.07] bg-ink/60 p-3 font-mono text-[10.5px] leading-5 text-muted">
          <p><span className="text-cyan">✓</span> policy.validate()</p>
          <p><span className="text-cyan">✓</span> secrets.scan()</p>
          <p><span className="text-accent">●</span> threat.model → review</p>
          <span className="absolute inset-x-0 top-0 h-6 -translate-y-8 bg-gradient-to-b from-transparent via-accent/20 to-transparent transition-transform duration-[1.4s] ease-in-out group-hover:translate-y-20" />
        </div>
      );
    case "data":
      return (
        <div className="flex h-20 items-end gap-1.5">
          {[35, 55, 42, 70, 50, 82, 64, 92, 74].map((h, i) => (
            <span
              key={i}
              className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-accent/20 to-accent/60 transition-transform duration-500 group-hover:scale-y-110"
              style={{ height: `${h}%`, transitionDelay: `${i * 30}ms` }}
            />
          ))}
        </div>
      );
    case "cloud":
      return (
        <div className="grid h-20 grid-cols-6 gap-1.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "rounded border border-white/10 bg-white/[0.02] transition-all duration-500",
                [1, 4, 6, 9, 11].includes(i) && "group-hover:border-accent/40 group-hover:bg-accent/10"
              )}
              style={{ transitionDelay: `${i * 25}ms` }}
            />
          ))}
        </div>
      );
  }
}

export default function TechnologyGrid() {
  return (
    <section id="technology" aria-labelledby="technology-title" className="relative py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="technology-title" eyebrow="Technology" title={<>Technology,<br /> engineered.</>} />
          <Reveal delay={200} className="max-w-md">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              We build across the technology stack — from intelligent software and data systems to cybersecurity, cloud infrastructure and digital
              platforms.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {DOMAINS.map((dm, i) => {
            const Icon = DOMAIN_ICONS[dm.key];
            return (
              <Reveal key={dm.n} delay={i * 70} className={SPANS[dm.key]}>
                <article
                  onPointerMove={spotlightHandler}
                  aria-labelledby={`domain-${dm.key}`}
                  className="spotlight group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-graphite/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.14] hover:shadow-[0_30px_60px_-30px_rgba(91,140,255,0.35)] sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-fg transition-colors group-hover:border-accent/40 group-hover:text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted">{dm.n}</span>
                  </div>
                  <div className="mt-8 min-h-20">
                    <Visual kind={dm.key} />
                  </div>
                  <h3 id={`domain-${dm.key}`} className="mt-8 text-2xl font-semibold uppercase tracking-[-0.02em] text-fg">
                    {dm.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{dm.desc}</p>
                  <ul className="mt-6 flex flex-wrap gap-2 pt-2" aria-label={`${dm.title} focus areas`}>
                    {dm.tags.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
