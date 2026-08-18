import { createContext, useCallback, useContext, useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { CalendarDays, Clock, LockKeyhole, ShoppingBag, Trash2, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const STORAGE_KEY = "cancagua-service-cart-v1";

export type BiopoolCartItem = {
  module: "biopools";
  serviceId: number;
  serviceName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  adultQuantity: number;
  childQuantity: number;
  discountCode?: string;
  totalClp: number;
};

export type SaunaCartItem = {
  module: "sauna";
  serviceId: number;
  serviceName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  privateGuestCount?: number;
  discountCode?: string;
  guests: number;
  totalClp: number;
};

export type ServiceCartItem = BiopoolCartItem | SaunaCartItem;

type ServiceCartContextValue = {
  items: ServiceCartItem[];
  open: boolean;
  setOpen: (open: boolean) => void;
  addItem: (item: ServiceCartItem) => void;
  removeItem: (module: ServiceCartItem["module"]) => void;
  clear: () => void;
};

const ServiceCartContext = createContext<ServiceCartContextValue | null>(null);

export function useServiceCart() {
  const value = useContext(ServiceCartContext);
  if (!value) throw new Error("useServiceCart debe usarse dentro de ServiceCartProvider");
  return value;
}

export function ServiceCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ServiceCartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed.filter(item => item?.module === "biopools" || item?.module === "sauna"));
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const addItem = useCallback((item: ServiceCartItem) => {
    setItems(current => [...current.filter(existing => existing.module !== item.module), item]);
    setOpen(true);
  }, []);
  const removeItem = useCallback((module: ServiceCartItem["module"]) => setItems(current => current.filter(item => item.module !== module)), []);
  const clear = useCallback(() => setItems([]), []);
  const value = useMemo<ServiceCartContextValue>(() => ({ items, open, setOpen, addItem, removeItem, clear }), [addItem, clear, items, open, removeItem]);

  return <ServiceCartContext.Provider value={value}>{children}<ServiceCartDrawer /></ServiceCartContext.Provider>;
}

const formatPrice = (value: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);
const formatDate = (value: string) => new Intl.DateTimeFormat("es-CL", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(`${value}T12:00:00Z`));

