import { useEffect, useRef, useState } from "react";
import { NAV, SITE, type NavMenuKey } from "../lib/site";
import { MegaPanel, MobileSubmenu } from "./MegaMenu";
import type { RoutePath } from "../lib/router";
import { cn } from "../utils/cn";
import { Logo, Arrow } from "./ui";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ currentRoute = "/" }: { currentRoute?: RoutePath }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Desktop mega-menu (hover / focus) and mobile drawer sub-lists
  const [menu, setMenu] = useState<NavMenuKey | null>(null);
  const [mobileSub, setMobileSub] = useState<NavMenuKey | null>(null);
  const timer = useRef<number | undefined>(undefined);
  const openMenu = (k: NavMenuKey) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMenu(k), menu ? 0 : 90);
  };
  const closeMenu = (delay = 160) => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMenu(null), delay);
  };
  useEffect(() => {
    setMenu(null);
    setMobileSub(null);
  }, [currentRoute]);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);
  // On the homepage the CTA scrolls to the contact section; everywhere else it opens /contact.
  const contactHref = currentRoute === "/" ? "#contact" : "/contact";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            ? "border-b border-white/[0.07] bg-ink/90 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-ink">
          Skip to content
        </a>
        <nav aria-label="Primary" className="relative mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:h-[72px] lg:px-10">
          <a href="/" aria-label="NEXMANCER home">
            <Logo />
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.02] p-1 lg:flex">
            {NAV.map((item) => {
              const isActive = currentRoute === item.href || currentRoute.startsWith(`${item.href}/`);
              return (
                <li
                  key={item.href}
                  onMouseEnter={item.menu ? () => openMenu(item.menu!) : undefined}
                  onMouseLeave={item.menu ? () => closeMenu() : undefined}
                  onFocus={item.menu ? () => openMenu(item.menu!) : undefined}
                  onBlur={
                    item.menu
                      ? (e) => {
                          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closeMenu(0);
                        }
                      : undefined
                  }
                >
                  <a
                    href={item.href}
                    onClick={() => setMenu(null)}
                    aria-current={isActive ? "page" : undefined}
                    aria-haspopup={item.menu ? "true" : undefined}
                    aria-expanded={item.menu ? menu === item.menu : undefined}
                    aria-controls={item.menu ? `mega-${item.menu}` : undefined}
                    className={cn(
                      "relative flex items-center gap-1 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors",
                      isActive || (item.menu && menu === item.menu) ? "bg-white/[0.08] text-fg" : "text-muted hover:text-fg"
                    )}
                  >
                    {item.label}
                    {item.menu && (
                      <svg
                        aria-hidden
                        viewBox="0 0 12 12"
                        className={cn("h-2.5 w-2.5 opacity-60 transition-transform", menu === item.menu && "rotate-180 opacity-100")}
                      >
                        <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </a>
                  {item.menu && (
                    <MegaPanel
                      menu={item.menu}
                      id={`mega-${item.menu}`}
                      open={menu === item.menu}
                      onNavigate={() => setMenu(null)}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <ThemeToggle />
            <a
              href={contactHref}
              className="group inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-2 text-[13px] font-semibold text-ink transition-all hover:shadow-[0_0_0_4px_rgba(34,184,207,0.2)]"
            >
              Book a Discovery Call <Arrow />
            </a>
          </div>

          {/* Mobile Theme + Hamburger Trigger */}
          <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
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
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Navigation Overlay (100% Solid Opaque Background) */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        style={{ backgroundColor: "var(--color-ink)" }}
        className={cn(
          "fixed inset-0 z-50 flex flex-col transition-all duration-300 ease-out lg:hidden",
          open
            ? "pointer-events-auto opacity-100 visible"
            : "pointer-events-none opacity-0 invisible"
        )}
      >
        {/* Mobile Header Bar */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.08] px-5 sm:px-8">
          <a href="/" aria-label="NEXMANCER home" onClick={() => setOpen(false)}>
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
              const isActive = currentRoute === item.href || currentRoute.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <div className="flex items-center gap-2">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group flex flex-1 items-center justify-between py-4 text-xl font-semibold tracking-tight transition-colors",
                      isActive ? "text-accent" : "text-fg/90 hover:text-accent"
                    )}
                  >
                    <span className="flex items-center gap-3.5">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full transition-all",
                          isActive ? "bg-accent scale-125 shadow-[0_0_8px_rgba(34,184,207,0.8)]" : "bg-white/20 group-hover:bg-accent"
                        )}
                      />
                      {item.label}
                    </span>
                    <span className="font-mono text-xs text-muted/80">0{i + 1}</span>
                  </a>
                  {item.menu && (
                    <button
                      type="button"
                      aria-label={`Show ${item.label} sub-menu`}
                      aria-expanded={mobileSub === item.menu}
                      onClick={() => setMobileSub(mobileSub === item.menu ? null : item.menu!)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] text-muted transition-colors hover:text-fg"
                    >
                      <svg aria-hidden viewBox="0 0 12 12" className={cn("h-3 w-3 transition-transform", mobileSub === item.menu && "rotate-180")}>
                        <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                  </div>
                  {item.menu && mobileSub === item.menu && (
                    <MobileSubmenu menu={item.menu} onNavigate={() => setOpen(false)} />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Quick Action Footer in Drawer */}
          <div className="mt-auto pt-8 grid gap-3">
            <a
              href={contactHref}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-fg px-5 text-sm font-semibold text-ink transition-transform active:scale-[0.98]"
            >
              Book a Discovery Call <Arrow />
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-graphite text-xs font-medium text-muted hover:text-fg transition-colors"
            >
              Direct Email ({SITE.email}) ↗
            </a>

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
