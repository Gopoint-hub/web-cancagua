export default function Head() {
  const seoData = {
    title: "Gift Cards | Cancagua Spa - Regala Bienestar",
    description: "Regala bienestar con nuestras gift cards de Cancagua Spa. El regalo perfecto para quienes amas. Válidas por 1 año, entrega inmediata por email.",
    keywords: "gift card spa, regalo spa chile, tarjeta regalo cancagua, regalar bienestar, spa frutillar regalo",
    canonical: "/gift-cards",
    image: "https://cancagua.cl/images/fullday-biopiscinas-hero.jpg",
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

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />
    </>
  );
}
