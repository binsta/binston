const STYLES = {
  critical: "border-critical/30 bg-critical/10 text-critical",
  high: "border-high/30 bg-high/10 text-high",
  medium: "border-medium/30 bg-medium/10 text-medium",
  low: "border-low/30 bg-low/10 text-low",
} as const;

type Level = keyof typeof STYLES;

interface SeverityProps {
  level: Level;
}

export function Severity({ level }: SeverityProps) {
  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 font-mono text-xs font-medium uppercase tracking-wide ${STYLES[level]}`}
    >
      {level}
    </span>
  );
}
