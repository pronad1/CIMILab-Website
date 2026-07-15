import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div className="container" style={{ maxWidth: "500px" }}>
        <h1 style={{ fontSize: "5rem", fontWeight: 800, letterSpacing: "-0.05em", background: "linear-gradient(135deg, #22D3B8, #6366F1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "1rem" }}>
          404
        </h1>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem" }}>Page not found</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="btn btn-primary" style={{ justifyContent: "center" }}>
          <ArrowLeft size={16} /> Return to Homepage
        </Link>
      </div>
    </div>
  );
}
