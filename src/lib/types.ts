// Core data types for CIMILab website

export interface SiteConfig {
  labName: string;
  shortName: string;
  motto: string;
  email: string;
  github: string;
  social: {
    twitter: string;
    linkedin: string;
    researchGate: string;
  };
  stats: {
    publications: number;
    members: number;
    activeProjects: number;
    yearsActive: number;
  };
  affiliation: string;
  university: string;
  address: string;
  formspreeId: string;
}

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  title?: string;
  status: "current" | "alumni";
  category: "pi" | "postdoc" | "phd" | "msc" | "ra" | "intern" | "collaborator" | "alumni";
  photo: string;
  email?: string;
  links: {
    scholar?: string;
    github?: string;
    linkedin?: string;
    orcid?: string;
    website?: string;
  };
  interests: string[];
  order: number;
  bio: string;
  alumniNowAt?: string;
}

export type ProjectStatus = "Active" | "Planned" | "Completed" | "Archived";

export interface Project {
  slug: string;
  title: string;
  status: ProjectStatus;
  pillar: string;
  themes: string[];
  summary: string;
  repoUrl: string;
  paperUrl: string;
  demoUrl: string;
  coverImage: string;
  contributors: string[];
  featured: boolean;
  order: number;
  content: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: "journal" | "conference" | "workshop" | "preprint" | "thesis";
  links: {
    pdf?: string;
    doi?: string;
    code?: string;
    bibtex?: string;
  };
  tags: string[];
  relatedProject?: string;
  featured: boolean;
}

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
}

export interface Position {
  role: string;
  level: "phd" | "msc" | "undergrad" | "postdoc" | "visiting";
  status: "open" | "closed";
  deadline?: string;
  description: string;
  requirements: string[];
  applyLink: string;
}

export interface ResearchPillar {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
  themes: string[];
}
