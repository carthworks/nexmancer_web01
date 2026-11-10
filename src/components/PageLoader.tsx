import { useEffect, useState } from "react";
import { ROUTE_PAGE_NAMES, subscribeNavigation, normalizePath, type RoutePath } from "../lib/router";
import { Logo } from "./ui";

export default function PageLoader({ initialRoute }: { initialRoute?: RoutePath }) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageName, setPageName] = useState(() => {
    if (typeof window !== "undefined") {
      const p = normalizePath(window.location.pathname);
      return ROUTE_PAGE_NAMES[p] || "Overview & Core Systems";
    }
    return initialRoute ? (ROUTE_PAGE_NAMES[initialRoute] || "Overview & Core Systems") : "Overview & Core Systems";
  });

  useEffect(() => {
    setMounted(true);

    // Initial page load exit animation
    const initTimer = window.setTimeout(() => {
      setLoading(false);
    }, 450);

    // Listen for route transitions
    const unsubscribe = subscribeNavigation((evt) => {
      if (evt.isLoading) {
        setPageName(evt.pageName);
        setLoading(true);
      } else {
        window.setTimeout(() => {
          setLoading(false);
        }, 120);
      }
    });

    return () => {
      window.clearTimeout(initTimer);
      unsubscribe();
    };
  }, []);

  // During SSR pre-rendering, keep DOM transparent to avoid blocking crawlers
  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading ${pageName}`}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-300 ease-out select-none ${
        loading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "var(--color-ink)" }}
    >
      {/* Background radial ambient glow */}
      <div
        className="pointer-events-none absolute h-96 w-96 rounded-full opacity-40 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(34,184,207,0.32), rgba(30,127,184,0.15) 50%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative flex flex-col items-center text-center px-6">
        {/* Hex emblem with pulsing beacon */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="absolute h-20 w-20 rounded-2xl border border-accent/25 animate-ping opacity-25" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/40 bg-graphite/90 shadow-[0_0_35px_-5px_rgba(34,184,207,0.45)] backdrop-blur-md">
            <svg className="h-8 w-8 text-accent" viewBox="0 0 32 36" fill="none" aria-hidden="true">
              <path d="M16 2L30 10V26L16 34L2 26V10L16 2Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M12.5 12L19.5 18L12.5 24" stroke="var(--color-fg)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* NEXMANCER brand logo */}
        <div className="flex items-center justify-center mb-3.5">
          <Logo />
        </div>

        {/* Loading Page Name Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 font-mono text-xs font-medium text-accent shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
          <span className="text-fg/90">Loading</span>
          <span className="text-accent font-semibold">{pageName}</span>
        </div>

        {/* Sleek horizontal shimmer progress bar */}
        <div className="relative mt-5 h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
          <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-accent to-transparent animate-loader-shimmer" />
        </div>
      </div>
    </div>
  );
}

