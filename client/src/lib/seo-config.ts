/**
 * Configuración SEO centralizada para todas las páginas del sitio.
 * Estos datos se usan para actualizar dinámicamente los meta tags
 * durante la navegación client-side.
 */

export interface PageSEO {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
}

export const seoConfig: Record<string, PageSEO> = {
  '/': {
    title: 'Cancagua Spa & Retreat Center | Biopiscinas Geotermales en Frutillar',
    description: 'Las primeras biopiscinas geotermales del mundo. Disfruta de una experiencia única de bienestar en aguas termales naturales a 37°-40° con vista al Lago Llanquihue y volcanes del sur de Chile.',
    keywords: 'spa, termas, biopiscinas, geotermales, frutillar, chile, masajes, hot tubs, bienestar, lago llanquihue, termas sur chile',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  },
  '/servicios/biopiscinas': {
    title: 'Biopiscinas Geotermales Frutillar | Las Primeras del Mundo - Cancagua',
    description: 'Descubre las primeras biopiscinas geotermales del mundo en Cancagua, Frutillar. Disfruta de una experiencia relajante con aguas a 35-41°C, rodeado de naturaleza y con vista al Lago Llanquihue.',
    keywords: 'biopiscinas geotermales, termas frutillar, spa chile, aguas termales, biopiscina, termas naturales, spa lago llanquihue',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp',
  },
  '/servicios/hot-tubs': {
    title: 'Hot Tubs Frutillar | Spa al Aire Libre con Vista al Lago - Cancagua',
    description: 'Disfruta de nuestros Hot Tubs al aire libre con vista al Lago Llanquihue. Experiencia de spa privada en medio del bosque nativo, perfecta para parejas y grupos pequeños.',
    keywords: 'hot tubs frutillar, jacuzzi exterior, spa privado chile, hot tub lago llanquihue, spa parejas frutillar',
    image: 'https://cancagua.cl/images/hot-tubs-hero.jpg',
  },
  '/servicios/masajes': {
    title: 'Masajes y Terapias en Frutillar | Relax Total - Cancagua',
    description: 'Reconforta tu cuerpo con masajes descontracturantes, piedras calientes, drenaje linfático y más. Terapeutas profesionales en un entorno natural único.',
    keywords: 'masajes frutillar, spa masajes chile, masaje descontracturante, piedras calientes, drenaje linfático, terapias relajación',
    image: 'https://cancagua.cl/images/masajes-hero.jpg',
  },
  '/servicios/sauna': {
    title: 'Sauna en Frutillar | Desintoxicación Natural - Cancagua',
    description: 'Experimenta los beneficios del sauna finlandés en Cancagua. Desintoxicación natural, mejora la circulación y relaja tus músculos con vista al lago.',
    keywords: 'sauna frutillar, sauna finlandés chile, spa sauna lago llanquihue, desintoxicación natural',
    image: 'https://cancagua.cl/images/sauna-hero.jpg',
  },
  '/servicios/full-day-biopiscinas': {
    title: 'Full Day Biopiscinas | Experiencia Completa de Bienestar - Cancagua',
    description: 'Vive un día completo de bienestar con acceso ilimitado a biopiscinas geotermales, almuerzo gourmet y servicios de spa. La experiencia más completa en Frutillar.',
    keywords: 'full day spa frutillar, día completo termas, experiencia bienestar chile, paquete spa lago llanquihue',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp',
  },
  '/servicios/full-day-hot-tubs': {
    title: 'Full Day Hot Tubs | Spa Completo al Aire Libre - Cancagua',
    description: 'Disfruta de un día completo con hot tubs privados, almuerzo y acceso a todas las instalaciones. Experiencia exclusiva en medio del bosque nativo.',
    keywords: 'full day hot tubs, día spa privado, experiencia exclusiva frutillar, paquete hot tub chile',
    image: 'https://cancagua.cl/images/hot-tubs-hero.jpg',
  },
  '/cafeteria': {
    title: 'Cafetería Saludable Frutillar - Cancagua',
    description: 'Disfruta de nuestra Cafetería Saludable frente al Lago Llanquihue. Brunch todo el día, café de especialidad y opciones Veganas, Keto y Sin Gluten. Ingredientes locales y vista al volcán.',
    keywords: 'cafetería saludable frutillar, cafetería frutillar, opciones veganas frutillar, brunch frutillar, cafe especialidad lago llanquihue',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  },
  '/carta': {
    title: 'Carta Cafetería Cancagua | Brunch, Café y Comida Saludable',
    description: 'Descubre nuestra carta de alimentación saludable con productos locales de la cuenca del Lago Llanquihue. Opciones veganas, vegetarianas, sin gluten, keto y sin lactosa.',
    keywords: 'menu cancagua, carta saludable frutillar, comida healthy lago llanquihue, menu vegano chile, brunch frutillar',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  },
  '/clases': {
    title: 'Clases de Yoga y Bienestar en Frutillar - Cancagua',
    description: 'Hatha Yoga, entrenamiento funcional, natación en aguas abiertas, danza consciente y meditación. Clases para todos los niveles con instructores certificados en entorno natural.',
    keywords: 'yoga frutillar, clases yoga chile, entrenamiento funcional, fitness lago llanquihue, clases bienestar puerto varas',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309082/cancagua/images/12_yoga-clases.webp',
  },
  '/contacto': {
    title: 'Contacto Cancagua Spa | Ubicación, Teléfono y Reservas',
    description: 'Contáctanos para reservas y consultas. Ubicados en Frutillar, Región de Los Lagos. Teléfono, WhatsApp, email y mapa de ubicación.',
    keywords: 'contacto cancagua, ubicación spa frutillar, reservas termas chile, como llegar cancagua',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  },
  '/nosotros': {
    title: 'Nosotros | Historia y Filosofía de Cancagua Spa',
    description: 'Conoce la historia de Cancagua, las primeras biopiscinas geotermales del mundo. Nuestra filosofía de bienestar y conexión con la naturaleza.',
    keywords: 'historia cancagua, filosofía spa, bienestar natural chile, sobre nosotros cancagua',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  },
  '/eventos': {
    title: 'Eventos Corporativos y Privados en Frutillar - Cancagua',
    description: 'Organiza eventos corporativos, retiros empresariales y celebraciones privadas en un entorno natural único. Team building, reuniones y más.',
    keywords: 'eventos corporativos frutillar, retiros empresariales chile, team building lago llanquihue, eventos privados spa',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  },
  '/eventos/empresas': {
    title: 'Eventos Corporativos en Frutillar | Team Building y Reuniones - Cancagua',
    description: 'Retiros empresariales, team building y experiencias únicas para tu equipo en un entorno natural privilegiado frente al Lago Llanquihue.',
    keywords: 'eventos corporativos frutillar, team building chile, retiros empresariales lago llanquihue, reuniones corporativas spa',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  },
  '/eventos/sociales': {
    title: 'Eventos Sociales en Frutillar | Cumpleaños, Celebraciones - Cancagua',
    description: 'Celebra cumpleaños, despedidas de soltera, aniversarios y eventos especiales en un entorno único con vista al lago y volcanes.',
    keywords: 'eventos sociales frutillar, cumpleaños spa chile, despedida soltera termas, celebraciones lago llanquihue',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  },
  '/eventos/concierto': {
    title: 'Concierto Equinoccio de Otoño - Cambio de Piel | Cancagua Spa Frutillar',
    description: 'Concierto íntimo acústico en Cancagua Spa. Daniela Conejero y Ítalo Aguilera celebran el equinoccio de otoño con música junto a las biopiscinas geotermales.',
    keywords: 'concierto frutillar, concierto acústico spa, equinoccio otoño, biopiscinas concierto, cancagua eventos',
    image: 'https://cdn.getskedu.com/skedu-v2/5d59ea78-5b85-4274-b771-5ca34e689061/a5ac625d2db04b39a004b6b2851d0995.jpeg',
  },
  '/experiencias/pases-reconecta': {
    title: 'Pases Reconecta | Experiencias de Bienestar - Cancagua',
    description: 'Pases mensuales y anuales para disfrutar de todas las experiencias de Cancagua. Reconecta con tu bienestar de forma regular.',
    keywords: 'pases spa frutillar, membresía termas chile, pase mensual bienestar, experiencias reconecta',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  },
  '/gift-cards': {
    title: 'Gift Cards Cancagua | Regala Bienestar y Relax',
    description: 'Regala una experiencia única de bienestar. Gift cards para biopiscinas, masajes, spa y más. El regalo perfecto para quienes amas.',
    keywords: 'gift card spa, regalo bienestar chile, tarjeta regalo termas, gift card frutillar',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  },
  '/navega-relax': {
    title: 'Navega & Relax | Paseo en Velero Lago Llanquihue - Cancagua',
    description: 'Vive una experiencia única navegando en velero por el Lago Llanquihue con vista a los volcanes Osorno y Calbuco. Incluye picnic gourmet.',
    keywords: 'paseo velero lago llanquihue, navegación frutillar, tour velero chile, experiencia lago volcanes',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  },
  '/blog': {
    title: 'Blog Cancagua | Bienestar, Termas y Vida Consciente',
    description: 'Guías, consejos y experiencias sobre termas, bienestar y vida consciente en el sur de Chile. Descubre tips de salud y relax.',
    keywords: 'blog bienestar, termas sur chile, vida consciente, tips salud relax, blog spa frutillar',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309133/cancagua/images/blog/termas-geometricas-hero.webp',
  },
  '/spa-hotel-cabanas-del-lago': {
    title: 'Spa Hotel Cabañas del Lago Puerto Varas | Cancagua Spa',
    description: 'Disfruta de los servicios de Cancagua Spa en Hotel Cabañas del Lago, Puerto Varas. Masajes, tratamientos y bienestar con vista al lago.',
    keywords: 'spa puerto varas, hotel cabañas del lago spa, masajes puerto varas, bienestar lago llanquihue',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  },
  '/servicios/biopiscinas-puerto-varas': {
    title: 'Biopiscinas Geotermales con Traslado desde Puerto Varas | Cancagua',
    description: 'Disfruta de las primeras biopiscinas geotermales del mundo con traslado incluido desde Puerto Varas. Salida desde Hotel Cabañas del Lago de martes a domingo a las 10:00 hrs.',
    keywords: 'biopiscinas puerto varas, termas con traslado, biopiscinas geotermales, cancagua frutillar, spa puerto varas, termas sur chile, traslado hotel cabañas del lago',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp',
  },
};

/**
 * Obtiene la configuración SEO para una ruta específica.
 * Si no existe configuración específica, retorna valores por defecto.
 */
export function getSEOForPath(pathname: string): PageSEO {
  // Buscar coincidencia exacta primero
  if (seoConfig[pathname]) {
    return seoConfig[pathname];
  }

  // Valores por defecto
  return {
    title: 'Cancagua Spa & Retreat Center',
    description: 'Las primeras biopiscinas geotermales del mundo en Frutillar, Chile.',
    keywords: 'spa, termas, biopiscinas, frutillar, chile',
    image: 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg',
  };
}
