import { createContext, useCallback, useContext, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { CalendarDays, Clock, Dumbbell, LockKeyhole, ShoppingBag, Sparkles, Trash2, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { CustomerAcquisitionFields } from "@/components/CustomerAcquisitionFields";
import { EMPTY_CUSTOMER_ACQUISITION, normalizeCustomerAcquisition, validateCustomerAcquisition } from "@/lib/customerAcquisition";
import type { WellnessCart } from "@/lib/wellnessCart";
import { paymentGatewayForModules } from "@/lib/serviceCartRules";

const STORAGE_KEY = "cancagua-service-cart-v1";
const WELLNESS_STORAGE_KEY = "cancagua-wellness-cart-v1";

export type BiopoolCartItem = { module: "biopools"; serviceId: number; serviceName: string; bookingDate: string; startTime: string; endTime: string; adultQuantity: number; childQuantity: number; discountCode?: string; totalClp: number };
export type SaunaCartItem = { module: "sauna"; serviceId: number; serviceName: string; bookingDate: string; startTime: string; endTime: string; privateGuestCount?: number; discountCode?: string; guests: number; totalClp: number };
export type MassageCartItem = { module: "massages"; key: string; techniqueId: number; serviceName: string; duration: number; quantity: number; totalClp: number };
export type RegularClassCartItem = { module: "regular_classes"; planId: number; serviceName: string; code: string; creditsPerPeriod: number; totalClp: number };
export type ServiceCartItem = BiopoolCartItem | SaunaCartItem | MassageCartItem | RegularClassCartItem;

type ServiceCartContextValue = { items: ServiceCartItem[]; open: boolean; setOpen: (open: boolean) => void; addItem: (item: ServiceCartItem) => void; removeItem: (key: string) => void; clear: () => void };
const ServiceCartContext = createContext<ServiceCartContextValue | null>(null);

export function useServiceCart() {
  const value = useContext(ServiceCartContext);
  if (!value) throw new Error("useServiceCart debe usarse dentro de ServiceCartProvider");
  return value;
}

const wellnessItems = (cart: Partial<WellnessCart> | null | undefined): ServiceCartItem[] => [
  ...(cart?.classPlan ? [{ module: "regular_classes" as const, planId: cart.classPlan.id, serviceName: cart.classPlan.name, code: cart.classPlan.code, creditsPerPeriod: cart.classPlan.creditsPerPeriod, totalClp: cart.classPlan.priceClp }] : []),
  ...(Array.isArray(cart?.massages) ? cart.massages.map(item => ({ module: "massages" as const, key: item.key, techniqueId: item.techniqueId, serviceName: item.techniqueName, duration: item.duration, quantity: item.quantity, totalClp: item.price * item.quantity })) : []),
];

export function ServiceCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ServiceCartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
      const legacy = JSON.parse(window.localStorage.getItem(WELLNESS_STORAGE_KEY) ?? "null") as WellnessCart | null;
      const valid = Array.isArray(saved) ? saved.filter(item => ["biopools", "sauna", "massages", "regular_classes"].includes(item?.module)) : [];
      const fixed = valid.filter(item => item.module === "biopools" || item.module === "sauna");
      setItems([...fixed, ...(legacy ? wellnessItems(legacy) : valid.filter(item => item.module === "massages" || item.module === "regular_classes"))]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    const syncWellness = (event: Event) => {
      const detail = (event as CustomEvent<WellnessCart>).detail;
      setItems(current => [...current.filter(item => item.module === "biopools" || item.module === "sauna"), ...wellnessItems(detail)]);
      setOpen(true);
    };
    window.addEventListener("cancagua:cart-updated", syncWellness);
    return () => window.removeEventListener("cancagua:cart-updated", syncWellness);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    const plan = items.find((item): item is RegularClassCartItem => item.module === "regular_classes");
    const massages = items.filter((item): item is MassageCartItem => item.module === "massages");
    window.localStorage.setItem(WELLNESS_STORAGE_KEY, JSON.stringify({
      classPlan: plan ? { id: plan.planId, code: plan.code, name: plan.serviceName, priceClp: plan.totalClp, creditsPerPeriod: plan.creditsPerPeriod } : null,
      massages: massages.map(item => ({ key: item.key, techniqueId: item.techniqueId, techniqueName: item.serviceName, duration: item.duration, price: item.totalClp / item.quantity, quantity: item.quantity })),
    }));
    window.dispatchEvent(new CustomEvent("cancagua:global-cart-synced", { detail: {
      classPlan: plan ? { id: plan.planId, code: plan.code, name: plan.serviceName, priceClp: plan.totalClp, creditsPerPeriod: plan.creditsPerPeriod } : null,
      massages: massages.map(item => ({ key: item.key, techniqueId: item.techniqueId, techniqueName: item.serviceName, duration: item.duration, price: item.totalClp / item.quantity, quantity: item.quantity })),
    } }));
  }, [hydrated, items]);

  const addItem = useCallback((item: ServiceCartItem) => {
    setItems(current => item.module === "massages"
      ? [...current.filter(existing => existing.module !== "massages" || existing.key !== item.key), item]
      : [...current.filter(existing => existing.module !== item.module), item]);
    setOpen(true);
  }, []);
  const removeItem = useCallback((key: string) => setItems(current => current.filter(item => item.module === "massages" ? item.key !== key : item.module !== key)), []);
  const clear = useCallback(() => { setItems([]); window.localStorage.removeItem(WELLNESS_STORAGE_KEY); }, []);
  const value = useMemo(() => ({ items, open, setOpen, addItem, removeItem, clear }), [items, open, addItem, removeItem, clear]);
  return <ServiceCartContext.Provider value={value}>{children}<ServiceCartDrawer /></ServiceCartContext.Provider>;
}

