import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Hot Tubs Privados en Frutillar - Spa al Aire Libre | Cancagua",
    description: "Disfruta de nuestros 6 hot tubs privados con vista al Lago Llanquihue. Agua geotérmica 40-41°C, 2.5 horas de relajación. Espacios privados con ducha y cambiadores. Reserva tu experiencia única.",
    keywords: "hot tubs frutillar, spa aire libre chile, termas privadas lago llanquihue, hot tub puerto varas, spa geotérmico frutillar, relajación termal chile",
    canonical: "/servicios/hot-tubs",
    image: "https://cancagua.cl/images/11_hottub-service.webp",
  };

  const serviceSchema = generateServiceSchema({
    name: "Hot Tubs Privados",
    description: "6 espacios privados de hot tubs con agua geotérmica a 40-41°C, vista al Lago Llanquihue y bosque nativo. Incluye 2.5 horas en el agua y acceso a cafetería.",
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
