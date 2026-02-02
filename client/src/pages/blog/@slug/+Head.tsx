import { usePageContext } from 'vike-react/usePageContext';
import { getArticleBySlug } from '@/lib/blog-articles';

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
  const imageUrl = article.image.startsWith('http') 
    ? article.image 
    : `https://cancagua.cl${article.image}`;

  return (
    <>
      <title>{article.seoTitle}</title>
      <meta name="description" content={article.seoDescription} />
      <meta name="keywords" content={article.keywords} />
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={article.seoTitle} />
      <meta property="og:description" content={article.seoDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="Cancagua Spa & Retreat Center" />
      <meta property="article:published_time" content={article.dateISO} />
      <meta property="article:author" content={article.author} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={article.seoTitle} />
      <meta name="twitter:description" content={article.seoDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  );
}
