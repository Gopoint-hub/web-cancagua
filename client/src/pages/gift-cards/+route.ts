// Catch-all route para /gift-cards y /gift-cards/*
import type { RouteSync } from 'vike/types';

export const route: RouteSync = (pageContext): ReturnType<RouteSync> => {
  const { urlPathname } = pageContext;
  if (urlPathname === '/gift-cards' || urlPathname.startsWith('/gift-cards/')) {
    return { match: true };
  }
  return { match: false };
};
