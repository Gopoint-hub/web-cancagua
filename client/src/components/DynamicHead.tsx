import { useEffect } from 'react';
import { usePageContext } from 'vike-react/usePageContext';
import { getSEOForPath } from '@/lib/seo-config';

/**
 * Componente que actualiza dinámicamente los meta tags del <head>
 * durante la navegación client-side.
 * 
 * En Vike, el +Head.tsx solo se renderiza en el servidor para la primera página.
 * Este componente usa useEffect para actualizar los meta tags cuando el usuario
 * navega entre páginas sin recargar.
 */
export function DynamicHead() {
  const pageContext = usePageContext();
  const pathname = pageContext.urlPathname;
  const seoData = getSEOForPath(pathname);
  
  const fullCanonical = `https://cancagua.cl${pathname}`;
  const fullImage = seoData.image || 'https://cancagua.cl/images/10_cancagua-header.jpg';

  useEffect(() => {
    // Actualizar title
    document.title = seoData.title;

    // Función helper para actualizar o crear meta tags
    const updateMetaTag = (selector: string, content: string, attribute: string = 'content') => {
      let element = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (element) {
        if (attribute === 'href') {
          (element as HTMLLinkElement).href = content;
        } else {
          (element as HTMLMetaElement).content = content;
        }
      } else {
        // Crear el elemento si no existe
        if (selector.startsWith('link')) {
          element = document.createElement('link');
          const relMatch = selector.match(/rel="([^"]+)"/);
          if (relMatch) {
            (element as HTMLLinkElement).rel = relMatch[1];
          }
          (element as HTMLLinkElement).href = content;
        } else {
          element = document.createElement('meta');
          const nameMatch = selector.match(/name="([^"]+)"/);
          const propertyMatch = selector.match(/property="([^"]+)"/);
          if (nameMatch) {
            (element as HTMLMetaElement).name = nameMatch[1];
          } else if (propertyMatch) {
            (element as HTMLMetaElement).setAttribute('property', propertyMatch[1]);
          }
          (element as HTMLMetaElement).content = content;
        }
        document.head.appendChild(element);
      }
    };

    // Actualizar meta description
    updateMetaTag('meta[name="description"]', seoData.description);

    // Actualizar canonical
    updateMetaTag('link[rel="canonical"]', fullCanonical, 'href');

    // Actualizar keywords si se proporcionan
    if (seoData.keywords) {
      updateMetaTag('meta[name="keywords"]', seoData.keywords);
    }

    // Actualizar Open Graph tags
    updateMetaTag('meta[property="og:title"]', seoData.title);
    updateMetaTag('meta[property="og:description"]', seoData.description);
    updateMetaTag('meta[property="og:url"]', fullCanonical);
    updateMetaTag('meta[property="og:image"]', fullImage);
    updateMetaTag('meta[property="og:type"]', seoData.type || 'website');

    // Actualizar Twitter Card tags
    updateMetaTag('meta[name="twitter:title"]', seoData.title);
    updateMetaTag('meta[name="twitter:description"]', seoData.description);
    updateMetaTag('meta[name="twitter:image"]', fullImage);

  }, [pathname, seoData, fullCanonical, fullImage]);

  // Este componente no renderiza nada visible
  return null;
}

export default DynamicHead;
