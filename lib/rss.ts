import type { Post } from "./content";

const SITE_URL = "https://binston.in";

export function generateRss(posts: Post[]): string {
  const items = posts
    .slice(0, 20)
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${SITE_URL}/writing/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/writing/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.frontmatter.summary}]]></description>
      ${post.frontmatter.tags.map((t) => `<category>${t}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Binston Cardoza</title>
    <link>${SITE_URL}</link>
    <description>Protocol engineering, ZK cryptography, and EVM security research.</description>
    <language>en</language>
    <managingEditor>bsukhaelcardoza@gmail.com (Binston Cardoza)</managingEditor>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}
