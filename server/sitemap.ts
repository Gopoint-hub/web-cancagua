/**
 * Generador de Sitemap.xml dinamico
 *
 * Genera el sitemap con todas las rutas publicas del sitio.
 * Las rutas estaticas estan definidas aqui; en el futuro se puede
 * extender para consultar al CMS por rutas dinámicas (blog posts, panoramas, etc.)
 */

import type { Express } from "express";

// Lista de todas las rutas publicas con SSR y su prioridad SEO
const PUBLIC_ROUTES = [
  { url: "/", changefreq: "daily", priority: 1.0 },

  // Servicios
  { url: "/servicios", changefreq: "weekly", priority: 0.9 },
  { url: "/servicios/biopiscinas", changefreq: "weekly", priority: 0.9 },
  { url: "/servicios/biopiscinas-puerto-varas", changefreq: "weekly", priority: 0.8 },
  { url: "/servicios/hot-tubs", changefreq: "weekly", priority: 0.9 },
  { url: "/servicios/masajes", changefreq: "weekly", priority: 0.8 },
  { url: "/servicios/sauna", changefreq: "weekly", priority: 0.7 },
  { url: "/servicios/full-day-hot-tubs", changefreq: "weekly", priority: 0.7 },

  // Panoramas
  { url: "/panoramas", changefreq: "weekly", priority: 0.8 },
  { url: "/panoramas/celebraciones", changefreq: "weekly", priority: 0.7 },
  { url: "/panoramas/concierto", changefreq: "monthly", priority: 0.7 },

  // Corporativos
  { url: "/corporativos", changefreq: "weekly", priority: 0.8 },

  // Experiencias
  { url: "/experiencias/pases-reconecta", changefreq: "weekly", priority: 0.7 },
  { url: "/experiencias/pase-reconecta", changefreq: "weekly", priority: 0.7 },
  { url: "/experiencias/pase-reconecta-detox", changefreq: "weekly", priority: 0.7 },
  { url: "/experiencias/pase-bioreconecta", changefreq: "weekly", priority: 0.7 },
  { url: "/experiencias/pase-bioreconecta-detox", changefreq: "weekly", priority: 0.7 },
  { url: "/navega-relax", changefreq: "monthly", priority: 0.6 },

  // Preguntas frecuentes
  { url: "/preguntas-frecuentes", changefreq: "monthly", priority: 0.8 },

  // Blog
  { url: "/blog", changefreq: "weekly", priority: 0.8 },
  { url: "/blog/promo-agosto-familia-hot-tub-biopiscinas-pizza", changefreq: "weekly", priority: 0.9 },
  { url: "/blog/turismo-regenerativo-cancagua-travesia-circular", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/cuando-el-cuerpo-recuerda-bienestar-cancagua", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/escucha-cuerpo-ciencia-bienestar-puerto-varas", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/itinerarios-dia-frio-spa-cancagua-frutillar", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/la-doble-llamada-del-agua-lago-llanquihue-cancagua", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/mejores-termas-sur-chile-2026", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/termas-del-sur-de-chile-con-ninos-guia-para-familias", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/tecnicas-manejo-estres-laboral", changefreq: "monthly", priority: 0.7 },
  { url: "/blog/termas-del-sur-vs-experiencia-natural", changefreq: "monthly", priority: 0.8 },

  // Informacion
  { url: "/nosotros", changefreq: "monthly", priority: 0.8 },
  { url: "/contacto", changefreq: "monthly", priority: 0.8 },
  { url: "/cafeteria", changefreq: "weekly", priority: 0.7 },
  { url: "/cartahottubs", changefreq: "monthly", priority: 0.6 },
  { url: "/clases", changefreq: "weekly", priority: 0.6 },
  { url: "/masajes", changefreq: "weekly", priority: 0.7 },
  { url: "/spa-hotel-cabanas-del-lago", changefreq: "monthly", priority: 0.5 },

  // Gift Cards
  { url: "/gift-cards", changefreq: "weekly", priority: 0.7 },
];

function generateSitemap(): string {
  const baseUrl = "https://cancagua.cl";
  const now = new Date().toISOString();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  PUBLIC_ROUTES.forEach(route => {
    xml += "  <url>\n";
    xml += `    <loc>${baseUrl}${route.url}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += "  </url>\n";
  });

  xml += "</urlset>";

  return xml;
}

export function registerSitemapRoute(app: Express) {
  // Sitemap principal
  app.get("/sitemap.xml", (_req, res) => {
    res.header("Content-Type", "application/xml");
    res.send(generateSitemap());
  });

  // robots.txt
  app.get("/robots.txt", (_req, res) => {
    res.header("Content-Type", "text/plain");
    res.send(
      `User-agent: *\nAllow: /\n\nSitemap: https://cancagua.cl/sitemap.xml\n`
    );
  });
}
