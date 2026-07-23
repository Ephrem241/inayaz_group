"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="section-light flex min-h-screen items-center py-16 md:py-24 lg:py-32">
      <div className="container-content text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Error
        </p>
        <h1 className="mt-4 text-4xl">Something Went Wrong</h1>
        <p className="mt-4 text-base text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <button type="button" className="btn btn-primary mt-8" onClick={() => unstable_retry()}>
          Try Again
        </button>
      </div>
    </div>
  );
}
