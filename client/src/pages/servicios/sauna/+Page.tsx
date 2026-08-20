import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, Clock, Droplets, Flame, Heart, ShieldCheck, Sparkles, Users, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { SaunaBookingDrawer, type SaunaCatalogService } from "@/components/SaunaBookingDrawer";
import { toast } from "sonner";

const HERO_IMAGE = "/images/reels/sauna-nativo.jpg";
const DETAIL_IMAGE = "/images/pase-reconecta-sauna.png";
const formatPrice = (value: number) => new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 }).format(value);

const benefits = [
  { icon: Flame, title: "Calor profundo", text: "Una pausa de temperatura envolvente que ayuda a soltar la tensión muscular." },
  { icon: Heart, title: "Ritmo más lento", text: "El cuerpo encuentra un espacio protegido para descansar y volver a sí mismo." },
  { icon: Wind, title: "Respiración consciente", text: "Silencio, madera y paisaje para acompañar una hora sin interrupciones." },
  { icon: Droplets, title: "Frente al lago", text: "La salida directa al Lago Llanquihue completa una experiencia muy del sur." },
];

export default function Page() {
  const catalog = trpc.sauna.public.catalog.useQuery(undefined, { staleTime: 60_000, refetchInterval: 60_000, retry: 2 });
  const data = catalog.data as { checkoutEnabled: boolean; services: SaunaCatalogService[]; capacity: number; policies: { bookingLeadHours: number } } | undefined;
  const services = useMemo(() => data?.services ?? [], [data]);
  const publicServices = useMemo(() => services.filter(service => service.partySize >= 1 && service.partySize <= 3).sort((a, b) => a.partySize - b.partySize), [services]);
  const privateServices = useMemo(() => services.filter(service => service.partySize >= 4 && service.partySize <= 6).sort((a, b) => a.partySize - b.partySize), [services]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPurchaseKey, setSelectedPurchaseKey] = useState("");
  const [publicPartySize, setPublicPartySize] = useState(1);
  const [privatePartySize, setPrivatePartySize] = useState(4);
  const publicSelection = publicServices.find(service => service.partySize === publicPartySize) ?? publicServices[0];
  const privateSelection = privateServices.find(service => service.partySize === privatePartySize) ?? privateServices[0];

  useEffect(() => {
    if (!selectedPurchaseKey && services[0]) setSelectedPurchaseKey(services[0].purchaseKey);
    if (services.length && window.location.hash === "#opciones") document.getElementById("opciones")?.scrollIntoView({ behavior: "smooth" });
  }, [selectedPurchaseKey, services]);

  const select = (service: SaunaCatalogService) => {
    if (!data?.checkoutEnabled) return toast.error("La venta online de Sauna está siendo habilitada. Intenta nuevamente en unos minutos.");
    setSelectedPurchaseKey(service.purchaseKey);
    setDrawerOpen(true);
  };

  return <div className="min-h-screen bg-[#F8F6F1]">
    <section className="relative min-h-[650px] overflow-hidden md:min-h-[760px]">
      <img src={HERO_IMAGE} alt="Interior del Sauna Nativo de Cancagua con vista al Lago Llanquihue" className="absolute inset-0 h-full w-full object-cover object-[center_58%] md:object-[center_62%]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/30 to-[#1E1A17]/80" />
      <div className="container relative flex min-h-[650px] items-end pb-16 text-white md:min-h-[760px] md:pb-24">
        <div className="max-w-3xl">
          <p className="font-cg-mono text-xs uppercase tracking-[0.24em] text-[#F1D6B8]">Calor, madera y Lago Llanquihue</p>
          <h1 className="mt-4 font-cg-serif text-6xl font-light leading-[0.95] tracking-[-0.035em] md:text-8xl">Sauna Nativo</h1>
          <p className="mt-6 max-w-2xl font-cg-soft text-lg leading-relaxed text-white/90 md:text-xl">Una hora de calor envolvente a orillas del lago. Elige cuántas personas vienen, encuentra tu horario y agrega la sesión al mismo carrito de tus Biopiscinas.</p>
          <Button asChild size="lg" className="mt-8 rounded-full bg-white px-7 font-cg-mono uppercase tracking-[0.14em] text-[#5A3323] hover:bg-[#F1E7D9]"><a href="#opciones">Ver fechas y horarios<ArrowRight className="ml-2 h-4 w-4" /></a></Button>
        </div>
      </div>
    </section>

    <section className="border-b border-[#D7D4D1] bg-[#8A4B2F] py-5 text-white"><div className="container flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left"><div><p className="font-cg-mono text-[11px] uppercase tracking-[0.18em] text-[#F1D6B8]">Reserva online</p><p className="mt-1 font-cg-serif text-2xl font-light">Sesiones de 60 minutos · inicios de 10:00 a 20:00</p></div><span className="inline-flex items-center gap-2 rounded-full border border-white/35 px-4 py-2 font-cg-soft text-sm"><ShieldCheck className="h-4 w-4" />Reserva segura en línea</span></div></section>

    <section id="opciones" className="bg-[#F8F6F1] py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center"><p className="font-cg-mono text-xs uppercase tracking-[0.22em] text-[#8A5A3B]">Elige tu experiencia</p><h2 className="mt-4 font-cg-serif text-4xl font-light text-[#222221] md:text-6xl">¿Cuántas personas vienen?</h2><p className="mx-auto mt-5 max-w-2xl font-cg-soft text-lg leading-relaxed text-[#635E5A]">Para grupos de 1 a 3 personas se comparte el aforo. Desde 4 personas, el sauna queda reservado de forma privada para tu grupo.</p></div>
        {catalog.isLoading ? <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-[#D7D4D1] bg-white p-10 text-center font-cg-soft text-[#635E5A]">Cargando opciones, precios y disponibilidad…</div> : catalog.isError || !publicSelection || !privateSelection ? <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-amber-200 bg-amber-50 p-10 text-center font-cg-soft text-amber-900">La agenda de Sauna no está disponible en este momento. Escríbenos por WhatsApp para ayudarte.</div> : <div className="mx-auto mt-12 grid max-w-5xl gap-7 lg:grid-cols-2">
          <article className="group overflow-hidden rounded-[2rem] border border-[#D7D4D1] bg-white shadow-[0_4px_6px_rgba(0,0,0,0.04),0_10px_18px_rgba(0,0,0,0.05)] transition hover:-translate-y-1">
            <div className="relative aspect-[5/3] overflow-hidden"><img src={HERO_IMAGE} alt="Sauna público de Cancagua" className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" /><span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 font-cg-mono text-[10px] uppercase tracking-[0.16em] text-[#5A3323]">Aforo compartido</span></div>
            <div className="p-7"><p className="font-cg-mono text-[10px] uppercase tracking-[0.18em] text-[#8A5A3B]">Formato compartido</p><h3 className="mt-2 font-cg-serif text-4xl font-light text-[#222221]">Sauna público</h3><p className="mt-3 font-cg-soft leading-relaxed text-[#635E5A]">Para 1, 2 o 3 personas. La sesión comparte el aforo total del sauna.</p><div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-5"><label className="block"><span className="font-cg-mono text-[10px] uppercase tracking-[0.14em] text-[#635E5A]">Cantidad de personas</span><select value={publicPartySize} onChange={event => setPublicPartySize(Number(event.target.value))} className="mt-2 h-12 w-full rounded-full border border-[#BCBAB8] bg-[#F8F6F1] px-5 font-cg-soft text-[#222221] outline-none focus:border-[#8A5A3B]">{publicServices.map(service => <option key={service.purchaseKey} value={service.partySize}>{service.partySize} persona{service.partySize === 1 ? "" : "s"}</option>)}</select></label><div className="pb-2 text-right"><span className="block font-cg-mono text-[10px] uppercase tracking-[0.14em] text-[#827D78]">Valor</span><strong className="font-cg-serif text-3xl font-light text-[#5A3323]">{formatPrice(publicSelection.priceClp)}</strong></div></div><div className="mt-5 flex items-center gap-2 font-cg-soft text-sm text-[#635E5A]"><Clock className="h-4 w-4" />60 minutos</div><Button type="button" onClick={() => select(publicSelection)} disabled={!data?.checkoutEnabled} className="mt-6 h-11 w-full rounded-full bg-[#8A4B2F] font-cg-mono text-xs uppercase tracking-[0.14em] text-white hover:bg-[#6F3B26] disabled:opacity-55">{data?.checkoutEnabled ? "Elegir fecha y hora" : "Venta en activación"}</Button></div>
          </article>
          <article className="group overflow-hidden rounded-[2rem] border border-[#B77754] bg-white shadow-[0_4px_6px_rgba(0,0,0,0.04),0_10px_18px_rgba(0,0,0,0.05)] transition hover:-translate-y-1">
            <div className="relative aspect-[5/3] overflow-hidden"><img src={DETAIL_IMAGE} alt="Sauna privado de Cancagua" className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-[1.02]" /><div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" /><span className="absolute left-5 top-5 rounded-full bg-[#8A4B2F] px-4 py-2 font-cg-mono text-[10px] uppercase tracking-[0.16em] text-white">Sólo para tu grupo</span></div>
            <div className="p-7"><p className="font-cg-mono text-[10px] uppercase tracking-[0.18em] text-[#8A5A3B]">Formato privado</p><h3 className="mt-2 font-cg-serif text-4xl font-light text-[#222221]">Sauna privado</h3><p className="mt-3 font-cg-soft leading-relaxed text-[#635E5A]">Para 4, 5 o 6 personas. El sauna queda reservado exclusivamente para tu grupo.</p><div className="mt-6 grid grid-cols-[1fr_auto] items-end gap-5"><label className="block"><span className="font-cg-mono text-[10px] uppercase tracking-[0.14em] text-[#635E5A]">Cantidad de personas</span><select value={privatePartySize} onChange={event => setPrivatePartySize(Number(event.target.value))} className="mt-2 h-12 w-full rounded-full border border-[#BCBAB8] bg-[#F8F6F1] px-5 font-cg-soft text-[#222221] outline-none focus:border-[#8A5A3B]">{privateServices.map(service => <option key={service.purchaseKey} value={service.partySize}>{service.partySize} personas</option>)}</select></label><div className="pb-2 text-right"><span className="block font-cg-mono text-[10px] uppercase tracking-[0.14em] text-[#827D78]">Valor</span><strong className="font-cg-serif text-3xl font-light text-[#5A3323]">{formatPrice(privateSelection.priceClp)}</strong></div></div><div className="mt-5 flex items-center gap-2 font-cg-soft text-sm text-[#635E5A]"><Clock className="h-4 w-4" />60 minutos</div><Button type="button" onClick={() => select(privateSelection)} disabled={!data?.checkoutEnabled} className="mt-6 h-11 w-full rounded-full bg-[#8A4B2F] font-cg-mono text-xs uppercase tracking-[0.14em] text-white hover:bg-[#6F3B26] disabled:opacity-55">{data?.checkoutEnabled ? "Elegir fecha y hora" : "Venta en activación"}</Button></div>
          </article>
        </div>}
      </div>
    </section>

    <section className="overflow-hidden bg-white py-20 md:py-28"><div className="container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"><div><p className="font-cg-mono text-xs uppercase tracking-[0.22em] text-[#8A5A3B]">Una experiencia arraigada al lugar</p><h2 className="mt-4 font-cg-serif text-4xl font-light leading-tight text-[#222221] md:text-6xl">El calor adentro. El lago, al abrir la puerta.</h2><p className="mt-6 font-cg-soft text-lg leading-relaxed text-[#635E5A]">El Sauna Nativo está construido en madera y se abre directamente hacia la orilla del Lago Llanquihue. Cada sesión dura una hora y trabaja con un aforo máximo de seis personas.</p><ul className="mt-8 space-y-3 font-cg-soft text-[#4D5148]">{["Llega con 15 minutos de anticipación", "Trae traje de baño e hidrátate antes y después", "Puedes arrendar bata y toalla en recepción", "Si tienes una condición cardiovascular o estás embarazada, consulta antes con tu médico"].map(item => <li key={item} className="flex items-start gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-[#8A5A3B]" />{item}</li>)}</ul></div><div className="relative"><div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-[#D3BC8D]/30" /><img src={DETAIL_IMAGE} alt="Detalle interior del Sauna Nativo mirando hacia el Lago Llanquihue" className="relative aspect-[3/4] w-full rounded-[2rem] object-cover" /></div></div></section>

    <section className="bg-[#2F2925] py-20 text-white md:py-28"><div className="container"><div className="mx-auto max-w-3xl text-center"><p className="font-cg-mono text-xs uppercase tracking-[0.22em] text-[#D3BC8D]">Bienestar que se siente</p><h2 className="mt-4 font-cg-serif text-4xl font-light md:text-6xl">Una hora para bajar el ritmo</h2></div><div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] bg-white/15 sm:grid-cols-2 lg:grid-cols-4">{benefits.map(({ icon: Icon, title, text }) => <article key={title} className="bg-[#382F2A] p-8"><Icon className="h-7 w-7 stroke-[1.4] text-[#D3BC8D]" /><h3 className="mt-6 font-cg-serif text-2xl font-light">{title}</h3><p className="mt-3 font-cg-soft text-sm leading-relaxed text-white/70">{text}</p></article>)}</div></div></section>

    <section className="bg-[#F1E7D9] py-20"><div className="container text-center"><Sparkles className="mx-auto h-8 w-8 text-[#8A5A3B]" /><h2 className="mt-5 font-cg-serif text-4xl font-light text-[#222221] md:text-5xl">Arma tu pausa completa</h2><p className="mx-auto mt-4 max-w-2xl font-cg-soft text-lg text-[#635E5A]">Agrega Sauna y Biopiscinas al mismo carrito. Cada experiencia conserva su propia fecha y horario, y pagas todo junto en una sola compra.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button type="button" onClick={() => publicSelection && select(publicSelection)} className="rounded-full bg-[#8A4B2F] px-7 font-cg-mono uppercase tracking-[0.14em] text-white hover:bg-[#6F3B26]">Reservar Sauna</Button><Button asChild variant="outline" className="rounded-full border-[#4B5872] px-7 font-cg-mono uppercase tracking-[0.14em] text-[#333D51]"><a href="/servicios/biopiscinas#reservar">Agregar Biopiscinas</a></Button></div></div></section>

    {services.length > 0 && <SaunaBookingDrawer services={services} selectedPurchaseKey={selectedPurchaseKey || services[0].purchaseKey} open={drawerOpen} onClose={() => setDrawerOpen(false)} />}
  </div>;
}
