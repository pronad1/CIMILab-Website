import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Database, ShieldCheck, Microscope, ArrowRight, ExternalLink } from "lucide-react";
import { RESEARCH_PILLARS, RESEARCH_THEMES } from "@/lib/constants";
import { getAllProjects, getAllPublications, getFeaturedProjects } from "@/lib/content";
import { Project, Publication } from "@/lib/types";

export const metadata: Metadata = {
  title: "Research",
  description: "Explore CIMILab's research across four core pillars: Machine Intelligence, Computational Informatics, Trustworthy AI, and Translational AI.",
};

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Brain, Database, ShieldCheck, Microscope,
};
const PILLAR_ACCENT: Record<string, string> = {
  "machine-intelligence": "#22D3B8",
  "computational-informatics": "#6366F1",
  "trustworthy-ai": "#8B5CF6",
  "translational-ai": "#10B981",
};

export default async function ResearchPage() {
  const allProjects = await getAllProjects();
  const allPublications = getAllPublications();

  return (
    <div style={{ paddingTop: "4rem" }}>
      {/* Header */}
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
          <p style={{ color: "var(--accent-teal)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Research Overview
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            Our Four Pillars
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: "60ch", margin: "0 auto" }}>
            CIMILab structures its research across four distinct pillars that span from 
            theoretical foundation to clinical translation.
          </p>
        </div>
      </section>

      {/* Pillars Breakdown */}
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {RESEARCH_PILLARS.map((pillar, idx) => {
              const Icon = ICONS[pillar.icon] ?? Brain;
              const accent = PILLAR_ACCENT[pillar.id];
              const pillarProjects = allProjects.filter((p) => p.pillar === pillar.id);
              const pillarPubs = allPublications.filter((p) => p.tags.some(t => pillar.themes.map(th => th.toLowerCase().replace(/\s+/g, '-')).includes(t)));

              return (
                <div
                  key={pillar.id}
                  id={pillar.id}
                  className="card pillar-section"
                  style={{
                    padding: "3rem",
                    display: "grid",
                    gridTemplateColumns: "1.5fr 1fr",
                    gap: "3rem",
                    alignItems: "start",
                    background: `linear-gradient(135deg, ${accent}08 0%, transparent 100%)`,
                    borderColor: `${accent}20`
                  }}
                >
                  {/* Left: Info */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                      <div
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "12px",
                          background: `${accent}18`,
                          border: `1px solid ${accent}30`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Icon size={22} color={accent} />
                      </div>
                      <h2 style={{ fontSize: "1.75rem", fontWeight: 800 }}>{pillar.title}</h2>
                    </div>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                      {pillar.description}
                    </p>
                    <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                      Key Themes
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2rem" }}>
                      {pillar.themes.map((theme) => (
                        <span
                          key={theme}
                          style={{
                            padding: "0.25rem 0.75rem",
                            borderRadius: "999px",
                            fontSize: "0.8rem",
                            fontWeight: 500,
                            background: `${accent}12`,
                            color: accent,
                            border: `1px solid ${accent}25`,
                          }}
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Related Output */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    {pillarProjects.length > 0 && (
                      <div>
                        <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "1rem" }}>
                          Active Projects
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                          {pillarProjects.slice(0, 3).map(p => (
                            <Link key={p.slug} href={`/projects/${p.slug}`} style={{ textDecoration: 'none' }}>
                              <div style={{ padding: "1rem", background: "rgba(0,0,0,0.2)", borderRadius: "8px", border: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }} className="hover-lift">
                                <span style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.95rem" }}>{p.title}</span>
                                <ArrowRight size={14} color="var(--text-muted)" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .pillar-section { grid-template-columns: 1fr !important; }
        }
        .hover-lift { transition: transform 0.2s, border-color 0.2s; }
        .hover-lift:hover { transform: translateX(4px); border-color: var(--accent-teal) !important; }
      `}</style>
    </div>
  );
}
