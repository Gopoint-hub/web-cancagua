export function Head() {
  const title = "Las 10 Mejores Termas del Sur de Chile 2026 | Guía Completa - Cancagua";
  const description = "Guía actualizada 2026 de las mejores termas del sur de Chile. Descubre Termas Geométricas, Puyehue, y alternativas como las biopiscinas geotermales de Cancagua en Frutillar.";
  const keywords = "mejores termas sur chile, termas geometricas, termas puyehue, termas frutillar, aguas termales chile, termas region de los lagos, biopiscinas geotermales";
  const canonical = "https://cancagua.cl/blog/mejores-termas-sur-chile-2026";
  const image = "https://cancagua.cl/images/blog/termas-geometricas-hero.webp";

  return (
    <>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Cancagua Spa & Retreat Center" />
      <meta property="article:published_time" content="2026-01-19" />
      <meta property="article:author" content="Mario Hermosilla" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
