import { PRODUCTS } from "../data/content";
import { spotlightHandler } from "../lib/hooks";
import { SITE, scheduleMailto, slugify } from "../lib/site";
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
                  id={slugify(p.name)}
                  onPointerMove={spotlightHandler}
                  style={{
                    borderColor: `color-mix(in srgb, ${p.brandColor} 24%, rgba(255,255,255,0.08))`,
                  }}
                  className="spotlight group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border bg-graphite/65 p-6 transition-all duration-500 hover:bg-graphite/85 sm:p-8"
                >
                  {/* Subtle Brand Ambient Glow */}
                  <div
                    className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
                    style={{ background: p.brandColor }}
                    aria-hidden
                  />
                  <div>
                    {/* Top Row: Icon, Name, Code & Honest Status Badge */}
                    <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span
                          style={{
                            borderColor: `color-mix(in srgb, ${p.brandColor} 40%, transparent)`,
                            backgroundColor: `color-mix(in srgb, ${p.brandColor} 12%, transparent)`,
                            color: p.brandColor,
                          }}
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition-transform duration-300 group-hover:scale-105"
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <div>
                          <div className="flex flex-wrap items-center gap-2.5">
                            <h2 className="text-2xl font-bold tracking-tight text-fg transition-colors">
                              {p.name}
                            </h2>
                            <span
                              style={{
                                borderColor: `color-mix(in srgb, ${p.brandColor} 30%, transparent)`,
                                color: p.brandColor,
                              }}
                              className="rounded-md border bg-ink/60 px-2 py-0.5 font-mono text-xs font-medium"
                            >
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

                    {/* Middle Body: Default Problem/Description crossfades to Image + Features on mouseover */}
                    <div className="relative mt-6 min-h-[210px] sm:min-h-[225px]">
                      <div className="transition-all duration-300 group-hover:scale-[0.98] group-hover:opacity-0 group-focus-within:scale-[0.98] group-focus-within:opacity-0">
                        {/* One-line Problem / Value Statement */}
                        <div
                          style={{
                            borderColor: `color-mix(in srgb, ${p.brandColor} 22%, rgba(255,255,255,0.07))`,
                          }}
                          className="rounded-2xl border bg-ink/70 p-4"
                        >
                          <p
                            style={{ color: p.brandColor }}
                            className="font-mono text-[11px] font-semibold uppercase tracking-wider"
                          >
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

                      {/* Mouseover Preview: Product Image + Key Features */}
                      <div
                        style={{
                          borderColor: `color-mix(in srgb, ${p.brandColor} 45%, transparent)`,
                        }}
                        className={cn(
                          "pointer-events-none absolute inset-0 overflow-hidden rounded-2xl border bg-[#0A1426] opacity-0 scale-[0.98] shadow-2xl transition-all duration-300 group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100",
                          i === 0 ? "grid lg:grid-cols-12" : "flex flex-col justify-end"
                        )}
                      >
                        {i === 0 ? (
                          <>
                            <div className="relative h-full min-h-[140px] overflow-hidden lg:col-span-7">
                              <img
                                src={p.image}
                                alt={`${p.name} platform interface preview`}
                                loading="lazy"
                                decoding="async"
                                width={1200}
                                height={670}
                                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                              />
                              <div
                                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0A1426]/90 max-lg:bg-gradient-to-t max-lg:from-[#0A1426]"
                                aria-hidden
                              />
                            </div>
                            <div className="flex flex-col justify-center bg-[#0A1426]/95 p-5 lg:col-span-5">
                              <p
                                style={{ color: p.brandColor }}
                                className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
                              >
                                Key Features
                              </p>
                              <ul className="mt-3 space-y-2.5">
                                {p.features.map((feat) => (
                                  <li
                                    key={feat}
                                    className="flex items-start gap-2.5 text-sm leading-snug text-slate-100"
                                  >
                                    <span
                                      style={{ backgroundColor: p.brandColor }}
                                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                      aria-hidden
                                    />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              src={p.image}
                              alt={`${p.name} platform interface preview`}
                              loading="lazy"
                              decoding="async"
                              width={1200}
                              height={670}
                              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                            />
                            <div
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1426] via-[#0A1426]/88 to-[#0A1426]/20"
                              aria-hidden
                            />
                            <div className="relative z-10 p-5">
                              <p
                                style={{ color: p.brandColor }}
                                className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]"
                              >
                                Key Features
                              </p>
                              <ul className="mt-2.5 space-y-1.5">
                                {p.features.map((feat) => (
                                  <li
                                    key={feat}
                                    className="flex items-start gap-2 text-sm leading-snug text-slate-100"
                                  >
                                    <span
                                      style={{ backgroundColor: p.brandColor }}
                                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                                      aria-hidden
                                    />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Tags + External Launch Link */}
                  <div className="relative z-10 mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
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
                      style={{
                        borderColor: `color-mix(in srgb, ${p.brandColor} 45%, transparent)`,
                        backgroundColor: `color-mix(in srgb, ${p.brandColor} 14%, transparent)`,
                      }}
                      className="inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs font-semibold text-fg transition-all hover:brightness-110"
                    >
                      {isProductionDomain ? `Launch ${p.name}` : `Open ${p.name} Demo`}
                      <span style={{ color: p.brandColor }} className="inline-flex">
                        <ArrowUpRight />
                      </span>
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
              <Button href="/services" variant="secondary">
                Explore Custom Services <Arrow />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

