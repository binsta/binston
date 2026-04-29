import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllAudits, getAudit } from "@/lib/content";
import { extractToc } from "@/lib/toc";
import { mdxOptions } from "@/lib/mdx-options";
import { mdxComponents } from "@/mdx-components";
import { ProseLayout } from "@/components/ui/ProseLayout";
import { Severity } from "@/components/mdx/Severity";
import { ArrowLeft, ExternalLink } from "lucide-react";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return getAllAudits().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const audit = getAudit(slug);
  if (!audit) return {};
  return {
    title: audit.frontmatter.title,
    description: audit.frontmatter.summary,
    alternates: { canonical: `/audits/${slug}` },
  };
}

const PLATFORM_LABELS: Record<string, string> = {
  c4: "Code4rena",
  cantina: "Cantina",
  immunefi: "Immunefi",
  bnb: "BNB Chain",
};

export default async function AuditPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const audit = getAudit(slug);
  if (!audit) notFound();

  const toc = extractToc(audit.content);
  const { frontmatter } = audit;

  return (
    <ProseLayout toc={toc}>
      <header className="mb-10 not-prose">
        <Link
          href="/audits"
          className="mb-4 inline-flex items-center gap-1 font-mono text-xs text-text-muted hover:text-accent no-underline"
        >
          <ArrowLeft size={12} />
          All findings
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Severity level={frontmatter.severity} />
          <span className="font-mono text-xs text-text-muted">
            {PLATFORM_LABELS[frontmatter.platform] ?? frontmatter.platform}
          </span>
          <span className="font-mono text-xs text-text-muted">·</span>
          <span className="font-mono text-xs text-text-muted">
            {frontmatter.protocol}
          </span>
          {frontmatter.status !== "confirmed" && (
            <>
              <span className="font-mono text-xs text-text-muted">·</span>
              <span className="font-mono text-xs text-text-muted">
                {frontmatter.status}
              </span>
            </>
          )}
        </div>

        <h1 className="text-2xl font-bold text-text leading-tight md:text-3xl">
          {frontmatter.title}
        </h1>
        <p className="mt-3 text-base text-text-muted">{frontmatter.summary}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3 font-mono text-xs text-text-muted">
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {frontmatter.payout && (
            <>
              <span>·</span>
              <span className="text-medium">{frontmatter.payout}</span>
            </>
          )}
          {frontmatter.report_url && (
            <>
              <span>·</span>
              <a
                href={frontmatter.report_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent hover:text-accent-hover no-underline"
              >
                Report <ExternalLink size={11} />
              </a>
            </>
          )}
        </div>

        <hr className="mt-6 border-border" />
      </header>

      <MDXRemote
        source={audit.content}
        components={mdxComponents}
        options={mdxOptions}
      />
    </ProseLayout>
  );
}
