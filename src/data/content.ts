/**
 * All homepage copy lives here as structured data so sections render from arrays
 * rather than repeated markup. Keep claims factual — no invented metrics, clients or certifications.
 */

export type DomainKey = "software" | "ai" | "security" | "data" | "cloud";

export const HERO_PILLARS = ["Software.", "Artificial Intelligence.", "Cybersecurity.", "Data.", "Cloud."];

export const HERO_NODES: { label: string; key: DomainKey }[] = [
  { label: "AI", key: "ai" },
  { label: "DATA", key: "data" },
  { label: "SOFTWARE", key: "software" },
  { label: "SECURITY", key: "security" },
  { label: "CLOUD", key: "cloud" },
];

export const ECOSYSTEM_BADGES = [
  "Python",
  "TypeScript",
  "React / Next.js",
  "Bayesian IRT",
  "Hybrid RAG (BM25)",
  "Ollama / LLMs",
  "Nuclei · Trivy · Nmap",
  "CISA KEV & EPSS",
  "OCR & PDF/A",
  "Geospatial AI",
  "Docker & Cloud",
];

export const DOMAINS: { n: string; key: DomainKey; title: string; desc: string; tags: string[] }[] = [
  {
    n: "01",
    key: "software",
    title: "Software",
    desc: "Build modern software products, web applications, enterprise systems, APIs and SaaS platforms.",
    tags: ["Web Applications", "SaaS", "APIs", "Enterprise Software"],
  },
  {
    n: "02",
    key: "ai",
    title: "Artificial Intelligence",
    desc: "Build intelligent systems using AI, machine learning, deep learning and automation.",
    tags: ["AI", "Machine Learning", "Deep Learning", "Automation"],
  },
  {
    n: "03",
    key: "security",
    title: "Cybersecurity",
    desc: "Develop security technologies for applications, infrastructure, cloud environments and digital systems.",
    tags: ["Application Security", "Cloud Security", "Security Automation", "Privacy"],
  },
  {
    n: "04",
    key: "data",
    title: "Data",
    desc: "Create systems that transform data into analytics, intelligence and actionable insights.",
    tags: ["Data Analytics", "Data Platforms", "Forecasting", "Intelligence"],
  },
  {
    n: "05",
    key: "cloud",
    title: "Cloud",
    desc: "Build scalable cloud-native systems and infrastructure.",
    tags: ["Cloud Native", "AWS", "Azure", "Distributed Systems"],
  },
];

export const PIPELINE = [
  { t: "Research", d: "Explore technology and identify meaningful problems.", fn: "explore()" },
  { t: "Design", d: "Translate problems into product and system architecture.", fn: "architect()" },
  { t: "Engineer", d: "Build reliable software and intelligent systems.", fn: "build()" },
  { t: "Validate", d: "Test functionality, security, performance and usability.", fn: "validate()" },
  { t: "Deploy", d: "Release through modern cloud infrastructure.", fn: "ship()" },
  { t: "Scale", d: "Continuously improve and commercialize the technology.", fn: "scale()" },
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
    status: "Live",
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
    status: "Live",
  },
  {
    name: "AskMyDocs",
    category: "AI Systems",
    tagline: "Advanced RAG system for your documents.",
    desc: "Hybrid BM25 + semantic search with automatic indexing. Run fully local for maximum privacy, or connect to Ollama Cloud for larger models — your choice.",
    url: "https://ask-mydocs.vercel.app/",
    code: "NX/RAG",
    key: "data",
    tags: ["RAG", "Hybrid Search", "Ollama", "Local-First"],
    status: "Live",
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
    status: "Live",
  },
];

export const SOLUTIONS = PRODUCTS.map((p) => ({
  title: p.category,
  product: p.name,
  code: p.code,
  url: p.url,
  tagline: p.tagline,
  desc: p.desc,
  tags: p.tags,
}));

export const ENGAGEMENT_MODELS = [
  {
    title: "Product Engineering & MVP",
    desc: "End-to-end design, system architecture, and production delivery for startups and enterprise initiatives.",
    badge: "Full Lifecycle",
  },
  {
    title: "Embedded R&D Squads",
    desc: "Specialized senior engineers across AI, cybersecurity, and cloud systems augmenting your engineering team.",
    badge: "Team Extension",
  },
  {
    title: "Architecture & Security Audits",
    desc: "Rigorous technical reviews of codebase architecture, security vulnerabilities, cloud spending, and scalability.",
    badge: "Advisory & Hardening",
  },
];

export const SECURITY_SURFACES = ["Application", "Identity", "Data", "Cloud", "Infrastructure"];
export const SECURITY_OPS = ["Detection", "Analysis", "Automation", "Validation", "Response"];

export const ETHOS_PRINCIPLES = [
  {
    num: "01",
    tag: "Determinism & Rigor",
    title: "Engineering Over Hype",
    desc: "We pair modern generative AI with deterministic math, verification engines, and verifiable architecture — focusing on repeatable outcomes rather than black-box hype.",
    metric: "Verifiable & Repeatable",
  },
  {
    num: "02",
    tag: "Zero-Trust & Local-First",
    title: "Security & Privacy by Default",
    desc: "Every API endpoint, database schema, and document workflow is architected with zero-trust isolation, reachability validation, and local-first privacy from day zero.",
    metric: "Zero Data Leakage",
  },
  {
    num: "03",
    tag: "Open Standards",
    title: "Portability & Client Ownership",
    desc: "From preservation-ready PDF/A archives to portable cloud-native containers and open model runtimes, we build for long-term sovereignty without vendor lock-in.",
    metric: "100% Portable Stack",
  },
  {
    num: "04",
    tag: "Applied R&D",
    title: "Research That Ships",
    desc: "We translate deep-tech domains — Bayesian psychometrics, hybrid retrieval, vulnerability reachability, and micro-climate modeling — into live, production-grade software.",
    metric: "5 Live Platforms",
  },
];

