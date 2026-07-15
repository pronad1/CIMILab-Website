import type { Metadata } from "next";
import { getAllPublications } from "@/lib/content";
import PublicationClient from "./PublicationClient";

export const metadata: Metadata = {
  title: "Publications",
  description: "Browse peer-reviewed research papers and preprints from CIMILab.",
};

export default function PublicationsPage() {
  const publications = getAllPublications();

  return (
    <div style={{ paddingTop: "4rem" }}>
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
          <p style={{ color: "var(--accent-teal)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Research Output
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            Publications
          </h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
           <PublicationClient initialPublications={publications} />
        </div>
      </section>
    </div>
  );
}
