import Link from "next/link";
import type { ArticleMeta } from "../lib/articles";

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function TagPills({ tags, limit = 3 }: { tags: string[]; limit?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.slice(0, limit).map((tag) => (
        <span
          key={tag}
          className="rounded-full border border-brand-500/25 bg-brand-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-brand-300"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function CardMeta({ article }: { article: ArticleMeta }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs text-ink-500">
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden="true" className="text-brand-500">
        ·
      </span>
      <span>{article.readingTimeMinutes} min read</span>
    </div>
  );
}

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="glow-card group flex h-full flex-col rounded-2xl border border-line bg-paper-soft p-6">
      <TagPills tags={article.tags} />
      <Link href={`/blog/${article.slug}`} className="mt-4 block">
        <h3 className="font-display text-lg font-bold tracking-tight text-ink-950 transition-colors group-hover:text-brand-300">
          {article.title}
        </h3>
      </Link>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-ink-600">
        {article.description}
      </p>
      <div className="mt-5 border-t border-line pt-4">
        <CardMeta article={article} />
      </div>
    </article>
  );
}

/** Large bento-style featured card for the homepage hero article. */
export function FeaturedArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="glow-card group relative flex h-full flex-col justify-end overflow-hidden rounded-3xl border border-line bg-paper-soft p-8 sm:p-10">
      {/* Backdrop glow */}
      <div aria-hidden="true" className="glow-orb -top-24 -right-24 h-72 w-72 bg-brand-600/25" />
      <div aria-hidden="true" className="glow-orb -bottom-32 -left-16 h-72 w-72 bg-accent-500/15" />

      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-white uppercase">
            Featured
          </span>
          <CardMeta article={article} />
        </div>
        <Link href={`/blog/${article.slug}`} className="mt-5 block">
          <h3 className="font-display max-w-2xl text-2xl font-bold tracking-tight text-ink-950 transition-colors group-hover:text-brand-300 sm:text-4xl sm:leading-[1.15]">
            {article.title}
          </h3>
        </Link>
        <p className="mt-3 max-w-2xl text-base leading-7 text-ink-600">
          {article.description}
        </p>
        <div className="mt-6">
          <TagPills tags={article.tags} limit={4} />
        </div>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-300 transition-all group-hover:gap-3">
          Read the breakdown
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );
}
