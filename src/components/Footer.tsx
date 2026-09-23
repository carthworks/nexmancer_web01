import { useEffect, useRef, useState } from "react";
import { Container, Logo } from "./ui";
import { SITE, isExternal } from "../lib/site";

type Doc = "privacy" | "terms" | "engagement";
type LinkItem = { l: string; href?: string; doc?: Doc };

const COLS: { h: string; links: LinkItem[] }[] = [
  {
    h: "Company",
    links: [
      { l: "About", href: "#about" },
      { l: "Technology", href: "#technology" },
      { l: "Methodology", href: "#pipeline" },
      { l: "Products", href: "#products" },
      { l: "Proof of Work", href: "#case-studies" },
      { l: "Solutions", href: "#solutions" },
      { l: "Contact", href: "#contact" },
    ],
  },
  {
    h: "Technology",
    links: [
      { l: "Software", href: "#technology" },
      { l: "AI & Intelligence", href: "#technology" },
      { l: "Cybersecurity", href: "#security" },
      { l: "Data Platforms", href: "#technology" },
      { l: "Cloud Native", href: "#technology" },
    ],
  },
  {
    h: "Connect",
    links: [
      { l: "GitHub", href: SITE.github },
      { l: "X (Twitter)", href: SITE.x },
      { l: "Email Enquiries", href: `mailto:${SITE.email}` },
    ],
  },
  {
    h: "Legal & Trust",
    links: [
      { l: "Privacy Policy", doc: "privacy" },
      { l: "Terms of Use", doc: "terms" },
      { l: "Engagement & Cancellation", doc: "engagement" },
    ],
  },
];

const DOCS: Record<Doc, { t: string; body: string[] }> = {
  privacy: {
    t: "Privacy Policy",
    body: [
      `1. Data Controller: ${SITE.legal}, located at ${SITE.city}, is committed to transparent and lawful data processing in accordance with India's Digital Personal Data Protection Act (DPDP Act 2023) and global standards.`,
      "2. Zero Tracking & Data Minimization: This website does NOT deploy third-party advertising cookies, behavioral tracking pixels, or fingerprinting scripts. Web fonts are served via Google Fonts, which receives standard HTTP IP metadata as part of font asset delivery.",
      "3. Direct Inquiries: Information provided through our contact form (name, email, company, subject, and message) is utilized exclusively to respond to your technical and business inquiries. We never sell, rent, or lease personal information to third parties.",
      `4. Your Rights: Under applicable privacy legislation, you have the right to request access to, correction of, or permanent deletion of your contact records. Requests should be directed to ${SITE.email}.`,
      "5. Data Retention: Inquiry correspondence is retained for operational records for up to 12 months, after which it is securely purged.",
      `6. Grievance Officer: Designated Grievance Officer, ${SITE.legal}, 6/35 1, Kutty Naicker Street, Pachapalayam, Perur, Coimbatore, Tamil Nadu 641010, India. Email: legal@nexmancer.com.`,
    ],
  },
  terms: {
    t: "Terms of Use",
    body: [
      `1. General Terms: Content on this site is provided for general evaluation and informational purposes regarding the technology, systems, and engineering capabilities of ${SITE.legal}.`,
      `2. Proprietary Rights: Architecture diagrams, software code, wordmarks, and copy on this domain belong exclusively to ${SITE.legal} unless otherwise attributed. Third-party technology names (e.g. AWS, Kubernetes, React, Python) belong to their respective owners and imply no endorsement.`,
      "3. Acceptable Use: Automated crawling, scraping, vulnerability probe testing without authorization, or submission of harmful or malicious code via forms is strictly prohibited.",
      "4. Limitation of Liability: Site content is provided 'as is' without warranties of any kind. Under no circumstances shall NEXMANCER be liable for indirect, incidental, or consequential damages resulting from site access.",
      "5. Governing Law: These terms are governed by the laws of India. Courts situated in Coimbatore, Tamil Nadu, India maintain exclusive jurisdiction over any disputes.",
    ],
  },
  engagement: {
    t: "Engagement & Cancellation Policy",
    body: [
      "1. Commercial Agreements: Website content does not constitute a binding unilateral offer. All commercial software development, R&D squad provisioning, and architecture audits are governed by mutually executed Master Services Agreements (MSA) and Statements of Work (SOW).",
      "2. Milestones & Delivery: Work is structured around transparent milestone cycles with explicit technical acceptance criteria and a standard 10-business-day client review period.",
      "3. Cancellation & Termination: Either party may cancel active advisory or sprint services pursuant to the written termination notice provisions defined in the applicable SOW (typically 30 calendar days).",
      "4. Response SLA: We are committed to prompt communication. Inquiries received via business@nexmancer.com are acknowledged within one business day (Monday through Friday, 09:00 - 18:00 IST).",
    ],
  },
};

export default function Footer() {
  const [doc, setDoc] = useState<Doc | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (doc && !d.open) d.showModal();
    if (!doc && d.open) d.close();
  }, [doc]);

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#0B0E17]/80 pt-20" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Site footer
      </h2>
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#top" aria-label="NEXMANCER — back to top">
              <Logo />
            </a>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.24em] text-fg/90">Building what's next.</p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Software, AI, cybersecurity, data and cloud technology — researched, engineered and commercialized in India.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
            {COLS.map((c) => (
              <div key={c.h}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{c.h}</h3>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l.l}>
                      {l.doc ? (
                        <button
                          type="button"
                          onClick={() => setDoc(l.doc!)}
                          aria-haspopup="dialog"
                          className="text-left text-[15px] text-fg/80 transition-colors hover:text-fg"
                        >
                          {l.l}
                        </button>
                      ) : (
                        <a
                          href={l.href}
                          {...(isExternal(l.href!) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-[15px] text-fg/80 transition-colors hover:text-fg"
                        >
                          {l.l}
                          {isExternal(l.href!) && (
                            <span aria-hidden className="ml-1 text-muted">
                              ↗
                            </span>
                          )}
                          {isExternal(l.href!) && <span className="sr-only"> (opens in a new tab)</span>}
                        </a>
                      )}
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
        <p className="translate-y-[18%] text-center text-[19vw] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.09)]">
          NEXMANCER
        </p>
      </div>

      <dialog
        ref={dialog}
        onClose={() => setDoc(null)}
        onClick={(e) => e.target === e.currentTarget && setDoc(null)}
        aria-labelledby="legal-title"
        className="m-auto w-[min(92vw,600px)] rounded-2xl border border-white/10 bg-graphite p-0 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        {doc && (
          <div className="max-h-[80vh] overflow-y-auto p-7 sm:p-8">
            <div className="flex items-start justify-between gap-6">
              <h3 id="legal-title" className="text-2xl font-semibold tracking-tight">
                {DOCS[doc].t}
              </h3>
              <button
                type="button"
                onClick={() => setDoc(null)}
                aria-label="Close"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-muted hover:text-fg"
              >
                ✕
              </button>
            </div>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted">
              {DOCS[doc].body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-muted/80">
              {SITE.legal} · {SITE.city}
            </p>
          </div>
        )}
      </dialog>
    </footer>
  );
}
