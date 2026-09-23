import { Container, Reveal, SectionHeading } from "./ui";
import { IconBox, IconFlask, IconSearch } from "./icons";
import { RESEARCH } from "../data/content";
import { spotlightHandler } from "../lib/hooks";

const ICONS = [IconSearch, IconFlask, IconBox];

export default function ResearchSection() {
  return (
    <section id="research" aria-labelledby="research-title" className="relative py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="research-title"
          eyebrow="Research & Development"
          title="Built with curiosity."
          lead="Technology moves quickly. Our R&D approach focuses on experimenting with emerging technologies, validating ideas through prototypes and turning useful research into practical products."
        />

        <div className="relative mt-16 grid gap-4 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[16%] right-[16%] top-[52px] hidden h-px md:block" aria-hidden>
            <svg className="h-2 w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 2">
              <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(91,140,255,0.45)" strokeWidth="1" vectorEffect="non-scaling-stroke" className="flow-dash-slow" />
            </svg>
          </div>

          {RESEARCH.map((c, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={c.t} delay={i * 100}>
                <article
                  onPointerMove={spotlightHandler}
                  className="spotlight group relative h-full rounded-2xl border border-white/[0.08] bg-graphite/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-white/15 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-ink text-fg transition-colors group-hover:border-accent/50 group-hover:text-accent">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted">Phase 0{i + 1}</span>
                  </div>
                  <h3 className="mt-10 text-3xl font-semibold uppercase tracking-[-0.03em] text-fg">{c.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.d}</p>
                  <p className="mt-8 border-t border-white/[0.07] pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted/80">{c.meta}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
