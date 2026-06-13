import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Biopiscinas Geotermales en Frutillar | Cancagua",
    description: "Reserva biopiscinas geotermales en Frutillar: agua natural a 37-40°C, sin cloro, vista al Lago Llanquihue y alternativa a termas cerca de Puerto Varas.",
    keywords: "biopiscinas geotermales frutillar, biopiscinas cancagua, termas frutillar, termas cerca de frutillar, bio piscinas geotermales, aguas termales lago llanquihue, biopiscinas puerto varas",
    canonical: "/servicios/biopiscinas",
    image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp",
  };

  const serviceSchema = generateServiceSchema({
    name: "Biopiscinas Geotermales Cancagua",
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
