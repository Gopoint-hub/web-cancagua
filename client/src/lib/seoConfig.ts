// Configuración SEO para todas las páginas del sitio
// Cada página puede importar su configuración desde aquí

export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  image?: string;
  noindex?: boolean;
}

export const seoConfig: Record<string, PageSEO> = {
  // Páginas principales
  home: {
    title: "Cancagua Spa & Retreat Center | Biopiscinas Geotermales en Frutillar",
    description: "Las primeras biopiscinas geotermales del mundo. Disfruta de una experiencia única de bienestar en aguas termales naturales a 37°-40° con vista al Lago Llanquihue.",
    canonical: "/",
    keywords: "spa, termas, biopiscinas, geotermales, frutillar, chile, masajes, hot tubs, bienestar, lago llanquihue"
  },
  
  // Servicios
  biopiscinas: {
    title: "Biopiscinas Geotermales | Cancagua Spa",
    description: "Las primeras biopiscinas geotermales del mundo. 4 horas de experiencia única en aguas termales naturales a 37°-40° sin químicos, con sistema de regeneración natural.",
    canonical: "/servicios/biopiscinas",
    keywords: "biopiscinas, geotermales, termas naturales, aguas termales, frutillar, chile, spa natural"
  },
  hotTubs: {
    title: "Hot Tubs al Aire Libre | Cancagua Spa",
    description: "Disfruta de hot tubs privados al aire libre inmerso en bosque nativo con vista al Lago Llanquihue y volcanes. Experiencia íntima de relajación.",
    canonical: "/servicios/hot-tubs",
    keywords: "hot tubs, jacuzzi, spa privado, bosque nativo, lago llanquihue, relajación"
  },
  sauna: {
    title: "Sauna Nativo | Cancagua Spa",
    description: "Sauna tradicional con vista al lago y bosque nativo. Experiencia de desintoxicación y relajación profunda en un entorno natural único.",
    canonical: "/servicios/sauna",
    keywords: "sauna, sauna nativo, desintoxicación, relajación, spa, frutillar"
  },
  masajes: {
    title: "Masajes y Terapias | Cancagua Spa Frutillar",
    description: "Masajes de relajación, descontracturantes, piedras calientes, drenaje linfático y más. Terapeutas certificados en un entorno natural único.",
    canonical: "/masajes",
    keywords: "masajes, terapias, relajación, descontracturante, piedras calientes, drenaje linfático, spa"
  },
  clases: {
    title: "Clases Regulares | Yoga, Funcional y Más | Cancagua",
    description: "Clases de yoga, entrenamiento funcional, danza infantil y más. Actividades para todos los niveles en un entorno natural único.",
    canonical: "/clases",
    keywords: "yoga, entrenamiento funcional, clases, bienestar, frutillar, actividades"
  },
  
  // Experiencias
  navegaRelax: {
    title: "Navega & Relax | Experiencia en el Lago Llanquihue",
    description: "Navega por el Lago Llanquihue con vista a los volcanes Osorno y Calbuco. Una experiencia única de relax y conexión con la naturaleza.",
    canonical: "/navega-relax",
    keywords: "navegación, lago llanquihue, volcán osorno, experiencia, relax, catamarán"
  },
  pasesReconecta: {
    title: "Pases Reconecta | Full Day Spa | Cancagua",
    description: "Pases de día completo con acceso a biopiscinas, hot tubs, sauna y más. La experiencia completa de bienestar en Cancagua.",
    canonical: "/experiencias/pases-reconecta",
    keywords: "full day spa, pase día, experiencia completa, bienestar, cancagua"
  },
  
  // Eventos
  eventos: {
    title: "Eventos en Cancagua | Empresas, Cumpleaños y Celebraciones",
    description: "Organiza tu evento corporativo, cumpleaños o celebración especial en un entorno natural único a orillas del Lago Llanquihue.",
    canonical: "/eventos",
    keywords: "eventos, eventos corporativos, cumpleaños, celebraciones, team building, frutillar"
  },
  eventosEmpresas: {
    title: "Eventos Corporativos | Team Building | Cancagua",
    description: "Eventos corporativos y team building en un entorno natural único. Biopiscinas, actividades y servicios exclusivos para empresas.",
    canonical: "/eventos/empresas",
    keywords: "eventos corporativos, team building, empresas, retiros corporativos, frutillar"
  },
  eventosSociales: {
    title: "Cumpleaños y Celebraciones | Cancagua Spa",
    description: "Celebra tu cumpleaños, despedida de soltera o evento especial en Cancagua. Paquetes personalizados con biopiscinas y servicios de spa.",
    canonical: "/eventos/sociales",
    keywords: "cumpleaños, celebraciones, despedida de soltera, eventos sociales, spa"
  },
  
  // Información
  nosotros: {
    title: "Nosotros | Historia de Cancagua Spa",
    description: "Conoce la historia de Cancagua, las primeras biopiscinas geotermales del mundo. Nuestra misión es ofrecer bienestar en armonía con la naturaleza.",
    canonical: "/nosotros",
    keywords: "cancagua, historia, biopiscinas, geotermales, frutillar, bienestar"
  },
  contacto: {
    title: "Contacto | Cómo Llegar a Cancagua Spa",
    description: "Contáctanos y descubre cómo llegar a Cancagua Spa en Frutillar. Ubicados a orillas del Lago Llanquihue, a 20 min de Puerto Varas.",
    canonical: "/contacto",
    keywords: "contacto, ubicación, cómo llegar, frutillar, puerto varas, lago llanquihue"
  },
  cafeteria: {
    title: "Cafetería | Gastronomía Natural | Cancagua",
    description: "Disfruta de nuestra cafetería con productos locales y orgánicos. Comida saludable con vista al Lago Llanquihue.",
    canonical: "/cafeteria",
    keywords: "cafetería, gastronomía, comida saludable, productos locales, frutillar"
  },
  
  // Blog
  blog: {
    title: "Blog | Bienestar, Termas y Naturaleza | Cancagua",
    description: "Artículos sobre bienestar, termas del sur de Chile, consejos de relajación y experiencias en la naturaleza.",
    canonical: "/blog",
    keywords: "blog, bienestar, termas, naturaleza, consejos, relajación"
  },
  
  // Spa HCDL
  spaHCDL: {
    title: "Spa en Hotel Cabañas del Lago | Masajes en Puerto Varas",
    description: "Servicios de masajes y terapias en el Hotel Cabañas del Lago, Puerto Varas. Relajación, descontracturante, piedras calientes y más.",
    canonical: "/spa-hotel-cabanas-del-lago",
    keywords: "spa puerto varas, masajes, hotel cabañas del lago, terapias, relajación"
  },
  
  // Páginas internas (noindex)
  giftCards: {
    title: "Gift Cards | Cancagua Spa",
    description: "Regala bienestar con nuestras gift cards. El regalo perfecto para quienes amas.",
    canonical: "/tienda-regalos-preview",
    noindex: true,
    keywords: "gift cards, tarjetas de regalo, regalos, bienestar"
  },
  
  // CMS y Admin (noindex)
  admin: {
    title: "Administración | Cancagua",
    description: "Panel de administración de Cancagua Spa",
    canonical: "/cms",
    noindex: true
  }
};

export default seoConfig;
