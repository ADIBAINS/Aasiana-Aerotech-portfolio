"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="error-page">
          <p className="eyebrow">System notice</p>
          <h1>Something interrupted this request.</h1>
          <p>The issue has been recorded. You can retry without reloading the entire website.</p>
          <button className="button" onClick={reset}>Try again</button>
        </main>
      </body>
    </html>
  );
}
