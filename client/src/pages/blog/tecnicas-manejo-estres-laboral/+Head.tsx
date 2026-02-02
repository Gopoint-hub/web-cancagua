export function Head() {
  const title = "Manejo del Estrés Laboral: Técnicas Probadas por la Ciencia - Cancagua";
  const description = "Descubre técnicas científicamente probadas para manejar el estrés laboral. Aprende métodos prácticos de relajación, mindfulness y bienestar que puedes aplicar en tu día a día.";
  const keywords = "manejo estres laboral, tecnicas relajacion trabajo, reducir estres oficina, bienestar laboral, mindfulness trabajo, burnout prevencion";
  const canonical = "https://cancagua.cl/blog/tecnicas-manejo-estres-laboral";
  const image = "https://cancagua.cl/images/blog/manejo-estres-laboral-hero.webp";

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
      <meta property="article:published_time" content="2025-11-12" />
      <meta property="article:author" content="Mario Hermosilla" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
