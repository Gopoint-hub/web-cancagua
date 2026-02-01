import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../../../server/routers';
import superjson from 'superjson';

/**
 * Cliente tRPC para usar en SSR (servidor)
 *
 * @param baseUrl - URL absoluta del servidor (ej: http://localhost:3000 o https://cancagua.cl)
 * @param cookies - Cookies del request original para mantener sesiones de autenticación
 * @returns Cliente tRPC configurado para SSR
 */
export function createSSRTRPCClient(baseUrl: string, cookies?: string) {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `${baseUrl}/api/trpc`,
        transformer: superjson,
        headers() {
          return {
            cookie: cookies || '', // Pasar cookies para autenticación
          };
        },
      }),
    ],
  });
}
