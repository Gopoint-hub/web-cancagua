import type { Config } from 'vike/types';

export default {
  // Deshabilitar SSR para la página de resultado de pago
  // Es una página transaccional que requiere integración con WebPay
  // y funciona mejor como SPA interactivo
  ssr: false,
} satisfies Config;
