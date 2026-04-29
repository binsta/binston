interface BenchmarkProps {
  caption?: string;
  children: React.ReactNode;
}

export function Benchmark({ caption, children }: BenchmarkProps) {
  return (
    <figure className="not-prose my-6 overflow-x-auto">
      <div className="min-w-full overflow-hidden rounded-md border border-border [&_table]:min-w-full [&_table]:border-collapse [&_table]:text-sm [&_th]:border-b [&_th]:border-border [&_th]:bg-surface [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-mono [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-wide [&_th]:text-text-muted [&_td]:border-b [&_td]:border-border [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-text [&_tbody_tr:last-child_td]:border-b-0">
        {children}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
