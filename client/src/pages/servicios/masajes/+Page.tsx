import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles, Heart, Leaf, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { toast } from "sonner";

const CMS_MASSAGE_CATALOG_URL = "https://cms.cancagua.cl/api/public/masajes/techniques";
const FALLBACK_IMAGE = "/images/masajes-hero-cancagua.jpg";

interface MassagePrice {
  duration: number;
  price: number | null;
}

interface MassageTechnique {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  durations: number[];
  prices: MassagePrice[];
  bookingUrl: string;
}

interface MassageCartItem {
  key: string;
  techniqueId: number;
  techniqueName: string;
  duration: number;
  price: number;
  quantity: number;
}

const beneficios = [
  {
    title: "Regulación del sistema nervioso por inmersión sensorial real",
    description: "El sonido del bosque y el aire puro potencian el efecto del masaje: mientras las manos liberan tensión muscular, el entorno natural regula tu sistema nervioso desde el primer minuto."
  },
  {
    title: "Desconexión sin esfuerzo",
    description: "No tienes que esforzarte por desconectar: el bosque hace ese trabajo por ti. Solo debes llegar y dejar que el cuerpo se rinda."
  },
  {
    title: "Un ritual, no un trámite",
    description: "Cada sesión ocurre en un espacio diseñado para el ritual, no para la eficiencia: sin apuro, sin ruido urbano, con el bosque nativo como única referencia de tiempo."
  },
  {
    title: "El paisaje como parte activa de la recuperación del cuerpo",
    description: "Volcán Calbuco, Lago Llanquihue y bosque nativo no son el paisaje de fondo: son parte del tratamiento. La vista, el aire y el silencio trabajan junto con cada técnica manual."
  }
];

function formatPrice(price?: number | null) {
  if (!price) return "Consultar";
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(price);
}

function getPriceForDuration(technique: MassageTechnique, duration: number) {
  return technique.prices.find((price) => price.duration === duration)?.price ?? null;
}

