import { usePageContext } from "vike-react/usePageContext";
import { getArticleBySlug } from "@/lib/blog-articles";
import { generateBlogPostSchema } from "@/lib/seo-helpers";

export function Head() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams?.slug as string;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <>
        <title>Artículo no encontrado - Cancagua</title>
        <meta name="robots" content="noindex" />
      </>
    );
  }

  const canonical = `https://cancagua.cl/blog/${article.slug}`;
  const imageUrl = article.image
    ? article.image.startsWith("http")
      ? article.image
      : `https://cancagua.cl${article.image}`
    : undefined;
  const keywords = article.keywords.join(", ");

  // Los articulos son lo que un motor de IA cita cuando responde una consulta.
  // Sin BlogPosting quedaban como texto suelto, sin autor ni fecha verificable.
  const blogPostSchema = {
    ...generateBlogPostSchema({
      title: article.seoTitle,
      excerpt: article.seoDescription,
      image: imageUrl,
      publishedAt: article.dateISO,
      author: article.author,
    }),
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: "Cancagua Spa & Retreat Center",
      url: "https://cancagua.cl",
    },
  };

  return (
    <>
      <title>{article.seoTitle}</title>
      <meta name="description" content={article.seoDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={article.seoTitle} />
      <meta property="og:description" content={article.seoDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="article" />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta property="og:site_name" content="Cancagua Spa & Retreat Center" />
      <meta property="article:published_time" content={article.dateISO} />
      <meta property="article:author" content={article.author} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={article.seoTitle} />
      <meta name="twitter:description" content={article.seoDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      {/* Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify(blogPostSchema)}
      </script>
    </>
  );
}
