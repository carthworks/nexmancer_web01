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
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Primary Desktop & Mobile Header Bar */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-300",
          scrolled
            ? "border-b border-white/[0.07] bg-[#07090E]/90 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:h-[72px] lg:px-10">
          <a href="#top" aria-label="NEXMANCER home">
            <Logo />
          </a>

          {/* Desktop Nav Links */}
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

          {/* Desktop Actions */}
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

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            className="relative -mr-2 flex h-10 w-10 items-center justify-center rounded-xl text-fg hover:bg-white/[0.06] transition-colors lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Open menu</span>
            <div className="flex flex-col gap-1.5 items-center justify-center w-5">
              <span className="h-[1.5px] w-5 bg-current rounded-full" />
              <span className="h-[1.5px] w-5 bg-current rounded-full" />
            </div>
          </button>
        </nav>
      </header>

      {/* Full-Screen Mobile Navigation Overlay (100% Solid Opaque Background) */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        style={{ backgroundColor: "#07090E" }}
        className={cn(
          "fixed inset-0 z-50 flex flex-col transition-all duration-300 ease-out lg:hidden",
          open
            ? "pointer-events-auto opacity-100 visible"
            : "pointer-events-none opacity-0 invisible"
        )}
      >
        {/* Mobile Header Bar */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.08] px-5 sm:px-8">
          <a href="#top" aria-label="NEXMANCER home" onClick={() => setOpen(false)}>
            <Logo />
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-fg hover:bg-white/10 transition-colors"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer Body */}
        <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6 sm:px-8">
          <div className="flex items-center justify-between border-b border-white/[0.07] pb-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Navigation Menu</span>
            <span className="font-mono text-[10px] text-accent tracking-wider uppercase font-semibold">NEXMANCER</span>
          </div>

          <ul className="mt-3 divide-y divide-white/[0.06]">
            {NAV.map((item, i) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group flex items-center justify-between py-4 text-xl font-semibold tracking-tight transition-colors",
                      isActive ? "text-accent" : "text-fg/90 hover:text-accent"
                    )}
                  >
                    <span className="flex items-center gap-3.5">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full transition-all",
                          isActive ? "bg-accent scale-125 shadow-[0_0_8px_rgba(91,140,255,0.8)]" : "bg-white/20 group-hover:bg-accent"
                        )}
                      />
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-muted/60">0{i + 1}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Quick Action Footer in Drawer */}
          <div className="mt-auto pt-8 grid gap-3">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-fg px-5 text-sm font-semibold text-ink transition-transform active:scale-[0.98]"
            >
              Contact Us <Arrow />
            </a>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-graphite text-xs font-medium text-muted hover:text-fg transition-colors"
              >
                <IconGithub className="h-4 w-4" /> GitHub <ArrowUpRight />
              </a>
              <a
                href="mailto:contact@nexmancer.com"
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-graphite text-xs font-medium text-muted hover:text-fg transition-colors"
              >
                Direct Email ↗
              </a>
            </div>

            <div className="mt-3 text-center">
              <p className="font-mono text-[11px] text-muted/50">
                © {new Date().getFullYear()} NEXMANCER PRIVATE LIMITED
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
