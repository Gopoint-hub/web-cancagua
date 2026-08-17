import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock, Minus, Plus, ShieldCheck, Waves, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useServiceCart } from "@/components/ServiceCart";

export interface BiopoolCatalog {
  service: {
    id: number;
    slug: string;
    name: string;
    description: string | null;
    rulesUrl: string | null;
    capacity: number;
    standardDurationMinutes?: number;
    finalEntryDurationMinutes?: number;
  };
  tickets: Array<{ id: number; code: string; name: string; priceClp: number; minimumAge: number | null; maximumAge: number | null }>;
  images: Array<{ id: number; url: string; altText: string | null }>;
}

export interface BiopoolCatalogResponse extends BiopoolCatalog {
  services?: BiopoolCatalog[];
}

const formatPrice = (value: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);
const chileToday = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Santiago" });
const currentMonth = () => chileToday().slice(0, 7);

function shiftMonth(month: string, amount: number): string {
  const [year, monthNumber] = month.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, monthNumber - 1 + amount, 1));
  return `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, "0")}`;
}

function monthCells(month: string): Array<string | null> {
  const [year, monthNumber] = month.split("-").map(Number);
  const firstDay = new Date(Date.UTC(year, monthNumber - 1, 1));
  const leadingEmptyCells = (firstDay.getUTCDay() + 6) % 7;
  const totalDays = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  return [
    ...Array.from({ length: leadingEmptyCells }, () => null),
    ...Array.from({ length: totalDays }, (_, index) => `${month}-${String(index + 1).padStart(2, "0")}`),
  ];
}

