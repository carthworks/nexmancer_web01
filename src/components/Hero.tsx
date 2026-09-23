import type { CSSProperties } from "react";
import NetworkCanvas from "./NetworkCanvas";
import HeroVisual from "./HeroVisual";
import { Arrow, ArrowUpRight, Button, Container } from "./ui";
import { IconGithub } from "./icons";
import { SITE, scheduleMailto } from "../lib/site";
import { DOMAINS, HERO_PILLARS, ECOSYSTEM_BADGES } from "../data/content";
import { useCycle } from "../lib/hooks";
import { cn } from "../utils/cn";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function Hero() {
  // Pillars follow DOMAINS order: software, ai, security, data, cloud
  const idx = useCycle(HERO_PILLARS.length, 2000);
  const activeKey = DOMAINS[idx].key;

  return (
    <section id="top" aria-labelledby="hero-title" className="noise relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-16 lg:pt-[72px]">
      <div className="grid-bg grid-fade absolute inset-0 -z-20" aria-hidden />
      <div
        className="absolute -right-40 -top-40 -z-20 h-[640px] w-[640px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(91,140,255,0.2), rgba(139,92,246,0.08) 45%, transparent 70%)" }}
        aria-hidden
      />
      <NetworkCanvas className="absolute inset-0 -z-10 h-full w-full opacity-50 [mask-image:linear-gradient(to_bottom,#000_40%,transparent)]" />

      <Container className="grid flex-1 items-center gap-14 py-14 sm:py-20 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p
            className="fade-up inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-1.5 pr-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted backdrop-blur sm:text-[11px]"
            style={d(0)}
          >
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-accent">NX</span>
            NEXMANCER / Technology Company
          </p>

          <h1
            id="hero-title"
            className="mt-7 font-extrabold leading-[0.9] tracking-[-0.055em] text-fg text-[clamp(2.25rem,12vw,6rem)] lg:text-[4.6rem] xl:text-[5.6rem] 2xl:text-[6.25rem]"
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

          <p className="fade-up mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={d(380)}>
            <strong className="font-semibold text-fg">NEXMANCER</strong> builds intelligent software, AI systems, cybersecurity technologies and digital
            platforms for the next generation of digital businesses.
          </p>

          <ul className="fade-up mt-6 flex flex-wrap gap-x-3 gap-y-1 text-[15px] font-medium tracking-tight sm:text-base" style={d(460)} aria-label="Focus areas">
            {HERO_PILLARS.map((p, i) => (
              <li key={p} className={cn("transition-colors duration-500", i === idx ? "text-fg" : "text-muted/60")}>
                {p}
              </li>
            ))}
          </ul>

          <div className="fade-up mt-9 flex flex-wrap gap-3 sm:items-center" style={d(540)}>
            <Button href="#technology">
              Explore Technology <Arrow />
            </Button>
            <Button href={scheduleMailto("Hero CTA")} variant="secondary">
              Book a Call <ArrowUpRight />
            </Button>
            <Button href={SITE.github} variant="secondary" external>
              <IconGithub className="h-4 w-4" /> GitHub <ArrowUpRight />
            </Button>
          </div>
        </div>

        <div className="fade-up lg:col-span-5" style={d(300)}>
          <HeroVisual active={activeKey} />
        </div>
      </Container>

      {/* Ecosystem strip replacing duplicate marquee */}
      <div className="relative border-t border-white/[0.07] bg-black/40 backdrop-blur-md">
        <Container className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-accent">Tech Stack:</span>
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
