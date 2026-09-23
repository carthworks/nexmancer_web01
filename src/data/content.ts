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
  desc: string;
  code: string;
  key: DomainKey | "platform";
  tags: string[];
  status: string;
};

export const PRODUCTS: ProductItem[] = [
  {
    name: "NX AgentForge",
    category: "AI Systems",
    desc: "Autonomous agent evaluation runtime and multi-tool orchestration framework for enterprise reasoning.",
    code: "NX/AI",
    key: "ai",
    tags: ["LLM Agents", "Python", "Tool Calling"],
    status: "Active Build",
  },
  {
    name: "SentryMesh",
    category: "Cybersecurity",
    desc: "Automated zero-trust policy validation, identity access verification, and cloud posture intelligence.",
    code: "NX/SEC",
    key: "security",
    tags: ["Cloud Security", "Zero-Trust", "Go"],
    status: "Research / Beta",
  },
  {
    name: "OmniPulse",
    category: "Data Platforms",
    desc: "Distributed event ingestion, real-time stream transformation, and predictive telemetry analytics.",
    code: "NX/DATA",
    key: "data",
    tags: ["Real-Time", "Analytics", "Kafka"],
    status: "Active Build",
  },
  {
    name: "SaaS Foundry",
    category: "Cloud Software",
    desc: "Production-ready multi-tenant application foundation with RBAC, billing, audit logging, and modern APIs.",
    code: "NX/SAAS",
    key: "cloud",
    tags: ["Next.js", "PostgreSQL", "Multi-Tenant"],
    status: "Production Ready",
  },
  {
    name: "Nexus Core",
    category: "Digital Platforms",
    desc: "High-performance API gateway, edge routing layer, and distributed microservices infrastructure.",
    code: "NX/PLATFORM",
    key: "platform",
    tags: ["Distributed APIs", "Docker", "gRPC"],
    status: "Active Build",
  },
];

export const SOLUTIONS = [
  {
    title: "Enterprise AI & Automation",
    desc: "Custom LLM integrations, autonomous task pipelines, document intelligence, and domain-adapted machine learning models grounded in your proprietary data.",
    tags: ["Agentic AI", "Model Fine-Tuning", "Automated Workflows"],
  },
  {
    title: "Zero-Trust Security & DevSecOps",
    desc: "Architectural security hardening, automated secret scanning, vulnerability assessments, and defensive engineering across cloud environments and APIs.",
    tags: ["Application Security", "Cloud Hardening", "Threat Modeling"],
  },
  {
    title: "Cloud-Native Systems & SaaS",
    desc: "High-concurrency distributed backends, serverless architectures, event-driven microservices, and robust cloud infrastructure designed for 99.99% availability.",
    tags: ["AWS / Azure", "Kubernetes", "High-Throughput APIs"],
  },
  {
    title: "Intelligent Data Platforms",
    desc: "High-throughput stream processing, unified analytical warehouses, predictive pipeline engineering, and interactive intelligence dashboards.",
    tags: ["Stream Processing", "Data Pipelines", "Forecasting"],
  },
];

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
    title: "Engineering Over Hype",
    desc: "We focus on verified system reliability, sound architecture, and measurable outcomes rather than chasing speculative technology trends.",
  },
  {
    num: "02",
    title: "Security by Default",
    desc: "Every API endpoint, database schema, and deployment pipeline is designed with zero-trust isolation and data privacy from day zero.",
  },
  {
    num: "03",
    title: "Open Standards & Portability",
    desc: "We prioritize open formats, portable cloud-native tools, and absolute client ownership over proprietary vendor lock-in.",
  },
];

export const ABOUT_FOCUS = ["Artificial Intelligence", "Cybersecurity", "Data", "Cloud", "Application Engineering"];

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
