/**
 * All homepage copy lives here as structured data so sections render from arrays
 * rather than repeated markup. Keep claims factual — no invented metrics, clients or certifications.
 */

export type DomainKey = "software" | "ai" | "security" | "data" | "cloud";

export const HERO_PILLARS = [
  "Custom Software",
  "AI & Automation",
  "Secure Architecture",
  "Data & Forecasting",
  "Cloud Systems",
];

export type HeroMethodNode = {
  code: string;
  name: string;
  category: string;
  problem: string;
  outcome: string;
  method: string;
  timeline: string;
  key: DomainKey;
};

export const HERO_METHODS: HeroMethodNode[] = [
  {
    code: "NX/SW",
    name: "Custom Software",
    category: "Workflow & SaaS Engineering",
    problem: "“Our team wastes hours copying data between spreadsheets, PDFs, and disconnected tools.”",
    outcome: "Your operations run in one place, manual re-entry drops sharply, and every change has a clear audit trail.",
    method: "Custom web applications, internal portals, and API integrations built around how your team actually works.",
    timeline: "4–8 week build",
    key: "software",
  },
  {
    code: "NX/AI",
    name: "AI & Automation",
    category: "AI With Cited Sources",
    problem: "“We want to use AI on our internal documents and assessments, but generic chatbots guess or leak data.”",
    outcome: "Your team gets answers they can trust, with the exact source page cited and zero data leaving your control.",
    method: "Private document search and deterministic grading engines running on your own cloud or local hardware.",
    timeline: "2-week sprint · 6-week rollout",
    key: "ai",
  },
  {
    code: "NX/SEC",
    name: "Secure Architecture",
    category: "AppSec & Vulnerability Triage",
    problem: "“Security scanners dump thousands of alerts a week and engineers don’t know what’s actually exploitable.”",
    outcome: "Your developers fix the real security risks first and spend far less time chasing false alarms before audits.",
    method: "Automated vulnerability triage that checks whether a flagged dependency is actually used in your code.",
    timeline: "2–4 week integration",
    key: "security",
  },
  {
    code: "NX/DATA",
    name: "Data & Forecasting",
    category: "Archival OCR & Risk Telemetry",
    problem: "“Important records are locked in scanned PDFs, or operational data arrives too late to act on.”",
    outcome: "Scanned files become searchable archives on your own machines, and field teams get early risk alerts.",
    method: "Offline OCR digitisation into ISO PDF/A packages and real-time operational or environmental forecasting.",
    timeline: "3–6 week deployment",
    key: "data",
  },
  {
    code: "NX/CLOUD",
    name: "Cloud Systems",
    category: "Multi-Tenant Cloud Infrastructure",
    problem: "“Our platform slows down during traffic spikes, and enterprise buyers ask for strict tenant isolation.”",
    outcome: "Your product stays fast under peak load with provable separation between every customer’s data.",
    method: "PostgreSQL row-level tenant isolation, event queues, and autoscaling containers on AWS and Kubernetes.",
    timeline: "4–8 week modernization",
    key: "cloud",
  },
];

export const ECOSYSTEM_BADGES = [
  "AWS",
  "Node.js",
  "Python",
  "React",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "Linux",
];

export type ProblemItem = {
  id: string;
  num: string;
  symptom: string;
  buyer: string;
  method: string;
  approach: string;
  outcome: string;
  timeline: string;
  domainKey: DomainKey;
};

