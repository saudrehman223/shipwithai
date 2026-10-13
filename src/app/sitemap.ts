import type { MetadataRoute } from "next";
import { siteConfig } from "../site.config";
import { getPublishedArticles } from "../lib/articles";

/**
 * Only PUBLISHED articles (publishDate <= today) are listed.
 * Because getPublishedArticles() renders dynamically per request
 * (see src/lib/articles.ts), newly scheduled articles appear in the
 * sitemap automatically — no rebuild needed.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${siteConfig.url}/blog/${a.slug}`,
    lastModified: a.date,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...articleEntries,
  ];
}
