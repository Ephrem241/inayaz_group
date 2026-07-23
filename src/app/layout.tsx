import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/constants/site";

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

const SITE_NAME = "INAYAZ Group";
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
