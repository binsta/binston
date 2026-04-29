import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Post } from "@/lib/content";

interface PostNavProps {
  prev: Post | null;
  next: Post | null;
}

export function PostNav({ prev, next }: PostNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Post navigation"
      className="mt-16 flex items-start justify-between gap-8 border-t border-border pt-8"
    >
      <div className="flex-1">
        {prev && (
          <Link
            href={`/writing/${prev.slug}`}
            className="group flex flex-col gap-1 no-underline"
          >
            <span className="flex items-center gap-1 text-xs text-text-muted transition-colors group-hover:text-accent">
              <ArrowLeft size={12} />
              Older
            </span>
            <span className="text-sm font-medium text-text transition-colors group-hover:text-accent line-clamp-2">
              {prev.frontmatter.title}
            </span>
          </Link>
        )}
      </div>

      <div className="flex-1 text-right">
        {next && (
          <Link
            href={`/writing/${next.slug}`}
            className="group flex flex-col items-end gap-1 no-underline"
          >
            <span className="flex items-center gap-1 text-xs text-text-muted transition-colors group-hover:text-accent">
              Newer
              <ArrowRight size={12} />
            </span>
            <span className="text-sm font-medium text-text transition-colors group-hover:text-accent line-clamp-2">
              {next.frontmatter.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
