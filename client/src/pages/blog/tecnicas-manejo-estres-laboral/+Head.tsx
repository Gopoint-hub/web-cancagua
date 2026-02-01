export default function Head() {
  const seoData = {
    title: "Manejo del Estrés Laboral: Técnicas Probadas por la Ciencia | Cancagua",
    description: "Descubre técnicas científicamente probadas para manejar el estrés laboral. Estrategias de neurociencia, mindfulness y bienestar para reducir la ansiedad en el trabajo.",
    keywords: "manejo estres laboral, tecnicas estres trabajo, reducir ansiedad laboral, mindfulness trabajo, bienestar laboral, burnout prevencion",
    canonical: "/blog/tecnicas-manejo-estres-laboral",
    image: "https://cancagua.cl/images/blog/manejo-estres-laboral-hero.webp",
    author: "Mario Hermosilla",
    datePublished: "2025-11-12",
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": seoData.title,
    "description": seoData.description,
    "image": seoData.image,
    "author": {
      "@type": "Person",
      "name": seoData.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Cancagua Spa & Retreat Center",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cancagua.cl/images/logo-cancagua.png"
      }
    },
    "datePublished": seoData.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://cancagua.cl${seoData.canonical}`
    }
  };

  return (
    <>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords} />
      <meta name="author" content={seoData.author} />
      <link rel="canonical" href={`https://cancagua.cl${seoData.canonical}`} />

      {/* Open Graph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:url" content={`https://cancagua.cl${seoData.canonical}`} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Cancagua Spa & Retreat Center" />
      <meta property="og:locale" content="es_CL" />
      <meta property="article:published_time" content={seoData.datePublished} />
      <meta property="article:author" content={seoData.author} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />

      {/* Schema.org Article */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </>
  );
}
