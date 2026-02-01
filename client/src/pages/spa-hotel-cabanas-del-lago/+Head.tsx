export default function Head() {
  const seoData = {
    title: "Spa Hotel Cabañas del Lago Puerto Varas | Cancagua Spa",
    description: "Disfruta de los servicios de Cancagua Spa en Hotel Cabañas del Lago, Puerto Varas. Masajes, tratamientos y bienestar con vista al Lago Llanquihue.",
    keywords: "spa puerto varas, hotel cabañas del lago spa, masajes puerto varas, bienestar lago llanquihue",
    canonical: "/spa-hotel-cabanas-del-lago",
    image: "https://cancagua.cl/images/spa-cabanas-del-lago-hero.jpg",
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
