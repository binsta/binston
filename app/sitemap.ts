import type { MetadataRoute } from "next";
import { getAllPosts, getAllAudits } from "@/lib/content";

const BASE = "https://binston.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const audits = getAllAudits();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), priority: 1 },
    { url: `${BASE}/writing`, lastModified: new Date(), priority: 0.9 },
    { url: `${BASE}/audits`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/projects`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), priority: 0.6 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/writing/${p.slug}`,
    lastModified: new Date(p.frontmatter.updated ?? p.frontmatter.date),
    priority: 0.8,
  }));

  const auditRoutes: MetadataRoute.Sitemap = audits.map((a) => ({
    url: `${BASE}/audits/${a.slug}`,
    lastModified: new Date(a.frontmatter.date),
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes, ...auditRoutes];
}
