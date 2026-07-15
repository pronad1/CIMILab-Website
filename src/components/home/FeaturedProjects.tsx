import Link from "next/link";
import { ArrowRight, GitBranch, ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";
import { STATUS_COLORS } from "@/lib/constants";

interface FeaturedProjectsProps {
  projects: Project[];
}

const PILLAR_ACCENT: Record<string, string> = {
  "machine-intelligence": "#22D3B8",
  "computational-informatics": "#6366F1",
  "trustworthy-ai": "#8B5CF6",
  "translational-ai": "#10B981",
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section
      className="section"
      style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">
        {/* Heading */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                color: "var(--accent-teal)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Featured Projects
            </p>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Flagship research &amp; code
            </h2>
          </div>
          <Link
            href="/projects"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              color: "var(--accent-teal)",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            All projects <ArrowRight size={14} />
          </Link>
        </div>

        {/* Projects */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
          className="projects-grid"
        >
          {projects.map((project) => {
            const accent = PILLAR_ACCENT[project.pillar] ?? "#22D3B8";
            const statusClass = STATUS_COLORS[project.status] ?? STATUS_COLORS["Planned"];
            return (
              <div
                key={project.slug}
                className="card"
                style={{
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                }}
              >
                {/* Status Badge */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <span className={`badge ${statusClass}`} style={{ fontSize: "0.7rem" }}>
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "currentColor",
                        display: "inline-block",
                        marginRight: "0.25rem",
                      }}
                    />
                    {project.status}
                  </span>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      padding: "0.15rem 0.55rem",
                      borderRadius: "6px",
                      background: `${accent}12`,
                      color: accent,
                    }}
                  >
                    {project.pillar.replace(/-/g, " ")}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    marginBottom: "0.625rem",
                    letterSpacing: "-0.01em",
                    color: "var(--text-primary)",
                  }}
                >
                  {project.title}
                </h3>

                {/* Summary */}
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.875rem",
                    lineHeight: 1.65,
                    flex: 1,
                  }}
                >
                  {project.summary}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "1rem" }}>
                  {project.themes.slice(0, 2).map((theme) => (
                    <span key={theme} className="tag" style={{ fontSize: "0.65rem" }}>
                      {theme.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginTop: "1.25rem",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <Link href={`/projects/${project.slug}`} className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: "center" }}>
                    Details <ArrowRight size={12} />
                  </Link>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-ghost btn-sm"
                      aria-label="GitHub repository"
                    >
                      <GitBranch size={13} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
