export default function Head() {
  const seoData = {
    title: "Contacto - Cancagua Spa & Retreat Center | Frutillar",
    description: "Contáctanos para reservas, consultas o información. Ubicados en Frutillar, Región de Los Lagos. Teléfono: +56 9 4007 3999. Email: contacto@cancagua.cl",
    keywords: "contacto cancagua, telefono spa frutillar, como llegar cancagua, ubicacion spa lago llanquihue, reservas cancagua",
    canonical: "/contacto",
    image: "https://cancagua.cl/images/10_cancagua-header.jpg",
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
