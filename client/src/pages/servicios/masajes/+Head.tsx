import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Masajes y Terapias en Frutillar - Relajación y Bienestar | Cancagua",
    description: "Masajes descontracturantes, piedras calientes, drenaje linfático y terapias holísticas. Profesionales certificados en ambiente natural. Reserva tu sesión de relajación.",
    keywords: "masajes frutillar, terapias holísticas chile, masajes descontracturantes, piedras calientes, spa masajes lago llanquihue",
    canonical: "/servicios/masajes",
    image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1769558778/cancagua/images/masajes-hero.jpg",
  };

  const serviceSchema = generateServiceSchema({
    name: "Masajes y Terapias",
    description: "Masajes de relajación, descontracturantes, piedras calientes, drenaje linfático y terapias holísticas en ambiente natural.",
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
