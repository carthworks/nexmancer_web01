Implementation Plan: NEXMANCER Website Modernization (Problem-Solving Partner Edition)

Based on Nexmancer Website Audit & Modernization Plan-generic.md, this plan transitions nexmancer.com from a product-led single-page showcase into a crawlable, problem-first technology partner website where products live exclusively on a dedicated /products route.

IMPORTANT

Core Strategic Shift in This Plan

Problem-First Positioning: Every homepage section starts with the client's problem and desired business outcome; technologies (Custom Software, AI, Security, Data, Cloud, Quantum Readiness) are presented as methods we choose to fit the problem.
Strict Product Containment: Individual product names (Sensighty, SigmaSec, LibraDigit, AskMyDocs, Hyperlocal Heat) are removed from the Hero, main navigation, Solutions, Contact, Case Study summaries, and homepage Organization schema. They live exclusively on /products (with its own ItemList schema).
Crawlable Multi-Page Architecture: Remove vite-plugin-singlefile and add build-time static pre-rendering so every route (/, /services/*, /work/*, /products, /about, /contact, /privacy, /terms) serves full HTML to search engines, AI crawlers, and LinkedIn/WhatsApp link previews.
Architecture & Route Map
Phase 1: Positioning, Copy & Strict Product Containment (Immediate Codebase Refactor)
1.1 Rewrite Structured Copy Around Client Problems (src/data/content.ts)
Add PROBLEMS (4–6 buyer problems in plain language):
"Manual operations and disconnected tools slow our team down" → Custom software & workflow automation
"We want to use AI on our internal documents without leaking data or hallucinating" → Private RAG & deterministic evaluation
"Security scanners flood us with thousands of alerts, and we don't know what's actually exploitable" → Reachability-based AppSec & zero-trust hardening
"Our critical data and archives must stay secure and readable for decades" → Post-quantum cryptography (PQC) readiness & ISO archival standards
"Our cloud infrastructure struggles with latency spikes, tenant isolation, or rising costs" → Cloud-native architecture & database RLS
"We need high-stakes assessments or risk forecasts we can mathematically defend" → Deterministic statistical & geospatial modeling
Reframe CAPABILITIES (formerly DOMAINS) as Methods:
Present Custom Software, AI & Automation, Secure Architecture, Data & Analytics, Cloud Infrastructure, and Quantum Readiness as the methods we select to solve your problem.
Refactor CASE_STUDIES to Problem → Approach → Result:
Remove product names from homepage case study titles and summaries (e.g., "Eliminating CVE alert fatigue with call-graph reachability", "Deterministic psychometric grading for high-stakes assessments", "Air-gapped document search and ISO archival for regulated teams").
Add TEAM & Factual ABOUT_STATS:
Replace self-scored claims with checkable facts (Year Founded: 2026, Legal Entity: NEXMANCER PRIVATE LIMITED, HQ: Coimbatore, India, Delivery: Fixed-Scope & Retainer).
Add TEAM structure for Founders / Leadership with role, bio, credentials, and LinkedIn URLs.
1.2 Hero Repositioning (src/components/Hero.tsx & src/components/HeroVisual.tsx)
Remove all product names and the "Live Product Fleet" dock from the Hero.
Problem-Led Headline: "We solve hard business and engineering problems with custom software, verifiable AI, and secure architecture."
Named Buyers: Indian SMEs, funded startups, universities, and regulated enterprises.
Strict CTA Hierarchy:
Primary CTA: Book a 30-Min Discovery Call (scheduler link)
Secondary CTA: See Problems We Solve (#problems)
Update HeroVisual: Replace product names on the orbital nodes with the core problem-solving methods (SOFTWARE, AI & RAG, SECURITY, DATA, CLOUD & PQC) and show the problem → outcome mapping in the HUD card.
1.3 New "Problems We Solve" Section (src/components/ProblemsSection.tsx)
Create a dedicated section immediately after the Hero displaying the 6 buyer problems in the client's own words, showing:
The Symptom (what the buyer experiences)
How We Solve It (the engineering method we apply)
Typical Outcome & Timeline (e.g., 2-week discovery sprint or 4–8 week build)
1.4 Clean Up Solutions, About & Contact (Remove Product Bleed)
src/components/ObjectivesSection.tsx:
Remove product badges and Launch <Product> links from the accordion.
Present the 3 core service tracks + engagement models (2-Week Problem Discovery Sprint, Fixed-Scope Architecture / PQC Review, Turnkey Engineering Build / Retainer).
src/components/AboutSection.tsx:
Remove the 5-product grid from the Corporate Dossier card; replace with a single line: "We also engineer our own software platforms — explore our products →".
Add the Founders & Leadership section with LinkedIn profile links and credentials.
src/components/ContactSection.tsx:
Remove product names from the quick-select topic chips; replace with problem-oriented chips (Automate a workflow, Build a private AI / RAG system, Security / PQC audit, Custom software build, 2-week discovery sprint).
Change the primary textarea label to "What problem are you trying to solve?".
Phase 2: Contained /products Page & Standalone Legal Routes
2.1 Dedicated Products Hub (src/pages/ProductsPage.tsx or /products route)
Move ProductStudio.tsx off the main homepage flow and into a dedicated /products view reachable via the Footer (and an subtle link in About).
Render one clean card per product (Sensighty, SigmaSec, LibraDigit, AskMyDocs, Hyperlocal Heat) with:
Product name & code
The problem it solves in one line
Honest status label (Live for sensighty.nexmancer.com; Live Demo for *.vercel.app until moved to *.nexmancer.com subdomains)
Scoped ItemList of SoftwareApplication JSON-LD injected only on /products.
2.2 Standalone /privacy and /terms Pages (src/pages/LegalPage.tsx)
Replace the modal-only legal popups in Footer.tsx with real navigable routes (/privacy, /terms, /engagement) that crawlers and enterprise procurement teams can link to directly, including registered address and DPDP Act 2023 compliance details.
Phase 3: Technical SEO, Pre-Rendering & Build Pipeline
3.1 Remove Single-File Bundle Lock (vite.config.ts)
Remove viteSingleFile() from vite.config.ts so CSS and JS emit as standard, cacheable, content-hashed assets under dist/assets/.
3.2 Build-Time Static Pre-Rendering (prerender.mjs / SSG)
Add a lightweight post-build pre-render script (using Vite SSR renderToString) that generates static HTML files for every route (dist/index.html, dist/products/index.html, dist/privacy/index.html, dist/terms/index.html) with route-specific <title>, <meta name="description">, Open Graph tags, and JSON-LD schema.
Update public/sitemap.xml to list all generated routes.
3.3 Homepage Metadata, Schema & Vercel Headers
index.html:
Update <title> and <meta name="description"> to position NEXMANCER as a problem-solving engineering partner.
Point Organization.logo in JSON-LD to https://nexmancer.com/images/nexmancer-logo.png (640×125 raster PNG, satisfying Google's ≥112 px requirement).
Remove makesOffer product list and personal repo from homepage Organization schema; add LinkedIn URL to sameAs.
Regenerate public/og-image.jpg without product pills so social shares reflect the partner positioning.
vercel.json:
Port security headers from public/_headers into vercel.json and configure SPA/SSG route rewrites.
Phase 4: Conversion & Scheduler Integration
4.1 Scheduler & Contact Endpoint (src/lib/site.ts & src/lib/contact.ts)
Add VITE_SCHEDULER_URL support in site.ts (falling back gracefully to #contact form pre-fill rather than a raw mailto: popup when no external Cal.com/Calendly URL is configured).
Add linkedin and optional phone / cin fields in SITE.
Verification Plan
Product Containment Check: Grep homepage components (Hero, ProblemsSection, TechnologyGrid, ObjectivesSection, CaseStudies, AboutSection, ContactSection, index.html) to verify zero occurrences of individual product names outside /products.
TypeScript & Build Verification: Run npx tsc --noEmit and npm run build to verify hashed asset output (no singlefile inline bloat) and pre-rendered HTML files for all routes.
Crawler HTML Inspection: Inspect dist/index.html and dist/products/index.html to confirm full semantic HTML is present inside <div id="root"> prior to client JS execution.