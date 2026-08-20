export type CartModule = "biopools" | "sauna" | "massages" | "regular_classes";

/** La pasarela se decide por el contenido completo, nunca por la landing actual. */
export function paymentGatewayForModules(modules: CartModule[]): "getnet" | "transbank" {
  return modules.some(module => module === "biopools" || module === "sauna")
    ? "transbank"
    : "getnet";
}
