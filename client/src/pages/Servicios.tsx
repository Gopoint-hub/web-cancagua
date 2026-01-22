import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ServiceCard } from "@/components/ServiceCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useTranslation } from "react-i18next";
import { Sparkles, Leaf } from "lucide-react";

export default function Servicios() {
  const { t } = useTranslation();

  const services = [
    {
      title: t("services.biopiscinas.title", "Biopiscinas Geotermales"),
      description: t("services.biopiscinas.description", "Las primeras del mundo. Cuatro horas de experiencia única a 37º-40º en aguas termales naturales con vista al Lago Llanquihue."),
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/02_biopiscinas-hero.jpg",
      href: "/servicios/biopiscinas",
      badge: t("services.biopiscinas.badge", "Primeras del Mundo"),
    },
    {
      title: t("services.hotTubs.title", "Hot Tubs"),
      description: t("services.hotTubs.description", "Disfruta de spa al aire libre inmerso en bosque nativo. Experiencia privada con vista al lago y conexión con la naturaleza."),
      image: "/images/11_hottub-service.webp",
      href: "/servicios/hot-tubs",
    },
    {
      title: t("services.sauna.title", "Sauna Nativo"),
      description: t("services.sauna.description", "Sauna finlandés con vista al lago y volcanes. Experiencia de calor seco seguida de inmersión en aguas frías para revitalizar cuerpo y mente."),
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070",
      href: "/servicios/sauna",
    },
    {
      title: t("services.masajes.title", "Masajes & Terapias"),
      description: t("services.masajes.description", "Reconforta tu cuerpo con masajes descontracturantes, piedras calientes, drenaje linfático, reflexología y terapias holísticas."),
      image: "/images/13_masajes-service.webp",
      href: "/masajes",
    },
    {
      title: t("services.clases.title", "Clases Regulares"),
      description: t("services.clases.description", "Movimiento y meditación: Hatha Yoga, Vinyasa, Animal Flow, Aikido, Pilates e hipopresivos en conexión con la naturaleza."),
      image: "/images/12_yoga-clases.webp",
      href: "/clases",
    },
  ];

  const experiencias = [
    {
      title: t("experiencias.navegaRelax.title", "Navega Relax"),
      description: t("experiencias.navegaRelax.description", "Navegación por el Lago Llanquihue con vistas a los volcanes Osorno y Calbuco. Una experiencia única de conexión con la naturaleza."),
      image: "/images/14_sup-actividad.jpg",
      href: "/experiencias/navega-relax",
      badge: t("experiencias.navegaRelax.badge", "Recomendado"),
    },
    {
      title: t("experiencias.pasesReconecta.title", "Pases Reconecta"),
      description: t("experiencias.pasesReconecta.description", "Pases mensuales para acceder a nuestros servicios de bienestar. La mejor forma de mantener tu rutina de autocuidado."),
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/pase-reconecta-hottub.png",
      href: "/experiencias/pases-reconecta",
    },
    {
      title: t("experiencias.fullDayHotTubs.title", "Full Day Hot Tubs + Biopiscinas"),
      description: t("experiencias.fullDayHotTubs.description", "Combina la experiencia de Hot Tubs privados con las Biopiscinas Geotermales. Un día completo de relajación y bienestar."),
      image: "/images/11_hottub-service.webp",
      href: "/experiencias/full-day-hot-tubs-biopiscinas",
      badge: t("experiencias.fullDayHotTubs.badge", "Full Day"),
    },
    {
      title: t("experiencias.fullDayPlaya.title", "Full Day Biopiscinas + Playa"),
      description: t("experiencias.fullDayPlaya.description", "Disfruta de las Biopiscinas Geotermales y relájate en nuestra playa privada con vista al Lago Llanquihue."),
      image: "/images/fullday-biopiscinas-hero.jpg",
      href: "/experiencias/full-day-biopiscinas-playa",
      badge: t("experiencias.fullDayPlaya.badge", "Full Day"),
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
              {t("serviciosPage.hero.subtitle", "Bienestar Integral")}
            </span>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide mb-6">
              {t("serviciosPage.hero.title", "Servicios & Experiencias")}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl font-light opacity-90">
              {t("serviciosPage.hero.description", "Descubre todas las formas de reconectar con tu bienestar en Cancagua")}
            </p>
          </div>
        </section>

        {/* Sección Experiencias (Recomendado) */}
        <section className="py-20 md:py-28 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4">
                <Sparkles className="h-4 w-4" />
                {t("serviciosPage.experiencias.subtitle", "Recomendado")}
              </div>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
                {t("serviciosPage.experiencias.title", "Experiencias")}
              </h2>
              <p className="text-lg text-[#8C8C8C] max-w-2xl mx-auto">
                {t("serviciosPage.experiencias.description", "Combina nuestros servicios en experiencias únicas diseñadas para maximizar tu bienestar")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {experiencias.map((exp) => (
                <ServiceCard key={exp.title} {...exp} />
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
                {t("serviciosPage.services.subtitle", "Nuestros Servicios")}
              </div>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
                {t("serviciosPage.services.title", "Servicios Individuales")}
              </h2>
              <p className="text-lg text-[#8C8C8C] max-w-2xl mx-auto">
                {t("serviciosPage.services.description", "Cada servicio está diseñado para brindarte una experiencia única de bienestar y conexión con la naturaleza")}
              </p>
            </div>
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
              {t("serviciosPage.cta.subtitle", "¿Necesitas Ayuda?")}
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
              {t("serviciosPage.cta.title", "¿No sabes cuál elegir?")}
            </h2>
            <p className="text-lg text-[#8C8C8C] mb-10 max-w-2xl mx-auto">
              {t("serviciosPage.cta.description", "Contáctanos y te ayudaremos a encontrar la experiencia perfecta para ti")}
            </p>
            <a
              href="https://wa.me/56940073999?text=Hola,%20me%20gustaría%20información%20sobre%20los%20servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-10 bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] transition-colors tracking-widest uppercase text-sm"
            >
              {t("serviciosPage.cta.button", "Contactar por WhatsApp")}
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
