import ContactSection from "../components/ContactSection";
import { Container, Reveal } from "../components/ui";
import { SITE } from "../lib/site";

export default function ContactPage() {
  return (
    <div className="pt-20 sm:pt-24">
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4 pt-6">
            <a
              href="/"
              className="inline-flex items-center gap-2 font-mono text-xs font-medium text-muted transition-colors hover:text-accent"
            >
              <span aria-hidden>←</span> Back to Home
            </a>
            <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
              <span className="text-accent">SLA: {SITE.responseSla}</span>
              <span aria-hidden className="text-white/20">·</span>
              <a href="/trust" className="hover:text-accent">Mutual NDA Available (/trust)</a>
            </div>
          </div>
        </Reveal>
      </Container>

      <ContactSection />
    </div>
  );
}

