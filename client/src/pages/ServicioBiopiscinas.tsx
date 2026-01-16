import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Users, Waves } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";

export default function ServicioBiopiscinas() {
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
    "Toallas y batas",
    "Casilleros de seguridad",
    "Duchas y vestuarios",
    "Acceso a zona de descanso",
    "Vista panorámica al Lago Llanquihue",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/02_biopiscinas-hero.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Primeras del Mundo
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              Biopiscinas Geotermales
            </h1>
            <p className="text-lg md:text-2xl mb-8 max-w-3xl">
              Cuatro horas de una maravillosa experiencia a 37º-40º en las
              primeras biopiscinas geotermales del mundo
            </p>
            <BookingForm
              serviceType="Biopiscinas Geotermales"
              triggerButton={
                <Button size="lg" className="text-lg px-8 py-6">
                  Reservar Ahora
                </Button>
              }
            />
          </div>
        </section>

        {/* Descripción */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Una Experiencia Única en el Mundo
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-4">
                  Las biopiscinas de Cancagua son las primeras en su tipo a
                  nivel mundial. Combinan la tecnología de purificación natural
                  del agua con el calor geotérmico, creando un ecosistema
                  acuático vivo que se mantiene entre 37º y 40º durante todo el
                  año.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  A diferencia de las piscinas tradicionales, nuestras
                  biopiscinas no utilizan cloro ni químicos. El agua se
                  purifica naturalmente a través de plantas acuáticas y
                  microorganismos beneficiosos, creando un ambiente
                  completamente natural y saludable para tu piel.
                </p>
                <p className="text-lg leading-relaxed">
                  Ubicadas a orillas del Lago Llanquihue y rodeadas de bosque
                  nativo, ofrecen una experiencia de inmersión total en la
                  naturaleza mientras disfrutas del calor terapéutico del agua
                  geotérmica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Características */}
        <section className="py-16 bg-muted">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Características
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Waves className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    Agua Geotérmica
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Temperatura constante de 37º-40º todo el año
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">4 Horas</h3>
                  <p className="text-sm text-muted-foreground">
                    Tiempo suficiente para relajarte completamente
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    Grupos Pequeños
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Ambiente tranquilo y exclusivo
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">100% Natural</h3>
                  <p className="text-sm text-muted-foreground">
                    Sin cloro ni químicos, purificación biológica
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Beneficios e Incluye */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Beneficios */}
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Beneficios Terapéuticos
                </h2>
                <ul className="space-y-3">
                  {beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Incluye */}
              <div>
                <h2 className="text-3xl font-bold mb-6">La Experiencia Incluye</h2>
                <ul className="space-y-3">
                  {incluye.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 p-6 bg-muted rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">
                    Antes de tu Visita
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500 font-bold">⚠️</span>
                      <span><strong>No se permite el acceso con bloqueador solar</strong> - Para mantener el ecosistema natural de las biopiscinas</span>
                    </li>
                    <li>• Reserva con anticipación (cupos limitados)</li>
                    <li>• Edad mínima: 5 años con control de esfínter y sin pañal</li>
                    <li>• Traer traje de baño</li>
                    <li>• No se permite el ingreso con alimentos externos</li>
                    <li>• Cafetería disponible en el lugar</li>
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
              ¿Listo para vivir esta experiencia única?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Reserva tu entrada y descubre por qué somos las primeras
              biopiscinas geotermales del mundo
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Reservar Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary"
              >
                Consultar Disponibilidad
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
