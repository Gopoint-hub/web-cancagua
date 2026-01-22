import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  keywords?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function SEOHead({
  title,
  description,
  canonical,
  image = '/images/og-image.jpg',
  type = 'website',
  noindex = false,
  keywords,
  publishedTime,
  modifiedTime,
  author = 'Cancagua Spa & Retreat Center'
}: SEOHeadProps) {
  const fullTitle = title.includes('Cancagua') ? title : `${title} | Cancagua Spa`;
  const baseUrl = 'https://cancagua.cl';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullImage = image.startsWith('http') ? image : `${baseUrl}${image}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper to update or create link tag
    const updateLink = (rel: string, href: string) => {
      let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
    };

    // Basic SEO
    updateMeta('description', description);
    updateMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    if (keywords) updateMeta('keywords', keywords);
    updateMeta('author', author);

    // Canonical
    updateLink('canonical', fullCanonical);

    // Open Graph
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', fullCanonical, true);
    updateMeta('og:image', fullImage, true);
    updateMeta('og:type', type, true);

    // Twitter Card
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', fullImage);

    // Article specific
    if (type === 'article') {
      if (publishedTime) updateMeta('article:published_time', publishedTime, true);
      if (modifiedTime) updateMeta('article:modified_time', modifiedTime, true);
      updateMeta('article:author', author, true);
    }

  }, [fullTitle, description, fullCanonical, fullImage, type, noindex, keywords, publishedTime, modifiedTime, author]);

  return null;
}

export default SEOHead;
