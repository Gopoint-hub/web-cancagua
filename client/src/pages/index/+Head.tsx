export default function Head() {
  const seoData = {
    title: "Cancagua Spa & Retreat Center | Biopiscinas Geotermales en Frutillar",
    description: "Las primeras biopiscinas geotermales del mundo. Disfruta de una experiencia única de bienestar en aguas termales naturales a 37°-40° con vista al Lago Llanquihue y volcanes del sur de Chile.",
    keywords: "spa, termas, biopiscinas, geotermales, frutillar, chile, masajes, hot tubs, bienestar, lago llanquihue, termas sur chile",
    image: "https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp",
    url: "https://cancagua.cl/",
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DaySpa',
    name: 'Cancagua Spa & Retreat Center',
    description: seoData.description,
    url: seoData.url,
    telephone: '+56 9 7557 2690',
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
    priceRange: '$$$',
    image: seoData.image,
    sameAs: [
      'https://www.instagram.com/cancaguaspa',
      'https://www.facebook.com/cancaguaspa',
    ],
  };

  return (
    <>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <link rel="canonical" href={seoData.url} />

      {/* Open Graph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:url" content={seoData.url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Cancagua Spa & Retreat Center" />
      <meta property="og:locale" content="es_CL" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />

      {/* Idiomas alternativos */}
      <link rel="alternate" hrefLang="es" href="https://cancagua.cl/" />
      <link rel="alternate" hrefLang="en" href="https://cancagua.cl/en/" />
      <link rel="alternate" hrefLang="pt" href="https://cancagua.cl/pt/" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </>
  );
}
