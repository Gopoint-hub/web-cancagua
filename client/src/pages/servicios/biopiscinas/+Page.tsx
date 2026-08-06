import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Clock,
  Leaf,
  MessageCircle,
  Sparkles,
  ThermometerSun,
  Users,
  Waves,
} from "lucide-react";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";
import { BiopoolCart, type BiopoolCatalog, type BiopoolCatalogResponse } from "@/components/BiopoolCart";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const WHATSAPP_URL = "https://wa.me/56940073999?text=Hola,%20quiero%20consultar%20sobre%20las%20Biopiscinas%20Geotermales";
const PHONE_NUMBER = "+56 9 4007 3999";

const HERO_IMAGE = "https://res.cloudinary.com/dhuln9b1n/image/upload/f_auto,q_auto,w_2400/v1786051974/cancagua/images/biopiscinas/hero-amigas-2026.jpg";
const FOUR_HOURS_IMAGE = "https://res.cloudinary.com/dhuln9b1n/image/upload/f_auto,q_auto,w_1400/v1786052035/cancagua/images/biopiscinas/modalidad-4-horas-2026.jpg";
const FULL_DAY_IMAGE = "https://res.cloudinary.com/dhuln9b1n/image/upload/f_auto,q_auto,w_1400/v1786052110/cancagua/images/biopiscinas/modalidad-full-day-2026.jpg";
const UNIQUE_IMAGE = "https://res.cloudinary.com/dhuln9b1n/image/upload/f_auto,q_auto,w_1400/v1786052214/cancagua/images/biopiscinas/experiencia-unica-2026.jpg";
const BENEFITS_IMAGE = "https://res.cloudinary.com/dhuln9b1n/image/upload/f_auto,q_auto,w_1600/v1786051883/cancagua/images/biopiscinas/beneficios-amigas-2026.jpg";

const beneficios = [
  "Relaja la musculatura y alivia tensiones",
  "Favorece la circulación y el descanso",
  "Ayuda a reducir el estrés y la ansiedad",
  "Invita a una conexión profunda con la naturaleza",
];

const incluye = [
  "Acceso a biopiscinas geotermales",
  "Bata para adultos y toalla para niños",
  "Gorro de nado por persona",
  "Casillero de seguridad",
  "Duchas, vestuarios y zona de descanso",
  "Acceso a cafetería y borde del Lago Llanquihue",
];

const preparacion = [
  "Trae traje de baño y toalla de adulto, o arriéndala en recepción",
  "Edad mínima: 5 años, con control de esfínter y sin pañal",
  "No se permite ingresar alimentos externos",
  "Reserva con anticipación: trabajamos con cupos controlados",
];

