import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechnologyGrid from "./components/TechnologyGrid";
import ProductPipeline from "./components/ProductPipeline";
import ProductStudio from "./components/ProductStudio";
import SecurityAI from "./components/SecurityAI";
import ObjectivesSection from "./components/ObjectivesSection";
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
        {/* 1. HERO (with integrated tech stack badges) */}
        <Hero />

        {/* 2. CORE TECHNOLOGY PILLARS */}
        <TechnologyGrid />

        {/* 3. ENGINEERING METHODOLOGY */}
        <ProductPipeline />

        {/* 4. FEATURED PRODUCTS & PLATFORMS */}
        <ProductStudio />

        {/* 5. DEEP-TECH SPOTLIGHT: AI × CYBERSECURITY */}
        <SecurityAI />

        {/* 6. SOLUTIONS & ENGAGEMENT MODELS */}
        <ObjectivesSection />

        {/* 7. GLOBAL CONNECTIVITY & PRESENCE */}
        <GlobalSection />

        {/* 8. COMPANY FOUNDATIONS & ENGINEERING ETHOS */}
        <AboutSection />

        {/* 9. CONTACT & DISCOVERY */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
