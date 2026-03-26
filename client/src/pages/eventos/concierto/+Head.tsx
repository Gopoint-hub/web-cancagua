export default function Head() {
  const seoData = {
    title: "Concierto Equinoccio de Otoño - Cambio de Piel | Cancagua Spa Frutillar",
    description: "Concierto íntimo acústico en Cancagua Spa. Daniela Conejero y Ítalo Aguilera celebran el equinoccio de otoño con música junto a las biopiscinas geotermales. 11 de abril, 19:00 hrs.",
    keywords: "concierto frutillar, concierto acústico spa, equinoccio otoño, biopiscinas concierto, cancagua eventos, música en vivo lago llanquihue",
    canonical: "/eventos/concierto",
    image: "https://cdn.getskedu.com/skedu-v2/5d59ea78-5b85-4274-b771-5ca34e689061/a5ac625d2db04b39a004b6b2851d0995.jpeg",
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
