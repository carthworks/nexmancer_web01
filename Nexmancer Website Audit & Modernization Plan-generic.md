# Nexmancer Website Audit & Modernization Plan

Nov 7, 2026 · @Sathish Gunasekaran

## Executive summary

The site is well built and looks premium, but it presents Nexmancer as a maker of products. It should present Nexmancer as a partner that solves problems. Buyers arrive with a problem, not a shopping list. They need to see, in the first screen, that you understand it and will solve it with whatever fits: custom software, AI, automation, security engineering or cloud.

Fix these five things first, in this order:

1. **Reposition as a problem-solving partner.** The hero, navigation and section copy should talk about the client's problems and outcomes. Technologies appear as methods you choose to fit the problem, never as the headline.
2. **Confine products to one dedicated section.** Remove them from the hero, Solutions and Contact so visitors aren't left asking "do I buy a product or hire them?" All product guidance sits in [Products: one contained section](#mnhexj383yn.21768) below.
3. **Make the site crawlable.** It's a client-rendered React app, so crawlers and link previews see only a two-line fallback. Pre-render the HTML at build time.
4. **Make the proof verifiable and add people.** Show problems you've solved, with evidence you can stand behind, and the founders behind the work. Anonymous engagements with very precise metrics (for example "<0.8% hallucination") don't build trust.
5. **Replace mailto with a real booking flow.** Use a scheduler for discovery calls and a contact form that actually posts, with a confirmation and a reply-time promise.

