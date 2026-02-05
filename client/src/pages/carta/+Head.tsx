import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Carta - Menú Saludable | Cancagua",
    description: "Descubre nuestra carta de alimentación saludable con productos locales de la cuenca del Lago Llanquihue. Opciones veganas, vegetarianas, sin gluten, keto y sin lactosa. Bebidas naturales y café de especialidad.",
    keywords: "menu cancagua, carta saludable frutillar, comida healthy lago llanquihue, menu vegano chile, brunch frutillar",
    canonical: "/carta",
    image: "https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg",
  };

  const serviceSchema = generateServiceSchema({
    name: "Carta Cancagua",
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
