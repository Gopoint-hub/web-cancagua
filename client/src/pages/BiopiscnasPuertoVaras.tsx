import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Users, Waves, MessageCircle, Bus, MapPin, Car } from "lucide-react";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

const BOOKING_URL = "https://reservas.cancagua.cl/cancaguaspa/s/3daa00ec-4c8d-41d5-995a-79ad4cbd8380";
const WHATSAPP_URL = "https://wa.me/56940073999?text=Hola,%20quiero%20consultar%20sobre%20las%20Biopiscinas%20Geotermales";
const PHONE_NUMBER = "+56 9 4007 3999";

export default function BiopiscnasPuertoVaras() {
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
    "Alimentación (cafetería disponible en el lugar)",
  ];

  const comoLlegar = {
    puertoVaras: "30 minutos",
    puertoMontt: "40 minutos",
    osorno: "45 minutos",
    direccion: "Ruta V-155, Km 2, camino a Los Bajos, Frutillar"
  };

  const MAPS_URL = "https://maps.google.com/?q=-41.118242,-73.013595";

  return (
    <AutoTranslateProvider pageId="biopiscinas-puerto-varas">
      <main>
        {/* Hero */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <T>A 30 minutos de Puerto Varas</T>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <T>Biopiscinas Geotermales</T>
            </h1>
            <p className="text-lg md:text-2xl mb-8 max-w-3xl">
              <T>Vive una experiencia única en las primeras biopiscinas geotermales del mundo, a 30 minutos de Puerto Varas</T>
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-lg px-8 py-6">
                <T>Reservar Ahora</T>
              </Button>
            </a>
          </div>
        </section>

        {/* Distancias */}
        <section className="py-8 bg-primary/10 border-y border-primary/20">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Car className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold"><T>Desde Puerto Varas</T></h3>
                <p className="text-sm text-muted-foreground">{comoLlegar.puertoVaras}</p>
              </div>
              <div className="flex flex-col items-center">
                <Car className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold"><T>Desde Puerto Montt</T></h3>
                <p className="text-sm text-muted-foreground">{comoLlegar.puertoMontt}</p>
              </div>
              <div className="flex flex-col items-center">
                <Car className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold"><T>Desde Osorno</T></h3>
                <p className="text-sm text-muted-foreground">{comoLlegar.osorno}</p>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold"><T>Dónde estamos</T></h3>
                <p className="text-sm text-muted-foreground">{comoLlegar.direccion}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Descripción */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                <T>Una Experiencia Única desde Puerto Varas</T>
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-4">
                  <T>Si te hospedas en Puerto Varas, tienes las primeras biopiscinas geotermales del mundo a media hora de camino. Estamos en Frutillar, a orillas del Lago Llanquihue, y se llega fácil tanto en auto como en transporte público.</T>
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  <T>Las biopiscinas de Cancagua combinan la tecnología de purificación natural del agua con el calor geotérmico, creando un ecosistema acuático vivo que se mantiene entre 37º y 40º durante todo el año. A diferencia de las piscinas tradicionales, no utilizamos cloro ni químicos.</T>
                </p>
                <p className="text-lg leading-relaxed">
                  <T>Ubicadas a orillas del Lago Llanquihue y rodeadas de bosque nativo, ofrecen una experiencia de inmersión total en la naturaleza mientras disfrutas del calor terapéutico del agua geotérmica con vistas a los volcanes Osorno y Calbuco.</T>
                </p>
              </div>
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
                  <Car className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-lg mb-2"><T>Cerca de todo</T></h3>
                  <p className="text-muted-foreground">
                    <T>A 30 min de Puerto Varas y 40 de Puerto Montt</T>
                  </p>
                </CardContent>
              </Card>
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

        {/* Cómo llegar */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                <T>Cómo llegar</T>
              </h2>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Car className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg"><T>Si vienes en auto</T></h3>
                        <ul className="mt-2 space-y-1 text-muted-foreground">
                          <li><T>30 minutos desde Puerto Varas</T></li>
                          <li><T>40 minutos desde Puerto Montt</T></li>
                          <li><T>45 minutos desde Osorno</T></li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Bus className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg"><T>Si vienes en transporte público</T></h3>
                        <p className="mt-2 text-muted-foreground">
                          <T>Desde Puerto Varas, Puerto Montt u Osorno, toma un Thae Bus hasta Frutillar Alto y bájate en el Unimarc. Desde ahí, un colectivo te deja en Cancagua por $3.000 a $5.000. El mismo camino sirve para volver.</T>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg"><T>Dirección</T></h3>
                        <p className="text-muted-foreground">Ruta V-155, Km 2, camino a Los Bajos, Frutillar, Región de Los Lagos</p>
                        <a
                          href={MAPS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline text-sm"
                        >
                          <T>Abrir en Google Maps</T>
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
              <T>Reserva tu entrada y descubre las primeras biopiscinas geotermales del mundo, a 30 minutos de Puerto Varas</T>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <T>Reservar Ahora</T>
                </Button>
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary"
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
      </main>
    </AutoTranslateProvider>
  );
}
