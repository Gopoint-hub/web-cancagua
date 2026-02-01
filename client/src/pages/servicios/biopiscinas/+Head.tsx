import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Biopiscinas Geotermales - Las Primeras del Mundo | Cancagua Spa",
    description: "Disfruta de las primeras biopiscinas geotermales del mundo a 37º-40º. Agua purificada naturalmente sin químicos. 4 horas de experiencia única en Frutillar, Chile.",
    keywords: "biopiscinas geotermales, termas frutillar, spa chile, aguas termales, biopiscina, termas naturales, spa lago llanquihue",
    canonical: "/servicios/biopiscinas",
    image: "https://cancagua.cl/images/fullday-biopiscinas-hero.jpg",
  };

  const serviceSchema = generateServiceSchema({
    name: "Biopiscinas Geotermales",
    description: "Las primeras biopiscinas geotermales del mundo. Agua a 37°-40° purificada naturalmente sin químicos.",
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
