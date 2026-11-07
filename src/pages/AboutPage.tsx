import AboutSection from "../components/AboutSection";
import ProductPipeline from "../components/ProductPipeline";
import GlobalSection from "../components/GlobalSection";
import { Container, Reveal } from "../components/ui";

export default function AboutPage() {
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
              <a href="/trust" className="hover:text-accent">Trust &amp; Security (/trust)</a>
              <span aria-hidden className="text-white/20">·</span>
              <a href="/services" className="hover:text-accent">Services (/services)</a>
              <span aria-hidden className="text-white/20">·</span>
              <a href="/work" className="hover:text-accent">Case Studies (/work)</a>
            </div>
          </div>
        </Reveal>
      </Container>

      <AboutSection />
      <ProductPipeline />
      <GlobalSection />
    </div>
  );
}

