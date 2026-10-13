import type { Metadata } from "next";
import { siteConfig } from "../../site.config";
import { getPublishedArticles } from "../../lib/articles";
import { ArticleCard } from "../../components/ArticleCard";

export const metadata: Metadata = {
  title: "All articles",
  description: `Every honest review, comparison and tutorial published on ${siteConfig.name}.`,
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: {
    title: `All articles | ${siteConfig.name}`,
    description: `Every honest review, comparison and tutorial published on ${siteConfig.name}.`,
    url: `${siteConfig.url}/blog`,
  },
};

// Dynamic per request (see src/lib/articles.ts): scheduled articles appear
// here on their publishDate without a rebuild. Declared explicitly via
// `dynamic = "force-dynamic"` so the publishDate gate is evaluated on every
// request instead of partial prerendering.
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  // Dynamic per request (see src/lib/articles.ts) — scheduled articles
  // appear here automatically on their publishDate.
  const articles = await getPublishedArticles();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      <p className="font-mono text-xs font-semibold tracking-widest text-brand-600 uppercase">
        The archive
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        All articles
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-ink-600">
        Reviews, comparisons and tutorials — newest first. Every tool covered
        here was tested in a real project.
      </p>

      {articles.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line bg-paper-soft p-12 text-center">
          <p className="text-lg font-semibold text-ink-900">
            Nothing published yet
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-600">
            Our first hands-on reviews are being written right now. Check back
            soon.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
