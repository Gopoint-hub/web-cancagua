import { generateServiceSchema } from '@/lib/seo-helpers';

export default function Head() {
  const seoData = {
    title: "Carta Cancagua - Menú Saludable y Consciente | Frutillar",
    description: "Descubre nuestra carta de alimentación saludable con productos locales. Opciones veganas, vegetarianas, sin gluten y sin lactosa. Bebidas naturales y café de especialidad.",
    keywords: "menu cancagua, carta saludable frutillar, comida healthy lago llanquihue, menu vegano chile",
    canonical: "/carta",
    image: "https://cancagua.cl/images/fullday-biopiscinas-hero.jpg",
  };

  const serviceSchema = generateServiceSchema({
    name: "Carta Cancagua",
    description: "Carta de alimentación saludable y consciente con productos locales, opciones veganas, vegetarianas, sin gluten y sin lactosa.",
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
