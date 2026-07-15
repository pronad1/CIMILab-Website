import Link from "next/link";
import { GitBranch, Mail, ExternalLink, Zap } from "lucide-react";

const footerLinks = [
  {
    heading: "Lab",
    links: [
      { href: "/about", label: "About" },
      { href: "/people", label: "People" },
      { href: "/research", label: "Research" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Work",
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/publications", label: "Publications" },
      { href: "/resources", label: "Resources" },
      { href: "/news", label: "News" },
    ],
  },
  {
    heading: "Engage",
    links: [
      { href: "/join-us", label: "Join Us" },
      { href: "/contact", label: "Collaborate" },
      { href: "https://github.com/CIMILab", label: "GitHub Org" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        marginTop: "auto",
      }}
    >
      {/* CTA Banner */}
      <div
        style={{
          background:
            "linear-gradient(135deg, rgba(34,211,184,0.08) 0%, rgba(99,102,241,0.08) 100%)",
          borderBottom: "1px solid var(--border)",
          padding: "3rem 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to join{" "}
            <span className="gradient-text">CIMILab</span>?
          </h2>
          <p
            style={{
              color: "var(--text-muted)",
              marginBottom: "1.5rem",
              fontSize: "1rem",
            }}
          >
            We&apos;re always looking for motivated researchers to join our growing team.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/join-us" className="btn btn-primary">
              View Open Positions
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container" style={{ padding: "3rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "2rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #22D3B8, #6366F1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={14} color="#fff" fill="#fff" />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.03em" }}>
                CIMI<span style={{ color: "var(--accent-teal)" }}>Lab</span>
              </span>
            </div>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1.25rem", maxWidth: "28ch" }}>
              Computation Informatics and Machine Intelligence Lab — building trustworthy AI for real-world impact.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a
                href="https://github.com/CIMILab"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--border)",
                  transition: "all 0.2s ease",
                }}
                className="footer-icon-link"
              >
                <GitBranch size={15} />
              </a>
              <a
                href="mailto:deycimilab@gmail.com"
                aria-label="Email"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "8px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--border)",
                  transition: "all 0.2s ease",
                }}
                className="footer-icon-link"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "1rem",
                }}
              >
                {col.heading}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.875rem",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          transition: "color 0.2s ease",
                        }}
                        className="footer-text-link"
                      >
                        {link.label} <ExternalLink size={10} />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        style={{
                          fontSize: "0.875rem",
                          transition: "color 0.2s ease",
                        }}
                        className="footer-text-link"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="divider" style={{ margin: "2rem 0 1.5rem" }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            © {year} Computation Informatics and Machine Intelligence Lab. All rights reserved.
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            Content CC-BY 4.0 · Code MIT
          </p>
        </div>
      </div>

      <style>{`
        .footer-icon-link {
          color: var(--text-muted);
        }
        .footer-icon-link:hover {
          color: var(--text-primary);
          border-color: var(--border-hover) !important;
        }
        .footer-text-link {
          color: var(--text-muted);
        }
        .footer-text-link:hover {
          color: var(--text-secondary);
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
