import type { Metadata } from "next";
import { siteConfig } from "../../site.config";
import { ContactForm } from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact the ${siteConfig.name} team — tool suggestions, corrections, and business inquiries.`,
  alternates: { canonical: `${siteConfig.url}/contact` },
};

// Note: `instant` can't be exported from a client component, which is why
// the form lives in <ContactForm /> and this page stays a server component.
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      <p className="font-mono text-xs font-semibold tracking-widest text-brand-600 uppercase">
        Contact
      </p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        Get in touch
      </h1>
      <p className="mt-3 leading-7 text-ink-600">
        Want us to test a tool, spotted an outdated price, or interested in
        working together? Send a message — this opens your email app with
        everything pre-filled.
      </p>
      <ContactForm />
    </div>
  );
}
