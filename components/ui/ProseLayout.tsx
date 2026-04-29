import { TableOfContents } from "./TableOfContents";
import { HeadingLinkHandler } from "./HeadingLinkHandler";
import type { TocEntry } from "@/lib/toc";

interface ProseLayoutProps {
  toc: TocEntry[];
  children: React.ReactNode;
}

export function ProseLayout({ toc, children }: ProseLayoutProps) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <HeadingLinkHandler />
      <div className="xl:grid xl:grid-cols-[minmax(0,720px)_240px] xl:gap-16">
        {/* Main prose content */}
        <article className="prose min-w-0">
          {children}
        </article>

        {/* Sticky TOC sidebar — only on xl+ */}
        {toc.length > 0 && (
          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <TableOfContents toc={toc} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
