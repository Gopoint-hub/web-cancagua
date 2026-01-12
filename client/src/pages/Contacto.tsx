import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

export default function Contacto() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative h-[30vh] md:h-[40vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/10_cancagua-header.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Contacto</h1>
            <p className="text-lg md:text-xl max-w-2xl">
              Estamos aquí para ayudarte
            </p>
          </div>
        </section>

        {/* Información de contacto */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Ubicación</h3>
                  <p className="text-sm text-muted-foreground">
                    Frutillar, Región de Los Lagos
                    <br />
                    Chile
                    <br />
                    (2 kms de Frutillar Bajo)
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Teléfono</h3>
                  <a
                    href="tel:+56940073999"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors block"
                  >
                    +56 9 4007 3999
                  </a>
                  <a
                    href="tel:+56988190248"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors block mt-1"
                  >
                    +56 9 8819 0248
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <a
                    href="mailto:contacto@cancagua.cl"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    contacto@cancagua.cl
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Horarios</h3>
                  <p className="text-sm text-muted-foreground">
                    Lunes a Domingo
                    <br />
                    Todo el año
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Formulario y Mapa */}
        <section className="py-16 bg-muted">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Formulario */}
              <div>
                <h2 className="text-3xl font-bold mb-4">Envíanos un Mensaje</h2>
                <p className="text-muted-foreground mb-8">
                  Completa el formulario y te responderemos a la brevedad
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nombre">Nombre</Label>
                      <Input id="nombre" placeholder="Tu nombre" />
                    </div>
                    <div>
                      <Label htmlFor="apellido">Apellido</Label>
                      <Input id="apellido" placeholder="Tu apellido" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefono">Teléfono (opcional)</Label>
                    <Input
                      id="telefono"
                      type="tel"
                      placeholder="+56 9 1234 5678"
                    />
                  </div>

                  <div>
                    <Label htmlFor="asunto">Asunto</Label>
                    <Input id="asunto" placeholder="¿En qué podemos ayudarte?" />
                  </div>

                  <div>
                    <Label htmlFor="mensaje">Mensaje</Label>
                    <Textarea
                      id="mensaje"
                      placeholder="Escribe tu mensaje aquí..."
                      rows={6}
                    />
                  </div>

                  <Button size="lg" className="w-full">
                    Enviar Mensaje
                  </Button>
                </form>
              </div>

              {/* Mapa e información adicional */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Cómo Llegar</h2>
                  <p className="text-muted-foreground mb-6">
                    Estamos ubicados a 2 kilómetros de Frutillar Bajo, con vista
                    privilegiada al Lago Llanquihue y los volcanes Osorno y
                    Calbuco.
                  </p>
                </div>

                {/* Mapa placeholder */}
                <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3119.8!2d-73.0!3d-41.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDA2JzAwLjAiUyA3M8KwMDAnMDAuMCJX!5e0!3m2!1ses!2scl!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación de Cancagua"
                  />
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">Indicaciones</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>
                        • Desde Puerto Montt: 45 minutos por Ruta 5 Sur
                      </li>
                      <li>
                        • Desde Puerto Varas: 25 minutos por Ruta 5 Sur
                      </li>
                      <li>
                        • Desde Frutillar Bajo: 5 minutos hacia el norte
                      </li>
                      <li>• Estacionamiento gratuito disponible</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">
                      ¿Prefieres WhatsApp?
                    </h3>
                    <p className="text-sm mb-4 opacity-90">
                      Contáctanos directamente y te responderemos de inmediato
                    </p>
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full"
                      asChild
                    >
                      <a
                        href="https://wa.me/56988190248?text=Hola,%20necesito%20ponerme%20en%20contacto%20con%20ustedes"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Abrir WhatsApp
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Preguntas Frecuentes
              </h2>

              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">
                      ¿Necesito reservar con anticipación?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sí, especialmente para biopiscinas y hot tubs. Te
                      recomendamos reservar con al menos 48 horas de
                      anticipación, especialmente en temporada alta y fines de
                      semana.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">
                      ¿Cuál es la edad mínima para usar las biopiscinas?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      La edad mínima es 12 años. Los menores de 18 años deben
                      estar acompañados por un adulto responsable.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">
                      ¿Qué debo traer?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Solo necesitas traer tu traje de baño. Nosotros
                      proporcionamos toallas, batas y casilleros de seguridad.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">
                      ¿Tienen estacionamiento?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Sí, contamos con estacionamiento gratuito para todos
                      nuestros visitantes.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
