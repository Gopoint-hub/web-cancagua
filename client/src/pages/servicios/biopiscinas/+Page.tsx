import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Users, Waves, MessageCircle } from "lucide-react";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";
import { BiopoolCart, type BiopoolCatalog, type BiopoolCatalogResponse } from "@/components/BiopoolCart";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const WHATSAPP_URL = "https://wa.me/56940073999?text=Hola,%20quiero%20consultar%20sobre%20las%20Biopiscinas%20Geotermales";
const PHONE_NUMBER = "+56 9 4007 3999";

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
  const heroImage = catalog?.images?.[0]?.url || "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp";
  const serviceName = (catalog?.service?.name || "Biopiscinas Geotermales")
    .replace(/\s*\(\s*estad[ií]a de 4 horas\s*\)\s*/i, "")
    .trim();
  const beneficios = [
    "Relajación muscular profunda",
    "Mejora la circulación sanguínea",
    "Reduce el estrés y la ansiedad",
    "Desintoxicación natural del cuerpo",
    "Alivio de dolores articulares",
    "Mejora la calidad del sueño",
    "Fortalece el sistema inmunológico",
    "Conexión con la naturaleza",
  ];

  const incluye = [
    "4 horas de acceso a biopiscinas geotermales",
    "Batas para adultos",
    "Gorro de nado por persona",
    "Toallas para niños",
    "Casilleros de seguridad",
    "Duchas y vestuarios",
    "Acceso a zona de descanso",
    "Vista panorámica al Lago Llanquihue",
  ];

  const noIncluye = [
    "Toallas para adultos (traer propia o arriendo disponible)",
  ];

  return (
    <AutoTranslateProvider pageId="servicio-biopiscinas">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
          <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <T>Primeras del Mundo</T>
          </div>
          <h1 className="font-cg-serif mb-4 text-4xl font-light tracking-[-0.02em] md:text-6xl lg:text-7xl">
            {serviceName}
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-3xl">
            <T>Cuatro horas de experiencia natural a 37º-40º: una alternativa a las termas cerca de Frutillar y Puerto Varas, sin cloro y con vista al Lago Llanquihue</T>
          </p>
          <Button id="reservar" type="button" onClick={() => openCart()} size="lg" className="font-cg-mono tracking-wider text-lg px-8 py-6">
            <T>Reservar Ahora</T>
          </Button>
        </div>
      </section>

      {/* Modalidades */}
      <section className="border-b border-[#D7D4D1] bg-[#F8F6F1] py-16 md:py-20">
        <div className="container">
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-cg-mono text-xs uppercase tracking-[0.2em] text-[#4B5872]">
              <T>Elige tu ritmo</T>
            </p>
            <h2 className="mt-3 font-cg-serif text-3xl font-light text-[#222221] md:text-5xl">
              <T>Una experiencia, dos formas de vivirla</T>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl font-cg-soft text-lg leading-relaxed text-[#635E5A]">
              <T>Puedes elegir una estadía de 4 horas o un Full Day de 8 horas. En verano, disfruta de la playa a orillas del Lago Llanquihue; en invierno, aprovecha los beneficios del bosque esclerófilo que rodea Cancagua.</T>
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
            <article className="flex flex-col rounded-3xl border border-[#D7D4D1] bg-white p-7 shadow-sm">
              <p className="font-cg-mono text-xs uppercase tracking-[0.16em] text-[#4B5872]">
                <T>Estadía de 4 horas</T>
              </p>
              <h3 className="mt-3 font-cg-serif text-3xl text-[#222221]">
                <T>Biopiscinas</T>
              </h3>
              <p className="mt-3 flex-1 font-cg-soft leading-relaxed text-[#635E5A]">
                <T>Una pausa de medio día para disfrutar las aguas geotermales, la cafetería y el entorno natural.</T>
              </p>
              <Button type="button" onClick={() => openCart("biopiscinas-geotermales")} className="mt-7 rounded-full bg-[#4B5872] font-cg-mono uppercase tracking-[0.12em] hover:bg-[#333D51]">
                <T>Elegir 4 horas</T>
              </Button>
            </article>

            <article className="flex flex-col rounded-3xl border border-[#4B5872] bg-[#4B5872] p-7 text-white shadow-sm">
              <p className="font-cg-mono text-xs uppercase tracking-[0.16em] text-white/75">
                <T>Estadía de 8 horas</T>
              </p>
              <h3 className="mt-3 font-cg-serif text-3xl">
                <T>Full Day Biopiscinas</T>
              </h3>
              <p className="mt-3 flex-1 font-cg-soft leading-relaxed text-white/80">
                <T>Un día completo para vivir Cancagua sin apuros y conectar con cada estación del paisaje.</T>
              </p>
              <Button type="button" disabled={!fullDayCatalog} onClick={() => openCart("full-day-biopiscinas")} className="mt-7 rounded-full bg-white font-cg-mono uppercase tracking-[0.12em] text-[#333D51] hover:bg-[#F4F2ED]">
                <T>Elegir Full Day</T>
              </Button>
            </article>
          </div>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              <T>Una Experiencia Única en el Mundo</T>
            </h2>
            {catalog?.service.description ? (
              <div className="prose prose-lg max-w-none whitespace-pre-line text-lg leading-relaxed text-muted-foreground">
                {catalog.service.description}
              </div>
            ) : (
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-4">
                <T>Las biopiscinas de Cancagua son las primeras en su tipo a nivel mundial. Combinan la tecnología de purificación natural del agua con el calor geotérmico, creando un ecosistema acuático vivo que se mantiene entre 37º y 40º durante todo el año.</T>
              </p>
              <p className="text-lg leading-relaxed mb-4">
                <T>A diferencia de las piscinas tradicionales, nuestras biopiscinas no utilizan cloro ni químicos. El agua se purifica naturalmente a través de plantas acuáticas y microorganismos beneficiosos, creando un ambiente completamente natural y saludable para tu piel.</T>
              </p>
              <p className="text-lg leading-relaxed mb-4">
                <T>Ubicadas a orillas del Lago Llanquihue y rodeadas de bosque nativo, ofrecen una experiencia de inmersión total en la naturaleza mientras disfrutas del calor terapéutico del agua geotérmica.</T>
              </p>
              <p className="text-lg leading-relaxed">
                <T>Para quienes buscan termas cerca de Frutillar, Cancagua propone una experiencia distinta: biopiscinas naturales sin cloro, temperatura confortable todo el año y cupos controlados para mantener un ambiente tranquilo.</T>
              </p>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            <T>Características</T>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Waves className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2"><T>Agua Geotérmica</T></h3>
                <p className="text-muted-foreground">
                  <T>Temperatura constante de 37º-40º todo el año</T>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2"><T>4 Horas</T></h3>
                <p className="text-muted-foreground">
                  <T>Tiempo suficiente para relajarte completamente</T>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2"><T>Grupos Pequeños</T></h3>
                <p className="text-muted-foreground">
                  <T>Ambiente tranquilo y exclusivo</T>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Check className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2"><T>100% Natural</T></h3>
                <p className="text-muted-foreground">
                  <T>Sin cloro ni químicos, purificación biológica</T>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Beneficios e Incluye */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                <T>Beneficios Terapéuticos</T>
              </h2>
              <ul className="space-y-3">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground"><T>{beneficio}</T></span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                <T>La Experiencia Incluye</T>
              </h2>
              <ul className="space-y-3">
                {incluye.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground"><T>{item}</T></span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 bg-clay-100 border border-clay-200 rounded-lg">
                <h3 className="font-semibold text-clay-800 mb-2"><T>No Incluye</T></h3>
                <ul className="space-y-2">
                  {noIncluye.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-clay-700">
                      <span className="text-clay-500">•</span>
                      <span><T>{item}</T></span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <h3 className="font-semibold text-lg mb-2">
                  <T>Antes de tu Visita</T>
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">⚠️</span>
                    <span><T>No se permite el acceso con bloqueador solar - Para mantener el ecosistema natural de las biopiscinas</T></span>
                  </li>
                  <li><T>• Reserva con anticipación (cupos limitados)</T></li>
                  <li><T>• Edad mínima: 5 años con control de esfínter y sin pañal</T></li>
                  <li><T>• Traer traje de baño</T></li>
                  <li><T>• No se permite el ingreso con alimentos externos</T></li>
                  <li><T>• Cafetería disponible en el lugar</T></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <T>¿Listo para vivir esta experiencia única?</T>
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            <T>Reserva tu entrada y descubre por qué somos las primeras biopiscinas geotermales del mundo</T>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button type="button" onClick={() => openCart()} size="lg" variant="secondary" className="font-cg-mono tracking-wider text-lg px-8">
              <T>Reservar Ahora</T>
            </Button>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="font-cg-mono tracking-wider text-lg px-8 border-white text-white hover:bg-white hover:text-primary"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                <T>Consultar Disponibilidad</T>
              </Button>
            </a>
          </div>
          <p className="mt-6 text-sm opacity-75">
            <T>¿Dudas? Llámanos al</T> <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="underline">{PHONE_NUMBER}</a>
          </p>
        </div>
      </section>
      {catalog && <BiopoolCart catalogs={catalogs} initialServiceSlug={requestedServiceSlug} open={cartOpen} onOpen={() => setCartOpen(true)} onClose={() => setCartOpen(false)} />}
    </AutoTranslateProvider>
  );
}
