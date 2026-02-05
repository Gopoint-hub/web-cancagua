import { useEffect, useRef } from 'react';
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
  const previousPathRef = useRef<string | null>(null);

  useEffect(() => {
    // Solo actualizar si el pathname realmente cambió
    if (previousPathRef.current === pathname) {
      return;
    }
    
    previousPathRef.current = pathname;
    
    // Obtener datos SEO para la ruta actual
    const seoData = getSEOForPath(pathname);
    const fullCanonical = `https://cancagua.cl${pathname}`;
    const fullImage = seoData.image || 'https://cancagua.clhttps://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg';

    // Función para actualizar o crear un meta tag único
    const updateOrCreateMeta = (name: string, content: string, isProperty: boolean = false) => {
      const attr = isProperty ? 'property' : 'name';
      const selector = `meta[${attr}="${name}"]`;
      
      // Eliminar todos los duplicados primero
      const existingElements = document.querySelectorAll(selector);
      existingElements.forEach((el, index) => {
        if (index > 0) {
          el.remove();
        }
      });
      
      // Actualizar el primero o crear uno nuevo
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (element) {
        element.content = content;
      } else {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.name = name;
        }
        element.content = content;
        document.head.appendChild(element);
      }
    };

    // Función para actualizar o crear link canonical
    const updateOrCreateCanonical = (href: string) => {
      const selector = 'link[rel="canonical"]';
      
      // Eliminar todos los duplicados primero
      const existingElements = document.querySelectorAll(selector);
      existingElements.forEach((el, index) => {
        if (index > 0) {
          el.remove();
        }
      });
      
      // Actualizar el primero o crear uno nuevo
      let element = document.querySelector(selector) as HTMLLinkElement | null;
      if (element) {
        element.href = href;
      } else {
        element = document.createElement('link');
        element.rel = 'canonical';
        element.href = href;
        document.head.appendChild(element);
      }
    };

    // Actualizar title
    document.title = seoData.title;

    // Actualizar meta tags básicos
    updateOrCreateMeta('description', seoData.description);
    if (seoData.keywords) {
      updateOrCreateMeta('keywords', seoData.keywords);
    }

    // Actualizar canonical
    updateOrCreateCanonical(fullCanonical);

    // Actualizar Open Graph tags
    updateOrCreateMeta('og:title', seoData.title, true);
    updateOrCreateMeta('og:description', seoData.description, true);
    updateOrCreateMeta('og:url', fullCanonical, true);
    updateOrCreateMeta('og:image', fullImage, true);
    updateOrCreateMeta('og:type', seoData.type || 'website', true);

    // Actualizar Twitter Card tags
    updateOrCreateMeta('twitter:title', seoData.title);
    updateOrCreateMeta('twitter:description', seoData.description);
    updateOrCreateMeta('twitter:image', fullImage);

    // Log para debugging (remover en producción si es necesario)
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('[DynamicHead] Updated meta tags for:', pathname, seoData.title);
    }

  }, [pathname]);

  // Este componente no renderiza nada visible
  return null;
}

export default DynamicHead;
