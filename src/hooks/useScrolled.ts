"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void): () => void {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function getServerSnapshot(): boolean {
  return false;
}

export function useScrolled(threshold = 80): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.scrollY > threshold,
    getServerSnapshot,
  );
}
