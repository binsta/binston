import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProject } from "@/lib/content";
import { extractToc } from "@/lib/toc";
import { mdxOptions } from "@/lib/mdx-options";
import { mdxComponents } from "@/mdx-components";
import { ProseLayout } from "@/components/ui/ProseLayout";
import { ArrowLeft } from "lucide-react";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
    alternates: { canonical: `/projects/${slug}` },
  };
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-xs uppercase tracking-wide text-text-muted">
      {status}
    </span>
  );
}

function TagChip({ tag }: { tag: string }) {
  return (
    <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-xs text-text-muted">
      {tag}
    </span>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const toc = extractToc(project.content);
  const { frontmatter } = project;

  return (
    <ProseLayout toc={toc}>
      <header className="mb-10 not-prose">
        <Link
          href="/projects"
          className="mb-4 inline-flex items-center gap-1 font-mono text-xs text-text-muted hover:text-accent no-underline"
        >
          <ArrowLeft size={12} />
          All projects
        </Link>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={frontmatter.status} />
          {frontmatter.tags.map((tag) => (
            <TagChip key={tag} tag={tag} />
          ))}
        </div>

        <h1 className="text-2xl font-bold text-text leading-tight md:text-3xl">
          {frontmatter.title}
        </h1>
        {frontmatter.tagline && (
          <p className="mt-2 text-lg text-text-muted">{frontmatter.tagline}</p>
        )}
        <p className="mt-3 text-base text-text-muted">{frontmatter.summary}</p>

        <hr className="mt-6 border-border" />
      </header>

      <MDXRemote
        source={project.content}
        components={mdxComponents}
        options={mdxOptions}
      />
    </ProseLayout>
  );
}
