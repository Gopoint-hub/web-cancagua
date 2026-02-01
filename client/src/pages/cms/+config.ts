import type { Config } from 'vike/types';
import vikeReact from 'vike-react/config';

export default {
  // Extender vike-react pero NO heredar el layout global
  extends: [vikeReact],

  // Deshabilitar SSR para todas las rutas bajo /cms/
  // El CMS requiere autenticación y funciona mejor como SPA
  ssr: false,
} satisfies Config;
