import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Users, MessageCircle, Phone, Anchor, Compass } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/56940073999?text=Hola,%20quiero%20reservar%20la%20experiencia%20Navega%20Relax";
const PHONE_NUMBER = "+56 9 4007 3999";

export default function Page() {
  const incluye = [
    "Navegación en Catamarán Bandurria por el Lago Llanquihue",
    "Embarque desde el Muelle de Frutillar",
    "Vista panorámica de los volcanes Osorno, Calbuco y Puntiagudo",
    "Audio-guiado en español, inglés o portugués durante la navegación",
    "Equipo de seguridad completo",
    "Acceso a Biopiscinas Geotermales post-navegación",
    "Entrega de batas, gorro de nado y locker por persona en Recepción Cancagua",
    "Acceso a Cafetería Saludable",
  ];

  const highlights = [
    {
      icon: Anchor,
      title: "Catamarán Bandurria",
      description: "Navegación en catamarán desde Muelle Frutillar",
    },
    {
      icon: Clock,
      title: "Experiencia Completa de 4,5 hrs.",
      description: "Navegación + Biopiscinas Geotermales",
    },
    {
      icon: Users,
      title: "Grupos Reducidos",
      description: "Experiencia personalizada",
    },
    {
      icon: Compass,
      title: "Vistas Únicas",
      description: "Volcanes Osorno, Calbuco y Puntiagudo",
    },
  ];

  const infoImportante = [
    "Las salidas dependen de las condiciones climáticas",
    "Se recomienda llevar ropa abrigada y cortaviento",
    "Apto para mayores de 5 años",
    "El traslado de vuelta a Frutillar se coordina en Recepción Cancagua",
    "Reserva con al menos 24 horas de anticipación",
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309226/cancagua/images/navega-relax-header.jpg)" }}
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
            Descubre el Lago Llanquihue desde una perspectiva única navegando en Catamarán Bandurria para luego disfrutar de una relajante estadía en nuestras Biopiscinas Geotermales
          </p>
          <a href="https://tickets.catamaranbandurria.cl/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] text-lg px-8 py-6">
              Reserva aquí
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
                "Navega Relax" te invita a descubrir la majestuosidad del Lago Llanquihue desde una perspectiva privilegiada. Tu aventura comienza en el icónico Muelle de Frutillar, donde te embarcarás en el Catamarán Bandurria. Bajo la guía de navegantes expertos, surcarás aguas cristalinas mientras contemplas la imponente silueta de los volcanes Osorno, Calbuco y Puntiagudo, conociendo los secretos que guardan la historia y geografía de este entorno único.
              </p>
              <p className="font-['Fira_Sans'] text-lg leading-relaxed mb-4">
                El viaje culmina con un desembarque exclusivo en el muelle privado de Cancagua Spa & Retreat Center. Aquí, la relajación alcanza un nuevo nivel en sus Biopiscinas Geotermales, las primeras del mundo en su tipo. Sumérgete en aguas termales naturales, mantenidas entre 37° y 40°C mediante tecnología geotérmica sustentable, en un ambiente libre de químicos y en total armonía con la naturaleza.
              </p>
              <p className="font-['Fira_Sans'] text-lg leading-relaxed mb-4">
                Es la experiencia perfecta para quienes buscan desconexión total en pareja, familia o amigos.
              </p>
              <p className="font-['Fira_Sans'] text-lg leading-relaxed italic text-[#3a3a3a]/70">
                Nota: Debido a que la navegación depende de las condiciones climáticas, te recomendamos coordinar tu salida vía WhatsApp para asegurar el momento ideal para zarpar.
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
                {infoImportante.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
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
            Contáctanos por WhatsApp para coordinar tu experiencia de navegación en el Lago Llanquihue
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
  );
}
