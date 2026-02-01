import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Sauna Nativa en Frutillar - Experiencia de Bienestar | Cancagua",
    description: "Sauna tradicional con vista al bosque nativo. Calor terapéutico, relajación profunda y renovación. Combina con nuestras biopiscinas y hot tubs.",
    keywords: "sauna frutillar, sauna nativa chile, baño finlandés lago llanquihue, spa sauna puerto varas",
    canonical: "/servicios/sauna",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/sauna-nativo-hero.png",
  };

  const serviceSchema = generateServiceSchema({
    name: "Sauna Nativa",
    description: "Sauna tradicional con vista al bosque nativo. Calor terapéutico, relajación profunda y renovación a orillas del Lago Llanquihue.",
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
