import type { Metadata } from "next";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "CIMILab flagship research projects and code repositories.",
};

export default async function ProjectsPage() {
  const allProjects = await getAllProjects();
  const activeProjects = allProjects.filter(p => p.status === "Active" || p.status === "Planned");
  const completedProjects = allProjects.filter(p => p.status === "Completed" || p.status === "Archived");

  return (
    <div style={{ paddingTop: "4rem" }}>
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
          <p style={{ color: "var(--accent-teal)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Research Output
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            Flagship Projects
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: "60ch", margin: "0 auto" }}>
            Open science starts with open code. Every major paper from CIMILab is accompanied by a maintained repository, documented codebase, and public dataset.
          </p>
        </div>
      </section>

      <FeaturedProjects projects={activeProjects} />

      {completedProjects.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>Archived / Completed</h2>
            {/* simple grid for completed ones */}
          </div>
        </section>
      )}
    </div>
  );
}
