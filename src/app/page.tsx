import { getSiteConfig, getFeaturedProjects, getAllNewsPosts } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { StatsCounter } from "@/components/home/StatsCounter";
import { PillarsGrid } from "@/components/home/PillarsGrid";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { LatestNews } from "@/components/home/LatestNews";

export default async function HomePage() {
  const config = getSiteConfig();
  const featuredProjects = await getFeaturedProjects();
  const allNews = await getAllNewsPosts();
  const latestNews = allNews.slice(0, 3);

  const stats = [
    { value: config.stats.publications, label: "Publications", suffix: "+" },
    { value: config.stats.activeProjects, label: "Active Projects", suffix: "" },
    { value: config.stats.members, label: "Lab Members", suffix: "+" },
    { value: config.stats.yearsActive, label: "Years Active", suffix: "" },
  ];

  return (
    <>
      <Hero />
      <StatsCounter stats={stats} />
      <PillarsGrid />
      <FeaturedProjects projects={featuredProjects} />
      <LatestNews posts={latestNews} />
    </>
  );
}
