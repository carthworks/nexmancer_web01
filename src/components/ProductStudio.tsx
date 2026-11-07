import { PRODUCTS } from "../data/content";
import { spotlightHandler } from "../lib/hooks";
import { DOMAIN_ICONS } from "./icons";
import { Arrow, Button, Container, Eyebrow, Reveal, Tag } from "./ui";

export default function ProductStudio() {
  return (
    <section id="products" aria-labelledby="products-title" className="relative border-t border-white/[0.07] py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow>Our Products</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="products-title" className="mt-5 text-4xl font-bold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl lg:text-[3.5rem]">
                Software platforms we
                <br />
                <span className="text-muted">build and run in-house.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Alongside client engagements, NEXMANCER builds and maintains its own software tools in adaptive learning, security triage, offline document digitisation, cited document search, and urban heat forecasting.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-10">
                <Button href="#contact" variant="secondary">
                  Book a 30-min call <Arrow />
                </Button>
              </div>
              <p className="mt-6 font-mono text-xs text-muted">
                Proprietary platforms · Engineered in Coimbatore
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
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name} — open product (new tab)`}
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
                          <h3 className="text-xl font-semibold tracking-[-0.01em] text-fg group-hover:text-accent transition-colors">
                            {p.name}
                          </h3>
                          <span className="font-mono text-xs text-muted">{p.code}</span>
                        </div>
                        <p className="font-mono text-xs text-muted">{p.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
                        {p.status}
                      </span>
                      <span
                        aria-hidden
                        className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/10 group-hover:text-fg sm:flex"
                      >
                        <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-[15px] font-medium leading-snug text-fg/95">{p.tagline}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.desc}</p>
                  <p className="mt-3 font-mono text-xs text-accent group-hover:underline">
                    {p.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.06] pt-3" aria-label="Tags">
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
