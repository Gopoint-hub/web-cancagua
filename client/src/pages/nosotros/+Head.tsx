export default function Head() {
  const seoData = {
    title: "Nosotros - Historia y Valores | Cancagua",
    description: "Conoce la historia de Cancagua, el primer spa con biopiscinas geotermales del mundo. Nuestros valores de sustentabilidad, bienestar y conexión con la naturaleza en Frutillar, Chile.",
    keywords: "cancagua historia, spa sustentable chile, valores bienestar, filosofia cancagua, equipo cancagua frutillar",
    canonical: "/nosotros",
    image: "https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg",
  };

  return (
    <>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <link rel="canonical" href={`https://cancagua.cl${seoData.canonical}`} />

      {/* Open Graph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:url" content={`https://cancagua.cl${seoData.canonical}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Cancagua Spa & Retreat Center" />
      <meta property="og:locale" content="es_CL" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />
    </>
  );
}
