import { getAllPosts, getAllAudits, getAllProjects } from "./content";

export interface SearchItem {
  type: "post" | "audit" | "project";
  title: string;
  slug: string;
  url: string;
  summary: string;
  tags: string[];
}

export async function buildSearchIndex(): Promise<SearchItem[]> {
  const [posts, audits, projects] = await Promise.all([
    Promise.resolve(getAllPosts()),
    Promise.resolve(getAllAudits()),
    Promise.resolve(getAllProjects()),
  ]);

  return [
    ...projects.map((p) => ({
      type: "project" as const,
      title: p.frontmatter.title,
      slug: p.slug,
      url: `/projects#${p.slug}`,
      summary: p.frontmatter.summary,
      tags: p.frontmatter.tags,
    })),
    ...posts.map((p) => ({
      type: "post" as const,
      title: p.frontmatter.title,
      slug: p.slug,
      url: `/writing/${p.slug}`,
      summary: p.frontmatter.summary,
      tags: p.frontmatter.tags as string[],
    })),
    ...audits.map((a) => ({
      type: "audit" as const,
      title: a.frontmatter.title,
      slug: a.slug,
      url: `/audits/${a.slug}`,
      summary: a.frontmatter.summary,
      tags: a.frontmatter.tags ?? [],
    })),
  ];
}
