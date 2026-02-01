// Catch-all route para todas las rutas bajo /cms (incluyendo /cms mismo y /cms/*)
import type { RouteSync } from 'vike/types';

export const route: RouteSync = (pageContext): ReturnType<RouteSync> => {
  const { urlPathname } = pageContext;
  if (urlPathname === '/cms' || urlPathname.startsWith('/cms/')) {
    return { match: true };
  }
  return { match: false };
};