function ServiceCartDrawer() {
  const { items, open, setOpen, removeItem } = useServiceCart();
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "+56" });
  const [accepted, setAccepted] = useState(false);
  const total = items.reduce((sum, item) => sum + item.totalClp, 0);
  const startPayment = trpc.serviceCart.public.startPayment.useMutation();

  const pay = (event: FormEvent) => {
    event.preventDefault();
    if (!items.length) return toast.error("Agrega al menos un servicio al carrito");
    if (!accepted) return toast.error("Debes aceptar las condiciones de compra");
    const params = new URLSearchParams(window.location.search);
    startPayment.mutate({
      clientName: customer.name,
      clientEmail: customer.email,
      clientPhone: customer.phone,
      items: items.map(item => item.module === "biopools" ? {
        module: "biopools" as const,
        serviceId: item.serviceId,
        bookingDate: item.bookingDate,
        startTime: item.startTime,
        adultQuantity: item.adultQuantity,
        childQuantity: item.childQuantity,
        discountCode: item.discountCode,
      } : {
        module: "sauna" as const,
        serviceId: item.serviceId,
        bookingDate: item.bookingDate,
        startTime: item.startTime,
        privateGuestCount: item.privateGuestCount,
        discountCode: item.discountCode,
      }),
      acceptedTerms: true,
      utmSource: params.get("utm_source") || undefined,
      utmMedium: params.get("utm_medium") || undefined,
      utmCampaign: params.get("utm_campaign") || undefined,
    }, {
      onSuccess: (result: any) => {
        if (!result.paymentRequired) return window.location.assign(result.resultUrl);
        const form = document.createElement("form");
        form.method = "POST";
        form.action = result.paymentUrl;
        const token = document.createElement("input");
        token.type = "hidden";
        token.name = "token_ws";
        token.value = result.token;
        form.appendChild(token);
        document.body.appendChild(form);
        form.submit();
      },
      onError: (error: any) => toast.error(error.message || "No pudimos iniciar el pago"),
    });
  };

  return <>
    <button type="button" onClick={() => setOpen(true)} aria-label={`Abrir carrito, ${items.length} servicios`} className="fixed right-4 top-28 z-[60] flex items-center gap-2 rounded-full bg-[#333D51] px-4 py-3 font-cg-mono text-[11px] uppercase tracking-[0.12em] text-white shadow-xl md:right-6 md:top-40">
      <ShoppingBag className="h-4 w-4" />
      <span>Carrito</span>
      {items.length > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D3BC8D] px-1 text-[10px] text-[#222221]">{items.length}</span>}
    </button>
    <button type="button" aria-label="Cerrar carrito" onClick={() => setOpen(false)} className={`fixed inset-0 z-[70] bg-black/45 backdrop-blur-[2px] transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
    <aside role="dialog" aria-modal="true" aria-label="Carrito de servicios" className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-lg flex-col bg-[#F8F6F1] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-start justify-between border-b border-[#D7D4D1] p-6">
        <div><p className="font-cg-mono text-xs uppercase tracking-[0.16em] text-[#4B5872]">Compra compartida</p><h2 className="mt-1 font-cg-serif text-3xl text-[#222221]">Tu carrito Cancagua</h2></div>
        <button type="button" onClick={() => setOpen(false)} className="rounded-full border border-[#BCBAB8] p-2"><X className="h-5 w-5" /></button>
      </div>
      <form onSubmit={pay} className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {!items.length && <div className="rounded-[1.5rem] border border-dashed border-[#BCBAB8] bg-white p-8 text-center"><ShoppingBag className="mx-auto h-8 w-8 text-[#4B5872]" /><h3 className="mt-4 font-cg-serif text-2xl">Tu carrito está vacío</h3><p className="mt-2 font-cg-soft text-sm text-[#635E5A]">Elige una fecha y horario en Biopiscinas o Sauna. Tus servicios se mantendrán aquí mientras recorres el sitio.</p><div className="mt-6 flex justify-center gap-3"><a href="/servicios/biopiscinas" className="rounded-full border border-[#4B5872] px-4 py-2 font-cg-mono text-xs uppercase">Biopiscinas</a><a href="/servicios/sauna" className="rounded-full border border-[#4B5872] px-4 py-2 font-cg-mono text-xs uppercase">Sauna</a></div></div>}
          {items.map(item => <article key={item.module} className="rounded-[1.5rem] border border-[#D7D4D1] bg-white p-5">
            <div className="flex items-start justify-between gap-4"><div><p className="font-cg-mono text-[10px] uppercase tracking-[0.18em] text-[#4B5872]">{item.module === "biopools" ? "Biopiscinas" : "Sauna Nativo"}</p><h3 className="mt-1 font-cg-serif text-2xl text-[#222221]">{item.serviceName}</h3></div><button type="button" onClick={() => removeItem(item.module)} aria-label={`Eliminar ${item.serviceName}`} className="rounded-full p-2 text-[#827D78] hover:bg-[#F4F2ED]"><Trash2 className="h-4 w-4" /></button></div>
            <div className="mt-4 grid grid-cols-2 gap-3 font-cg-soft text-sm text-[#635E5A]"><span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" />{formatDate(item.bookingDate)}</span><span className="flex items-center gap-2"><Clock className="h-4 w-4" />{item.startTime}–{item.endTime}</span><span className="flex items-center gap-2"><Users className="h-4 w-4" />{item.module === "biopools" ? item.adultQuantity + item.childQuantity : item.guests} persona{(item.module === "biopools" ? item.adultQuantity + item.childQuantity : item.guests) === 1 ? "" : "s"}</span><strong className="text-right font-cg-mono text-[#333D51]">{formatPrice(item.totalClp)}</strong></div>
          </article>)}
          {items.length > 0 && items.length < 2 && <a href={items[0].module === "biopools" ? "/servicios/sauna#opciones" : "/servicios/biopiscinas#reservar"} className="block rounded-[1.5rem] border border-dashed border-[#4B5872] p-4 text-center font-cg-mono text-xs uppercase tracking-[0.12em] text-[#333D51]">+ Agregar {items[0].module === "biopools" ? "Sauna" : "Biopiscinas"}</a>}
          {items.length > 0 && <section className="rounded-[1.5rem] border border-[#D7D4D1] bg-white p-5"><h3 className="font-cg-serif text-xl">Datos de quien reserva</h3><div className="mt-4 space-y-3"><input required minLength={2} placeholder="Nombre completo" value={customer.name} onChange={event => setCustomer({ ...customer, name: event.target.value })} className="w-full rounded-xl border border-[#BCBAB8] px-4 py-3" /><input required type="email" placeholder="Correo" value={customer.email} onChange={event => setCustomer({ ...customer, email: event.target.value })} className="w-full rounded-xl border border-[#BCBAB8] px-4 py-3" /><input required minLength={8} type="tel" placeholder="WhatsApp" value={customer.phone} onChange={event => setCustomer({ ...customer, phone: event.target.value })} className="w-full rounded-xl border border-[#BCBAB8] px-4 py-3" /></div></section>}
        </div>
        {items.length > 0 && <div className="border-t border-[#D7D4D1] bg-white p-6">
          <div className="flex items-end justify-between"><span className="font-cg-soft text-sm text-[#635E5A]">Total · {items.length} servicio{items.length === 1 ? "" : "s"}</span><strong className="font-cg-serif text-3xl font-light text-[#222221]">{formatPrice(total)}</strong></div>
          <label className="mt-4 flex items-start gap-3 font-cg-soft text-xs leading-relaxed text-[#635E5A]"><input type="checkbox" checked={accepted} onChange={event => setAccepted(event.target.checked)} className="mt-0.5 h-4 w-4" /><span>Acepto las condiciones de compra y los reglamentos de los servicios seleccionados.</span></label>
          <Button type="submit" disabled={startPayment.isPending} className="mt-4 h-12 w-full rounded-full bg-[#333D51] font-cg-mono uppercase tracking-[0.14em] text-white hover:bg-[#4B5872]">{startPayment.isPending ? "Protegiendo tus cupos…" : <><LockKeyhole className="mr-2 h-4 w-4" />Pagar con Transbank</>}</Button>
          <p className="mt-2 text-center font-cg-soft text-[11px] text-[#827D78]">Los cupos quedan reservados por 30 minutos al iniciar el pago.</p>
        </div>}
      </form>
    </aside>
  </>;
}

export function clearStoredServiceCart() {
  if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
}
