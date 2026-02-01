import { useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';

/**
 * Component that scrolls to top whenever the route changes
 */
export function ScrollToTop() {
  const pageContext = usePageContext();
  const currentPath = pageContext.urlPathname || '/';

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [currentPath]);

  return null;
}
