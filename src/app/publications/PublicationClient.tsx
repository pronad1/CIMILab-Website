"use client";

import { useState } from "react";
import { Search, FileText, Code, Database, Link as LinkIcon, BookOpen, Quote } from "lucide-react";
import { Publication } from "@/lib/types";

export default function PublicationClient({ initialPublications }: { initialPublications: Publication[] }) {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<string>("all");

  const filtered = initialPublications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(search.toLowerCase()) || 
                          pub.authors.some(a => a.toLowerCase().includes(search.toLowerCase()));
    const matchesType = activeType === "all" || pub.type === activeType;
    return matchesSearch && matchesType;
  });

  const types = ["all", "journal", "conference", "preprint"];

  const handleCopyBibtex = (bibtex?: string) => {
    if (bibtex) {
      navigator.clipboard.writeText(bibtex);
      alert("BibTeX copied to clipboard!");
    }
  };

  return (
    <div>
      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: "250px" }}>
          <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "0.875rem 1rem 0.875rem 2.75rem",
              borderRadius: "8px",
              border: "1px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              fontSize: "0.95rem",
              outline: "none"
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {types.map(t => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                border: "1px solid",
                borderColor: activeType === t ? "var(--accent-teal)" : "var(--border)",
                background: activeType === t ? "rgba(34,211,184,0.1)" : "transparent",
                color: activeType === t ? "var(--accent-teal)" : "var(--text-muted)",
                fontSize: "0.85rem",
                fontWeight: 500,
                cursor: "pointer",
                textTransform: "capitalize",
                transition: "all 0.2s"
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--text-muted)" }}>
            No publications found matching your criteria.
          </div>
        ) : (
          filtered.map(pub => (
            <div key={pub.id} className="card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: 1.4 }}>
                  {pub.title}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                  {pub.authors.map((a, i) => (
                    <span key={i} style={{ fontWeight: a.includes("Dey") ? 700 : 400, color: a.includes("Dey") ? "var(--accent-teal)" : "inherit" }}>
                      {a}{i < pub.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}><BookOpen size={14} /> {pub.venue}</span>
                  <span>•</span>
                  <span>{pub.year}</span>
                </div>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                {pub.links.pdf && (
                  <a href={pub.links.pdf} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    <FileText size={14} /> PDF
                  </a>
                )}
                {pub.links.doi && (
                  <a href={`https://doi.org/${pub.links.doi}`} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                    <LinkIcon size={14} /> DOI
                  </a>
                )}
                {pub.links.code && (
                  <a href={pub.links.code} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                    <Code size={14} /> Code
                  </a>
                )}
                {pub.links.bibtex && (
                  <button onClick={() => handleCopyBibtex(pub.links.bibtex)} className="btn btn-ghost btn-sm">
                    <Quote size={14} /> Cite
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
