import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const ssrDir = path.join(rootDir, "dist-ssr");

const ROUTES = [
  {
    route: "/",
    outFile: "index.html",
    canonical: "https://nexmancer.com/",
    priority: "1.0",
    changefreq: "weekly",
    title: "NEXMANCER — Your Technology & AI Engineering Partner | Custom Software, AI & Security",
    description:
      "We build custom software, deploy practical AI, and engineer secure digital platforms that help businesses move faster, operate smarter, and scale with confidence.",
  },
  {
    route: "/services",
    outFile: "services/index.html",
    canonical: "https://nexmancer.com/services",
    priority: "0.9",
    changefreq: "monthly",
    title: "Engineering Services & Engagement Models — NEXMANCER",
    description:
      "Fixed-scope 2-week discovery sprints, architecture audits, and turnkey engineering builds across custom software, cited private AI, AppSec triage, offline OCR, and cloud scale.",
  },
  {
    route: "/services/custom-software",
    outFile: "services/custom-software/index.html",
    canonical: "https://nexmancer.com/services/custom-software",
    priority: "0.8",
    changefreq: "monthly",
    title: "Custom Software & Workflow Automation (SVC/01) — NEXMANCER",
    description:
      "Replace manual spreadsheets and disconnected tools with custom web applications, internal portals, and API integrations built around your exact operations.",
  },
  {
    route: "/services/ai-and-automation",
    outFile: "services/ai-and-automation/index.html",
    canonical: "https://nexmancer.com/services/ai-and-automation",
    priority: "0.8",
    changefreq: "monthly",
    title: "Private Document AI & Deterministic Scoring (SVC/02) — NEXMANCER",
    description:
      "Hybrid BM25 + vector search with page-level source citations and deterministic Bayesian IRT psychometric engines deployed on your cloud or local hardware.",
  },
  {
    route: "/services/security-architecture",
    outFile: "services/security-architecture/index.html",
    canonical: "https://nexmancer.com/services/security-architecture",
    priority: "0.8",
    changefreq: "monthly",
    title: "AppSec Automation & Vulnerability Triage (SVC/03) — NEXMANCER",
    description:
      "Cut security scanner alert fatigue with multi-scanner CI/CD pipelines correlated against CISA KEV, EPSS exploit probabilities, and AST call-graph reachability.",
  },
  {
    route: "/services/document-digitisation",
    outFile: "services/document-digitisation/index.html",
    canonical: "https://nexmancer.com/services/document-digitisation",
    priority: "0.8",
    changefreq: "monthly",
    title: "Offline Document OCR & Digital Preservation (SVC/04) — NEXMANCER",
    description:
      "Convert physical scans and legacy PDFs into searchable, ISO-compliant PDF/A archives on your own hardware with zero external cloud uploads.",
  },
  {
    route: "/services/cloud-infrastructure",
    outFile: "services/cloud-infrastructure/index.html",
    canonical: "https://nexmancer.com/services/cloud-infrastructure",
    priority: "0.8",
    changefreq: "monthly",
    title: "Cloud Modernization & High-Throughput Telemetry (SVC/05) — NEXMANCER",
    description:
      "Scale multi-tenant cloud workloads with PostgreSQL Row-Level Security (RLS), Kubernetes automation, and real-time spatiotemporal forecasting.",
  },
  {
    route: "/work",
    outFile: "work/index.html",
    canonical: "https://nexmancer.com/work",
    priority: "0.9",
    changefreq: "monthly",
    title: "Proof of Work & Engineering Case Studies — NEXMANCER",
    description:
      "Inspect how NEXMANCER solves high-consequence bottlenecks in CVE reachability triage, deterministic psychometric grading, and air-gapped document RAG.",
  },
  {
    route: "/work/reachability-triage",
    outFile: "work/reachability-triage/index.html",
    canonical: "https://nexmancer.com/work/reachability-triage",
    priority: "0.8",
    changefreq: "monthly",
    title: "Case Study: Eliminating CVE Alert Fatigue with Call-Graph Reachability — NEXMANCER",
    description:
      "How we unified five open security scanners with CISA KEV, EPSS, and AST call-graph reachability to filter out unreachable dependency alerts.",
  },
  {
    route: "/work/deterministic-grading",
    outFile: "work/deterministic-grading/index.html",
    canonical: "https://nexmancer.com/work/deterministic-grading",
    priority: "0.8",
    changefreq: "monthly",
    title: "Case Study: Deterministic Psychometric Grading for High-Stakes Assessments — NEXMANCER",
    description:
      "How we paired generative AI curriculum synthesis with a deterministic Bayesian IRT scoring engine for fair, repeatable, and auditable assessments.",
  },
  {
    route: "/work/airgapped-rag",
    outFile: "work/airgapped-rag/index.html",
    canonical: "https://nexmancer.com/work/airgapped-rag",
    priority: "0.8",
    changefreq: "monthly",
    title: "Case Study: Air-Gapped Document Search & ISO Archival — NEXMANCER",
    description:
      "How we engineered an offline OCR preservation and hybrid BM25 + vector search pipeline with page-level citations and zero external cloud egress.",
  },
  {
    route: "/products",
    outFile: "products/index.html",
    canonical: "https://nexmancer.com/products",
    priority: "0.8",
    changefreq: "monthly",
    title: "Products & Platforms — NEXMANCER | Sensighty, SigmaSec, LibraDigit, AskMyDocs, Hyperlocal Heat",
    description:
      "Explore proprietary software platforms engineered by NEXMANCER across adaptive learning, vulnerability reachability triage, offline OCR preservation, private RAG search, and urban heat forecasting.",
  },
  {
    route: "/trust",
    outFile: "trust/index.html",
    canonical: "https://nexmancer.com/trust",
    priority: "0.7",
    changefreq: "monthly",
    title: "Trust, Security & Procurement Center — NEXMANCER PRIVATE LIMITED",
    description:
      "Enterprise diligence dossier: 100% client IP ownership, local-first/air-gapped deployment options, mutual NDA workflow, security controls, and DPDP Act 2023 compliance.",
  },
  {
    route: "/insights",
    outFile: "insights/index.html",
    canonical: "https://nexmancer.com/insights",
    priority: "0.8",
    changefreq: "monthly",
    title: "Engineering Notes & Readiness Checklist — NEXMANCER",
    description:
      "Practical architecture guides on cited private RAG, reachability-first CVE triage, and offline ISO PDF/A preservation, plus our 9-point Enterprise Readiness Checklist.",
  },
  {
    route: "/insights/cited-private-rag",
    outFile: "insights/cited-private-rag/index.html",
    canonical: "https://nexmancer.com/insights/cited-private-rag",
    priority: "0.7",
    changefreq: "monthly",
    title: "Why Generic Chatbots Fail on Enterprise Documents (Hybrid BM25 + Vector RAG) — NEXMANCER",
    description:
      "Architecture guide for compliance, legal, and knowledge teams on combining BM25 lexical search with dense vectors and mandatory page-level citations.",
  },
  {
    route: "/insights/reachability-cve-triage",
    outFile: "insights/reachability-cve-triage/index.html",
    canonical: "https://nexmancer.com/insights/reachability-cve-triage",
    priority: "0.7",
    changefreq: "monthly",
    title: "Cutting Security Scanner Noise with CISA KEV, EPSS & Call-Graph Reachability — NEXMANCER",
    description:
      "How engineering teams move from thousands of unranked CVEs to a verified list of vulnerabilities that are actually reachable in production code.",
  },
  {
    route: "/insights/offline-ocr-pdfa-archival",
    outFile: "insights/offline-ocr-pdfa-archival/index.html",
    canonical: "https://nexmancer.com/insights/offline-ocr-pdfa-archival",
    priority: "0.7",
    changefreq: "monthly",
    title: "Turning Scanned Records into Searchable ISO PDF/A Archives Offline — NEXMANCER",
    description:
      "Designing local-first OCR, human-in-the-loop proofreading, and long-term ISO 19005 (PDF/A) preservation pipelines without cloud uploads.",
  },
  {
    route: "/about",
    outFile: "about/index.html",
    canonical: "https://nexmancer.com/about",
    priority: "0.7",
    changefreq: "monthly",
    title: "About, Leadership & Engineering Ethos — NEXMANCER PRIVATE LIMITED",
    description:
      "Learn about NEXMANCER PRIVATE LIMITED, our engineering headquarters in Coimbatore, India, our first-principles ethos, and our 6-stage delivery lifecycle.",
  },
  {
    route: "/contact",
    outFile: "contact/index.html",
    canonical: "https://nexmancer.com/contact",
    priority: "0.8",
    changefreq: "monthly",
    title: "Book a Discovery Call or Submit a Problem Brief — NEXMANCER",
    description:
      "Book a 30-minute discovery call or send a technical problem brief to NEXMANCER PRIVATE LIMITED. Direct architect response within 1 business day.",
  },
  {
    route: "/privacy",
    outFile: "privacy/index.html",
    canonical: "https://nexmancer.com/privacy",
    priority: "0.4",
    changefreq: "yearly",
    title: "Privacy Policy (DPDP Act 2023) — NEXMANCER PRIVATE LIMITED",
    description:
      "Zero-tracking privacy policy and Digital Personal Data Protection Act (DPDP Act 2023) compliance statement for NEXMANCER PRIVATE LIMITED.",
  },
  {
    route: "/terms",
    outFile: "terms/index.html",
    canonical: "https://nexmancer.com/terms",
    priority: "0.4",
    changefreq: "yearly",
    title: "Terms of Use — NEXMANCER PRIVATE LIMITED",
    description:
      "Terms of Use governing access to nexmancer.com and informational materials published by NEXMANCER PRIVATE LIMITED.",
  },
  {
    route: "/engagement",
    outFile: "engagement/index.html",
    canonical: "https://nexmancer.com/engagement",
    priority: "0.5",
    changefreq: "yearly",
    title: "Engagement & Cancellation Policy — NEXMANCER PRIVATE LIMITED",
    description:
      "Commercial delivery standards, milestone acceptance, client IP ownership, and cancellation terms for NEXMANCER engineering engagements.",
  },
  {
    route: "/404",
    outFile: "404.html",
    canonical: "https://nexmancer.com/404",
    includeInSitemap: false,
    title: "404 · Route Not Found — NEXMANCER",
    description: "The requested route could not be found on nexmancer.com.",
  },
];

