import { useEffect, useRef } from "react";
import { HERO_METHODS } from "../data/content";
import { usePrefersReducedMotion } from "../lib/hooks";

/**
 * Hero "method dial".
 *
 * Story: scattered problem signals drift into the NEXMANCER core, a dial swings to
 * the method that fits, and clean signal shoots out through that method's arc.
 * The card below shows the active problem → outcome. Data: HERO_METHODS.
 */

const W = 540;
const H = 412;
const CX = W / 2;
const CY = 200;
const RING = 136; // method dial radius
const LABEL_R = 184; // label pill radius
const SPAN = 31; // half-width of each method arc, degrees (72° slot minus gap)

const rad = (deg: number) => (deg * Math.PI) / 180;
const polar = (r: number, deg: number): [number, number] => [CX + r * Math.cos(rad(deg)), CY + r * Math.sin(rad(deg))];
const pt = (r: number, deg: number) => polar(r, deg).map((v) => v.toFixed(2)).join(",");
const arc = (r: number, a0: number, a1: number) => `M${pt(r, a0)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${pt(r, a1)}`;
const sector = (r0: number, r1: number, a0: number, a1: number) =>
  `M${pt(r0, a0)} L${pt(r1, a0)} A${r1} ${r1} 0 0 1 ${pt(r1, a1)} L${pt(r0, a1)} A${r0} ${r0} 0 0 0 ${pt(r0, a0)}Z`;
const hex = (r: number) => Array.from({ length: 6 }, (_, i) => pt(r, -90 + i * 60)).join(" ");

const nodes = HERO_METHODS.map((m, i) => {
  const angle = -90 + i * (360 / HERO_METHODS.length);
  const [lx, ly] = polar(LABEL_R, angle);
  const label = m.name.toUpperCase();
  return { ...m, i, angle, lx, ly, label, w: Math.max(120, label.length * 7.9 + 40) };
});

/* Inbound "problem" streams: curved paths from the edge into the core, between the labels. */
const STREAMS = [-54, -40, 18, 32, 90, 104, 162, 176, 234, 248].map((a, i) => {
  const bend = i % 2 ? -24 : 24;
  return {
    d: `M${pt(212, a)} Q${pt(150, a + bend)} ${pt(58, a + bend * 0.4)}`,
    dur: 3.6 + (i % 4) * 0.55,
    begin: (i * 0.47) % 3.2,
  };
});

