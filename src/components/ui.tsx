import type { ElementType, ReactNode, CSSProperties } from "react";
import { cn } from "../utils/cn";
import { useInView } from "../lib/hooks";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <Tag ref={ref} className={cn("reveal", inView && "is-in", className)} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(91,140,255,0.8)]" aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={80}>
        <h2 id={id} className="mt-5 text-4xl font-bold uppercase leading-[1.02] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={160}>
          <p className={cn("mt-6 text-base leading-relaxed text-muted sm:text-lg", align === "center" && "mx-auto")}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
}) {
  const base =
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium tracking-tight transition-all duration-300 active:scale-[0.98]";
  const styles = {
    primary:
      "bg-fg text-ink hover:bg-white hover:shadow-[0_0_0_4px_rgba(91,140,255,0.18),0_10px_40px_-10px_rgba(91,140,255,0.6)]",
    secondary: "border border-white/15 bg-white/[0.03] text-fg backdrop-blur hover:border-white/30 hover:bg-white/[0.07]",
    ghost: "text-muted hover:text-fg",
  } as const;
  return (
    <a
      href={href}
      className={cn(base, styles[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("inline-block transition-transform duration-300 group-hover:translate-x-1", className)}>
      →
    </span>
  );
}
export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5", className)}>
      ↗
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="h-7 w-7" aria-hidden>
        <defs>
          <linearGradient id="nx-g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5B8CFF" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="#0E121B" stroke="rgba(255,255,255,0.12)" />
        <path d="M9 23V9l14 14V9" fill="none" stroke="url(#nx-g)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="2.1" fill="#F5F7FA" />
        <circle cx="23" cy="23" r="2.1" fill="#F5F7FA" />
      </svg>
      <span className="text-[15px] font-bold tracking-[0.18em] text-fg">NEXMANCER</span>
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] text-muted transition-colors group-hover:border-white/20 group-hover:text-fg/90">
      {children}
    </span>
  );
}