export const PROBLEMS: ProblemItem[] = [
  {
    id: "manual-ops",
    num: "01",
    symptom: "“Our team spends hours copying data between spreadsheets, PDFs, and disconnected tools.”",
    buyer: "Operations & Engineering Leads · SMEs & Enterprises",
    method: "Custom Software & Workflow Automation",
    approach:
      "We replace fragile manual handoffs with purpose-built web applications, internal portals, and API integrations tailored to how your team actually works.",
    outcome: "Eliminate repetitive data entry and gain a single, auditable system of record.",
    timeline: "4–8 week build",
    domainKey: "software",
  },
  {
    id: "ai-citations",
    num: "02",
    symptom: "“We want AI over our internal documents and assessments, but generic chatbots guess or leak data.”",
    buyer: "Compliance, Legal, EdTech & Knowledge Teams",
    method: "Private Document AI & Deterministic Scoring",
    approach:
      "We build private retrieval systems that answer from your own documents and cite the source page, paired with deterministic scoring engines that run on your infrastructure.",
    outcome: "Your team gets answers they can verify, fair assessment scoring, and zero external data leakage.",
    timeline: "2-week sprint · 6-week rollout",
    domainKey: "ai",
  },
  {
    id: "alert-fatigue",
    num: "03",
    symptom: "“Our security scanners dump thousands of CVEs every week and developers don’t know what to fix first.”",
    buyer: "CTOs, CISOs & DevSecOps Teams",
    method: "Reachability-First AppSec & Automated Triage",
    approach:
      "We combine multi-scanner pipelines with exploit telemetry and code reachability checks so every finding is ranked and explained in plain English.",
    outcome: "Cut false-positive alert noise so engineers focus only on vulnerabilities that are actually reachable.",
    timeline: "2–4 week integration",
    domainKey: "security",
  },
  {
    id: "unsearchable-archives",
    num: "04",
    symptom: "“Decades of scanned records, contracts, and manuscripts are locked in unsearchable folders.”",
    buyer: "Universities, Libraries, Archives & Regulated Firms",
    method: "Offline-First OCR & ISO PDF/A Preservation",
    approach:
      "We deploy local-first OCR, metadata cataloguing, and ISO-standard PDF/A packaging workflows that process sensitive documents entirely on your machines.",
    outcome: "Turn scanned document vaults into searchable digital archives without uploading files to external clouds.",
    timeline: "3–6 week deployment",
    domainKey: "data",
  },
  {
    id: "cloud-scale",
    num: "05",
    symptom: "“Our application slows down under load and enterprise buyers are asking for strict tenant isolation.”",
    buyer: "Funded SaaS Startups & Digital Businesses",
    method: "Zero-Trust Multi-Tenant Cloud Architecture",
    approach:
      "We re-architect database bottlenecks with PostgreSQL Row-Level Security (RLS), event-driven queues, and containerized services on AWS and Kubernetes.",
    outcome: "Predictable performance during traffic surges and provable separation between every customer's data.",
    timeline: "4–8 week modernization",
    domainKey: "cloud",
  },
  {
    id: "telemetry-forecasting",
    num: "06",
    symptom: "“High-volume telemetry and environmental risk feeds arrive too late for field teams to act.”",
    buyer: "Operations, Insurance & Urban Infrastructure Teams",
    method: "Real-Time Telemetry & Spatiotemporal Forecasting",
    approach:
      "We engineer high-throughput streaming pipelines and street-level 100-metre forecasting models that convert raw sensor and log data into automated operational alerts.",
    outcome: "Fast operational visibility and 48-hour localized risk triggers for field teams.",
    timeline: "4–6 week build",
    domainKey: "data",
  },
];

export const DOMAINS: { n: string; key: DomainKey; title: string; desc: string; tags: string[] }[] = [
  {
    n: "01",
    key: "software",
    title: "Custom Software",
    desc: "When off-the-shelf SaaS doesn't fit your workflow, we design and ship production web applications, internal tools, and APIs built around your exact operations.",
    tags: ["Workflow Automation", "Multi-Tenant SaaS", "APIs & Integrations", "Offline-First Apps"],
  },
  {
    n: "02",
    key: "ai",
    title: "AI & Automation",
    desc: "When you need AI that answers from your own data and cites its sources, we combine hybrid search with deterministic scoring and private model runtimes.",
    tags: ["Cited Document Search", "Bayesian IRT Scoring", "Local / Private LLMs", "Workflow Automation"],
  },
  {
    n: "03",
    key: "security",
    title: "Secure Architecture",
    desc: "When security audits or alert backlogs slow your releases, we harden application boundaries and rank vulnerabilities by whether they can actually be exploited.",
    tags: ["Zero-Trust Architecture", "CVE Reachability", "CISA KEV & EPSS", "DevSecOps Automation"],
  },
  {
    n: "04",
    key: "data",
    title: "Data & Forecasting",
    desc: "When critical data is trapped in scans or delayed batch jobs, we engineer offline OCR archival pipelines, real-time telemetry streams, and localized forecasting.",
    tags: ["High-Throughput Telemetry", "OCR & ISO PDF/A", "Spatiotemporal Forecasting", "Analytics Pipelines"],
  },
  {
    n: "05",
    key: "cloud",
    title: "Cloud Systems",
    desc: "When traffic spikes or tenant isolation requirements outgrow your stack, we build resilient, cost-controlled container infrastructure on AWS, Linux, and Kubernetes.",
    tags: ["AWS & Kubernetes", "PostgreSQL RLS", "Distributed Systems", "Infrastructure as Code"],
  },
];

