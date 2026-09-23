import { useEffect, useState } from "react";
import { NAV, SITE } from "../lib/site";
import { cn } from "../utils/cn";
import { Logo, ArrowUpRight, Arrow } from "./ui";
import { IconGithub } from "./icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open ? "border-b border-white/[0.07] bg-ink/70 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent"
      )}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:h-[72px] lg:px-10">
        <a href="#top" aria-label="NEXMANCER home" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] p-1 lg:flex">
          {NAV.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors",
                    isActive ? "bg-white/[0.08] text-fg" : "text-muted hover:text-fg"
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-[13px] font-medium text-muted transition-colors hover:text-fg"
          >
            <IconGithub className="h-4 w-4" /> GitHub <ArrowUpRight />
          </a>
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-[13px] font-semibold text-ink transition-all hover:shadow-[0_0_0_4px_rgba(91,140,255,0.2)]"
          >
            Contact Us <Arrow />
          </a>
        </div>

        <button
          type="button"
          className="relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full text-fg lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <span className={cn("absolute h-px w-5 bg-current transition-all duration-300", open ? "rotate-45" : "-translate-y-[4px]")} />
          <span className={cn("absolute h-px w-5 bg-current transition-all duration-300", open ? "-rotate-45" : "translate-y-[4px]")} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 bg-ink/95 backdrop-blur-xl transition-all duration-400 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <div className="flex h-full flex-col px-5 pb-10 pt-6 sm:px-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Navigate</p>
          <ul className="mt-4 divide-y divide-white/[0.07] border-y border-white/[0.07]">
            {NAV.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between py-5 text-2xl font-semibold tracking-tight text-fg transition-all duration-500",
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                  )}
                  style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
                >
                  {item.label}
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3">
            <a href="#contact" onClick={() => setOpen(false)} className="flex h-13 min-h-12 items-center justify-center rounded-full bg-fg text-sm font-semibold text-ink">
              Contact Us →
            </a>
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-medium text-fg"
            >
              <IconGithub className="h-4 w-4" /> GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
