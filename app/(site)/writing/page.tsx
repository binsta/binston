import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Research and notes on ZK cryptography, EVM internals, formal methods, and security.",
};

const ALL_TAGS = ["zk", "formal-methods", "evm", "audits"] as const;

interface WritingPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function WritingPage({ searchParams }: WritingPageProps) {
  const { tag } = await searchParams;
  const allPosts = getAllPosts();
  const posts = tag
    ? allPosts.filter((p) => p.frontmatter.tags.includes(tag as never))
    : allPosts;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold text-text">Writing</h1>
      <p className="mt-2 text-text-muted">
        Notes and research on ZK cryptography, EVM internals, formal methods,
        and security.
      </p>

      {/* Tag filters */}
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
        <Link
          href="/writing"
          className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors no-underline ${
            !tag
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-text-muted hover:border-accent/50 hover:text-text"
          }`}
        >
          All
        </Link>
        {ALL_TAGS.map((t) => (
          <Link
            key={t}
            href={`/writing?tag=${t}`}
            className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors no-underline ${
              tag === t
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-text-muted hover:border-accent/50 hover:text-text"
            }`}
          >
            {t}
          </Link>
        ))}
      </div>

      {/* Post list */}
      <div className="mt-10">
        {posts.length === 0 ? (
          <p className="text-text-muted">No posts yet.</p>
        ) : (
          <ul className="space-y-0" role="list">
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
                    <p className="mt-1 text-sm text-text-muted line-clamp-2">
                      {post.frontmatter.summary}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {post.frontmatter.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[11px] text-text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <time
                      dateTime={post.frontmatter.date}
                      className="font-mono text-xs text-text-muted"
                    >
                      {new Date(post.frontmatter.date).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </time>
                    <span className="font-mono text-xs text-text-muted">
                      {post.readingTime}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