export default function ServicioBiopiscinas() {
  const [cartOpen, setCartOpen] = useState(false);
  const [requestedServiceSlug, setRequestedServiceSlug] = useState("biopiscinas-geotermales");
  const catalogQuery = trpc.biopools.public.catalog.useQuery(undefined, {
    staleTime: 60_000,
    refetchInterval: 60_000,
    retry: 2,
  });
  const catalogResponse = catalogQuery.data as BiopoolCatalogResponse | undefined;
  const legacyCatalog = catalogResponse?.service ? catalogResponse as BiopoolCatalog : undefined;
  const catalogs = catalogResponse?.services?.length ? catalogResponse.services : legacyCatalog ? [legacyCatalog] : [];
  const catalog = catalogs.find(item => item.service.slug === "biopiscinas-geotermales") ?? catalogs[0];
  const fullDayCatalog = catalogs.find(item => item.service.slug === "full-day-biopiscinas");

  useEffect(() => {
    const isFullDay = new URLSearchParams(window.location.search).get("modalidad") === "full-day";
    setRequestedServiceSlug(isFullDay ? "full-day-biopiscinas" : "biopiscinas-geotermales");
    if (catalog && window.location.hash === "#reservar") setCartOpen(true);
  }, [catalog]);

  const openCart = (serviceSlug = "biopiscinas-geotermales") => {
    if (!catalog) {
      toast.error(catalogQuery.isLoading ? "Estamos cargando horarios y precios…" : "La venta de Biopiscinas no está disponible en este momento");
      return;
    }
    if (catalogs.some(item => item.service.slug === serviceSlug)) setRequestedServiceSlug(serviceSlug);
    setCartOpen(true);
  };

  const serviceName = (catalog?.service?.name || "Biopiscinas Geotermales")
    .replace(/\s*\(\s*estad[ií]a de 4 horas\s*\)\s*/i, "")
    .trim();

  return (
    <AutoTranslateProvider pageId="servicio-biopiscinas">
      <section className="relative min-h-[620px] overflow-hidden md:min-h-[720px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/65" />
        <div className="container relative flex min-h-[620px] items-end pb-16 text-white md:min-h-[720px] md:pb-24">
          <div className="max-w-4xl">
            <p className="font-cg-mono text-xs uppercase tracking-[0.24em] text-white/80">
              <T>Las primeras del mundo</T>
            </p>
            <h1 className="mt-4 font-cg-serif text-5xl font-light leading-[0.98] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              {serviceName}
            </h1>
            <p className="mt-6 max-w-2xl font-cg-soft text-lg leading-relaxed text-white/90 md:text-xl">
              <T>Aguas geotermales entre 37º y 40º, sin cloro y con vista al Lago Llanquihue. Una experiencia natural para detenerse, respirar y volver al cuerpo.</T>
            </p>
            <Button id="reservar" type="button" onClick={() => openCart()} size="lg" className="mt-8 rounded-full bg-white px-7 font-cg-mono uppercase tracking-[0.14em] text-[#333D51] hover:bg-[#F1E7D9]">
              <T>Reservar experiencia</T>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="border-b border-[#D7D4D1] bg-[#F8F6F1] py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-cg-mono text-xs uppercase tracking-[0.22em] text-[#4B5872]"><T>Elige tu ritmo</T></p>
            <h2 className="mt-4 font-cg-serif text-4xl font-light leading-tight text-[#222221] md:text-6xl">
              <T>Una experiencia, dos formas de vivirla</T>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl font-cg-soft text-lg leading-relaxed text-[#635E5A]">
              <T>Una pausa de medio día o una jornada completa. Ambas modalidades invitan a disfrutar las biopiscinas, el paisaje y los espacios de Cancagua sin apuro.</T>
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-2">
            <article className="group overflow-hidden rounded-[2rem] border border-[#D7D4D1] bg-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={FOUR_HOURS_IMAGE} alt="Dos personas disfrutando las biopiscinas geotermales frente al Lago Llanquihue" className="h-full w-full object-cover object-[center_45%] transition-transform duration-700 group-hover:scale-[1.03]" />
                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 font-cg-mono text-[11px] uppercase tracking-[0.16em] text-[#333D51]">
                  <T>4 horas</T>
                </span>
              </div>
              <div className="p-7 md:p-9">
                <p className="font-cg-mono text-xs uppercase tracking-[0.18em] text-[#4B5872]"><T>Una pausa reparadora</T></p>
                <h3 className="mt-3 font-cg-serif text-4xl font-light text-[#222221]"><T>Biopiscinas</T></h3>
                <p className="mt-4 font-cg-soft leading-relaxed text-[#635E5A]"><T>Cuatro horas para sumergirte en aguas cálidas, recorrer el entorno y disfrutar la cafetería frente al lago.</T></p>
                <button type="button" onClick={() => openCart("biopiscinas-geotermales")} className="mt-7 inline-flex items-center gap-2 border-b border-[#333D51] pb-1 font-cg-mono text-xs uppercase tracking-[0.14em] text-[#333D51]">
                  <T>Elegir 4 horas</T><ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>

            <article className="group overflow-hidden rounded-[2rem] bg-[#333D51] text-white">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={FULL_DAY_IMAGE} alt="Experiencia Full Day en Cancagua" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <span className="absolute left-5 top-5 rounded-full bg-[#333D51]/95 px-4 py-2 font-cg-mono text-[11px] uppercase tracking-[0.16em] text-white">
                  <T>8 horas</T>
                </span>
              </div>
              <div className="p-7 md:p-9">
                <p className="font-cg-mono text-xs uppercase tracking-[0.18em] text-[#D3BC8D]"><T>El día completo</T></p>
                <h3 className="mt-3 font-cg-serif text-4xl font-light"><T>Full Day Biopiscinas</T></h3>
                <p className="mt-4 font-cg-soft leading-relaxed text-white/75"><T>Ocho horas para vivir Cancagua con calma, alternando aguas geotermales, descanso y naturaleza durante toda la jornada.</T></p>
                <button type="button" disabled={!fullDayCatalog} onClick={() => openCart("full-day-biopiscinas")} className="mt-7 inline-flex items-center gap-2 border-b border-white/70 pb-1 font-cg-mono text-xs uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-50">
                  <T>Elegir Full Day</T><ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-20 md:py-32">
        <div className="container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="font-cg-mono text-xs uppercase tracking-[0.22em] text-[#4B5872]"><T>Una experiencia única en el mundo</T></p>
            <h2 className="mt-4 font-cg-serif text-4xl font-light leading-tight text-[#222221] md:text-6xl">
              <T>Agua viva, calor geotérmico y naturaleza</T>
            </h2>
            <p className="mt-7 font-cg-soft text-lg leading-relaxed text-[#635E5A]">
              <T>Las biopiscinas de Cancagua combinan purificación biológica y calor geotérmico. El agua se mantiene naturalmente entre 37º y 40º, sin cloro ni químicos tradicionales.</T>
            </p>
            <p className="mt-4 font-cg-soft text-lg leading-relaxed text-[#635E5A]">
              <T>A orillas del Lago Llanquihue y rodeadas de vegetación nativa, ofrecen una alternativa distinta a las termas cerca de Frutillar y Puerto Varas: cupos controlados, silencio y una inmersión real en el paisaje.</T>
            </p>
          </div>
          <div className="relative">
            <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-[#D3BC8D]/30 md:-left-9 md:-top-9 md:h-36 md:w-36" />
            <img src={UNIQUE_IMAGE} alt="Visitante recorriendo las biopiscinas frente al Lago Llanquihue" className="relative mx-auto aspect-[3/4] max-h-[760px] w-full rounded-[2rem] object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[#F1E7D9] py-14 md:py-20">
        <div className="container grid gap-px overflow-hidden rounded-[2rem] border border-[#D3BC8D]/60 bg-[#D3BC8D]/60 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ThermometerSun, title: "37º–40º", text: "Temperatura confortable durante todo el año" },
            { icon: Leaf, title: "Sin cloro", text: "Purificación biológica y un ecosistema vivo" },
            { icon: Waves, title: "Frente al lago", text: "Una experiencia inmersa en el paisaje del sur" },
            { icon: Users, title: "Cupos controlados", text: "Un ambiente tranquilo para disfrutar sin apuro" },
          ].map(({ icon: Icon, title, text }) => (
            <article key={title} className="bg-[#F8F6F1] p-7 md:p-9">
              <Icon className="h-7 w-7 stroke-[1.4] text-[#4B5872]" />
              <h3 className="mt-6 font-cg-serif text-2xl font-light text-[#222221]"><T>{title}</T></h3>
              <p className="mt-2 font-cg-soft text-sm leading-relaxed text-[#635E5A]"><T>{text}</T></p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#333D51] py-20 text-white md:py-28">
        <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="overflow-hidden rounded-[2rem]">
            <img src={BENEFITS_IMAGE} alt="Grupo de amigas descansando en las biopiscinas" className="aspect-[4/3] h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-cg-mono text-xs uppercase tracking-[0.22em] text-[#D3BC8D]"><T>Bienestar que se siente</T></p>
            <h2 className="mt-4 font-cg-serif text-4xl font-light leading-tight md:text-6xl"><T>El cuerpo baja el ritmo</T></h2>
            <p className="mt-6 max-w-xl font-cg-soft text-lg leading-relaxed text-white/75"><T>El calor del agua y la pausa en la naturaleza crean las condiciones para descansar de verdad.</T></p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {beneficios.map(beneficio => (
                <div key={beneficio} className="flex items-start gap-3 border-t border-white/15 pt-4">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 stroke-[1.4] text-[#D3BC8D]" />
                  <span className="font-cg-soft leading-relaxed text-white/85"><T>{beneficio}</T></span>
                </div>
              ))}
            </div>
            <Button type="button" onClick={() => openCart()} className="mt-10 rounded-full bg-white px-7 font-cg-mono uppercase tracking-[0.14em] text-[#333D51] hover:bg-[#F1E7D9]">
              <T>Ver fechas disponibles</T><ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F6F1] py-20 md:py-28">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-cg-mono text-xs uppercase tracking-[0.22em] text-[#4B5872]"><T>Tu visita, clara desde el comienzo</T></p>
            <h2 className="mt-4 font-cg-serif text-4xl font-light text-[#222221] md:text-6xl"><T>Todo lo necesario para disfrutar</T></h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl overflow-hidden rounded-[2rem] border border-[#D7D4D1] bg-white lg:grid-cols-2">
            <div className="p-7 md:p-10 lg:border-r lg:border-[#D7D4D1]">
              <div className="flex items-center gap-3">
                <Check className="h-6 w-6 text-[#4B5872]" />
                <h3 className="font-cg-serif text-3xl font-light text-[#222221]"><T>Tu entrada incluye</T></h3>
              </div>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {incluye.map(item => (
                  <li key={item} className="flex items-start gap-3 font-cg-soft leading-relaxed text-[#635E5A]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D3BC8D]" />
                    <T>{item}</T>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#D7D4D1] bg-[#F1E7D9]/60 p-7 md:p-10 lg:border-t-0">
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-[#4B5872]" />
                <h3 className="font-cg-serif text-3xl font-light text-[#222221]"><T>Antes de venir</T></h3>
              </div>
              <div className="mt-7 rounded-2xl border border-[#D3BC8D] bg-white/75 p-5">
                <p className="font-cg-mono text-[11px] uppercase tracking-[0.14em] text-[#4B5872]"><T>Importante para cuidar el agua</T></p>
                <p className="mt-2 font-cg-soft leading-relaxed text-[#4B4642]"><T>No se permite ingresar con bloqueador solar aplicado, porque altera el ecosistema natural de las biopiscinas.</T></p>
              </div>
              <ul className="mt-6 space-y-4">
                {preparacion.map(item => (
                  <li key={item} className="flex items-start gap-3 font-cg-soft leading-relaxed text-[#635E5A]">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 stroke-[1.5] text-[#4B5872]" />
                    <T>{item}</T>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#222A39] py-20 text-white md:py-28">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]" />
        <div className="container relative text-center">
          <p className="font-cg-mono text-xs uppercase tracking-[0.22em] text-[#D3BC8D]"><T>Tu pausa comienza aquí</T></p>
          <h2 className="mx-auto mt-4 max-w-3xl font-cg-serif text-4xl font-light leading-tight md:text-6xl"><T>Reserva tu experiencia en las biopiscinas</T></h2>
          <p className="mx-auto mt-5 max-w-2xl font-cg-soft text-lg leading-relaxed text-white/70"><T>Elige la modalidad que mejor se ajuste a tu día y descubre una forma distinta de vivir el agua, el calor y la naturaleza.</T></p>
          <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
            <Button type="button" onClick={() => openCart()} size="lg" className="rounded-full bg-white px-8 font-cg-mono uppercase tracking-[0.14em] text-[#333D51] hover:bg-[#F1E7D9]">
              <T>Reservar ahora</T><ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="w-full rounded-full border-white/60 bg-transparent px-8 font-cg-mono uppercase tracking-[0.14em] text-white hover:bg-white hover:text-[#333D51]">
                <MessageCircle className="mr-2 h-5 w-5" /><T>Consultar por WhatsApp</T>
              </Button>
            </a>
          </div>
          <p className="mt-7 font-cg-soft text-sm text-white/60"><T>También puedes llamarnos al</T> <a href={`tel:${PHONE_NUMBER.replace(/\s/g, "")}`} className="underline underline-offset-4">{PHONE_NUMBER}</a></p>
        </div>
      </section>

      {catalog && <BiopoolCart catalogs={catalogs} initialServiceSlug={requestedServiceSlug} open={cartOpen} onOpen={() => setCartOpen(true)} onClose={() => setCartOpen(false)} />}
    </AutoTranslateProvider>
  );
}
