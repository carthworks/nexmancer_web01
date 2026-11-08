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
    category: "Workflow & Custom Apps",
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
    method: "Private document search and repeatable grading engines running on your own cloud or local hardware.",
    timeline: "2-week sprint · 6-week rollout",
    key: "ai",
  },
  {
    code: "NX/SEC",
    name: "Secure Architecture",
    category: "Security & Alert Triage",
    problem: "“Security scanners dump thousands of alerts a week and engineers don’t know what’s actually exploitable.”",
    outcome: "Your developers fix the real security risks first and spend far less time chasing false alarms before audits.",
    method: "Automated vulnerability triage that checks whether a flagged dependency is actually used in your code.",
    timeline: "2–4 week integration",
    key: "security",
  },
  {
    code: "NX/DATA",
    name: "Data & Forecasting",
    category: "Document Digitisation & Early Alerts",
    problem: "“Important records are locked in scanned PDFs, or operational data arrives too late to act on.”",
    outcome: "Scanned files become searchable archives on your own machines, and field teams get early risk alerts.",
    method: "Offline document digitisation into searchable PDF/A files and early operational or street-level risk alerts.",
    timeline: "3–6 week deployment",
    key: "data",
  },
  {
    code: "NX/CLOUD",
    name: "Cloud Systems",
    category: "Reliable Multi-Tenant Cloud",
    problem: "“Our platform slows down during traffic spikes, and enterprise buyers ask for strict tenant isolation.”",
    outcome: "Your product stays fast under peak load with provable separation between every customer’s data.",
    method: "Strict customer data separation, background queues, and autoscaling cloud infrastructure.",
    timeline: "4–8 week modernization",
    key: "cloud",
  },
];

