import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Leaf, MapPin, Coffee, UtensilsCrossed, Heart, Sun } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(https://res.cloudinary.com/dhuln9b1n/image/upload/v1770661870/cancagua/images/shakshuka-cafeteria-hero.webp)" }}
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Cafetería Saludable
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8">
              Alimentación consciente con productos locales y opciones para todas las dietas
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
                    Ingredientes frescos y de temporada
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6 text-center">
                  <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-lg mb-2">Vista al Lago</h3>
                  <p className="text-muted-foreground">
                    Disfruta con vista panorámica al Llanquihue
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
                  Nuestra cafetería es un refugio de tranquilidad donde podrás disfrutar de alimentos nutritivos mientras contemplas las aguas del Lago Llanquihue y el imponente Volcán Calbuco.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  Trabajamos con productores locales del sur de Chile para ofrecerte ingredientes frescos y de temporada. Cada plato está preparado con amor y pensado para nutrir tu cuerpo y alma.
                </p>
                <p className="text-lg text-muted-foreground">
                  Ya sea que vengas a disfrutar de un desayuno energizante antes de tu sesión en las biopiscinas, o a relajarte con un café después de un masaje, nuestra cafetería es el complemento perfecto para tu experiencia en Cancagua.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309071/cancagua/images/08_cafeteria-interior.jpg"
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
                <h3 className="font-bold text-lg mb-2">Desayuno y Brunch Todo el Día</h3>
                <p className="text-muted-foreground text-sm">
                  Bowls, tostadas y opciones saladas a cualquier hora, sin horario de cocina
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

        {/* Qué se come acá */}
        <section className="py-20">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Qué Vas a Encontrar
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Desayuno y brunch a cualquier hora, almuerzo con platos de la zona y tablas para
                compartir. No hay horario de cocina: si abrimos, se come.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4">Desayuno y brunch</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>Tostada de palta y huevo — $4.830</li>
                    <li>Tostada vegetariana o dulce — $6.500</li>
                    <li>Tostada de salmón ahumado — $8.500</li>
                    <li>Maqui bowl — $6.500</li>
                    <li>Chía pudding — $5.000</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4">Para almorzar</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>Pizza artesanal — $10.500</li>
                    <li>Pizza con rúcula — $12.500</li>
                    <li>Sándwich de salmón — $10.500</li>
                    <li>Caprese — $13.000</li>
                    <li>Ensalada verde con queso de cabra — $11.500</li>
                    <li>Sopa del día — $6.500</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4">Para compartir</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>Tabla de charcutería y quesos — $28.000 (2 a 3) · $38.000 (4 a 6)</li>
                    <li>Tabla de Otoño, vegana — mismos valores</li>
                    <li>Tabla de niños — $28.000</li>
                  </ul>
                  <p className="text-xs text-muted-foreground mt-4">
                    La Tabla de Otoño se encarga con 48 horas de anticipación.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4">Para tomar</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>Café de grano, desde $2.500</li>
                    <li>Té en tetera — $5.000</li>
                    <li>Jugos naturales y kombucha — $4.000</li>
                    <li>Cervezas de la zona — $4.000</li>
                    <li>Sour Catedral — $7.900</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="font-bold text-lg mb-4">Dulce</h3>
                  <ul className="space-y-2 text-muted-foreground text-sm">
                    <li>Helados Pucia — $6.000</li>
                    <li>Cheesecake — $5.500</li>
                    <li>Postres keto, desde $3.500</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="rounded-2xl overflow-hidden shadow-lg min-h-[220px]">
                <img
                  src="/images/cafeteria-cancagua-brunch.webp"
                  alt="Brunch en la cafetería de Cancagua, con productos de productores del sur de Chile"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
              Valores referenciales. La carta completa y actualizada está siempre en nuestra carta digital.
            </p>
          </div>
        </section>

        {/* Productores de la zona */}
        <section className="py-20 bg-muted">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="relative order-2 lg:order-1">
                <img
                  src="/images/06_cafeteria-hero.jpg"
                  alt="Cafetería de Cancagua en Frutillar, con vista al lago Llanquihue"
                  className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Quiénes Están Detrás de la Carta
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Casi todo lo que servimos viene de productores del sur. No es un discurso: son
                  nombres concretos, y varios están a pocos kilómetros de acá.
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Quesos DCabra y DVaca</strong>, de Los Bajos,
                    el mismo camino donde estamos.
                  </li>
                  <li>
                    <strong className="text-foreground">Charcutería La Vikinga</strong>, de Puerto Varas.
                  </li>
                  <li>
                    <strong className="text-foreground">Café Llanquihue</strong>, tostado en la zona.
                  </li>
                  <li>
                    <strong className="text-foreground">Kombucha La IDA</strong> y{" "}
                    <strong className="text-foreground">jugos Rubén Avilés</strong>, 100% natural.
                  </li>
                  <li>
                    <strong className="text-foreground">Cervezas Tropera y Chester</strong>, y el{" "}
                    <strong className="text-foreground">Sour Catedral</strong> de murta o menta jengibre.
                  </li>
                  <li>
                    <strong className="text-foreground">Helados Pucia</strong> y galletas{" "}
                    <strong className="text-foreground">Sacapitas</strong>.
                  </li>
                </ul>
                <p className="text-lg text-muted-foreground mt-6">
                  Y hay opciones veganas, sin gluten y keto en todas las secciones de la carta, no
                  como excepción.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Carta Digital */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Carta Digital
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Disfruta nuestra carta con opciones saludables, orgánicas y locales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://menu.fu.do/cancagua/qr-menu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Abrir Carta
                  </Button>
                </a>
                <a
                  href="https://wa.me/56940073999?text=Hola,%20quiero%20consultar%20sobre%20la%20cafeter%C3%ADa"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="outline">
                    WhatsApp +569 40073999
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
            <p className="text-lg opacity-90 mb-4 max-w-2xl mx-auto">
              Ven a disfrutar de un momento de paz con comida nutritiva y las mejores vistas del sur de Chile
            </p>
            <p className="text-base opacity-90 mb-8 max-w-2xl mx-auto">
              <strong>Puedes venir solo a la cafetería</strong>, sin pagar entrada ni tomar
              ningún otro servicio. Te recomendamos reservar mesa por si ese día hay algún grupo.
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
              <br />
              Temporada: del 15 de marzo al 15 de diciembre
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