export const PIPELINE = [
  { t: "Diagnose", d: "Map the operational bottleneck, failure modes, and target ROI before writing code.", fn: "diagnose()" },
  { t: "Architect", d: "Design verifiable system boundaries, data schemas, and security controls.", fn: "architect()" },
  { t: "Engineer", d: "Build clean, maintainable software in short milestones with weekly demos.", fn: "build()" },
  { t: "Verify", d: "Test reachability, tenant isolation, citation accuracy, and load performance.", fn: "verify()" },
  { t: "Deploy", d: "Ship to your cloud or on-premise environment with full CI/CD and observability.", fn: "ship()" },
  { t: "Handover", d: "Transfer 100% of source code, runbooks, and architecture documentation to your team.", fn: "handover()" },
];

export type ProductItem = {
  name: string;
  category: string;
  tagline: string;
  desc: string;
  url: string;
  code: string;
  key: DomainKey | "platform" | "climate" | "archive";
  tags: string[];
  status: string;
};

export const PRODUCTS: ProductItem[] = [
  {
    name: "Sensighty",
    category: "Adaptive Learning & Assessment",
    tagline: "Universal adaptive learning and psychometric assessment.",
    desc: "Generative AI builds the curriculum and questions for any subject — a deterministic Bayesian IRT engine scores every answer, so results are fair, repeatable and verifiable.",
    url: "https://sensighty.nexmancer.com/",
    code: "NX/EDU",
    key: "ai",
    tags: ["Generative AI", "Bayesian IRT", "Psychometrics"],
    status: "Live",
  },
  {
    name: "SigmaSec",
    category: "Cybersecurity",
    tagline: "Vulnerability findings, ranked and explained.",
    desc: "SigmaSec runs Nuclei, Trivy, Gitleaks, Opengrep, and Nmap against your code and infrastructure, then ranks what they find — matching each CVE against CISA KEV and EPSS, checking whether the vulnerable dependency is used in your code, and explaining each finding in plain English before an engineer ever sees it.",
    url: "https://sigmasec.vercel.app/",
    code: "NX/SEC",
    key: "security",
    tags: ["CVE Triage", "CISA KEV", "EPSS", "Reachability"],
    status: "Live Demo",
  },
  {
    name: "LibraDigit",
    category: "Document Digitisation",
    tagline: "Turn scanned documents into a searchable digital archive on your own computer.",
    desc: "LibraDigit reads your scans and PDFs with OCR, lets you correct the text and add catalogue details, and saves each document as a preservation-ready PDF/A package. Nothing is uploaded anywhere.",
    url: "https://libra-digit-ai.vercel.app/",
    code: "NX/ARCHIVE",
    key: "archive",
    tags: ["OCR", "PDF/A", "Offline-First"],
    status: "Live Demo",
  },
  {
    name: "AskMyDocs",
    category: "AI Systems",
    tagline: "Private document search that cites its sources.",
    desc: "Hybrid BM25 + semantic search with automatic indexing and source citations. Run fully local for maximum privacy, or connect to Ollama Cloud for larger models — your choice.",
    url: "https://ask-mydocs.vercel.app/",
    code: "NX/RAG",
    key: "data",
    tags: ["RAG", "Hybrid Search", "Ollama", "Local-First"],
    status: "Live Demo",
  },
  {
    name: "Hyperlocal Heat",
    category: "Climate Intelligence",
    tagline: "Know which streets will be dangerous tomorrow.",
    desc: "48-hour, 100-metre heat-stress forecasts for the hot, dense cities where 1 in 3 people will live. Built to automate parametric insurance payouts, protect outdoor workforces, and trigger street-level city response.",
    url: "https://hyperlocal-heat.vercel.app/",
    code: "NX/CLIMATE",
    key: "climate",
    tags: ["Forecasting", "Parametric Insurance", "Geospatial"],
    status: "Live Demo",
  },
];

