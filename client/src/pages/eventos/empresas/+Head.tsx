export default function Head() {
  const seoData = {
    title: "Eventos Corporativos en Frutillar | Team Building y Reuniones - Cancagua",
    description: "Organiza eventos corporativos únicos en Cancagua Spa. Team building, reuniones ejecutivas y retiros empresariales con vista al Lago Llanquihue y volcanes del sur de Chile.",
    keywords: "eventos corporativos frutillar, team building sur chile, reuniones empresariales lago llanquihue, retiros corporativos",
    canonical: "/eventos/empresas",
    image: "https://cancagua.cl/images/eventos-corporativos-hero.jpg",
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
