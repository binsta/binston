import Link from "next/link";
import Script from "next/script";
import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content";
import { GitHubIcon, XIcon } from "@/components/ui/SocialIcons";
import {
  Mail,
  Download,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const PROJECTS = [
  {
    name: "ATLAS",
    href: "/projects#atlas",
    tagline: "Algebraic constraint system for ZK circuit verification",
    tags: ["Rust", "ZK", "Groth16"],
    status: "active" as const,
  },
  {
    name: "ARGUS",
    href: "/projects#argus",
    tagline: "Concolic execution engine for EVM bytecode analysis",
    tags: ["Rust", "EVM", "Formal Methods"],
    status: "active" as const,
  },
];

const AUDIT_PROTOCOLS = [
  "Injective",
  "Axelar",
  "BNB Chain",
  "Jupiter Lend",
  "Kiln",
  "Coinbase",
];

const CONTACT = [
  {
    href: "mailto:binstoncardoza@gmail.com",
    label: "binstoncardoza@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    href: "https://github.com/binsta",
    label: "github/binsta",
    icon: GitHubIcon,
    external: true,
  },
  {
    href: "https://x.com/binston",
    label: "x/binston",
    icon: XIcon,
    external: true,
  },
];

const CV_LINK = {
  href: "/BinstonCardoza.pdf",
  label: "Binston_Cardoza_Resume.pdf",
  icon: Download,
  external: false,
};

const HAS_CV = true;

function TagChip({ tag }: { tag: string }) {
  return (
    <span className="rounded border border-border bg-surface px-2 py-0.5 font-mono text-xs text-text-muted">
      {tag}
    </span>
  );
}

function ProjectCard({
  name,
  href,
  tagline,
  tags,
}: (typeof PROJECTS)[number]) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-lg border border-border bg-bg-subtle p-5 transition-colors hover:border-accent/40 no-underline"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono font-semibold text-text">{name}</span>
        <ExternalLink
          size={14}
          className="mt-0.5 shrink-0 text-text-muted opacity-0 transition-opacity group-hover:opacity-100"
        />
      </div>
      <p className="text-sm text-text-muted">{tagline}</p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((t) => (
          <TagChip key={t} tag={t} />
        ))}
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);
  const contactLinks = HAS_CV ? [...CONTACT, CV_LINK] : CONTACT;

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
      {/* ── Hero ── */}
      <section aria-label="Introduction" className="mb-16">
        <h1 className="text-3xl font-bold text-text md:text-4xl">
          Binston Cardoza
        </h1>
        <p className="mt-1 font-mono text-base text-accent">
          Protocol Engineer
        </p>
        <p className="mt-4 max-w-prose text-text-muted">
          I build Rust-based tooling for ZK cryptography and EVM bytecode
          analysis. I also find bugs in production protocols — Injective,
          Axelar, BNB Chain, and others.
        </p>

        {/* Contact */}
        <nav aria-label="Contact links" className="mt-6 flex flex-wrap gap-4">
          {contactLinks.map(({ href, label, icon: Icon, external }) => (
            <Link
              key={href}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              download={href.endsWith(".pdf") ? true : undefined}
              className="inline-flex items-center gap-1.5 font-mono text-sm text-text-muted transition-colors hover:text-accent no-underline"
            >
              <Icon width={14} height={14} />
              {label}
            </Link>
          ))}
        </nav>
      </section>

      {/* ── Projects ── */}
      <section aria-label="Projects" className="mb-12">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
          Projects
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.name} {...p} />
          ))}
        </div>
      </section>

      {/* ── Audits strip ── */}
      <section aria-label="Audit work" className="mb-12">
        <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-text-muted">
          Findings at
        </h2>
        <p className="text-sm text-text-muted">
          {AUDIT_PROTOCOLS.map((p, i) => (
            <span key={p}>
              {p}
              {i < AUDIT_PROTOCOLS.length - 1 && (
                <span className="mx-2 text-border">·</span>
              )}
            </span>
          ))}
        </p>
        <Link
          href="/audits"
          className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-accent hover:text-accent-hover no-underline"
        >
          All findings <ArrowRight size={12} />
        </Link>
      </section>

      {/* ── Latest writing ── */}
      {recentPosts.length > 0 && (
        <section aria-label="Recent writing">
          <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-text-muted">
            Latest writing
          </h2>
          <ul className="space-y-4" role="list">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/writing/${post.slug}`}
                  className="group flex items-start justify-between gap-4 no-underline"
                >
                  <div>
                    <p className="text-sm font-medium text-text transition-colors group-hover:text-accent">
                      {post.frontmatter.title}
                    </p>
                    <p className="mt-0.5 text-xs text-text-muted">
                      {post.frontmatter.summary}
                    </p>
                  </div>
                  <time
                    dateTime={post.frontmatter.date}
                    className="shrink-0 font-mono text-xs text-text-muted"
                  >
                    {new Date(post.frontmatter.date).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "short", day: "numeric" }
                    )}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/writing"
            className="mt-5 inline-flex items-center gap-1 font-mono text-xs text-accent hover:text-accent-hover no-underline"
          >
            All posts <ArrowRight size={12} />
          </Link>
        </section>
      )}

      {/* JSON-LD person schema */}
      <Script
        id="person-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Binston Cardoza",
            url: "https://binston.in",
            sameAs: [
              "https://github.com/binsta",
              "https://x.com/binston",
            ],
            jobTitle: "Protocol Engineer",
            knowsAbout: [
              "ZK Cryptography",
              "Rust",
              "EVM",
              "Smart Contract Security",
              "Formal Methods",
            ],
          }),
        }}
      />
    </div>
  );
}
