import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { connection } from "next/server";

/**
 * Articles live as MDX files in /content/articles/*.mdx with frontmatter:
 *
 *   ---
 *   title: "My Article"
 *   description: "One or two sentences for SEO + cards."
 *   date: "2026-10-13"          # display date
 *   publishDate: "2026-10-20"   # visibility gate (YYYY-MM-DD)
 *   tags: ["AI coding tools", "Cursor"]
 *   slug: "my-article"          # optional; defaults to filename
 *   ---
 */

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  /** Display date, YYYY-MM-DD */
  date: string;
  /** Visibility gate, YYYY-MM-DD — article appears only on/after this date */
  publishDate: string;
  tags: string[];
  readingTimeMinutes: number;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Article extends ArticleMeta {
  /** Raw MDX body (without frontmatter) */
  content: string;
  toc: TocItem[];
}

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

/** Extract h2/h3 headings for the table of contents. IDs match rehype-slug. */
function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const toc: TocItem[] = [];
  for (const line of markdown.split("\n")) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    // Strip inline markdown so the TOC shows clean text
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links -> text
      .replace(/[*_`~]/g, "")
      .trim();
    toc.push({ id: slugger.slug(text), text, level });
  }
  return toc;
}

function parseArticleFile(filename: string): Article {
  const filePath = path.join(ARTICLES_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const slug =
    (data.slug as string | undefined) ?? filename.replace(/\.mdx?$/, "");

  return {
    slug,
    title: (data.title as string) ?? slug,
    description: (data.description as string) ?? "",
    date: (data.date as string) ?? (data.publishDate as string) ?? "",
    publishDate: (data.publishDate as string) ?? (data.date as string) ?? "",
    tags: (data.tags as string[] | undefined) ?? [],
    readingTimeMinutes: estimateReadingTime(content),
    content,
    toc: extractToc(content),
  };
}

/**
 * "Today" as a YYYY-MM-DD string in UTC. publishDate uses day granularity,
 * so a lexicographic string comparison is exact and timezone-predictable.
 */
function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

/* ------------------------------------------------------------------
   SCHEDULED AUTO-PUBLISHING
   ------------------------------------------------------------------
   Next.js 16 (with Cache Components) prerenders pages at build time by
   default. Awaiting `connection()` below opts the calling route back into
   per-request (dynamic) rendering, and the route files additionally declare
   `export const dynamic = "force-dynamic"` so dynamic rendering (including
   real 404s from notFound()) applies to the whole route instead of partial
   prerendering.

   Because the publishDate gate (`publishDate <= today`) is evaluated on
   EVERY request instead of once at build time, an article committed with
   a future publishDate automatically appears on the site the day its
   date arrives — no rebuild, no redeploy, no cron job needed.

   NOTE: this covers *scheduled visibility*. Brand-new .mdx files added
   after a deploy still need a redeploy (e.g. `git push` to Vercel) so the
   file exists on the server. The batch workflow is: commit 30 articles
   with staggered publishDates once, and they drip-publish on schedule.
------------------------------------------------------------------- */

/** All articles whose publishDate has arrived, newest first. */
export async function getPublishedArticles(): Promise<ArticleMeta[]> {
  await connection(); // <- dynamic rendering: re-check publishDate per request
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const today = todayUtc();
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map(parseArticleFile)
    .filter((a) => a.publishDate !== "" && a.publishDate <= today)
    .sort((a, b) => b.publishDate.localeCompare(a.publishDate));
}

/**
 * A single article by slug. Returns null when the slug doesn't exist OR
 * its publishDate is still in the future (unpublished articles 404).
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  await connection(); // <- dynamic rendering: re-check publishDate per request
  const candidates = [`${slug}.mdx`, `${slug}.md`];
  for (const filename of candidates) {
    const filePath = path.join(ARTICLES_DIR, filename);
    if (fs.existsSync(filePath)) {
      const article = parseArticleFile(filename);
      if (article.slug !== slug) continue;
      return article.publishDate !== "" && article.publishDate <= todayUtc()
        ? article
        : null;
    }
  }
  return null;
}

/** Related articles: most shared tags first, excluding the current one. */
export async function getRelatedArticles(
  slug: string,
  tags: string[],
  limit = 3,
): Promise<ArticleMeta[]> {
  const articles = await getPublishedArticles();
  return articles
    .filter((a) => a.slug !== slug)
    .map((a) => ({
      article: a,
      shared: a.tags.filter((t) => tags.includes(t)).length,
    }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((x) => x.article);
}

/** All tags across published articles (for future tag pages / clouds). */
export async function getAllTags(): Promise<string[]> {
  const articles = await getPublishedArticles();
  return [...new Set(articles.flatMap((a) => a.tags))].sort();
}
