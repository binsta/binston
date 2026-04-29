import { ExternalLink } from "lucide-react";

interface PaperProps {
  title: string;
  authors: string;
  year: number | string;
  eprint?: string;
  arxiv?: string;
  doi?: string;
}

export function Paper({ title, authors, year, eprint, arxiv, doi }: PaperProps) {
  const links: { label: string; href: string }[] = [];
  if (eprint)
    links.push({ label: "ePrint", href: `https://eprint.iacr.org/${eprint}` });
  if (arxiv)
    links.push({ label: "arXiv", href: `https://arxiv.org/abs/${arxiv}` });
  if (doi) links.push({ label: "DOI", href: `https://doi.org/${doi}` });

  return (
    <div className="not-prose my-5 rounded-md border border-border bg-surface/50 px-4 py-3">
      <p className="text-sm font-semibold text-text">{title}</p>
      <p className="mt-0.5 text-sm text-text-muted">
        {authors} · {year}
      </p>
      {links.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-3">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs text-accent hover:text-accent-hover no-underline"
            >
              {label}
              <ExternalLink size={11} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
