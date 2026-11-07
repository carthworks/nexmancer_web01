import { Container, Logo } from "./ui";
import { SITE, isExternal } from "../lib/site";

type LinkItem = { l: string; href: string };

const COLS: { h: string; links: LinkItem[] }[] = [
  {
    h: "Services & Work",
    links: [
      { l: "All Services (/services)", href: "/services" },
      { l: "Custom Software", href: "/services/custom-software" },
      { l: "Private AI & Scoring", href: "/services/ai-and-automation" },
      { l: "AppSec & CVE Triage", href: "/services/security-architecture" },
      { l: "Offline OCR & PDF/A", href: "/services/document-digitisation" },
      { l: "Cloud & Telemetry", href: "/services/cloud-infrastructure" },
      { l: "Case Studies (/work)", href: "/work" },
    ],
  },
  {
    h: "Company & Insights",
    links: [
      { l: "Products (/products)", href: "/products" },
      { l: "Engineering Notes (/insights)", href: "/insights" },
      { l: "About & Leadership (/about)", href: "/about" },
      { l: "Trust & Security (/trust)", href: "/trust" },
      { l: "Book a Call (/contact)", href: "/contact" },
    ],
  },
  {
    h: "Connect",
    links: [
      { l: "LinkedIn", href: SITE.linkedin },
      { l: "GitHub", href: SITE.github },
      { l: "X (Twitter)", href: SITE.x },
      { l: "Email Enquiries", href: `mailto:${SITE.email}` },
    ],
  },
  {
    h: "Legal & Governance",
    links: [
      { l: "Trust & Procurement", href: "/trust" },
      { l: "Privacy Policy (DPDP)", href: "/privacy" },
      { l: "Terms of Use", href: "/terms" },
      { l: "Engagement & IP Policy", href: "/engagement" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-ink/80 pt-20" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="/" aria-label="NEXMANCER — home">
              <Logo />
            </a>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-fg/90">{SITE.tagline}</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Custom software, verifiable private AI, application security, and data engineering — built in Coimbatore, India for teams worldwide.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            {COLS.map((c) => (
              <div key={c.h}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{c.h}</h3>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.l}>
                      <a
                        href={l.href}
                        {...(isExternal(l.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="text-[15px] text-fg/80 transition-colors hover:text-fg"
                      >
                        {l.l}
                        {isExternal(l.href) && (
                          <span aria-hidden className="ml-1 text-muted">
                            ↗
                          </span>
                        )}
                        {isExternal(l.href) && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/[0.07] py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© 2026 {SITE.legal}. All rights reserved.</p>
          <p className="font-mono text-xs uppercase tracking-[0.16em]">{SITE.city}</p>
        </div>
      </Container>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="translate-y-[18%] text-center text-[19vw] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_color-mix(in_srgb,var(--color-white)_9%,transparent)]">
          NEXMANCER
        </p>
      </div>
    </footer>
  );
}
