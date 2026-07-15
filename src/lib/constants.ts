import { ResearchPillar } from "./types";

export const RESEARCH_PILLARS: ResearchPillar[] = [
  {
    id: "machine-intelligence",
    title: "Machine Intelligence",
    icon: "Brain",
    description:
      "Deep learning architectures, ensemble methods, and attention mechanisms for high-stakes prediction and segmentation tasks.",
    color: "teal",
    themes: [
      "Medical Image Segmentation",
      "Ensemble Methods",
      "Attention Networks",
      "Self-supervised Learning",
    ],
  },
  {
    id: "computational-informatics",
    title: "Computational Informatics",
    icon: "Database",
    description:
      "Data infrastructure, benchmarking frameworks, and evaluation pipelines that make AI experiments reproducible and comparable.",
    color: "indigo",
    themes: [
      "Benchmarking Frameworks",
      "Data Engineering",
      "Evaluation Pipelines",
      "Reproducibility Standards",
    ],
  },
  {
    id: "trustworthy-ai",
    title: "Trustworthy AI Systems",
    icon: "ShieldCheck",
    description:
      "Uncertainty quantification, interpretability methods, and fairness auditing — building AI that clinicians and patients can trust.",
    color: "violet",
    themes: [
      "Uncertainty Quantification",
      "Explainable AI",
      "Fairness & Bias Auditing",
      "Calibration",
    ],
  },
  {
    id: "translational-ai",
    title: "Translational AI",
    icon: "Microscope",
    description:
      "Bridging research and deployment — efficient inference, edge adaptation, and clinical decision support at real-world scale.",
    color: "emerald",
    themes: [
      "Clinical Decision Support",
      "Edge AI",
      "Foundation Models for Medicine",
      "Multimodal Fusion",
    ],
  },
];

export const RESEARCH_THEMES = [
  { id: "medical-health-ai", label: "Medical & Health AI" },
  { id: "multimodal-learning", label: "Multimodal Learning" },
  { id: "efficient-ai", label: "Efficient AI & Edge Settings" },
  { id: "interpretable-ai", label: "Interpretable & Human-Centered AI" },
  { id: "benchmarking-evaluation", label: "Benchmarking & Evaluation" },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/people", label: "People" },
  { href: "/news", label: "News" },
  { href: "/resources", label: "Resources" },
  { href: "/join-us", label: "Join Us" },
  { href: "/contact", label: "Contact" },
];

export const STATUS_COLORS: Record<string, string> = {
  Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Planned: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  Completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Archived: "bg-slate-500/20 text-slate-400 border-slate-500/30",
};

export const MEMBER_CATEGORY_ORDER: Record<string, number> = {
  pi: 0,
  postdoc: 1,
  phd: 2,
  msc: 3,
  ra: 4,
  intern: 5,
  collaborator: 6,
  alumni: 7,
};

export const MEMBER_CATEGORY_LABELS: Record<string, string> = {
  pi: "Principal Investigator",
  postdoc: "Postdoctoral Researchers",
  phd: "PhD Students",
  msc: "MSc Students",
  ra: "Research Assistants",
  intern: "Interns",
  collaborator: "Collaborators",
  alumni: "Alumni",
};
