import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { getAllNewsPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news, updates, paper acceptances, and announcements from CIMILab.",
};

const CATEGORY_COLORS: Record<string, string> = {
  Publication: "rgba(34,211,184,0.15)",
  Award: "rgba(251,191,36,0.15)",
  Talk: "rgba(99,102,241,0.15)",
  Team: "rgba(16,185,129,0.15)",
  Research: "rgba(139,92,246,0.15)",
  General: "rgba(100,116,139,0.15)",
};
const CATEGORY_TEXT: Record<string, string> = {
  Publication: "#22D3B8",
  Award: "#FBBF24",
  Talk: "#6366F1",
  Team: "#10B981",
  Research: "#8B5CF6",
  General: "#64748B",
};

export default async function NewsPage() {
  const posts = await getAllNewsPosts();

  return (
    <div style={{ paddingTop: "4rem" }}>
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
          <p style={{ color: "var(--accent-teal)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Updates
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            Lab News
          </h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {posts.map(post => {
              const bgColor = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS.General;
              const txtColor = CATEGORY_TEXT[post.category] ?? CATEGORY_TEXT.General;
              
              return (
                <Link key={post.slug} href={`/news/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div className="card news-card" style={{ padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, padding: "0.5rem 1rem", borderRadius: "8px", background: bgColor, color: txtColor, fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", minWidth: "90px", textAlign: "center" }}>
                      {post.category}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
                        <Calendar size={14} /> {formatDate(post.date)}
                      </div>
                      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.75rem" }}>
                        {post.title}
                      </h2>
                      <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
                        {post.summary}
                      </p>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", fontWeight: 600, color: "var(--accent-teal)" }}>
                        Read More <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <style>{`
        .news-card { transition: transform 0.2s, border-color 0.2s; }
        .news-card:hover { transform: translateX(4px); border-color: var(--accent-teal) !important; }
        @media (max-width: 600px) {
          .news-card { flexDirection: column; }
        }
      `}</style>
    </div>
  );
}
