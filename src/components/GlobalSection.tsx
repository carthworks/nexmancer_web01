import { useMemo } from "react";
import { Container, Eyebrow, Reveal } from "./ui";

/**
 * Minimal dot-matrix world map built from approximate land longitude ranges
 * per 6° latitude band (equirectangular). Deliberately abstract.
 */
const BANDS: [number, [number, number][]][] = [
  [81, [[-95, -65], [-60, -20], [15, 25], [50, 60], [95, 105]]],
  [75, [[-120, -80], [-72, -20], [55, 60], [95, 115], [135, 145]]],
  [69, [[-165, -140], [-138, -82], [-78, -65], [-55, -25], [15, 30], [40, 180]]],
  [63, [[-165, -140], [-138, -95], [-78, -62], [-50, -40], [-24, -14], [5, 30], [30, 180]]],
  [57, [[-160, -152], [-132, -95], [-78, -60], [-6, -2], [8, 18], [22, 162]]],
  [51, [[-128, -56], [-5, 1], [3, 140], [142, 144]]],
  [45, [[-124, -65], [-2, 28], [40, 47], [54, 135], [140, 145]]],
  [39, [[-123, -75], [-9, 3], [12, 18], [20, 45], [45, 122], [125, 129], [135, 142]]],
  [33, [[-118, -80], [-8, 10], [12, 32], [35, 122], [130, 140]]],
  [27, [[-112, -97], [-82, -80], [-15, 35], [37, 50], [56, 120], [120, 122]]],
  [21, [[-105, -87], [-85, -75], [-17, 38], [40, 58], [70, 88], [92, 110]]],
  [15, [[-92, -84], [-17, 40], [43, 52], [74, 80], [98, 109], [120, 124]]],
  [9, [[-80, -60], [-13, 48], [80, 82], [98, 100], [105, 107], [122, 126]]],
  [3, [[-78, -50], [9, 42], [96, 105], [109, 119], [120, 125]]],
  [-3, [[-80, -40], [10, 40], [102, 116], [120, 123], [132, 150]]],
  [-9, [[-78, -35], [13, 40], [106, 115], [124, 127], [140, 150]]],
  [-15, [[-75, -39], [12, 40], [44, 50], [125, 145]]],
  [-21, [[-70, -40], [14, 35], [44, 48], [114, 150]]],
  [-27, [[-70, -48], [15, 33], [113, 153]]],
  [-33, [[-72, -52], [18, 28], [115, 152]]],
  [-39, [[-73, -62], [145, 148], [174, 178]]],
  [-45, [[-74, -66], [167, 171]]],
  [-51, [[-74, -68], [-60, -58]]],
];

const W = 360;
const H = 150; // lat 84 → -66
const toXY = (lon: number, lat: number) => ({ x: lon + 180, y: 84 - lat });

// Origin: Coimbatore, Tamil Nadu (≈ 77°E, 11°N)
const HUB = { name: "Coimbatore, India", ...toXY(77, 11) };
const LINKS = [
  { name: "Europe", ...toXY(2, 49) },
  { name: "North America", ...toXY(-78, 40) },
  { name: "Middle East", ...toXY(55, 25) },
  { name: "Southeast Asia", ...toXY(104, 1) },
  { name: "East Asia", ...toXY(139, 36) },
  { name: "Oceania", ...toXY(149, -33) },
  { name: "Africa", ...toXY(30, -8) },
];

function WorldMap() {
  const dots = useMemo(() => {
    const out: { x: number; y: number }[] = [];
    const step = 3;
    for (let lat = 82; lat >= -56; lat -= step) {
      const band = BANDS.reduce((best, b) => (Math.abs(b[0] - lat) < Math.abs(best[0] - lat) ? b : best), BANDS[0]);
      for (let lon = -178; lon <= 178; lon += step) {
        if (band[1].some(([a, b]) => lon >= a && lon <= b)) out.push(toXY(lon, lat));
      }
    }
    return out;
  }, []);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Minimal world map with connection lines from India to international regions.">
      <defs>
        <linearGradient id="arc-g" x1="0" x2="1">
          <stop offset="0" stopColor="#5B8CFF" stopOpacity=".9" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity=".5" />
        </linearGradient>
      </defs>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="0.62" fill="rgba(245,247,250,0.22)" />
      ))}
      {LINKS.map((l) => {
        const mx = (HUB.x + l.x) / 2;
        const my = Math.min(HUB.y, l.y) - Math.abs(HUB.x - l.x) * 0.22 - 4;
        const d = `M${HUB.x},${HUB.y} Q${mx},${my} ${l.x},${l.y}`;
        return (
          <g key={l.name}>
            <path d={d} fill="none" stroke="url(#arc-g)" strokeWidth="0.5" className="flow-dash-slow" />
            <circle cx={l.x} cy={l.y} r="1.1" fill="#22D3EE" />
            <circle cx={l.x} cy={l.y} r="1.1" fill="none" stroke="#22D3EE" strokeWidth=".4" className="pulse-ring" />
          </g>
        );
      })}
      <circle cx={HUB.x} cy={HUB.y} r="2" fill="#F5F7FA" />
      <circle cx={HUB.x} cy={HUB.y} r="2" fill="none" stroke="#5B8CFF" strokeWidth=".6" className="pulse-ring" />
      <text x={HUB.x + 4} y={HUB.y + 7} fill="#F5F7FA" fontSize="4" fontFamily="JetBrains Mono, monospace" letterSpacing=".4">
        IN
      </text>
    </svg>
  );
}

export default function GlobalSection() {
  return (
    <section id="global" aria-labelledby="global-title" className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Global Technology</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="global-title" className="mt-5 text-4xl font-bold uppercase leading-[1.02] tracking-[-0.035em] text-fg sm:text-5xl lg:text-6xl">
                Built in India.
                <br />
                <span className="text-muted">Designed for the world.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-5">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              NEXMANCER is built to develop and commercialize technology for customers and partners in India and international markets.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="mt-14">
          <div className="relative rounded-3xl border border-white/[0.08] bg-graphite/40 p-4 sm:p-8">
            <WorldMap />
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.07] pt-4 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-fg" /> Origin · Coimbatore, India
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> International markets (illustrative)
              </span>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
