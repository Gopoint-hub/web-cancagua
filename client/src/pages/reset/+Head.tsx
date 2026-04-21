export default function Head() {
  return (
    <>
      <meta
        name="description"
        content="Comienza o finaliza tu día con una pausa consciente en Cancagua. Disfruta de nuestras Biopiscinas Geotermales y alimentación nutritiva (desayuno o cena). Reserva tu experiencia Reset hoy."
      />
      <meta
        name="keywords"
        content="Cancagua, spa, biopiscinas, relajación, desayuno nutritivo, cena saludable, pausa consciente, bienestar, masaje, Puerto Varas, Frutillar"
      />
      <meta property="og:title" content="Reset: Pausa Consciente | Cancagua Spa" />
      <meta
        property="og:description"
        content="Conecta con la naturaleza en nuestras Biopiscinas Geotermales. Elige Morning o Sunset Reset y complementa tu relajo con alimentación nutritiva."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.cancagua.cl/reset" />
      <meta name="twitter:card" content="summary_large_image" />
      
      {/* AEO / Schema Markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          "name": "Experiencia Reset - Pausa Consciente",
          "description": "Programa de bienestar que incluye acceso a Biopiscinas Geotermales por 2 horas, opción de desayuno o cena nutritiva, y masajes opcionales.",
          "brand": {
            "@type": "Brand",
            "name": "Cancagua"
          },
          "offers": {
            "@type": "Offer",
            "url": "https://reservas.cancagua.cl/cancaguaspa/s/9dafaba2-53b4-4eb3-838f-39b2168827fa",
            "availability": "https://schema.org/InStock"
          }
        })}
      </script>
    </>
  );
}
