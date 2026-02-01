import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Cafetería Saludable en Frutillar - Alimentación Consciente | Cancagua",
    description: "Alimentación saludable y consciente con productos locales de la cuenca Lago Llanquihue. Opciones veganas, sin gluten y sin lactosa. Café de especialidad.",
    keywords: "cafeteria saludable frutillar, comida vegana chile, cafe especialidad lago llanquihue, alimentacion consciente puerto varas",
    canonical: "/cafeteria",
    image: "https://cancagua.cl/images/10_cancagua-header.jpg",
  };

  const serviceSchema = generateServiceSchema({
    name: "Cafetería Saludable",
    description: "Alimentación consciente con productos locales de la cuenca Lago Llanquihue. Opciones veganas, vegetarianas, sin gluten, sin lactosa y keto. Café de especialidad. Vista panorámica al lago.",
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
