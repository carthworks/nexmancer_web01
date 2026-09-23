import { Container, Eyebrow, Reveal } from "./ui";
import { IP_ASSETS } from "../data/content";

export default function IPSection() {
  return (
    <section id="ip" aria-labelledby="ip-title" className="relative border-y border-white/[0.07] bg-[#080A0D] py-24 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>Intellectual Property</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="ip-title" className="mt-5 text-4xl font-bold uppercase leading-[1.02] tracking-[-0.035em] text-fg sm:text-5xl">
              Technology is an asset.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
              NEXMANCER develops and commercializes technology assets including software, algorithms, databases, APIs, technical know-how and
              intellectual property.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <Reveal delay={120}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Asset classes within our scope</p>
          </Reveal>
          <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.07] sm:grid-cols-4">
            {IP_ASSETS.map((a, i) => (
              <Reveal as="li" key={a} delay={160 + i * 45} className="group bg-ink">
                <div className="flex h-full min-h-[108px] flex-col justify-between gap-6 p-5 transition-colors duration-300 group-hover:bg-graphite">
                  <span className="font-mono text-[11px] text-muted/70 transition-colors group-hover:text-accent">IP.0{i + 1}</span>
                  <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-fg">{a}</span>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-muted/80">
            These categories describe the types of technology assets NEXMANCER works with. They do not indicate that NEXMANCER currently holds any
            specific registered or granted rights.
          </p>
        </div>
      </Container>
    </section>
  );
}
