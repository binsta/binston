import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { ArrowLeft } from "lucide-react";

const VALID_TAGS = ["zk", "formal-methods", "evm", "audits"] as const;
type Tag = (typeof VALID_TAGS)[number];

interface Params {
  tag: string;
}

export function generateStaticParams(): Params[] {
  return VALID_TAGS.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag}`,
    description: `Posts tagged with ${tag}.`,
  };
}

export default async function TagPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tag } = await params;
  if (!VALID_TAGS.includes(tag as Tag)) notFound();

  const posts = getAllPosts().filter((p) =>
    p.frontmatter.tags.includes(tag as Tag)
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <Link
        href="/writing"
        className="mb-6 inline-flex items-center gap-1 font-mono text-xs text-text-muted hover:text-accent no-underline"
      >
        <ArrowLeft size={12} />
        All posts
      </Link>

      <h1 className="text-2xl font-bold text-text">
        #{tag}
        <span className="ml-2 font-mono text-base font-normal text-text-muted">
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </span>
      </h1>

      <ul className="mt-8 space-y-0" role="list">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-border last:border-0">
            <Link
              href={`/writing/${post.slug}`}
              className="group flex items-start justify-between gap-6 py-5 no-underline"
            >
              <div className="min-w-0">
                <h2 className="text-base font-semibold text-text transition-colors group-hover:text-accent">
                  {post.frontmatter.title}
                </h2>
                <p className="mt-1 text-sm text-text-muted">
                  {post.frontmatter.summary}
                </p>
              </div>
              <time
                dateTime={post.frontmatter.date}
                className="shrink-0 font-mono text-xs text-text-muted"
              >
                {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </time>
            </Link>
          </li>
        ))}
      </ul>

      {posts.length === 0 && (
        <p className="mt-8 text-text-muted">No posts with this tag yet.</p>
      )}
    </div>
  );
}
