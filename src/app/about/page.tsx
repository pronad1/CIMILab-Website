import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Database, ShieldCheck, Microscope, ArrowRight, CheckCircle2 } from "lucide-react";
import { RESEARCH_PILLARS, RESEARCH_THEMES } from "@/lib/constants";
import { getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about CIMILab — our mission, research philosophy, four research pillars, and commitment to reproducible, trustworthy AI.",
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

export default function AboutPage() {
  const config = getSiteConfig();

  return (
    <div style={{ paddingTop: "4rem" }}>
      {/* Hero */}
      <section
        className="mesh-bg"
        style={{ padding: "5rem 0 4rem", textAlign: "center" }}
      >
        <div className="container" style={{ maxWidth: "800px" }}>
          <p style={{ color: "var(--accent-teal)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            About the Lab
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            Computation Informatics &amp;{" "}
            <span className="gradient-text">Machine Intelligence</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.75 }}>
            {config.motto}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container" style={{ maxWidth: "900px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
              alignItems: "center",
            }}
            className="about-grid"
          >
            <div>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1.25rem" }}>
                Our Mission
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1rem" }}>
                CIMILab exists to advance the science of machine intelligence in ways that are
                computationally rigorous, reproducible, and trustworthy enough to deploy in
                high-stakes real-world settings — with an emphasis on medical and health AI.
              </p>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.75 }}>
                We believe that AI systems for clinical applications must be evaluated more
                carefully, interpreted more clearly, and deployed more responsibly than the
                current state of the art often allows. Closing that gap is our core mission.
              </p>
            </div>
            <div>
              <div
                className="card"
                style={{
                  padding: "1.5rem",
                  background: "linear-gradient(135deg, rgba(34,211,184,0.06) 0%, rgba(99,102,241,0.06) 100%)",
                }}
              >
                <h3 style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "1rem" }}>
                  Research Themes
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                  {RESEARCH_THEMES.map((theme) => (
                    <li key={theme.id} style={{ display: "flex", alignItems: "center", gap: "0.625rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                      <CheckCircle2 size={15} color="var(--accent-teal)" />
                      {theme.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section
        className="section"
        style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}
      >
        <div className="container">
          <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.75rem" }}>
            Research Pillars
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2.5rem", maxWidth: "60ch" }}>
            Four interconnected pillars frame everything CIMILab works on.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.25rem",
            }}
            className="pillars-about-grid"
          >
            {RESEARCH_PILLARS.map((pillar) => {
              const Icon = ICONS[pillar.icon] ?? Brain;
              const accent = PILLAR_ACCENT[pillar.id];
              return (
                <div key={pillar.id} id={pillar.id} className="card" style={{ padding: "2rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                        flexShrink: 0,
                        borderRadius: "10px",
                        background: `${accent}18`,
                        border: `1px solid ${accent}30`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={18} color={accent} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{pillar.title}</h3>
                      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.65 }}>{pillar.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reproducibility Standard */}
      <section className="section">
        <div className="container" style={{ maxWidth: "800px" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1.25rem" }}>
            Our Reproducibility Standard
          </h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
            Every project in CIMILab is held to a reproducibility standard that we publish and version openly.
            This is not a checkbox — it is a design constraint that shapes how we run experiments from day one.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.75rem",
              marginBottom: "2rem",
            }}
            className="repro-grid"
          >
            {[
              "Versioned datasets with checksums",
              "Fixed random seeds documented",
              "Full training configs committed",
              "Scripted, one-command evaluation",
              "Reported ablations, not just top results",
              "Model weights + inference code released",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.875rem 1rem",
                  borderRadius: "8px",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                }}
              >
                <CheckCircle2 size={15} color="var(--accent-teal)" style={{ flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
          <Link href="/resources" className="btn btn-outline">
            View Full Standard <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid, .pillars-about-grid, .repro-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
