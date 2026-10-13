import Link from "next/link";
import { siteConfig } from "../site.config";
import { FooterYear } from "./FooterYear";

export function Footer() {
  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="mt-20 border-t border-line bg-paper-soft">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="text-base font-extrabold tracking-tight text-ink-950">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-sm leading-6 text-ink-500">
              {siteConfig.tagline}
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex gap-16 text-sm">
            <div>
              <p className="mb-3 font-mono text-xs font-semibold tracking-widest text-ink-400 uppercase">
                Site
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-ink-600 hover:text-ink-950">
                    All articles
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-ink-600 hover:text-ink-950">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-ink-600 hover:text-ink-950"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-xs font-semibold tracking-widest text-ink-400 uppercase">
                Legal
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-ink-600 hover:text-ink-950"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/feed.xml" className="text-ink-600 hover:text-ink-950">
                    RSS feed
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sitemap.xml"
                    className="text-ink-600 hover:text-ink-950"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        {socials.length > 0 && (
          <div className="mt-8 flex gap-4">
            {socials.map(([network, url]) => (
              <a
                key={network}
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink-500 capitalize hover:text-ink-950"
              >
                {network}
              </a>
            ))}
          </div>
        )}
        <p className="mt-8 border-t border-line pt-6 text-xs text-ink-400">
          © <FooterYear /> {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
