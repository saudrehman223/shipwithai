import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { siteConfig } from "../../../site.config";
import {
  getArticleBySlug,
  getRelatedArticles,
} from "../../../lib/articles";
import { mdxComponents } from "../../../lib/mdx-components";
import { formatDate, ArticleCard } from "../../../components/ArticleCard";
import { TableOfContents } from "../../../components/TableOfContents";
import { AuthorBox } from "../../../components/AuthorBox";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dynamic per request (see src/lib/articles.ts): the publishDate gate is
// evaluated on every visit, so future-dated articles 404 until their date
// arrives and appear without a rebuild. Declared explicitly via
// `dynamic = "force-dynamic"` so notFound() returns a real 404 status.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Article not found" };

  const url = `${siteConfig.url}/blog/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url,
      siteName: siteConfig.name,
      publishedTime: article.date,
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  // Returns null for unknown slugs AND for articles whose publishDate is
  // still in the future — unpublished articles are not reachable by URL.
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.slug, article.tags, 3);
  const canonical = `${siteConfig.url}/blog/${article.slug}`;

  // JSON-LD for rich results (Google Article schema)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: canonical,
  };

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Article header */}
        <header className="mx-auto max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand-500/25 bg-brand-500/10 px-3 py-1 font-mono text-xs font-medium text-brand-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-950 sm:text-5xl sm:leading-[1.1]">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-600">
            {article.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-line py-4 font-mono text-xs text-ink-500">
            <span>By the {siteConfig.name} team</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeMinutes} min read</span>
          </div>
        </header>

        {/* Body + sticky TOC */}
        <div className="mt-10 lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
          <div className="min-w-0">
            {/* Mobile TOC */}
            {article.toc.length > 0 && (
              <details className="mb-8 rounded-xl border border-line bg-paper-soft p-4 lg:hidden">
                <summary className="cursor-pointer text-sm font-semibold text-ink-900">
                  Table of contents
                </summary>
                <div className="mt-3">
                  <TableOfContents toc={article.toc} />
                </div>
              </details>
            )}

            <MDXRemote
              source={article.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
            />

            <AuthorBox />

            <p className="mt-8 rounded-xl border border-line bg-paper-soft p-4 text-xs leading-6 text-ink-500">
              <strong className="font-semibold text-ink-700">
                Affiliate disclosure:
              </strong>{" "}
              some links in our articles are affiliate links. If you buy
              through them, we may earn a commission at no extra cost to you —
              it keeps our reviews independent and free to read.
            </p>
          </div>

          {/* Desktop sticky TOC */}
          {article.toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents toc={article.toc} />
              </div>
            </aside>
          )}
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-16">
          <h2
            id="related-heading"
            className="text-2xl font-bold tracking-tight text-ink-950"
          >
            Keep reading
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="text-sm font-semibold text-brand-300 hover:underline"
        >
          ← Back to all articles
        </Link>
      </div>
    </div>
  );
}
