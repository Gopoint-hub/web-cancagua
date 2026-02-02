import type { PageContext } from 'vike/types';
import { getArticleBySlug } from '@/lib/blog-articles';

export function title(pageContext: PageContext) {
  const slug = pageContext.routeParams?.slug as string;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    return 'Artículo no encontrado - Cancagua';
  }
  
  return article.seoTitle;
}
