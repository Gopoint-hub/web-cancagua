export type MassageAnalyticsItem = {
  item_id: string;
  item_name: string;
  item_category: "Masajes";
  item_variant: string;
  price: number;
  quantity: number;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function getMassageCheckoutId(): string {
  if (typeof window === "undefined") return "";
  return typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function getGaClientId(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("_ga="))
    ?.split("=")
    .slice(1)
    .join("=");
  if (!cookie) return undefined;
  const match = decodeURIComponent(cookie).match(/^GA\d+\.\d+\.(.+)$/);
  return match?.[1];
}

export function getGaSessionId(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("_ga_Z39NWW3H26="))
    ?.split("=")
    .slice(1)
    .join("=");
  if (!cookie) return undefined;
  const decoded = decodeURIComponent(cookie);
  return decoded.match(/(?:^|[.$])s(\d+)/)?.[1]
    ?? decoded.match(/^GS\d+\.\d+\.(\d+)/)?.[1];
}

export function pushMassageEvent(
  event: string,
  ecommerce?: Record<string, unknown>,
  parameters: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  if (ecommerce) window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push({
    event,
    ...parameters,
    ...(ecommerce ? { ecommerce } : {}),
  });
}

export function toAnalyticsItem(item: {
  techniqueId: number;
  techniqueName: string;
  duration: number;
  price: number;
  quantity?: number;
}): MassageAnalyticsItem {
  return {
    item_id: String(item.techniqueId),
    item_name: item.techniqueName,
    item_category: "Masajes",
    item_variant: `${item.duration} min`,
    price: item.price,
    quantity: item.quantity ?? 1,
  };
}

export function persistCheckoutStart(payload: {
  checkoutId: string;
  items: MassageAnalyticsItem[];
  coupon?: string;
  originalTotal: number;
  discountTotal: number;
  finalTotal: number;
}): void {
  void fetch("https://cms.cancagua.cl/api/public/masajes/checkout/start", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      ...payload,
      currency: "CLP",
      gaClientId: getGaClientId(),
      gaSessionId: getGaSessionId(),
    }),
  }).catch((error) => console.warn("[Masajes Analytics] No se pudo persistir el checkout:", error));
}
