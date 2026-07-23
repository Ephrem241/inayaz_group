"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type ImageSwitcherItem = {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  image: { src: string; alt: string };
  listLabel?: string;
  items?: string[];
};

type ServiceImageSwitcherProps = {
  items: ImageSwitcherItem[];
};

export function ServiceImageSwitcher({ items }: ServiceImageSwitcherProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const active = items.find((item) => item.id === activeId) ?? items[0];

  if (!active) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <ul className="lg:col-span-4">
        {items.map((item) => {
          const isActive = item.id === active.id;

          return (
            <li key={item.id}>
              <button
                type="button"
                aria-current={isActive ? "true" : undefined}
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setActiveId(item.id)}
                className={cn(
                  "flex w-full items-center gap-4 border-l-2 py-4 text-left transition-colors",
                  isActive
                    ? "border-construction-gold text-primary"
                    : "border-transparent text-off-white/70 hover:text-off-white",
                )}
              >
                {item.icon}
                <span className="text-xl md:text-2xl">{item.name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div key={active.id} className="animate-panel-fade-in lg:col-span-8">
        <div
          data-switcher-image
          className="relative aspect-[4/3] overflow-hidden rounded-sm"
        >
          <Image
            src={active.image.src}
            alt={active.image.alt}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>

        {active.listLabel && (
          <p className="mt-6 text-sm font-medium tracking-[0.2em] text-primary uppercase">
            {active.listLabel}
          </p>
        )}
        <p className="mt-3 max-w-2xl text-base text-off-white/80">{active.description}</p>

        {active.items && active.items.length > 0 && (
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {active.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-off-white/70">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-construction-gold" />
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