async function run() {
  const templatePath = path.join(distDir, "index.html");
  const template = fs.readFileSync(templatePath, "utf-8");

  const ssrEntryPath = path.join(ssrDir, "entry-server.js");
  const { render } = await import(pathToFileURL(ssrEntryPath).href);

  for (const r of ROUTES) {
    const appHtml = render(r.route);
    let html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Inject route-specific title, description, canonical, and social tags
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${r.title}</title>`);
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${r.description}" />`
    );
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${r.canonical}" />`
    );
    html = html.replace(
      /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${r.canonical}" />`
    );
    html = html.replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${r.title}" />`
    );
    html = html.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${r.description}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:title" content="${r.title}" />`
    );
    html = html.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:description" content="${r.description}" />`
    );

    const outPath = path.join(distDir, r.outFile);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, html, "utf-8");
    console.log(`[prerender] Generated ${r.outFile} (${(Buffer.byteLength(html, "utf8") / 1024).toFixed(1)} kB)`);
  }

  // Generate sitemap.xml for all indexable routes
  const sitemapRoutes = ROUTES.filter((r) => r.includeInSitemap !== false);
  const today = new Date().toISOString().slice(0, 10);
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    (r) => `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf-8");
  fs.writeFileSync(path.join(rootDir, "public", "sitemap.xml"), sitemapXml, "utf-8");
  console.log(`[prerender] Updated sitemap.xml with ${sitemapRoutes.length} indexable routes.`);

  // Clean up temporary SSR bundle
  fs.rmSync(ssrDir, { recursive: true, force: true });
}

run().catch((err) => {
  console.error("[prerender] Failed:", err);
  process.exit(1);
});
