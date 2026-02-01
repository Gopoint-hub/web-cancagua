export default function Head() {
  const seoData = {
    title: "Blog de Bienestar | Cancagua",
    description: "Guías, consejos y experiencias sobre termas, bienestar y vida consciente en el sur de Chile. Descubre las mejores termas, técnicas de relajación y experiencias naturales.",
    keywords: "blog bienestar, termas sur chile, vida consciente, experiencias naturales, spa frutillar, wellness chile",
    canonical: "/blog",
    image: "https://cancagua.cl/images/blog/termas-geometricas-hero.webp",
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