const formatPrice = (value: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);
const formatDate = (value: string) => new Intl.DateTimeFormat("es-CL", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));
const moduleLabel = (module: ServiceCartItem["module"]) => module === "biopools" ? "Biopiscinas" : module === "sauna" ? "Sauna Nativo" : module === "massages" ? "Masaje" : "Clases Regulares";
const CROSS_SELL = [
  { module: "massages", label: "Agregar un masaje", href: "/servicios/masajes" },
  { module: "sauna", label: "Agregar Sauna", href: "/servicios/sauna#opciones" },
  { module: "biopools", label: "Agregar Biopiscinas", href: "/servicios/biopiscinas#reservar" },
  { module: "regular_classes", label: "Conocer planes de clases", href: "/clases#planes" },
] as const;

function ServiceCartDrawer() {
  const { items, open, setOpen, removeItem } = useServiceCart();
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "+56" });
  const [acquisition, setAcquisition] = useState(EMPTY_CUSTOMER_ACQUISITION);
  const [accepted, setAccepted] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");
  const [discountState, setDiscountState] = useState<{ signature: string; code: string; finalTotal: number } | null>(null);
  const startPayment = trpc.serviceCart.public.startPayment.useMutation();
  const validateDiscount = trpc.serviceCart.public.validateDiscount.useMutation();
  const hasWellness = items.some(item => item.module === "massages" || item.module === "regular_classes");
  const hasMassages = items.some(item => item.module === "massages");
  const usesTransbank = paymentGatewayForModules(items.map(item => item.module)) === "transbank";
  const subtotal = items.reduce((sum, item) => sum + item.totalClp, 0);
  const cartSignature = items.map(item => `${item.module}:${item.module === "massages" ? item.key : item.module}:${item.totalClp}`).join("|");
  const appliedDiscount = discountState?.signature === cartSignature ? discountState : null;
  const total = appliedDiscount?.finalTotal ?? subtotal;
  const apiItems = () => items.reduce<Array<
    | { module: "biopools"; serviceId: number; bookingDate: string; startTime: string; adultQuantity: number; childQuantity: number }
    | { module: "sauna"; serviceId: number; bookingDate: string; startTime: string; privateGuestCount?: number }
  >>((result, item) => {
    if (item.module === "biopools") result.push({ module: "biopools", serviceId: item.serviceId, bookingDate: item.bookingDate, startTime: item.startTime, adultQuantity: item.adultQuantity, childQuantity: item.childQuantity });
    if (item.module === "sauna") result.push({ module: "sauna", serviceId: item.serviceId, bookingDate: item.bookingDate, startTime: item.startTime, privateGuestCount: item.privateGuestCount });
    return result;
  }, []);

  const suggestion = useMemo(() => {
    if (!items.length) return null;
    const present = new Set(items.map(item => item.module));
    const options = CROSS_SELL.filter(option => !present.has(option.module));
    return options[Math.floor(Math.random() * options.length)] ?? CROSS_SELL[Math.floor(Math.random() * CROSS_SELL.length)];
  }, [cartSignature]);

  const applyCode = () => {
    const code = codeInput.trim();
    if (!code) return setCodeError("Escribe un código de descuento");
    validateDiscount.mutate({ code, items: apiItems() }, {
      onSuccess: (result: any) => { setCodeError(""); setDiscountState({ signature: cartSignature, code: result.code, finalTotal: result.finalTotal }); },
      onError: (error: any) => { setDiscountState(null); setCodeError(error.message); },
    });
  };

  const continueWellnessCheckout = () => {
    const massages = items.filter((item): item is MassageCartItem => item.module === "massages");
    const plan = items.find((item): item is RegularClassCartItem => item.module === "regular_classes");
    const params = new URLSearchParams();
    if (massages.length) params.set("cart", JSON.stringify(massages.map(item => ({ techniqueId: item.techniqueId, duration: item.duration, quantity: item.quantity }))));
    if (plan) params.set("plan", String(plan.planId));
    if (usesTransbank) params.set("service_cart", JSON.stringify(items.filter(item => item.module === "biopools" || item.module === "sauna")));
    params.set("checkout_id", `cart-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`);
    window.location.assign(`https://cms.cancagua.cl/reservar/masajes?${params.toString()}`);
  };

  const pay = (event: FormEvent) => {
    event.preventDefault();
    if (!items.length) return toast.error("Agrega al menos un servicio al carrito");
    if (hasWellness) return continueWellnessCheckout();
    const acquisitionError = validateCustomerAcquisition(acquisition);
    if (acquisitionError) return toast.error(acquisitionError);
    if (!accepted) return toast.error("Debes aceptar las condiciones de compra");
    const params = new URLSearchParams(window.location.search);
    startPayment.mutate({ clientName: customer.name, clientEmail: customer.email, clientPhone: customer.phone, acquisition: normalizeCustomerAcquisition(acquisition), items: apiItems(), discountCode: appliedDiscount?.code, acceptedTerms: true, utmSource: params.get("utm_source") || undefined, utmMedium: params.get("utm_medium") || undefined, utmCampaign: params.get("utm_campaign") || undefined }, {
      onSuccess: (result: any) => {
        if (!result.paymentRequired) return window.location.assign(result.resultUrl!);
        const form = document.createElement("form"); form.method = "POST"; form.action = result.paymentUrl!;
        const token = document.createElement("input"); token.type = "hidden"; token.name = "token_ws"; token.value = result.token!; form.appendChild(token); document.body.appendChild(form); form.submit();
      },
      onError: (error: any) => toast.error(error.message || "No pudimos iniciar el pago"),
    });
  };

  return <>
    <button type="button" onClick={() => setOpen(true)} aria-label={`Abrir carrito, ${items.length} servicios`} className="fixed right-4 top-28 z-[60] flex items-center gap-2 rounded-full bg-[#333D51] px-4 py-3 font-cg-mono text-[11px] uppercase tracking-[0.12em] text-white shadow-xl md:right-6 md:top-40"><ShoppingBag className="h-4 w-4" /><span>Carrito</span>{items.length > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D3BC8D] px-1 text-[10px] text-[#222221]">{items.length}</span>}</button>
    <button type="button" aria-label="Cerrar carrito" onClick={() => setOpen(false)} className={`fixed inset-0 z-[70] bg-black/45 backdrop-blur-[2px] transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
    <aside role="dialog" aria-modal="true" aria-label="Carrito de servicios" className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-lg flex-col bg-[#F8F6F1] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-start justify-between border-b border-[#D7D4D1] p-6"><div><p className="font-cg-mono text-xs uppercase tracking-[0.16em] text-[#4B5872]">Disponible en todo el sitio</p><h2 className="mt-1 font-cg-serif text-3xl text-[#222221]">Tu carrito Cancagua</h2></div><button type="button" onClick={() => setOpen(false)} className="rounded-full border border-[#BCBAB8] p-2"><X className="h-5 w-5" /></button></div>
      <form onSubmit={pay} className="flex min-h-0 flex-1 flex-col"><div className="flex-1 space-y-4 overflow-y-auto p-5">
        {!items.length && <div className="rounded-[1.5rem] border border-dashed border-[#BCBAB8] bg-white p-8 text-center"><ShoppingBag className="mx-auto h-8 w-8 text-[#4B5872]" /><h3 className="mt-4 font-cg-serif text-2xl">Tu carrito está vacío</h3><p className="mt-2 font-cg-soft text-sm text-[#635E5A]">Tus servicios se mantendrán aquí mientras recorres el sitio.</p></div>}
        {items.map(item => {
          const key = item.module === "massages" ? item.key : item.module;
          return <article key={key} className="rounded-[1.5rem] border border-[#D7D4D1] bg-white p-5"><div className="flex items-start justify-between gap-4"><div><p className="font-cg-mono text-[10px] uppercase tracking-[0.18em] text-[#4B5872]">{moduleLabel(item.module)}</p><h3 className="mt-1 font-cg-serif text-2xl text-[#222221]">{item.serviceName}</h3></div><button type="button" onClick={() => removeItem(key)} aria-label={`Eliminar ${item.serviceName}`} className="rounded-full p-2 text-[#827D78] hover:bg-[#F4F2ED]"><Trash2 className="h-4 w-4" /></button></div>
            {(item.module === "biopools" || item.module === "sauna") && <div className="mt-4 grid grid-cols-2 gap-3 font-cg-soft text-sm text-[#635E5A]"><span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{formatDate(item.bookingDate)}</span><span className="flex items-center gap-2"><Clock className="h-4 w-4" />{item.startTime}–{item.endTime}</span><span className="flex items-center gap-2"><Users className="h-4 w-4" />{item.module === "biopools" ? item.adultQuantity + item.childQuantity : item.guests} personas</span><strong className="text-right font-cg-mono text-[#333D51]">{formatPrice(item.totalClp)}</strong></div>}
            {item.module === "massages" && <div className="mt-4 flex justify-between font-cg-soft text-sm text-[#635E5A]"><span>{item.duration} min · {item.quantity} masaje{item.quantity === 1 ? "" : "s"}</span><strong className="font-cg-mono text-[#333D51]">{formatPrice(item.totalClp)}</strong></div>}
            {item.module === "regular_classes" && <div className="mt-4 flex justify-between font-cg-soft text-sm text-[#635E5A]"><span className="flex items-center gap-2"><Dumbbell className="h-4 w-4" />{item.creditsPerPeriod} clases por mes</span><strong className="font-cg-mono text-[#333D51]">{formatPrice(item.totalClp)}</strong></div>}
          </article>;
        })}
        {suggestion && <a href={suggestion.href} className="block rounded-[1.5rem] border border-dashed border-[#4B5872] bg-white p-4 text-center"><Sparkles className="mx-auto h-5 w-5 text-[#696F4D]" /><span className="mt-2 block font-cg-mono text-xs uppercase tracking-[0.12em] text-[#333D51]">{suggestion.label}</span></a>}
        {items.length > 0 && !hasWellness && <section className="rounded-[1.5rem] border border-[#D7D4D1] bg-white p-5"><h3 className="font-cg-serif text-xl">Datos de quien reserva</h3><div className="mt-4 space-y-3"><input required minLength={2} placeholder="Nombre completo" value={customer.name} onChange={event => setCustomer({ ...customer, name: event.target.value })} className="w-full rounded-xl border border-[#BCBAB8] px-4 py-3" /><input required type="email" placeholder="Correo" value={customer.email} onChange={event => setCustomer({ ...customer, email: event.target.value })} className="w-full rounded-xl border border-[#BCBAB8] px-4 py-3" /><input required minLength={8} type="tel" placeholder="WhatsApp" value={customer.phone} onChange={event => setCustomer({ ...customer, phone: event.target.value })} className="w-full rounded-xl border border-[#BCBAB8] px-4 py-3" /></div><div className="mt-6 border-t border-[#D7D4D1] pt-5"><CustomerAcquisitionFields value={acquisition} onChange={setAcquisition} idPrefix="cart" compact /></div></section>}
      </div>
      {items.length > 0 && <div className="border-t border-[#D7D4D1] bg-white p-6">
        {!hasWellness && <button type="button" onClick={() => setShowDiscount(value => !value)} className="mb-4 font-cg-soft text-sm font-medium text-[#4B5872] underline underline-offset-4">Aplicar código de descuento</button>}
        {!hasWellness && showDiscount && <div className="mb-4"><div className="flex gap-2"><input value={codeInput} onChange={event => { setCodeInput(event.target.value.toUpperCase()); setDiscountState(null); setCodeError(""); }} placeholder="Ingresa tu código" className="min-w-0 flex-1 rounded-full border border-[#BCBAB8] px-4 py-2 font-cg-mono text-sm uppercase" /><Button type="button" variant="outline" onClick={applyCode} disabled={!codeInput.trim() || validateDiscount.isPending} className="rounded-full">{validateDiscount.isPending ? "Validando…" : "Aplicar"}</Button></div>{codeError && <p className="mt-2 font-cg-soft text-sm text-red-700">{codeError}</p>}{appliedDiscount && <p className="mt-2 font-cg-soft text-sm text-green-700">Código {appliedDiscount.code} aplicado.</p>}</div>}
        <div className="flex items-end justify-between"><div><span className="font-cg-soft text-sm text-[#635E5A]">Total · {items.length} {items.length === 1 ? "selección" : "selecciones"}</span><p className="mt-1 font-cg-mono text-[10px] uppercase tracking-[0.12em] text-[#696F4D]">Pago por {usesTransbank ? "Transbank" : "Getnet"}</p></div><strong className="font-cg-serif text-3xl font-light text-[#222221]">{formatPrice(total)}</strong></div>
        {!hasWellness && <label className="mt-4 flex items-start gap-3 font-cg-soft text-xs leading-relaxed text-[#635E5A]"><input type="checkbox" checked={accepted} onChange={event => setAccepted(event.target.checked)} className="mt-0.5 h-4 w-4" /><span>Acepto las condiciones de compra y los reglamentos de los servicios seleccionados.</span></label>}
        <Button type="submit" disabled={startPayment.isPending} className="mt-4 h-12 w-full rounded-full bg-[#333D51] font-cg-mono uppercase tracking-[0.14em] text-white hover:bg-[#4B5872]">{startPayment.isPending ? "Protegiendo tus cupos…" : <><LockKeyhole className="mr-2 h-4 w-4" />{hasWellness ? (hasMassages ? "Continuar y elegir horarios" : "Continuar al pago") : `Pagar con ${usesTransbank ? "Transbank" : "Getnet"}`}</>}</Button>
        <p className="mt-2 text-center font-cg-soft text-[11px] text-[#827D78]">{hasWellness ? `El pago final será por ${usesTransbank ? "Transbank" : "Getnet"}.` : "Los cupos quedan reservados por 40 minutos al iniciar el pago."}</p>
      </div>}
      </form>
    </aside>
  </>;
}

export function clearStoredServiceCart() { if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY); }
