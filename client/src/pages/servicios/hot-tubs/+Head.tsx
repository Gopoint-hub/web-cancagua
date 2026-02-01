import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Hot Tubs - Cancagua",
    description: "Disfruta de Hot Tubs privados en Frutillar con vista al bosque y la bahía. Agua a 40-41º, terrazas exclusivas y 4 horas de relajo total. Niños menores de 12 años gratis. ¡Reserva tu espacio aquí!",
    keywords: "hot tubs frutillar, spa aire libre chile, termas privadas lago llanquihue, hot tub puerto varas, spa geotérmico frutillar",
    canonical: "/servicios/hot-tubs",
    image: "https://cancagua.cl/images/11_hottub-service.webp",
  };

  const serviceSchema = generateServiceSchema({
    name: "Hot Tubs Privados Cancagua",
    description: seoData.description,
    image: seoData.image,
  });

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

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </>
  );
}
