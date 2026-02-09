import { createTRPCClient, httpBatchLink } from '@trpc/client';
import superjson from 'superjson';

// URL de la API del CMS
const CMS_API_URL = process.env.VITE_API_BASE_URL || "https://cms.cancagua.cl";

/**
 * Cliente tRPC para usar en SSR (servidor)
 *
 * Apunta directamente al CMS para obtener datos durante el server-side rendering.
 *
 * @param cookies - Cookies del request original (opcional)
 * @returns Cliente tRPC configurado para SSR
 */
export function createSSRTRPCClient(cookies?: string) {
  return createTRPCClient<any>({
    links: [
      httpBatchLink({
        url: `${CMS_API_URL}/api/trpc`,
        transformer: superjson,
        headers() {
          return {
            cookie: cookies || '',
          };
        },
      }),
    ],
  });
}
