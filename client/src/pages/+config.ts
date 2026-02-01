import type { Config } from 'vike/types';
import vikeReact from 'vike-react/config';

export default {
  // Usar la integración oficial de Vike con React
  extends: [vikeReact],

  // Configuración global - datos que se pasan del servidor al cliente
  passToClient: [
    'pageProps',
    'urlPathname',
    'urlParsed',
    'trpcState', // Para pasar estado de tRPC desde servidor
    'initialLanguage', // Para i18n
  ],

  // Nota: title y description se definen en cada página via +title.ts y +Head.tsx
  // para permitir SEO específico por página

  // Habilitar SSR por defecto para todas las páginas
  ssr: true,
} satisfies Config;
