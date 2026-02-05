export default function Head() {
  const seoData = {
    title: "Pases Reconecta - Experiencias de Bienestar | Cancagua Spa",
    description: "Descubre nuestros Pases Reconecta: experiencias de medio día y día completo con acceso a biopiscinas, hot tubs, sauna y más. Reconecta con la naturaleza en Frutillar.",
    keywords: "pases reconecta, experiencias spa, día de spa frutillar, bienestar, retiro wellness",
    canonical: "/experiencias/pases-reconecta",
    image: "https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp",
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
