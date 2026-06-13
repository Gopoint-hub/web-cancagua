export default function Head() {
  const seoData = {
    title: "Contacto Cancagua | Reservas, WhatsApp y Cómo Llegar",
    description: "Contacta a Cancagua Spa en Frutillar: reservas, WhatsApp, teléfono, email, ubicación a 2 km de Frutillar Bajo, mapa, Waze y rutas desde Puerto Varas.",
    keywords: "contacto cancagua, reservas cancagua, whatsapp cancagua, telefono cancagua spa, como llegar cancagua, ubicación spa frutillar, cancagua frutillar precios",
    canonical: "/contacto",
    image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg",
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
