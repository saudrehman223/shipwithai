import { siteConfig } from "../../site.config";
import { getPublishedArticles } from "../../lib/articles";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed — only PUBLISHED articles (publishDate <= today).
 * Dynamic per request (see src/lib/articles.ts), so scheduled articles
 * join the feed automatically on their publishDate.
 */
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const articles = await getPublishedArticles();

  const items = articles
    .map(
      (a) => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${siteConfig.url}/blog/${a.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${a.slug}</guid>
      <description>${escapeXml(a.description)}</description>
      <pubDate>${new Date(`${a.date}T00:00:00Z`).toUTCString()}</pubDate>
${a.tags.map((t) => `      <category>${escapeXml(t)}</category>`).join("\n")}
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.tagline)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
