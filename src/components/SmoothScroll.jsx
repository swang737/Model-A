import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({
  duration = 1.6,
  smoothWheel = true,
  smoothTouch = false,
  lerp = 0.08
}) {
  useEffect(() => {
    const lenis = new Lenis({ duration, smoothWheel, smoothTouch, lerp });
    let frame;

    const raf = time => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [duration, smoothWheel, smoothTouch, lerp]);

  return null;
}
