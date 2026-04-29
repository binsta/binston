interface FootnoteRefProps {
  id: string;
}

export function FootnoteRef({ id }: FootnoteRefProps) {
  return (
    <a
      href={`#fn-${id}`}
      id={`fnref-${id}`}
      aria-label={`Footnote reference ${id}`}
      className="ml-0.5 align-super font-mono text-[0.65em] text-accent no-underline hover:text-accent-hover"
    >
      [{id}]
    </a>
  );
}
