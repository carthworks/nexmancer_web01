import { Container, Reveal, SectionHeading } from "./ui";
import { AUDIENCES } from "../data/content";

export default function AudienceSection() {
  return (
    <section id="audience" aria-labelledby="audience-title" className="relative border-t border-white/[0.07] py-24 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="audience-title" eyebrow="Who we build with" title="Built for builders." />
          <Reveal delay={160} className="max-w-md">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              We work with people and organizations who have real technology problems — and the ambition to solve them properly.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal as="li" key={a.t} delay={i * 50} className="group bg-ink">
              <div className="h-full p-6 transition-colors duration-300 group-hover:bg-graphite sm:p-8">
                <span className="font-mono text-[11px] text-muted/70 transition-colors group-hover:text-accent">0{i + 1}</span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-fg">{a.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.d}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
