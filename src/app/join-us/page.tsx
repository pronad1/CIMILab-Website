import type { Metadata } from "next";
import { ArrowRight, Mail } from "lucide-react";
import { getAllPositions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Join Us",
  description: "Open research positions at CIMILab for PhD, MSc, Undergraduate, and Visiting Researchers.",
};

export default function JoinUsPage() {
  const positions = getAllPositions();
  const openPositions = positions.filter(p => p.status === "open");

  return (
    <div style={{ paddingTop: "4rem" }}>
      {/* Header */}
      <section className="section" style={{ paddingBottom: "3rem" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <p style={{ color: "var(--accent-teal)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Careers & Opportunities
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            Join <span className="gradient-text">CIMILab</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: "60ch" }}>
            We are always looking for motivated researchers who are passionate about building trustworthy, reproducible machine intelligence for real-world impact.
          </p>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>
            Open Positions
          </h2>
          
          {openPositions.length === 0 ? (
            <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", marginBottom: "1rem" }}>
                There are currently no specific funded positions open.
              </p>
              <p style={{ color: "var(--text-muted)" }}>
                However, we are always open to strong fellowship applicants or visiting researchers. Feel free to reach out with your CV and a brief proposal.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {openPositions.map((pos, idx) => (
                <div key={idx} className="card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <span style={{ display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: "6px", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", background: "rgba(99,102,241,0.1)", color: "var(--accent-indigo)", marginBottom: "0.75rem" }}>
                        {pos.level}
                      </span>
                      <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>{pos.role}</h3>
                    </div>
                    {pos.deadline && (
                      <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", background: "var(--bg-secondary)", padding: "0.4rem 0.8rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
                        <strong>Deadline:</strong> {pos.deadline}
                      </div>
                    )}
                  </div>
                  
                  <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{pos.description}</p>
                  
                  {pos.requirements && pos.requirements.length > 0 && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>Requirements:</h4>
                      <ul style={{ paddingLeft: "1.5rem", color: "var(--text-muted)", fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        {pos.requirements.map(req => <li key={req}>{req}</li>)}
                      </ul>
                    </div>
                  )}

                  <div style={{ marginTop: "1rem" }}>
                    <a href={pos.applyLink} className="btn btn-primary">
                      Apply Now <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How to Apply Guidelines */}
      <section className="section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>
            General Application Guidelines
          </h2>
          <div className="prose">
            <p>If you are reaching out for an unsolicited position, please ensure your email contains the following:</p>
            <ul>
              <li><strong>Subject Line:</strong> Should clearly state your intent (e.g., "Prospective PhD Student - [Your Name]").</li>
              <li><strong>CV:</strong> A concise, up-to-date CV emphasizing your computational background and any previous research experience.</li>
              <li><strong>Transcripts:</strong> Unofficial copies are fine for the initial inquiry.</li>
              <li><strong>Brief Motivation:</strong> 1-2 paragraphs explaining why CIMILab specifically interests you and which of our research pillars aligns with your goals. Do not send generic form emails.</li>
            </ul>
            <p>Due to the high volume of inquiries, we may not be able to respond to every email, but we review all serious, well-tailored applications.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
