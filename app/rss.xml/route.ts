import { getAllPosts } from "@/lib/content";
import { generateRss } from "@/lib/rss";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const posts = getAllPosts();
  const rss = generateRss(posts);
  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
