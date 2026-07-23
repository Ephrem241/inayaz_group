import { ReducedMotionProvider } from "@/components/motion/ReducedMotionProvider";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { PremiumHeader } from "@/components/layout/PremiumHeader";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReducedMotionProvider>
      <SmoothScrollProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <PremiumHeader />
        <main id="main-content">{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </ReducedMotionProvider>
  );
}
