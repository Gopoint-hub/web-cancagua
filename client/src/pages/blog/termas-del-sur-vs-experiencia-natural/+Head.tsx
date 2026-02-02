export function Head() {
  const title = "Termas del Sur Tradicionales vs Experiencia Natural: Guía Comparativa - Cancagua";
  const description = "Comparativa entre termas tradicionales del sur de Chile y experiencias naturales como biopiscinas. Descubre cuál es la mejor opción según tus necesidades de bienestar.";
  const keywords = "termas tradicionales vs naturales, comparativa termas chile, biopiscinas vs termas, experiencia termal natural, termas sur chile diferencias";
  const canonical = "https://cancagua.cl/blog/termas-del-sur-vs-experiencia-natural";
  const image = "https://res.cloudinary.com/dhuln9b1n/image/upload/v1769960573/cancagua/cancagua/images/blog/termas-geometricas-hero.webp";

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
      <meta property="article:published_time" content="2025-10-29" />
      <meta property="article:author" content="Mario Hermosilla" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
