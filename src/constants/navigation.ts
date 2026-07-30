export type NavItem = {
  label: string;
  href: string;
};

// No explicit "Home" entry — the header/footer logo (Wordmark) already
// links to "/" and carries its own active-state semantics (Phase F).
export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Our Group", href: "/group" },
  { label: "Projects", href: "/projects" },
  { label: "Real Estate", href: "/real-estate" },
  { label: "Services", href: "/services" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "News", href: "/news" },
  { label: "Contact", href: "/contact" },
];

export const PRIMARY_CTA: NavItem = { label: "Discuss a Project", href: "/contact" };
