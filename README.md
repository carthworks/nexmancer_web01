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

## ⚙️ Environment Variables

Create a `.env` file in the root directory if you want to connect a live submission backend:

```bash
# Public endpoint that receives contact form submissions as JSON (POST)
# Expected payload: { name, email, company, subject, message }
VITE_CONTACT_ENDPOINT=https://your-api-endpoint.com/contact
```

> **Note**: If `VITE_CONTACT_ENDPOINT` is omitted or unconfigured, the contact form provides an offline-safe fallback allowing visitors to open their email client (`mailto:`) or copy their formatted message directly to the clipboard.

---

## 🔒 Security & Privacy

- **No Third-Party Trackers**: Does not load client-side analytics or advertising trackers.
- **Client-Side Anti-Spam**: Incorporates honeypot fields, submission timing thresholds, and link heuristics without intrusive captchas.
- **Input Sanitization**: Client-side sanitization strips control characters and validates payload limits before submission.

---

## 🏢 Company & Legal

- **Entity**: NEXMANCER PRIVATE LIMITED
- **HQ**: Coimbatore, Tamil Nadu, India
- **Email**: [business@nexmancer.com](mailto:business@nexmancer.com)
- **GitHub**: [github.com/NEXMANCER](https://github.com/NEXMANCER)
- **X (Twitter)**: [@nexmancer](https://x.com/nexmancer)

---

## 📄 License

Copyright © 2026 NEXMANCER PRIVATE LIMITED. All rights reserved.
