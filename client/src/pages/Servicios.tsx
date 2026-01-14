import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Servicios() {
  const services = [
    {
      title: "Biopiscinas Geotermales",
      description:
        "Las primeras del mundo. Cuatro horas de experiencia única a 37º-40º en aguas termales naturales con vista al Lago Llanquihue.",
      image: "/images/02_biopiscinas-hero.jpg",
      href: "/servicios/biopiscinas",
      badge: "Primeras del Mundo",
    },
    {
      title: "Hot Tubs",
      description:
        "Disfruta de spa al aire libre inmerso en bosque nativo. Experiencia privada con vista al lago y conexión con la naturaleza.",
      image: "/images/11_hottub-service.webp",
      href: "/servicios/hot-tubs",
    },
    {
      title: "Masajes & Terapias",
      description:
        "Reconforta tu cuerpo con masajes descontracturantes, piedras calientes, drenaje linfático, reflexología y terapias holísticas.",
      image: "/images/13_masajes-service.webp",
      href: "/servicios/masajes",
    },
    {
      title: "Clases Regulares",
      description:
        "Movimiento y meditación: Hatha Yoga, Vinyasa, Animal Flow, Aikido, Pilates e hipopresivos en conexión con la naturaleza.",
      image: "/images/12_yoga-clases.webp",
      href: "/servicios/clases",
    },
    {
      title: "SUP & Actividades Acuáticas",
      description:
        "Stand Up Paddle en el Lago Llanquihue. Disfruta del agua en un entorno natural privilegiado.",
      image: "/images/14_sup-actividad.jpg",
      href: "/servicios/sup",
    },
    {
      title: "Pase Reconecta",
      description:
        "Acceso ilimitado a biopiscinas, hot tubs y clases durante todo el mes. La mejor forma de integrar el bienestar a tu rutina.",
      image: "/images/10_cancagua-header.jpg",
      href: "/servicios/pase-reconecta",
      badge: "Mejor Valor",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/10_cancagua-header.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4">
              Experiencias
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-6">
              Nuestros Servicios
            </h1>
            <p className="text-lg md:text-xl max-w-2xl font-light opacity-90">
              Experiencias diseñadas para tu bienestar integral en conexión con
              la naturaleza
            </p>
          </div>
        </section>

        {/* Grid de servicios */}
        <section className="py-20 md:py-28 bg-[#F1E7D9]">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.title} {...service} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container text-center">
            <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
              ¿Necesitas Ayuda?
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
              ¿No sabes cuál elegir?
            </h2>
            <p className="text-lg text-[#8C8C8C] mb-10 max-w-2xl mx-auto">
              Contáctanos y te ayudaremos a encontrar la experiencia perfecta
              para ti
            </p>
            <a
              href="https://wa.me/56988190248?text=Hola,%20me%20gustaría%20información%20sobre%20los%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-10 bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] transition-colors tracking-widest uppercase text-sm"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
