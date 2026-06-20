"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="error-page">
      <p className="eyebrow">Error</p>
      <h1>Something went wrong.</h1>
      <p>The issue has been recorded. You may be able to retry this page.</p>
      <button className="button" onClick={reset}>Try again</button>
    </main>
  );
}
