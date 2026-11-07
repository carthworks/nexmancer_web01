import { PRODUCTS } from "../data/content";
import { usePrefersReducedMotion } from "../lib/hooks";

const S = 540;
const C = S / 2;
const R = 192;

const nodes = PRODUCTS.map((p, i) => {
  const a = ((-90 + i * 72) * Math.PI) / 180;
  return { ...p, x: C + R * Math.cos(a), y: C + R * Math.sin(a), idx: i };
});

export default function HeroVisual({
  activeIdx,
  onSelect,
}: {
  activeIdx: number;
  onSelect: (idx: number) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const active = PRODUCTS[activeIdx] || PRODUCTS[0];

  return (
    <figure className="relative mx-auto flex w-full max-w-[360px] flex-col items-center sm:max-w-[440px] lg:max-w-[520px]">
      <svg
        viewBox={`0 0 ${S} ${S}`}
        className="aspect-square h-auto w-full overflow-visible"
        role="img"
        aria-label="Interactive NEXMANCER constellation connecting Sensighty, SigmaSec, LibraDigit, AskMyDocs and Hyperlocal Heat."
      >
        <defs>
          <radialGradient id="hv-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(34,184,207,0.32)" />
            <stop offset="100%" stopColor="rgba(34,184,207,0)" />
          </radialGradient>
          <linearGradient id="hv-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-accent)" />
            <stop offset="1" stopColor="var(--color-violet)" />
          </linearGradient>
        </defs>

        {/* Orbital rings */}
        <circle cx={C} cy={C} r={R} fill="none" stroke="color-mix(in srgb, var(--color-white) 8%, transparent)" />
        <circle cx={C} cy={C} r={R + 34} fill="none" stroke="color-mix(in srgb, var(--color-white) 4%, transparent)" />
        <g className="spin-slow" style={{ transformOrigin: `${C}px ${C}px` }}>
          <circle cx={C} cy={C} r={R - 68} fill="none" stroke="rgba(34,184,207,0.3)" strokeDasharray="2 10" />
        </g>

        {/* Precision compass ticks */}
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * 6 * Math.PI) / 180;
          const r1 = R + 28;
          const r2 = R + (i % 5 === 0 ? 40 : 34);
          return (
            <line
              key={i}
              x1={C + r1 * Math.cos(a)}
              y1={C + r1 * Math.sin(a)}
              x2={C + r2 * Math.cos(a)}
              y2={C + r2 * Math.sin(a)}
              stroke="color-mix(in srgb, var(--color-white) 12%, transparent)"
              strokeWidth="1"
            />
          );
        })}

        {/* Outer pentagon mesh */}
        <polygon
          points={nodes.map((n) => `${n.x},${n.y}`).join(" ")}
          fill="none"
          stroke="color-mix(in srgb, var(--color-white) 6%, transparent)"
        />

        {/* Spokes + animated telemetry packets */}
        {nodes.map((n, i) => {
          const on = i === activeIdx;
          const d = `M${C},${C} L${n.x},${n.y}`;
          return (
            <g key={n.name}>
              <path
                d={d}
                stroke={on ? "rgba(34,184,207,0.55)" : "color-mix(in srgb, var(--color-white) 8%, transparent)"}
                strokeWidth={on ? "1.5" : "1"}
                style={{ transition: "stroke .45s" }}
              />
              <path
                d={d}
                stroke="url(#hv-stroke)"
                strokeWidth="1.4"
                className="flow-dash"
                opacity={on ? 1 : 0.22}
                style={{ transition: "opacity .45s" }}
              />
              {!reduced && (
                <circle r={on ? 3.4 : 2} fill={on ? "var(--color-accent)" : "var(--color-fg)"} opacity={on ? 1 : 0.45}>
                  <animateMotion dur={`${2.4 + i * 0.25}s`} repeatCount="indefinite" path={d} />
                </circle>
              )}
            </g>
          );
        })}

        {/* Center Brand Core */}
        <circle cx={C} cy={C} r="122" fill="url(#hv-core)" />
        <circle cx={C} cy={C} r="64" fill="none" stroke="var(--color-accent)" strokeOpacity=".45" className="pulse-ring" />
        <circle cx={C} cy={C} r="64" fill="var(--color-graphite)" stroke="url(#hv-stroke)" strokeWidth="1.5" />
        <g transform={`translate(${C - 16} ${C - 36})`}>
          <path d="M16 2 30 10v16L16 34 2 26V10Z" fill="none" stroke="var(--color-fg)" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="m12.5 12 7 6-7 6" fill="none" stroke="var(--color-accent)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <text x={C} y={C + 16} textAnchor="middle" fill="var(--color-fg)" fontSize="11.5" fontWeight="700" letterSpacing="2.4" fontFamily="Inter, sans-serif">
          NEXMANCER
        </text>
        <text x={C} y={C + 32} textAnchor="middle" fill="var(--color-accent)" fontSize="9.5" letterSpacing="2" fontFamily="JetBrains Mono, monospace">
          {active.code}
        </text>

        {/* Interactive Product Nodes */}
        {nodes.map((n, i) => {
          const on = i === activeIdx;
          const label = n.name.toUpperCase();
          const w = Math.max(118, label.length * 7.8 + 40);
          return (
            <g
              key={`n-${n.name}`}
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${n.name} (${n.category})`}
              onMouseEnter={() => onSelect(i)}
              onFocus={() => onSelect(i)}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(i);
                }
              }}
              className="cursor-pointer outline-none"
            >
              {on && (
                <rect
                  x={n.x - w / 2 - 4}
                  y={n.y - 22}
                  width={w + 8}
                  height="44"
                  rx="22"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeOpacity="0.3"
                />
              )}
              <rect
                x={n.x - w / 2}
                y={n.y - 18}
                width={w}
                height="36"
                rx="18"
                fill={on ? "var(--color-graphite)" : "var(--color-ink)"}
                stroke={on ? "var(--color-accent)" : "color-mix(in srgb, var(--color-white) 16%, transparent)"}
                strokeWidth={on ? "1.4" : "1"}
                style={{ transition: "stroke .35s, fill .35s" }}
              />
              <circle
                cx={n.x - w / 2 + 15}
                cy={n.y}
                r="3.2"
                fill={on ? "var(--color-accent)" : "color-mix(in srgb, var(--color-white) 35%, transparent)"}
                style={{ transition: "fill .35s" }}
              />
              <text
                x={n.x + 6}
                y={n.y + 4}
                textAnchor="middle"
                fill={on ? "var(--color-fg)" : "var(--color-muted)"}
                fontSize="11"
                fontWeight={on ? "700" : "500"}
                letterSpacing="1.3"
                fontFamily="JetBrains Mono, monospace"
                style={{ transition: "fill .35s" }}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
