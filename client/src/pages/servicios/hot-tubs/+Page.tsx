import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Thermometer, Clock, Users, UtensilsCrossed, Droplets, Leaf } from "lucide-react";

const BOOKING_URL = "https://reservas.cancagua.cl/cancaguaspa/s/f4975ff2-fd9c-4519-8103-97d6f75108bf";

export default function HotTubsPage() {
  const caracteristicas = [
    { icon: Thermometer, label: "Tº del agua", value: "40 - 41º" },
    { icon: Clock, label: "Duración", value: "2.5 hrs" },
    { icon: Users, label: "Capacidad máx.", value: "10 personas" },
    { icon: UtensilsCrossed, label: "Tablas y bebestibles", value: "Para compartir" },
  ];

  const antesDeVisita = [
    "Reserva con anticipación (cupos limitados)",
    "Traer traje de baño",
    "No se permite el ingreso con alimentos externos",
    "Cafetería disponible en el lugar",
  ];

  return (
    <div className="min-h-screen bg-[#F1E7D9]">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px]">
        <div className="absolute inset-0">
          <img
            src="/images/11_hottub-service.webp"
            alt="Hot Tubs Cancagua - Spa al aire libre en Frutillar"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light mb-4">
            Hot Tubs
          </h1>
          <p className="font-['Josefin_Sans'] text-xl md:text-2xl font-light tracking-wide mb-8 max-w-2xl">
            Descubre una experiencia única en nuestro spa al aire libre
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-10 py-6"
            >
              RESERVAR HOT TUB
            </Button>
          </a>
        </div>
      </section>

      {/* Descripción Principal */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl text-center">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] mb-8">
            6 Espacios Privados con Vista Privilegiada
          </h2>
          <p className="font-['Fira_Sans'] text-lg text-[#666] leading-relaxed mb-6">
            Contamos con seis espacios privados, cada uno con terrazas que incluyen ducha y cambiadores. Disfrutarás de una estadía de 4 horas, considerando 2.5 horas en el agua y 1.5 horas para disfrutar de nuestra infraestructura de cafetería, playa, baños y amenities.
          </p>
          <p className="font-['Fira_Sans'] text-lg text-[#666] leading-relaxed mb-10">
            Cada hot tub es especial, y está inmerso en un entorno natural para que disfrutes de cada experiencia, ya sea con vista al bosque nativo o a la bahía de Frutillar.
          </p>

          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider"
            >
              RESERVAR HOT TUB
            </Button>
          </a>
        </div>
      </section>

      {/* Características */}
      <section className="py-20 bg-[#F1E7D9]">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {caracteristicas.map((item, index) => (
              <Card key={index} className="bg-white border-none shadow-sm">
                <CardContent className="p-8 text-center">
                  <item.icon className="h-10 w-10 text-[#D3BC8D] mx-auto mb-4" />
                  <h3 className="font-['Josefin_Sans'] text-sm tracking-wider uppercase text-[#3a3a3a] mb-2">
                    {item.label}
                  </h3>
                  <p className="font-['Cormorant_Garamond'] text-2xl text-[#D3BC8D]">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experiencia Full Day */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/images/fullday-biopiscinas-hero.jpg"
                alt="Experiencia Full Day Cancagua"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] mb-6">
                Combina nuestros servicios para una experiencia full day
              </h2>
              <p className="font-['Fira_Sans'] text-lg text-[#666] leading-relaxed mb-6">
                Familia, eventos de empresa, celebraciones de cumpleaños, matrimonio y mucho más. Conecta con la naturaleza y disfruta de un lugar único para adquirir experiencias inolvidables.
              </p>
              <p className="font-['Fira_Sans'] text-sm text-[#888] mb-8">
                *Niños menores de 12 años entran gratis a hot tubs.
              </p>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider"
                >
                  RESERVAR HOT TUB + BIOPISCINAS
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Antes de tu Visita */}
      <section className="py-16 bg-[#F1E7D9]">
        <div className="container max-w-4xl">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] mb-8 text-center">
            Antes de tu Visita
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <div className="flex items-start gap-4 mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <span className="text-2xl">⚠️</span>
              <div>
                <h4 className="font-['Josefin_Sans'] font-semibold text-red-700 mb-1">
                  No se permite el acceso con bloqueador solar
                </h4>
                <p className="font-['Fira_Sans'] text-sm text-red-600">
                  Para mantener la calidad del agua y el ecosistema natural de nuestras instalaciones
                </p>
              </div>
            </div>
            <ul className="font-['Fira_Sans'] text-[#666] space-y-3">
              {antesDeVisita.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#D3BC8D]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Información Adicional */}
      <section className="py-20 bg-[#3a3a3a] text-white">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#D3BC8D] mb-4">
                Temperatura del agua
              </h3>
              <ul className="font-['Fira_Sans'] text-white/80 space-y-3">
                <li className="flex items-start gap-3">
                  <Droplets className="h-5 w-5 text-[#D3BC8D] mt-0.5 flex-shrink-0" />
                  <span>En invierno el agua está dispuesta a 40-41 grados a la hora que empieza la experiencia, y típicamente pierde unos 2 grados durante las 2.5 horas (aunque los hot tubs están aislados y con intercambiadores de calor).</span>
                </li>
                <li className="flex items-start gap-3">
                  <Thermometer className="h-5 w-5 text-[#D3BC8D] mt-0.5 flex-shrink-0" />
                  <span>En verano quedan aproximadamente 1 a 2 grados menos.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#D3BC8D] mb-4">
                Sustentabilidad
              </h3>
              <div className="flex items-start gap-3">
                <Leaf className="h-5 w-5 text-[#D3BC8D] mt-0.5 flex-shrink-0" />
                <p className="font-['Fira_Sans'] text-white/80">
                  El amor y cuidado de la naturaleza son dos de nuestros valores principales, por lo que la sustentabilidad es clave para nosotros. De esta forma, el agua de Cancagua es calentada con geotermia y aerotermia, que es la manera más sustentable disponible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-[#F1E7D9]">
        <div className="container text-center">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] mb-6">
            ¿Listo para vivir la experiencia?
          </h2>
          <p className="font-['Fira_Sans'] text-lg text-[#666] mb-8 max-w-2xl mx-auto">
            Reserva tu hot tub privado y disfruta de un momento único de relajación con vista al lago Llanquihue.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-12 py-6"
            >
              RESERVAR AHORA
            </Button>
          </a>
        </div>
      </section>

      {/* Cafetería */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] mb-6">
                Conoce nuestra cafetería
              </h2>
              <p className="font-['Fira_Sans'] text-lg text-[#666] leading-relaxed mb-4">
                Alimentación saludable y consciente exclusiva para nuestros clientes que estén disfrutando de servicios Cancagua.
              </p>
              <p className="font-['Fira_Sans'] text-lg text-[#666] leading-relaxed mb-4">
                Tenemos productos con proveedores de la cuenca Lago Llanquihue, incluyendo opciones veganas, sin gluten y sin lactosa.
              </p>
              <p className="font-['Fira_Sans'] text-sm text-[#888] mb-8">
                No está permitido el ingreso de comida a Biopiscinas.
              </p>
              <a href="/carta">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#D3BC8D] text-[#D3BC8D] hover:bg-[#D3BC8D] hover:text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider"
                >
                  CONOCE NUESTRA CARTA
                </Button>
              </a>
            </div>
            <div>
              <img
                src="/images/10_cancagua-header.jpg"
                alt="Cafetería Cancagua"
                className="rounded-lg shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
