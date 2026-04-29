import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
  WritingFrontmatterSchema,
  AuditFrontmatterSchema,
  ProjectFrontmatterSchema,
  type WritingFrontmatter,
  type AuditFrontmatter,
  type ProjectFrontmatter,
} from "./schemas";

const contentDir = path.join(process.cwd(), "content");

function slugify(filename: string): string {
  return filename.replace(/\.mdx?$/, "");
}

function readDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f));
}

function isVisible(frontmatter: { draft?: boolean }): boolean {
  return !frontmatter.draft || process.env.NODE_ENV === "development";
}

export interface Post {
  slug: string;
  frontmatter: WritingFrontmatter;
  content: string;
  readingTime: string;
}

export interface Audit {
  slug: string;
  frontmatter: AuditFrontmatter;
  content: string;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function getAllPosts(): Post[] {
  const dir = path.join(contentDir, "writing");
  return readDir(dir)
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = WritingFrontmatterSchema.parse(data);
      return {
        slug: slugify(filename),
        frontmatter,
        content,
        readingTime: readingTime(content).text,
      };
    })
    .filter((p) => isVisible(p.frontmatter))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getPost(slug: string): Post | null {
  const filePath = path.join(contentDir, "writing", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = WritingFrontmatterSchema.parse(data);
  if (!isVisible(frontmatter)) return null;
  return { slug, frontmatter, content, readingTime: readingTime(content).text };
}

export function getAdjacentPosts(
  slug: string
): { prev: Post | null; next: Post | null } {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  return {
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  };
}

export function getAllAudits(): Audit[] {
  const dir = path.join(contentDir, "audits");
  return readDir(dir)
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = AuditFrontmatterSchema.parse(data);
      return { slug: slugify(filename), frontmatter, content };
    })
    .filter((a) => isVisible(a.frontmatter))
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export function getAudit(slug: string): Audit | null {
  const base = path.join(contentDir, "audits", slug);
  const tryPaths = [`${base}.mdx`, `${base}.md`];
  const filePath = tryPaths.find(fs.existsSync);
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = AuditFrontmatterSchema.parse(data);
  if (!isVisible(frontmatter)) return null;
  return { slug, frontmatter, content };
}

export function getProject(slug: string): Project | null {
  const filePath = path.join(contentDir, "projects", `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = ProjectFrontmatterSchema.parse(data);
  return { slug, frontmatter, content };
}

export function getAllProjects(): Project[] {
  const dir = path.join(contentDir, "projects");
  return readDir(dir)
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = ProjectFrontmatterSchema.parse(data);
      return { slug: slugify(filename), frontmatter, content };
    })
    .sort((a, b) => {
      const dateDelta =
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime();
      if (dateDelta !== 0) return dateDelta;
      return a.frontmatter.title.localeCompare(b.frontmatter.title);
    });
}
