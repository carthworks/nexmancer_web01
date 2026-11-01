import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";
const KEY = "nx-theme";
const META = { dark: "#0A1426", light: "#F4F7FB" } as const;

const current = (): Theme =>
  typeof document !== "undefined" && document.documentElement.dataset.theme === "light" ? "light" : "dark";

function apply(t: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  root.dataset.theme = t;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", META[t]);
  window.setTimeout(() => root.classList.remove("theme-transition"), 400);
}

/** Shared theme state. Initial value is set pre-paint by the inline script in index.html. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(current);

  useEffect(() => {
    // Keep multiple toggles (desktop + mobile) in sync.
    const mo = new MutationObserver(() => setTheme(current()));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    // Follow the OS setting until the user picks explicitly.
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onOS = () => {
      try {
        if (!localStorage.getItem(KEY)) apply(mq.matches ? "light" : "dark");
      } catch { /* storage blocked */ }
    };
    mq.addEventListener("change", onOS);
    return () => {
      mo.disconnect();
      mq.removeEventListener("change", onOS);
    };
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = current() === "light" ? "dark" : "light";
    apply(next);
    try {
      localStorage.setItem(KEY, next);
    } catch { /* storage blocked */ }
  }, []);

  return { theme, toggle };
}

