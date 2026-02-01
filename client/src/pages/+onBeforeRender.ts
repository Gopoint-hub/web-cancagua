import { createSSRTRPCClient } from '@/lib/trpc-ssr';
import type { OnBeforeRenderAsync } from 'vike/types';

export const onBeforeRender: OnBeforeRenderAsync = async (pageContext) => {
  const { urlOriginal, headersOriginal } = pageContext;

  // Detectar idioma del request desde el header Accept-Language
  const acceptLanguage = headersOriginal?.['accept-language'] || 'es';
  const initialLanguage = acceptLanguage.split(',')[0].split('-')[0] || 'es';

  // Crear base URL para tRPC SSR
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = headersOriginal?.host || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;
  const cookies = headersOriginal?.cookie;

  // Crear cliente tRPC para SSR
  const trpcSSR = createSSRTRPCClient(baseUrl, cookies);

  return {
    pageContext: {
      pageProps: {
        // Props que se pasan a todas las páginas
      },
      initialLanguage, // Para i18n
      trpcSSR, // Cliente tRPC disponible en páginas
    },
  };
};
