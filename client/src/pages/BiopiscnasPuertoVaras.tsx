import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Users, Waves, MessageCircle, Bus, MapPin, Calendar } from "lucide-react";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

const BOOKING_URL = "https://reservas.cancagua.cl/cancaguaspa/s/80aa8817-d08d-4db4-a4cd-1ca089b568e9";
const WHATSAPP_URL = "https://wa.me/56940073999?text=Hola,%20quiero%20consultar%20sobre%20las%20Biopiscinas%20con%20traslado%20desde%20Puerto%20Varas";
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
    "Traslado ida y vuelta desde Hotel Cabañas del Lago, Puerto Varas",
    "4 horas de acceso a biopiscinas geotermales",
    "Batas para adultos",
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

  const horarios = {
    salida: "10:00 hrs",
    regreso: "15:00 hrs",
    dias: "Martes a Domingo",
    punto: "Hotel Cabañas del Lago, Puerto Varas"
  };

  return (
    <AutoTranslateProvider pageId="biopiscinas-puerto-varas">
      <main>
        {/* Hero */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/fullday-biopiscinas-hero.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <T>Traslado Incluido desde Puerto Varas</T>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <T>Biopiscinas Geotermales</T>
            </h1>
            <p className="text-lg md:text-2xl mb-8 max-w-3xl">
              <T>Vive una experiencia única en las primeras biopiscinas geotermales del mundo con traslado incluido desde Puerto Varas</T>
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="text-lg px-8 py-6">
                <T>Reservar Ahora</T>
              </Button>
            </a>
          </div>
        </section>

        {/* Info Traslado */}
        <section className="py-8 bg-primary/10 border-y border-primary/20">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold"><T>Punto de Encuentro</T></h3>
                <p className="text-sm text-muted-foreground">{horarios.punto}</p>
              </div>
              <div className="flex flex-col items-center">
                <Bus className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold"><T>Salida</T></h3>
                <p className="text-sm text-muted-foreground">{horarios.salida}</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold"><T>Regreso</T></h3>
                <p className="text-sm text-muted-foreground">{horarios.regreso}</p>
              </div>
              <div className="flex flex-col items-center">
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold"><T>Días Disponibles</T></h3>
                <p className="text-sm text-muted-foreground">{horarios.dias}</p>
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
                  <T>Si te hospedas en Puerto Varas, ahora puedes disfrutar de las primeras biopiscinas geotermales del mundo sin preocuparte por el transporte. Te recogemos directamente en el Hotel Cabañas del Lago y te llevamos a vivir una experiencia inolvidable en Cancagua, Frutillar.</T>
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
                  <Bus className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-lg mb-2"><T>Traslado Incluido</T></h3>
                  <p className="text-muted-foreground">
                    <T>Ida y vuelta desde Puerto Varas</T>
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

                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <h3 className="font-semibold text-amber-800 mb-2"><T>No Incluye</T></h3>
                  <ul className="space-y-2">
                    {noIncluye.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-amber-700">
                        <span className="text-amber-500">•</span>
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
                    <li><T>• Estar en el punto de encuentro 10 minutos antes de la salida</T></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Horarios Detallada */}
        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                <T>Información del Traslado</T>
              </h2>
              <Card>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg"><T>Punto de Encuentro</T></h3>
                        <p className="text-muted-foreground">Hotel Cabañas del Lago, Puerto Varas</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Bus className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg"><T>Horario de Salida</T></h3>
                        <p className="text-muted-foreground"><T>10:00 hrs - Por favor estar 10 minutos antes</T></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg"><T>Horario de Regreso</T></h3>
                        <p className="text-muted-foreground"><T>15:00 hrs - Llegada aproximada al Hotel</T></p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Calendar className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-lg"><T>Días Disponibles</T></h3>
                        <p className="text-muted-foreground"><T>Martes a Domingo (no disponible los lunes)</T></p>
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
              <T>Reserva tu entrada con traslado incluido desde Puerto Varas y descubre las primeras biopiscinas geotermales del mundo</T>
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
