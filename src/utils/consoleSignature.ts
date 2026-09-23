/**
 * Developer Console Signature & DevTools Helper
 * Built following the developer-console-signature skill specification.
 */

let initialized = false;

export function initConsoleSignature() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const titleStyle =
    "font-size: 14px; font-weight: 800; color: #F8FAFC; background: linear-gradient(135deg, #07090E, #0E121B); padding: 8px 14px; border-radius: 6px; border: 1px solid rgba(91,140,255,0.4); text-shadow: 0 0 10px rgba(91,140,255,0.5);";
  const labelStyle = "font-weight: 700; color: #22D3EE; font-family: monospace;";
  const valStyle = "color: #94A3B8; font-family: sans-serif;";
  const linkStyle = "color: #5B8CFF; font-weight: 600; text-decoration: underline; font-family: monospace;";
  const quoteStyle = "font-style: italic; color: #8B5CF6; font-family: sans-serif;";
  const tipLabel = "font-weight: bold; color: #F59E0B; font-family: monospace;";
  const codeStyle = "font-family: monospace; color: #22D3EE; background: rgba(34,211,238,0.1); padding: 2px 6px; border-radius: 4px;";

  console.log("%c🚀 NEXMANCER — Building What's Next", titleStyle);
  console.log(
    "%c🏢 Organization:%c NEXMANCER PRIVATE LIMITED (Coimbatore, India)\n" +
      "%c👨‍💻 Lead Dev:    %c Karthikeyan T (@carthworks)\n" +
      "%c🐙 GitHub:      %chttps://github.com/carthworks · https://github.com/NEXMANCER\n" +
      "%c💼 LinkedIn:    %chttps://www.linkedin.com/in/carthworks\n" +
      "%c✉️  Contact:     %cbusiness@nexmancer.com\n" +
      "%c📦 Repository:  %chttps://github.com/carthworks/nexmancer_web01\n" +
      "%c✨ Mission:     %c\"Intelligent software, AI systems, cybersecurity, data and cloud solutions.\"",
    labelStyle, valStyle,
    labelStyle, valStyle,
    labelStyle, linkStyle,
    labelStyle, linkStyle,
    labelStyle, linkStyle,
    labelStyle, linkStyle,
    labelStyle, quoteStyle
  );

  console.log(
    `%c💡 Interactive Console:%c Type %cwindow.NX.help()%c to inspect tools, case studies, and engineering architecture.`,
    tipLabel,
    "color: #94A3B8;",
    codeStyle,
    "color: #94A3B8;"
  );

  const nxTools = {
    version: "1.0.0",
    company: "NEXMANCER PRIVATE LIMITED",
    developer: "Karthikeyan T (@carthworks)",
    location: "Coimbatore, Tamil Nadu, India",
    domains: ["Software", "AI", "Cybersecurity", "Data", "Cloud"],
    caseStudies: [
      {
        title: "High-Throughput Security Telemetry & Event Ingestion",
        metrics: "<380ms indexing latency · 120k/s throughput · -65% cloud cost",
      },
      {
        title: "Autonomous Enterprise Knowledge & Verification Engine",
        metrics: "<0.8% hallucination rate · 2.4s query resolution · 94% precision",
      },
      {
        title: "Zero-Trust Multi-Tenant Cloud Platform Modernization",
        metrics: "99.99% uptime · 92ms P99 latency · 0 cross-tenant leaks",
      },
    ],
    contact: () => {
      window.location.href = "mailto:business@nexmancer.com?subject=Inquiry%20from%20DevTools%20Console";
      return "Opening email client for business@nexmancer.com...";
    },
    help: () => {
      console.table({
        "NX.version": "Current production release version",
        "NX.company": "Corporate entity and legal identity",
        "NX.domains": "Core technical capability areas",
        "NX.caseStudies": "Verifiable proof-of-work benchmarks",
        "NX.contact()": "Initiate an inquiry to business@nexmancer.com",
      });
      return "🚀 Explore NEXMANCER architecture!";
    },
  };

  // Expose both window.NX and window.NEXMANCER
  (window as unknown as { NX: typeof nxTools; NEXMANCER: typeof nxTools }).NX = nxTools;
  (window as unknown as { NX: typeof nxTools; NEXMANCER: typeof nxTools }).NEXMANCER = nxTools;
}
