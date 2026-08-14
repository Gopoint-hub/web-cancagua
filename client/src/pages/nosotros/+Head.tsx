export default function Head() {
  const seoData = {
    title: "Nosotros - Historia y Valores | Cancagua",
    description:
      "Conoce la historia de Cancagua, el primer spa con biopiscinas geotermales del mundo. Nuestros valores de sustentabilidad, bienestar y conexión con la naturaleza en Frutillar, Chile.",
    keywords:
      "cancagua historia, spa sustentable chile, valores bienestar, filosofia cancagua, equipo cancagua frutillar",
    canonical: "/nosotros",
    image:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg",
  };

  const canonical = `https://cancagua.cl${seoData.canonical}`;
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: seoData.title,
    description: seoData.description,
    inLanguage: "es-CL",
    mainEntity: {
      "@type": "DaySpa",
      "@id": "https://cancagua.cl/#organization",
      name: "Cancagua Spa & Retreat Center",
      url: "https://cancagua.cl/",
      telephone: "+56 9 4007 3999",
      email: "contacto@cancagua.cl",
      image: seoData.image,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Camino a Punta Larga Km 2",
        addressLocality: "Frutillar",
        addressRegion: "Los Lagos",
        addressCountry: "CL",
      },
      sameAs: [
        "https://www.instagram.com/cancaguachile",
        "https://www.facebook.com/Cancaguachile",
      ],
    },
  };

  return (
    <>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Cancagua Spa & Retreat Center" />
      <meta property="og:locale" content="es_CL" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(aboutPageSchema)}
      </script>
    </>
  );
}
