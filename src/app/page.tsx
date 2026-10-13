import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "../site.config";
import { getPublishedArticles } from "../lib/articles";
import { ArticleCard, FeaturedArticleCard } from "../components/ArticleCard";
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

const TOOLS = [
  "Cursor",
  "Claude Code",
  "GitHub Copilot",
  "Windsurf",
  "v0",
  "Lovable",
  "Bolt",
  "Figma Make",
  "Galileo AI",
  "Relume",
  "Midjourney",
  "Adobe Firefly",
  "Codeium",
  "Cline",
  "ChatGPT",
  "Gemini",
];

const TRUST_POINTS = [
  {
    title: "Tested in real projects",
    body: "Every tool runs through actual client work and production code before we write a single word.",
  },
  {
    title: "Real pricing, real math",
    body: "We show what tools actually cost per month — including the limits and gotchas hiding in the fine print.",
  },
  {
    title: "Zero sponsored rankings",
    body: "Affiliate links never decide who wins. Tools with no affiliate program regularly beat tools that pay us.",
  },
];

export default async function HomePage() {
  // getPublishedArticles() awaits connection() internally, so this page
  // renders dynamically per request — newly published articles appear
  // automatically without a rebuild (see src/lib/articles.ts).
  const articles = await getPublishedArticles();
  const [featured, ...rest] = articles;
  const latest = rest.slice(0, 6);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        {/* Backdrop: grid + glows */}
        <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
        <div aria-hidden="true" className="glow-orb top-[-160px] left-1/2 h-[420px] w-[720px] -translate-x-1/2 bg-brand-600/20" />
        <div aria-hidden="true" className="glow-orb top-40 -left-32 h-80 w-80 bg-accent-500/10" />

        <div className="relative mx-auto max-w-6xl px-5 pt-20 pb-16 text-center sm:pt-28 sm:pb-20">
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="fade-up inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 py-1.5 pr-4 pl-1.5 text-xs font-medium text-brand-200 transition-colors hover:border-brand-400/50 hover:bg-brand-500/15"
            >
              <span className="rounded-full bg-gradient-to-r from-brand-500 to-accent-500 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-widest text-white uppercase">
                New
              </span>
              <span className="max-w-64 truncate sm:max-w-none">
                {featured.title}
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          )}

          <h1 className="fade-up fade-up-1 font-display mx-auto mt-7 max-w-4xl text-5xl font-bold tracking-tight text-ink-950 sm:text-7xl sm:leading-[1.05]">
            Ship with AI.
            <br />
            <span className="text-gradient">Not with hype.</span>
          </h1>

          <p className="fade-up fade-up-2 mx-auto mt-6 max-w-xl text-base leading-7 text-ink-600 sm:text-lg sm:leading-8">
            We&apos;re designers and developers who test AI coding assistants,
            design tools, and automation apps in real projects — then tell you
            which ones are actually worth your money.
          </p>

          <div className="fade-up fade-up-3 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/blog"
              className="w-full rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:shadow-xl hover:shadow-brand-500/40 hover:brightness-110 sm:w-auto"
            >
              Start reading
            </Link>
            <Link
              href="/about"
              className="w-full rounded-xl border border-line bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-ink-900 backdrop-blur transition-colors hover:bg-white/[0.07] sm:w-auto"
            >
              How we test →
            </Link>
          </div>

          {/* Stats */}
          <dl className="fade-up fade-up-4 mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-line pt-8">
            {[
              ["30+", "tools on the test bench"],
              ["100%", "hands-on testing"],
              ["$0", "sponsored rankings"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="font-display text-3xl font-bold text-ink-950 sm:text-4xl">
                  {value}
                </dd>
                <dd className="mt-1 font-mono text-[11px] tracking-wide text-ink-500 uppercase">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ TOOLS MARQUEE ============ */}
      <section aria-label="Tools we test" className="border-y border-line bg-paper-soft/60 py-5">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="marquee-track items-center gap-10 pr-10">
            {[...TOOLS, ...TOOLS].map((tool, i) => (
              <span
                key={`${tool}-${i}`}
                className="flex items-center gap-10 font-mono text-sm whitespace-nowrap text-ink-500"
                aria-hidden={i >= TOOLS.length}
              >
                {tool}
                <span aria-hidden="true" className="text-brand-500">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED + LATEST ============ */}
      <section aria-labelledby="latest-heading" className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs font-semibold tracking-widest text-brand-400 uppercase">
              Fresh off the test bench
            </p>
            <h2
              id="latest-heading"
              className="font-display mt-2 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl"
            >
              Latest breakdowns
            </h2>
          </div>
          {articles.length > 7 && (
            <Link
              href="/blog"
              className="shrink-0 text-sm font-semibold text-brand-300 hover:underline"
            >
              View all →
            </Link>
          )}
        </div>

        {articles.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-line bg-paper-soft p-12 text-center sm:p-16">
            <p className="font-display text-xl font-bold text-ink-950">
              Fresh articles are on the way
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-600">
              We&apos;re testing tools and writing our first hands-on reviews.
              Subscribe below and you&apos;ll be the first to read them.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {featured && <FeaturedArticleCard article={featured} />}
            {latest.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latest.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ============ TRUST STRIP ============ */}
      <section aria-label="Why trust us" className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:grid-cols-3 sm:py-20">
          {TRUST_POINTS.map((point, i) => (
            <div
              key={point.title}
              className="rounded-2xl border border-line bg-paper-soft/50 p-6"
            >
              <p className="font-mono text-xs font-bold text-brand-400">
                0{i + 1}
              </p>
              <h3 className="font-display mt-3 text-lg font-bold tracking-tight text-ink-950">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-600">{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ NEWSLETTER ============ */}
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <Newsletter />
      </div>
    </div>
  );
}
