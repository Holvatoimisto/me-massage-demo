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
      const id = hash.replace('#', '');
      // Wait a tick so the target route has rendered before scrolling.
      const timer = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
