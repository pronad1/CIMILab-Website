import Link from "next/link";
import { Brain, Database, ShieldCheck, Microscope, ArrowRight } from "lucide-react";
import { RESEARCH_PILLARS } from "@/lib/constants";

const ICONS: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  Brain,
  Database,
  ShieldCheck,
  Microscope,
};

const PILLAR_GRADIENTS: Record<string, string> = {
  "machine-intelligence": "linear-gradient(135deg, rgba(34,211,184,0.15), rgba(34,211,184,0.03))",
  "computational-informatics": "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.03))",
  "trustworthy-ai": "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(139,92,246,0.03))",
  "translational-ai": "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.03))",
};
const PILLAR_ACCENT: Record<string, string> = {
  "machine-intelligence": "#22D3B8",
  "computational-informatics": "#6366F1",
  "trustworthy-ai": "#8B5CF6",
  "translational-ai": "#10B981",
};

export function PillarsGrid() {
  return (
    <section className="section">
      <div className="container">
        {/* Heading */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p
            style={{
              color: "var(--accent-teal)",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Research Pillars
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: "1rem",
            }}
          >
            Four pillars of inquiry
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              maxWidth: "55ch",
              margin: "0 auto",
              fontSize: "1rem",
            }}
          >
            CIMILab&apos;s research is organized around four interconnected pillars, each addressing
            a distinct facet of trustworthy, real-world machine intelligence.
          </p>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1.25rem",
          }}
          className="pillars-grid"
        >
          {RESEARCH_PILLARS.map((pillar) => {
            const Icon = ICONS[pillar.icon] ?? Brain;
            const accent = PILLAR_ACCENT[pillar.id];
            const grad = PILLAR_GRADIENTS[pillar.id];
            return (
              <Link
                key={pillar.id}
                href={`/research#${pillar.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card"
                  style={{
                    padding: "2rem",
                    background: grad,
                    cursor: "pointer",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Icon */}
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
                      marginBottom: "1.25rem",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} color={accent} />
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      marginBottom: "0.75rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "0.9rem",
                      lineHeight: 1.65,
                      flex: 1,
                    }}
                  >
                    {pillar.description}
                  </p>

                  {/* Themes */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.375rem",
                      marginTop: "1.25rem",
                    }}
                  >
                    {pillar.themes.slice(0, 3).map((theme) => (
                      <span
                        key={theme}
                        style={{
                          padding: "0.15rem 0.55rem",
                          borderRadius: "6px",
                          fontSize: "0.7rem",
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

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      color: accent,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      marginTop: "1.25rem",
                    }}
                  >
                    Explore <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
