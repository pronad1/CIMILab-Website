import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, GitBranch, Briefcase, Mail, ExternalLink, GraduationCap } from "lucide-react";
import { getTeamMemberBySlug, getAllTeamMembers } from "@/lib/content";

export async function generateStaticParams() {
  const members = await getAllTeamMembers();
  return members.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) return {};
  return { title: `${member.name} - CIMILab`, description: member.title || member.role };
}

export default async function PersonDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const member = await getTeamMemberBySlug(slug);
  if (!member) notFound();

  return (
    <div style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <Link href="/people" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "3rem", textDecoration: "none" }}>
          <ArrowLeft size={14} /> Back to Team
        </Link>
        
        <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", marginBottom: "3rem" }} className="person-header">
          {/* Photo */}
          <div style={{ width: "180px", height: "180px", borderRadius: "16px", overflow: "hidden", flexShrink: 0, border: "1px solid var(--border)", background: "var(--bg-secondary)" }}>
            <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Info */}
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>
              {member.name}
            </h1>
            <p style={{ fontSize: "1.2rem", color: "var(--accent-teal)", fontWeight: 500, marginBottom: "1rem" }}>
              {member.title || member.role}
            </p>

            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
              {member.email && (
                <a href={`mailto:${member.email}`} className="btn btn-ghost btn-sm" aria-label="Email">
                  <Mail size={16} />
                </a>
              )}
              {member.links.scholar && (
                <a href={member.links.scholar} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" aria-label="Google Scholar">
                  <GraduationCap size={16} /> Scholar
                </a>
              )}
              {member.links.github && (
                <a href={member.links.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" aria-label="GitHub">
                  <GitBranch size={16} />
                </a>
              )}
              {member.links.linkedin && (
                <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" aria-label="LinkedIn">
                  <Briefcase size={16} />
                </a>
              )}
              {member.links.website && (
                <a href={member.links.website} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" aria-label="Personal Website">
                  <ExternalLink size={16} /> Website
                </a>
              )}
            </div>

            {member.status === "alumni" && member.alumniNowAt && (
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", padding: "0.75rem 1rem", background: "var(--bg-secondary)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                <strong>Alumni:</strong> Now at {member.alumniNowAt}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        <div style={{ marginBottom: "3rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>Biography</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: member.bio }} />
        </div>

        {/* Research Interests */}
        {member.interests && member.interests.length > 0 && (
          <div>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>Research Interests</h2>
            <ul style={{ listStyle: "disc", paddingLeft: "1.5rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {member.interests.map(interest => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .person-header { flexDirection: column; alignItems: center; textAlign: center; }
          .person-header > div:last-child { display: flex; flexDirection: column; alignItems: center; }
        }
      `}</style>
    </div>
  );
}
