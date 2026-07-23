import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "INAYAZ Group",
  description:
    "A diversified Ethiopian business group delivering construction, real estate, manufacturing, import, export, travel, and equipment solutions with precision, integrity, and long-term responsibility.",
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
