import { Suspense } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { getArticleBySlug } from '@/lib/blog-articles';
import { Link } from 'wouter';

export default function Page() {
  const pageContext = usePageContext();
  const slug = pageContext.routeParams?.slug as string;
  const article = getArticleBySlug(slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-[#2d3e2f] mb-4">
            Artículo no encontrado
          </h1>
          <p className="text-gray-600 mb-8">
            El artículo que buscas no existe o ha sido movido.
          </p>
          <Link href="/blog">
            <button className="px-6 py-3 bg-[#2d3e2f] text-white rounded-lg hover:bg-[#1a2a1c] transition-colors">
              Volver al Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const ArticleComponent = article.component;

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#faf8f5]">
        <div className="animate-pulse text-[#2d3e2f]">Cargando artículo...</div>
      </div>
    }>
      <ArticleComponent />
    </Suspense>
  );
}
