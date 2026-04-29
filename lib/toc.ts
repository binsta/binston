export interface TocEntry {
  depth: 2 | 3;
  text: string;
  id: string;
}

export function extractToc(content: string): TocEntry[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const entries: TocEntry[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length as 2 | 3;
    const text = match[2].replace(/`[^`]+`/g, (m) => m.slice(1, -1)).trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
    entries.push({ depth, text, id });
  }

  return entries;
}
