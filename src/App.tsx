import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemsSection from "./components/ProblemsSection";
import TechnologyGrid from "./components/TechnologyGrid";
import ObjectivesSection from "./components/ObjectivesSection";
import CaseStudies from "./components/CaseStudies";
import ProductPipeline from "./components/ProductPipeline";
import SecurityAI from "./components/SecurityAI";
import GlobalSection from "./components/GlobalSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ProductsPage from "./pages/ProductsPage";
import LegalPage from "./pages/LegalPage";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";
import TrustPage from "./pages/TrustPage";
import InsightsPage from "./pages/InsightsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import type { ServiceSlug, CaseStudySlug, InsightSlug } from "./data/content";
import { useRoute, type RoutePath } from "./lib/router";

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

function renderRoute(route: RoutePath) {
  if (route === "/services") return <ServicesPage />;
  if (route.startsWith("/services/")) {
    const slug = route.slice("/services/".length) as ServiceSlug;
    return <ServicesPage slug={slug} />;
  }
  if (route === "/work") return <WorkPage />;
  if (route.startsWith("/work/")) {
    const slug = route.slice("/work/".length) as CaseStudySlug;
    return <WorkPage slug={slug} />;
  }
  if (route === "/products") return <ProductsPage />;
  if (route === "/trust") return <TrustPage />;
  if (route === "/insights") return <InsightsPage />;
  if (route.startsWith("/insights/")) {
    const slug = route.slice("/insights/".length) as InsightSlug;
    return <InsightsPage slug={slug} />;
  }
  if (route === "/about") return <AboutPage />;
  if (route === "/contact") return <ContactPage />;
  if (route === "/privacy") return <LegalPage docKey="privacy" />;
  if (route === "/terms") return <LegalPage docKey="terms" />;
  if (route === "/engagement") return <LegalPage docKey="engagement" />;
  if (route === "/404") return <NotFoundPage />;

  return (
    <>
      {/* 1. HERO */}
      <Hero />

      {/* 2. PROBLEMS WE SOLVE */}
      <ProblemsSection />

      {/* 3. CAPABILITIES & METHODS */}
      <TechnologyGrid />

      {/* 4. SERVICES & ENGAGEMENT MODELS */}
      <ObjectivesSection />

      {/* 5. PROOF OF WORK: CASE STUDIES */}
      <CaseStudies />

      {/* 6. ENGINEERING METHODOLOGY */}
      <ProductPipeline />

      {/* 7. DEEP-TECH ARCHITECTURE: AI x SECURITY */}
      <SecurityAI />

      {/* 8. GLOBAL CONNECTIVITY & PRESENCE */}
      <GlobalSection />

      {/* 9. COMPANY FOUNDATIONS, LEADERSHIP & ENGINEERING ETHOS */}
      <AboutSection />

      {/* 10. CONTACT & DISCOVERY */}
      <ContactSection />
    </>
  );
}

export default function App({ initialRoute }: { initialRoute?: RoutePath } = {}) {
  const route = useRoute(initialRoute);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-fg">
      <ScrollProgress />
      <Navbar currentRoute={route} />
      <main id="main">{renderRoute(route)}</main>
      <Footer />
    </div>
  );
}
