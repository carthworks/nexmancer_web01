import { useEffect, useState } from "react";
import { getConsent, loadGtm, setConsent } from "../lib/consent";

/**
 * Small, non-blocking consent card (bottom-left). Shown until the visitor chooses;
 * re-opened from the footer's "Cookie settings". Renders nothing during prerender.
 */
export default function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const c = getConsent();
    if (c === "granted") loadGtm();
    else if (c === null) setShow(true);
    const reopen = () => setShow(true);
    window.addEventListener("nx:consent-open", reopen);
    return () => window.removeEventListener("nx:consent-open", reopen);
  }, []);

  if (!show) return null;

  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
      className="fixed inset-x-3 bottom-3 z-[70] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[400px]"
    >
      <div className="rounded-2xl border border-white/[0.1] bg-graphite/95 p-4 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:p-5">
        <p id="consent-title" className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden /> Analytics consent
        </p>
        <p id="consent-desc" className="mt-2.5 text-[13.5px] leading-relaxed text-fg/90">
          May we use Google Analytics (via Google Tag Manager) to understand which pages help visitors? It sets cookies and is
          off until you allow it. We never use ad trackers.{" "}
          <a href="/privacy" className="text-accent underline underline-offset-4 hover:text-fg">
            Privacy policy
          </a>
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => choose("granted")}
            className="h-9 flex-1 rounded-full bg-fg px-4 text-[13px] font-semibold text-ink transition-shadow hover:shadow-[0_0_0_4px_rgba(34,184,207,0.2)]"
          >
            Allow analytics
          </button>
          <button
            type="button"
            onClick={() => choose("denied")}
            className="h-9 flex-1 rounded-full border border-white/[0.14] px-4 text-[13px] font-medium text-fg transition-colors hover:border-accent/50"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
