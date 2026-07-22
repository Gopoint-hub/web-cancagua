import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Users, Anchor, Compass } from "lucide-react";

const RESERVA_URL = "https://tickets.catamaranbandurria.cl/";

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
          style={{ backgroundImage: "url(https://res.cloudinary.com/dhuln9b1n/image/upload/w_1920,h_1080,c_fill,q_auto,f_auto/v1781368292/cancagua/images/navega-relax-hero-lago-catamaran-2026-06-13.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
          <div className="inline-block bg-[#4B5872] text-[#FCF9F9] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Experiencia Única
          </div>
          <h1 className="font-cg-serif text-4xl md:text-6xl lg:text-7xl font-light mb-4 tracking-wide">
            Navega Relax
          </h1>
          <p className="font-cg-sans text-lg md:text-2xl mb-8 max-w-3xl text-white/90">
            Descubre el Lago Llanquihue desde una perspectiva única navegando en Catamarán Bandurria para luego disfrutar de una relajante estadía en nuestras Biopiscinas Geotermales
          </p>
          <a href={RESERVA_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#4B5872] text-[#FCF9F9] hover:bg-[#333D51] text-lg px-8 py-6">
              Reservar
            </Button>
          </a>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-cg-mono text-3xl md:text-4xl text-[#222221] mb-6 text-center tracking-wide">
              Una Aventura en el Lago Llanquihue
            </h2>
            <div className="prose prose-lg max-w-none text-[#222221]/80">
              <p className="font-cg-sans text-lg leading-relaxed mb-4">
                "Navega Relax" te invita a descubrir la majestuosidad del Lago Llanquihue desde una perspectiva privilegiada. Tu aventura comienza en el icónico Muelle de Frutillar, donde te embarcarás en el Catamarán Bandurria. Bajo la guía de navegantes expertos, surcarás aguas cristalinas mientras contemplas la imponente silueta de los volcanes Osorno, Calbuco y Puntiagudo, conociendo los secretos que guardan la historia y geografía de este entorno único.
              </p>
              <p className="font-cg-sans text-lg leading-relaxed mb-4">
                El viaje culmina con un desembarque exclusivo en el muelle privado de Cancagua Spa & Retreat Center. Aquí, la relajación alcanza un nuevo nivel en sus Biopiscinas Geotermales, las primeras del mundo en su tipo. Sumérgete en aguas termales naturales, mantenidas entre 37° y 40°C mediante tecnología geotérmica sustentable, en un ambiente libre de químicos y en total armonía con la naturaleza.
              </p>
              <p className="font-cg-sans text-lg leading-relaxed mb-4">
                Es la experiencia perfecta para quienes buscan desconexión total en pareja, familia o amigos.
              </p>
              <p className="font-cg-sans text-lg leading-relaxed italic text-[#222221]/70">
                Nota: Debido a que la navegación depende de las condiciones climáticas, te recomendamos coordinar tu salida vía WhatsApp para asegurar el momento ideal para zarpar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-16 bg-[#F4F2ED]">
        <div className="container">
          <h2 className="font-cg-mono text-3xl md:text-4xl text-[#222221] mb-12 text-center tracking-wide">
            Características
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((item, index) => (
              <Card key={index} className="border-[#4B5872]/30 bg-white">
                <CardContent className="p-6 text-center">
                  <item.icon className="h-12 w-12 mx-auto mb-4 text-[#4B5872]" />
                  <h3 className="font-cg-mono font-semibold text-lg mb-2 text-[#222221]">
                    {item.title}
                  </h3>
                  <p className="font-cg-sans text-[#222221]/70">
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
            <h2 className="font-cg-mono text-3xl md:text-4xl text-[#222221] mb-8 text-center tracking-wide">
              La Experiencia Incluye
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {incluye.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-[#F4F2ED] rounded-lg">
                  <Check className="h-5 w-5 text-[#4B5872] mt-0.5 flex-shrink-0" />
                  <span className="font-cg-sans text-[#222221]">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-clay-100 rounded-lg border border-clay-200">
              <h3 className="font-cg-mono font-semibold text-lg mb-2 text-[#222221]">
                Información Importante
              </h3>
              <ul className="space-y-2 text-sm font-cg-sans text-[#222221]/80">
                {infoImportante.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-b from-[#222221] to-[#222221] text-white">
        <div className="container text-center">
          <h2 className="font-cg-mono text-3xl md:text-4xl mb-4 tracking-wide">
            ¿Listo para navegar?
          </h2>
          <p className="font-cg-sans text-lg mb-8 text-white/80 max-w-2xl mx-auto">
            Reserva tu experiencia de navegación en el Lago Llanquihue
          </p>
          <a href={RESERVA_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#4B5872] text-[#FCF9F9] hover:bg-[#333D51] text-lg px-8">
              Reservar
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}
