"use client";

import { useState } from "react";

/**
 * Newsletter signup — UI ONLY for now.
 *
 * TODO: plug in a real provider before launch. Two common options:
 *   1. ConvertKit: create a form, then POST to
 *      https://app.convertkit.com/forms/<FORM_ID>/subscriptions
 *   2. Mailchimp: use the embedded form action URL from your audience settings.
 * Replace the fake submit handler below with a fetch() to the provider.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: send `email` to ConvertKit / Mailchimp here.
    setDone(true);
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-paper to-paper p-8 sm:p-12"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="font-mono text-xs font-semibold tracking-widest text-brand-600 uppercase">
          Newsletter
        </p>
        <h2
          id="newsletter-heading"
          className="mt-3 text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl"
        >
          One honest AI-tool breakdown, every week
        </h2>
        <p className="mt-3 text-sm leading-6 text-ink-600">
          No hype, no sponsored rankings. Just the tools we actually tested and
          whether they&apos;re worth your money.
        </p>
        {done ? (
          <p
            role="status"
            className="mt-6 rounded-xl bg-brand-600/10 px-4 py-3 text-sm font-medium text-brand-800"
          >
            You&apos;re on the list — check your inbox to confirm.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 flex-1 rounded-xl border border-line bg-paper px-4 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 focus:outline-none"
            />
            <button
              type="submit"
              className="h-12 rounded-xl bg-brand-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Subscribe
            </button>
          </form>
        )}
        <p className="mt-3 text-xs text-ink-400">
          Free forever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
