import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";
import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Heart, Leaf, Waves } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const services = [
    {
      title: "Biopiscinas Geotermales",
      description:
        "Las primeras del mundo. Cuatro horas de experiencia única a 37º-40º en aguas termales naturales.",
      image: "/images/02_biopiscinas-hero.jpg",
      href: "/servicios/biopiscinas",
      badge: "Primeras del Mundo",
    },
    {
      title: "Hot Tubs",
      description:
        "Disfruta de spa al aire libre inmerso en bosque nativo con vista al Lago Llanquihue.",
      image: "/images/11_hottub-service.webp",
      href: "/servicios/hot-tubs",
    },
    {
      title: "Masajes & Terapias",
      description:
        "Reconforta tu cuerpo con masajes descontracturantes, piedras calientes, drenaje linfático y más.",
      image: "/images/13_masajes-service.webp",
      href: "/servicios/masajes",
    },
    {
      title: "Clases Regulares",
      description:
        "Movimiento y meditación: Hatha Yoga, Vinyasa, Animal Flow, Aikido, Pilates e hipopresivos.",
      image: "/images/12_yoga-clases.webp",
      href: "/servicios/clases",
    },
  ];

  const features = [
    {
      icon: Waves,
      title: "Biopiscinas Únicas",
      description:
        "Las primeras biopiscinas geotermales del mundo, a orillas del Lago Llanquihue.",
    },
    {
      icon: Leaf,
      title: "Conexión Natural",
      description:
        "Rodeado de bosque nativo y naturaleza, el lugar perfecto para reconectar.",
    },
    {
      icon: Heart,
      title: "Bienestar Integral",
      description:
        "Servicios diseñados para tu cuerpo, mente y espíritu en armonía.",
    },
    {
      icon: Calendar,
      title: "Abierto Todo el Año",
      description:
        "Disfruta de nuestros servicios de lunes a domingo, los 365 días del año.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main>
        {/* Hero Slider */}
        <HeroSlider />

        {/* Sección Spa & Retreat Center */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Spa & Retreat Center
              </h2>
              <p className="text-lg text-muted-foreground font-display italic">
                Servicios que invitan a la calma, a la conexión con la
                naturaleza, y con lo profundo del Ser.
              </p>
            </div>

            {/* Grid de servicios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/servicios">
                <Button size="lg" variant="outline">
                  Ver Todos los Servicios
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sección Por Qué Cancagua */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                ¿Por Qué Cancagua?
              </h2>
              <p className="text-lg text-muted-foreground">
                Un espacio único para reconectar con la naturaleza y contigo
                mismo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index}>
                    <CardContent className="pt-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Sección Cafetería */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Cafetería Saludable
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Disfruta de martes a domingo nuestra cafetería saludable con
                  opciones de comida consciente y en base a productos locales.
                  Contamos con brunch todo el día y exquisitas opciones para
                  beber.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Opciones veganas y vegetarianas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Alternativas keto, sin lácteos y sin gluten</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Productos locales y de temporada</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span>Brunch all day con vista al lago</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/cafeteria">
                    <Button size="lg">Ver Carta</Button>
                  </Link>
                  <Button size="lg" variant="outline">
                    Reservar Mesa
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src="/images/08_cafeteria-interior.jpg"
                  alt="Cafetería Cancagua"
                  className="rounded-lg shadow-2xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección Gift Cards */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Regala Cancagua
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Tarjeta de regalo Cancagua es una excelente opción para que
                elijan lo que quieran y cuando quieran. Es la mejor alternativa
                para regalar a tus seres queridos un regalo con sentido.
              </p>
              <Link href="/gift-cards">
                <Button size="lg" className="px-8">
                  Comprar Gift Card
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sección Newsletter */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Quiero enterarme de las novedades de Cancagua
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Recibe ofertas exclusivas, eventos especiales y novedades
                directamente en tu correo
              </p>
              <form className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="flex-1 bg-white text-foreground"
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="secondary"
                  className="sm:w-auto"
                >
                  Suscribirme
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
