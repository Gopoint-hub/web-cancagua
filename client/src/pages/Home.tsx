import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";
import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Heart, Leaf, Waves } from "lucide-react";
import { Link } from "wouter";
import { NewsletterForm } from "@/components/NewsletterForm";

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
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main>
        {/* Hero Slider */}
        <HeroSlider />

        {/* Sección Spa & Retreat Center */}
        <section className="py-20 md:py-28 bg-[#F1E7D9]">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Experiencias
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
                Spa & Retreat Center
              </h2>
              <p className="text-lg text-[#8C8C8C] font-accent italic">
                Servicios que invitan a la calma, a la conexión con la
                naturaleza, y con lo profundo del Ser.
              </p>
            </div>

            {/* Grid de servicios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#D3BC8D] text-[#3a3a3a] hover:bg-[#D3BC8D] hover:text-[#3a3a3a] tracking-wider"
                asChild
              >
                <Link href="/servicios">
                  Ver Todos los Servicios
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Sección Por Qué Cancagua */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Nuestra Esencia
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
                ¿Por Qué Cancagua?
              </h2>
              <p className="text-lg text-[#8C8C8C]">
                Un espacio único para reconectar con la naturaleza y contigo
                mismo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-none shadow-sm bg-[#FDFBF7]">
                    <CardContent className="pt-8 pb-8 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D3BC8D]/20 mb-6">
                        <Icon className="h-7 w-7 text-[#D3BC8D]" />
                      </div>
                      <h3 className="font-light text-xl tracking-wide mb-3 text-[#3a3a3a]">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-[#8C8C8C] leading-relaxed">
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
        <section className="py-20 md:py-28 bg-[#F1E7D9]">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                  Gastronomía
                </span>
                <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
                  Cafetería Saludable
                </h2>
                <p className="text-lg text-[#8C8C8C] mb-8 leading-relaxed">
                  Disfruta de martes a domingo nuestra cafetería saludable con
                  opciones de comida consciente y en base a productos locales.
                  Contamos con brunch todo el día y exquisitas opciones para
                  beber.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D3BC8D]" />
                    <span className="text-[#3a3a3a]">Opciones veganas y vegetarianas</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D3BC8D]" />
                    <span className="text-[#3a3a3a]">Alternativas keto, sin lácteos y sin gluten</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D3BC8D]" />
                    <span className="text-[#3a3a3a]">Productos locales y de temporada</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#D3BC8D]" />
                    <span className="text-[#3a3a3a]">Brunch all day con vista al lago</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-wider"
                    asChild
                  >
                    <Link href="/cafeteria">
                      Ver Carta
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-[#D3BC8D] text-[#3a3a3a] hover:bg-[#D3BC8D]/10 tracking-wider"
                  >
                    Reservar Mesa
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src="/images/08_cafeteria-interior.jpg"
                  alt="Cafetería Cancagua"
                  className="rounded-sm shadow-xl w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección Gift Cards */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Regala Bienestar
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
                Regala Cancagua
              </h2>
              <p className="text-lg text-[#8C8C8C] mb-10 max-w-2xl mx-auto leading-relaxed">
                Tarjeta de regalo Cancagua es una excelente opción para que
                elijan lo que quieran y cuando quieran. Es la mejor alternativa
                para regalar a tus seres queridos un regalo con sentido.
              </p>
              <Button 
                size="lg" 
                className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] px-10 tracking-wider"
                asChild
              >
                <Link href="/gift-cards">
                  Comprar Gift Card
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Sección Newsletter */}
        <section className="py-20 md:py-28 bg-[#D3BC8D]">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <span className="text-white/80 text-sm tracking-[0.3em] uppercase mb-4 block">
                Mantente Conectado
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                Quiero enterarme de las novedades de Cancagua
              </h2>
              <p className="text-lg mb-10 text-[#3a3a3a]/80">
                Recibe ofertas exclusivas, eventos especiales y novedades
                directamente en tu correo
              </p>
              <NewsletterForm variant="dark" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