function monthLabel(month: string): string {
  return new Intl.DateTimeFormat("es-CL", { month: "long", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${month}-01T12:00:00Z`));
}

function Quantity({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (value: number) => void }) {
  return <div className="flex items-center rounded-full border border-[#BCBAB8] bg-white">
    <button type="button" disabled={value <= min} onClick={() => onChange(value - 1)} className="p-2.5 disabled:opacity-30" aria-label="Restar"><Minus className="h-4 w-4" /></button>
    <span className="w-8 text-center font-cg-mono text-sm">{value}</span>
    <button type="button" disabled={value >= max} onClick={() => onChange(value + 1)} className="p-2.5 disabled:opacity-30" aria-label="Agregar"><Plus className="h-4 w-4" /></button>
  </div>;
}

export function BiopoolCart({ catalogs, initialServiceSlug, open, onOpen: _onOpen, onClose }: { catalogs: BiopoolCatalog[]; initialServiceSlug?: string; open: boolean; onOpen: () => void; onClose: () => void }) {
  const { addItem } = useServiceCart();
  const preferredCatalog = catalogs.find(item => item.service.slug === initialServiceSlug) ?? catalogs[0];
  const [selectedServiceId, setSelectedServiceId] = useState(preferredCatalog.service.id);
  const catalog = catalogs.find(item => item.service.id === selectedServiceId) ?? preferredCatalog;
  const adultTicket = catalog.tickets.find(ticket => ticket.code === "adult");
  const childTicket = catalog.tickets.find(ticket => ticket.code === "child");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [calendarMonth, setCalendarMonth] = useState(currentMonth());
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState<{ code: string; discountTotal: number; finalTotal: number } | null>(null);
  const [discountError, setDiscountError] = useState("");
  const totalGuests = adults + children;
  const maxGuests = catalog.service.capacity;
  const standardHours = (catalog.service.standardDurationMinutes ?? 240) / 60;
  const subtotal = adults * (adultTicket?.priceClp ?? 0) + children * (childTicket?.priceClp ?? 0);
  const total = discount?.finalTotal ?? subtotal;
  useEffect(() => {
    if (initialServiceSlug) {
      const requested = catalogs.find(item => item.service.slug === initialServiceSlug);
      if (requested) setSelectedServiceId(requested.service.id);
    }
  }, [catalogs, initialServiceSlug]);
  useEffect(() => {
    setCalendarMonth(currentMonth());
    setDate("");
    setStartTime("");
    if (!childTicket) setChildren(0);
    setDiscount(null);
    setDiscountError("");
  }, [catalog.service.id, childTicket]);
  const availableDates = trpc.biopools.public.availableDates.useQuery(
    { serviceId: catalog.service.id, month: calendarMonth, guestCount: totalGuests },
    { enabled: open, refetchInterval: 30_000 }
  );
  const availableDateSet = useMemo(
    () => new Set((availableDates.data?.dates ?? []) as string[]),
    [availableDates.data]
  );
  const calendarDays = useMemo(() => monthCells(calendarMonth), [calendarMonth]);
  useEffect(() => {
    if (!availableDates.isSuccess) return;
    const dates = (availableDates.data?.dates ?? []) as string[];
    if (date && date.startsWith(calendarMonth) && dates.includes(date)) return;
    setDate(dates[0] ?? "");
    setStartTime("");
  }, [availableDates.data, availableDates.isSuccess, calendarMonth, date]);
  const availability = trpc.biopools.public.availability.useQuery(
    { serviceId: catalog.service.id, date, guestCount: totalGuests },
    { enabled: open && Boolean(date), refetchInterval: 30_000 }
  );
  const slots = useMemo(() => (availability.data?.slots ?? []) as Array<{ startTime: string; endTime: string }>, [availability.data]);
  useEffect(() => {
    // React Query puede dejar los slots vacíos mientras actualiza cupos. En ese
    // intervalo no debemos reemplazar el horario que la persona ya eligió por
    // el primer horario del día.
    if (!availability.isSuccess || availability.isFetching) return;
    if (!slots.some(slot => slot.startTime === startTime)) setStartTime(slots[0]?.startTime ?? "");
  }, [availability.isFetching, availability.isSuccess, slots, startTime]);
  useEffect(() => {
    setDiscount(null);
    setDiscountError("");
  }, [adults, children]);

  const validateDiscount = trpc.biopools.public.validateDiscount.useMutation();
  const applyDiscount = () => {
    validateDiscount.mutate({ serviceId: catalog.service.id, adultQuantity: adults, childQuantity: children, code: discountCode }, {
      onSuccess: (result: any) => { setDiscount({ code: result.code, discountTotal: result.discountTotal, finalTotal: result.finalTotal }); setDiscountCode(result.code); setDiscountError(""); },
      onError: (error: any) => { setDiscount(null); setDiscountError(error.message || "El código no es válido"); },
    });
  };
  const pay = (event: FormEvent) => {
    event.preventDefault();
    if (availability.isFetching) return toast.error("Estamos confirmando la disponibilidad del horario elegido");
    if (!startTime) return toast.error("Selecciona un horario disponible");
    const selectedSlot = slots.find(slot => slot.startTime === startTime);
    if (!selectedSlot) return toast.error("El horario elegido dejó de estar disponible");
    addItem({
      module: "biopools",
      serviceId: catalog.service.id,
      serviceName: catalog.service.name,
      bookingDate: date,
      startTime,
      endTime: selectedSlot.endTime,
      adultQuantity: adults,
      childQuantity: children,
      discountCode: discount?.code,
      totalClp: total,
    });
    onClose();
    toast.success("Biopiscinas quedó guardado en tu carrito");
  };

  const changeMonth = (amount: number) => {
    const nextMonth = shiftMonth(calendarMonth, amount);
    if (nextMonth < currentMonth()) return;
    setCalendarMonth(nextMonth);
    setDate("");
    setStartTime("");
  };

  return <>
    <button type="button" aria-label="Cerrar carrito" onClick={onClose} className={`fixed inset-0 z-[70] bg-black/45 backdrop-blur-[2px] transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
    <aside role="dialog" aria-modal="true" aria-label="Carrito de Biopiscinas" className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-lg flex-col bg-[#F8F6F1] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-start justify-between border-b border-[#D7D4D1] p-6"><div><p className="font-cg-mono text-xs uppercase tracking-[0.16em] text-[#4B5872]">Configura tu visita</p><h2 className="mt-1 font-cg-serif text-3xl text-[#222221]">Biopiscinas</h2></div><button type="button" onClick={onClose} className="rounded-full border border-[#BCBAB8] p-2"><X className="h-5 w-5" /></button></div>
      <form onSubmit={pay} className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {catalogs.length > 1 && <section className="rounded-2xl border border-[#D7D4D1] bg-white p-5"><h3 className="font-cg-serif text-xl">Elige tu experiencia</h3><div className="mt-4 grid gap-3 sm:grid-cols-3">{catalogs.map(item => { const duration = (item.service.standardDurationMinutes ?? 240) / 60; const adult = item.tickets.find(ticket => ticket.code === "adult"); const selected = item.service.id === catalog.service.id; const label = item.service.slug === "full-day-biopiscinas" ? "Full Day" : item.service.slug === "late-hour-biopiscinas" ? "Late Hour" : item.service.slug === "biopiscinas-geotermales" ? "Biopiscinas" : item.service.name; return <button type="button" key={item.service.id} onClick={() => setSelectedServiceId(item.service.id)} className={`rounded-2xl border p-4 text-left transition ${selected ? "border-[#4B5872] bg-[#4B5872] text-white" : "border-[#D7D4D1] bg-[#F8F6F1] text-[#222221]"}`}><span className="block font-cg-serif text-lg">{label}</span><span className="mt-1 block font-cg-soft text-xs opacity-75">{Number.isInteger(duration) ? duration : duration.toFixed(1)} horas</span><span className="mt-2 block font-cg-mono text-sm">{formatPrice(adult?.priceClp ?? 0)}</span></button>; })}</div></section>}
          <section className="rounded-2xl border border-[#D7D4D1] bg-white p-5"><h3 className="flex items-center gap-2 font-cg-serif text-xl"><Waves className="h-5 w-5 text-[#4B5872]" />Entradas</h3>
            <div className="mt-4 flex items-center justify-between gap-4"><div><p className="font-cg-soft font-medium">{adultTicket?.name || "Adulto"}</p><p className="font-cg-soft text-sm text-[#635E5A]">Desde {adultTicket?.minimumAge ?? 13} años · {formatPrice(adultTicket?.priceClp ?? 0)}</p></div><Quantity value={adults} min={1} max={Math.max(1, maxGuests - children)} onChange={setAdults} /></div>
            {childTicket && <div className="mt-4 flex items-center justify-between gap-4 border-t pt-4"><div><p className="font-cg-soft font-medium">{childTicket.name}</p><p className="font-cg-soft text-sm text-[#635E5A]">{childTicket.minimumAge ?? 5} a {childTicket.maximumAge ?? 12} años · {formatPrice(childTicket.priceClp)} · siempre con un adulto</p></div><Quantity value={children} min={0} max={Math.max(0, maxGuests - adults)} onChange={setChildren} /></div>}
            {!childTicket && <p className="mt-4 border-t pt-4 font-cg-soft text-sm text-[#635E5A]">Modalidad exclusiva para mayores de 18 años.</p>}
          </section>
          <section className="rounded-2xl border border-[#D7D4D1] bg-white p-5"><h3 className="flex items-center gap-2 font-cg-serif text-xl"><CalendarDays className="h-5 w-5 text-[#4B5872]" />Fecha y hora</h3>
            <div className="mt-4 rounded-2xl border border-[#D7D4D1] bg-[#F8F6F1] p-3">
              <div className="flex items-center justify-between px-1 pb-3">
                <button type="button" aria-label="Mes anterior" disabled={calendarMonth <= currentMonth()} onClick={() => changeMonth(-1)} className="rounded-full p-2 text-[#4B5872] disabled:invisible"><ChevronLeft className="h-4 w-4" /></button>
                <p className="font-cg-soft text-sm font-semibold capitalize text-[#222221]">{monthLabel(calendarMonth)}</p>
                <button type="button" aria-label="Mes siguiente" onClick={() => changeMonth(1)} className="rounded-full p-2 text-[#4B5872]"><ChevronRight className="h-4 w-4" /></button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center font-cg-mono text-[10px] uppercase text-[#827D78]">{["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"].map(day => <span key={day} className="py-1">{day}</span>)}</div>
              <div className="mt-1 grid grid-cols-7 gap-1">{calendarDays.map((calendarDate, index) => calendarDate ? <button type="button" key={calendarDate} disabled={!availableDateSet.has(calendarDate)} onClick={() => { setDate(calendarDate); setStartTime(""); }} aria-label={`Seleccionar ${calendarDate}`} className={`aspect-square rounded-full font-cg-soft text-sm transition ${date === calendarDate ? "bg-[#4B5872] font-semibold text-white" : availableDateSet.has(calendarDate) ? "bg-white text-[#222221] shadow-sm hover:bg-[#E4E8EF]" : "cursor-not-allowed text-[#BCBAB8]"}`}>{Number(calendarDate.slice(-2))}</button> : <span key={`empty-${index}`} />)}</div>
              <p className="mt-3 text-center font-cg-soft text-xs text-[#827D78]">Elige uno de los días disponibles.</p>
            </div>
            {availableDates.isLoading ? <p className="mt-4 font-cg-soft text-sm text-[#635E5A]">Consultando fechas disponibles…</p> : !date ? <p className="mt-4 rounded-xl bg-amber-50 p-3 font-cg-soft text-sm text-amber-800">No hay fechas disponibles en este mes para la cantidad de personas seleccionada.</p> : availability.isLoading ? <p className="mt-4 font-cg-soft text-sm text-[#635E5A]">Consultando horarios…</p> : slots.length ? <div className="mt-4 grid grid-cols-2 gap-2">{slots.map(slot => <button type="button" key={slot.startTime} onClick={() => setStartTime(slot.startTime)} className={`rounded-xl border p-3 text-left ${startTime === slot.startTime ? "border-[#4B5872] bg-[#4B5872] text-white" : "border-[#D7D4D1]"}`}><span className="flex items-center gap-2 font-cg-mono text-sm"><Clock className="h-4 w-4" />{slot.startTime}</span><span className="mt-1 block font-cg-soft text-xs opacity-75">hasta {slot.endTime}</span></button>)}</div> : <p className="mt-4 rounded-xl bg-amber-50 p-3 font-cg-soft text-sm text-amber-800">No hay horarios disponibles para esta cantidad de personas.</p>}
          </section>
          <section className="rounded-2xl bg-[#E7EBE3] p-4"><ul className="space-y-2 font-cg-soft text-sm text-[#4D5148]"><li className="flex gap-2"><Check className="h-4 w-4 text-[#44580E]" />Estadía de {Number.isInteger(standardHours) ? standardHours : standardHours.toFixed(1)} horas según el horario elegido.</li><li className="flex gap-2"><Check className="h-4 w-4 text-[#44580E]" />Bata o toalla, gorra de nado y locker.</li><li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-[#44580E]" />Pago seguro mediante Transbank Webpay Plus.</li></ul></section>
        </div>
        <div className="border-t border-[#D7D4D1] bg-white p-6">
          <button type="button" onClick={() => setShowDiscount(value => !value)} className="mb-3 font-cg-soft text-sm font-medium text-[#4B5872] underline underline-offset-4">Aplicar código de descuento</button>
          {showDiscount && <div className="mb-4"><div className="flex gap-2"><input value={discountCode} onChange={event => { setDiscountCode(event.target.value.toUpperCase()); setDiscount(null); setDiscountError(""); }} placeholder="Ingresa tu código" className="min-w-0 flex-1 rounded-full border border-[#BCBAB8] px-4 py-2 font-cg-mono text-sm uppercase" /><Button type="button" variant="outline" className="rounded-full" disabled={!discountCode.trim() || validateDiscount.isPending} onClick={applyDiscount}>{validateDiscount.isPending ? "Validando…" : "Aplicar"}</Button></div>{discountError && <p className="mt-2 text-sm text-red-700">{discountError}</p>}{discount && <p className="mt-2 text-sm text-green-700">Código {discount.code} aplicado.</p>}</div>}
          <div className="flex items-end justify-between"><span className="font-cg-soft text-sm text-[#635E5A]">{totalGuests} entrada{totalGuests === 1 ? "" : "s"}</span><span className={discount ? "font-cg-mono text-sm text-[#827D78] line-through" : "font-cg-serif text-2xl"}>{formatPrice(subtotal)}</span></div>{discount && <><div className="mt-1 flex justify-between text-sm text-green-700"><span>Descuento</span><span>−{formatPrice(discount.discountTotal)}</span></div><div className="mt-2 flex justify-between border-t pt-2"><span>Total</span><span className="font-cg-serif text-2xl">{formatPrice(total)}</span></div></>}
          {date && startTime && <div className="mt-3 flex items-center justify-between rounded-xl bg-[#F4F2ED] px-4 py-3 font-cg-soft text-sm text-[#333D51]"><span>Fecha y hora elegidas</span><strong>{date} · {startTime}</strong></div>}
          <p className="mt-4 font-cg-soft text-xs leading-relaxed text-[#635E5A]">Al pagar aceptarás las <a href={catalog.service.rulesUrl || "#"} target="_blank" rel="noreferrer" className="underline">condiciones y el reglamento</a>. {childTicket ? "Los niños deben asistir acompañados por un adulto." : "Esta modalidad es exclusiva para mayores de 18 años."}</p>
          <Button type="submit" disabled={!startTime || availability.isFetching} className="mt-4 h-12 w-full rounded-full bg-[#4B5872] font-cg-mono text-sm uppercase tracking-[0.14em] hover:bg-[#333D51]">{availability.isFetching ? "Confirmando horario…" : `Agregar al carrito · ${formatPrice(total)}`}</Button><p className="mt-2 text-center font-cg-soft text-xs text-[#827D78]">Puedes seguir a Sauna: esta reserva permanecerá guardada en tu carrito.</p>
        </div>
      </form>
    </aside>
  </>;
}
