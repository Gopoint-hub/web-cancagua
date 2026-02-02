export function Head() {
  const title = "Termas del Sur de Chile con Niños: Guía Completa para Familias - Cancagua";
  const description = "Guía para visitar termas del sur de Chile con niños. Descubre las mejores opciones family-friendly, consejos de seguridad y actividades para toda la familia en Frutillar.";
  const keywords = "termas sur chile niños, termas familias chile, aguas termales con niños, termas frutillar familias, vacaciones termales familia, termas seguras niños";
  const canonical = "https://cancagua.cl/blog/termas-del-sur-de-chile-con-ninos-guia-para-familias";
  const image = "https://cancagua.cl/images/blog/termas-ninos-familias-hero.webp";

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
      <meta property="article:published_time" content="2026-01-06" />
      <meta property="article:author" content="Mario Hermosilla" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
