import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GitBranch, FileText, ArrowLeft, ExternalLink } from "lucide-react";
import { getProjectBySlug, getAllProjects } from "@/lib/content";
import { STATUS_COLORS } from "@/lib/constants";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const statusClass = STATUS_COLORS[project.status] ?? STATUS_COLORS["Planned"];

  return (
    <div style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <Link href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2rem", textDecoration: "none" }}>
          <ArrowLeft size={14} /> Back to Projects
        </Link>
        
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
          <span className={`badge ${statusClass}`} style={{ fontSize: "0.75rem" }}>
             <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "currentColor", marginRight: "0.3rem" }} />
             {project.status}
          </span>
          <span style={{ padding: "0.25rem 0.75rem", borderRadius: "999px", background: "rgba(34,211,184,0.1)", color: "var(--accent-teal)", fontSize: "0.75rem", fontWeight: 600 }}>
             {project.pillar.replace(/-/g, " ")}
          </span>
        </div>

        <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
          {project.title}
        </h1>
        
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "2rem" }}>
          {project.summary}
        </p>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem", paddingBottom: "3rem", borderBottom: "1px solid var(--border)" }}>
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <GitBranch size={16} /> View Repository
            </a>
          )}
          {project.paperUrl && (
            <a href={project.paperUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <FileText size={16} /> Read Paper
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>

        <div className="prose" dangerouslySetInnerHTML={{ __html: project.content }} />
      </div>
    </div>
  );
}
