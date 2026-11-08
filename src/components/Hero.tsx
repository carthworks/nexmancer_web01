import { useEffect, useState, type CSSProperties } from "react";
import { HERO_BUYER_BADGES, HERO_METHODS } from "../data/content";
import { usePrefersReducedMotion } from "../lib/hooks";
import { SITE, scheduleMailto } from "../lib/site";
import HeroVisual from "./HeroVisual";
import NetworkCanvas from "./NetworkCanvas";
import { Arrow, ArrowUpRight, Button, Container } from "./ui";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const CYCLE_MS = 6500; // long enough to read one problem → outcome
const HEADLINE_DISPLAY_MS = 6500;
const HEADLINE_TRANSITION_MS = 680;

// export const HERO_ROTATING_PHRASES = [
//   "intelligent technology.",
//   "AI-powered solutions.",
//   "business innovation.",
//   "secure digital platforms.",
//   "scalable software.",
//   "measurable outcomes.",
// ] as const;
export const HERO_ROTATING_PHRASES = [
  "intelligent technology.",
  "AI-powered solutions.",
  "custom software.",
  "secure digital platforms.",
  "data-driven automation.",
  "scalable cloud systems.",
] as const;

export default function Hero() {
  const [activeIdx, setActiveIdx] = useState(1);
  const [paused, setPaused] = useState(false);
  const [phraseState, setPhraseState] = useState<{ current: number; exiting: number | null }>({
    current: 0,
    exiting: null,
  });
  const [tabHidden, setTabHidden] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onVisibilityChange = () => {
      setTabHidden(document.visibilityState === "hidden");
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (reduced || tabHidden) return;
    let clearExitTimeout: number | undefined;

    const intervalId = window.setInterval(() => {
      setPhraseState((prev) => {
        const next = (prev.current + 1) % HERO_ROTATING_PHRASES.length;
        return { current: next, exiting: prev.current };
      });
      window.clearTimeout(clearExitTimeout);
      clearExitTimeout = window.setTimeout(() => {
        setPhraseState((prev) => ({ ...prev, exiting: null }));
      }, HEADLINE_TRANSITION_MS);
    }, HEADLINE_DISPLAY_MS);

    return () => {
      window.clearInterval(intervalId);
      window.clearTimeout(clearExitTimeout);
    };
  }, [reduced, tabHidden]);

  useEffect(() => {
    if (paused || reduced || tabHidden) return;
    const t = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % HERO_METHODS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(t);
  }, [paused, reduced, tabHidden]);

  const selectNode = (idx: number) => {
    setPaused(true);
    setActiveIdx(idx);
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      onMouseLeave={() => setPaused(false)}
      className="noise relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pt-16 lg:pt-[72px]"
    >
      <div className="grid-bg grid-fade absolute inset-0 -z-20" aria-hidden />
      <div
        className="absolute -right-40 -top-40 -z-20 h-[640px] w-[640px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(34,184,207,0.22), rgba(30,127,184,0.08) 45%, transparent 70%)" }}
        aria-hidden
      />
      <NetworkCanvas className="absolute inset-0 -z-10 h-full w-full opacity-45 [mask-image:linear-gradient(to_bottom,#000_45%,transparent)]" />

      <Container className="my-auto grid items-center gap-8 py-8 sm:py-10 lg:grid-cols-12 lg:gap-10">
        {/* Left Column: Eyebrow, Headline, Supporting Copy, CTAs & Pillars Line */}
        <div className="lg:col-span-7">
          {/* Eyebrow */}
          <div className="fade-up" style={d(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] py-1.5 pl-3 pr-4 font-mono text-xs font-medium tracking-wide text-fg/90 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(34,184,207,0.8)]" aria-hidden />
              Your Technology &amp; AI Engineering Partner
            </span>
          </div>

          {/* H1 */}
          <h1
            id="hero-title"
            className="mt-5 max-w-2xl font-extrabold leading-[1.08] tracking-[-0.035em] text-fg text-[clamp(2rem,3.6vw,3.25rem)] min-h-[3.35em]"
          >
            <span className="line-mask">
              <span style={d(80)}>We help businesses</span>
            </span>
            <span className="line-mask">
              <span style={d(150)}>achieve more with</span>
            </span>
            <span className="fade-up block pt-0.5" style={d(210)}>
              <span className="hero-rotator" aria-live="polite" aria-atomic="true">
                {HERO_ROTATING_PHRASES.map((phrase, idx) => {
                  const isActive = idx === phraseState.current;
                  const isExiting = idx === phraseState.exiting;
                  const stateClass = isActive
                    ? "hero-phrase--active"
                    : isExiting
                      ? "hero-phrase--exit"
                      : "hero-phrase--idle";
                  return (
                    <span
                      key={phrase}
                      aria-hidden={!isActive}
                      className={`hero-phrase text-gradient ${stateClass}`}
                    >
                      {phrase}
                    </span>
                  );
                })}
              </span>
            </span>
          </h1>

          {/* Single concise buyer + outcome sentence */}
          <p className="fade-up mt-4 max-w-xl text-base font-medium leading-relaxed text-fg/90 sm:text-lg" style={d(260)}>
            We work with Indian SMEs, startups, universities and regulated enterprises to automate operations, put AI to work on their own data, and fix real security risks.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="fade-up mt-6 flex flex-wrap items-center gap-3" style={d(340)}>
            <Button href={scheduleMailto("Discovery Call")}>
              Book a Discovery Call {SITE.schedulerUrl ? <ArrowUpRight /> : <Arrow />}
            </Button>
            <Button href="#problems" variant="secondary">
              See problems we solve <Arrow />
            </Button>
          </div>

          {/* Concrete, checkable trust promises */}
          <p className="fade-up mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-muted" style={d(410)}>
            <span className="inline-flex items-center gap-1.5 text-fg/90">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              2-week discovery sprints
            </span>
            <span aria-hidden className="text-white/25">·</span>
            <span>NDA on request</span>
            <span aria-hidden className="text-white/25">·</span>
            <span>Reply within 1 business day</span>
          </p>
        </div>

        {/* Right Column: Interactive Problem -> Outcome Showcase Card */}
        <div className="fade-up lg:col-span-5" style={d(220)}>
          <HeroVisual activeIdx={activeIdx} onSelect={selectNode} cycleMs={CYCLE_MS} playing={!paused && !reduced} />
        </div>
      </Container>

      {/* Bottom Buyer & Governance Strip */}
      <div className="relative border-t border-white/[0.08] bg-graphite/75 backdrop-blur-md">
        <Container className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5">
            <span className="font-mono text-xs font-medium text-accent">Built For:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              {HERO_BUYER_BADGES.map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] text-fg/90"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <a href="#problems" className="group hidden items-center gap-2 font-mono text-xs text-muted hover:text-fg sm:flex">
            See problems we solve
            <span className="inline-block transition-transform group-hover:translate-y-0.5" aria-hidden>
              ↓
            </span>
          </a>
        </Container>
      </div>
    </section>
  );
}
