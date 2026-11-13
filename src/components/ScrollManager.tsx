import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global scroll behavior: on navigation, scroll to the element referenced by
 * the location hash (e.g. /#tiimi on the homepage) or to the top of the page.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      let id = hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        // Keep the literal id when the hash contains malformed encoding.
      }
      // Wait a tick so the target route has rendered before scrolling.
      const timer = window.setTimeout(() => {
        const target = document.getElementById(id);
        if (!target) return;
        const headerHeight = document.querySelector('nav')?.getBoundingClientRect().height ?? 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' });
      }, 60);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
