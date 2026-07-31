import { useEffect } from 'react';

/** Carga Umami solo cuando sus variables están configuradas.
 * GTM se carga una única vez desde client/index.html.
 */
export function Analytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

    if (analyticsEndpoint && websiteId) {
      const umamiScript = document.createElement('script');
      umamiScript.defer = true;
      umamiScript.src = `${analyticsEndpoint.replace(/\/$/, '')}/umami`;
      umamiScript.setAttribute('data-website-id', websiteId);
      umamiScript.dataset.cancaguaAnalytics = 'umami';
      document.head.appendChild(umamiScript);
      return () => umamiScript.remove();
    }
  }, []);

  return null; // Este componente no renderiza nada
}
