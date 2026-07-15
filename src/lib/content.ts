import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import {
  SiteConfig,
  TeamMember,
  Project,
  Publication,
  NewsPost,
  Position,
} from "./types";

const contentDir = path.join(process.cwd(), "content");

// ─── Site Config ────────────────────────────────────────────
export function getSiteConfig(): SiteConfig {
  const filePath = path.join(contentDir, "site-config.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as SiteConfig;
}

// ─── Markdown to HTML ────────────────────────────────────────
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

// ─── Team ────────────────────────────────────────────────────
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const teamDir = path.join(contentDir, "team");
  if (!fs.existsSync(teamDir)) return [];
  const files = fs.readdirSync(teamDir).filter((f) => f.endsWith(".md"));

  const members: TeamMember[] = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(teamDir, file), "utf-8");
      const { data, content } = matter(raw);
      const bioHtml = await markdownToHtml(content);
      return {
        slug,
        ...(data as Omit<TeamMember, "slug" | "bio">),
        bio: bioHtml,
      } as TeamMember;
    })
  );

  return members.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export async function getTeamMemberBySlug(slug: string): Promise<TeamMember | null> {
  const filePath = path.join(contentDir, "team", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const bioHtml = await markdownToHtml(content);
  return { slug, ...(data as Omit<TeamMember, "slug" | "bio">), bio: bioHtml } as TeamMember;
}

// ─── Projects ────────────────────────────────────────────────
export async function getAllProjects(): Promise<Project[]> {
  const projectsDir = path.join(contentDir, "projects");
  if (!fs.existsSync(projectsDir)) return [];
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md"));

  const projects: Project[] = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
      const { data, content } = matter(raw);
      const contentHtml = await markdownToHtml(content);
      return {
        slug,
        ...(data as Omit<Project, "slug" | "content">),
        content: contentHtml,
      } as Project;
    })
  );

  return projects.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const filePath = path.join(contentDir, "projects", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const contentHtml = await markdownToHtml(content);
  return { slug, ...(data as Omit<Project, "slug" | "content">), content: contentHtml } as Project;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.featured);
}

// ─── Publications ─────────────────────────────────────────────
export function getAllPublications(): Publication[] {
  const filePath = path.join(contentDir, "publications", "publications.json");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  const pubs = JSON.parse(raw) as Publication[];
  return pubs.sort((a, b) => b.year - a.year);
}

export function getFeaturedPublications(): Publication[] {
  return getAllPublications().filter((p) => p.featured);
}

// ─── News ────────────────────────────────────────────────────
export async function getAllNewsPosts(): Promise<NewsPost[]> {
  const newsDir = path.join(contentDir, "news");
  if (!fs.existsSync(newsDir)) return [];
  const files = fs.readdirSync(newsDir).filter((f) => f.endsWith(".md"));

  const posts: NewsPost[] = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(newsDir, file), "utf-8");
      const { data, content } = matter(raw);
      const contentHtml = await markdownToHtml(content);
      return {
        slug,
        ...(data as Omit<NewsPost, "slug" | "content">),
        content: contentHtml,
      } as NewsPost;
    })
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  const filePath = path.join(contentDir, "news", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const contentHtml = await markdownToHtml(content);
  return { slug, ...(data as Omit<NewsPost, "slug" | "content">), content: contentHtml } as NewsPost;
}

// ─── Positions ────────────────────────────────────────────────
export function getAllPositions(): Position[] {
  const filePath = path.join(contentDir, "positions", "positions.json");
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Position[];
}
