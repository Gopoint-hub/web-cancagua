export default function Head() {
  const seoData = {
    title: "Gift Cards - Regala Bienestar | Cancagua",
    description: "Regala bienestar con nuestras gift cards de Cancagua Spa. Opciones para biopiscinas, hot tubs, masajes y más. Válidas por 1 año, entrega inmediata por email. El regalo perfecto.",
    keywords: "gift card spa, regalo spa chile, tarjeta regalo cancagua, regalar bienestar, spa frutillar regalo, giftcard biopiscinas, giftcard hot tub, giftcard masajes",
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
