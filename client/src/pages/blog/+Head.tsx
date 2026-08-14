import { blogArticles } from "@/lib/blog-articles";

export default function Head() {
  const seoData = {
    title: "Blog de Bienestar | Cancagua Spa & Retreat Center",
    description:
      "Guías, consejos y experiencias sobre termas, bienestar y vida consciente en el sur de Chile. Descubre las mejores termas y experiencias naturales.",
    canonical: "https://cancagua.cl/blog",
    image:
      "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309133/cancagua/images/blog/termas-geometricas-hero.webp",
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${seoData.canonical}#blog`,
    url: seoData.canonical,
    name: seoData.title,
    description: seoData.description,
    image: seoData.image,
    inLanguage: "es-CL",
    publisher: {
      "@type": "Organization",
      "@id": "https://cancagua.cl/#organization",
      name: "Cancagua Spa & Retreat Center",
      url: "https://cancagua.cl/",
    },
    blogPost: blogArticles.map(article => ({
      "@type": "BlogPosting",
      "@id": `https://cancagua.cl/blog/${article.slug}#article`,
      url: `https://cancagua.cl/blog/${article.slug}`,
      headline: article.title,
      description: article.seoDescription,
      image: article.image,
      datePublished: article.dateISO,
      inLanguage: "es-CL",
      author: {
        "@type": "Organization",
        name: article.author,
      },
    })),
  };

  return (
    <>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta property="og:title" content="Blog de Bienestar | Cancagua" />
      <meta
        property="og:description"
        content="Guías, consejos y experiencias sobre termas, bienestar y vida consciente en el sur de Chile."
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:url" content={seoData.canonical} />
      <meta property="og:site_name" content="Cancagua Spa & Retreat Center" />
      <meta property="og:locale" content="es_CL" />
      <link rel="canonical" href={seoData.canonical} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />

      {/* Schema.org */}
      <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
    </>
  );
}
