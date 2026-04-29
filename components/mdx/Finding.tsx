import { Severity } from "./Severity";

type SeverityLevel = "critical" | "high" | "medium" | "low";

interface FindingProps {
  title: string;
  severity: SeverityLevel;
  cwe?: string;
  children: React.ReactNode;
}

export function Finding({ title, severity, cwe, children }: FindingProps) {
  return (
    <section className="not-prose my-8 rounded-md border border-border bg-surface/30">
      <div className="flex flex-wrap items-center gap-3 border-b border-border px-4 py-3">
        <Severity level={severity} />
        <h3 className="font-mono text-sm font-semibold text-text">{title}</h3>
        {cwe && (
          <a
            href={`https://cwe.mitre.org/data/definitions/${cwe.replace("CWE-", "")}.html`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto font-mono text-xs text-text-muted hover:text-accent no-underline"
          >
            {cwe}
          </a>
        )}
      </div>
      <div className="prose prose-sm px-4 py-4 text-sm text-text [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
        {children}
      </div>
    </section>
  );
}
