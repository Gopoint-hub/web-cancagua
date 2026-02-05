import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Clases - Yoga, Fitness y Bienestar | Cancagua",
    description: "Hatha Yoga intenso y suave, entrenamiento funcional, danza infantil y más. Clases para todos los niveles con instructores certificados en entorno natural con vista al Lago Llanquihue.",
    keywords: "yoga frutillar, clases yoga chile, entrenamiento funcional, fitness lago llanquihue, clases bienestar puerto varas, aikido",
    canonical: "/clases",
    image: "https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309082/cancagua/images/12_yoga-clases.webp",
  };

  const serviceSchema = generateServiceSchema({
    name: "Clases Regulares Cancagua",
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
