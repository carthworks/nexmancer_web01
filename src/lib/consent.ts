/**
 * Analytics consent (DPDP Act 2023).
 *
 * Google Tag Manager is NOT in index.html any more — it is injected only after the
 * visitor clicks "Allow". Declining (or ignoring the banner) means no Google script,
 * no Google cookies and no requests to googletagmanager.com.
 *
 * Vercel Web Analytics / Speed Insights stay on: they set no cookies and report
 * aggregated, anonymous page views and performance only (disclosed on /privacy).
 */

export const GTM_ID = "GTM-TVMQVQ8J";
const KEY = "nx-consent"; // "granted" | "denied"
export type Consent = "granted" | "denied" | null;

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

let loaded = false;

export function loadGtm() {
  if (loaded || typeof document === "undefined") return;
  loaded = true;
  const w = window as unknown as { dataLayer: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

/** Remove Google Analytics cookies when consent is withdrawn. */
function clearGaCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (/^(_ga|_gid|_gat|_gcl)/.test(name)) {
      domains.forEach((d) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
      });
    }
  });
}

export function setConsent(v: "granted" | "denied") {
  const prev = getConsent();
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* storage blocked: choice applies to this page view only */
  }
  if (v === "granted") loadGtm();
  else {
    clearGaCookies();
    // GTM can't be unloaded from a running page; reload so it stops immediately.
    if (prev === "granted") location.reload();
  }
  window.dispatchEvent(new CustomEvent("nx:consent", { detail: v }));
}

/** Re-open the banner (footer "Cookie settings" link). */
export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent("nx:consent-open"));
}
