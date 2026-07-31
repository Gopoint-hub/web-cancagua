export type WellnessClassPlan = {
  id: number;
  code: string;
  name: string;
  priceClp: number;
  creditsPerPeriod: number;
  benefits?: string | null;
};

export type WellnessMassageItem = {
  key: string;
  techniqueId: number;
  techniqueName: string;
  duration: number;
  price: number;
  quantity: number;
};

export type WellnessCart = {
  classPlan: WellnessClassPlan | null;
  massages: WellnessMassageItem[];
};

const STORAGE_KEY = "cancagua-wellness-cart-v1";
const EMPTY_CART: WellnessCart = { classPlan: null, massages: [] };

export function readWellnessCart(): WellnessCart {
  if (typeof window === "undefined") return EMPTY_CART;
  try {
    const value = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<WellnessCart> | null;
    return {
      classPlan: value?.classPlan ?? null,
      massages: Array.isArray(value?.massages) ? value.massages : [],
    };
  } catch {
    return EMPTY_CART;
  }
}

export function writeWellnessCart(cart: WellnessCart): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new CustomEvent("cancagua:cart-updated", { detail: cart }));
}
