import type { Metadata } from "next";
import Link from "next/link";
import { getAllTeamMembers } from "@/lib/content";
import { MEMBER_CATEGORY_LABELS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "People",
  description: "Meet the team at CIMILab.",
};

export default async function PeoplePage() {
  const allMembers = await getAllTeamMembers();
  
  // Group members by category
  const groupedMembers = allMembers.reduce((acc, member) => {
    if (!acc[member.category]) acc[member.category] = [];
    acc[member.category].push(member);
    return acc;
  }, {} as Record<string, typeof allMembers>);

  // Define display order
  const displayOrder = ["pi", "postdoc", "phd", "msc", "ra", "intern", "collaborator", "alumni"];

  return (
    <div style={{ paddingTop: "4rem" }}>
      <section className="section" style={{ paddingBottom: "2rem" }}>
        <div className="container" style={{ maxWidth: "900px", textAlign: "center" }}>
          <p style={{ color: "var(--accent-teal)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Our Team
          </p>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "1.5rem" }}>
            The people behind the papers
          </h1>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          {displayOrder.map(category => {
            const members = groupedMembers[category];
            if (!members || members.length === 0) return null;

            return (
              <div key={category} style={{ marginBottom: "5rem" }}>
                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--border)" }}>
                  {MEMBER_CATEGORY_LABELS[category] || category}
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "2rem" }}>
                  {members.map(member => (
                    <Link key={member.slug} href={`/people/${member.slug}`} style={{ textDecoration: "none" }}>
                      <div className="card" style={{ padding: "1.5rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
                        <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", marginBottom: "1.25rem", background: "var(--bg-secondary)", border: "2px solid var(--border)" }}>
                          <img src={member.photo} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        </div>
                        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>
                          {member.name}
                        </h3>
                        <p style={{ color: "var(--accent-teal)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem" }}>
                          {member.title || member.role}
                        </p>
                        {member.interests && member.interests.length > 0 && (
                          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.3rem", marginTop: "auto" }}>
                            {member.interests.slice(0, 2).map(interest => (
                              <span key={interest} style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", background: "rgba(255,255,255,0.05)", borderRadius: "999px", color: "var(--text-muted)" }}>
                                {interest}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
