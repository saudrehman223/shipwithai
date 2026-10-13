import Link from "next/link";

/**
 * Custom 404 page. Renders for unknown routes and when an article slug
 * doesn't exist (or isn't published yet — see src/lib/articles.ts).
 * Note: in Next.js 16, when notFound() is triggered after streaming starts
 * on a dynamic route, the response keeps a 200 status but Next.js adds a
 * `noindex` tag, so unpublished articles are never indexed.
 */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center sm:py-32">
      <p className="font-mono text-sm font-semibold tracking-widest text-brand-600 uppercase">
        404
      </p>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        This page could not be found
      </h1>
      <p className="mx-auto mt-4 max-w-md leading-7 text-ink-600">
        The article you&apos;re looking for doesn&apos;t exist — or it
        hasn&apos;t been published yet. Check back soon.
      </p>
      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          href="/blog"
          className="rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Browse articles
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-line px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-paper-soft"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
