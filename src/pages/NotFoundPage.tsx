import { Arrow, ArrowUpRight, Button, Container, Eyebrow, Reveal } from "../components/ui";
import { scheduleMailto } from "../lib/site";

const QUICK_ROUTES = [
  {
    title: "Services & Sprints",
    href: "/services",
    code: "/services",
    desc: "Custom software, cited private AI, vulnerability reachability triage, offline OCR, and cloud scale.",
  },
  {
    title: "Proof of Work & Case Studies",
    href: "/work",
    code: "/work",
    desc: "How we solved CVE alert fatigue, deterministic psychometric grading, and air-gapped document RAG.",
  },
  {
    title: "In-House Platforms",
    href: "/products",
    code: "/products",
    desc: "Explore Sensighty, SigmaSec, LibraDigit, AskMyDocs, and Hyperlocal Heat.",
  },
  {
    title: "Engineering Notes & Checklist",
    href: "/insights",
    code: "/insights",
    desc: "Technical architecture guides and our 9-point Enterprise Readiness Checklist.",
  },
  {
    title: "Trust & Security Center",
    href: "/trust",
    code: "/trust",
    desc: "100% client IP ownership, local-first options, DPDP Act 2023 compliance, and corporate dossier.",
  },
  {
    title: "Book a Discovery Call",
    href: "/contact",
    code: "/contact",
    desc: "Share your operational bottleneck and get a direct architect response within 1 business day.",
  },
];

export default function NotFoundPage() {
  return (
    <section
      id="not-found-page"
      aria-labelledby="not-found-title"
      className="noise relative isolate min-h-[calc(100svh-5rem)] overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36"
    >
      <div className="grid-bg grid-fade absolute inset-0 -z-20" aria-hidden />

      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>HTTP 404 · Route Not Found</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1
              id="not-found-title"
              className="mt-5 text-4xl font-extrabold leading-[1.06] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl"
            >
              This route doesn’t exist —
              <br />
              <span className="text-gradient">let’s get you to the right place.</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              The URL you requested may have moved or been mistyped. Use the direct directory below or return to the NEXMANCER engineering overview.
            </p>
          </Reveal>
          <Reveal delay={180} className="mt-7 flex flex-wrap gap-3">
            <Button href="/">
              Return to Homepage <Arrow />
            </Button>
            <Button href={scheduleMailto("Discovery Call")} variant="secondary">
              Book a Discovery Call <ArrowUpRight />
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_ROUTES.map((item, idx) => (
            <Reveal key={item.href} delay={idx * 50}>
              <a
                href={item.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-white/[0.09] bg-graphite/60 p-6 transition-all hover:border-accent/40 hover:bg-graphite/85"
              >
                <div>
                  <span className="font-mono text-xs text-accent">{item.code}</span>
                  <h2 className="mt-2 text-lg font-bold text-fg group-hover:text-accent transition-colors">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-fg/80 group-hover:text-accent">
                  Open route <Arrow />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

