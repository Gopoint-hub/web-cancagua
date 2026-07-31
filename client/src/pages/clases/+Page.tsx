import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Check,
  Clock,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  readWellnessCart,
  writeWellnessCart,
  type WellnessClassPlan,
  type WellnessMassageItem,
} from "@/lib/wellnessCart";
import { getMassageCheckoutId } from "@/lib/massageAnalytics";

const CMS_CLASSES_URL = "https://cms.cancagua.cl/api/public/clases/catalog";
const CMS_MASSAGES_URL = "https://cms.cancagua.cl/api/public/masajes/techniques";
const HERO_IMAGE = "/images/yoga-2025-hero.jpg";
const FALLBACK_CLASS_IMAGE = "/images/clases-regulares-hero.jpg";
const DAY_NAMES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

type ClassPlan = WellnessClassPlan & { displayOrder: number };
type ClassSchedule = {
  id: number;
  teacherId: number;
  teacherName: string;
  teacherBio?: string | null;
  teacherImageUrl?: string | null;
  teacherColor?: string | null;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
};
type RegularClass = {
  id: number;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  location?: string | null;
  capacity?: number | null;
  schedules: ClassSchedule[];
};
type Teacher = {
  id: number;
  name: string;
  bio?: string | null;
  imageUrl?: string | null;
  color?: string | null;
};
type ClassesCatalog = { plans: ClassPlan[]; classes: RegularClass[]; teachers: Teacher[] };
type MassagePrice = { duration: number; price: number | null };
type MassageTechnique = {
  id: number;
  name: string;
  shortDescription?: string | null;
  imageUrl?: string | null;
  durations: number[];
  prices: MassagePrice[];
};

const formatPrice = (value: number) => new Intl.NumberFormat("es-CL", {
  style: "currency", currency: "CLP", maximumFractionDigits: 0,
}).format(value);

const WEEK_DAYS = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
  { value: 0, label: "Domingo" },
];

const SCHEDULE_COLORS = [
  { background: "#DDE8EC", border: "#648596" },
  { background: "#E6E0EA", border: "#806A8C" },
  { background: "#EEE2C9", border: "#A1844F" },
  { background: "#DFE9D8", border: "#718760" },
  { background: "#EEDDD7", border: "#A16C5C" },
  { background: "#E2E4EE", border: "#6D7694" },
];