function MassageTechniqueCard({ technique, onAdd }: {
  technique: MassageTechnique;
  onAdd: (technique: MassageTechnique, duration: number) => void;
}) {
  const defaultDuration = technique.durations[0] ?? technique.prices[0]?.duration;
  const [selectedDuration, setSelectedDuration] = useState<number | undefined>(defaultDuration);
  const selectedPrice = selectedDuration ? getPriceForDuration(technique, selectedDuration) : technique.prices[0]?.price;

  return (
    <article className="group flex h-full flex-col rounded-lg border border-[#DBD3CC] bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 shrink-0 overflow-hidden rounded-md bg-[#222221]">
        <img
          src={technique.imageUrl || FALLBACK_IMAGE}
          alt={technique.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/65" />
        <h3 className="absolute bottom-5 left-5 right-5 font-cg-serif text-xl font-normal leading-[1.12] tracking-[-0.01em] text-white md:text-2xl">
          {technique.name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-cg-sans text-base leading-relaxed text-[#635E5A]">
          {technique.description || "Sesión terapéutica diseñada para renovar el cuerpo y relajar la mente en un entorno natural."}
        </p>

        <div className="mt-6">
          <p className="mb-3 font-cg-mono text-xs uppercase tracking-wider text-[#222221]/70">
            Duraciones disponibles
          </p>
          <div className="flex flex-wrap gap-2">
            {technique.durations.map((duration) => (
              <button
                type="button"
                key={duration}
                onClick={() => setSelectedDuration(duration)}
                className={`rounded-full border px-4 py-2 font-cg-mono text-xs uppercase tracking-wider outline-none transition-colors ${
                  selectedDuration === duration
                    ? "border-[#4B5872] bg-[#4B5872] text-[#FCF9F9]"
                    : "border-[#AD9A8A] bg-transparent text-[#635E5A] hover:bg-[#AD9A8A] hover:text-white"
                }`}
                aria-pressed={selectedDuration === duration}
              >
                <Clock className="mr-1 inline h-3 w-3" />
                {duration} min
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <span className="font-cg-mono text-2xl font-medium leading-none text-[#222221]">
            {formatPrice(selectedPrice)}
          </span>
          <Button
            type="button"
            onClick={() => selectedDuration && onAdd(technique, selectedDuration)}
            disabled={!selectedDuration || !selectedPrice}
            className="shrink-0 rounded-full bg-[#4B5872] px-6 font-cg-mono text-sm uppercase tracking-wider text-[#FCF9F9] hover:bg-[#333D51]"
          >
            Agregar
          </Button>
        </div>
      </div>
    </article>
  );
}

function MassageCartDrawer({
  items,
  open,
  onClose,
  onQuantityChange,
  onRemove,
}: {
  items: MassageCartItem[];
  open: boolean;
  onClose: () => void;
  onQuantityChange: (key: string, quantity: number) => void;
  onRemove: (key: string) => void;
}) {
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState<{ code: string; discountTotal: number; finalTotal: number } | null>(null);
  const [discountError, setDiscountError] = useState("");
  const [isValidatingDiscount, setIsValidatingDiscount] = useState(false);
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    setDiscount(null);
    setDiscountError("");
  }, [items]);

  const applyDiscount = async () => {
    setIsValidatingDiscount(true);
    setDiscountError("");
    try {
      const response = await fetch("https://cms.cancagua.cl/api/public/masajes/discount/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: discountCode,
          items: items.map(({ techniqueId, duration, quantity }) => ({ techniqueId, duration, quantity })),
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

  const handleBooking = () => {
    const cart = items.map(({ techniqueId, duration, quantity }) => ({ techniqueId, duration, quantity }));
    const params = new URLSearchParams({ cart: JSON.stringify(cart) });
    if (discount?.code) params.set("discount", discount.code);
    window.location.href = `https://cms.cancagua.cl/reservar/masajes?${params.toString()}`;
  };

  return (
    <>
      <button
        type="button"
        aria-label="Cerrar carrito"
        onClick={onClose}
        className={`fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px] transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de masajes"
        className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-[#FCF9F9] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-[#D7D4D1] px-6 py-5">
          <div>
            <p className="font-cg-mono text-xs tracking-[0.16em] text-[#635E5A]">TU SELECCIÓN</p>
            <h2 className="mt-1 font-cg-serif text-3xl font-normal text-[#222221]">Carrito de masajes</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-[#635E5A] hover:bg-[#F4F2ED]" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-[#635E5A]">
              <ShoppingBag className="mb-4 h-8 w-8" />
              <p className="font-cg-soft">Aún no has agregado masajes.</p>
            </div>
          ) : items.map((item) => (
            <article key={item.key} className="rounded-lg border border-[#D7D4D1] bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-cg-serif text-xl leading-tight text-[#222221]">{item.techniqueName}</h3>
                  <p className="mt-1 font-cg-soft text-sm text-[#635E5A]">{item.duration} minutos · {formatPrice(item.price)} c/u</p>
                </div>
                <button type="button" onClick={() => onRemove(item.key)} className="p-1 text-[#827D78] hover:text-red-700" aria-label={`Eliminar ${item.techniqueName}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span className="font-cg-soft text-sm text-[#635E5A]">Cantidad</span>
                <div className="flex items-center rounded-full border border-[#BCBAB8]">
                  <button type="button" onClick={() => onQuantityChange(item.key, item.quantity - 1)} className="p-2" aria-label="Restar uno">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-cg-mono text-sm">{item.quantity}</span>
                  <button type="button" disabled={item.quantity >= 4} onClick={() => onQuantityChange(item.key, item.quantity + 1)} className="p-2 disabled:cursor-not-allowed disabled:opacity-30" aria-label="Agregar uno">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              {item.quantity === 4 && <p className="mt-3 text-right font-cg-soft text-xs text-[#745D49]">Máximo 4 en un mismo horario</p>}
            </article>
          ))}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#D7D4D1] bg-white p-6">
            <button type="button" onClick={() => setShowDiscount((value) => !value)} className="mb-4 font-cg-soft text-sm font-medium text-[#4B5872] underline underline-offset-4">
              ¿Tienes un código de descuento?
            </button>
            {showDiscount && (
              <div className="mb-4">
                <div className="flex gap-2">
                  <input value={discountCode} onChange={(event) => { setDiscountCode(event.target.value.toUpperCase()); setDiscount(null); setDiscountError(""); }} placeholder="Ingresa tu código" className="min-w-0 flex-1 rounded-full border border-[#BCBAB8] bg-white px-4 py-2 font-cg-mono text-sm uppercase outline-none focus:border-[#4B5872]" />
                  <Button type="button" variant="outline" onClick={applyDiscount} disabled={!discountCode.trim() || isValidatingDiscount} className="rounded-full">
                    {isValidatingDiscount ? "Validando…" : "Aplicar"}
                  </Button>
                </div>
                {discountError && <p className="mt-2 font-cg-soft text-sm text-red-700">{discountError}</p>}
                {discount && <p className="mt-2 font-cg-soft text-sm text-green-700">Código {discount.code} aplicado correctamente.</p>}
              </div>
            )}
            <div className="mb-1 flex items-end justify-between">
              <span className="font-cg-soft text-sm text-[#635E5A]">{totalUnits} masaje{totalUnits === 1 ? "" : "s"}</span>
              <span className={discount ? "font-cg-mono text-sm text-[#827D78] line-through" : "font-cg-serif text-2xl text-[#222221]"}>{formatPrice(total)}</span>
            </div>
            {discount && <><div className="flex justify-between font-cg-soft text-sm text-green-700"><span>Descuento</span><span>−{formatPrice(discount.discountTotal)}</span></div><div className="mb-4 mt-2 flex justify-between border-t border-[#D7D4D1] pt-2"><span className="font-cg-soft text-sm text-[#635E5A]">Total</span><span className="font-cg-serif text-2xl text-[#222221]">{formatPrice(discount.finalTotal)}</span></div></>}
            <Button type="button" onClick={handleBooking} className="h-12 w-full rounded-full bg-[#4B5872] font-cg-mono text-sm uppercase tracking-[0.14em] text-white hover:bg-[#333D51]">
              Reservar y elegir horarios
            </Button>
            <p className="mt-3 text-center font-cg-soft text-xs leading-relaxed text-[#827D78]">En el siguiente paso podrás asignar fecha y hora a cada selección.</p>
          </div>
        )}
      </aside>
    </>
  );
}

export default function Page() {
  const [techniques, setTechniques] = useState<MassageTechnique[]>([]);
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true);
  const [catalogError, setCatalogError] = useState(false);
  const [cart, setCart] = useState<MassageCartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (technique: MassageTechnique, duration: number) => {
    const price = getPriceForDuration(technique, duration);
    if (!price) {
      toast.error("Esta duración no tiene un precio disponible.");
      return;
    }
    setCart((current) => {
      const availableLine = current.find((item) => item.techniqueId === technique.id && item.duration === duration && item.quantity < 4);
      if (availableLine) {
        return current.map((item) => item.key === availableLine.key ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, {
        key: `${technique.id}-${duration}-${Date.now()}`,
        techniqueId: technique.id,
        techniqueName: technique.name,
        duration,
        price,
        quantity: 1,
      }];
    });
    setIsCartOpen(true);
    toast.success("Masaje agregado al carrito", { position: "top-center" });
  };

  useEffect(() => {
    let cancelled = false;

    fetch(CMS_MASSAGE_CATALOG_URL, { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(`CMS catalog error ${res.status}`);
        return res.json();
      })
      .then((data: { techniques?: MassageTechnique[] }) => {
        if (!cancelled) setTechniques(data.techniques ?? []);
      })
      .catch((error) => {
        console.error("[Masajes] Error cargando catálogo CMS:", error);
        if (!cancelled) setCatalogError(true);
      })
      .finally(() => {
        if (!cancelled) setIsLoadingCatalog(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleTechniques = useMemo(
    () => techniques.filter((technique) => technique.durations.length > 0),
    [techniques]
  );

  return (
    <div className="min-h-screen bg-[#F4F2ED]">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src={FALLBACK_IMAGE}
            alt="Masajes Cancagua"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="mb-4 font-cg-serif text-5xl font-light tracking-wide md:text-7xl">
            Masajes & Terapias
          </h1>
          <p className="max-w-2xl font-cg-soft text-xl font-light leading-relaxed tracking-normal md:text-2xl">
            Descubre nuestras sesiones de renovación y descanso en un ambiente armónico y natural
          </p>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl text-center">
          <p className="mb-6 font-cg-sans text-lg leading-relaxed text-[#635E5A]">
            Tu bienestar es nuestro compromiso. Tenemos diversos tipos de masajes diseñados para renovar tu cuerpo y mente en un entorno natural único.
          </p>
          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            <div className="flex items-center gap-2 text-[#4B5872]">
              <Sparkles className="h-5 w-5" />
              <span className="font-cg-sans text-sm text-[#635E5A]">Ambiente relajante</span>
            </div>
            <div className="flex items-center gap-2 text-[#4B5872]">
              <Heart className="h-5 w-5" />
              <span className="font-cg-sans text-sm text-[#635E5A]">Terapeutas certificados</span>
            </div>
            <div className="flex items-center gap-2 text-[#4B5872]">
              <Leaf className="h-5 w-5" />
              <span className="font-cg-sans text-sm text-[#635E5A]">Productos naturales</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Servicios */}
      <section id="tecnicas" className="py-20 bg-[#F4F2ED]">
        <div className="container max-w-6xl">
          <h2 className="mb-4 text-center font-cg-serif text-4xl font-normal tracking-[-0.01em] text-[#222221] md:text-5xl">
            Selecciona tu experiencia
          </h2>
          <p className="mb-12 text-center font-cg-sans text-[#635E5A]">
            Elige el masaje que mejor se adapte a tus necesidades
          </p>

          {isLoadingCatalog ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-[500px] animate-pulse rounded-lg bg-white/70" />
              ))}
            </div>
          ) : catalogError || visibleTechniques.length === 0 ? (
            <div className="rounded-lg bg-white p-10 text-center font-cg-sans text-[#635E5A]">
              Estamos actualizando la disponibilidad de masajes. Escríbenos y te ayudamos a reservar.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {visibleTechniques.map((technique) => (
                <MassageTechniqueCard key={technique.id} technique={technique} onAdd={addToCart} />
              ))}
            </div>
          )}
        </div>
      </section>

      {!isCartOpen && cart.length > 0 && (
        <button type="button" onClick={() => setIsCartOpen(true)} className="fixed right-5 top-28 z-40 flex items-center gap-3 rounded-full bg-[#333D51] px-5 py-3 font-cg-mono text-xs uppercase tracking-[0.12em] text-white shadow-xl hover:bg-[#1B212D]">
          <ShoppingBag className="h-4 w-4" />
          Carrito ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      )}

      <MassageCartDrawer
        items={cart}
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onQuantityChange={(key, quantity) => setCart((current) => quantity <= 0 ? current.filter((item) => item.key !== key) : current.map((item) => item.key === key ? { ...item, quantity: Math.min(4, quantity) } : item))}
        onRemove={(key) => setCart((current) => current.filter((item) => item.key !== key))}
      />

      {/* Galería */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="mb-12 text-center font-cg-serif text-3xl font-normal tracking-[-0.01em] text-[#222221] md:text-4xl">
            Nuestro espacio
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <img
              src={FALLBACK_IMAGE}
              alt="Masaje relajante"
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
            <img
              src="/images/masajes/espacio-exterior.jpg"
              alt="Exterior del espacio de masajes rodeado de bosque"
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
            <img
              src="/images/masajes/sala-espera.jpg"
              alt="Sala de espera del espacio de masajes"
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-[#222221] py-20 text-white md:py-24">
        <div className="container max-w-6xl">
          <h2 className="mb-12 text-center font-cg-serif text-3xl font-normal tracking-[-0.01em] md:mb-16 md:text-5xl">
            Beneficios de nuestros masajes
          </h2>
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 md:grid-cols-2">
            {beneficios.map((beneficio, index) => (
              <article key={beneficio.title} className="flex min-h-72 flex-col bg-[#222221] p-7 md:p-10">
                <span className="mb-8 font-cg-mono text-sm tracking-[0.18em] text-sage-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-5 max-w-xl font-cg-serif text-2xl font-normal leading-tight tracking-[-0.01em] text-[#F4F2ED] md:text-3xl">
                  {beneficio.title}
                </h3>
                <p className="mt-auto max-w-xl font-cg-soft text-base leading-relaxed text-white/75 md:text-lg">
                  {beneficio.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Puerto Varas */}
      <section className="py-12 bg-gradient-to-r from-[#324853] to-[#496674]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-cg-mono text-sm uppercase tracking-wider text-white/80">
                  También en Puerto Varas
                </span>
              </div>
              <h3 className="mb-2 font-cg-mono text-2xl font-normal tracking-wide text-white md:text-3xl">
                Spa en Hotel Cabañas del Lago
              </h3>
              <p className="max-w-lg font-cg-sans text-white/80">
                Disfruta de nuestros masajes en el corazón de Puerto Varas.
              </p>
            </div>
            <a href="/spa-hotel-cabanas-del-lago">
              <Button
                size="lg"
                className="whitespace-nowrap bg-white px-8 py-6 font-cg-mono uppercase tracking-wider text-[#324853] hover:bg-white/90"
              >
                VER SERVICIOS EN PUERTO VARAS
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-[#F4F2ED]">
        <div className="container text-center">
          <h2 className="mb-6 font-cg-mono text-3xl font-light tracking-wide text-[#222221] md:text-4xl">
            Regálate un momento de bienestar
          </h2>
          <p className="mx-auto mb-8 max-w-2xl font-cg-sans text-lg leading-relaxed text-[#635E5A]">
            Elige tu técnica y reserva tu sesión de masaje en línea.
          </p>
          <a href="#tecnicas">
            <Button
              size="lg"
              className="bg-[#4B5872] px-12 py-6 font-cg-mono text-lg uppercase tracking-wider text-[#FCF9F9] hover:bg-[#333D51]"
            >
              VER TÉCNICAS →
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
