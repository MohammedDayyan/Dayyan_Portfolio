export type ProjectMetric = {
  label: string;
  before?: number;
  after?: number;
  unit?: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  role?: string;
  timeframe?: string;
  tech: string[];
  highlights: string[];
  problem: string;
  solution: string;
  impact: string[];
  metrics: ProjectMetric[];
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
  };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "ai-skin-diagnostic",
    name: "AI Skin Diagnostic",
    tagline: "Clinical-style skin condition classification with a production inference path.",
    role: "ML Engineer",
    timeframe: "2025",
    tech: [
      "Python",
      "PyTorch",
      "ONNX",
      "FastAPI",
      "Docker",
      "Next.js",
      "PostgreSQL",
    ],
    highlights: [
      "Built an end-to-end pipeline: training → evaluation → export → deployment.",
      "Optimized inference with quantization + batching.",
      "Designed monitoring-friendly request/response contracts.",
    ],
    problem:
      "Skin triage tools often fail in real-world settings due to latency, inconsistent preprocessing, and weak evaluation beyond accuracy.",
    solution:
      "A reproducible ML pipeline with strong data validation, calibration-aware evaluation, and a low-latency inference service (exported model + optimized runtime).",
    impact: [
      "Reduced inference latency by 56% via export/optimizations.",
      "Improved throughput under load with batching and request shaping.",
      "Shipped a clean UX for uploading + receiving a structured report.",
    ],
    metrics: [
      { label: "Accuracy", before: 0.81, after: 0.87, unit: "" },
      { label: "p95 Latency (ms)", before: 220, after: 124, unit: "ms" },
      { label: "Throughput (req/s)", before: 18, after: 180, unit: "req/s" },
    ],
    links: {
      github: "https://github.com/MohammedDayyan/skin-health-ai",
      demo: "https://example.com",
    },
    featured: true,
  },
  {
    slug: "rag-knowledge-assistant",
    name: "RAG Knowledge Assistant",
    tagline: "Retrieval-augmented generation with evaluation and guardrails.",
    role: "AI Engineer",
    timeframe: "2025",
    tech: ["Python", "FastAPI", "Vector DB", "RAGAS", "Docker"],
    highlights: [
      "Chunking strategy + hybrid retrieval.",
      "Offline evaluation for answer faithfulness and retrieval precision.",
      "Prompt/response guardrails for safer outputs.",
    ],
    problem:
      "Teams lose time searching internal docs, and naive chatbots hallucinate answers without grounded sources.",
    solution:
      "A RAG service that retrieves citations, scores relevance, and returns concise answers with sources and fallback behaviors.",
    impact: [
      "Faster time-to-answer for repetitive internal questions.",
      "Improved faithfulness with retrieval + post-processing checks.",
    ],
    metrics: [
      { label: "Grounded answers", before: 0.62, after: 0.82, unit: "" },
      { label: "Avg response (s)", before: 4.1, after: 1.9, unit: "s" },
    ],
    links: { github: "https://github.com/" },
  },
  {
    slug: "rl-yarn-optimizer",
    name: "RL YARN Optimizer",
    tagline: "Reinforcement learning to tune resource allocation policies.",
    role: "Research / Engineering",
    timeframe: "2024",
    tech: ["Python", "RL", "Hadoop YARN", "Simulation"],
    highlights: [
      "Built a simulator loop for repeatable experiments.",
      "Defined reward functions aligned with cluster SLAs.",
      "Compared RL policy vs baselines with ablations.",
    ],
    problem:
      "Static resource policies waste capacity and degrade SLA adherence across mixed workloads.",
    solution:
      "An RL agent that learns resource allocation actions using cluster signals and workload features.",
    impact: [
      "Higher SLA adherence in simulated mixed workloads.",
      "Better utilization without sacrificing tail latency.",
    ],
    metrics: [
      { label: "SLA met (%)", before: 74, after: 88, unit: "%" },
      { label: "Utilization (%)", before: 62, after: 75, unit: "%" },
    ],
    links: { github: "https://github.com/" },
  },
  {
    slug: "smart-stock-recommender",
    name: "Smart Stock Recommender",
    tagline: "ML-powered stock recommendation system with portfolio-centric insights.",
    role: "ML Engineer",
    timeframe: "2025",
    tech: ["Python", "Pandas", "Scikit-learn", "FastAPI", "Next.js"],
    highlights: [
      "Built a recommendation pipeline for ranking stock opportunities.",
      "Engineered data preprocessing and feature pipelines for cleaner signals.",
      "Exposed recommendation results through an API-first architecture.",
    ],
    problem:
      "Retail investors often struggle to prioritize equities from noisy market data and fragmented indicators.",
    solution:
      "A smart recommendation engine that scores and ranks stocks from selected features and returns practical, explainable suggestions.",
    impact: [
      "Improved decision speed by surfacing high-signal candidates first.",
      "Enabled consistent evaluation with a reproducible recommendation workflow.",
    ],
    metrics: [
      { label: "Top-k relevance", before: 0.54, after: 0.73, unit: "" },
      { label: "Selection time (min)", before: 30, after: 10, unit: "min" },
    ],
    links: { github: "https://github.com/MohammedDayyan/Stockify" },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

