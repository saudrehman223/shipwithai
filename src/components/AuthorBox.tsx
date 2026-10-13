import { siteConfig } from "../site.config";

export function AuthorBox() {
  return (
    <aside className="mt-12 flex items-start gap-4 rounded-2xl border border-line bg-paper-soft p-6">
      <div
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-600 font-mono text-sm font-bold text-white"
      >
        {siteConfig.name.slice(0, 2).toUpperCase()}
      </div>
      <div>
        <p className="font-mono text-xs font-semibold tracking-widest text-ink-400 uppercase">
          Written by
        </p>
        <p className="mt-1 font-semibold text-ink-950">
          the {siteConfig.name} team
        </p>
        <p className="mt-1 text-sm leading-6 text-ink-600">
          {siteConfig.author.role}. Every tool we cover is tested in real
          client and side projects before we write about it.
        </p>
      </div>
    </aside>
  );
}
