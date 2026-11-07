import { useEffect, useState } from "react";

export type RoutePath = "/" | "/products" | "/privacy" | "/terms" | "/engagement";

export function normalizePath(pathname: string): RoutePath {
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "") || "/";
  if (clean === "/products") return "/products";
  if (clean === "/privacy") return "/privacy";
  if (clean === "/terms") return "/terms";
  if (clean === "/engagement") return "/engagement";
  return "/";
}

export const ROUTE_TITLES: Record<RoutePath, string> = {
  "/": "NEXMANCER — Your Technology & AI Engineering Partner | Custom Software, AI & Security",
  "/products": "Products & Platforms — NEXMANCER | Sensighty, SigmaSec, LibraDigit, AskMyDocs, Hyperlocal Heat",
  "/privacy": "Privacy Policy (DPDP Act 2023) — NEXMANCER PRIVATE LIMITED",
  "/terms": "Terms of Use — NEXMANCER PRIVATE LIMITED",
  "/engagement": "Engagement & Cancellation Policy — NEXMANCER PRIVATE LIMITED",
};

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

    if (currentPath !== "/") {
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

  // Handle route paths like "/", "/products", "/privacy", "/terms", "/engagement"
  const targetPath = normalizePath(href);
  if (normalizePath(window.location.pathname) !== targetPath) {
    window.history.pushState({}, "", targetPath);
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
      document.title = ROUTE_TITLES[next];
    };

    document.title = ROUTE_TITLES[route];
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
