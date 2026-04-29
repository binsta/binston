import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost, getAdjacentPosts } from "@/lib/content";
import { extractToc } from "@/lib/toc";
import { mdxOptions } from "@/lib/mdx-options";
import { mdxComponents } from "@/mdx-components";
import { ProseLayout } from "@/components/ui/ProseLayout";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { PostNav } from "@/components/ui/PostNav";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const ogUrl = `/og?title=${encodeURIComponent(post.frontmatter.title)}&tag=${post.frontmatter.tags[0] ?? ""}`;

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: "article",
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updated,
      tags: post.frontmatter.tags,
      images: [ogUrl],
    },
    alternates: { canonical: `/writing/${slug}` },
  };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const toc = extractToc(post.content);

  const formattedDate = new Date(post.frontmatter.date).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <ReadingProgress />
      <ProseLayout toc={toc}>
        <header className="mb-10 not-prose">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {post.frontmatter.tags.map((t) => (
              <span
                key={t}
                className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-xs text-text-muted"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-bold text-text leading-tight md:text-3xl">
            {post.frontmatter.title}
          </h1>
          <p className="mt-3 text-base text-text-muted">
            {post.frontmatter.summary}
          </p>
          <div className="mt-4 flex items-center gap-3 font-mono text-xs text-text-muted">
            <time dateTime={post.frontmatter.date}>{formattedDate}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
            {post.frontmatter.updated && (
              <>
                <span>·</span>
                <span>
                  updated{" "}
                  {new Date(post.frontmatter.updated).toLocaleDateString(
                    "en-US",
                    { year: "numeric", month: "short" }
                  )}
                </span>
              </>
            )}
          </div>
          <hr className="mt-6 border-border" />
        </header>

        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={mdxOptions}
        />

        <PostNav prev={prev} next={next} />
      </ProseLayout>

      <Script
        id={`article-jsonld-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.frontmatter.title,
            description: post.frontmatter.summary,
            datePublished: post.frontmatter.date,
            dateModified: post.frontmatter.updated ?? post.frontmatter.date,
            author: {
              "@type": "Person",
              name: "Binston Cardoza",
              url: "https://binston.in",
            },
            url: `https://binston.in/writing/${slug}`,
          }),
        }}
      />
    </>
  );
}
