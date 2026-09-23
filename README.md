# NEXMANCER — Corporate Website

Official corporate website for **NEXMANCER PRIVATE LIMITED** ([nexmancer.com](https://nexmancer.com/)).

> **Building what's next.**  
> Intelligent software, AI systems, cybersecurity technologies, data platforms, and cloud solutions.

---

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Tooling**: [Vite 7](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom dark tokens (`--color-ink`, `--color-graphite`, `--color-accent`)
- **Typography**: Inter (sans-serif) & JetBrains Mono (monospace)
- **Icons & Graphics**: Bespoke SVG icons, interactive canvas particle network, animated data-flow diagrams
- **SEO & Compliance**: Open Graph, Twitter Summary, JSON-LD Organization schema, privacy-first contact layer

---

## 📂 Project Structure

```text
nexmancer_2a/
├── public/
│   ├── favicon.svg          # Vector favicon
│   ├── og-image.jpg         # Open Graph sharing preview (1200x630)
│   ├── robots.txt           # Crawler instructions
│   └── sitemap.xml          # Search engine sitemap
├── src/
│   ├── components/          # Modular UI components
│   │   ├── AboutSection.tsx      # Company foundations, HQ & Engineering Ethos
│   │   ├── CaseStudies.tsx       # Proof of Work: Flagship technical case studies & metrics
│   │   ├── ContactSection.tsx    # Contact form with validation & direct call scheduling
│   │   ├── Footer.tsx            # Navigation, legal modal (Privacy / Terms)
│   │   ├── GlobalSection.tsx     # Dot-matrix global connectivity map
│   │   ├── Hero.tsx              # Primary fold with animated pillar cycle & tech stack badges
│   │   ├── HeroVisual.tsx        # Interactive central node visual
│   │   ├── Navbar.tsx            # Responsive navigation & mobile menu
│   │   ├── NetworkCanvas.tsx     # Canvas-based particle background
│   │   ├── ObjectivesSection.tsx # Industry Solutions & Engagement Models
│   │   ├── ProductPipeline.tsx   # Interactive engineering methodology ($ nx pipeline)
│   │   ├── ProductStudio.tsx     # Featured products & platforms showcase
│   │   ├── SecurityAI.tsx        # Deep-Tech Spotlight: AI × Cybersecurity architecture SVG
│   │   ├── TechnologyGrid.tsx    # Core 5 technology pillars with interactive previews
│   │   ├── icons.tsx             # Curated SVG icons
│   │   └── ui.tsx                # Reusable UI primitives (Buttons, Container, Reveal)
│   ├── data/
│   │   └── content.ts       # Structured copy & section datasets
│   ├── lib/
│   │   ├── contact.ts       # Client-side validation, sanitization & spam heuristics
│   │   ├── hooks.ts         # Cycle, in-view, spotlight & motion hooks
│   │   └── site.ts          # Global site metadata, URLs & company constants
│   ├── utils/
│   │   └── cn.ts            # clsx + tailwind-merge helper
│   ├── App.tsx              # Root page composition & scroll progress
│   ├── index.css            # Base styles, Tailwind @theme configuration & custom animations
│   └── main.tsx             # Application entrypoint
├── .env.example             # Template for local environment variables
├── .gitignore               # Git ignore rules
├── index.html               # Main HTML template with SEO meta & JSON-LD
├── package.json             # NPM dependencies & scripts
├── tsconfig.json            # TypeScript compiler configuration
└── vite.config.ts           # Vite configuration & plugin setup
```

---

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- `npm` (bundled with Node.js)

### Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/NEXMANCER/corporate-website.git
cd corporate-website/nexmancer_2a
npm install
```

### Development Server

Run the local development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173/` by default.

### Production Build

Build the project for production:

```bash
npm run build
```

The output will be generated in the `dist/` directory.

To locally test the production build:

```bash
npm run preview
```

---

## 📊 Proof of Work & Case Studies

The site highlights three verifiable technical case studies demonstrating real-world problem resolution, architectural design, and operational metrics:

1. **High-Throughput Security Telemetry & Event Ingestion** (`Security × Data`):
   - **Problem**: 15+ minute indexing lags and memory spikes across 80k events/sec legacy pipelines.
   - **Architecture**: Decoupled Kafka stream ingestion, zero-copy Go workers, ClickHouse time-series, eBPF kernel egress monitoring.
   - **Metrics**: `<380ms` indexing latency, `120k/s` sustained event throughput, `-65%` compute/storage reduction.

2. **Autonomous Enterprise Knowledge & Verification Engine** (`AI Systems`):
   - **Problem**: 22% hallucination rates and 45-minute lookup times per compliance dossier across 2M+ PDFs.
   - **Architecture**: Hybrid dense/sparse retrieval (Qdrant + BM25), cross-encoder re-ranking, async Python agent runtime enforcing mathematical citation provenance.
   - **Metrics**: `<0.8%` hallucination rate, `2.4s` audit query time, `94%` benchmark precision.

3. **Zero-Trust Multi-Tenant Cloud Platform Modernization** (`Cloud Native`):
   - **Problem**: Database connection pool starvation, lack of strict tenant boundary isolation, and 504 timeouts under traffic surges.
   - **Architecture**: Event-driven microservices on AWS EKS with PostgreSQL Row-Level Security (RLS) tenant isolation, Redis clustering, Terraform IaC.
   - **Metrics**: `99.99%` uptime during 12x traffic surges, `92ms` P99 latency (down from 1,850ms), `0` cross-tenant leaks.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory if you want to connect a live submission backend:

```bash
# Public endpoint that receives contact form submissions as JSON (POST)
# Expected payload: { name, email, company, subject, message }
VITE_CONTACT_ENDPOINT=https://your-api-endpoint.com/contact
```

> **Note**: If `VITE_CONTACT_ENDPOINT` is omitted or unconfigured, the contact form provides an offline-safe fallback allowing visitors to open their email client (`mailto:`) or copy their formatted message directly to the clipboard.

---

## 🔒 Security, Trust & Compliance

- **No Third-Party Trackers**: Does not load client-side analytics, advertising trackers, or fingerprinting scripts.
- **DPDP Act 2023 & GDPR Compliant**: Strict data minimization, direct contact data processing exclusively for inquiries, and designated Grievance Officer representation.
- **Client-Side Anti-Spam**: Incorporates honeypot fields, submission timing thresholds, and link heuristics without intrusive captchas.
- **Input Sanitization**: Client-side sanitization strips control characters and validates payload limits before submission.
- **Security Headers**: Production deployment configured with strict Content Security Policy (`CSP`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Strict-Transport-Security`.

---

## 🛠️ DevTools Console Helper

In any browser, open Developer Tools (`F12` or `Cmd+Option+I`) to view the interactive developer console signature and run:

```javascript
window.NX.help()      // Formats available inspection tools and company metadata
window.NX.caseStudies // Inspects verifiable benchmark metrics
window.NX.contact()   // Directly initiates an inquiry
```

---

## 🏢 Company & Legal

- **Entity**: NEXMANCER PRIVATE LIMITED
- **Lead Developer**: Karthikeyan T ([@carthworks](https://github.com/carthworks))
- **HQ**: Coimbatore, Tamil Nadu 641010, India
- **Email**: [business@nexmancer.com](mailto:business@nexmancer.com)
- **GitHub**: [github.com/NEXMANCER](https://github.com/NEXMANCER) · [github.com/carthworks/nexmancer_web01](https://github.com/carthworks/nexmancer_web01)
- **X (Twitter)**: [@nexmancer](https://x.com/nexmancer)
- **LinkedIn**: [linkedin.com/in/carthworks](https://www.linkedin.com/in/carthworks)

---

## 📄 License

Copyright © 2026 NEXMANCER PRIVATE LIMITED. All rights reserved.

