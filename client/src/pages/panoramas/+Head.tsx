import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Panoramas y Talleres en Frutillar | Cancagua",
    description: "Descubre la agenda de agosto 2026 en Cancagua: Círculo de Mujeres, Concierto & Biopiscina, Sonoterapia y Encuentro de Inmersión en Frutillar.",
    keywords: "panoramas Cancagua, panoramas agosto Frutillar, sonoterapia Frutillar, concierto biopiscina, círculo de mujeres, inmersión Lago Llanquihue",
    canonical: "/panoramas",
    image: "https://cdn.skedu.com/skedu-v2/5d59ea78-5b85-4274-b771-5ca34e689061/cf46e105d6da465a984a26845d9c3166.png",
  };

  const serviceSchema = generateServiceSchema({
    name: "Panoramas y Talleres Cancagua",
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
