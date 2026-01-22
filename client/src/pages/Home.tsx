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
import { SEOHead } from "@/components/SEOHead";

export default function Home() {
  // SEO para la página principal
  const seoData = {
    title: "Cancagua Spa & Retreat Center | Biopiscinas Geotermales en Frutillar",
    description: "Las primeras biopiscinas geotermales del mundo. Disfruta de una experiencia única de bienestar en aguas termales naturales a 37°-40° con vista al Lago Llanquihue y volcanes del sur de Chile.",
    canonical: "/",
    keywords: "spa, termas, biopiscinas, geotermales, frutillar, chile, masajes, hot tubs, bienestar, lago llanquihue"
  };
  const services = [
    {
      title: "Biopiscinas Geotermales",
      description:
        "Las primeras del mundo. Cuatro horas de experiencia única a 37º-40º en aguas termales naturales.",
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/02_biopiscinas-hero.jpg",
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
        "Hatha Yoga, Entrenamiento Funcional, Danza Infantil y mucho más. Clases para todos los niveles.",
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
      <SEOHead {...seoData} />
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
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/08_cafeteria-interior.jpg"
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
                <Link href="/tienda-regalos-preview">
                  Comprar Gift Card
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Secc        {/* Banner WhatsApp */}
        <section className="py-16 bg-gradient-to-br from-[#25D366]/10 to-[#20BA5A]/5">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Card className="border-[#25D366]/30 bg-white shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-20 h-20 rounded-full bg-[#25D366]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="h-10 w-10 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-light tracking-wide mb-3 text-[#3a3a3a]">Únete a nuestra comunidad</h3>
                      <p className="text-base text-[#8C8C8C] mb-6">
                        Forma parte del grupo de WhatsApp de Cancagua y recibe promociones exclusivas, novedades y tips de bienestar directamente en tu teléfono.
                      </p>
                      <a
                        href="https://chat.whatsapp.com/GX12Kr6Q6jSDvBUfVrloNy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5A] transition-all transform hover:scale-105 font-medium text-base shadow-lg"
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Unirme al grupo de WhatsApp
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Cómo Llegar - Solo Mobile */}
        <section className="py-12 bg-white md:hidden">
          <div className="container">
            <div className="text-center mb-6">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-2 block">
                Visítanos
              </span>
              <h2 className="text-2xl font-light tracking-wide text-[#3a3a3a]">
                Cómo Llegar
              </h2>
            </div>

            {/* Mapa */}
            <div className="relative h-64 bg-white rounded-lg overflow-hidden shadow-sm mb-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.745812503505!2d-73.01359452303775!3d-41.118242130025415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96179314014546c1%3A0x4d1a08f9164c20!2sCANCAGUA%20Spa%2C%20Biopiscinas%20Geot%C3%A9rmicas%2C%20la%20alternativa%20a%20las%20termas%20del%20sur%20de%20Chile!5e0!3m2!1ses-419!2scl!4v1768925453997!5m2!1ses-419!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Cancagua"
              />
            </div>

            {/* Botones de navegación */}
            <div className="flex flex-col gap-3">
              <a
                href="https://www.waze.com/live-map/directions/cl/los-lagos/cancagua-spa,-biopiscinas-geotermicas,-la-alternativa-a-las-termas-del-sur-de-chile?navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location&to=place.ChIJwUZFARSTF5YRIEwW-QgaTQA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#33CCFF] text-white rounded-lg hover:bg-[#2BB8E8] transition-colors font-medium"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.54 6.63c.69.94 1.15 2.04 1.35 3.19.21 1.21.11 2.46-.29 3.63-.42 1.24-1.14 2.37-2.1 3.27-.94.88-2.08 1.52-3.31 1.87-.59.17-1.19.28-1.79.33-.25.02-.51.03-.76.03-.83 0-1.65-.11-2.44-.33-.55-.15-1.08-.36-1.58-.62l-4.17 1.34 1.37-4.03c-.35-.58-.62-1.21-.81-1.86-.26-.89-.38-1.82-.35-2.75.03-.88.2-1.75.51-2.57.32-.87.79-1.67 1.38-2.37.63-.75 1.4-1.38 2.27-1.85.92-.5 1.93-.82 2.97-.94.49-.06.99-.08 1.48-.06 1.15.04 2.27.32 3.29.81 1.08.52 2.03 1.26 2.78 2.17l.2.24zM12 2C6.5 2 2 6.5 2 12c0 1.82.49 3.53 1.34 5L2 22l5.12-1.32c1.43.78 3.07 1.23 4.81 1.32h.07c5.5 0 10-4.5 10-10S17.5 2 12 2zm.04 3c.47 0 .93.04 1.39.11.86.14 1.68.43 2.43.85.71.4 1.35.91 1.88 1.52.5.58.9 1.24 1.18 1.95.26.67.42 1.38.47 2.1.05.68 0 1.36-.14 2.02-.15.7-.42 1.37-.79 1.98-.39.65-.89 1.23-1.48 1.71-.63.51-1.35.91-2.13 1.18-.74.26-1.52.4-2.31.41h-.08c-.67 0-1.33-.09-1.97-.26-.6-.16-1.17-.4-1.7-.71l-.12-.07-2.48.65.67-2.44-.08-.13c-.37-.57-.65-1.19-.83-1.84-.2-.71-.29-1.45-.26-2.19.02-.69.15-1.37.38-2.01.24-.68.59-1.31 1.04-1.87.48-.6 1.07-1.11 1.74-1.5.71-.41 1.49-.69 2.31-.82.43-.07.87-.1 1.31-.1l.06-.04z"/>
                </svg>
                Navegar con Waze
              </a>
              <a
                href="https://www.google.com/maps/place/CANCAGUA+Spa,+Biopiscinas+Geot%C3%A9rmicas,+la+alternativa+a+las+termas+del+sur+de+Chile/@-41.118242,-73.013595,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-[#4285F4] text-white rounded-lg hover:bg-[#3574E0] transition-colors font-medium"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-[#D3BC8D]">
          <div className="container max-w-3xl text-center">
            <div className="space-y-4">
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
        </section>      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
