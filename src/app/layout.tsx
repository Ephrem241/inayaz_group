import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/constants/site";
import { company } from "@/constants/company";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const SITE_NAME = company.brandName;
const SITE_DESCRIPTION =
  "A diversified Ethiopian business group delivering construction, real estate, manufacturing, import, export, travel, and equipment solutions with precision, integrity, and long-term responsibility.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_US",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1600, height: 900, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

// Deliberately bare — the marketing chrome (header, footer, skip link,
// motion providers) lives in app/(marketing)/layout.tsx instead of here, so
// that /studio (a sibling route, Sanity Studio's own self-contained SPA)
// doesn't get the public site's header/nav wrapped around it.
// "no-js" ships as the default class on every server-rendered page; the
// inline script below removes it the instant JS actually runs, which in
// practice is before first paint (it's synchronous and placed in <head>,
// which finishes parsing before <body> renders). If JS never runs at all —
// disabled, blocked, or hydration fails — the class simply never gets
// removed, and globals.css's ".no-js [data-motion-initial]" rule keeps
// GSAP-gated content visible instead of permanently hidden. suppressHydration
// Warning is required here because this script intentionally mutates the
// <html> element's className before React hydrates it — the same pattern
// dark-mode theme scripts use.
const removeNoJsScript = 'document.documentElement.classList.remove("no-js");';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`no-js ${playfairDisplay.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: removeNoJsScript }} />
      </head>
      <body className="antialiased">
        {/* Independent second fallback for the same failure mode — only
            ever inserted into the DOM when JavaScript is entirely disabled. */}
        <noscript>
          <style>
            {"[data-motion-initial]{opacity:1 !important;transform:none !important;clip-path:none !important;}"}
          </style>
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
