import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Users, Waves, Sun, Wind, MessageCircle, Phone, Anchor, Compass } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/56940073999?text=Hola,%20quiero%20reservar%20la%20experiencia%20Navega%20Relax";
const PHONE_NUMBER = "+56 9 4007 3999";

export default function NavegaRelax() {
  const incluye = [
    "Navegación en velero por el Lago Llanquihue",
    "Vista panorámica de los volcanes Osorno y Calbuco",
    "Snacks y bebidas a bordo",
    "Guía experto en navegación",
    "Equipo de seguridad completo",
    "Fotos de la experiencia",
  ];

  const highlights = [
    {
      icon: Anchor,
      title: "Velero Exclusivo",
      description: "Navegación privada en velero tradicional",
    },
    {
      icon: Clock,
      title: "2-3 Horas",
      description: "Duración aproximada de la experiencia",
    },
    {
      icon: Users,
      title: "Grupos Reducidos",
      description: "Máximo 6 personas por salida",
    },
    {
      icon: Compass,
      title: "Vistas Únicas",
      description: "Volcanes Osorno, Calbuco y Puntiagudo",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F1E7D9]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/navega-relax-header.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
          <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
            <div className="inline-block bg-[#D3BC8D] text-[#3a3a3a] px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Experiencia Única
            </div>
            <h1 className="font-['Josefin_Sans'] text-4xl md:text-6xl lg:text-7xl font-light mb-4 tracking-wide">
              Navega Relax
            </h1>
            <p className="font-['Fira_Sans'] text-lg md:text-2xl mb-8 max-w-3xl text-white/90">
              Descubre el Lago Llanquihue desde una perspectiva única navegando en catamarán "Bandurria" para luego disfrutar de una relajante estadía en nuestras Biopiscinas Geotermales
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] text-lg px-8 py-6">
                <MessageCircle className="mr-2 h-5 w-5" />
                Reservar por WhatsApp
              </Button>
            </a>
          </div>
        </section>

        {/* Descripción */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-['Josefin_Sans'] text-3xl md:text-4xl text-[#3a3a3a] mb-6 text-center tracking-wide">
                Una Aventura en el Lago Llanquihue
              </h2>
              <div className="prose prose-lg max-w-none text-[#3a3a3a]/80">
                <p className="font-['Fira_Sans'] text-lg leading-relaxed mb-4">
                  Navega Relax es una experiencia única que te permite descubrir la belleza del Lago Llanquihue desde el agua. Con embarque desde el icónico Muelle de Frutillar, a bordo del Catamarán Bandurria, navegarás por las aguas cristalinas del lago mientras disfrutas de vistas espectaculares de los volcanes Osorno, Calbuco y Puntiagudo.
                </p>
                <p className="font-['Fira_Sans'] text-lg leading-relaxed mb-4">
                  La experiencia está guiada por expertos navegantes que te contarán sobre la historia y geografía de la zona. Es perfecta para parejas, familias o grupos de amigos que buscan una actividad diferente y relajante.
                </p>
                <p className="font-['Fira_Sans'] text-lg leading-relaxed">
                  Las salidas dependen de las condiciones climáticas y del viento, por lo que te recomendamos contactarnos por WhatsApp para coordinar la fecha y horario ideal para tu navegación.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Características */}
        <section className="py-16 bg-[#F1E7D9]">
          <div className="container">
            <h2 className="font-['Josefin_Sans'] text-3xl md:text-4xl text-[#3a3a3a] mb-12 text-center tracking-wide">
              Características
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((item, index) => (
                <Card key={index} className="border-[#D3BC8D]/30 bg-white">
                  <CardContent className="p-6 text-center">
                    <item.icon className="h-12 w-12 mx-auto mb-4 text-[#D3BC8D]" />
                    <h3 className="font-['Josefin_Sans'] font-semibold text-lg mb-2 text-[#3a3a3a]">
                      {item.title}
                    </h3>
                    <p className="font-['Fira_Sans'] text-[#3a3a3a]/70">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Qué Incluye */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-['Josefin_Sans'] text-3xl md:text-4xl text-[#3a3a3a] mb-8 text-center tracking-wide">
                La Experiencia Incluye
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {incluye.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-[#F1E7D9] rounded-lg">
                    <Check className="h-5 w-5 text-[#D3BC8D] mt-0.5 flex-shrink-0" />
                    <span className="font-['Fira_Sans'] text-[#3a3a3a]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="font-['Josefin_Sans'] font-semibold text-lg mb-2 text-[#3a3a3a]">
                  Información Importante
                </h3>
                <ul className="space-y-2 text-sm font-['Fira_Sans'] text-[#3a3a3a]/80">
                  <li>• Las salidas dependen de las condiciones climáticas</li>
                  <li>• Se recomienda llevar ropa abrigada y cortaviento</li>
                  <li>• Apto para todas las edades</li>
                  <li>• Reserva con al menos 24 horas de anticipación</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a] text-white">
          <div className="container text-center">
            <h2 className="font-['Josefin_Sans'] text-3xl md:text-4xl mb-4 tracking-wide">
              ¿Listo para navegar?
            </h2>
            <p className="font-['Fira_Sans'] text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              Contáctanos por WhatsApp para coordinar tu experiencia de navegación
              en el Lago Llanquihue
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] text-lg px-8">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Reservar por WhatsApp
                </Button>
              </a>
              <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-white text-white hover:bg-white hover:text-[#3a3a3a]"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Llamar Ahora
                </Button>
              </a>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Teléfono: {PHONE_NUMBER}
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
