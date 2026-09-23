import { Container, Eyebrow, Reveal } from "./ui";
import { SITE } from "../lib/site";
import { ABOUT_FOCUS, ETHOS_PRINCIPLES } from "../data/content";

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative border-t border-white/[0.07] py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>About NEXMANCER</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="about-title" className="mt-5 text-4xl font-bold uppercase leading-[1.02] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">
                A technology company
                <br className="hidden sm:block" /> built on first principles.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/90 sm:text-xl">
                NEXMANCER builds software, intelligent systems and digital technologies across AI, cybersecurity, data platforms, and cloud infrastructure.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                Headquartered in Coimbatore, India, our engineering culture is focused on high craft, rigorous problem definition, and producing technology assets designed for resilience and measurable utility.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:col-span-5 lg:pt-14">
            <dl className="overflow-hidden rounded-2xl border border-white/[0.08] bg-graphite/50">
              <div className="border-b border-white/[0.07] p-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Legal Entity</dt>
                <dd className="mt-2 text-lg font-semibold tracking-tight text-fg">{SITE.legal}</dd>
              </div>
              <div className="border-b border-white/[0.07] p-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Engineering Hub</dt>
                <dd className="mt-2 text-fg">{SITE.city}</dd>
              </div>
              <div className="p-6">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Core Disciplines</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {ABOUT_FOCUS.map((f) => (
                    <span key={f} className="rounded-full border border-white/10 px-3 py-1 text-xs text-fg/85">
                      {f}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Engineering Ethos replacing duplicate 7-step pipeline */}
        <div className="mt-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Our Engineering Ethos</p>
            <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight text-fg">Principles that guide our code</h3>
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {ETHOS_PRINCIPLES.map((ep, i) => (
              <Reveal key={ep.num} delay={100 + i * 80}>
                <div className="group h-full rounded-2xl border border-white/[0.08] bg-graphite/40 p-7 transition-colors hover:border-white/20 hover:bg-graphite/70">
                  <span className="font-mono text-xs font-semibold text-accent">{ep.num}</span>
                  <h4 className="mt-4 text-xl font-semibold tracking-tight text-fg">{ep.title}</h4>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{ep.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
