import type { Metadata } from "next";
import Link from "next/link";
import { getAllAudits } from "@/lib/content";
import { Severity } from "@/components/mdx/Severity";

export const metadata: Metadata = {
  title: "Audits",
  description:
    "Smart contract security findings from Code4rena, Cantina, Immunefi, and BNB Chain bug bounty programs.",
};

const PLATFORM_LABELS: Record<string, string> = {
  c4: "Code4rena",
  cantina: "Cantina",
  immunefi: "Immunefi",
  bnb: "BNB Chain",
};

const STATUS_STYLES: Record<string, string> = {
  reported: "text-low",
  confirmed: "text-medium",
  disputed: "text-text-muted",
  duplicate: "text-text-muted",
};

const SEVERITY_ORDER = ["critical", "high", "medium", "low"] as const;

export default function AuditsPage() {
  const audits = getAllAudits();

  const sortedAudits = [...audits].sort((a, b) => {
    const si =
      SEVERITY_ORDER.indexOf(a.frontmatter.severity) -
      SEVERITY_ORDER.indexOf(b.frontmatter.severity);
    if (si !== 0) return si;
    return (
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
    );
  });

  const severityCounts = audits.reduce<Record<string, number>>((acc, audit) => {
    acc[audit.frontmatter.severity] =
      (acc[audit.frontmatter.severity] ?? 0) + 1;
    return acc;
  }, {});
  const confirmedCount = audits.filter(
    (audit) => audit.frontmatter.status === "confirmed"
  ).length;
  const platformCount = new Set(audits.map((audit) => audit.frontmatter.platform))
    .size;
  const notableFinding = sortedAudits[0];

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-bold text-text">Audit Findings</h1>
      <p className="mt-2 text-text-muted">
        Security findings from competitive audits and bug bounty programs.
      </p>

      {audits.length > 0 && (
        <>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-md border border-border bg-surface/30 px-4 py-3">
              <dt className="font-mono text-xs uppercase tracking-wide text-text-muted">
                Findings
              </dt>
              <dd className="mt-1 font-mono text-2xl font-semibold text-text">
                {audits.length}
              </dd>
            </div>
            <div className="rounded-md border border-border bg-surface/30 px-4 py-3">
              <dt className="font-mono text-xs uppercase tracking-wide text-text-muted">
                High+
              </dt>
              <dd className="mt-1 font-mono text-2xl font-semibold text-high">
                {(severityCounts.critical ?? 0) + (severityCounts.high ?? 0)}
              </dd>
            </div>
            <div className="rounded-md border border-border bg-surface/30 px-4 py-3">
              <dt className="font-mono text-xs uppercase tracking-wide text-text-muted">
                Confirmed
              </dt>
              <dd className="mt-1 font-mono text-2xl font-semibold text-medium">
                {confirmedCount}
              </dd>
            </div>
            <div className="rounded-md border border-border bg-surface/30 px-4 py-3">
              <dt className="font-mono text-xs uppercase tracking-wide text-text-muted">
                Platforms
              </dt>
              <dd className="mt-1 font-mono text-2xl font-semibold text-text">
                {platformCount}
              </dd>
            </div>
          </dl>

          {notableFinding && (
            <section className="mt-8 rounded-md border border-border bg-bg-subtle px-5 py-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wide text-text-muted">
                  Notable finding
                </span>
                <Severity level={notableFinding.frontmatter.severity} />
              </div>
              <h2 className="mt-3 text-lg font-semibold leading-tight text-text">
                <Link
                  href={`/audits/${notableFinding.slug}`}
                  className="no-underline hover:text-accent"
                >
                  {notableFinding.frontmatter.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                {notableFinding.frontmatter.summary}
              </p>
            </section>
          )}
        </>
      )}

      <div className="mt-10">
        {audits.length === 0 ? (
          <p className="text-text-muted">No findings published yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-md border border-border">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-muted">
                    Protocol
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-muted">
                    Finding
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-muted">
                    Severity
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-muted">
                    Platform
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wide text-text-muted">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right font-mono text-xs uppercase tracking-wide text-text-muted">
                    Payout
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedAudits.map((audit, i) => (
                  <tr
                    key={audit.slug}
                    className={`border-b border-border last:border-0 transition-colors hover:bg-bg-subtle ${
                      i % 2 === 0 ? "" : "bg-surface/30"
                    }`}
                  >
                    <td className="px-4 py-3 font-mono text-xs text-text">
                      {audit.frontmatter.protocol}
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <Link
                        href={`/audits/${audit.slug}`}
                        className="font-medium text-text hover:text-accent no-underline"
                      >
                        {audit.frontmatter.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <Severity level={audit.frontmatter.severity} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-muted">
                      {PLATFORM_LABELS[audit.frontmatter.platform] ??
                        audit.frontmatter.platform}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-mono text-xs ${
                          STATUS_STYLES[audit.frontmatter.status] ??
                          "text-text-muted"
                        }`}
                      >
                        {audit.frontmatter.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-xs text-text-muted">
                      {audit.frontmatter.payout ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="text-lg font-semibold text-text">Review focus</h2>
        <p className="mt-2 text-sm text-text-muted">
          I focus on protocol-level bugs where implementation details break the
          intended security model: replay boundaries, signing flows, invariant
          violations, arithmetic assumptions, and state transitions that can be
          reached through normal user behavior.
        </p>
      </section>
    </div>
  );
}
