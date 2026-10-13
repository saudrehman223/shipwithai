import type { Metadata } from "next";
import { siteConfig } from "../../site.config";

export const metadata: Metadata = {
  title: "About",
  description: `Who runs ${siteConfig.name} and how we test AI tools before recommending them.`,
  alternates: { canonical: `${siteConfig.url}/about` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <p className="font-mono text-xs font-semibold tracking-widest text-brand-600 uppercase">
        About
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        We test AI tools so you don&apos;t have to
      </h1>

      <div className="mt-8 space-y-5 leading-7 text-ink-700">
        <p>
          {siteConfig.name} is run by a team of UI designers and React
          developers who use AI tools every single day — in client projects,
          side projects, and production codebases. When a new AI coding
          assistant, design tool, or automation app launches, we&apos;re usually
          trying it within the week.
        </p>
        <p>
          Most &ldquo;best AI tools&rdquo; lists on the internet are written by
          people who never opened the tool. Ours are different: every review,
          comparison, and tutorial on this blog comes from hands-on testing in
          real work. If a tool wastes our time, we say so. If it genuinely
          saves hours a week, we show you exactly how.
        </p>

        <h2 className="pt-4 text-xl font-bold tracking-tight text-ink-950">
          How we make money (and stay honest)
        </h2>
        <p>
          This blog is reader-supported. Some links are affiliate links —
          if you buy through them, we may earn a commission at no extra cost
          to you. Affiliate relationships never influence our rankings: tools
          with no affiliate program at all regularly beat tools that pay us.
          Our rule is simple — we only recommend tools we&apos;d pay for
          ourselves.
        </p>

        <h2 className="pt-4 text-xl font-bold tracking-tight text-ink-950">
          What we cover
        </h2>
        <ul className="list-disc space-y-2 pl-6 marker:text-brand-500">
          <li>AI coding assistants and agents (Cursor, Copilot, Claude Code…)</li>
          <li>AI design and prototyping tools (Figma AI, v0, Framer…)</li>
          <li>Honest head-to-head comparisons with real pricing</li>
          <li>Practical workflows: prompts, setups, and automation guides</li>
        </ul>

        <p>
          Have a tool you want us to test?{" "}
          <a
            href="/contact"
            className="font-medium text-brand-300 underline decoration-brand-500/50 underline-offset-2 hover:decoration-brand-300"
          >
            Get in touch
          </a>
          .
        </p>
      </div>
    </div>
  );
}
