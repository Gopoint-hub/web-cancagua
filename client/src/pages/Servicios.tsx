import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";
import { Sparkles, Leaf } from "lucide-react";

export default function Servicios() {
  const services = [
    {
      title: "Biopiscinas Geotermales",
      description: "Las primeras del mundo. Cuatro horas de experiencia única a 37º-40º en aguas termales naturales con vista al Lago Llanquihue.",
      image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp",
      href: "/servicios/biopiscinas",
      badge: "Primeras del Mundo",
    },
    {
      title: "Hot Tubs",
      description: "Disfruta de spa al aire libre inmerso en bosque nativo. Experiencia privada con vista al lago y conexión con la naturaleza.",
      image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309079/cancagua/images/11_hottub-service.webp",
      href: "/servicios/hot-tubs",
    },
    {
      title: "Sauna Nativo",
      description: "Sauna finlandés con vista al lago y volcanes. Experiencia de calor seco seguida de inmersión en aguas frías para revitalizar cuerpo y mente.",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070",
      href: "/servicios/sauna",
    },
    {
      title: "Masajes & Terapias",
      description: "Reconforta tu cuerpo con masajes descontracturantes, piedras calientes, drenaje linfático, reflexología y terapias holísticas.",
      image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309084/cancagua/images/13_masajes-service.webp",
      href: "/masajes",
    },
    {
      title: "Programa Pulso Local",
      description: "Membresía exclusiva para residentes de Osorno a Puerto Montt. Bienestar continuo con sesiones en paquete y descuentos especiales.",
      image: "/images/pulso-local-hero.jpg",
      href: "/servicios/programalocal",
      badge: "Nuevo",
    },
    {
      title: "Clases Regulares",
      description: "Movimiento y bienestar: Hatha Yoga, Entrenamiento Funcional, Natación en Aguas Abiertas, Danza Consciente y Meditación en conexión con la naturaleza.",
      image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309082/cancagua/images/12_yoga-clases.webp",
      href: "/clases",
    },
  ];

  const experiencias = [
    {
      title: "Navega Relax",
      description: "Navegación por el Lago Llanquihue con vistas a los volcanes Osorno y Calbuco. Una experiencia única de conexión con la naturaleza.",
      image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309223/cancagua/images/navega-relax-catamaran.webp",
      href: "/navega-relax",
      badge: "Recomendado",
    },
    {
      title: "Pases Reconecta",
      description: "Pases mensuales para acceder a nuestros servicios de bienestar. La mejor forma de mantener tu rutina de autocuidado.",
      image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309251/cancagua/images/pase-reconecta-hottub.png",
      href: "/experiencias/pases-reconecta",
    },
    {
      title: "Full Day Hot Tubs + Biopiscinas",
      description: "Combina la experiencia de Hot Tubs privados con las Biopiscinas Geotermales. Un día completo de relajación y bienestar.",
      image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309079/cancagua/images/11_hottub-service.webp",
      href: "/servicios/full-day-hot-tubs",
      badge: "Full Day",
    },
    {
      title: "Full Day Biopiscinas + Playa",
      description: "Disfruta de las Biopiscinas Geotermales y relájate en nuestra playa privada con vista al Lago Llanquihue.",
      image: "https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp",
      href: "/servicios/full-day-biopiscinas",
      badge: "Full Day",
    },
  ];

  return (
    <AutoTranslateProvider pageId="servicios">
      <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
        <Navbar />

        <main>
          {/* Hero */}
          <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309075/cancagua/images/10_cancagua-header.jpg)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4">
                <T>Bienestar Integral</T>
              </span>
              <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-6">
                <T>Servicios & Experiencias</T>
              </h1>
              <p className="text-lg md:text-xl max-w-2xl font-light opacity-90">
                <T>Descubre todas las formas de reconectar con tu bienestar en Cancagua</T>
              </p>
            </div>
          </section>

          {/* Sección Experiencias (Recomendado) */}
          <section className="py-20 md:py-28 bg-white">
            <div className="container">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4">
                  <Sparkles className="h-4 w-4" />
                  <T>Recomendado</T>
                </div>
                <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
                  <T>Experiencias</T>
                </h2>
                <p className="text-lg text-[#8C8C8C] max-w-2xl mx-auto">
                  <T>Combina nuestros servicios en experiencias únicas diseñadas para maximizar tu bienestar</T>
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {experiencias.map((exp) => (
                  <ServiceCard 
                    key={exp.title} 
                    title={<T>{exp.title}</T>}
                    description={<T>{exp.description}</T>}
                    image={exp.image}
                    href={exp.href}
                    badge={exp.badge ? <T>{exp.badge}</T> : undefined}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Sección Servicios */}
          <section className="py-20 md:py-28 bg-[#F1E7D9]">
            <div className="container">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4">
                  <Leaf className="h-4 w-4" />
                  <T>Nuestros Servicios</T>
                </div>
                <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
                  <T>Servicios Individuales</T>
                </h2>
                <p className="text-lg text-[#8C8C8C] max-w-2xl mx-auto">
                  <T>Cada servicio está diseñado para brindarte una experiencia única de bienestar y conexión con la naturaleza</T>
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <ServiceCard 
                    key={service.title} 
                    title={<T>{service.title}</T>}
                    description={<T>{service.description}</T>}
                    image={service.image}
                    href={service.href}
                    badge={service.badge ? <T>{service.badge}</T> : undefined}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-white">
            <div className="container text-center">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                <T>¿Necesitas Ayuda?</T>
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
                <T>¿No sabes cuál elegir?</T>
              </h2>
              <p className="text-lg text-[#8C8C8C] mb-10 max-w-2xl mx-auto">
                <T>Contáctanos y te ayudaremos a encontrar la experiencia perfecta para ti</T>
              </p>
              <a
                href="https://wa.me/56940073999?text=Hola,%20me%20gustaría%20información%20sobre%20los%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-12 px-10 bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] transition-colors tracking-widest uppercase text-sm"
              >
                <T>Contactar por WhatsApp</T>
              </a>
            </div>
          </section>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    </AutoTranslateProvider>
  );
}
