import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Clases Regulares en Frutillar - Yoga, Fitness y Bienestar | Cancagua",
    description: "Hatha Yoga, entrenamiento funcional, danza infantil y más. Clases para todos los niveles en entorno natural. Instructores certificados. Reserva tu clase.",
    keywords: "yoga frutillar, clases yoga chile, entrenamiento funcional, fitness lago llanquihue, clases bienestar puerto varas",
    canonical: "/clases",
    image: "https://cancagua.cl/images/12_yoga-clases.webp",
  };

  const serviceSchema = generateServiceSchema({
    name: "Clases Regulares",
    description: "Hatha Yoga intenso y suave, entrenamiento funcional, danza infantil. Clases para todos los niveles con instructores certificados en entorno natural con vista al Lago Llanquihue.",
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
