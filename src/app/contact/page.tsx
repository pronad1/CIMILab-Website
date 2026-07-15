import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, GitBranch, Send } from "lucide-react";
import { getSiteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with CIMILab for collaboration, media inquiries, or general questions.",
};

export default function ContactPage() {
  const config = getSiteConfig();

  return (
    <div style={{ paddingTop: "4rem" }}>
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <p style={{ color: "var(--accent-teal)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Get in touch
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem", lineHeight: 1.75, maxWidth: "60ch" }}>
            Whether you&apos;re looking to collaborate on research, inquire about our open-source tools, or join the lab, we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "4rem" }} className="contact-grid">
            
            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <div>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem" }}>Lab Information</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "8px", background: "rgba(34,211,184,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Mail size={18} color="var(--accent-teal)" />
                    </div>
                    <div>
                      <span style={{ display: "block", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.25rem" }}>Email</span>
                      <a href={`mailto:${config.email}`} style={{ color: "var(--text-secondary)" }}>{config.email}</a>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "8px", background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <MapPin size={18} color="var(--accent-indigo)" />
                    </div>
                    <div>
                      <span style={{ display: "block", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.25rem" }}>Location</span>
                      <span style={{ color: "var(--text-secondary)", whiteSpace: "pre-line" }}>{config.address}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "8px", background: "rgba(139,92,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <GitBranch size={18} color="var(--accent-violet)" />
                    </div>
                    <div>
                      <span style={{ display: "block", fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.25rem" }}>GitHub Organization</span>
                      <a href={config.github} target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)" }}>github.com/CIMILab</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: "1.5rem", background: "var(--bg-secondary)" }}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Prospective Students</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                  If you are inquiring about a position, please refer to the <Link href="/join-us" style={{ textDecoration: "underline" }}>Join Us page</Link> first to review our application guidelines and required materials.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="card" style={{ padding: "2rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem" }}>Send a Message</h2>
              <form action={`https://formspree.io/f/${config.formspreeId}`} method="POST" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <label htmlFor="name" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Name</label>
                  <input type="text" id="name" name="name" required style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)", color: "var(--text-primary)", fontSize: "0.95rem", outline: "none" }} />
                </div>
                
                <div>
                  <label htmlFor="email" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Email Address</label>
                  <input type="email" id="email" name="email" required style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)", color: "var(--text-primary)", fontSize: "0.95rem", outline: "none" }} />
                </div>

                <div>
                  <label htmlFor="topic" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Topic</label>
                  <select id="topic" name="topic" style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)", color: "var(--text-primary)", fontSize: "0.95rem", outline: "none" }}>
                    <option value="Collaboration">Collaboration / Partnership</option>
                    <option value="Software">Software / Dataset Inquiry</option>
                    <option value="Admissions">Admissions / Joining the Lab</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", color: "var(--text-secondary)" }}>Message</label>
                  <textarea id="message" name="message" rows={5} required style={{ width: "100%", padding: "0.75rem", borderRadius: "8px", border: "1px solid var(--border)", background: "rgba(0,0,0,0.2)", color: "var(--text-primary)", fontSize: "0.95rem", outline: "none", resize: "vertical" }} />
                </div>
                
                <button type="submit" className="btn btn-primary" style={{ justifyContent: "center", marginTop: "0.5rem" }}>
                  <Send size={16} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
