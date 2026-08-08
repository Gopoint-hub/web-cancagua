export default function Head() {
  const title = "Biopiscinas Geotermales cerca de Puerto Varas | Cancagua";
  const description = "Las primeras biopiscinas geotermales del mundo, a 30 minutos de Puerto Varas, 40 de Puerto Montt y 45 de Osorno. Te contamos cómo llegar en auto o en transporte público.";
  const keywords = "biopiscinas puerto varas, biopiscinas geotermales, cancagua frutillar, spa puerto varas, termas sur chile, como llegar a cancagua";
  const canonical = "https://cancagua.cl/servicios/biopiscinas-puerto-varas";
  const image = "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp";

  return (
    <>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Cancagua Spa & Retreat Center" />
      <meta property="og:locale" content="es_CL" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