export type SolutionTrack = {
  title: string;
  code: string;
  buyer: string;
  tagline: string;
  desc: string;
  deliverables: string[];
};

export const SOLUTIONS: SolutionTrack[] = [
  {
    title: "Custom Software & Workflow Automation",
    code: "SVC/01",
    buyer: "Operations & Product Leaders",
    tagline: "Replace manual spreadsheets and brittle legacy tools with reliable software built around your process.",
    desc: "We design, build, and deploy full-stack web applications, multi-tenant SaaS products, and internal operational systems with clean APIs, role-based access control, and automated testing.",
    deliverables: ["Custom Web & SaaS Platforms", "API & ERP Integrations", "Role-Based Portals", "Automated Audit Trails"],
  },
  {
    title: "Private Document AI & Deterministic Scoring",
    code: "SVC/02",
    buyer: "Knowledge, EdTech & Compliance Teams",
    tagline: "Put AI to work on your own data with cited answers and fair, repeatable scoring.",
    desc: "We engineer private retrieval pipelines (hybrid keyword + semantic search with source citations) and deterministic mathematical engines (such as Bayesian IRT psychometrics) that run on your cloud or local hardware.",
    deliverables: ["Cited Document Search", "Source Verification", "Bayesian IRT Engines", "Local / On-Prem LLM Runtimes"],
  },
  {
    title: "AppSec Automation & Vulnerability Triage",
    code: "SVC/03",
    buyer: "CTOs, CISOs & Engineering Teams",
    tagline: "Stop drowning in scanner noise — prioritize the vulnerabilities that are actually reachable in your code.",
    desc: "We integrate automated security scanning into your CI/CD pipeline and correlate findings against CISA KEV, EPSS exploit scores, and dependency call-graph reachability.",
    deliverables: ["Multi-Scanner CI/CD Pipelines", "Call-Graph Reachability Triage", "Zero-Trust API Hardening", "Pre-Audit Remediation"],
  },
  {
    title: "Offline Document OCR & Digital Preservation",
    code: "SVC/04",
    buyer: "Universities, Archives & Regulated Enterprises",
    tagline: "Convert physical scans and legacy PDFs into searchable, ISO-compliant archives on your own hardware.",
    desc: "We build privacy-first digitisation workflows that combine optical character recognition, human-in-the-loop review, metadata cataloguing, and ISO PDF/A archival packaging without third-party cloud exposure.",
    deliverables: ["Offline OCR Pipelines", "Metadata & Cataloguing UI", "ISO PDF/A Packaging", "Local Search Indexing"],
  },
  {
    title: "Cloud Modernization & High-Throughput Telemetry",
    code: "SVC/05",
    buyer: "FinTech, SaaS & Infrastructure Teams",
    tagline: "Scale multi-tenant cloud workloads with strict tenant isolation and real-time operational telemetry.",
    desc: "We modernize legacy monoliths using Kubernetes, PostgreSQL Row-Level Security (RLS), high-throughput event streams, and spatiotemporal forecasting models.",
    deliverables: ["Multi-Tenant Database RLS", "High-Throughput Telemetry", "Spatiotemporal Forecasting", "Kubernetes & AWS Automation"],
  },
];

