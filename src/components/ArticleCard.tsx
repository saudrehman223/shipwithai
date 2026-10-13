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

export function ArticleCard({ article }: { article: ArticleMeta }) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lg hover:shadow-brand-600/5">
      <div className="mb-3 flex flex-wrap gap-2">
        {article.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-brand-50 px-2.5 py-1 font-mono text-[11px] font-medium text-brand-700"
          >
            {tag}
          </span>
        ))}
      </div>
      <Link href={`/blog/${article.slug}`} className="block">
        <h3 className="text-lg font-bold tracking-tight text-ink-950 group-hover:text-brand-700">
          {article.title}
        </h3>
      </Link>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-ink-600">
        {article.description}
      </p>
      <div className="mt-4 flex items-center gap-3 border-t border-line pt-4 font-mono text-xs text-ink-400">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{article.readingTimeMinutes} min read</span>
      </div>
    </article>
  );
}
