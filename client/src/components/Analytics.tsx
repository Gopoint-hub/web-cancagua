import { useEffect } from 'react';

/**
 * Componente Analytics para cargar GTM y Umami solo en el cliente
 * Evita problemas de SSR con scripts de terceros
 */
export function Analytics() {
  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;

    // Google Tag Manager
    const gtmScript = document.createElement('script');
    gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-NNGGT92W');
    `;
    document.head.appendChild(gtmScript);

    // Umami Analytics (si está configurado)
    const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
    const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

    if (analyticsEndpoint && websiteId) {
      const umamiScript = document.createElement('script');
      umamiScript.defer = true;
      umamiScript.src = `${analyticsEndpoint}/umami`;
      umamiScript.setAttribute('data-website-id', websiteId);
      document.head.appendChild(umamiScript);
    }
  }, []);

  return null; // Este componente no renderiza nada
}
