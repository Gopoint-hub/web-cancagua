import type { Config } from "vike/types";

export default {
  // El formulario sigue siendo interactivo en el cliente, pero el contenido
  // principal (incluido el H1) debe existir en el HTML inicial para que la
  // página sea accesible e indexable sin ejecutar JavaScript.
  ssr: true,
} satisfies Config;
