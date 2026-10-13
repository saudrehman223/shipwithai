/**
 * site.config.ts — THE single source of truth for site identity.
 *
 * Rename / edit values here when the blog gets its real name, domain,
 * and contact details. Everything else (metadata, sitemap, RSS, JSON-LD,
 * header, footer) reads from this file, so no other file needs touching.
 */
export const siteConfig = {
  /** Blog name shown in the header, footer, titles, RSS feed, etc. */
  name: "ShipWithAI",

  /** One-line tagline shown in the hero and meta descriptions. */
  tagline:
    "Honest reviews and tutorials on AI tools for designers and developers",

  /**
   * Canonical base URL — NO trailing slash.
   * Used for canonical links, OpenGraph URLs, sitemap.xml and feed.xml.
   * Update this when the custom domain is connected.
   */
  url: "https://shipwithai.app",

  /** Short description used for SEO fallbacks. */
  description:
    "ShipWithAI publishes honest, hands-on reviews and practical tutorials on AI tools for designers and developers.",

  /** Author byline shown on articles. */
  author: {
    name: "ShipWithAI team",
    role: "Designers & developers testing AI tools in real projects",
  },

  /** Contact email used on the contact page (mailto fallback). */
  contactEmail: "hello@shipwithai.app",

  /** Social profiles — shown in the footer. Leave empty to hide. */
  social: {
    x: "",
    linkedin: "",
    instagram: "",
    threads: "",
    github: "",
  },

  /** Default OpenGraph image path (relative to /public). */
  ogImage: "/og-default.png",
} as const;

export type SiteConfig = typeof siteConfig;
