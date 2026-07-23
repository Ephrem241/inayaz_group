import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { ReducedMotionProvider } from "@/components/motion/ReducedMotionProvider";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { PremiumHeader } from "@/components/layout/PremiumHeader";
import { Footer } from "@/components/layout/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <ReducedMotionProvider>
          <SmoothScrollProvider>
            <PremiumHeader />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
