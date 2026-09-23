import { HERO_NODES, type DomainKey } from "../data/content";
import { usePrefersReducedMotion } from "../lib/hooks";
import { cn } from "../utils/cn";

const S = 520;
const C = S / 2;
const R = 188;

const nodes = HERO_NODES.map((n, i) => {
  const a = ((-90 + i * 72) * Math.PI) / 180;
  return { ...n, x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
});

export default function HeroVisual({ active }: { active: DomainKey }) {
  const reduced = usePrefersReducedMotion();

  return (
    <figure className="relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[500px]">
      <svg
        viewBox={`0 0 ${S} ${S}`}
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="NEXMANCER at the centre of a network connecting AI, Data, Software, Security and Cloud."
      >
        <defs>
          <radialGradient id="hv-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(91,140,255,0.28)" />
            <stop offset="100%" stopColor="rgba(91,140,255,0)" />
          </radialGradient>
          <linearGradient id="hv-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5B8CFF" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* rings */}
        <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.07)" />
        <circle cx={C} cy={C} r={R + 36} fill="none" stroke="rgba(255,255,255,0.04)" />
        <g className="spin-slow" style={{ transformOrigin: `${C}px ${C}px` }}>
          <circle cx={C} cy={C} r={R - 70} fill="none" stroke="rgba(91,140,255,0.28)" strokeDasharray="2 10" />
        </g>
        {/* ticks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * 6 * Math.PI) / 180;
          const r1 = R + 30;
          const r2 = R + (i % 5 === 0 ? 42 : 36);
          return (
            <line
              key={i}
              x1={C + r1 * Math.cos(a)}
              y1={C + r1 * Math.sin(a)}
              x2={C + r2 * Math.cos(a)}
              y2={C + r2 * Math.sin(a)}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* polygon between nodes */}
        <polygon points={nodes.map((n) => `${n.x},${n.y}`).join(" ")} fill="none" stroke="rgba(255,255,255,0.05)" />

        {/* spokes */}
        {nodes.map((n, i) => {
          const on = n.key === active;
          const d = `M${C},${C} L${n.x},${n.y}`;
          return (
            <g key={n.key}>
              <path d={d} stroke={on ? "rgba(91,140,255,0.5)" : "rgba(255,255,255,0.08)"} strokeWidth="1" style={{ transition: "stroke .6s" }} />
              <path d={d} stroke="url(#hv-stroke)" strokeWidth="1.3" className="flow-dash" opacity={on ? 0.95 : 0.25} style={{ transition: "opacity .6s" }} />
              {!reduced && (
                <circle r={on ? 3.2 : 2} fill="#F5F7FA" opacity={on ? 1 : 0.5}>
                  <animateMotion dur={`${2.6 + i * 0.3}s`} repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          );
        })}

        {/* core */}
        <circle cx={C} cy={C} r="120" fill="url(#hv-core)" />
        <circle cx={C} cy={C} r="64" fill="none" stroke="#5B8CFF" strokeOpacity=".45" className="pulse-ring" />
        <circle cx={C} cy={C} r="64" fill="#0E121B" stroke="url(#hv-stroke)" strokeWidth="1.5" />
        <g transform={`translate(${C - 13} ${C - 32})`}>
          <path d="M3 23V3l20 20V3" fill="none" stroke="url(#hv-stroke)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="3" cy="3" r="2.4" fill="#F5F7FA" />
          <circle cx="23" cy="23" r="2.4" fill="#F5F7FA" />
        </g>
        <text x={C} y={C + 20} textAnchor="middle" fill="#F5F7FA" fontSize="12.5" fontWeight="700" letterSpacing="2.6" fontFamily="Inter, sans-serif">
          NEXMANCER
        </text>

        {/* nodes */}
        {nodes.map((n) => {
          const on = n.key === active;
          const w = n.label.length * 9 + 34;
          return (
            <g key={`n-${n.key}`} style={{ transition: "opacity .6s" }}>
              <rect
                x={n.x - w / 2}
                y={n.y - 17}
                width={w}
                height="34"
                rx="17"
                fill="#07090E"
                stroke={on ? "#5B8CFF" : "rgba(255,255,255,0.16)"}
                style={{ transition: "stroke .6s" }}
              />
              <circle cx={n.x - w / 2 + 15} cy={n.y} r="3" fill={on ? "#5B8CFF" : "rgba(255,255,255,0.35)"} style={{ transition: "fill .6s" }} />
              <text
                x={n.x + 7}
                y={n.y + 4.5}
                textAnchor="middle"
                fill={on ? "#F5F7FA" : "#9CA3AF"}
                fontSize="12.5"
                letterSpacing="1.6"
                fontFamily="JetBrains Mono, monospace"
                style={{ transition: "fill .6s" }}
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption className="pointer-events-none absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] text-muted/80">
        <span className={cn("h-1.5 w-1.5 rounded-full bg-accent", !reduced && "animate-pulse")} />
        system / {active}
      </figcaption>
    </figure>
  );
}
