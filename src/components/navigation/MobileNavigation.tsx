"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { NAV_ITEMS, PRIMARY_CTA } from "@/constants/navigation";
import { gsap } from "@/lib/motion/gsap";
import { useReducedMotionContext } from "@/components/motion/ReducedMotionProvider";
import { getSmoothScroll } from "@/lib/motion/lenis";

type MobileNavigationProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavigation({ open, onClose }: MobileNavigationProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const reducedMotion = useReducedMotionContext();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
      getSmoothScroll()?.stop();

      if (!reducedMotion && listRef.current) {
        const items = listRef.current.querySelectorAll("[data-nav-item]");
        gsap.fromTo(
          items,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power3.out", delay: 0.1 },
        );
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open, reducedMotion]);

  useEffect(() => {
    return () => {
      getSmoothScroll()?.start();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      onClose={() => {
        getSmoothScroll()?.start();
      }}
      aria-label="Mobile navigation"
      className="section-dark fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-none p-0"
    >
      <div className="container-content flex h-full flex-col py-8">
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-off-white transition-colors hover:text-primary"
          >
            <X aria-hidden="true" size={28} />
          </button>
        </div>

        <ul ref={listRef} className="mt-12 flex flex-1 flex-col justify-center gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href} data-nav-item>
              <Link
                href={item.href}
                onClick={onClose}
                className="font-heading text-4xl text-off-white transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div data-nav-item className="pb-4">
          <Link
            href={PRIMARY_CTA.href}
            onClick={onClose}
            className="btn btn-primary w-full justify-center"
          >
            {PRIMARY_CTA.label}
          </Link>
        </div>
      </div>
    </dialog>
  );
}
