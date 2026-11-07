import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemsSection from "./components/ProblemsSection";
import TechnologyGrid from "./components/TechnologyGrid";
import ObjectivesSection from "./components/ObjectivesSection";
import CaseStudies from "./components/CaseStudies";
import ProductPipeline from "./components/ProductPipeline";
import SecurityAI from "./components/SecurityAI";
import ProductStudio from "./components/ProductStudio";
import GlobalSection from "./components/GlobalSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-px" aria-hidden>
      <div ref={bar} className="h-full origin-left scale-x-0 bg-gradient-to-r from-accent via-violet to-cyan" />
    </div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-fg">
      <ScrollProgress />
      <Navbar />
      <main id="main">
        {/* 1. HERO (Problem-First Value Proposition & Outcome Showcase) */}
        <Hero />

        {/* 2. PROBLEMS WE SOLVE (Plain-language buyer symptoms & outcomes) */}
        <ProblemsSection />

        {/* 3. CAPABILITIES & METHODS (How we solve client problems) */}
        <TechnologyGrid />

        {/* 4. SERVICES & ENGAGEMENT MODELS (Fixed-scope sprints, audits & builds) */}
        <ObjectivesSection />

        {/* 5. PROOF OF WORK: CASE STUDIES (Problem -> Approach -> Result) */}
        <CaseStudies />

        {/* 6. ENGINEERING METHODOLOGY */}
        <ProductPipeline />

        {/* 7. DEEP-TECH ARCHITECTURE: AI x SECURITY */}
        <SecurityAI />

        {/* 8. CONTAINED PRODUCTS SECTION */}
        <ProductStudio />

        {/* 9. GLOBAL CONNECTIVITY & PRESENCE */}
        <GlobalSection />

        {/* 10. COMPANY FOUNDATIONS, LEADERSHIP & ENGINEERING ETHOS */}
        <AboutSection />

        {/* 11. CONTACT & DISCOVERY */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
