# AIToolStack — Blog

A Next.js 16 (App Router) + TypeScript + Tailwind CSS v4 blog for honest AI-tool
reviews and tutorials. Articles are MDX files; publishing is schedule-driven.

> **Rename me:** the site name, tagline, URL and contact email all live in
> **`src/site.config.ts`**. Edit that one file — nothing else
> needs touching.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Add a new article

1. Create `content/articles/my-article-slug.mdx`:

```mdx
---
title: "My Article Title"
description: "One or two sentences — used for SEO, cards, and RSS."
date: "2026-11-01"        # display date
publishDate: "2026-11-01" # visibility gate (YYYY-MM-DD)
tags: ["AI coding tools", "Cursor"]
slug: "my-article-slug"   # optional; defaults to the filename
---

Your markdown/MDX content here. H2/H3 headings automatically appear
in the table of contents and get anchor links.
```

2. That's it — no registry, no code changes. The `/blog` listing, sitemap,
   RSS feed, and related-article logic pick it up automatically.

Frontmatter reference: `title` (string), `description` (string),
`date` (YYYY-MM-DD, shown to readers), `publishDate` (YYYY-MM-DD, controls
visibility), `tags` (string array), `slug` (string, optional).

## How scheduled publishing works

Set a **future** `publishDate` on an article and commit it. The article stays
invisible (listing, sitemap, RSS, and direct URL all 404/omit it) until that
date arrives — then it appears automatically, **with no rebuild or redeploy**.

How: `src/lib/articles.ts` filters with `publishDate <= today` on **every
request**. Next.js 16 prerenders pages at build time by default, so the data
layer calls `await connection()` (from `next/server`) to opt routes back into
dynamic per-request rendering. This replaces the removed
`export const dynamic = "force-dynamic"` API.

Two things to know:

- **Batch workflow:** commit e.g. 30 articles with staggered `publishDate`s in
  one deploy — they drip-publish on schedule by themselves.
- **New files need a deploy:** adding a brand-new `.mdx` file after deploying
  requires a redeploy (`git push` on Vercel) so the file exists on the server.
  Only the *visibility timing* is automatic, not file syncing.

## Deploy on Vercel + custom domain

1. Push this repo to GitHub.
2. In [vercel.com](https://vercel.com) → Add New Project → import the repo.
   Framework is auto-detected; no build settings to change (`npm run build`).
3. Once deployed, add the custom domain: Project → Settings → Domains →
   add `www.aitoolstack.dev` (or your domain) and follow the DNS instructions.
4. Update `site.config.ts` → `url` to the real domain and redeploy (canonical
   URLs, sitemap, RSS, and OpenGraph all follow this value).

> Do **not** enable Static Export (`output: "export"`) — it would freeze the
> publishDate gate at build time and break scheduled publishing. The default
> Node.js server / serverless output is required.

## Post-launch checklist

- [ ] Rename the site in `site.config.ts` (name, tagline, url, contactEmail)
- [ ] Add a real OG image at `public/og-default.png` (1200×630)
- [ ] Submit the domain in Google Search Console; submit `/sitemap.xml`
- [ ] Replace `[AFFILIATE LINK]` placeholders in articles with real URLs
- [ ] Plug the newsletter form into ConvertKit/Mailchimp
      (see the TODO in `src/components/Newsletter.tsx`)
- [ ] Apply for Google AdSense once ~15–20 quality articles are published

## Project structure

```
src/site.config.ts            # ← site identity: name, URL, email, socials
content/articles/*.mdx         # articles (frontmatter + markdown)
src/app/
  page.tsx                     # homepage (hero, latest, newsletter)
  blog/page.tsx                # article archive, newest first
  blog/[slug]/page.tsx         # article: TOC, author box, related, JSON-LD
  about/  contact/  privacy-policy/
  sitemap.ts  robots.ts  feed.xml/route.ts
src/components/                # Header, Footer, ArticleCard, Newsletter, …
src/lib/
  articles.ts                  # MDX loading + publishDate gating + TOC
  mdx-components.tsx           # article typography (edit to restyle)
src/app/globals.css            # Tailwind v4 @theme design tokens
```

## Tech

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 ·
`gray-matter` + `next-mdx-remote` (RSC) + `remark-gfm` + `rehype-slug` ·
`next/font` (Inter + JetBrains Mono)