export default function HeroVisual({
  activeIdx,
  onSelect,
  cycleMs = 6500,
  playing = true,
}: {
  activeIdx: number;
  onSelect: (idx: number) => void;
  /** Autoplay interval used by the parent; drives the card's progress bar. */
  cycleMs?: number;
  /** Whether the parent is auto-advancing; the progress bar only runs when true. */
  playing?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const active = nodes[activeIdx] ?? nodes[0];
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLElement>(null);

  // Dial always turns clockwise, so keep a cumulative angle (idempotent under StrictMode).
  const turn = useRef<number | null>(null);
  if (turn.current === null) turn.current = active.angle;
  else turn.current += (((active.angle - turn.current) % 360) + 360) % 360;
  const dialDeg = turn.current;

  // Pause SMIL + CSS animations while the hero is off-screen.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      const on = e.isIntersecting;
      el.toggleAttribute("data-paused", !on);
      const svg = svgRef.current;
      if (svg) (on ? svg.unpauseAnimations() : svg.pauseAnimations());
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure ref={wrapRef} className="nx-dial relative mx-auto flex w-full max-w-[380px] flex-col items-center sm:max-w-[460px] lg:max-w-[520px]">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full overflow-visible"
        role="group"
        aria-label="How NEXMANCER works: problems come in, we choose the method that fits, outcomes come out. Choose a method."
      >
        <defs>
          <radialGradient id="nxd-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.30" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="nxd-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-cyan)" />
            <stop offset="1" stopColor="var(--color-violet)" />
          </linearGradient>
          <linearGradient id="nxd-beam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0" />
            <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.22" />
          </linearGradient>
          <filter id="nxd-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer precision ticks */}
        <g aria-hidden>
          {Array.from({ length: 72 }).map((_, i) => {
            const a = i * 5;
            const long = i % 6 === 0;
            const [x1, y1] = polar(152, a);
            const [x2, y2] = polar(long ? 161 : 157, a);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1"
                stroke={`color-mix(in srgb, var(--color-white) ${long ? 18 : 9}%, transparent)`} />
            );
          })}
        </g>

        {/* Problem streams drifting into the core */}
        <g aria-hidden>
          {STREAMS.map((s, i) => (
            <path key={`s${i}`} d={s.d} fill="none" strokeWidth="1"
              stroke="color-mix(in srgb, var(--color-white) 7%, transparent)" strokeDasharray="1 6" />
          ))}
          {!reduced &&
            STREAMS.map((s, i) => (
              <circle key={`p${i}`} r={i % 3 ? 1.8 : 2.4} fill="var(--color-muted)" opacity="0">
                <animateMotion dur={`${s.dur}s`} begin={`${s.begin}s`} repeatCount="indefinite" path={s.d}
                  calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.5 0 0.9 0.6" />
                <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.2;0.8;1"
                  dur={`${s.dur}s`} begin={`${s.begin}s`} repeatCount="indefinite" />
              </circle>
            ))}
        </g>

        {/* Method dial: one arc per method */}
        {nodes.map((n) => {
          const on = n.i === activeIdx;
          return (
            <path key={`arc-${n.code}`} d={arc(RING, n.angle - SPAN, n.angle + SPAN)} fill="none" strokeLinecap="round"
              strokeWidth={on ? 10 : 8}
              stroke={on ? "url(#nxd-grad)" : "color-mix(in srgb, var(--color-white) 10%, transparent)"}
              filter={on ? "url(#nxd-glow)" : undefined}
              style={{ transition: "stroke-width .4s" }} aria-hidden />
          );
        })}
        {/* Burst + scanning dashes on the active arc (re-keyed so they replay on change) */}
        <g aria-hidden key={`fx-${activeIdx}`}>
          {!reduced && (
            <path className="nx-burst" d={arc(RING, active.angle - SPAN, active.angle + SPAN)} fill="none"
              stroke="var(--color-cyan)" strokeLinecap="round" />
          )}
          <path className={reduced ? undefined : "flow-dash"} d={arc(RING + 14, active.angle - SPAN, active.angle + SPAN)}
            fill="none" stroke="var(--color-accent)" strokeOpacity="0.55" strokeWidth="1.2" />
        </g>

        {/* Rotating selector: beam + needle, turns clockwise to the chosen method */}
        <g aria-hidden style={{
          transform: `rotate(${dialDeg}deg)`, transformOrigin: `${CX}px ${CY}px`, transformBox: "view-box",
          transition: reduced ? "none" : "transform 1s cubic-bezier(.34,1.35,.45,1)",
        }}>
          <path d={sector(60, RING - 9, -SPAN + 4, SPAN - 4)} fill="url(#nxd-beam)" />
          <line x1={CX + 60} y1={CY} x2={CX + RING - 14} y2={CY} stroke="url(#nxd-grad)" strokeWidth="2" strokeLinecap="round" />
          <path d={`M${CX + RING - 20} ${CY - 5} L${CX + RING - 12} ${CY} L${CX + RING - 20} ${CY + 5}`} fill="none"
            stroke="var(--color-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Outcome signal shooting out along the active method */}
        {!reduced && (
          <g aria-hidden key={`out-${activeIdx}`} transform={`rotate(${active.angle} ${CX} ${CY})`}>
            {[0, 1, 2].map((k) => (
              <circle key={k} className="nx-shoot" cx={CX} cy={CY} r={k === 0 ? 3.2 : 2.4} fill="var(--color-cyan)"
                style={{ animationDelay: `${k * 0.36}s` }} />
            ))}
          </g>
        )}

        {/* Core: hexagon (logo motif) with counter-rotating frames */}
        <g aria-hidden>
          <circle cx={CX} cy={CY} r="112" fill="url(#nxd-core)" />
          <g className={reduced ? undefined : "spin-slow"} style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <polygon points={hex(80)} fill="none" stroke="color-mix(in srgb, var(--color-white) 10%, transparent)" />
          </g>
          <g className={reduced ? undefined : "nx-spin-rev"} style={{ transformOrigin: `${CX}px ${CY}px` }}>
            <polygon points={hex(68)} fill="none" stroke="var(--color-accent)" strokeOpacity="0.45" strokeDasharray="3 7" />
          </g>
          {!reduced && (
            <circle key={`pulse-${activeIdx}`} cx={CX} cy={CY} r="52" fill="none" stroke="var(--color-accent)"
              strokeOpacity=".5" className="pulse-ring" />
          )}
          <polygon points={hex(54)} fill="var(--color-graphite)" stroke="url(#nxd-grad)" strokeWidth="1.6" strokeLinejoin="round" />
          <g transform={`translate(${CX - 16} ${CY - 34})`}>
            <path d="M16 2 30 10v16L16 34 2 26V10Z" fill="none" stroke="var(--color-fg)" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="m12.5 12 7 6-7 6" fill="none" stroke="var(--color-accent)" strokeWidth="2.8" strokeLinecap="round"
              strokeLinejoin="round" className={reduced ? undefined : "nx-breathe"} />
          </g>
          <text x={CX} y={CY + 18} textAnchor="middle" fill="var(--color-fg)" fontSize="10.5" fontWeight="700"
            letterSpacing="2.2" fontFamily="Inter, sans-serif">NEXMANCER</text>
          <text key={`code-${activeIdx}`} className={reduced ? undefined : "nx-swap"} x={CX} y={CY + 32} textAnchor="middle"
            fill="var(--color-accent)" fontSize="9" letterSpacing="1.8" fontFamily="JetBrains Mono, monospace">{active.code}</text>
        </g>

        {/* Method labels (buttons) */}
        {nodes.map((n) => {
          const on = n.i === activeIdx;
          return (
            <g key={`n-${n.code}`} role="button" tabIndex={0} aria-pressed={on}
              aria-label={`${n.name}: ${n.category}`}
              onMouseEnter={() => onSelect(n.i)} onFocus={() => onSelect(n.i)} onClick={() => onSelect(n.i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelect(n.i); }
                if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); onSelect((n.i + 1) % nodes.length); }
                if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); onSelect((n.i + nodes.length - 1) % nodes.length); }
              }}
              className="cursor-pointer outline-none [&:focus-visible>rect:first-child]:stroke-[var(--color-cyan)]">
              <rect x={n.lx - n.w / 2} y={n.ly - 17} width={n.w} height="34" rx="17"
                fill={on ? "var(--color-graphite)" : "var(--color-ink)"}
                stroke={on ? "var(--color-accent)" : "color-mix(in srgb, var(--color-white) 15%, transparent)"}
                strokeWidth={on ? 1.4 : 1} style={{ transition: "stroke .35s, fill .35s" }} />
              <circle cx={n.lx - n.w / 2 + 15} cy={n.ly} r="3.2"
                fill={on ? "var(--color-accent)" : "color-mix(in srgb, var(--color-white) 32%, transparent)"}
                style={{ transition: "fill .35s" }} />
              <text x={n.lx + 6} y={n.ly + 4.2} textAnchor="middle" fontSize="11.6" letterSpacing="1"
                fontWeight={on ? 700 : 500} fontFamily="JetBrains Mono, monospace"
                fill={on ? "var(--color-fg)" : "var(--color-muted)"} style={{ transition: "fill .35s" }}>
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Problem → outcome card for the active method */}
      <figcaption className="relative -mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-graphite/75 p-5 text-left shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md" aria-live="polite">
        <div key={activeIdx} className={reduced ? undefined : "nx-swap"}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--color-accent)]" aria-hidden />
              {active.code} · {active.category}
            </span>
            <span className="rounded-full border border-white/12 px-2.5 py-0.5 font-mono text-[10.5px] text-muted">
              {active.timeline}
            </span>
          </div>

          <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">Problem</p>
          <p className="mt-1 text-[14.5px] italic leading-snug text-fg/80">{active.problem}</p>

          <div className="my-3 flex items-center gap-2 font-mono text-[11px] text-accent">
            <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, var(--color-accent), transparent)" }} aria-hidden />
            solved with {active.name}
            <span aria-hidden>→</span>
          </div>

          <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">Outcome</p>
          <p className="mt-1 text-[15px] font-medium leading-snug text-fg">{active.outcome}</p>
        </div>

        {/* Autoplay progress */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-white/5" aria-hidden>
          <div key={`bar-${activeIdx}-${playing}`} className="h-full origin-left"
            style={{
              background: "linear-gradient(90deg, var(--color-accent), var(--color-violet))",
              animation: playing && !reduced ? `progress ${cycleMs}ms linear forwards` : "none",
              transform: playing && !reduced ? undefined : "scaleX(0)",
            }} />
        </div>
      </figcaption>
    </figure>
  );
}
