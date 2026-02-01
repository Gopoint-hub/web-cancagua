/**
 * Redirecciones 301 para migración SEO
 * Basado en análisis de Google Search Console
 *
 * IMPACTO TOTAL:
 * - 358 clicks/mes en riesgo
 * - 28,666 impressions/mes en riesgo
 */

export interface Redirect {
  from: string;
  to: string;
  permanent: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
  clicks?: number;
  impressions?: number;
}

export const redirects: Redirect[] = [
  // ============================================
  // 🔴 CRÍTICAS - 280 clicks, 22,456 impressions
  // ============================================
  {
    from: '/biopiscinas/',
    to: '/servicios/biopiscinas',
    permanent: true,
    priority: 'critical',
    clicks: 89,
    impressions: 2769,
  },
  {
    from: '/hot-tub/',
    to: '/servicios/hot-tubs',
    permanent: true,
    priority: 'critical',
    clicks: 38,
    impressions: 7537,
  },
  {
    from: '/hot-tub/fin-de-semana/',
    to: '/servicios/hot-tubs',
    permanent: true,
    priority: 'critical',
    clicks: 23,
    impressions: 3404,
  },
  {
    from: '/servicios/',
    to: '/',
    permanent: true,
    priority: 'critical',
    clicks: 54,
    impressions: 4507,
  },
  {
    from: '/promos/',
    to: '/',
    permanent: true,
    priority: 'critical',
    clicks: 49,
    impressions: 3378,
  },
  {
    from: '/cafeteria-saludable-frutillar/',
    to: '/cafeteria',
    permanent: true,
    priority: 'critical',
    clicks: 27,
    impressions: 861,
  },

  // ============================================
  // 🟠 ALTAS - 29 clicks, 1,064 impressions
  // ============================================
  {
    from: '/sonoterapia/',
    to: '/servicios/masajes',
    permanent: true,
    priority: 'high',
    clicks: 5,
    impressions: 716,
  },
  {
    from: '/categoria/giftcards/',
    to: '/',
    permanent: true,
    priority: 'high',
    clicks: 6,
    impressions: 161,
  },
  {
    from: '/menu/',
    to: '/carta',
    permanent: true,
    priority: 'high',
    clicks: 6,
    impressions: 75,
  },
  {
    from: '/yoga-nueva/',
    to: '/clases',
    permanent: true,
    priority: 'high',
    clicks: 6,
    impressions: 56,
  },

  // ============================================
  // 🟡 MEDIAS - 76 clicks, 5,146 impressions
  // ============================================
  {
    from: '/home/',
    to: '/',
    permanent: true,
    priority: 'medium',
    clicks: 1,
    impressions: 1402,
  },
  {
    from: '/programas/',
    to: '/experiencias/pases-reconecta',
    permanent: true,
    priority: 'medium',
    clicks: 3,
    impressions: 867,
  },
  {
    from: '/dia-playa-frutillar/',
    to: '/',
    permanent: true,
    priority: 'medium',
    clicks: 4,
    impressions: 227,
  },
  {
    from: '/faq/',
    to: '/contacto',
    permanent: true,
    priority: 'medium',
    clicks: 3,
    impressions: 302,
  },
  {
    from: '/faqs/',
    to: '/contacto',
    permanent: true,
    priority: 'medium',
    clicks: 3,
    impressions: 57,
  },
  {
    from: '/entrenamiento/',
    to: '/clases',
    permanent: true,
    priority: 'medium',
    clicks: 4,
    impressions: 79,
  },
  {
    from: '/hot-tubs/',
    to: '/servicios/hot-tubs',
    permanent: true,
    priority: 'medium',
    clicks: 2,
    impressions: 214,
  },
  {
    from: '/pase-mediodia/',
    to: '/experiencias/pases-reconecta',
    permanent: true,
    priority: 'medium',
    clicks: 3,
    impressions: 112,
  },
  {
    from: '/beach-day/',
    to: '/',
    permanent: true,
    priority: 'medium',
    clicks: 3,
    impressions: 96,
  },
  {
    from: '/producto/giftcard-masajes/',
    to: '/',
    permanent: true,
    priority: 'medium',
    clicks: 2,
    impressions: 151,
  },
  {
    from: '/termas-del-sur-de-chile-con-ninos-guia-para-familias/',
    to: '/blog',
    permanent: true,
    priority: 'medium',
    clicks: 2,
    impressions: 107,
  },
  {
    from: '/playa/',
    to: '/',
    permanent: true,
    priority: 'medium',
    clicks: 1,
    impressions: 60,
  },
  {
    from: '/reconnect-half-day-pass/',
    to: '/experiencias/pases-reconecta',
    permanent: true,
    priority: 'medium',
    clicks: 1,
    impressions: 14,
  },

  // ============================================
  // ⚪ BAJAS - 0 clicks pero con impressions
  // ============================================
  {
    from: '/aikido/',
    to: '/clases',
    permanent: true,
    priority: 'low',
    clicks: 0,
    impressions: 90,
  },
  {
    from: '/services/',
    to: '/',
    permanent: true,
    priority: 'low',
    clicks: 0,
    impressions: 73,
  },
  {
    from: '/programs/',
    to: '/experiencias/pases-reconecta',
    permanent: true,
    priority: 'low',
    clicks: 0,
    impressions: 51,
  },
  {
    from: '/producto/giftcard-biopiscinas/',
    to: '/',
    permanent: true,
    priority: 'low',
    clicks: 0,
    impressions: 48,
  },

  // ============================================
  // Variantes con/sin trailing slash
  // ============================================
  {
    from: '/biopiscinas',
    to: '/servicios/biopiscinas',
    permanent: true,
    priority: 'critical',
  },
  {
    from: '/hot-tub',
    to: '/servicios/hot-tubs',
    permanent: true,
    priority: 'critical',
  },
  {
    from: '/servicios',
    to: '/',
    permanent: true,
    priority: 'critical',
  },
  {
    from: '/promos',
    to: '/',
    permanent: true,
    priority: 'critical',
  },
  {
    from: '/cafeteria-saludable-frutillar',
    to: '/cafeteria',
    permanent: true,
    priority: 'critical',
  },
];

// Exportar solo las URLs para verificación rápida
export const redirectPaths = redirects.map(r => ({
  from: r.from,
  to: r.to,
}));

// Función helper para buscar redirección
export function findRedirect(path: string): Redirect | undefined {
  // Normalizar path (remover trailing slash si existe)
  const normalizedPath = path.endsWith('/') && path.length > 1
    ? path.slice(0, -1)
    : path;

  // Buscar con y sin trailing slash
  return redirects.find(r =>
    r.from === path ||
    r.from === normalizedPath ||
    r.from === normalizedPath + '/'
  );
}
