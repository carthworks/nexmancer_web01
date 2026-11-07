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

  // Generate sitemap.xml for all routes
  const today = new Date().toISOString().slice(0, 10);
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
).join("\n")}
</urlset>
`;

  fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemapXml, "utf-8");
  fs.writeFileSync(path.join(rootDir, "public", "sitemap.xml"), sitemapXml, "utf-8");
  console.log(`[prerender] Updated sitemap.xml with ${ROUTES.length} routes.`);

  // Clean up temporary SSR bundle
  fs.rmSync(ssrDir, { recursive: true, force: true });
}

run().catch((err) => {
  console.error("[prerender] Failed:", err);
  process.exit(1);
});

