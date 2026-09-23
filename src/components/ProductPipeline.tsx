import { useEffect, useState } from "react";
import { Container, Reveal, SectionHeading } from "./ui";
import { PIPELINE } from "../data/content";
import { useInView } from "../lib/hooks";
import { cn } from "../utils/cn";

const INTERVAL = 2800;

export default function ProductPipeline() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  useEffect(() => {
    if (paused || !inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % PIPELINE.length), INTERVAL);
    return () => window.clearTimeout(t);
  }, [active, paused, inView]);

  return (
    <section id="pipeline" aria-labelledby="pipeline-title" className="relative border-y border-white/[0.07] bg-[#0B0E17]/60 py-24 sm:py-32">
      <Container>
        <SectionHeading
          id="pipeline-title"
          eyebrow="Product Engineering"
          title="From idea to product."
          lead="We transform technical ideas into production-ready software, platforms and intelligent systems."
        />

        <Reveal delay={120} className="mt-14">
          <div
            ref={ref}
            onMouseLeave={() => setPaused(false)}
            className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-5 py-3.5 font-mono text-[11px] text-muted sm:px-6">
              <span>
                <span className="text-accent">$</span> nx pipeline run
              </span>
              <span aria-live="polite">
                stage {String(active + 1).padStart(2, "0")}/{String(PIPELINE.length).padStart(2, "0")} —{" "}
                <span className="uppercase text-fg">{PIPELINE[active].t}</span>
              </span>
            </div>

            <ol className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {PIPELINE.map((s, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={s.t} className="border-white/[0.07] max-sm:border-b max-sm:last:border-b-0 sm:border-b sm:odd:border-r sm:[&:nth-child(n+5)]:border-b-0 md:odd:border-r-0 md:[&:not(:nth-child(3n))]:border-r md:[&:nth-child(n+4)]:border-b-0 lg:!border-b-0 lg:!border-r lg:last:!border-r-0">
                    <button
                      type="button"
                      aria-pressed={on}
                      onMouseEnter={() => {
                        setPaused(true);
                        setActive(i);
                      }}
                      onFocus={() => {
                        setPaused(true);
                        setActive(i);
                      }}
                      onBlur={() => setPaused(false)}
                      onClick={() => setActive(i)}
                      className={cn("group relative flex h-full w-full flex-col p-6 text-left transition-colors duration-500 sm:min-h-[240px]", on ? "bg-graphite" : "hover:bg-white/[0.015]")}
                    >
                      {/* segment */}
                      <span className="absolute inset-x-0 top-0 h-px bg-white/[0.07]" aria-hidden />
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent to-violet transition-transform duration-700",
                          done || on ? "scale-x-100" : "scale-x-0"
                        )}
                      />
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[10.5px] transition-all duration-500",
                            on
                              ? "border-accent bg-accent/15 text-fg shadow-[0_0_16px_rgba(91,140,255,0.45)]"
                              : done
                                ? "border-accent/40 text-accent"
                                : "border-white/15 text-muted"
                          )}
                        >
                          0{i + 1}
                        </span>
                        {i < PIPELINE.length - 1 && (
                          <span className="font-mono text-xs text-muted/50 lg:hidden" aria-hidden>
                            ↓
                          </span>
                        )}
                      </div>
                      <h3 className={cn("mt-6 text-xl font-semibold uppercase tracking-[-0.01em] transition-colors", on ? "text-fg" : "text-fg/80")}>{s.t}</h3>
                      <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.d}</p>
                      <p className={cn("mt-auto pt-6 font-mono text-[11px] transition-colors", on ? "text-accent" : "text-muted/50")}>nx.{s.fn}</p>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