function WeeklySchedule({ classes }: { classes: RegularClass[] }) {
  const entries = classes.flatMap((regularClass, classIndex) => regularClass.schedules.map((schedule) => ({
    ...schedule,
    classId: regularClass.id,
    className: regularClass.name,
    color: SCHEDULE_COLORS[classIndex % SCHEDULE_COLORS.length],
  })));
  const timeSlots = Array.from(new Set(entries.map((entry) => entry.startTime))).sort((a, b) => a.localeCompare(b));
  if (entries.length === 0) return null;

  return (
    <section id="horario-semanal" className="bg-[#F4F2ED] py-20 md:py-24">
      <div className="container max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#4B5872]">Organiza tu semana</p>
          <h2 className="mt-3 font-cg-serif text-4xl text-[#222221] md:text-5xl">Horario semanal</h2>
          <p className="mt-4 font-cg-soft text-[#635E5A]">Revisa nuestras clases disponibles y encuentra el momento que mejor se adapte a tu rutina.</p>
        </div>
        <p className="mb-3 font-cg-soft text-xs text-[#827D78] lg:hidden">Desliza horizontalmente para revisar la semana completa.</p>
        <div className="overflow-x-auto rounded-3xl border border-[#D7D4D1] bg-white p-3 shadow-sm md:p-5">
          <div className="grid min-w-[1120px] grid-cols-[82px_repeat(7,minmax(132px,1fr))] gap-2">
            <div className="flex items-center justify-center rounded-xl bg-[#333D51] px-2 py-3 font-cg-mono text-[10px] uppercase tracking-wider text-white/75">Hora</div>
            {WEEK_DAYS.map((day) => (
              <div key={day.value} className="rounded-xl bg-[#333D51] px-2 py-3 text-center font-cg-mono text-xs uppercase tracking-wider text-white">{day.label}</div>
            ))}
            {timeSlots.map((time) => (
              <div key={time} className="contents">
                <div className="flex min-h-24 items-start justify-center rounded-xl bg-[#ECE9E3] px-2 py-3 font-cg-mono text-xs font-medium text-[#33312F]">{time}</div>
                {WEEK_DAYS.map((day) => {
                  const slotEntries = entries.filter((entry) => entry.dayOfWeek === day.value && entry.startTime === time);
                  return (
                    <div key={`${time}-${day.value}`} className="min-h-24 space-y-2 rounded-xl border border-[#ECE9E3] bg-[#FAF9F6] p-1.5">
                      {slotEntries.map((entry) => (
                        <a
                          key={entry.id}
                          href={`#clase-${entry.classId}`}
                          className="block rounded-lg border-l-4 p-2.5 transition-transform hover:-translate-y-0.5 hover:shadow-md"
                          style={{ backgroundColor: entry.color.background, borderLeftColor: entry.color.border }}
                        >
                          <p className="font-cg-mono text-[10px] font-medium text-[#33312F]">{entry.startTime}–{entry.endTime}</p>
                          <p className="mt-1 font-cg-serif text-sm leading-tight text-[#222221]">{entry.className}</p>
                          <p className="mt-1.5 font-cg-soft text-[11px] leading-tight text-[#635E5A]">{entry.teacherName}</p>
                        </a>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center font-cg-soft text-xs text-[#827D78]">Selecciona una clase del horario para conocer sus detalles.</p>
      </div>
    </section>
  );
}

function CartDrawer({
  open,
  checkoutId,
  plan,
  massages,
  suggestions,
  onClose,
  onRemovePlan,
  onAddMassage,
  onQuantityChange,
  onRemoveMassage,
}: {
  open: boolean;
  checkoutId: string;
  plan: ClassPlan | null;
  massages: WellnessMassageItem[];
  suggestions: MassageTechnique[];
  onClose: () => void;
  onRemovePlan: () => void;
  onAddMassage: (technique: MassageTechnique, duration: number) => void;
  onQuantityChange: (key: string, quantity: number) => void;
  onRemoveMassage: (key: string) => void;
}) {
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState<{ code: string; discountTotal: number; finalTotal: number } | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [isValidatingDiscount, setIsValidatingDiscount] = useState(false);
  const massageTotal = massages.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = massageTotal + (plan?.priceClp ?? 0);
  const finalTotal = discount?.finalTotal ?? total;
  const itemCount = massages.reduce((sum, item) => sum + item.quantity, 0) + (plan ? 1 : 0);

  useEffect(() => {
    setDiscount(null);
    setDiscountError("");
  }, [plan?.id, massages]);

  const applyDiscount = async () => {
    setIsValidatingDiscount(true);
    setDiscountError("");
    try {
      const response = await fetch("https://cms.cancagua.cl/api/public/masajes/discount/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: discountCode,
          classPlanId: plan?.id,
          items: massages.map(({ techniqueId, duration, quantity }) => ({ techniqueId, duration, quantity })),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "El código no es válido.");
      setDiscount(result);
      setDiscountCode(result.code);
    } catch (error) {
      setDiscount(null);
      setDiscountError(error instanceof Error ? error.message : "El código no es válido.");
    } finally {
      setIsValidatingDiscount(false);
    }
  };

  const params = new URLSearchParams();
  if (plan) params.set("plan", String(plan.id));
  if (massages.length > 0) {
    params.set("cart", JSON.stringify(massages.map(({ techniqueId, duration, quantity }) => ({ techniqueId, duration, quantity }))));
  }
  if (checkoutId) params.set("checkout_id", checkoutId);
  if (discount?.code) params.set("discount", discount.code);
  const checkoutUrl = `https://cms.cancagua.cl/reservar/masajes?${params.toString()}`;

  return (
    <>
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={onClose}
        className={`fixed inset-0 z-[70] bg-black/45 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        aria-label="Carrito Cancagua"
        className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-[#F8F6F1] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-start justify-between border-b border-[#D7D4D1] p-6">
          <div>
            <p className="font-cg-mono text-xs uppercase tracking-[0.16em] text-[#4B5872]">Tu selección</p>
            <h2 className="mt-1 font-cg-serif text-3xl text-[#222221]">Carrito Cancagua</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-[#BCBAB8] p-2" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {plan && (
            <article className="rounded-2xl border border-[#9BA7BA] bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-cg-mono text-xs uppercase tracking-wider text-[#4B5872]">Plan de clases</p>
                  <h3 className="mt-1 font-cg-serif text-xl text-[#222221]">{plan.name}</h3>
                  <p className="mt-1 font-cg-soft text-sm text-[#635E5A]">{plan.creditsPerPeriod} clase{plan.creditsPerPeriod === 1 ? "" : "s"} por mes</p>
                </div>
                <button type="button" onClick={onRemovePlan} className="p-2 text-red-700" aria-label="Quitar plan"><Trash2 className="h-4 w-4" /></button>
              </div>
              <p className="mt-3 text-right font-cg-serif text-xl">{formatPrice(plan.priceClp)}</p>
            </article>
          )}

          {massages.map((item) => (
            <article key={item.key} className="rounded-2xl border border-[#D7D4D1] bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-cg-serif text-lg text-[#222221]">{item.techniqueName}</p>
                  <p className="font-cg-soft text-sm text-[#635E5A]">{item.duration} minutos · {formatPrice(item.price)}</p>
                </div>
                <button type="button" onClick={() => onRemoveMassage(item.key)} className="p-2 text-red-700" aria-label="Quitar masaje"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-cg-soft text-sm text-[#635E5A]">Cantidad</span>
                <div className="flex items-center rounded-full border border-[#BCBAB8]">
                  <button type="button" onClick={() => onQuantityChange(item.key, item.quantity - 1)} className="p-2"><Minus className="h-4 w-4" /></button>
                  <span className="w-8 text-center font-cg-mono text-sm">{item.quantity}</span>
                  <button type="button" disabled={item.quantity >= 4} onClick={() => onQuantityChange(item.key, item.quantity + 1)} className="p-2 disabled:opacity-30"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
            </article>
          ))}

          {plan && (
            <section className="rounded-2xl bg-[#E7EBE3] p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 text-[#44580E]" />
                <div>
                  <h3 className="font-cg-serif text-xl text-[#222221]">¿Quieres agregar otro servicio?</h3>
                  <p className="mt-1 font-cg-soft text-sm leading-relaxed text-[#635E5A]">Completa tu experiencia con un masaje. Podrás elegir su fecha y hora antes de pagar.</p>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {suggestions.slice(0, 3).map((technique) => (
                  <div key={technique.id} className="rounded-xl bg-white p-3">
                    <p className="font-cg-serif text-base text-[#222221]">{technique.name}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {technique.prices.filter((price): price is MassagePrice & { price: number } => Boolean(price.price)).map((price) => (
                        <button key={price.duration} type="button" onClick={() => onAddMassage(technique, price.duration)} className="rounded-full border border-[#4B5872] px-3 py-1.5 font-cg-mono text-[11px] text-[#333D51] hover:bg-[#4B5872] hover:text-white">
                          + {price.duration} min · {formatPrice(price.price)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {itemCount > 0 && (
          <div className="border-t border-[#D7D4D1] bg-white p-6">
            <button type="button" onClick={() => setShowDiscount((value) => !value)} className="mb-4 font-cg-soft text-sm font-medium text-[#4B5872] underline underline-offset-4">
              Aplicar código de descuento
            </button>
            {showDiscount && (
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                    value={discountCode}
                    onChange={(event) => {
                      setDiscountCode(event.target.value.toUpperCase());
                      setDiscount(null);
                      setDiscountError("");
                    }}
                    onKeyDown={(event) => { if (event.key === "Enter" && discountCode.trim()) applyDiscount(); }}
                    placeholder="Ingresa tu código"
                    className="min-w-0 flex-1 rounded-full border border-[#BCBAB8] bg-white px-4 py-2 font-cg-mono text-sm uppercase outline-none focus:border-[#4B5872]"
                  />
                  <Button type="button" variant="outline" onClick={applyDiscount} disabled={!discountCode.trim() || isValidatingDiscount} className="rounded-full">
                    {isValidatingDiscount ? "Validando…" : "Aplicar"}
                  </Button>
                </div>
                {discountError && <p className="mt-2 font-cg-soft text-sm text-red-700">{discountError}</p>}
                {discount && <p className="mt-2 font-cg-soft text-sm text-green-700">Código {discount.code} aplicado correctamente.</p>}
              </div>
            )}
            <div className="mb-1 flex items-end justify-between">
              <span className="font-cg-soft text-sm text-[#635E5A]">Subtotal</span>
              <span className={discount ? "font-cg-mono text-sm text-[#827D78] line-through" : "font-cg-serif text-2xl text-[#222221]"}>{formatPrice(total)}</span>
            </div>
            {discount && <><div className="flex justify-between font-cg-soft text-sm text-green-700"><span>Descuento</span><span>−{formatPrice(discount.discountTotal)}</span></div><div className="mb-4 mt-2 flex justify-between border-t border-[#D7D4D1] pt-2"><span className="font-cg-soft text-sm text-[#635E5A]">Total</span><span className="font-cg-serif text-2xl text-[#222221]">{formatPrice(finalTotal)}</span></div></>}
            <a
              href={checkoutUrl}
              className="flex h-12 w-full items-center justify-center rounded-full bg-[#4B5872] font-cg-mono text-sm uppercase tracking-[0.14em] text-white hover:bg-[#333D51]"
            >
              Continuar reserva y pago
            </a>
            <p className="mt-3 text-center font-cg-soft text-xs text-[#827D78]">Pago seguro por Getnet. Si agregaste masajes, primero elegirás sus horarios.</p>
          </div>
        )}
      </aside>
    </>
  );
}

export default function Page() {
  const [catalog, setCatalog] = useState<ClassesCatalog | null>(null);
  const [massages, setMassages] = useState<MassageTechnique[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<ClassPlan | null>(null);
  const [massageCart, setMassageCart] = useState<WellnessMassageItem[]>([]);
  const [cartReady, setCartReady] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState("");

  useEffect(() => {
    setCheckoutId(getMassageCheckoutId());
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch(CMS_CLASSES_URL, { cache: "no-store" }).then((response) => {
        if (!response.ok) throw new Error(`Classes catalog ${response.status}`);
        return response.json() as Promise<ClassesCatalog>;
      }),
      fetch(CMS_MASSAGES_URL, { cache: "no-store" }).then((response) => response.ok ? response.json() : { techniques: [] }),
    ]).then(([classesData, massageData]) => {
      if (cancelled) return;
      setCatalog(classesData);
      setMassages((massageData as { techniques?: MassageTechnique[] }).techniques ?? []);
    }).catch((error) => {
      console.error("[Clases] No se pudo cargar el catálogo CMS:", error);
      if (!cancelled) setHasError(true);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const storedCart = readWellnessCart();
    setSelectedPlan(storedCart.classPlan as ClassPlan | null);
    setMassageCart(storedCart.massages);
    setCartReady(true);
  }, []);

  useEffect(() => {
    if (!cartReady) return;
    writeWellnessCart({ classPlan: selectedPlan, massages: massageCart });
  }, [cartReady, selectedPlan, massageCart]);

  const choosePlan = (plan: ClassPlan) => {
    setSelectedPlan(plan);
    setIsCartOpen(true);
    toast.success(`${plan.name} agregado al carrito`, { position: "top-center" });
  };

  const addMassage = (technique: MassageTechnique, duration: number) => {
    const price = technique.prices.find((item) => item.duration === duration)?.price;
    if (!price) return;
    setMassageCart((current) => {
      const existing = current.find((item) => item.techniqueId === technique.id && item.duration === duration);
      if (existing) return current.map((item) => item.key === existing.key ? { ...item, quantity: Math.min(4, item.quantity + 1) } : item);
      return [...current, {
        key: `${technique.id}-${duration}-${Date.now()}`,
        techniqueId: technique.id,
        techniqueName: technique.name,
        duration,
        price,
        quantity: 1,
      }];
    });
    toast.success("Masaje agregado al carrito", { position: "top-center" });
  };

  const availableMassages = massages.filter((technique) => technique.prices.some((price) => Boolean(price.price)));
  const cartCount = massageCart.reduce((sum, item) => sum + item.quantity, 0) + (selectedPlan ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#F4F2ED]">
      <section className="relative min-h-[620px] overflow-hidden">
        <img src={HERO_IMAGE} alt="Clases regulares en Cancagua" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/70" />
        <div className="container relative flex min-h-[620px] max-w-6xl flex-col items-center justify-center px-4 text-center text-white">
          <p className="mb-5 font-cg-mono text-xs uppercase tracking-[0.24em] text-white/85">Movimiento · comunidad · naturaleza</p>
          <h1 className="max-w-4xl font-cg-serif text-5xl font-normal leading-[0.98] md:text-7xl">Clases regulares en Cancagua</h1>
          <p className="mt-6 max-w-2xl font-cg-soft text-lg leading-relaxed text-white/90 md:text-xl">Elige tu plan mensual, participa en distintas disciplinas y vive una práctica constante junto al Lago Llanquihue.</p>
          <a href="#planes" className="mt-9 inline-flex h-12 items-center rounded-full bg-white px-8 font-cg-mono text-xs uppercase tracking-[0.16em] text-[#222221] hover:bg-[#F4F2ED]">Ver planes y reservar</a>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="container grid max-w-5xl gap-6 text-center sm:grid-cols-3">
          {[{ icon: Users, title: "Comunidad cercana", text: "Grupos acogedores y acompañamiento profesional." }, { icon: CalendarDays, title: "Horarios flexibles", text: "Combina las disciplinas incluidas en tu plan." }, { icon: Sparkles, title: "Beneficios crecientes", text: "Más frecuencia, más experiencias y descuentos." }].map((item) => (
            <div key={item.title} className="px-4"><item.icon className="mx-auto h-6 w-6 text-[#4B5872]" /><h2 className="mt-3 font-cg-serif text-xl">{item.title}</h2><p className="mt-2 font-cg-soft text-sm leading-relaxed text-[#635E5A]">{item.text}</p></div>
          ))}
        </div>
      </section>

      <section id="planes" className="py-20 md:py-24">
        <div className="container max-w-7xl">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#4B5872]">Elige tu ritmo</p>
            <h2 className="mt-3 font-cg-serif text-4xl text-[#222221] md:text-5xl">Planes y clase suelta</h2>
            <p className="mt-4 font-cg-soft text-[#635E5A]">Elige la frecuencia que mejor se adapte a tu ritmo y disfruta una práctica constante en Cancagua.</p>
          </div>
          {isLoading ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{[1,2,3,4,5,6].map((item) => <div key={item} className="h-80 animate-pulse rounded-3xl bg-white/70" />)}</div>
          ) : hasError || !catalog ? (
            <div className="rounded-3xl bg-white p-10 text-center font-cg-soft text-[#635E5A]">Estamos actualizando los planes. Por favor intenta nuevamente en unos minutos.</div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {catalog.plans.map((plan, index) => (
                <article key={plan.id} className={`relative flex min-h-80 flex-col rounded-3xl border p-6 shadow-sm ${index === 2 ? "border-[#4B5872] bg-[#333D51] text-white" : "border-[#D7D4D1] bg-white text-[#222221]"}`}>
                  {index === 2 && <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 font-cg-mono text-[10px] uppercase tracking-wider">Recomendado</span>}
                  <p className={`font-cg-mono text-xs uppercase tracking-[0.18em] ${index === 2 ? "text-white/70" : "text-[#4B5872]"}`}>{plan.code === "drop_in" ? "Sin mensualidad" : plan.code}</p>
                  <h3 className="mt-3 max-w-[80%] font-cg-serif text-3xl leading-tight">{plan.name}</h3>
                  <p className="mt-4 font-cg-serif text-4xl">{formatPrice(plan.priceClp)}</p>
                  <p className={`mt-1 font-cg-soft text-sm ${index === 2 ? "text-white/70" : "text-[#827D78]"}`}>{plan.creditsPerPeriod} clase{plan.creditsPerPeriod === 1 ? "" : "s"} por período · {formatPrice(Math.round(plan.priceClp / plan.creditsPerPeriod))} c/u</p>
                  <div className={`my-5 h-px ${index === 2 ? "bg-white/20" : "bg-[#E5E2DF]"}`} />
                  <div className="flex gap-3 font-cg-soft text-sm leading-relaxed"><Check className="mt-0.5 h-4 w-4 shrink-0" /><span>{plan.benefits || "Acceso a las clases regulares del programa"}</span></div>
                  <Button type="button" onClick={() => choosePlan(plan)} className={`mt-auto h-12 rounded-full font-cg-mono text-xs uppercase tracking-[0.14em] ${index === 2 ? "bg-white text-[#333D51] hover:bg-[#F4F2ED]" : "bg-[#4B5872] text-white hover:bg-[#333D51]"}`}>Reservar plan</Button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {catalog && <WeeklySchedule classes={catalog.classes} />}

      <section id="clases" className="bg-white py-20 md:py-24">
        <div className="container max-w-7xl">
          <div className="mb-12 max-w-3xl"><p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#4B5872]">Programa vigente</p><h2 className="mt-3 font-cg-serif text-4xl text-[#222221] md:text-5xl">Clases y horarios</h2><p className="mt-4 font-cg-soft text-[#635E5A]">Encuentra la disciplina y el horario que mejor acompañen tu bienestar.</p></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {catalog?.classes.map((item) => (
              <article id={`clase-${item.id}`} key={item.id} className="group flex h-full scroll-mt-28 flex-col rounded-lg border border-[#DBD3CC] bg-[#F8F6F1] p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-56 shrink-0 overflow-hidden rounded-md bg-[#222221]"><img src={item.imageUrl || FALLBACK_CLASS_IMAGE} alt={item.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" /><div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/65" /><h3 className="absolute bottom-5 left-5 right-5 font-cg-serif text-xl leading-[1.12] text-white md:text-2xl">{item.name}</h3></div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="font-cg-soft text-sm leading-relaxed text-[#635E5A]">{item.shortDescription || "Una práctica guiada para conectar cuerpo, respiración y bienestar."}</p>
                  <div className="mt-4 space-y-2">
                    {item.schedules.map((schedule) => (
                      <div key={schedule.id} className="rounded-xl bg-white p-3 text-sm">
                        <div className="flex items-center gap-2 font-cg-soft text-[#33312F]"><Clock className="h-4 w-4 shrink-0 text-[#4B5872]" /><strong>{DAY_NAMES[schedule.dayOfWeek]}</strong> · {schedule.startTime}–{schedule.endTime}</div>
                        <div className="mt-1.5 flex items-center gap-2 font-cg-soft text-[#635E5A]"><UserRound className="h-4 w-4 shrink-0" />{schedule.teacherName}</div>
                      </div>
                    ))}
                    {item.schedules.length === 0 && <p className="rounded-xl border border-dashed bg-white p-3 font-cg-soft text-sm text-[#827D78]">Próximamente publicaremos nuevos horarios.</p>}
                  </div>
                  <div className="mt-auto flex flex-wrap gap-4 pt-4 font-cg-soft text-xs text-[#827D78]">{item.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{item.location}</span>}{item.capacity && <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />Cupos: {item.capacity}</span>}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {catalog && catalog.teachers.length > 0 && (
        <section className="py-20 md:py-24">
          <div className="container max-w-7xl">
            <div className="mb-12 text-center"><p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#4B5872]">Quienes te acompañan</p><h2 className="mt-3 font-cg-serif text-4xl text-[#222221] md:text-5xl">Profesores</h2></div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {catalog.teachers.map((teacher) => (
                <article key={teacher.id} className="rounded-3xl bg-white p-6 shadow-sm">
                  {teacher.imageUrl ? <img src={teacher.imageUrl} alt={teacher.name} className="h-24 w-24 rounded-full object-cover" loading="lazy" /> : <div className="flex h-24 w-24 items-center justify-center rounded-full font-cg-serif text-3xl text-white" style={{ backgroundColor: teacher.color || "#648596" }}>{teacher.name.split(" ").map((part) => part[0]).slice(0,2).join("")}</div>}
                  <h3 className="mt-5 font-cg-serif text-2xl text-[#222221]">{teacher.name}</h3>
                  <p className="mt-3 font-cg-soft text-sm leading-relaxed text-[#635E5A]">{teacher.bio || "Profesor/a del programa de Clases Regulares Cancagua."}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#222221] py-20 text-center text-white">
        <div className="container max-w-3xl"><h2 className="font-cg-serif text-4xl md:text-5xl">Empieza tu práctica este mes</h2><p className="mx-auto mt-5 max-w-2xl font-cg-soft text-lg leading-relaxed text-white/75">Elige el plan que mejor acompaña tu ritmo. Puedes sumar un masaje y pagar todo junto de forma segura.</p><a href="#planes" className="mt-8 inline-flex h-12 items-center rounded-full bg-white px-8 font-cg-mono text-xs uppercase tracking-[0.15em] text-[#222221]">Elegir mi plan</a></div>
      </section>

      {!isCartOpen && cartCount > 0 && <button type="button" onClick={() => setIsCartOpen(true)} className="fixed right-5 top-28 z-40 flex items-center gap-3 rounded-full bg-[#333D51] px-5 py-3 font-cg-mono text-xs uppercase tracking-[0.12em] text-white shadow-xl"><ShoppingBag className="h-4 w-4" />Carrito ({cartCount})</button>}
      <CartDrawer
        open={isCartOpen}
        checkoutId={checkoutId}
        plan={selectedPlan}
        massages={massageCart}
        suggestions={availableMassages}
        onClose={() => setIsCartOpen(false)}
        onRemovePlan={() => setSelectedPlan(null)}
        onAddMassage={addMassage}
        onQuantityChange={(key, quantity) => setMassageCart((current) => quantity <= 0 ? current.filter((item) => item.key !== key) : current.map((item) => item.key === key ? { ...item, quantity: Math.min(4, quantity) } : item))}
        onRemoveMassage={(key) => setMassageCart((current) => current.filter((item) => item.key !== key))}
      />
    </div>
  );
}
