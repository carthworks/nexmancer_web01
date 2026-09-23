import { TECH_STRIP } from "../data/content";

export default function TechStrip() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {TECH_STRIP.map((t) => (
        <li key={t} className="flex items-center">
          <span className="px-6 font-mono text-xs uppercase tracking-[0.24em] text-muted/80 transition-colors hover:text-fg sm:px-10 sm:text-[13px]">
            {t}
          </span>
          <span className="h-1 w-1 rotate-45 bg-accent/60" aria-hidden />
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Technology focus areas" className="marquee-wrap relative border-b border-white/[0.07] bg-[#080A0D] py-6">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="marquee flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
