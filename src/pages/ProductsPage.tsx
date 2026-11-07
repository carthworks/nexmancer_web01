import { PRODUCTS } from "../data/content";
import { spotlightHandler } from "../lib/hooks";
import { SITE, scheduleMailto } from "../lib/site";
import { DOMAIN_ICONS } from "../components/icons";
import { Arrow, ArrowUpRight, Button, Container, Eyebrow, Reveal, Tag } from "../components/ui";
import { cn } from "../utils/cn";

const APP_CATEGORY: Record<string, string> = {
  Sensighty: "EducationalApplication",
  SigmaSec: "SecurityApplication",
  LibraDigit: "BusinessApplication",
  AskMyDocs: "BusinessApplication",
  "Hyperlocal Heat": "ScientificApplication",
};

const PRODUCTS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "NEXMANCER Software Products & Platforms",
  description: "Proprietary software platforms and live demos engineered by NEXMANCER PRIVATE LIMITED.",
  numberOfItems: PRODUCTS.length,
  itemListElement: PRODUCTS.map((p, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    item: {
      "@type": "SoftwareApplication",
      name: p.name,
      url: p.url,
      applicationCategory: APP_CATEGORY[p.name] || "BusinessApplication",
      operatingSystem: "Web, Cloud, On-Premise",
      description: `${p.tagline} ${p.desc}`,
      provider: {
        "@type": "Organization",
        name: SITE.legal,
        url: SITE.url,
      },
    },
  })),
};

export default function ProductsPage() {
  return (
    <section
      id="products-page"
      aria-labelledby="products-page-title"
      className="noise relative isolate min-h-[calc(100svh-5rem)] overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36"
    >
      {/* Scoped JSON-LD Schema for /products only */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCTS_SCHEMA) }}
      />

      <div className="grid-bg grid-fade absolute inset-0 -z-20" aria-hidden />
      <div
        className="absolute -right-40 -top-40 -z-10 h-[560px] w-[560px] rounded-full opacity-55 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,184,207,0.2), rgba(30,127,184,0.08) 45%, transparent 70%)" }}
        aria-hidden
      />

      <Container>
        {/* Breadcrumb / Back Navigation */}
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <a
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs font-medium text-muted transition-colors hover:text-accent"
            >
              <span aria-hidden>←</span> Back to Engineering &amp; Services
            </a>
            <span className="font-mono text-xs text-muted">
              /products · {PRODUCTS.length} platforms
            </span>
          </div>
        </Reveal>

        {/* Header */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>NEXMANCER Products Hub</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1
                id="products-page-title"
                className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl"
              >
                Software platforms we
                <br />
                <span className="text-gradient">build and run in-house.</span>
              </h1>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              Alongside our client engineering work, we build proprietary platforms to solve specific bottlenecks in adaptive assessment, vulnerability triage, offline document preservation, private RAG search, and urban heat forecasting.
            </p>
          </Reveal>
        </div>

        {/* Status Legend */}
        <Reveal delay={200} className="mt-8">
          <div className="inline-flex flex-wrap items-center gap-4 rounded-2xl border border-white/[0.08] bg-graphite/60 px-4 py-2.5 font-mono text-xs text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <strong className="font-medium text-fg">Live:</strong> Production domain (*.nexmancer.com)
            </span>
            <span aria-hidden className="text-white/20">·</span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <strong className="font-medium text-fg">Live Demo:</strong> Interactive preview instance
            </span>
          </div>
        </Reveal>

        {/* Product Cards Grid */}
        <ul className="mt-12 grid gap-6 lg:grid-cols-2">
          {PRODUCTS.map((p, i) => {
            const Icon = DOMAIN_ICONS[p.key];
            const isProductionDomain = p.status === "Live";
            return (
              <Reveal
                as="li"
                key={p.name}
                delay={i * 70}
                className={cn(i === 0 && "lg:col-span-2")}
              >
                <article
                  onPointerMove={spotlightHandler}
                  className="spotlight group flex h-full flex-col justify-between rounded-3xl border border-white/[0.09] bg-graphite/65 p-6 transition-all duration-500 hover:border-white/20 hover:bg-graphite/85 sm:p-8"
                >
                  <div>
                    {/* Top Row: Icon, Name, Code & Honest Status Badge */}
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-fg transition-colors group-hover:border-accent/40 group-hover:text-accent">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h2 className="text-2xl font-bold tracking-tight text-fg group-hover:text-accent transition-colors">
                              {p.name}
                            </h2>
                            <span className="rounded-md border border-white/10 bg-ink/60 px-2 py-0.5 font-mono text-xs text-muted">
                              {p.code}
                            </span>
                          </div>
                          <p className="mt-0.5 font-mono text-xs text-muted">{p.category}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-medium",
                            isProductionDomain
                              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-400"
                              : "border-accent/30 bg-accent/10 text-accent"
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              isProductionDomain ? "bg-emerald-400" : "bg-accent"
                            )}
                          />
                          {p.status}
                        </span>
                      </div>
                    </div>

                    {/* One-line Problem / Value Statement */}
                    <div className="mt-6 rounded-2xl border border-white/[0.07] bg-ink/70 p-4">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                        Problem it solves
                      </p>
                      <p className="mt-1 text-base font-semibold leading-snug text-fg">
                        {p.tagline}
                      </p>
                    </div>

                    {/* Detailed Engineering Description */}
                    <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
                      {p.desc}
                    </p>
                  </div>

                  {/* Card Footer: Tags + External Launch Link */}
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                    <ul className="flex flex-wrap gap-2" aria-label={`${p.name} capabilities`}>
                      {p.tags.map((t) => (
                        <li key={t}>
                          <Tag>{t}</Tag>
                        </li>
                      ))}
                    </ul>

                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-4 py-2 font-mono text-xs font-semibold text-fg transition-all hover:border-accent hover:bg-accent/20"
                    >
                      {isProductionDomain ? `Launch ${p.name}` : `Open ${p.name} Demo`}
                      <ArrowUpRight className="text-accent" />
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>

        {/* Enterprise Customization & On-Prem Deployment Banner */}
        <Reveal delay={250} className="mt-16">
          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-accent/25 bg-gradient-to-r from-graphite/90 via-graphite/70 to-accent/[0.08] p-7 sm:flex-row sm:items-center sm:p-10">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
                Need Private / On-Premise Deployment or Custom Integration?
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                Deploy any platform inside your own cloud or air-gapped network.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                Every NEXMANCER platform can be licensed, customized, or integrated into your existing enterprise workflows with dedicated engineering support.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Button href={scheduleMailto("Product Licensing & On-Prem Deployment")}>
                Book a Discovery Call <ArrowUpRight />
              </Button>
              <Button href="/#solutions" variant="secondary">
                Explore Custom Services <Arrow />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

