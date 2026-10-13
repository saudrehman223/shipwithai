"use client";

import { useState } from "react";

/**
 * Newsletter signup â UI ONLY for now.
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
      className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-gradient-to-br from-brand-600/[0.14] via-paper-soft to-paper-soft p-8 sm:p-14"
    >
      <div aria-hidden="true" className="glow-orb -top-24 right-10 h-64 w-64 bg-brand-600/20" />
      <div aria-hidden="true" className="glow-orb -bottom-28 -left-10 h-64 w-64 bg-accent-500/10" />

      <div className="relative mx-auto max-w-xl text-center">
        <p className="font-mono text-xs font-semibold tracking-widest text-brand-300 uppercase">
          â¦ Newsletter
        </p>
        <h2
          id="newsletter-heading"
          className="font-display mt-3 text-2xl font-bold tracking-tight text-ink-950 sm:text-4xl"
        >
          One honest AI-tool breakdown,{" "}
          <span className="text-gradient">every week</span>
        </h2>
        <p className="mt-3 text-sm leading-6 text-ink-600 sm:text-base">
          No hype, no sponsored rankings. Just the tools we actually tested
          and whether they&apos;re worth your money.
        </p>
        {done ? (
          <p
            role="status"
            className="mt-6 rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-3 text-sm font-medium text-brand-200"
          >
            You&apos;re on the list â check your inbox to confirm.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-7 flex flex-col gap-3 sm:flex-row"
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
              className="h-[30px] flex-1 rounded-xl border border-line bg-paper px-4 text-sm text-ink-950 placeholder:text-ink-500 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/30 focus:outline-none sm:h-12"
            />
            <button
              type="submit"
              className="h-12 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-7 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:shadow-brand-500/40 hover:brightness-110"
            >
              Subscribe
            </button>
          </form>
        )}
        <p className="mt-3 font-mono text-xs text-ink-500">
          Free forever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
