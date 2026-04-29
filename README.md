# binston.in

Portfolio, research blog, and audit-finding archive for Binston Cardoza.

## Stack

- Next.js App Router with TypeScript strict mode
- Tailwind CSS v4 with CSS-first tokens in `app/globals.css`
- MDX content loaded from `content/**` and validated with Zod frontmatter schemas
- `next-themes` dark/light theme support
- `cmdk` + `fuse.js` search over published posts and audit findings
- Dynamic OG images, RSS, sitemap, robots, and Vercel Analytics

## Development

```bash
pnpm dev
pnpm lint
pnpm exec tsc --noEmit
pnpm build
pnpm start
```

The production build fetches Google font assets through `next/font/google`.
If the local environment blocks outbound network access, `pnpm build` can fail
at the font step even when linting and TypeScript are clean.

## Content

```text
content/writing/*.mdx   -> /writing/[slug]
content/audits/*.mdx    -> /audits/[slug]
content/projects/*.mdx  -> /projects
```

Filenames become slugs. Frontmatter is parsed in `lib/content.ts` and validated
by `lib/schemas.ts`; malformed content fails the build.

## Notes

- Social/contact links live in `app/(site)/page.tsx`,
  `app/(site)/about/page.tsx`, and `components/ui/Footer.tsx`.
- The CV link appears only when `public/cv.pdf` exists.
- Custom MDX components are registered in `mdx-components.tsx`.
- Search index generation lives in `lib/search.ts` and
  `app/api/search/route.ts`.
