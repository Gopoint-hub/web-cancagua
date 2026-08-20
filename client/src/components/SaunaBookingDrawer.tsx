import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Check, ChevronLeft, ChevronRight, Clock, Flame, ShieldCheck, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useServiceCart } from "@/components/ServiceCart";
import { toast } from "sonner";

export type SaunaCatalogService = {
  id: number;
  purchaseKey: string;
  name: string;
  kind: "shared" | "private";
  partySize: number;
  capacityUsed: number;
  priceClp: number;
  durationMinutes: number;
  fixedPartySize: boolean;
};

const chileToday = () => new Date().toLocaleDateString("en-CA", { timeZone: "America/Santiago" });
const currentMonth = () => chileToday().slice(0, 7);
const formatPrice = (value: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

function shiftMonth(month: string, amount: number) {
  const [year, monthNumber] = month.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, monthNumber - 1 + amount, 1));
  return `${shifted.getUTCFullYear()}-${String(shifted.getUTCMonth() + 1).padStart(2, "0")}`;
}
function monthCells(month: string): Array<string | null> {
  const [year, monthNumber] = month.split("-").map(Number);
  const first = new Date(Date.UTC(year, monthNumber - 1, 1));
  const empty = (first.getUTCDay() + 6) % 7;
  const days = new Date(Date.UTC(year, monthNumber, 0)).getUTCDate();
  return [...Array.from({ length: empty }, () => null), ...Array.from({ length: days }, (_, index) => `${month}-${String(index + 1).padStart(2, "0")}`)];
}
function monthLabel(month: string) {
  return new Intl.DateTimeFormat("es-CL", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${month}-01T12:00:00Z`));
}

export function SaunaBookingDrawer({ services, selectedPurchaseKey, open, onClose }: { services: SaunaCatalogService[]; selectedPurchaseKey: string; open: boolean; onClose: () => void }) {
  const { addItem, items } = useServiceCart();
  // Si ya hay un servicio en el carrito, se asume que viene el mismo día: no
  // tiene sentido volver a preguntárselo. Si esa fecha no tuviera cupo para
  // sauna, el efecto de más abajo la corrige sola por la primera disponible.
  const fechaEnCarrito = items.find(item => item.module === "biopools" || item.module === "sauna")?.bookingDate ?? "";
  const selected = services.find(service => service.purchaseKey === selectedPurchaseKey) ?? services[0];
  const [month, setMonth] = useState(fechaEnCarrito ? fechaEnCarrito.slice(0, 7) : currentMonth());
  const [date, setDate] = useState(fechaEnCarrito);
  const [startTime, setStartTime] = useState("");
  const isPrivate = selected?.kind === "private" || selected?.partySize >= 4;
  const guests = selected?.partySize ?? 1;
  const availableDates = trpc.sauna.public.availableDates.useQuery({ serviceId: selected?.id ?? 0, month }, { enabled: open && Boolean(selected), refetchInterval: 30_000 });
  const availableDateSet = useMemo(() => new Set((availableDates.data?.dates ?? []) as string[]), [availableDates.data]);
  const cells = useMemo(() => monthCells(month), [month]);
  const availability = trpc.sauna.public.availability.useQuery({ serviceId: selected?.id ?? 0, date }, { enabled: open && Boolean(selected && date), refetchInterval: 30_000 });
  const slots = useMemo(() => ((availability.data?.slots ?? []) as Array<{ startTime: string; endTime: string }>).filter(slot => slot.startTime >= "10:00" && slot.startTime <= "20:00"), [availability.data]);

  useEffect(() => {
    setMonth(fechaEnCarrito ? fechaEnCarrito.slice(0, 7) : currentMonth());
    setDate(fechaEnCarrito);
    setStartTime("");
  }, [selected?.purchaseKey, fechaEnCarrito]);
  useEffect(() => {
    if (!availableDates.isSuccess) return;
    const dates = (availableDates.data?.dates ?? []) as string[];
    if (!date || !dates.includes(date)) {
      setDate(dates[0] ?? "");
      setStartTime("");
    }
  }, [availableDates.data, availableDates.isSuccess, date]);
  useEffect(() => {
    if (!availability.isSuccess || availability.isFetching) return;
    if (!slots.some(slot => slot.startTime === startTime)) setStartTime(slots[0]?.startTime ?? "");
  }, [availability.isFetching, availability.isSuccess, slots, startTime]);

  if (!selected) return null;
  const selectedSlot = slots.find(slot => slot.startTime === startTime);
  const add = () => {
    if (!date || !selectedSlot) return toast.error("Selecciona una fecha y un horario disponible");
    addItem({
      module: "sauna",
      serviceId: selected.id,
      serviceName: selected.partySize >= 4 ? `Sauna Nativo privado · ${selected.partySize} personas` : selected.name,
      bookingDate: date,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      privateGuestCount: isPrivate ? selected.partySize : undefined,
      guests,
      totalClp: selected.priceClp,
    });
    onClose();
    toast.success("Sauna quedó guardado en tu carrito");
  };
  const changeMonth = (amount: number) => {
    const next = shiftMonth(month, amount);
    if (next < currentMonth()) return;
    setMonth(next);
    setDate("");
    setStartTime("");
  };

  return <>
    <button type="button" aria-label="Cerrar selector de Sauna" onClick={onClose} className={`fixed inset-0 z-[70] bg-black/45 backdrop-blur-[2px] transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`} />
    <aside role="dialog" aria-modal="true" aria-label="Seleccionar horario de Sauna" className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-lg flex-col bg-[#F8F6F1] shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-start justify-between border-b border-[#D7D4D1] p-6"><div><p className="font-cg-mono text-xs uppercase tracking-[0.16em] text-[#8A5A3B]">Una hora frente al lago</p><h2 className="mt-1 font-cg-serif text-3xl text-[#222221]">{selected.partySize >= 4 ? `Sauna privado · ${selected.partySize}` : selected.name}</h2></div><button type="button" onClick={onClose} className="rounded-full border border-[#BCBAB8] p-2"><X className="h-5 w-5" /></button></div>
      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        <section className="rounded-[1.5rem] bg-[#8A4B2F] p-5 text-white"><div className="flex items-center justify-between"><span className="flex items-center gap-2 font-cg-soft"><Users className="h-5 w-5" />{guests} persona{guests === 1 ? "" : "s"}</span><strong className="font-cg-serif text-3xl font-light">{formatPrice(selected.priceClp)}</strong></div><p className="mt-3 font-cg-soft text-sm text-white/75">{isPrivate ? "El sauna queda reservado sólo para tu grupo." : "La sesión comparte el aforo total de 6 personas."}</p></section>
        <section className="rounded-[1.5rem] border border-[#D7D4D1] bg-white p-5"><h3 className="flex items-center gap-2 font-cg-serif text-xl"><CalendarDays className="h-5 w-5 text-[#8A5A3B]" />Elige tu fecha</h3>
          <div className="mt-4 rounded-2xl border border-[#D7D4D1] bg-[#F8F6F1] p-3"><div className="flex items-center justify-between px-1 pb-3"><button type="button" aria-label="Mes anterior" disabled={month <= currentMonth()} onClick={() => changeMonth(-1)} className="rounded-full p-2 text-[#4B5872] disabled:invisible"><ChevronLeft className="h-4 w-4" /></button><p className="font-cg-soft text-sm font-semibold capitalize">{monthLabel(month)}</p><button type="button" aria-label="Mes siguiente" onClick={() => changeMonth(1)} className="rounded-full p-2 text-[#4B5872]"><ChevronRight className="h-4 w-4" /></button></div><div className="grid grid-cols-7 gap-1 text-center font-cg-mono text-[10px] uppercase text-[#827D78]">{["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"].map(day => <span key={day} className="py-1">{day}</span>)}</div><div className="mt-1 grid grid-cols-7 gap-1">{cells.map((calendarDate, index) => calendarDate ? <button type="button" key={calendarDate} disabled={!availableDateSet.has(calendarDate)} onClick={() => { setDate(calendarDate); setStartTime(""); }} className={`aspect-square rounded-full font-cg-soft text-sm ${date === calendarDate ? "bg-[#8A5A3B] font-semibold text-white" : availableDateSet.has(calendarDate) ? "bg-white text-[#222221] shadow-sm hover:bg-[#F1E7D9]" : "cursor-not-allowed text-[#BCBAB8]"}`}>{Number(calendarDate.slice(-2))}</button> : <span key={`empty-${index}`} />)}</div></div>
          {availableDates.isLoading ? <p className="mt-4 font-cg-soft text-sm text-[#635E5A]">Consultando fechas disponibles…</p> : !date ? <p className="mt-4 rounded-xl bg-amber-50 p-3 font-cg-soft text-sm text-amber-800">No hay fechas disponibles en este mes para esta opción.</p> : availability.isLoading ? <p className="mt-4 font-cg-soft text-sm text-[#635E5A]">Consultando horarios…</p> : slots.length ? <div className="mt-4 grid grid-cols-2 gap-2">{slots.map(slot => <button type="button" key={slot.startTime} onClick={() => setStartTime(slot.startTime)} className={`rounded-xl border p-3 text-left ${startTime === slot.startTime ? "border-[#8A5A3B] bg-[#8A5A3B] text-white" : "border-[#D7D4D1]"}`}><span className="flex items-center gap-2 font-cg-mono text-sm"><Clock className="h-4 w-4" />{slot.startTime}</span><span className="mt-1 block font-cg-soft text-xs opacity-75">hasta {slot.endTime}</span></button>)}</div> : <p className="mt-4 rounded-xl bg-amber-50 p-3 font-cg-soft text-sm text-amber-800">No quedan horarios disponibles para esta fecha.</p>}
        </section>
        <section className="rounded-[1.5rem] bg-[#E7EBE3] p-5"><ul className="space-y-2 font-cg-soft text-sm text-[#4D5148]"><li className="flex gap-2"><Check className="h-4 w-4 text-[#44580E]" />Sesión de 60 minutos.</li><li className="flex gap-2"><Flame className="h-4 w-4 text-[#8A5A3B]" />Horarios disponibles entre 10:00 y 20:00.</li><li className="flex gap-2"><ShieldCheck className="h-4 w-4 text-[#44580E]" />El cupo se valida nuevamente antes de pagar.</li></ul></section>
      </div>
      <div className="border-t border-[#D7D4D1] bg-white p-6"><div className="flex items-center justify-between"><span className="font-cg-soft text-sm text-[#635E5A]">Total Sauna</span><strong className="font-cg-serif text-3xl font-light">{formatPrice(selected.priceClp)}</strong></div><Button type="button" onClick={add} disabled={!selectedSlot || availability.isFetching} className="mt-4 h-12 w-full rounded-full bg-[#8A5A3B] font-cg-mono uppercase tracking-[0.14em] text-white hover:bg-[#6F3B26]">Agregar al carrito</Button><p className="mt-2 text-center font-cg-soft text-xs text-[#827D78]">Tu Biopiscina seguirá guardada si ya la agregaste.</p></div>
    </aside>
  </>;
}
