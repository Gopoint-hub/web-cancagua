import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Sauna Nativo frente al Lago Llanquihue | Cancagua",
    description: "Reserva online una sesión de 60 minutos en el Sauna Nativo de Cancagua. Elige fecha y horario entre 10:00 y 20:00, combina con Biopiscinas y paga con Transbank.",
    keywords: "sauna frutillar, sauna nativa chile, baño finlandés lago llanquihue, spa sauna puerto varas",
    canonical: "/servicios/sauna",
    image: "https://cancagua.cl/images/reels/sauna-nativo.jpg",
  };

  const serviceSchema = generateServiceSchema({
    name: "Sauna Nativo Cancagua",
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
