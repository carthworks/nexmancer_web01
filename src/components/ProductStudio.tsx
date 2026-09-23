import { Arrow, Button, Container, Eyebrow, Reveal, Tag } from "./ui";
import { DOMAIN_ICONS } from "./icons";
import { PRODUCTS } from "../data/content";
import { spotlightHandler } from "../lib/hooks";

export default function ProductStudio() {
  return (
    <section id="products" aria-labelledby="products-title" className="relative py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow>Product Studio</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="products-title" className="mt-5 text-4xl font-bold uppercase leading-[1.02] tracking-[-0.035em] text-fg sm:text-5xl lg:text-[3.5rem]">
                We build products,
                <br />
                <span className="text-muted">not just projects.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                NEXMANCER develops proprietary technology tools and platforms designed to solve hard problems in AI, cloud security, and distributed data systems.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10">
                <Button href="#contact">
                  Inquire About Products <Arrow />
                </Button>
              </div>
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted/70">
                Proprietary & Open Initiatives
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="grid gap-4 lg:col-span-7">
          {PRODUCTS.map((p, i) => {
            const Icon = DOMAIN_ICONS[p.key];
            return (
              <Reveal as="li" key={p.name} delay={i * 60}>
                <a
                  href="#contact"
                  onPointerMove={spotlightHandler}
                  className="spotlight group block rounded-2xl border border-white/[0.08] bg-graphite/50 p-6 transition-all duration-500 hover:border-white/20 hover:bg-graphite/70 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent text-fg transition-all duration-500 group-hover:border-accent/40 group-hover:text-accent">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-xl font-semibold uppercase tracking-[-0.01em] text-fg group-hover:text-accent transition-colors">
                            {p.name}
                          </h3>
                          <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted/70">{p.code}</span>
                        </div>
                        <p className="font-mono text-xs uppercase tracking-wider text-muted/60">{p.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider text-accent">
                        {p.status}
                      </span>
                      <span
                        aria-hidden
                        className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-fg sm:flex"
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{p.desc}</p>

                  <ul className="mt-5 flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]" aria-label="Tags">
                    {p.tags.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
