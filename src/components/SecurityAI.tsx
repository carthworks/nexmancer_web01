import { Container, Eyebrow, Reveal } from "./ui";
import { SECURITY_OPS, SECURITY_SURFACES } from "../data/content";
import { useCycle, usePrefersReducedMotion } from "../lib/hooks";
import { cn } from "../utils/cn";

const W = 780;
const H = 440;
const CORE = { x: W / 2, y: H / 2 };
const ys = [60, 140, 220, 300, 380];
const LX = 110; // surfaces column centre
const RX = W - 110; // ops column centre
const PILL_W = 170;

function DesktopDiagram({ activeOp }: { activeOp: number }) {
  const reduced = usePrefersReducedMotion();
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="secai-diagram-title">
      <title id="secai-diagram-title">
        NEXMANCER AI connects Application, Identity, Data, Cloud and Infrastructure to Detection, Analysis, Automation, Validation and Response.
      </title>
      <defs>
        <radialGradient id="sa-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(139,92,246,0.32)" />
          <stop offset="100%" stopColor="rgba(139,92,246,0)" />
        </radialGradient>
        <linearGradient id="sa-l" x1="0" x2="1">
          <stop offset="0" stopColor="#22D3EE" stopOpacity=".7" />
          <stop offset="1" stopColor="#5B8CFF" />
        </linearGradient>
        <linearGradient id="sa-r" x1="0" x2="1">
          <stop offset="0" stopColor="#5B8CFF" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity=".8" />
        </linearGradient>
      </defs>

      {/* column labels */}
      <text x={LX} y="18" textAnchor="middle" fill="#9CA3AF" fontSize="10.5" letterSpacing="2.4" fontFamily="JetBrains Mono, monospace">
        SURFACES
      </text>
      <text x={RX} y="18" textAnchor="middle" fill="#9CA3AF" fontSize="10.5" letterSpacing="2.4" fontFamily="JetBrains Mono, monospace">
        OPERATIONS
      </text>

      {/* left links */}
      {ys.map((y, i) => {
        const d = `M${LX + PILL_W / 2},${y} C${LX + PILL_W / 2 + 90},${y} ${CORE.x - 150},${CORE.y} ${CORE.x - 70},${CORE.y}`;
        return (
          <g key={`l${i}`}>
            <path d={d} fill="none" stroke="rgba(255,255,255,0.07)" />
            <path d={d} fill="none" stroke="url(#sa-l)" strokeWidth="1.2" className="flow-dash" opacity=".55" />
            {!reduced && (
              <circle r="2.4" fill="#22D3EE">
                <animateMotion dur={`${2.2 + i * 0.25}s`} repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        );
      })}

      {/* right links */}
      {ys.map((y, i) => {
        const on = i === activeOp;
        const d = `M${CORE.x + 70},${CORE.y} C${CORE.x + 150},${CORE.y} ${RX - PILL_W / 2 - 90},${y} ${RX - PILL_W / 2},${y}`;
        return (
          <g key={`r${i}`}>
            <path d={d} fill="none" stroke={on ? "rgba(139,92,246,0.45)" : "rgba(255,255,255,0.07)"} style={{ transition: "stroke .5s" }} />
            <path d={d} fill="none" stroke="url(#sa-r)" strokeWidth="1.2" className="flow-dash" opacity={on ? 1 : 0.3} style={{ transition: "opacity .5s" }} />
            {!reduced && on && (
              <circle r="3" fill="#F5F7FA">
                <animateMotion dur="1.4s" repeatCount="indefinite" path={d} />
              </circle>
            )}
          </g>
        );
      })}

      {/* core */}
      <circle cx={CORE.x} cy={CORE.y} r="130" fill="url(#sa-core)" />
      <circle cx={CORE.x} cy={CORE.y} r="92" fill="none" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 6" />
      <circle cx={CORE.x} cy={CORE.y} r="70" fill="none" stroke="#8B5CF6" strokeOpacity=".45" className="pulse-ring" />
      <circle cx={CORE.x} cy={CORE.y} r="70" fill="#0E121B" stroke="url(#sa-r)" strokeWidth="1.5" />
      <text x={CORE.x} y={CORE.y - 4} textAnchor="middle" fill="#F5F7FA" fontSize="14" fontWeight="700" letterSpacing="2.4" fontFamily="Inter, sans-serif">
        NEXMANCER
      </text>
      <text x={CORE.x} y={CORE.y + 18} textAnchor="middle" fill="#8B5CF6" fontSize="13" letterSpacing="4" fontFamily="JetBrains Mono, monospace">
        AI
      </text>

      {/* surfaces */}
      {SECURITY_SURFACES.map((s, i) => (
        <g key={s}>
          <rect x={LX - PILL_W / 2} y={ys[i] - 17} width={PILL_W} height="34" rx="8" fill="#07090E" stroke="rgba(255,255,255,0.14)" />
          <circle cx={LX - PILL_W / 2 + 16} cy={ys[i]} r="3" fill="#22D3EE" />
          <text x={LX + 8} y={ys[i] + 4.5} textAnchor="middle" fill="#F5F7FA" fontSize="12" letterSpacing="1.6" fontFamily="JetBrains Mono, monospace">
            {s.toUpperCase()}
          </text>
        </g>
      ))}

      {/* ops */}
      {SECURITY_OPS.map((s, i) => {
        const on = i === activeOp;
        return (
          <g key={s}>
            <rect
              x={RX - PILL_W / 2}
              y={ys[i] - 17}
              width={PILL_W}
              height="34"
              rx="8"
              fill={on ? "#141A26" : "#07090E"}
              stroke={on ? "#8B5CF6" : "rgba(255,255,255,0.14)"}
              style={{ transition: "stroke .5s, fill .5s" }}
            />
            <text x={RX - PILL_W / 2 + 16} y={ys[i] + 4} fill={on ? "#8B5CF6" : "#9CA3AF"} fontSize="10" fontFamily="JetBrains Mono, monospace">
              0{i + 1}
            </text>
            <text
              x={RX + 10}
              y={ys[i] + 4.5}
              textAnchor="middle"
              fill={on ? "#F5F7FA" : "#9CA3AF"}
              fontSize="12"
              letterSpacing="1.6"
              fontFamily="JetBrains Mono, monospace"
              style={{ transition: "fill .5s" }}
            >
              {s.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function MobileDiagram({ activeOp }: { activeOp: number }) {
  return (
    <div className="space-y-4" aria-hidden>
      <div>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">Surfaces</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SECURITY_SURFACES.map((s) => (
            <li key={s} className="flex items-center gap-2 rounded-md border border-white/[0.14] bg-ink px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-fg">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              {s}
            </li>
          ))}
        </ul>
      </div>
      <div className="mx-auto h-10 w-px overflow-hidden bg-white/10">
        <span className="block h-4 w-px animate-[drop_1.6s_linear_infinite] bg-gradient-to-b from-transparent to-cyan" />
      </div>
      <div className="relative mx-auto flex w-48 flex-col items-center rounded-2xl border border-violet/40 bg-graphite px-6 py-5 shadow-[0_0_60px_-10px_rgba(139,92,246,0.35)]">
        <span className="text-sm font-bold tracking-[0.2em] text-fg">NEXMANCER</span>
        <span className="mt-1 font-mono text-xs tracking-[0.3em] text-violet">AI</span>
      </div>
      <div className="mx-auto h-10 w-px overflow-hidden bg-white/10">
        <span className="block h-4 w-px animate-[drop_1.6s_linear_infinite] bg-gradient-to-b from-transparent to-violet" />
      </div>
      <div>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted">Operations</p>
        <ol className="mt-3 grid gap-2">
          {SECURITY_OPS.map((s, i) => (
            <li
              key={s}
              className={cn(
                "flex items-center gap-3 rounded-md border px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-500",
                i === activeOp ? "border-violet/60 bg-graphite text-fg" : "border-white/[0.1] bg-ink text-muted"
              )}
            >
              <span className={i === activeOp ? "text-violet" : "text-muted/60"}>0{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function SecurityAI() {
  const activeOp = useCycle(SECURITY_OPS.length, 1800);

  return (
    <section id="security" aria-labelledby="security-title" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-[700px] w-[min(1000px,100%)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(ellipse, rgba(139,92,246,0.12), transparent 65%)" }}
        aria-hidden
      />
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>AI × Cybersecurity</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="security-title" className="mt-5 text-4xl font-bold uppercase leading-[1.02] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">
                Intelligence
                <br />
                meets <span className="text-gradient">security.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-6">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              As digital systems become more intelligent, security must evolve with them. NEXMANCER explores AI-driven approaches to security
              automation, application protection, threat analysis and intelligent security operations.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-graphite/40 p-5 sm:p-8">
            <div className="grid-bg absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,#000,transparent_75%)]" aria-hidden />
            <div className="relative hidden md:block">
              <DesktopDiagram activeOp={activeOp} />
            </div>
            <div className="relative md:hidden">
              <MobileDiagram activeOp={activeOp} />
            </div>
            <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
              <span>
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-violet" />
                Conceptual architecture · research direction
              </span>
              <span aria-live="off">
                active: <span className="text-fg">{SECURITY_OPS[activeOp]}</span>
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
