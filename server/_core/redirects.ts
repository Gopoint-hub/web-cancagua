import { Express, Request, Response, NextFunction } from "express";

/**
 * Mapeo de redirecciones 301 desde URLs antiguas del WordPress
 * a las nuevas URLs del sitio para preservar SEO
 */
const redirectMap: Record<string, string> = {
  // Páginas principales
  "/articulos": "/blog",
  "/articulos/": "/blog",
  "/eventos-empresas": "/eventos/empresas",
  "/eventos-empresas/": "/eventos/empresas",
  "/giftcards": "/tienda-regalos-preview",
  "/giftcards/": "/tienda-regalos-preview",
  "/gift-card": "/tienda-regalos-preview",
  "/gift-card/": "/tienda-regalos-preview",
  
  // Artículos de blog - URLs críticas para SEO
  "/mejores-termas-sur-chile-2026": "/blog/mejores-termas-sur-chile-2026",
  "/mejores-termas-sur-chile-2026/": "/blog/mejores-termas-sur-chile-2026",
  "/termas-del-sur-de-chile-con-ninos-guia-para-familias": "/blog/termas-con-ninos",
  "/termas-del-sur-de-chile-con-ninos-guia-para-familias/": "/blog/termas-con-ninos",
  "/tecnicas-manejo-estres-laboral": "/blog/manejo-estres-laboral",
  "/tecnicas-manejo-estres-laboral/": "/blog/manejo-estres-laboral",
  "/termas-del-sur-vs-experiencia-natural": "/blog/termas-vs-experiencia-natural",
  "/termas-del-sur-vs-experiencia-natural/": "/blog/termas-vs-experiencia-natural",
  
  // Servicios - redirecciones de estructura antigua
  "/biopiscinas": "/servicios/biopiscinas",
  "/biopiscinas/": "/servicios/biopiscinas",
  "/hot-tubs": "/servicios/hot-tubs",
  "/hot-tubs/": "/servicios/hot-tubs",
  "/masajes": "/servicios/masajes",
  "/masajes/": "/servicios/masajes",
  "/sauna": "/servicios/sauna",
  "/sauna/": "/servicios/sauna",
  
  // Trailing slash normalization para páginas principales
  "/servicios/": "/servicios",
  "/eventos/": "/eventos",
  "/contacto/": "/contacto",
  "/faqs/": "/faqs",
  "/nosotros/": "/nosotros",
  "/cafeteria/": "/cafeteria",
  "/blog/": "/blog",
};

/**
 * Middleware de redirecciones 301
 * Intercepta las URLs antiguas del WordPress y redirige a las nuevas
 */
export function redirectMiddleware(req: Request, res: Response, next: NextFunction) {
  const path = req.path.toLowerCase();
  
  // Verificar si la URL está en el mapa de redirecciones
  const redirectTo = redirectMap[path];
  
  if (redirectTo) {
    // Preservar query strings en la redirección
    const queryString = req.originalUrl.includes("?") 
      ? req.originalUrl.substring(req.originalUrl.indexOf("?")) 
      : "";
    
    // Redirección 301 (permanente) para SEO
    return res.redirect(301, redirectTo + queryString);
  }
  
  next();
}

/**
 * Registra el middleware de redirecciones en la aplicación Express
 */
export function registerRedirects(app: Express) {
  // El middleware debe ejecutarse antes de las rutas estáticas
  app.use(redirectMiddleware);
}
