import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Rust-based tooling for ZK circuit verification, EVM bytecode analysis, and security research workflows.",
  alternates: { canonical: "/projects" },
};

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

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <header className="max-w-3xl">
        <h1 className="text-2xl font-bold text-text">Projects</h1>
        <p className="mt-2 text-text-muted">
          Research-oriented tools for ZK systems, EVM bytecode analysis, and
          security review workflows.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="mt-10 text-text-muted">No projects published yet.</p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group flex min-h-48 flex-col justify-between rounded-md border border-border bg-bg-subtle p-5 no-underline transition-colors hover:border-accent/50"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-mono text-base font-semibold text-text">
                      {project.frontmatter.title}
                    </h2>
                    <ArrowRight
                      size={16}
                      className="mt-0.5 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </div>
                  <p className="mt-3 text-sm text-text-muted">
                    {project.frontmatter.summary}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  <StatusBadge status={project.frontmatter.status} />
                  {project.frontmatter.tags.slice(0, 3).map((tag) => (
                    <TagChip key={tag} tag={tag} />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
