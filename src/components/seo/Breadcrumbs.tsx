import Link from "next/link";
import { SITE_URL } from "@/constants/site";

export type BreadcrumbItem = {
  label: string;
  // Omitted on the last item — the current page isn't a link to itself.
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

// Pairs the visible trail with its BreadcrumbList structured-data twin in
// one component so they can never drift out of sync with each other.
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        data-json-ld="breadcrumbs"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" data-breadcrumbs>
        <ol className="flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
          {items.map((item, index) => (
            <li key={item.label} className="flex items-center gap-x-2">
              {index > 0 && (
                <span aria-hidden="true" className="text-steel-gray/50">
                  /
                </span>
              )}
              {item.href ? (
                <Link href={item.href} className="transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-foreground">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
