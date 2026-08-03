import { FAQS_EVENTOS } from "@/lib/faqs-eventos";

export default function Head() {
  const seoData = {
    title: "Eventos para Empresas en Frutillar | Cancagua",
    description:
      "Eventos corporativos y team building en Cancagua, Frutillar. Hasta 30 personas, biopiscinas geotermales desde $36.000 por persona, hot tubs privados y masajes. Cotización en menos de 24 horas.",
    keywords:
      "eventos para empresas, eventos empresariales frutillar, evento corporativo sur de chile, team building lago llanquihue, retiros corporativos frutillar",
    canonical: "/eventos/empresas",
    image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309165/cancagua/images/eventos-empresas-hero.jpg",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://cancagua.cl/eventos/empresas#faq",
    mainEntity: FAQS_EVENTOS.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://cancagua.cl/eventos/empresas#service",
    name: "Eventos corporativos y team building en Cancagua",
    serviceType: "Eventos para empresas",
    description: seoData.description,
    image: seoData.image,
    url: `https://cancagua.cl${seoData.canonical}`,
    areaServed: {
      "@type": "Place",
      name: "Frutillar, Región de Los Lagos, Chile",
    },
    provider: {
      "@type": "LocalBusiness",
      name: "Cancagua Spa & Retreat Center",
      telephone: "+56 9 4007 3999",
      email: "eventos@cancagua.cl",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Frutillar",
        addressRegion: "Los Lagos",
        addressCountry: "CL",
      },
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "CLP",
      price: "36000",
      description: "Biopiscinas geotermales, 4 horas de estadía por persona. Los programas corporativos se cotizan según el número de personas y los servicios incluidos.",
      availability: "https://schema.org/InStock",
    },
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

      {/* Schema.org */}
      <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </>
  );
}
