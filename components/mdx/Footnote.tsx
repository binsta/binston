interface FootnoteProps {
  id: string;
  children: React.ReactNode;
}

export function Footnote({ id, children }: FootnoteProps) {
  return (
    <aside
      id={`fn-${id}`}
      className="not-prose my-1 border-l-2 border-border pl-3 text-sm text-text-muted xl:float-right xl:clear-right xl:-mr-52 xl:w-44 xl:border-l xl:pl-3 xl:text-xs"
      aria-label={`Footnote ${id}`}
    >
      {children}
    </aside>
  );
}
