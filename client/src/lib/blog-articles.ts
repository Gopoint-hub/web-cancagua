import { lazy, ComponentType } from 'react';

export interface BlogArticle {
  slug: string;
  title: string;
  seoTitle: string;
  excerpt: string;
  seoDescription: string;
  keywords: string;
  image: string;
  date: string;
  dateISO: string;
  author: string;
  readTime: string;
  category: string;
  component: ComponentType;
}

// Lazy load article components for better performance
const MejoresTermasSurChile2026 = lazy(() => import('@/pages/blog/MejoresTermasSurChile2026'));
const TermasConNinos = lazy(() => import('@/pages/blog/TermasConNinos'));
const ManejoEstresLaboral = lazy(() => import('@/pages/blog/ManejoEstresLaboral'));
const TermasVsExperienciaNatural = lazy(() => import('@/pages/blog/TermasVsExperienciaNatural'));
const MasajeDeportivoIronman = lazy(() => import('@/pages/blog/MasajeDeportivoIronman'));

export const blogArticles: BlogArticle[] = [
  {
    slug: 'promocion-abril-masaje-deportivo-ironman-puerto-varas',
    title: 'Promoción de Abril: Masaje Deportivo (Especial Ironman Puerto Varas 2026)',
    seoTitle: 'Promoción de Abril: Masaje Deportivo | Especial Ironman Puerto Varas 2026 - Cancagua',
    excerpt: 'Potencia tu entrenamiento o acelera tu recuperación post Ironman Puerto Varas 2026 con nuestra promoción de abril: Masaje deportivo de 30 min y Sauna.',
    seoDescription: 'Promoción especial abril 2026 en Cancagua Spa: Masaje deportivo de 30 minutos y sauna, ideal para potenciar el entrenamiento o recuperarse del Ironman Puerto Varas.',
    keywords: 'Ironman Puerto Varas 2026, masaje deportivo, recuperacion muscular, masajes puerto varas, masajes frutillar, spa puerto varas, promocion abril spa',
    image: 'https://res.cloudinary.com/dhuln9b1n/image/upload/v1775671084/cancagua/images/blog/mmkuyhothznhsztfnvhq.jpg',
    date: '8 Abril 2026',
    dateISO: '2026-04-08',
    author: 'Cancagua Spa',
    readTime: '5 min',
    category: 'Promociones',
    component: MasajeDeportivoIronman,
  },
  {
    slug: 'mejores-termas-sur-chile-2026',
    title: 'Las 10 mejores termas del sur de Chile 2026 y sus alternativas',
    seoTitle: 'Las 10 Mejores Termas del Sur de Chile 2026 | Guía Completa - Cancagua',
    excerpt: 'Después de cinco años explorando cada rincón termal de la Región de Los Lagos, desde las icónicas Termas Geométricas hasta opciones menos conocidas, aprendí que elegir las mejores termas no se trata solo de agua caliente.',
    seoDescription: 'Guía actualizada 2026 de las mejores termas del sur de Chile. Descubre Termas Geométricas, Puyehue, y alternativas como las biopiscinas geotermales de Cancagua en Frutillar.',
    keywords: 'mejores termas sur chile, termas geometricas, termas puyehue, termas frutillar, aguas termales chile, termas region de los lagos, biopiscinas geotermales',
    image: 'https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309133/cancagua/images/blog/termas-geometricas-hero.webp',
    date: '19 Enero 2026',
    dateISO: '2026-01-19',
    author: 'Mario Hermosilla',
    readTime: '12 min',
    category: 'Guías',
    component: MejoresTermasSurChile2026,
  },
  {
    slug: 'termas-del-sur-de-chile-con-ninos-guia-para-familias',
    title: 'Termas del Sur de Chile con Niños: Guía para Familias',
    seoTitle: 'Termas del Sur de Chile con Niños: Guía Completa para Familias - Cancagua',
    excerpt: 'Planificar unas vacaciones en el sur de Chile con niños puede ser emocionante y estresante a la vez. Sé que muchas familias buscan «termas sur chile niños» esperando encontrar ese lugar perfecto.',
    seoDescription: 'Guía para visitar termas del sur de Chile con niños. Descubre las mejores opciones family-friendly, consejos de seguridad y actividades para toda la familia en Frutillar.',
    keywords: 'termas sur chile niños, termas familias chile, aguas termales con niños, termas frutillar familias, vacaciones termales familia, termas seguras niños',
    image: 'https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309150/cancagua/images/blog/termas-ninos-familias-hero.webp',
    date: '6 Enero 2026',
    dateISO: '2026-01-06',
    author: 'Mario Hermosilla',
    readTime: '10 min',
    category: 'Familias',
    component: TermasConNinos,
  },
  {
    slug: 'tecnicas-manejo-estres-laboral',
    title: 'Manejo del Estrés Laboral: Técnicas Probadas por la Ciencia',
    seoTitle: 'Manejo del Estrés Laboral: Técnicas Probadas por la Ciencia - Cancagua',
    excerpt: 'La neurociencia del estrés nos explica por qué pasa esto. Cuando recibes un email con el asunto «URGENTE», tu sistema nervioso no distingue entre esa notificación y un peligro físico real.',
    seoDescription: 'Descubre técnicas científicamente probadas para manejar el estrés laboral. Aprende métodos prácticos de relajación, mindfulness y bienestar que puedes aplicar en tu día a día.',
    keywords: 'manejo estres laboral, tecnicas relajacion trabajo, reducir estres oficina, bienestar laboral, mindfulness trabajo, burnout prevencion',
    image: 'https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309113/cancagua/images/blog/manejo-estres-laboral-hero.webp',
    date: '12 Noviembre 2025',
    dateISO: '2025-11-12',
    author: 'Mario Hermosilla',
    readTime: '15 min',
    category: 'Bienestar',
    component: ManejoEstresLaboral,
  },
  {
    slug: 'termas-del-sur-vs-experiencia-natural',
    title: 'Termas del Sur Tradicionales vs Experiencia Natural: Guía Completa',
    seoTitle: 'Termas del Sur Tradicionales vs Experiencia Natural: Guía Comparativa - Cancagua',
    excerpt: 'Viste que algunas personas vuelven cambiadas de sus días termales, mientras que otras simplemente dicen «si, estuvo bien». Probablemente la diferencia fue en el tipo de experiencia que eligieron.',
    seoDescription: 'Comparativa entre termas tradicionales del sur de Chile y experiencias naturales como biopiscinas. Descubre cuál es la mejor opción según tus necesidades de bienestar.',
    keywords: 'termas tradicionales vs naturales, comparativa termas chile, biopiscinas vs termas, experiencia termal natural, termas sur chile diferencias',
    image: 'https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309133/cancagua/images/blog/termas-geometricas-hero.webp',
    date: '29 Octubre 2025',
    dateISO: '2025-10-29',
    author: 'Mario Hermosilla',
    readTime: '11 min',
    category: 'Comparativas',
    component: TermasVsExperienciaNatural,
  },
];

// Helper function to get article by slug
export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find(article => article.slug === slug);
}

// Helper function to get all slugs (useful for sitemap generation)
export function getAllSlugs(): string[] {
  return blogArticles.map(article => article.slug);
}
