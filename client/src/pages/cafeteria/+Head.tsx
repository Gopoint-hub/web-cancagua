import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Cafetería en Frutillar | Brunch, almuerzo y café - Cancagua",
    description: "Cafetería frente al Lago Llanquihue, en Frutillar. Desayuno y brunch todo el día, pizzas artesanales, sándwiches, ensaladas y tablas para compartir, con productos de productores del sur. Opciones veganas, keto y sin gluten. Puedes venir solo a la cafetería, sin entrada.",
    keywords: "cafetería frutillar, donde almorzar en frutillar, brunch frutillar, pizza frutillar, cafetería saludable frutillar, opciones veganas frutillar, cafe especialidad lago llanquihue",
    canonical: "/cafeteria",
    image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg",
  };

  const serviceSchema = generateServiceSchema({
    name: "Cafetería Saludable Cancagua",
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
