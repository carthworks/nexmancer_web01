import { Container, Reveal, SectionHeading } from "./ui";
import { ENGINEERING } from "../data/content";

export default function EngineeringGrid() {
  return (
    <section id="engineering" aria-labelledby="engineering-title" className="relative overflow-hidden border-y border-white/[0.07] bg-[#080A0D] py-24 sm:py-32">
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,transparent,#000_20%,#000_80%,transparent)]" aria-hidden />
      <Container className="relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="engineering-title"
            eyebrow="Engineering Capabilities"
            title={<>Engineered for<br className="hidden sm:block" /> real-world systems.</>}
          />
          <Reveal delay={200} className="max-w-sm">
            <p className="text-muted">The technology areas we engineer with — chosen for reliability, security and long-term maintainability.</p>
          </Reveal>
        </div>

        <Reveal delay={100} className="mt-14">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink/80 shadow-[0_40px_120px_-40px_rgba(91,140,255,0.22)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-5 py-3">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <p className="truncate font-mono text-[11px] text-muted">nexmancer / engineering / capabilities.ts</p>
              <p className="hidden font-mono text-[11px] text-muted sm:block">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-cyan" /> areas: {ENGINEERING.length}
              </p>
            </div>

            <div className="grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
              {ENGINEERING.map((s, i) => (
                <div key={s.k} className="group relative bg-ink p-6 transition-colors duration-300 hover:bg-graphite sm:p-8">
                  <span className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-accent to-violet transition-all duration-500 group-hover:w-full" aria-hidden />
                  <div className="flex items-center justify-between">
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-fg">
                      <span className="text-accent" aria-hidden>
                        //
                      </span>{" "}
                      {s.k}
                    </h3>
                    <span className="font-mono text-[11px] text-muted/60">0{i + 1}</span>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-center gap-3 text-[15px] text-muted transition-colors group-hover:text-fg/90">
                        <span className="h-px w-3 bg-white/20 transition-all duration-300 group-hover:w-5 group-hover:bg-accent" aria-hidden />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <p className="mt-5 font-mono text-[11px] text-muted/70">Technology capabilities — not certifications, partnerships or vendor endorsements.</p>
      </Container>
    </section>
  );
}
