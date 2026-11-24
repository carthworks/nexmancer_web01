import { useState } from "react";
import { CASE_STUDIES, ENGAGEMENT_MODELS, PRODUCTS, SOLUTIONS } from "../data/content";
import { scheduleMailto, slugify, type NavMenuKey } from "../lib/site";
import { cn } from "../utils/cn";
import { Arrow, ArrowUpRight } from "./ui";

/**
 * "Inspect" mega-menu: a list on the left, and a live preview on the right that
 * changes as you hover or tab through the list — styled like the site's
 * `$ nx` terminal motif. It lets visitors see what each service, case study or
 * product is before they leave the page, so the homepage no longer has to.
 */

type Link = { label: string; href: string; external?: boolean };

export type MenuEntry = {
  id: string;
  href: string;
  code: string;
  title: string;
  meta: string;
  kicker: string;
  blurb: string;
  facts: string[];
  primary: Link;
  secondary?: Link;
  dot?: string;
};

const clip = (s: string, n = 150) => (s.length > n ? `${s.slice(0, n).replace(/\s+\S*$/, "")}…` : s);

export const MENU_ENTRIES: Record<NavMenuKey, MenuEntry[]> = {
  services: SOLUTIONS.map((s) => ({
    id: s.slug,
    href: `/services/${s.slug}`,
    code: s.code,
    title: s.title,
    meta: s.timeline,
    kicker: `Built for ${s.buyer}`,
    blurb: s.tagline,
    facts: s.outcomes.slice(0, 2),
    primary: { label: "Open service", href: `/services/${s.slug}` },
    secondary: { label: "Scope this track", href: scheduleMailto(s.title) },
  })),
  work: CASE_STUDIES.map((c, i) => ({
    id: c.id,
    href: `/work/${c.id}`,
    code: `CASE/0${i + 1}`,
    title: c.title,
    meta: c.tag,
    kicker: c.clientType,
    blurb: clip(c.summary),
    facts: c.metrics.map((m) => `${m.value} · ${m.label}`),
    primary: { label: "Read case study", href: `/work/${c.id}` },
  })),
  products: PRODUCTS.map((p) => ({
    id: slugify(p.name),
    href: `/products#${slugify(p.name)}`,
    code: p.code,
    title: p.name,
    meta: p.status,
    kicker: p.category,
    blurb: p.tagline,
    facts: p.features.slice(0, 2),
    primary: { label: "View details", href: `/products#${slugify(p.name)}` },
    secondary: { label: "Live demo", href: p.url, external: true },
    dot: p.brandColor,
  })),
};

const FOOTERS: Record<NavMenuKey, { note: string; links: Link[] }> = {
  services: {
    note: `Engage via: ${ENGAGEMENT_MODELS.map((m) => m.badge.split(" · ")[0]).join(" · ")}`,
    links: [
      { label: "Capabilities", href: "/services#technology" },
      { label: "AI × Security research", href: "/services#security" },
      { label: "All services", href: "/services" },
    ],
  },
  work: {
    note: "Problem → architecture → verified outcome",
    links: [
      { label: "Engineering notes", href: "/insights" },
      { label: "All case studies", href: "/work" },
    ],
  },
  products: {
    note: "Platforms we build and run in-house",
    links: [
      { label: "Licensing & on-prem", href: "/contact" },
      { label: "All products", href: "/products" },
    ],
  },
};

function MenuLink({ link, onNavigate, className }: { link: Link; onNavigate: () => void; className?: string }) {
  return (
    <a
      href={link.href}
      onClick={onNavigate}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={className}
    >
      {link.label} {link.external ? <ArrowUpRight /> : <Arrow />}
    </a>
  );
}

