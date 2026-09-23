import { useEffect, useRef, useState } from "react";
import { Container, Logo } from "./ui";
import { SITE, isExternal } from "../lib/site";

type Doc = "privacy" | "terms";
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
    h: "Legal",
    links: [
      { l: "Privacy Policy", doc: "privacy" },
      { l: "Terms of Use", doc: "terms" },
    ],
  },
];

const DOCS: Record<Doc, { t: string; body: string[] }> = {
  privacy: {
    t: "Privacy Policy",
    body: [
      "This website does not use advertising or analytics trackers. Web fonts are loaded from Google Fonts, which may receive your IP address as part of that request.",
      "If you contact NEXMANCER through the contact form or by email, the details you provide (name, email, company, subject and message) are used only to respond to your enquiry. We do not sell this information or share it for marketing.",
      `You may request access to, correction of or deletion of your information at any time by writing to ${SITE.email}.`,
    ],
  },
  terms: {
    t: "Terms of Use",
    body: [
      `Content on this website is provided for general information about ${SITE.legal} and its areas of technology work.`,
      `Unless otherwise stated, content, names and logos on this site belong to ${SITE.legal} and may not be reproduced without permission. Third-party names mentioned as technology areas belong to their respective owners and do not imply endorsement or partnership.`,
      "Nothing on this website is a binding offer. Any engagement is subject to a separate written agreement.",
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
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-[#080A0D] pt-20" aria-labelledby="footer-title">
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
