"use client";

import { useEffect, useState } from "react";

/**
 * Renders the current year. The value is read inside useEffect so it is
 * never evaluated during prerendering — Next.js 16 forbids unstable values
 * like the current time at build time, even in client components.
 */
export function FooterYear() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    // Next.js 16 forbids reading `new Date()` during render/prerender; the
    // effect is the framework-mandated place for it (see build error
    // "blocking-prerender-current-time-client").
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}
