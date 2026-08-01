export default function Head() {
  const seoData = {
    title: "Menú Hot Tubs | Carta y precios — Cancagua Spa, Frutillar",
    description:
      "Carta exclusiva para los hot tubs de Cancagua: tablas de picoteo, vinos, cervezas artesanales, kombucha, jugos naturales y sours, con precios.",
    keywords:
      "carta hot tubs cancagua, menu tinajas frutillar, tablas de picoteo frutillar, precios cafeteria cancagua",
    canonical: "/cartahottubs",
    image:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309079/cancagua/images/11_hottub-service.webp",
  };

  // Menu de schema.org: le dice a la IA que esto es una carta con precios, no
  // una pagina cualquiera. "cuales son los valores" es la consulta #1 en todos
  // los canales y hasta ahora no habia ni un precio publicado en la web.
  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "Menú exclusivo Hot Tubs",
    inLanguage: "es-CL",
    url: `https://cancagua.cl${seoData.canonical}`,
    provider: {
      "@type": "DaySpa",
      name: "Cancagua Spa & Retreat Center",
      url: "https://cancagua.cl",
      telephone: "+56 9 4007 3999",
    },
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Tablas",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Charcutería & Quesos (2 a 3 personas)",
            offers: { "@type": "Offer", price: "28000", priceCurrency: "CLP" },
          },
          {
            "@type": "MenuItem",
            name: "Charcutería & Quesos (4 a 6 personas)",
            offers: { "@type": "Offer", price: "38000", priceCurrency: "CLP" },
          },
          {
            "@type": "MenuItem",
            name: "Tabla de Niños (3 personas)",
            offers: { "@type": "Offer", price: "28000", priceCurrency: "CLP" },
          },
          {
            "@type": "MenuItem",
            name: "Tabla Otoño vegana (2 a 3 personas)",
            suitableForDiet: "https://schema.org/VeganDiet",
            offers: { "@type": "Offer", price: "28000", priceCurrency: "CLP" },
          },
          {
            "@type": "MenuItem",
            name: "Tabla Otoño vegana (4 a 6 personas)",
            suitableForDiet: "https://schema.org/VeganDiet",
            offers: { "@type": "Offer", price: "38000", priceCurrency: "CLP" },
          },
        ],
      },
      {
        "@type": "MenuSection",
        name: "Vinos y espumante",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Espumante Berla Extra Brut 750 cc",
            offers: { "@type": "Offer", price: "13000", priceCurrency: "CLP" },
          },
          {
            "@type": "MenuItem",
            name: "Vino Berla Chardonnay Moscatel 750 cc",
            offers: { "@type": "Offer", price: "12000", priceCurrency: "CLP" },
          },
          {
            "@type": "MenuItem",
            name: "Vino Berla Cinsault 750 cc",
            offers: { "@type": "Offer", price: "12000", priceCurrency: "CLP" },
          },
        ],
      },
      {
        "@type": "MenuSection",
        name: "Cervezas artesanales",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Cervezas Chester 473 cc",
            offers: { "@type": "Offer", price: "4000", priceCurrency: "CLP" },
          },
          {
            "@type": "MenuItem",
            name: "Cervezas Tropera 473 cc",
            offers: { "@type": "Offer", price: "4000", priceCurrency: "CLP" },
          },
        ],
      },
      {
        "@type": "MenuSection",
        name: "Bebestibles",
        hasMenuItem: [
          {
            "@type": "MenuItem",
            name: "Jugos naturales Rubén Avilés 300 cc",
            offers: { "@type": "Offer", price: "4000", priceCurrency: "CLP" },
          },
          {
            "@type": "MenuItem",
            name: "Kombucha La IDA 355 cc",
            offers: { "@type": "Offer", price: "4000", priceCurrency: "CLP" },
          },
          {
            "@type": "MenuItem",
            name: "Sour Catedral 330 cc",
            offers: { "@type": "Offer", price: "7900", priceCurrency: "CLP" },
          },
          {
            "@type": "MenuItem",
            name: "Aguas Puyehue 330 cc",
            offers: { "@type": "Offer", price: "3000", priceCurrency: "CLP" },
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
      <script type="application/ld+json">{JSON.stringify(menuSchema)}</script>
    </>
  );
}