export const ENGAGEMENT_MODELS = [
  {
    title: "2-Week Problem Discovery Sprint",
    desc: "A fixed-scope sprint to diagnose a high-cost bottleneck, validate feasibility with a working prototype or architecture blueprint, and give you a clear implementation plan.",
    badge: "Fixed Scope · 2 Weeks",
  },
  {
    title: "Architecture & Security Audit",
    desc: "An independent engineering review of your codebase, CVE reachability, tenant isolation boundaries, performance bottlenecks, and cloud infrastructure costs.",
    badge: "Advisory · 2–3 Weeks",
  },
  {
    title: "Turnkey Engineering Build",
    desc: "End-to-end delivery of custom software, private AI pipelines, or cloud modernizations with weekly milestone demos and 100% IP transfer to your team.",
    badge: "Full Delivery · 4–12 Weeks",
  },
];

export const SECURITY_SURFACES = ["Application", "Identity", "Data", "Cloud", "Infrastructure"];
export const SECURITY_OPS = ["Discovery", "Reachability", "Verification", "Hardening", "Response"];

export const ETHOS_PRINCIPLES = [
  {
    num: "01",
    tag: "Determinism & Rigor",
    title: "Problem first, technology second",
    desc: "We never force a trendy tool onto a business problem. When a deterministic rule or SQL query is better than an LLM, we tell you — and when AI is needed, we pair it with cited sources and verifiable math.",
    metric: "Verifiable & Repeatable",
  },
  {
    num: "02",
    tag: "Zero-Trust & Local-First",
    title: "Privacy and security by default",
    desc: "Every API endpoint, database schema, and document workflow is architected with zero-trust tenant isolation, reachability validation, and local-first privacy from day one.",
    metric: "Zero Data Egress Options",
  },
  {
    num: "03",
    tag: "Open Standards",
    title: "100% client IP and portability",
    desc: "From preservation-ready ISO PDF/A packages to standard Docker containers, PostgreSQL schemas, and open model weights, you own the code and can run it anywhere.",
    metric: "No Vendor Lock-In",
  },
  {
    num: "04",
    tag: "Production Discipline",
    title: "Built to hold up under load",
    desc: "We engineer systems for real operational conditions — high-concurrency traffic, messy scanned PDFs, strict compliance audits, and predictable cloud budgets.",
    metric: "Production-Grade Delivery",
  },
];

export const ABOUT_STATS = [
  { value: "2026", label: "Incorporated", detail: "Registered Private Limited (IN)" },
  { value: "Coimbatore", label: "Engineering HQ", detail: "Tamil Nadu, India (UTC+5:30)" },
  { value: "100%", label: "Client IP Ownership", detail: "Full source & runbook handover" },
  { value: "1 Day", label: "Reply SLA", detail: "Direct architect response" },
];

export const ABOUT_CAPABILITIES = [
  {
    code: "CAP/01",
    title: "Cited AI & Deterministic Scoring",
    desc: "Hybrid keyword + vector search with page citations, Bayesian psychometric scoring, and private LLM deployment.",
  },
  {
    code: "CAP/02",
    title: "AppSec & Reachability Triage",
    desc: "Multi-scanner orchestration correlated with CISA KEV, EPSS probabilities, and AST dependency reachability.",
  },
  {
    code: "CAP/03",
    title: "Local-First & Archival Systems",
    desc: "Offline OCR pipelines, human-in-the-loop cataloguing, and ISO-compliant PDF/A digital preservation.",
  },
  {
    code: "CAP/04",
    title: "Cloud & Spatiotemporal Systems",
    desc: "Multi-tenant cloud infrastructure, high-throughput telemetry streams, and 100-metre environmental forecasting.",
  },
];

export const ABOUT_FOCUS = [
  "Custom Software",
  "Private AI & Cited Search",
  "Application Security",
  "Data & OCR Pipelines",
  "Spatiotemporal Forecasting",
  "Cloud Infrastructure",
];

export type TeamMember = {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  focus: string[];
  linkedin: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Karthikeyan T",
    role: "Founder & Lead Systems Architect",
    credentials: "Systems Architecture · Applied AI · Application Security",
    bio: "Founded NEXMANCER to help businesses solve high-consequence engineering problems without agency bloat or black-box AI hype. Leads system architecture across verifiable AI, vulnerability reachability, local-first archival systems, and cloud-native platforms.",
    focus: ["System Architecture", "Cited RAG & Bayesian Models", "AppSec & Reachability", "Full-Stack Engineering"],
    linkedin: "https://www.linkedin.com/in/carthworks",
  },
];

