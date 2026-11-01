import { useEffect, useState, type CSSProperties } from "react";
import NetworkCanvas from "./NetworkCanvas";
import HeroVisual from "./HeroVisual";
import { Arrow, ArrowUpRight, Button, Container } from "./ui";
import { scheduleMailto } from "../lib/site";
import { ECOSYSTEM_BADGES, HERO_PILLARS, PRODUCTS } from "../data/content";
import { usePrefersReducedMotion } from "../lib/hooks";
import { cn } from "../utils/cn";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % PRODUCTS.length);
    }, 3200);
    return () => window.clearInterval(t);
  }, [paused, reduced]);

  const selectNode = (idx: number) => {
    setPaused(true);
    setActiveIdx(idx);
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      onMouseLeave={() => setPaused(false)}
      className="noise relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16 lg:pt-[72px]"
    >
      <div className="grid-bg grid-fade absolute inset-0 -z-20" aria-hidden />
      <div
        className="absolute -right-40 -top-40 -z-20 h-[640px] w-[640px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,184,207,0.22), rgba(30,127,184,0.08) 45%, transparent 70%)" }}
        aria-hidden
      />
      <NetworkCanvas className="absolute inset-0 -z-10 h-full w-full opacity-55 [mask-image:linear-gradient(to_bottom,#000_45%,transparent)]" />

      <Container className="grid flex-1 items-center gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-8">
        {/* Left Column: Brand Statement + Interactive Pillars + Live Product Dock */}
        <div className="lg:col-span-7">
          <div className="fade-up flex flex-wrap items-center gap-2.5" style={d(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-2 pr-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted backdrop-blur sm:text-[11px]">
              <span className="rounded-full bg-accent/15 px-2 py-0.5 font-semibold text-accent">NX</span>
              Deep-Tech Product Studio &amp; Applied R&amp;D
            </span>
            <a
              href="#products"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-emerald-400 transition-colors hover:border-emerald-400/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />5 Live Platforms
            </a>
          </div>

          <h1
            id="hero-title"
            className="mt-6 font-extrabold leading-[0.9] tracking-[-0.055em] text-fg text-[clamp(2.4rem,11vw,5.8rem)] lg:text-[4.5rem] xl:text-[5.4rem] 2xl:text-[6rem]"
          >
            <span className="line-mask">
              <span style={d(80)}>BUILDING</span>
            </span>
            <span className="line-mask">
              <span className="text-gradient" style={d(200)}>
                WHAT'S NEXT.
              </span>
            </span>
          </h1>

          <p className="fade-up mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={d(340)}>
            <strong className="font-semibold text-fg">NEXMANCER</strong> engineers deterministic AI systems, automated cybersecurity platforms, privacy-first archival tools, and high-resolution climate intelligence for the next generation of digital businesses.
          </p>

          {/* Interactive Pillar Selector */}
          <ul
            className="fade-up mt-5 flex flex-wrap gap-x-3 gap-y-1.5 text-[14.5px] font-medium tracking-tight sm:text-[15.5px]"
            style={d(420)}
            aria-label="Core technology pillars"
          >
            {HERO_PILLARS.map((p, i) => {
              const on = i === activeIdx;
              return (
                <li key={p}>
                  <button
                    type="button"
                    onMouseEnter={() => selectNode(i)}
                    onClick={() => selectNode(i)}
                    className={cn(
                      "cursor-pointer border-b-2 pb-0.5 transition-all duration-300",
                      on ? "border-accent text-fg" : "border-transparent text-muted/60 hover:text-fg/85"
                    )}
                  >
                    {p}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Primary CTAs */}
          <div className="fade-up mt-7 flex flex-wrap gap-3 sm:items-center" style={d(480)}>
            <Button href="#products">
              Explore Live Products <Arrow />
            </Button>
            <Button href={scheduleMailto("Hero Discovery Call")} variant="secondary">
              Book Discovery Call <ArrowUpRight />
            </Button>
          </div>

          {/* Interactive Live Product Quick-Launch Strip */}
          <div className="fade-up mt-8 border-t border-white/[0.08] pt-5" style={d(560)}>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
                Live Product Fleet — Hover to inspect · Click to launch
              </span>
              <span className="hidden font-mono text-[10px] text-accent sm:inline">
                0{activeIdx + 1} / 0{PRODUCTS.length}
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {PRODUCTS.map((p, i) => {
                const on = i === activeIdx;
                return (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => selectNode(i)}
                    onFocus={() => selectNode(i)}
                    className={cn(
                      "group inline-flex items-center gap-2 rounded-xl border px-3 py-1.5 text-xs transition-all duration-300",
                      on
                        ? "border-accent/50 bg-accent/15 text-fg shadow-[0_0_20px_-4px_rgba(34,184,207,0.35)]"
                        : "border-white/10 bg-graphite/50 text-muted hover:border-white/25 hover:text-fg"
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full transition-colors", on ? "bg-accent" : "bg-white/25 group-hover:bg-accent")} />
                    <span className="font-semibold tracking-tight">{p.name}</span>
                    <span className="hidden font-mono text-[10px] text-muted/80 sm:inline">{p.code}</span>
                    <span className="text-[11px] text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                      ↗
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Product Constellation + Telemetry HUD */}
        <div className="fade-up lg:col-span-5" style={d(260)}>
          <HeroVisual activeIdx={activeIdx} onSelect={selectNode} />
        </div>
      </Container>

      {/* Bottom Ecosystem Bar */}
      <div className="relative border-t border-white/[0.07] bg-graphite/70 backdrop-blur-md">
        <Container className="flex flex-col gap-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent">Production Stack:</span>
            <div className="flex flex-wrap items-center gap-2">
              {ECOSYSTEM_BADGES.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10.5px] text-fg/80"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <a href="#technology" className="group hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted hover:text-fg sm:flex">
            Scroll
            <span className="inline-block transition-transform group-hover:translate-y-0.5" aria-hidden>
              ↓
            </span>
          </a>
        </Container>
      </div>
    </section>
  );
}
