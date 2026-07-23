import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): () => void {
  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
  });
  lenisInstance = lenis;

  const onScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onScroll);

  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.off("scroll", onScroll);
    lenis.destroy();
    lenisInstance = null;
  };
}

export function getSmoothScroll(): Lenis | null {
  return lenisInstance;
}