export type CaseStudy = {
  id: string;
  tag: string;
  clientType: string;
  title: string;
  summary: string;
  problem: string;
  architecture: string;
  stack: string[];
  metrics: { value: string; label: string; detail: string }[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "reachability-triage",
    tag: "Security × Automation",
    clientType: "SaaS & Cloud Engineering Teams",
    title: "Eliminating CVE alert fatigue with call-graph reachability",
    summary:
      "Built an automated vulnerability triage pipeline that combines five open scanners with exploit telemetry and code reachability so engineers fix real risks instead of chasing false positives.",
    problem:
      "Security and engineering teams were overwhelmed by thousands of unranked scanner findings across containers, dependencies, secrets, and network ports — spending days manually cross-checking CVEs that were never actually called in production code.",
    architecture:
      "Orchestrated Nuclei, Trivy, Gitleaks, Opengrep, and Nmap into a unified ingestion pipeline that cross-references every CVE against CISA KEV and EPSS scores, parses AST call-graphs to verify dependency reachability, and generates plain-English remediation briefs.",
    stack: ["Python", "TypeScript", "Nuclei & Trivy", "CISA KEV / EPSS", "Docker", "Linux"],
    metrics: [
      { value: "5 → 1", label: "Unified Scanner Stream", detail: "Code, secrets, containers & network" },
      { value: "Reachable", label: "Exploit Prioritization", detail: "Filtered by AST call-graph usage" },
      { value: "Plain-English", label: "Remediation Briefs", detail: "Actionable context for developers" },
    ],
  },
  {
    id: "deterministic-grading",
    tag: "Verifiable AI",
    clientType: "EdTech, Universities & Certification Bodies",
    title: "Deterministic psychometric grading for high-stakes assessments",
    summary:
      "Paired generative AI curriculum creation with a deterministic Bayesian Item Response Theory (IRT) scoring engine so adaptive assessments remain fair, auditable, and repeatable.",
    problem:
      "Assessment providers wanted to generate adaptive tests across arbitrary subjects using LLMs, but pure LLM grading introduced non-deterministic score drift and couldn't satisfy psychometric auditability requirements.",
    architecture:
      "Separated content generation from evaluation: structured LLM pipelines author calibrated question banks with rubric constraints, while a deterministic Bayesian IRT engine computes ability estimates and confidence intervals after every response.",
    stack: ["Python", "TypeScript", "React", "Bayesian IRT", "PostgreSQL", "AWS"],
    metrics: [
      { value: "100%", label: "Deterministic Scoring", detail: "Zero LLM drift in final grades" },
      { value: "Adaptive", label: "Question Selection", detail: "Real-time Bayesian ability updates" },
      { value: "Auditable", label: "Psychometric Trail", detail: "Full item-response provenance" },
    ],
  },
  {
    id: "airgapped-rag",
    tag: "Private AI & Archival",
    clientType: "Regulated Enterprises, Legal & Institutional Archives",
    title: "Air-gapped document search and ISO archival for regulated teams",
    summary:
      "Engineered a local-first OCR preservation and hybrid search pipeline that turns scanned document vaults into searchable, citation-backed knowledge bases without uploading files to external clouds.",
    problem:
      "Organizations holding sensitive legal records and historical scans needed fast semantic search and long-term digital preservation, but compliance rules prohibited sending documents to third-party SaaS APIs.",
    architecture:
      "Combined an offline OCR and metadata cataloguing workflow (outputting ISO-standard PDF/A preservation packages) with a local-first hybrid BM25 + vector retrieval engine supporting on-premise LLM inference and strict paragraph-level citations.",
    stack: ["Python", "TypeScript", "Hybrid BM25 + Vector", "Ollama", "OCR & PDF/A", "Docker"],
    metrics: [
      { value: "0 Bytes", label: "External Cloud Egress", detail: "Runs 100% on local hardware" },
      { value: "ISO PDF/A", label: "Archival Compliance", detail: "Long-term preservation packages" },
      { value: "Cited", label: "Page-Level Answers", detail: "Exact keyword + semantic recall" },
    ],
  },
];
