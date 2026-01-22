import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Leaf, MapPin, Coffee, UtensilsCrossed, Heart, Sun } from "lucide-react";

export default function Cafeteria() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/06_cafeteria-hero.jpg)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cafetería Saludable
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8">
              Alimentación consciente con productos locales y opciones para
              todas las dietas
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/56940073999?text=Hola,%20quiero%20consultar%20sobre%20la%20cafetería"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Consultar por WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Información Principal */}
        <section className="py-16 bg-muted">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6 text-center">
                  <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Horarios</h3>
                  <p className="text-muted-foreground">
                    Martes a Domingo
                    <br />
                    <span className="text-xl font-semibold text-foreground">09:30 - 21:30</span>
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6 text-center">
                  <Leaf className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Productos Locales</h3>
                  <p className="text-muted-foreground">
                    Ingredientes frescos
                    <br />y de temporada
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6 text-center">
                  <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Vista al Lago</h3>
                  <p className="text-muted-foreground">
                    Disfruta con vista
                    <br />
                    panorámica al Llanquihue
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Descripción con imagen */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Un Espacio para Reconectar
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Nuestra cafetería es un refugio de tranquilidad donde podrás disfrutar de 
                  alimentos nutritivos mientras contemplas las aguas del Lago Llanquihue y 
                  el imponente Volcán Osorno.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Trabajamos con productores locales del sur de Chile para ofrecerte 
                  ingredientes frescos y de temporada. Cada plato está preparado con amor 
                  y pensado para nutrir tu cuerpo y alma.
                </p>
                <p className="text-lg text-muted-foreground">
                  Ya sea que vengas a disfrutar de un desayuno energizante antes de tu 
                  sesión en las biopiscinas, o a relajarte con un café después de un 
                  masaje, nuestra cafetería es el complemento perfecto para tu experiencia 
                  en Cancagua.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/08_cafeteria-interior.jpg"
                  alt="Interior de la cafetería Cancagua"
                  className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Características */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Nuestra Propuesta
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comida consciente que nutre el cuerpo y respeta el medio ambiente
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Café de Especialidad</h3>
                <p className="text-muted-foreground text-sm">
                  Granos seleccionados de tostadores locales, preparados por baristas expertos
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Brunch Todo el Día</h3>
                <p className="text-muted-foreground text-sm">
                  Bowls, tostadas, panqueques y opciones saladas disponibles en cualquier horario
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Opciones para Todos</h3>
                <p className="text-muted-foreground text-sm">
                  Vegano, vegetariano, sin gluten, sin lácteos y opciones keto
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sun className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Terraza con Vista</h3>
                <p className="text-muted-foreground text-sm">
                  Disfruta al aire libre con vista panorámica al lago y volcán
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Próximamente - Carta */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                Próximamente
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Carta Digital
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Estamos trabajando en nuestra carta digital para que puedas explorar 
                nuestro menú completo con fotos, ingredientes y precios actualizados. 
                Mientras tanto, te invitamos a visitarnos y descubrir nuestras 
                deliciosas opciones en persona.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/56940073999?text=Hola,%20quiero%20consultar%20sobre%20el%20menú%20de%20la%20cafetería"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Consultar Menú por WhatsApp
                  </Button>
                </a>
                <a href="tel:+56652210020">
                  <Button size="lg" variant="outline">
                    Llamar: +56 65 221 0020
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-primary text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Te Esperamos
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Ven a disfrutar de un momento de paz con comida nutritiva y las 
              mejores vistas del sur de Chile
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/56940073999?text=Hola,%20quiero%20reservar%20una%20mesa%20en%20la%20cafetería"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="secondary" className="text-primary">
                  Reservar Mesa por WhatsApp
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm opacity-75">
              Martes a Domingo · 09:30 a 21:30
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
