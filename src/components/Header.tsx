import Link from "next/link";
import { siteConfig } from "../site.config";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="group flex items-center gap-2.5">
          {/* Gradient paper-plane mark */}
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 via-brand-600 to-accent-500 shadow-lg shadow-brand-600/30 transition-transform group-hover:rotate-6"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <path
                d="M22 2 11 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2 15 22l-4-9-9-4 20-7z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink-950">
            {siteConfig.name}
          </span>
        </Link>
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-1 sm:gap-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-white/[0.06] hover:text-ink-950"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
