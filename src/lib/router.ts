import { useEffect, useState } from "react";
import type { ServiceSlug, CaseStudySlug, InsightSlug } from "../data/content";

export type RoutePath =
  | "/"
  | "/services"
  | `/services/${ServiceSlug}`
  | "/work"
  | `/work/${CaseStudySlug}`
  | "/products"
  | "/trust"
  | "/insights"
  | `/insights/${InsightSlug}`
  | "/about"
  | "/contact"
  | "/privacy"
  | "/terms"
  | "/engagement"
  | "/404";

export const ROUTE_TITLES: Record<RoutePath, string> = {
  "/": "NEXMANCER — Your Technology & AI Engineering Partner | Custom Software, AI & Security",
  "/services": "Engineering Services & Engagement Models — NEXMANCER",
  "/services/custom-software": "Custom Software & Workflow Automation (SVC/01) — NEXMANCER",
  "/services/ai-and-automation": "Private Document AI & Deterministic Scoring (SVC/02) — NEXMANCER",
  "/services/security-architecture": "AppSec Automation & Vulnerability Triage (SVC/03) — NEXMANCER",
  "/services/document-digitisation": "Offline Document OCR & Digital Preservation (SVC/04) — NEXMANCER",
  "/services/cloud-infrastructure": "Cloud Modernization & High-Throughput Telemetry (SVC/05) — NEXMANCER",
  "/work": "Proof of Work & Engineering Case Studies — NEXMANCER",
  "/work/reachability-triage": "Case Study: Eliminating CVE Alert Fatigue with Call-Graph Reachability — NEXMANCER",
  "/work/deterministic-grading": "Case Study: Deterministic Psychometric Grading for High-Stakes Assessments — NEXMANCER",
  "/work/airgapped-rag": "Case Study: Air-Gapped Document Search & ISO Archival — NEXMANCER",
  "/products": "Products & Platforms — NEXMANCER | Sensighty, SigmaSec, LibraDigit, AskMyDocs, Hyperlocal Heat",
  "/trust": "Trust, Security & Procurement Center — NEXMANCER PRIVATE LIMITED",
  "/insights": "Engineering Notes & Readiness Checklist — NEXMANCER",
  "/insights/cited-private-rag": "Why Generic Chatbots Fail on Enterprise Documents (Hybrid BM25 + Vector RAG) — NEXMANCER",
  "/insights/reachability-cve-triage": "Cutting Security Scanner Noise with CISA KEV, EPSS & Call-Graph Reachability — NEXMANCER",
  "/insights/offline-ocr-pdfa-archival": "Turning Scanned Records into Searchable ISO PDF/A Archives Offline — NEXMANCER",
  "/about": "About, Leadership & Engineering Ethos — NEXMANCER PRIVATE LIMITED",
  "/contact": "Book a Discovery Call or Submit a Problem Brief — NEXMANCER",
  "/privacy": "Privacy Policy (DPDP Act 2023) — NEXMANCER PRIVATE LIMITED",
  "/terms": "Terms of Use — NEXMANCER PRIVATE LIMITED",
  "/engagement": "Engagement & Cancellation Policy — NEXMANCER PRIVATE LIMITED",
  "/404": "404 · Route Not Found — NEXMANCER",
};

const KNOWN_ROUTES = new Set<string>(Object.keys(ROUTE_TITLES));

export function normalizePath(pathname: string): RoutePath {
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  if (clean === "/index.html") return "/";
  if (KNOWN_ROUTES.has(clean)) return clean as RoutePath;
  return "/404";
}

function dispatchTopicIfPresent(rawHash: string) {
  const qIdx = rawHash.indexOf("?");
  if (qIdx === -1) return { cleanHash: rawHash, topic: null as string | null };
  const cleanHash = rawHash.slice(0, qIdx);
  const params = new URLSearchParams(rawHash.slice(qIdx + 1));
  const topic = params.get("topic");
  if (topic && typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("nx:select-topic", { detail: topic }));
  }
  return { cleanHash, topic };
}

export function navigateTo(href: string) {
  if (typeof window === "undefined") return;

  // Handle hash links like "#problems", "/#problems", or "/#contact?topic=..."
  if (href.startsWith("#") || href.startsWith("/#")) {
    const rawHash = href.startsWith("/#") ? href.slice(1) : href;
    const { cleanHash, topic } = dispatchTopicIfPresent(rawHash);
    const currentPath = normalizePath(window.location.pathname);

    const scrollTarget = () => {
      if (cleanHash === "#top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(cleanHash.slice(1));
        el?.scrollIntoView({ behavior: "smooth" });
        if (topic) {
          window.setTimeout(() => {
            document.getElementById("cf-name")?.focus({ preventScroll: true });
          }, 350);
        }
      }
    };

    if (currentPath !== "/" && !(currentPath === "/contact" && cleanHash === "#contact")) {
      window.history.pushState({}, "", `/${cleanHash}`);
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.setTimeout(() => {
        if (topic) window.dispatchEvent(new CustomEvent("nx:select-topic", { detail: topic }));
        scrollTarget();
      }, 80);
    } else {
      window.history.pushState({}, "", cleanHash);
      scrollTarget();
    }
    return;
  }

  // Handle route paths
  const targetPath = normalizePath(href);
  if (normalizePath(window.location.pathname) !== targetPath) {
    window.history.pushState({}, "", targetPath === "/404" ? href : targetPath);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function useRoute(initialRoute?: RoutePath): RoutePath {
  const [route, setRoute] = useState<RoutePath>(() => {
    if (initialRoute) return initialRoute;
    return typeof window !== "undefined" ? normalizePath(window.location.pathname) : "/";
  });

  useEffect(() => {
    const onPopState = () => {
      const next = normalizePath(window.location.pathname);
      setRoute(next);
      document.title = ROUTE_TITLES[next] || ROUTE_TITLES["/404"];
    };

    document.title = ROUTE_TITLES[route] || ROUTE_TITLES["/404"];
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [route]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      if (/^(https?:|mailto:|tel:)/i.test(href)) return;

      if (href.startsWith("/")) {
        e.preventDefault();
        navigateTo(href);
      } else if (href.startsWith("#")) {
        e.preventDefault();
        navigateTo(href);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return route;
}
