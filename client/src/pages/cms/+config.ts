import type { Config } from 'vike/types';

export default {
  // Deshabilitar SSR para todas las rutas bajo /cms/
  // El CMS requiere autenticación y funciona mejor como SPA
  ssr: false,
} satisfies Config;
