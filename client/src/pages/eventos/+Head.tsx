import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Eventos Corporativos y Sociales | Cancagua",
    description: "Transforma a tu equipo con experiencias de wellness corporativo que nutren el cuerpo y el espíritu en armonía con la naturaleza. Retiros corporativos únicos que fortalecen vínculos y reducen el estrés.",
    keywords: "eventos corporativos bienestar, retiro empresarial, eventos empresariales frutillar, retiros corporativos chile, celebraciones lago llanquihue",
    canonical: "/eventos",
    image: "https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309226/cancagua/images/navega-relax-header.jpg",
  };

  const serviceSchema = generateServiceSchema({
    name: "Eventos Corporativos y Sociales Cancagua",
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