Audit basis: the [GitHub repo](https://github.com/carthworks/nexmancer_web01) at its latest commit (2 Nov 2026), built and rendered locally. I also read the HTML that [nexmancer.com](https://nexmancer.com/) serves to crawlers. I couldn't load the live page in a full browser from here, so live-only settings (contact endpoint, hosting headers) are marked "check".

## What's there today

It's a single long page: 10 sections, about 14,100 px tall on desktop and 23,500 px on a phone. It's built with React 19, Vite 7 and Tailwind 4, with a dark/light theme. The visual craft is strong: a consistent dark "deep-tech" look, custom SVG diagrams, accessible markup (skip link, alt text, labelled controls) and no horizontal scroll on mobile.

| # | Section | Headline on page | Job it does today |
| --- | --- | --- | --- |
| 1 | Hero | Building what's next. | Lists 5 products as "live platforms" |
| 2 | Technology | Technology, engineered. | 5 domains: software, AI, security, data, cloud |
| 3 | Methodology | From idea to product. | 6-step research-to-scale pipeline |
| 4 | Products | We build products, not just projects. | 5 product cards |
| 5 | Case studies | Engineered. Tested. Measurably proven. | 3 anonymous engagements with metrics |
| 6 | AI × Security | Intelligence meets security. | Architecture diagram |
| 7 | Solutions | Engineered for real-world impact. | The same 5 products again, plus 3 engagement models |
| 8 | Global | Built in India. Designed for the world. | Dot-matrix world map |
| 9 | About | A deep-tech studio built on first principles. | Principles, stats, capabilities |
| 10 | Contact | Have a hard tech problem? | Form + mailto "Book 15m call" |

Products appear in four places: hero, Products, Solutions and Contact. So a first-time visitor reads Nexmancer as a product company. The consulting offer (the three engagement models) sits in section 7, about 60% of the way down the page. No section starts from the client's problem.

## Gaps

The biggest gaps are in positioning, proof and the contact path, not in visual design.

### Positioning and messaging

- **It reads as a product company, not a partner.** The page calls Nexmancer a "deep-tech product studio & applied R&D" and leads with "5 live platforms". A buyer with a problem can't tell whether you'll solve it for them or sell them something off the shelf.
- **Technology-first, not problem-first.** The five domains (software, AI, security, data, cloud) are presented as what you sell. They should be presented as the methods you pick to fit each client's problem.
- **The headline says nothing about the client.** "Building what's next" could belong to any company. It should name a problem and an outcome, for example faster operations, fewer missed leads, systems you can trust.
- **No defined customer or problem list.** The page never says who it's for (Indian SMEs, funded startups, institutions, regulated enterprises) or which problems you're best at solving.
- **Products crowd the general messaging.** They appear in the hero, Solutions and Contact, pulling attention away from the partnership offer. They belong in one dedicated section ([see Products](#mnhexj383yn.21768)).
- **Charter pillars are missing.** Quantum readiness and secure architecture, two of the charter's three pillars, don't appear at all. They fit naturally as capability areas.
- **Headings are all-caps slogans,** for example "ENGINEERED. TESTED. MEASURABLY PROVEN." Ten of them in a row make the page feel loud and hard to scan.

### Proof and trust

- **Case studies can't be checked.** There are three engagements with no client name, quote, date or link, yet very precise numbers ("2.4s, reduced from 45 minutes", "0 cross-tenant leaks"). Experienced buyers discount this, and diligence will ask for references. Only keep what you can evidence, written as problem → approach → result.
- **No people.** No founders, no team, no LinkedIn company page, no headshots. The only named person is the lead developer, in a hidden browser-console message. For a partner business, the people *are* the offer.
- **Self-scored stats.** "100% First-Principles", "Zero Data Leakage" and "100% Portable Stack" are claims, not evidence. Swap them for checkable facts: year founded, registered company details, problems solved, open-source repos.
- **Missing basics buyers check:** company registration details (CIN/GSTIN), a phone or WhatsApp number, a LinkedIn link, and real Privacy and Terms pages. Today these are short in-page pop-ups.

### Conversion

- **"Book discovery call" opens the visitor's email app.** On many work laptops and phones this fails or does nothing. A scheduler (Cal.com or Calendly) converts far better.
- **The contact form may not send.** If `VITE_CONTACT_ENDPOINT` isn't set, the form tells visitors "Online delivery isn't connected yet". *Check:* submit a test on the live site.
- **There are 25+ calls to action** with no hierarchy (Book call, Inquire, Partner with us, Transmit message, plus a launch button per product…). There should be one primary action (book a call) and one secondary (see work).
- **No reason to act now** and nothing for visitors who aren't ready: no free audit, checklist, newsletter or pricing guide.
- **No analytics or conversion tracking** beyond Vercel Speed Insights, so you can't measure what works.

### Technical, SEO and performance

- **Invisible to search and social.** The app renders in the browser. Crawlers and the LinkedIn, X and WhatsApp preview bots get only the `<noscript>` text (an H1, one sentence and an email). Google renders JavaScript eventually, but late and unreliably, and other crawlers and AI search tools often don't.
- **One page means one ranking URL.** The sitemap has a single URL. There's no page per service, product or case study to rank for searches like "AI development company Coimbatore" or "security audit India".
- **Everything is inlined into one 413 KB HTML file** (116 KB gzipped) by `vite-plugin-singlefile`. Nothing can be cached between visits, and the whole app must download before first paint.
- **Security headers may not apply.** They're in `public/_headers`, a Netlify/Cloudflare format, but the site uses Vercel Speed Insights, which suggests Vercel hosting, and Vercel ignores `_headers`. *Check* the live response headers.
- **Schema has gaps.** The Organization `logo` points to an SVG favicon (Google needs a raster image of at least 112 px). `sameAs` lists a personal repo but no LinkedIn.
- **Heavy motion.** There's an always-running particle canvas, a scroll-progress bar and rotating hero text. Check that they respect the reduced-motion setting, and their battery cost on mobile.

## Essential features for a modern tech consultancy

Buyers now shortlist on evidence and specificity: named outcomes, real people, and a page that answers their exact search. These are the features that do that work, most important first.

| Feature | What it looks like for Nexmancer | Why it matters |
| --- | --- | --- |
| Problem-led hero | "We solve hard business and technology problems with custom software, AI, automation and security engineering" + who it's for + one button: "Book a 30-min call" | Visitors decide in seconds whether you understand their problem |
| "Problems we solve" section | 4–6 problems in the buyer's own words, e.g. "Leads slip through the cracks", "Manual work slows us down", "We're not sure our systems are secure", "We want to use AI but don't know where". Each links to how you'd approach it | Buyers recognise their situation; the method follows the problem |
| Capabilities as methods | Custom software, AI and machine learning, data and automation, security architecture, cloud, quantum readiness, framed as "how we solve it" | Shows range without making any one technology the pitch |
| Service pages (one URL each) | e.g. `/services/custom-software`, `/services/ai-and-automation`, `/services/security-architecture`, `/services/quantum-readiness`, each with scope, deliverables, timeline and a starting price or range | Ranks for buyer searches; answers "what exactly do I get?" |
| Verifiable case studies | Client problems you solved, written as problem → approach → result, with screenshots, dates and client names where permitted | Proof a buyer can check, not numbers they must trust |
| Founders & team | Photos, roles, LinkedIn, one-line credentials (e.g. IIT Madras, security and cryptography background) | People hire partners they can see |
| Fixed-scope entry offer | e.g. "2-week problem discovery sprint" or "Security architecture review, fixed fee" | Lowers the risk of a first engagement; the most common consultancy converter |
| Real booking + form | Cal.com/Calendly embed; a form that posts to email or CRM, with a confirmation and "we reply within 1 business day" | Removes mailto friction; sets expectations |
| Engagement models + pricing signal | Sprint / retainer / team extension, with "from ₹…" or typical ranges | Qualifies leads and saves both sides time |
| Insights / blog | 1–2 practical posts a month on problems clients face: securing AI systems, automating operations, preparing for post-quantum cryptography | Search traffic, LinkedIn content, shows how you think |
| Lead magnet | Free checklist, e.g. "Post-quantum readiness checklist for Indian enterprises" | Captures visitors who aren't ready to talk yet |
| Trust & compliance page | Security practices, data handling, NDA-first, company registration, DPDP Act stance | Required by enterprise and regulated buyers |
| Analytics & tracking | Privacy-friendly analytics (Plausible or Umami) + events for booking, form and outbound clicks | You can't improve what you don't measure |

## Prioritized roadmap

Spend the first two weeks on fixes that cost little and stop losing visitors. Then reposition around the problems you solve, and move products into their own section, before investing in content.

&#91;embedded content: 12-week roadmap · 3 phases, 2 gates\]

Don't start a phase until the previous gate is met. "Crawlable and bookable" means a link shared on LinkedIn shows a proper preview and a test booking reaches your inbox. "Services live and tracked" means the homepage leads with client problems, each service has its own page, products appear only on /products, and analytics records bookings.

## Codebase fixes

Most fixes are small. The one structural change is moving from a single-page app to pre-rendered, multi-page output.

| File | Change | Effort |
| --- | --- | --- |
| `vite.config.ts` | Remove `viteSingleFile()` so JS and CSS ship as cacheable, hashed files | 5 min |
| `vite.config.ts` / `package.json` | Pre-render to static HTML: migrate to Astro (best fit for a content site; keep React for the interactive parts) or add `vite-react-ssg`. Each route becomes a real HTML page | 2–4 days |
| `src/App.tsx`, `src/lib/site.ts` | Split into routes: `/`, `/problems/*` or `/services/*`, `/work/*`, `/about`, `/insights/*`, `/contact`. Change `NAV` from `#anchors` to real paths, led by Problems, Services, Work and About | 1–2 days |
| `src/data/content.ts` | Rewrite the hero and section copy around client problems and outcomes, with technologies described as methods. Replace `CASE_STUDIES` with evidenced problem → approach → result stories. Drop the self-scored metrics in `ETHOS_PRINCIPLES` and `ABOUT_STATS`. Add `PROBLEMS`, `SERVICES` and `TEAM` arrays | 1–2 days |
| `src/components/Hero.tsx` | Headline names a client problem and outcome. One primary CTA (book a call), one secondary (see how we work) | 0.5 day |
| `src/lib/site.ts` | Replace `scheduleMailto` with a scheduler URL. Add `linkedin` and `phone` | 1 hr |
| `src/lib/contact.ts` + host env | Set `VITE_CONTACT_ENDPOINT` (Formspree, Web3Forms, or a serverless function that emails you and logs to a sheet or CRM). Add a success state with the reply time. Ask "What problem are you trying to solve?" as the first field | 2 hr |
| `public/_headers` | If hosted on Vercel, move the headers into `vercel.json` (`headers` array). Add the scheduler and analytics origins to the CSP | 1 hr |
| `index.html` | Describe Nexmancer as a problem-solving technology partner in the title, meta description and Organization schema (not "product studio"). Set the schema `logo` to a PNG (≥112 px). Add LinkedIn to `sameAs` and move the personal repo out | 1 hr |
| `public/sitemap.xml` | Generate at build time from the routes | 1 hr |
| `src/components/Footer.tsx` | Move Privacy, Terms and Engagement from pop-up text to real `/privacy` and `/terms` pages. Add CIN/GSTIN and registered address | 0.5 day |
| `src/components/NetworkCanvas.tsx` | Pause the animation when it's off-screen or the tab is hidden. Skip it when reduced motion is on | 1 hr |
| `src/utils/consoleSignature.ts` | Optional: keep it, but credit the team on an About page too, where buyers will actually see it | — |

Product-related code changes are listed in the next section.

## Products: one contained section

Products stay on the site as evidence of engineering depth, but in one place only: a single `/products` page, reached from the footer or a secondary nav link. This is the only part of the site, and of this plan, where individual products are named.

### Rules for the rest of the site

- No product names or product links in the hero, main navigation, services, problems, case-study summaries, Contact, or the homepage title, meta description and Organization schema.
- General copy can say "we also build our own products", with a link to `/products`, and nothing more.
- If a product build is used as a case study, write it as the problem solved. Name the product only on that case-study page and on `/products`.

### The products page

- One card per product: name, the problem it solves in one line, a status label (Live, Beta or Demo) and a link out.
- Products to list: Sensighty, SigmaSec, LibraDigit, AskMyDocs and Hyperlocal Heat.
- Give the page its own schema (an `ItemList` of `SoftwareApplication`) instead of listing products in the homepage Organization schema.

### Product fixes

| File / item | Change | Effort |
| --- | --- | --- |
| `src/components/Hero.tsx` | Remove the product carousel and "5 live platforms" copy from the hero | 1 hr |
| Solutions and Contact sections | Remove the repeated product lists. Keep the engagement models in Solutions | 1 hr |
| `src/data/content.ts` (`PRODUCTS`) | Use it only in a new `ProductsPage` component | 1 hr |
| Product hosting | Four of the five products link to `*.vercel.app` subdomains. Move them to `*.nexmancer.com` subdomains (as Sensighty already is) or label them "Demo". Point Sensighty at its launch page | 1 hr + DNS |
| `index.html` JSON-LD | Move product entries out of the homepage schema and onto `/products` | 1 hr |

## Sources

- [nexmancer.com](https://nexmancer.com/): the HTML served to crawlers, fetched 7 Nov 2026
- [carthworks/nexmancer\_web01](https://github.com/carthworks/nexmancer_web01): latest commit 2 Nov 2026, built with `vite build` and rendered at 1440 px and 390 px
