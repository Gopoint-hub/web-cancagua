export default function Head() {
  const seoData = {
    title: "Gift Cards - Regala Bienestar | Cancagua",
    description:
      "Regala bienestar con nuestras gift cards de Cancagua Spa. Opciones para biopiscinas, hot tubs, masajes y más. Válidas por 3 meses, entrega inmediata por email. El regalo perfecto.",
    keywords:
      "gift card spa, regalo spa chile, tarjeta regalo cancagua, regalar bienestar, spa frutillar regalo, giftcard biopiscinas, giftcard hot tub, giftcard masajes",
    canonical: "/gift-cards",
    image:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp",
  };

  const canonical = `https://cancagua.cl${seoData.canonical}`;
  const giftCardSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: seoData.title,
        description: seoData.description,
        inLanguage: "es-CL",
        mainEntity: { "@id": `${canonical}#gift-card` },
      },
      {
        "@type": "Product",
        "@id": `${canonical}#gift-card`,
        name: "Gift Cards Cancagua",
        description: seoData.description,
        image: seoData.image,
        url: canonical,
        category: "Tarjeta de regalo de bienestar",
        brand: {
          "@type": "Brand",
          name: "Cancagua",
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Vigencia",
            value: "3 meses desde la compra",
          },
          {
            "@type": "PropertyValue",
            name: "Entrega",
            value: "Inmediata por email",
          },
          {
            "@type": "PropertyValue",
            name: "Uso",
            value: "Servicios de Cancagua Spa & Retreat Center",
          },
        ],
      },
    ],
  };

  return (
    <>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:url" content={canonical} />
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
        {JSON.stringify(giftCardSchema)}
      </script>
    </>
  );
}
