export default function Head() {
  const title = "Biopiscinas Geotermales con Traslado desde Puerto Varas | Cancagua";
  const description = "Disfruta de las primeras biopiscinas geotermales del mundo con traslado incluido desde Puerto Varas. Salida desde Hotel Cabañas del Lago de martes a domingo a las 10:00 hrs. Reserva ahora.";
  const keywords = "biopiscinas puerto varas, termas con traslado, biopiscinas geotermales, cancagua frutillar, spa puerto varas, termas sur chile, traslado hotel cabañas del lago";
  const canonical = "https://cancagua.cl/servicios/biopiscinas-puerto-varas";
  const image = "https://cancagua.cl/images/fullday-biopiscinas-hero.jpg";

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
