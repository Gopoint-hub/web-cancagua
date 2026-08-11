import { MENU_SECTIONS } from "./menuData";

export default function Head() {
  const seoData = {
    title: "Menú Hot Tubs | Carta y precios — Cancagua Spa, Frutillar",
    description:
      "Carta exclusiva para los hot tubs de Cancagua: tablas de picoteo, vinos, cervezas artesanales, kombucha, jugos naturales y sours, con precios y preorden.",
    keywords:
      "carta hot tubs cancagua, menu tinajas frutillar, tablas de picoteo frutillar, precios cafeteria cancagua",
    canonical: "/cartahottubs",
    image:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309079/cancagua/images/11_hottub-service.webp",
  };

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
    hasMenuSection: MENU_SECTIONS.map(section => ({
      "@type": "MenuSection",
      name: section.titulo,
      hasMenuItem: section.items.map(item => ({
        "@type": "MenuItem",
        name: item.nombre,
        ...(item.descripcion ? { description: item.descripcion } : {}),
        ...(item.aptoVegano
          ? { suitableForDiet: "https://schema.org/VeganDiet" }
          : {}),
        offers: {
          "@type": "Offer",
          price: String(item.precio),
          priceCurrency: "CLP",
        },
      })),
    })),
  };

  return (
    <>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <link rel="canonical" href={`https://cancagua.cl${seoData.canonical}`} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:url" content={`https://cancagua.cl${seoData.canonical}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Cancagua Spa & Retreat Center" />
      <meta property="og:locale" content="es_CL" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />
      <script type="application/ld+json">{JSON.stringify(menuSchema)}</script>
    </>
  );
}
