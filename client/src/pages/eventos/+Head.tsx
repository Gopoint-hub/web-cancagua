import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Eventos Corporativos y Sociales en Frutillar | Cancagua",
    description: "Organiza tu evento empresarial, celebración o retiro en nuestro spa con vista al lago. Espacios únicos, catering saludable y experiencias personalizadas.",
    keywords: "eventos empresariales frutillar, retiros corporativos chile, celebraciones lago llanquihue, eventos spa puerto varas",
    canonical: "/eventos",
    image: "https://cancagua.cl/images/navega-relax-header.jpg",
  };

  const serviceSchema = generateServiceSchema({
    name: "Eventos Corporativos y Sociales",
    description: "Eventos empresariales, celebraciones y retiros en un spa único con vista al lago. Espacios personalizados y catering saludable.",
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
