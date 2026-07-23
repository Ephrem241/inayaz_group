export type NavItem = {
  label: string;
  href: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Our Group", href: "/group" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const PRIMARY_CTA: NavItem = { label: "Contact Us", href: "/contact" };