export const HERO_BUYER_BADGES = [
  "Indian SMEs",
  "Funded Startups",
  "Universities & Archives",
  "Regulated Enterprises",
  "100% Client IP Ownership",
  "Local-First & On-Prem Ready",
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

export type ServiceSlug =
  | "custom-software"
  | "ai-and-automation"
  | "security-architecture"
  | "document-digitisation"
  | "cloud-infrastructure";

export type SolutionTrack = {
  slug: ServiceSlug;
  title: string;
  code: string;
  buyer: string;
  timeline: string;
  tagline: string;
  desc: string;
  problemStatement: string;
  architecture: string;
  deliverables: string[];
  outcomes: string[];
  stack: string[];
  faqs: { q: string; a: string }[];
};

export const SOLUTIONS: SolutionTrack[] = [
  {
    slug: "custom-software",
    title: "Custom Software & Workflow Automation",
    code: "SVC/01",
    buyer: "Operations & Product Leaders",
    timeline: "4–8 week build",
    tagline: "Replace manual spreadsheets and brittle legacy tools with reliable software built around your process.",
    desc: "We design, build, and deploy full-stack web applications, multi-tenant SaaS products, and internal operational systems with clean APIs, role-based access control, and automated testing.",
    problemStatement:
      "Growing teams lose hundreds of hours a month copying data between spreadsheets, PDFs, email threads, and rigid off-the-shelf SaaS tools that don't match how their operations actually run.",
    architecture:
      "We architect modular TypeScript/React frontends paired with strongly typed Node.js/Python APIs and PostgreSQL schemas, complete with role-based permissions, webhook integrations, and immutable audit logs.",
    deliverables: ["Custom Web & SaaS Platforms", "API & ERP Integrations", "Role-Based Portals", "Automated Audit Trails"],
    outcomes: [
      "Single auditable system of record across teams and branches",
      "Sharp reduction in manual re-entry and spreadsheet reconciliation errors",
      "100% source code, database schema, and CI/CD runbook ownership",
    ],
    stack: ["TypeScript", "React", "Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
    faqs: [
      {
        q: "How do we start if our requirements aren't fully specified yet?",
        a: "We begin with a fixed-scope 2-Week Problem Discovery Sprint to map your existing workflow, build an interactive prototype, and lock down the exact schema and milestone plan before full engineering starts.",
      },
      {
        q: "Who owns the source code and intellectual property?",
        a: "Your organization owns 100% of the custom source code, database migrations, and deployment runbooks upon milestone completion, with zero recurring licensing lock-in.",
      },
    ],
  },
  {
    slug: "ai-and-automation",
    title: "Private Document AI & Deterministic Scoring",
    code: "SVC/02",
    buyer: "Knowledge, EdTech & Compliance Teams",
    timeline: "2-week sprint · 6-week rollout",
    tagline: "Put AI to work on your own data with cited answers and fair, repeatable scoring.",
    desc: "We engineer private retrieval pipelines (hybrid keyword + semantic search with source citations) and deterministic mathematical engines (such as Bayesian IRT psychometrics) that run on your cloud or local hardware.",
    problemStatement:
      "Generic chatbots guess when they don't know an answer, fail to cite exact clauses or page numbers, and require uploading confidential documents or student assessments to external third-party APIs.",
    architecture:
      "We pair hybrid BM25 lexical + dense vector retrieval with strict citation verification and deterministic scoring engines (like Bayesian Item Response Theory), deployed inside your private cloud VPC or local Ollama runtime.",
    deliverables: ["Cited Document Search", "Source Verification", "Bayesian IRT Engines", "Local / On-Prem LLM Runtimes"],
    outcomes: [
      "Every AI response cites the exact source document, page, and paragraph",
      "Deterministic, repeatable scoring for high-stakes assessments and audits",
      "Zero confidential data leaves your VPC or on-premise hardware",
    ],
    stack: ["Python", "TypeScript", "Hybrid BM25 + Vector", "Bayesian IRT", "Ollama", "PostgreSQL", "Docker"],
    faqs: [
      {
        q: "How do you prevent the AI from making up answers?",
        a: "We enforce retrieval-grounded generation where answers are synthesized strictly from retrieved document chunks above a relevance threshold, and every claim is linked to its source page for instant human verification.",
      },
      {
        q: "Can this run completely offline or inside our own AWS/on-prem servers?",
        a: "Yes. We deploy local-first retrieval and open-weight model runtimes (via Ollama or vLLM) so zero bytes of your data are ever sent to external model providers.",
      },
    ],
  },
  {
    slug: "security-architecture",
    title: "AppSec Automation & Vulnerability Triage",
    code: "SVC/03",
    buyer: "CTOs, CISOs & Engineering Teams",
    timeline: "2–4 week integration",
    tagline: "Stop drowning in scanner noise — prioritize the vulnerabilities that are actually reachable in your code.",
    desc: "We integrate automated security scanning into your CI/CD pipeline and correlate findings against CISA KEV, EPSS exploit scores, and dependency call-graph reachability.",
    problemStatement:
      "Standard security scanners dump thousands of unranked CVEs across containers, packages, and repositories every week, leaving developers unsure which alerts are genuinely exploitable in production.",
    architecture:
      "We unify multi-scanner outputs (Nuclei, Trivy, Gitleaks, Opengrep, Nmap), enrich every CVE with CISA Known Exploited Vulnerabilities (KEV) and EPSS probability telemetry, and analyze AST call graphs to verify whether vulnerable functions are actually invoked.",
    deliverables: ["Multi-Scanner CI/CD Pipelines", "Call-Graph Reachability Triage", "Zero-Trust API Hardening", "Pre-Audit Remediation"],
    outcomes: [
      "Eliminate false-positive alert fatigue by filtering out unreachable dependency CVEs",
      "Plain-English remediation briefs that developers can act on immediately",
      "Hardened API boundaries, secret scanning, and audit-ready security evidence",
    ],
    stack: ["Python", "TypeScript", "Nuclei", "Trivy", "Gitleaks", "Opengrep", "CISA KEV / EPSS", "Linux"],
    faqs: [
      {
        q: "Does this replace our existing scanners or work alongside them?",
        a: "Both. We can deploy a complete open-source scanner suite in your CI/CD pipeline or ingest findings from your existing tools to add reachability analysis and CISA KEV / EPSS prioritization.",
      },
      {
        q: "Will our source code leave our environment during scanning?",
        a: "No. All AST reachability checks and vulnerability scans run inside your own CI runners or private container environment.",
      },
    ],
  },
  {
    slug: "document-digitisation",
    title: "Offline Document OCR & Digital Preservation",
    code: "SVC/04",
    buyer: "Universities, Archives & Regulated Enterprises",
    timeline: "3–6 week deployment",
    tagline: "Convert physical scans and legacy PDFs into searchable, ISO-compliant archives on your own hardware.",
    desc: "We build privacy-first digitisation workflows that combine optical character recognition, human-in-the-loop review, metadata cataloguing, and ISO PDF/A archival packaging without third-party cloud exposure.",
    problemStatement:
      "Decades of historical manuscripts, legal contracts, and institutional records sit locked in unsearchable scanned folders because privacy rules or bandwidth limits prevent uploading them to cloud OCR services.",
    architecture:
      "We deploy an offline-first OCR and document processing workstation pipeline with side-by-side human proofreading, structured Dublin Core / institutional metadata tagging, and automated ISO PDF/A preservation packaging.",
    deliverables: ["Offline OCR Pipelines", "Metadata & Cataloguing UI", "ISO PDF/A Packaging", "Local Search Indexing"],
    outcomes: [
      "100% local processing with zero document uploads to external clouds",
      "Preservation-ready ISO PDF/A packages with embedded searchable text layers",
      "Fast full-text and metadata search across thousands of archival records",
    ],
    stack: ["Python", "TypeScript", "React", "Offline OCR", "ISO PDF/A", "Local Search Index", "Docker"],
    faqs: [
      {
        q: "Does the digitisation workflow require an internet connection?",
        a: "No. The entire OCR, proofreading, metadata cataloguing, and PDF/A export pipeline is engineered to run on air-gapped workstations or local campus servers.",
      },
      {
        q: "Can staff review and correct OCR text before final archival?",
        a: "Yes. We include a side-by-side human-in-the-loop review interface so archivists and operators can verify text accuracy and add catalogue metadata before generating the final PDF/A package.",
      },
    ],
  },
  {
    slug: "cloud-infrastructure",
    title: "Cloud Modernization & High-Throughput Telemetry",
    code: "SVC/05",
    buyer: "FinTech, SaaS & Infrastructure Teams",
    timeline: "4–8 week modernization",
    tagline: "Scale multi-tenant cloud workloads with strict tenant isolation and real-time operational telemetry.",
    desc: "We modernize legacy monoliths using Kubernetes, PostgreSQL Row-Level Security (RLS), high-throughput event streams, and spatiotemporal forecasting models.",
    problemStatement:
      "Growing SaaS platforms hit database contention during peak loads, struggle to prove cryptographic and row-level tenant isolation to enterprise buyers, or receive sensor/risk telemetry too late to trigger automated action.",
    architecture:
      "We re-architect data layers with PostgreSQL Row-Level Security (RLS), partition high-volume telemetry streams, and deploy containerized services on AWS and Kubernetes with automated observability and cost controls.",
    deliverables: ["Multi-Tenant Database RLS", "High-Throughput Telemetry", "Spatiotemporal Forecasting", "Kubernetes & AWS Automation"],
    outcomes: [
      "Provable database-level tenant isolation for enterprise security reviews",
      "Predictable latency and autoscaling during high-concurrency traffic spikes",
      "Real-time operational and geospatial risk alerts from streaming telemetry",
    ],
    stack: ["AWS", "Kubernetes", "Docker", "PostgreSQL RLS", "Python", "Node.js", "Linux"],
    faqs: [
      {
        q: "Can you modernize our database and cloud architecture without downtime?",
        a: "Yes. We use phased schema migrations, dual-write validation, and blue/green container deployments so production traffic continues uninterrupted during modernization.",
      },
      {
        q: "How do you enforce multi-tenant data isolation?",
        a: "Beyond application-layer checks, we implement PostgreSQL Row-Level Security (RLS) policies tied to verified session contexts so a query can never accidentally read another tenant's rows.",
      },
    ],
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

  // {
  //   name: "Karthikeyan T",
  //   role: "Founder & Lead Systems Architect",
  //   credentials: "Systems Architecture · Applied AI · Application Security",
  //   bio: "Founded NEXMANCER to help businesses solve high-consequence engineering problems without agency bloat or black-box AI hype. Leads system architecture across verifiable AI, vulnerability reachability, local-first archival systems, and cloud-native platforms.",
  //   focus: ["System Architecture", "Cited RAG & Bayesian Models", "AppSec & Reachability", "Full-Stack Engineering"],
  //   linkedin: "https://www.linkedin.com/in/carthworks",
  // },
];

export type CaseStudySlug = "reachability-triage" | "deterministic-grading" | "airgapped-rag";

export type CaseStudy = {
  id: CaseStudySlug;
  tag: string;
  clientType: string;
  title: string;
  summary: string;
  problem: string;
  architecture: string;
  stack: string[];
  metrics: { value: string; label: string; detail: string }[];
  challengeDetails: string[];
  approachSteps: { step: string; title: string; desc: string }[];
  verification: string;
  relatedPlatforms: { name: string; role: string; url: string; status: string }[];
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
    challengeDetails: [
      "Disparate JSON/SARIF outputs from container, SAST, secret, and network scanners created duplicate and conflicting tickets.",
      "Over 80% of flagged transitive dependency CVEs lived in unused code paths that could never be triggered at runtime.",
      "Developers lacked clear exploitability context, delaying release sign-offs and compliance audits.",
    ],
    approachSteps: [
      {
        step: "01 · Multi-Scanner Ingestion",
        title: "Normalize findings across code, containers, secrets & ports",
        desc: "Aggregated Nuclei, Trivy, Gitleaks, Opengrep, and Nmap outputs into a single deduplicated schema with asset and repository lineage.",
      },
      {
        step: "02 · Threat Telemetry & AST Reachability",
        title: "Correlate CISA KEV, EPSS, and call-graph execution paths",
        desc: "Matched every CVE against CISA Known Exploited Vulnerabilities and EPSS probability feeds while parsing source ASTs to check if vulnerable symbols are actually imported and called.",
      },
      {
        step: "03 · Developer-Ready Remediation",
        title: "Generate plain-English fix briefs for engineering teams",
        desc: "Replaced cryptic scanner dumps with ranked remediation cards showing exact file paths, upgrade targets, and exploitability rationale.",
      },
    ],
    verification:
      "Verified against real-world multi-service repositories containing known reachable and unreachable CVEs, confirming deterministic separation of active exploit paths from dormant transitive packages.",
    relatedPlatforms: [
      {
        name: "SigmaSec",
        role: "Reference AppSec & Reachability Triage Platform",
        url: "https://sigmasec.vercel.app/",
        status: "Live Demo",
      },
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
    challengeDetails: [
      "Prompt-based LLM scoring produced different grades on identical student submissions across runs.",
      "Static fixed-form tests were either too easy for advanced candidates or too punishing for foundational learners.",
      "Institutional auditors required mathematically reproducible ability scores and standard error bounds.",
    ],
    approachSteps: [
      {
        step: "01 · Constrained Curriculum Synthesis",
        title: "Use generative AI strictly for structured item authoring",
        desc: "Engineered schema-validated generation pipelines that author multi-difficulty questions, distractors, and difficulty parameters without touching final score calculation.",
      },
      {
        step: "02 · Bayesian IRT Evaluation Engine",
        title: "Update candidate ability estimates deterministically",
        desc: "Implemented a Bayesian Item Response Theory (IRT) engine that recalculates latent trait (theta) posterior distributions and selects the next maximally informative question in real time.",
      },
      {
        step: "03 · Psychometric Audit Ledger",
        title: "Record full item-response provenance",
        desc: "Stored every item parameter, response latency, and posterior update in PostgreSQL so any assessment result can be independently re-computed and verified.",
      },
    ],
    verification:
      "Validated repeatability by replaying identical response vectors across thousands of simulated test sessions, confirming zero variance in computed ability scores and confidence intervals.",
    relatedPlatforms: [
      {
        name: "Sensighty",
        role: "Live Adaptive Learning & Psychometric Assessment Platform",
        url: "https://sensighty.nexmancer.com/",
        status: "Live",
      },
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
    challengeDetails: [
      "Legacy scanned PDFs lacked embedded text layers, making exact legal clause or catalogue lookups impossible.",
      "Pure vector search missed exact statute numbers, contract IDs, and proper nouns critical to legal and archival teams.",
      "Data sovereignty mandates required 100% offline execution on workstation or campus hardware.",
    ],
    approachSteps: [
      {
        step: "01 · Offline OCR & Human Proofreading",
        title: "Digitise scans into ISO PDF/A archival packages",
        desc: "Built a local workstation pipeline that extracts text from scans, provides side-by-side human review and metadata cataloguing, and exports self-contained ISO PDF/A files.",
      },
      {
        step: "02 · Hybrid Lexical + Semantic Indexing",
        title: "Combine BM25 keyword precision with dense vector recall",
        desc: "Indexed document chunks using reciprocal rank fusion over BM25 and local embeddings so both exact reference codes and conceptual queries surface accurately.",
      },
      {
        step: "03 · Cited Local Inference",
        title: "Synthesize answers with mandatory page and paragraph links",
        desc: "Connected the retrieval index to local Ollama models (with optional private cloud fallback) that cite the exact document and page for every statement.",
      },
    ],
    verification:
      "Verified zero network egress under firewall packet inspection while benchmarking exact-match legal identifier recall and page-citation accuracy across multi-hundred-page PDF vaults.",
    relatedPlatforms: [
      {
        name: "AskMyDocs",
        role: "Reference Hybrid BM25 + Vector Cited Search Platform",
        url: "https://ask-mydocs.vercel.app/",
        status: "Live Demo",
      },
      {
        name: "LibraDigit",
        role: "Reference Offline OCR & ISO PDF/A Preservation Suite",
        url: "https://libra-digit-ai.vercel.app/",
        status: "Live Demo",
      },
    ],
  },
];

export type InsightSlug =
  | "cited-private-rag"
  | "reachability-cve-triage"
  | "offline-ocr-pdfa-archival";

export type InsightArticle = {
  slug: InsightSlug;
  code: string;
  category: string;
  title: string;
  subtitle: string;
  published: string;
  readTime: string;
  author: string;
  summary: string;
  takeaways: string[];
  sections: { heading: string; body: string[] }[];
  relatedServiceSlug: ServiceSlug;
  relatedCaseStudySlug: CaseStudySlug;
};

export const INSIGHTS: InsightArticle[] = [
  {
    slug: "cited-private-rag",
    code: "ENG/01",
    category: "Private AI & Retrieval",
    title: "Why generic chatbots fail on enterprise documents — and how hybrid BM25 + vector search fixes it",
    subtitle: "A practical architecture guide for compliance, legal, and knowledge teams that need verifiable answers from internal files without leaking data.",
    published: "November 2026",
    readTime: "6 min read",
    author: "NEXMANCER Systems Architecture Team",
    summary:
      "Out-of-the-box LLM wrappers struggle with exact part numbers, legal clauses, and audit traceability. Combining lexical BM25 search with dense vector embeddings and strict page-level citations solves both accuracy and compliance.",
    takeaways: [
      "Pure vector similarity often misses exact contract clauses, SKU codes, and statute numbers — pair it with BM25 lexical search via Reciprocal Rank Fusion (RRF).",
      "Enforce retrieval-only synthesis: if retrieved chunks fall below a relevance floor, the system should explicitly abstain rather than guess.",
      "Run embeddings and LLM inference locally (via Ollama or private VPC endpoints) so confidential PDFs never leave your infrastructure.",
    ],
    sections: [
      {
        heading: "1. The two failure modes of naive RAG pipelines",
        body: [
          "When organizations connect a generic chatbot to an internal folder of PDFs, two problems appear within the first week. First, dense vector embeddings compress paragraphs into semantic vectors that blur exact identifiers — ask for 'Clause 14.2(b)' or 'Policy IND-2026-09' and a pure vector index frequently returns the wrong section.",
          "Second, unconstrained language models blend retrieved text with their pre-training priors. Without hard citation binding, a reviewer has no fast way to tell whether a number came from page 42 of your policy manual or from model guesswork.",
        ],
      },
      {
        heading: "2. Hybrid BM25 + Vector retrieval with Reciprocal Rank Fusion",
        body: [
          "Production document search requires two complementary engines running in parallel: an inverted lexical index (BM25) for exact terminology, acronyms, and reference numbers, and a dense vector index for conceptual phrasing.",
          "By merging both ranked lists with Reciprocal Rank Fusion (RRF) and preserving exact page and bounding-box metadata at chunking time, the retriever surfaces the right passage whether the user searches by exact clause ID or natural-language question.",
        ],
      },
      {
        heading: "3. Enforcing page-level citations and local-first privacy",
        body: [
          "To make answers auditable, every generated statement must reference the chunk ID, document title, and page number it drew from. If the top-ranked chunks score below a calibrated confidence threshold, the system returns 'No verified match found in the indexed documents' instead of fabricating an answer.",
          "For regulated teams, the entire indexing and inference loop can run inside a single Docker stack on local hardware or a private cloud VPC — ensuring zero external data egress.",
        ],
      },
    ],
    relatedServiceSlug: "ai-and-automation",
    relatedCaseStudySlug: "airgapped-rag",
  },
  {
    slug: "reachability-cve-triage",
    code: "ENG/02",
    category: "Application Security",
    title: "Cutting security scanner noise with CISA KEV, EPSS, and call-graph reachability",
    subtitle: "How engineering teams move from thousands of unranked CVE tickets to a short, verifiable list of vulnerabilities that are actually exploitable.",
    published: "November 2026",
    readTime: "5 min read",
    author: "NEXMANCER Systems Architecture Team",
    summary:
      "CVSS severity scores alone tell you how bad a vulnerability could be in theory — not whether it is exploited in the wild or even called by your application. Correlating multi-scanner output with CISA KEV, EPSS, and AST reachability changes the math.",
    takeaways: [
      "CVSS 'High/Critical' volume overwhelms engineering sprints because most flagged transitive packages are never invoked by application code.",
      "Overlaying CISA Known Exploited Vulnerabilities (KEV) and EPSS probability scores highlights CVEs under active real-world attack.",
      "Static AST call-graph reachability checks verify whether the vulnerable function is actually imported and reachable from an entry point.",
    ],
    sections: [
      {
        heading: "1. Why CVSS severity alone breaks DevSecOps trust",
        body: [
          "Modern container and dependency scanners routinely flag hundreds of 'Critical' and 'High' CVEs on a single microservice image. When developers spend two days upgrading a dependency only to discover the vulnerable function was in an unused CLI helper module, trust between security and engineering erodes.",
          "Treating every CVSS 8.0+ alert as an emergency slows product delivery while leaving genuinely exposed attack surfaces buried in the backlog.",
        ],
      },
      {
        heading: "2. Three-layer filtering: Threat Telemetry + Call-Graph Reachability",
        body: [
          "An effective triage pipeline evaluates three signals before paging an engineer. First, unify findings across SAST (Opengrep), containers/SCA (Trivy), secrets (Gitleaks), templates (Nuclei), and network ports (Nmap) into a single asset graph.",
          "Second, enrich every CVE with CISA KEV (is it actively exploited in the wild?) and EPSS (what is the 30-day probability of exploitation?). Third, parse the application's Abstract Syntax Tree (AST) and import graph to verify whether the vulnerable symbol is reachable from a live route or worker.",
        ],
      },
      {
        heading: "3. Plain-English remediation briefs for faster fixes",
        body: [
          "Once unreachable noise is filtered out, each priority finding should be handed to developers as a concise brief: which file imports the vulnerable package, how an attacker could reach it, and the exact version bump or configuration change required to close it.",
        ],
      },
    ],
    relatedServiceSlug: "security-architecture",
    relatedCaseStudySlug: "reachability-triage",
  },
  {
    slug: "offline-ocr-pdfa-archival",
    code: "ENG/03",
    category: "Data & Digital Preservation",
    title: "Turning decades of scanned records into searchable ISO PDF/A archives without cloud uploads",
    subtitle: "Designing local-first OCR, human-in-the-loop proofreading, and long-term preservation pipelines for universities, libraries, and regulated enterprises.",
    published: "November 2026",
    readTime: "5 min read",
    author: "NEXMANCER Systems Architecture Team",
    summary:
      "Uploading sensitive legal contracts, medical records, or rare institutional manuscripts to public cloud OCR APIs violates data sovereignty and creates vendor lock-in. Local-first OCR paired with ISO PDF/A packaging keeps full custody on your own machines.",
    takeaways: [
      "Standard image-only PDFs decay into dark data; ISO 19005 (PDF/A) embeds fonts, colour profiles, and searchable text layers for multi-decade readability.",
      "Automated OCR needs a fast side-by-side human proofreading and metadata cataloguing UI for high-value archival collections.",
      "Offline workstation execution eliminates per-page cloud API fees and satisfies strict institutional privacy rules.",
    ],
    sections: [
      {
        heading: "1. The hidden cost of cloud-only OCR APIs",
        body: [
          "Many organisations hesitate to digitise their physical archives because commercial OCR platforms require uploading every page to external servers and charge recurring per-page fees. For legal registries, universities, and regulated enterprises, external uploads are often a non-starter.",
          "Worse, raw text dumps disconnected from the original scan lose layout fidelity, signatures, and archival provenance.",
        ],
      },
      {
        heading: "2. Human-in-the-loop verification and metadata cataloguing",
        body: [
          "In real-world archives — faded ink, stamps, multi-column layouts, and regional scripts — fully unattended OCR leaves errors in names and dates that break downstream search.",
          "Pairing local OCR inference with a side-by-side review interface lets operators correct low-confidence words in seconds and attach structured catalogue metadata (title, author, date, collection, access tier) before final export.",
        ],
      },
      {
        heading: "3. Packaging for the next 30 years with ISO PDF/A",
        body: [
          "By compiling the verified text layer, original high-resolution scan, embedded fonts, and XMP metadata into a self-contained ISO PDF/A package, institutions get an archive that works offline on any standard reader decades from now — ready for instant local full-text or RAG search.",
        ],
      },
    ],
    relatedServiceSlug: "document-digitisation",
    relatedCaseStudySlug: "airgapped-rag",
  },
];

export const READINESS_CHECKLIST = [
  {
    category: "Private AI & Document Search",
    items: [
      "Every AI-generated answer links to the exact source document and page number.",
      "Hybrid retrieval (lexical BM25 + semantic vector search) is used so exact IDs and clauses are never missed.",
      "Confidential documents and embeddings stay inside your VPC or on-premise hardware with zero third-party training usage.",
    ],
  },
  {
    category: "AppSec & Cloud Isolation",
    items: [
      "CVE alerts are filtered by AST call-graph reachability and CISA KEV / EPSS exploit telemetry.",
      "Multi-tenant databases enforce PostgreSQL Row-Level Security (RLS) in addition to application-layer checks.",
      "Secrets, container images, and infrastructure-as-code are scanned automatically on every pull request.",
    ],
  },
  {
    category: "IP Ownership & Operational Continuity",
    items: [
      "100% of custom source code, database migrations, and CI/CD runbooks belong to your organization.",
      "Archival documents are stored in open, self-contained ISO PDF/A formats with embedded text layers.",
      "Every milestone has written acceptance criteria and deterministic verification tests before sign-off.",
    ],
  },
];

export const TRUST_PILLARS = [
  {
    code: "TR/01",
    title: "100% Client IP & Zero Lock-In",
    desc: "For custom engineering builds, your organization receives full ownership of source code, database schemas, Dockerfiles, and deployment runbooks upon milestone payment. We build on open standards so your team can run and maintain everything independently.",
    badge: "Full Handover",
  },
  {
    code: "TR/02",
    title: "Local-First & Air-Gapped Capable",
    desc: "When data sovereignty or regulatory rules prohibit public cloud APIs, we deploy retrieval engines, OCR pipelines, and open-weight models directly on your on-premise servers or private cloud VPC with zero external data egress.",
    badge: "Zero Data Egress",
  },
  {
    code: "TR/03",
    title: "NDA-First Discovery & Strict Confidentiality",
    desc: "We execute a Mutual Non-Disclosure Agreement (NDA) before reviewing any proprietary codebase, architecture diagram, or internal document. Access is restricted to senior engineering personnel directly assigned to your project.",
    badge: "Mutual NDA Ready",
  },
  {
    code: "TR/04",
    title: "DPDP Act 2023 & Zero-Tracking Compliance",
    desc: "Our web properties and platforms operate without third-party advertising trackers, behavioral fingerprinting, or data brokering, in full alignment with India's Digital Personal Data Protection Act (DPDP Act 2023).",
    badge: "DPDP 2023 Aligned",
  },
];

export const TRUST_CONTROLS = [
  {
    domain: "Application & Code Security",
    controls: [
      "Automated SAST, secret detection (Gitleaks), and dependency reachability scanning on all repositories",
      "Strict Content-Security-Policy (CSP), HSTS preload, X-Frame-Options DENY, and Referrer-Policy headers",
      "Role-Based Access Control (RBAC) and least-privilege API token scoping by default",
    ],
  },
  {
    domain: "Data & AI Governance",
    controls: [
      "Zero training on client data — client documents and prompts are never shared with public foundation model pools",
      "Cited retrieval architecture with source page verification and deterministic fallback rules",
      "PostgreSQL Row-Level Security (RLS) and encrypted-at-rest storage for multi-tenant workloads",
    ],
  },
  {
    domain: "Commercial & Legal Governance",
    controls: [
      "Written Master Services Agreement (MSA) and milestone-based Statement of Work (SOW) for every engagement",
      "10-business-day client review and verification window on every engineering milestone",
      "1-business-day response SLA (Mon–Fri, 09:00–18:00 IST) with direct architect communication",
    ],
  },
];
