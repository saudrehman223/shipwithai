import type { TocItem } from "../lib/articles";

export function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (toc.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 font-mono text-xs font-semibold tracking-widest text-ink-400 uppercase">
        On this page
      </p>
      <ul className="space-y-2 border-l-2 border-line">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`-ml-0.5 block border-l-2 border-transparent pr-2 text-ink-600 transition-colors hover:border-brand-500 hover:text-ink-950 ${
                item.level === 3 ? "pl-6" : "pl-4"
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
