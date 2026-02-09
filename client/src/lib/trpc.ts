/**
 * Cliente tRPC para el frontend.
 *
 * Nota: El tipo AppRouter se importa desde el paquete compartido del CMS.
 * Como el servidor ya no vive en este repo, usamos `any` como tipo temporal.
 * En el futuro, se puede publicar el tipo AppRouter como un paquete npm
 * o importarlo desde un directorio shared.
 *
 * La URL del endpoint se configura en +Layout.tsx via VITE_API_BASE_URL.
 */
import { createTRPCReact } from "@trpc/react-query";

// TODO: Importar el tipo AppRouter desde el CMS cuando esté disponible como paquete
// import type { AppRouter } from "@cancagua/cms-types";
export const trpc = createTRPCReact<any>();
