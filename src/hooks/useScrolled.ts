import { useEffect, useState } from 'react';

/** True once the page has scrolled past the threshold. Passive listener only. */
export default function useScrolled(threshold = 16): boolean {
  const [scrolled, setScrolled] = useState(() =>
    typeof window === 'undefined' ? false : window.scrollY > threshold,
  );

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
