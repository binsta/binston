import { Info, AlertTriangle, AlertCircle, FileText } from "lucide-react";

const VARIANTS = {
  info: {
    icon: Info,
    classes: "border-blue-500/30 bg-blue-500/5 text-blue-400",
    label: "Info",
  },
  warn: {
    icon: AlertTriangle,
    classes: "border-medium/30 bg-medium/5 text-medium",
    label: "Warning",
  },
  note: {
    icon: FileText,
    classes: "border-border bg-surface text-text-muted",
    label: "Note",
  },
  danger: {
    icon: AlertCircle,
    classes: "border-critical/30 bg-critical/5 text-critical",
    label: "Danger",
  },
} as const;

type CalloutType = keyof typeof VARIANTS;

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

export function Callout({ type = "note", children }: CalloutProps) {
  const { icon: Icon, classes, label } = VARIANTS[type];
  return (
    <div
      className={`not-prose my-6 flex gap-3 rounded-md border px-4 py-3 text-sm ${classes}`}
      role={type === "danger" || type === "warn" ? "alert" : undefined}
    >
      <Icon size={16} className="mt-0.5 shrink-0" aria-label={label} />
      <div className="prose prose-sm min-w-0 text-text [&_p]:my-1">
        {children}
      </div>
    </div>
  );
}