/** Desktop panel. Rendered inside the nav <li>; positioned against the <nav>. */
export function MegaPanel({
  menu,
  open,
  id,
  onNavigate,
}: {
  menu: NavMenuKey;
  open: boolean;
  id: string;
  onNavigate: () => void;
}) {
  const entries = MENU_ENTRIES[menu];
  const footer = FOOTERS[menu];
  const [i, setI] = useState(0);
  const cur = entries[Math.min(i, entries.length - 1)];

  return (
    <div
      id={id}
      className={cn(
        "absolute left-1/2 top-full z-50 w-[min(900px,calc(100vw-3rem))] -translate-x-1/2 pt-2 transition-all duration-200",
        open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-1 opacity-0"
      )}
    >
      <div className="overflow-hidden rounded-2xl border border-white/[0.09] bg-ink/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl">
        <div className="grid grid-cols-[1.05fr_1fr]">
          {/* List */}
          <ul className="p-2.5">
            {entries.map((e, idx) => (
              <li key={e.id}>
                <a
                  href={e.href}
                  onClick={onNavigate}
                  onMouseEnter={() => setI(idx)}
                  onFocus={() => setI(idx)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                    idx === i ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
                  )}
                >
                  <span
                    className={cn(
                      "w-[5.6rem] shrink-0 whitespace-nowrap font-mono text-[10.5px] tracking-wider",
                      idx === i ? "text-fg" : "text-muted"
                    )}
                  >
                    {e.dot ? (
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle" style={{ background: e.dot }} />
                    ) : null}
                    {e.code}
                  </span>
                  <span className={cn("min-w-0 flex-1 truncate text-[13.5px] font-medium", idx === i ? "text-fg" : "text-fg/85")}>
                    {e.title}
                  </span>
                  <span className="hidden shrink-0 rounded-full border border-white/[0.08] px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-muted xl:inline">
                    {e.meta}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Live preview */}
          <div className="border-l border-white/[0.07] bg-graphite/60 p-5" aria-live="polite">
            <p className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
              <span className="text-accent">$</span> nx inspect {cur.code.toLowerCase()}
              <span className="ml-0.5 inline-block h-3 w-[6px] animate-pulse bg-accent/80" aria-hidden />
            </p>
            <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-accent">{cur.kicker}</p>
            <p key={cur.id} className="mt-2 text-[15px] font-semibold leading-snug text-fg">
              {cur.blurb}
            </p>
            <ul className="mt-3 space-y-1.5">
              {cur.facts.map((f) => (
                <li key={f} className="flex gap-2 text-[12.5px] leading-relaxed text-muted">
                  <span className="mt-[1px] text-accent" aria-hidden>
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <MenuLink
                link={cur.primary}
                onNavigate={onNavigate}
                className="inline-flex items-center gap-1.5 rounded-full bg-fg px-3.5 py-1.5 text-[12px] font-semibold text-ink transition-shadow hover:shadow-[0_0_0_4px_rgba(34,184,207,0.2)]"
              />
              {cur.secondary && (
                <MenuLink
                  link={cur.secondary}
                  onNavigate={onNavigate}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] px-3.5 py-1.5 text-[12px] font-medium text-fg/90 transition-colors hover:border-accent/50 hover:text-fg"
                />
              )}
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] bg-white/[0.02] px-5 py-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">{footer.note}</p>
          <div className="flex flex-wrap items-center gap-4">
            {footer.links.map((l) => (
              <MenuLink
                key={l.href}
                link={l}
                onNavigate={onNavigate}
                className="inline-flex items-center gap-1 text-[12px] font-medium text-accent transition-colors hover:text-fg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Mobile: compact sub-list shown under a top-level item in the drawer. */
export function MobileSubmenu({ menu, onNavigate }: { menu: NavMenuKey; onNavigate: () => void }) {
  const entries = MENU_ENTRIES[menu];
  const footer = FOOTERS[menu];
  return (
    <div className="pb-4 pl-[1.4rem]">
      <ul className="space-y-0.5 border-l border-white/[0.08] pl-3">
        {entries.map((e) => (
          <li key={e.id}>
            <a href={e.href} onClick={onNavigate} className="flex items-baseline gap-2.5 rounded-lg py-2 pr-2 text-[15px] text-fg/85 hover:text-accent">
              <span className="w-16 shrink-0 font-mono text-[10px] text-accent/90">{e.code}</span>
              <span className="leading-snug">{e.title}</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 pl-3">
        {footer.links.map((l) => (
          <a key={l.href} href={l.href} onClick={onNavigate} className="font-mono text-[11px] text-accent hover:text-fg">
            {l.label} →
          </a>
        ))}
      </div>
    </div>
  );
}
