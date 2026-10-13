import type { Metadata } from "next";
import { siteConfig } from "../../site.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}: what data we collect, how cookies and advertising work, and your rights.`,
  alternates: { canonical: `${siteConfig.url}/privacy-policy` },
};

const LAST_UPDATED = "October 13, 2026";

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="pt-6 text-xl font-bold tracking-tight text-ink-950">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 leading-7 text-ink-700">{children}</p>;
}

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
      <p className="font-mono text-xs font-semibold tracking-widest text-brand-600 uppercase">
        Legal
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-3 font-mono text-xs text-ink-400">
        Last updated: {LAST_UPDATED}
      </p>

      <div className="mt-6">
        <P>
          {siteConfig.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;) respects your
          privacy. This policy explains what information we collect when you
          visit {siteConfig.url}, how we use it, and the choices you have.
        </P>

        <H2>Information we collect</H2>
        <P>
          <strong className="font-semibold text-ink-900">
            Information you provide:
          </strong>{" "}
          if you contact us by email or subscribe to our newsletter, we receive
          your name, email address, and the contents of your message. We use
          this only to respond to you or send the newsletter you requested.
        </P>
        <P>
          <strong className="font-semibold text-ink-900">
            Automatically collected information:
          </strong>{" "}
          like most websites, we use privacy-friendly analytics (such as Google
          Analytics) that may record your device type, browser, approximate
          location, pages visited, and time spent on the site. This data is
          aggregated and helps us understand which content readers find useful.
        </P>

        <H2>Cookies</H2>
        <P>
          We use cookies for basic site functionality and analytics. Advertising
          partners (see below) may also set cookies to serve relevant ads. You
          can disable cookies in your browser settings; the site will still
          work, though some features may be limited.
        </P>

        <H2>Advertising</H2>
        <P>
          We may display ads served by Google AdSense and other third-party
          advertising networks. These vendors use cookies (including the Google
          DoubleClick cookie) to serve ads based on your prior visits to this
          and other websites. Google&apos;s use of advertising cookies enables
          it and its partners to serve ads based on your visit to our site
          and/or other sites on the internet.
        </P>
        <P>
          You may opt out of personalized advertising by visiting{" "}
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-300 underline decoration-brand-500/50 underline-offset-2 hover:decoration-brand-300"
          >
            Google Ads Settings
          </a>
          . For more information on how Google uses data, see{" "}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-300 underline decoration-brand-500/50 underline-offset-2 hover:decoration-brand-300"
          >
            Google&apos;s Advertising Technology page
          </a>
          .
        </P>

        <H2>Affiliate links</H2>
        <P>
          Some links on this site are affiliate links. Clicking them may send a
          referral identifier to the merchant so we can earn a commission if you
          make a purchase. This does not affect the price you pay and does not
          give us access to your payment details.
        </P>

        <H2>Data sharing</H2>
        <P>
          We do not sell your personal information. We share data only with
          service providers necessary to operate the site (hosting, analytics,
          email delivery, advertising networks), each bound by their own
          privacy policies, or when required by law.
        </P>

        <H2>Your rights</H2>
        <P>
          Depending on your jurisdiction (including under the GDPR and CCPA),
          you may have the right to access, correct, or delete your personal
          data, and to withdraw consent for the newsletter at any time via the
          unsubscribe link in every email. To exercise these rights, contact us
          at{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-medium text-brand-300 underline decoration-brand-500/50 underline-offset-2 hover:decoration-brand-300"
          >
            {siteConfig.contactEmail}
          </a>
          .
        </P>

        <H2>Children&apos;s privacy</H2>
        <P>
          This site is not directed at children under 13, and we do not
          knowingly collect their personal information.
        </P>

        <H2>Changes to this policy</H2>
        <P>
          We may update this policy from time to time. The &ldquo;Last
          updated&rdquo; date above will reflect the latest revision, and
          continued use of the site after changes constitutes acceptance.
        </P>

        <H2>Contact</H2>
        <P>
          Questions about this policy:{" "}
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="font-medium text-brand-300 underline decoration-brand-500/50 underline-offset-2 hover:decoration-brand-300"
          >
            {siteConfig.contactEmail}
          </a>
        </P>
      </div>
    </div>
  );
}
