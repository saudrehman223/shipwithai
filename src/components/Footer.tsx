import Link from "next/link";
import { siteConfig } from "../site.config";
import { FooterYear } from "./FooterYear";

export function Footer() {
  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="border-t border-line bg-paper-soft/60">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-bold tracking-tight text-ink-950">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-500">
              {siteConfig.tagline}
            </p>
            {socials.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socials.map(([network, url]) => (
                  <a
                    key={network}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 text-sm font-medium text-ink-600 capitalize transition-colors hover:border-brand-500/40 hover:text-ink-950"
                  >
                    {network}
                  </a>
                ))}
              </div>
            )}
          </div>
          <nav aria-label="Footer navigation" className="flex gap-16 text-sm">
            <div>
              <p className="mb-3 font-mono text-xs font-semibold tracking-widest text-ink-500 uppercase">
                Site
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link href="/blog" className="text-ink-600 transition-colors hover:text-brand-300">
                    All articles
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-ink-600 transition-colors hover:text-brand-300">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-ink-600 transition-colors hover:text-brand-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs font-semibold tracking-widest text-ink-500 uppercase">
                Legal
              </p>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-ink-600 transition-colors hover:text-brand-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/feed.xml" className="text-ink-600 transition-colors hover:text-brand-300">
                    RSS feed
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap.xml"
                    className="text-ink-600 transition-colors hover:text-brand-300"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <p className="mt-10 border-t border-line pt-6 font-mono text-xs text-ink-500">
          © <FooterYear /> {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
