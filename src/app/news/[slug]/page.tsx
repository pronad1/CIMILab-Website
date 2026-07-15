import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getNewsPostBySlug, getAllNewsPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getAllNewsPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);
  if (!post) notFound();

  return (
    <div style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <Link href="/news" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "3rem", textDecoration: "none" }}>
          <ArrowLeft size={14} /> Back to News
        </Link>
        
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
            <span style={{ padding: "0.3rem 0.75rem", borderRadius: "999px", background: "rgba(34,211,184,0.1)", color: "var(--accent-teal)", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {post.category}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              <Calendar size={14} /> {formatDate(post.date)}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            {post.title}
          </h1>
          
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.6, paddingBottom: "2rem", borderBottom: "1px solid var(--border)" }}>
            {post.summary}
          </p>
        </div>

        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />

        {post.tags && post.tags.length > 0 && (
          <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <Tag size={16} color="var(--text-muted)" />
            {post.tags.map(tag => (
              <span key={tag} style={{ fontSize: "0.8rem", padding: "0.2rem 0.6rem", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--text-muted)" }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
