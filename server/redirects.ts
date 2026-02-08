/**
 * Redirecciones 301 para migración SEO (WordPress → Vike)
 *
 * IMPACTO TOTAL:
 * - 358 clicks/mes en riesgo
 * - 28,666 impressions/mes en riesgo
 */

import type { Express, Request, Response, NextFunction } from "express";

// Mapa de redirecciones: URL antigua → URL nueva
const redirectMap: Record<string, string> = {
  // ============================================
  // CRITICAS - 280 clicks, 22,456 impressions
  // ============================================
  "/biopiscinas": "/servicios/biopiscinas",
  "/biopiscinas/": "/servicios/biopiscinas",
  "/hot-tub": "/servicios/hot-tubs",
  "/hot-tub/": "/servicios/hot-tubs",
  "/hot-tub/fin-de-semana": "/servicios/hot-tubs",
  "/hot-tub/fin-de-semana/": "/servicios/hot-tubs",
  "/servicios": "/",
  "/servicios/": "/",
  "/promos": "/",
  "/promos/": "/",
  "/cafeteria-saludable-frutillar": "/cafeteria",
  "/cafeteria-saludable-frutillar/": "/cafeteria",

  // ============================================
  // ALTAS - 29 clicks, 1,064 impressions
  // ============================================
  "/sonoterapia": "/servicios/masajes",
  "/sonoterapia/": "/servicios/masajes",
  "/categoria/giftcards": "/",
  "/categoria/giftcards/": "/",
  "/menu": "/carta",
  "/menu/": "/carta",
  "/yoga-nueva": "/clases",
  "/yoga-nueva/": "/clases",

  // ============================================
  // MEDIAS - 76 clicks, 5,146 impressions
  // ============================================
  "/home": "/",
  "/home/": "/",
  "/programas": "/experiencias/pases-reconecta",
  "/programas/": "/experiencias/pases-reconecta",
  "/dia-playa-frutillar": "/",
  "/dia-playa-frutillar/": "/",
  "/faq": "/contacto",
  "/faq/": "/contacto",
  "/faqs": "/contacto",
  "/faqs/": "/contacto",
  "/entrenamiento": "/clases",
  "/entrenamiento/": "/clases",
  "/hot-tubs": "/servicios/hot-tubs",
  "/hot-tubs/": "/servicios/hot-tubs",
  "/pase-mediodia": "/experiencias/pases-reconecta",
  "/pase-mediodia/": "/experiencias/pases-reconecta",
  "/beach-day": "/",
  "/beach-day/": "/",
  "/producto/giftcard-masajes": "/",
  "/producto/giftcard-masajes/": "/",
  "/termas-del-sur-de-chile-con-ninos-guia-para-familias": "/blog/termas-con-ninos",
  "/termas-del-sur-de-chile-con-ninos-guia-para-familias/": "/blog/termas-con-ninos",
  "/playa": "/",
  "/playa/": "/",
  "/reconnect-half-day-pass": "/experiencias/pases-reconecta",
  "/reconnect-half-day-pass/": "/experiencias/pases-reconecta",

  // ============================================
  // BAJAS - 0 clicks pero con impressions
  // ============================================
  "/aikido": "/clases",
  "/aikido/": "/clases",
  "/services": "/",
  "/services/": "/",
  "/programs": "/experiencias/pases-reconecta",
  "/programs/": "/experiencias/pases-reconecta",
  "/producto/giftcard-biopiscinas": "/",
  "/producto/giftcard-biopiscinas/": "/",

  // ============================================
  // BLOG - URLs existentes
  // ============================================
  "/articulos": "/blog",
  "/articulos/": "/blog",
  "/mejores-termas-sur-chile-2026": "/blog/mejores-termas-sur-chile-2026",
  "/mejores-termas-sur-chile-2026/": "/blog/mejores-termas-sur-chile-2026",
  "/tecnicas-manejo-estres-laboral": "/blog/manejo-estres-laboral",
  "/tecnicas-manejo-estres-laboral/": "/blog/manejo-estres-laboral",
  "/termas-del-sur-vs-experiencia-natural": "/blog/termas-vs-experiencia-natural",
  "/termas-del-sur-vs-experiencia-natural/": "/blog/termas-vs-experiencia-natural",

  // ============================================
  // EVENTOS - URLs existentes
  // ============================================
  "/eventos-empresas": "/eventos/empresas",
  "/eventos-empresas/": "/eventos/empresas",

  // ============================================
  // GIFT CARDS - URLs existentes
  // ============================================
  "/giftcards": "/",
  "/giftcards/": "/",
  "/gift-card": "/",
  "/gift-card/": "/",

  // ============================================
  // SERVICIOS - URLs antiguas
  // ============================================
  "/masajes": "/servicios/masajes",
  "/masajes/": "/servicios/masajes",
  "/sauna": "/servicios/sauna",
  "/sauna/": "/servicios/sauna",

  // ============================================
  // Trailing slash normalization
  // ============================================
  "/eventos/": "/eventos",
  "/contacto/": "/contacto",
  "/nosotros/": "/nosotros",
  "/cafeteria/": "/cafeteria",
  "/blog/": "/blog",
  "/clases/": "/clases",
  "/carta/": "/carta",
};

/**
 * Middleware de redirecciones 301
 * Intercepta las URLs antiguas del WordPress y redirige a las nuevas
 */
function redirectMiddleware(req: Request, res: Response, next: NextFunction) {
  const path = req.path.toLowerCase();

  // Verificar si la URL esta en el mapa de redirecciones
  const redirectTo = redirectMap[path];

  if (redirectTo) {
    // Preservar query strings en la redireccion
    const queryString = req.originalUrl.includes("?")
      ? req.originalUrl.substring(req.originalUrl.indexOf("?"))
      : "";

    // Redireccion 301 (permanente) para SEO
    return res.redirect(301, redirectTo + queryString);
  }

  next();
}

/**
 * Registra el middleware de redirecciones en la aplicacion Express
 */
export function registerRedirects(app: Express) {
  app.use(redirectMiddleware);
}
