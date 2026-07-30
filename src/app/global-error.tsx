"use client";

import { useEffect } from "react";
import "./globals.css";

// Only fires for errors thrown in the root layout itself (or above it) —
// a regular page/section error is caught by error.tsx instead. Next.js
// requires this file to render its own <html>/<body> since it replaces the
// entire root layout when it activates.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="section-light antialiased">
        <div className="flex min-h-screen items-center py-16 md:py-24 lg:py-32">
          <div className="container-content text-center">
            <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
              Error
            </p>
            <h1 className="mt-4 text-4xl">Something Went Wrong</h1>
            <p className="mt-4 text-base text-muted-foreground">
              An unexpected error occurred. Please try again.
            </p>
            <button type="button" className="btn btn-primary mt-8" onClick={() => reset()}>
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
