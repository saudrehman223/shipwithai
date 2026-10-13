import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "../site.config";
import { getPublishedArticles } from "../lib/articles";
import { ArticleCard } from "../components/ArticleCard";
import { Newsletter } from "../components/Newsletter";

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

// This page reads articles through src/lib/articles.ts, which awaits
// connection() so the publishDate gate is evaluated per request. That makes
// the route dynamic (blocking) rather than prerendered — declared explicitly
// via `dynamic = "force-dynamic"` so request-time rendering (and real 404s)
// works instead of partial prerendering.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // getPublishedArticles() awaits connection() internally, so this page
  // renders dynamically per request — newly published articles appear
  // automatically without a rebuild (see src/lib/articles.ts).
  const articles = await getPublishedArticles();
  const latest = articles.slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* Hero */}
      <section className="py-16 text-center sm:py-24">
        <p className="font-mono text-xs font-semibold tracking-widest text-brand-600 uppercase">
          AI tools, tested honestly
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-ink-950 sm:text-6xl">
          {siteConfig.tagline}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-ink-600">
          We&apos;re designers and developers who test AI coding assistants,
          design tools, and automation apps in real projects — then tell you
          which ones are actually worth your money.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/blog"
            className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
          >
            Read the blog
          </Link>
          <Link
            href="/about"
            className="rounded-xl border border-line px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-paper-soft"
          >
            About us
          </Link>
        </div>
      </section>

      {/* Latest articles */}
      <section aria-labelledby="latest-heading" className="py-8">
        <div className="mb-6 flex items-end justify-between">
          <h2
            id="latest-heading"
            className="text-2xl font-bold tracking-tight text-ink-950"
          >
            Latest articles
          </h2>
          {articles.length > 6 && (
            <Link
              href="/blog"
              className="text-sm font-semibold text-brand-700 hover:underline"
            >
              View all →
            </Link>
          )}
        </div>

        {latest.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-paper-soft p-12 text-center">
            <p className="text-lg font-semibold text-ink-900">
              Fresh articles are on the way
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-600">
              We&apos;re testing tools and writing our first hands-on reviews.
              Subscribe below and you&apos;ll be the first to read them.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter */}
      <div className="py-12">
        <Newsletter />
      </div>
    </div>
  );
}
