export const dynamic = "force-static";

import { buildSearchIndex } from "@/lib/search";

export async function GET() {
  const index = await buildSearchIndex();
  return Response.json(index, {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  });
}
