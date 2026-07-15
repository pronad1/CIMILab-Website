import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { NewsPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface LatestNewsProps {
  posts: NewsPost[];
}

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

export function LatestNews({ posts }: LatestNewsProps) {
  return (
    <section className="section">
      <div className="container">
        {/* Heading */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                color: "var(--accent-teal)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              Lab News
            </p>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
              }}
            >
              Latest from CIMILab
            </h2>
          </div>
          <Link
            href="/news"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              color: "var(--accent-teal)",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            All news <ArrowRight size={14} />
          </Link>
        </div>

        {/* News cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {posts.map((post, i) => {
            const bgColor = CATEGORY_COLORS[post.category] ?? CATEGORY_COLORS.General;
            const txtColor = CATEGORY_TEXT[post.category] ?? CATEGORY_TEXT.General;
            return (
              <Link
                key={post.slug}
                href={`/news/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card"
                  style={{
                    padding: "1.5rem",
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Category pill */}
                  <div
                    style={{
                      flexShrink: 0,
                      padding: "0.5rem 0.875rem",
                      borderRadius: "8px",
                      background: bgColor,
                      color: txtColor,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      minWidth: "80px",
                      textAlign: "center",
                    }}
                  >
                    {post.category}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        marginBottom: "0.375rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        color: "var(--text-muted)",
                        fontSize: "0.875rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {post.summary}
                    </p>
                  </div>

                  {/* Date */}
                  <div
                    style={{
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      color: "var(--text-muted)",
                      fontSize: "0.8rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <Calendar size={12} />
                    {formatDate(post.date)}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
