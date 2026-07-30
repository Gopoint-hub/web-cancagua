import { FAQS } from "@/lib/faqs";

export default function Head() {
  const seoData = {
    title: "Preguntas Frecuentes | Cancagua Spa & Retreat Center",
    description:
      "Valores, horarios, reservas, qué incluye cada servicio y cómo funciona Cancagua. Biopiscinas desde $36.000, hot tubs privados desde $80.000 y masajes desde $45.000 en Frutillar.",
    keywords:
      "precios cancagua, valores biopiscinas frutillar, horario cancagua, hot tub precio frutillar, preguntas frecuentes spa frutillar",
    canonical: "/preguntas-frecuentes",
    image:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://cancagua.cl/preguntas-frecuentes#faq",
    mainEntity: FAQS.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

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

      {/* Schema.org FAQPage */}
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </>
  );
}
