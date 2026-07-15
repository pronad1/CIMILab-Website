import type { Metadata } from "next";
import { CheckCircle2, Download, ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources & Reproducibility",
  description: "CIMILab's Reproducibility Standard, open-source code, and dataset releases.",
};

export default function ResourcesPage() {
  return (
    <div style={{ paddingTop: "4rem" }}>
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <p style={{ color: "var(--accent-teal)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Open Science
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            Resources & Reproducibility
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: "65ch" }}>
            We believe that for AI to be trustworthy, it must first be reproducible. We hold our internal work to a strict standard and release as much of our code, models, and data as institutional ethics boards allow.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="card" style={{ padding: "3rem", background: "linear-gradient(135deg, rgba(34,211,184,0.05) 0%, transparent 100%)", borderColor: "rgba(34,211,184,0.2)" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "1.5rem", color: "var(--accent-teal)" }}>
              The CIMILab Reproducibility Standard
            </h2>
            <div className="prose" style={{ maxWidth: "none" }}>
              <p>
                Every project graduating from CIMILab to a public release or publication must satisfy the following pipeline requirements. This ensures our baselines are strong and our results can be verified by independent researchers.
              </p>
              <ul style={{ listStyle: "none", padding: 0, marginTop: "2rem" }}>
                {[
                  { title: "Versioned Data", desc: "All training, validation, and test splits are versioned with checksums (e.g., using DVC). Data preprocessing scripts are deterministic and included in the repo." },
                  { title: "Fixed Random Seeds", desc: "Random seeds for data shuffling, model initialization, and augmentation are explicitly set and documented for identical reruns." },
                  { title: "Config-Driven Experiments", desc: "Hyperparameters are stored in configuration files (YAML/JSON) rather than hardcoded, and the exact config used for the published result is committed to the repository." },
                  { title: "Scripted Evaluation", desc: "A single command (e.g., `bash eval.sh`) can run the trained model on the test set and reproduce the exact tables/metrics reported in the paper." },
                  { title: "Released Weights", desc: "Unless restricted by data-privacy agreements (common in medical AI), pre-trained model weights are released on HuggingFace or Zenodo." },
                ].map((item, idx) => (
                  <li key={idx} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
                    <div style={{ flexShrink: 0, marginTop: "0.25rem" }}><CheckCircle2 size={20} color="var(--accent-teal)" /></div>
                    <div>
                      <strong style={{ display: "block", color: "var(--text-primary)", fontSize: "1.05rem", marginBottom: "0.25rem" }}>{item.title}</strong>
                      <span style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}>{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>
            Software & Repositories
          </h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>
            Our open-source projects are hosted on GitHub. We welcome issues and pull requests.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>DSANet-ISLES</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1rem", minHeight: "3rem" }}>Deep supervision and attention networks for ischemic stroke lesion segmentation.</p>
              <a href="https://github.com/CIMILab/StrokeDSANet_ISLES22" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                <GitBranch size={14} /> View on GitHub
              </a>
            </div>
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>DERNet</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1rem", minHeight: "3rem" }}>Dual encoder representation network for spinal lesion analysis.</p>
              <a href="https://github.com/CIMILab/Spinal_Lesion-VinDr-SpineXR" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                <GitBranch size={14} /> View on GitHub
              </a>
            </div>
            <div className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", borderStyle: "dashed" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", textAlign: "center", marginBottom: "1rem" }}>View all repositories on our GitHub organization page.</p>
              <a href="https://github.com/CIMILab" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                <ExternalLink size={14} /> Go to CIMILab
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
