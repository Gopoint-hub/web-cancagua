export interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function generateMetaTags(data: SEOData, currentUrl: string) {
  const {
    title,
    description,
    canonical,
    image = 'https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp',
    type = 'website',
    keywords,
    publishedTime,
    modifiedTime,
    author = 'Cancagua Spa & Retreat Center',
  } = data;

  const baseUrl = 'https://cancagua.cl';
  const fullTitle = title.includes('Cancagua') ? title : `${title} | Cancagua Spa`;
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : `${baseUrl}${currentUrl}`;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return {
    fullTitle,
    fullCanonical,
    fullImage,
    description,
    type,
    keywords,
    publishedTime,
    modifiedTime,
    author,
  };
}

// Schema.org JSON-LD generators
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DaySpa',
    name: 'Cancagua Spa & Retreat Center',
    description: 'Las primeras biopiscinas geotermales del mundo. Disfruta de una experiencia única de bienestar en aguas termales naturales.',
    url: 'https://cancagua.cl',
    telephone: '+56 9 4007 3999',
    email: 'contacto@cancagua.cl',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Camino a Punta Larga Km 2',
      addressLocality: 'Frutillar',
      addressRegion: 'Los Lagos',
      postalCode: '5620000',
      addressCountry: 'CL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -41.118242,
      longitude: -73.011405,
    },
    // Rango real por ticket: sauna 2 personas $25.000 hasta Pase Reconecta
    // $170.000. Un rango concreto es citable; '$$$' no dice nada.
    priceRange: '$25.000 - $170.000 CLP',
    image: 'https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp',
    // Antes decia 'cancaguaspa'. El handle de Instagram esta verificado como
    // cancaguachile (es la cuenta conectada que responde como tal); el de
    // Facebook viene de la configuracion interna del equipo, no lo pude
    // comprobar en vivo. Se cambian porque el footer del sitio ya usa
    // cancaguachile y declarar dos perfiles distintos para el mismo negocio es
    // justo lo que baja la confianza del modelo sobre quien es Cancagua.
    sameAs: [
      'https://www.instagram.com/cancaguachile',
      'https://www.facebook.com/Cancaguachile',
    ],
  };
}

export function generateBlogPostSchema(post: {
  title: string;
  excerpt: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image || 'https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp',
    datePublished: post.publishedAt,
    dateModified: post.modifiedAt || post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author || 'Cancagua Spa & Retreat Center',
    },
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  image?: string;
  price?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    image: service.image || 'https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp',
    provider: {
      '@type': 'DaySpa',
      name: 'Cancagua Spa & Retreat Center',
      url: 'https://cancagua.cl',
    },
    ...(service.price && { offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'CLP',
    }}),
  };
}