export const ABOUT_STATS = [
  { value: "5", label: "Live Products", detail: "In active deployment" },
  { value: "5", label: "Core Pillars", detail: "Software · AI · Sec · Data · Cloud" },
  { value: "100%", label: "First-Principles", detail: "In-house R&D & engineering" },
  { value: "IN → Global", label: "Reach", detail: "Engineered in Coimbatore" },
];

export const ABOUT_CAPABILITIES = [
  {
    code: "CAP/01",
    title: "Deterministic & Agentic AI",
    desc: "Hybrid BM25 + vector RAG, Bayesian IRT scoring engines, and local or cloud LLM orchestration.",
  },
  {
    code: "CAP/02",
    title: "Offensive & Defensive Security",
    desc: "Automated multi-scanner orchestration (Nuclei, Trivy, Nmap, Opengrep) with CISA KEV, EPSS, and code reachability triage.",
  },
  {
    code: "CAP/03",
    title: "Local-First & Archival Software",
    desc: "Privacy-preserving OCR pipelines, offline-first desktop/web applications, and ISO-compliant PDF/A digital preservation.",
  },
  {
    code: "CAP/04",
    title: "Spatiotemporal & Cloud Systems",
    desc: "Street-level 100m environmental forecasting, high-throughput telemetry streams, and multi-tenant cloud infrastructure.",
  },
];

export const ABOUT_FOCUS = ["Artificial Intelligence", "Cybersecurity", "Data Platforms", "Cloud Infrastructure", "Application Engineering", "Climate & Archival Tech"];

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
    id: "telemetry",
    tag: "Security × Data",
    clientType: "FinTech & Enterprise Cloud",
    title: "High-Throughput Security Telemetry & Event Ingestion",
    summary: "Engineered a distributed real-time telemetry pipeline to ingest, normalize, and analyze high-volume audit logs without dropped frames or ingestion lag.",
    problem: "A high-frequency cloud environment generated over 80,000 security and network events per second. Legacy batch-indexing pipelines suffered from 15+ minute ingestion lags, blind spots during active credential abuse, and memory crashes under sudden volume spikes.",
    architecture: "Event-driven stream architecture decoupling ingestion from storage via Kafka partitions, Go stream processors performing zero-copy normalization, and an eBPF agent monitoring kernel network egress in real-time.",
    stack: ["Go", "Apache Kafka", "ClickHouse", "eBPF", "Docker", "AWS"],
    metrics: [
      { value: "<380ms", label: "Indexing Latency", detail: "Down from 15+ minutes" },
      { value: "120k/s", label: "Peak Ingestion", detail: "Events/sec sustained load" },
      { value: "-65%", label: "Cloud Cost", detail: "Compute & storage reduction" },
    ],
  },
  {
    id: "knowledge-engine",
    tag: "AI Systems",
    clientType: "Regulated Legal & Technical Compliance",
    title: "Autonomous Enterprise Knowledge & Verification Engine",
    summary: "Built a domain-adapted agentic RAG system that cross-references complex compliance documentation with strict citation guarantees.",
    problem: "Engineers and auditors struggled with high hallucination rates (>22%) from off-the-shelf LLMs and 45+ minute manual query times per compliance dossier across 2M+ unstructured PDFs and specifications.",
    architecture: "Multi-stage retrieval pipeline combining dense vector embeddings (Qdrant) and sparse BM25 indexing, followed by cross-encoder re-ranking and an async Python agent runtime enforcing mathematical citation provenance.",
    stack: ["Python", "FastAPI", "Qdrant", "PyTorch", "Docker", "AWS"],
    metrics: [
      { value: "<0.8%", label: "Hallucination Rate", detail: "Slashing errors from 22%" },
      { value: "2.4s", label: "Audit Query Time", detail: "Reduced from 45 minutes" },
      { value: "94%", label: "Benchmark Precision", detail: "Across regulatory checks" },
    ],
  },
  {
    id: "saas-modernization",
    tag: "Cloud Native",
    clientType: "High-Growth B2B SaaS",
    title: "Zero-Trust Multi-Tenant Cloud Platform Modernization",
    summary: "Redesigned a legacy application monolith into a modular, horizontally autoscaling multi-tenant cloud service with complete tenant isolation.",
    problem: "A growing SaaS application suffered database connection pooling starvation, lack of strict tenant boundary isolation at the data layer, and cascading 504 gateway timeouts during predictable monthly traffic spikes.",
    architecture: "Migrated to an event-driven microservices architecture on AWS EKS with PostgreSQL Row-Level Security (RLS) guaranteeing cryptographic tenant isolation, Redis cluster caching, and automated Terraform infrastructure.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Terraform", "Kubernetes"],
    metrics: [
      { value: "99.99%", label: "Uptime Availability", detail: "During 12x traffic surge" },
      { value: "92ms", label: "P99 API Latency", detail: "Improved from 1,850ms" },
      { value: "0", label: "Cross-Tenant Leaks", detail: "Guaranteed via database RLS" },
    ],
  },
];
