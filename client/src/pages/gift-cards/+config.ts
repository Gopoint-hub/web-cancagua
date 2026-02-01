import type { Config } from 'vike/types';

export default {
  // Deshabilitar SSR para Gift Cards
  // Es una página transaccional que requiere integración con WebPay
  // y funciona mejor como SPA interactivo
  ssr: false,
} satisfies Config;
