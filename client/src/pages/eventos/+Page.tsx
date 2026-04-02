import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";

// Eventos destacados con enlaces a sus landing pages
const featuredEvents = [
  {
    id: 1,
    title: "Concierto Equinoccio de Otoño — Cambio de Piel ✨",
    description: "Concierto íntimo acústico con Daniela Conejero (voz) e Ítalo Aguilera (guitarra). Vive la música junto a las biopiscinas geotermales en el atardecer.",
    image: "https://cdn.getskedu.com/skedu-v2/5d59ea78-5b85-4274-b771-5ca34e689061/a5ac625d2db04b39a004b6b2851d0995.jpeg",
    date: "11 de Abril, 2026",
    time: "19:00 - 20:30",
    location: "Cancagua Spa & Retreat Center",
    price: "",
    href: "/eventos/concierto",
  },
];

const socialEventsList = [
  "Cumpleaños y aniversarios",
  "Reuniones familiares",
  "Despedidas de soltero/a",
  "Retiros de amigos",
  "Baby showers y celebraciones",
];

const corporateEventsList = [
  "Team building y dinámicas de grupo",
  "Retiros de liderazgo",
  "Conferencias y workshops",
  "Eventos de incentivo",
  "Jornadas de bienestar corporativo",
];

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://res.cloudinary.com/dhuln9b1n/image/upload/f_auto,q_auto/cancagua/eventos/eventos-header-lago.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
            Experiencias Transformadoras
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-white mb-6">
            Eventos & Talleres
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light">
            Vive experiencias únicas de bienestar, crecimiento personal y conexión con la naturaleza
          </p>
        </div>
      </section>

      {/* Próximos Eventos Section */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
              Agenda
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
              Próximos Eventos
            </h2>
            <p className="text-lg text-[#8C8C8C] font-accent italic max-w-2xl mx-auto">
              Descubre nuestros talleres y experiencias diseñadas para tu bienestar integral
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#D3BC8D] text-[#3a3a3a] px-4 py-2 text-sm font-medium">
                    {event.price}
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl font-light tracking-wide">{event.title}</CardTitle>
                  <CardDescription className="text-base">{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-3 text-[#5a5a5a]">
                      <Calendar className="w-4 h-4 text-[#D3BC8D]" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#5a5a5a]">
                      <Clock className="w-4 h-4 text-[#D3BC8D]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[#5a5a5a]">
                      <MapPin className="w-4 h-4 text-[#D3BC8D]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Link href={event.href}>
                    <Button className="w-full gap-2 bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-widest uppercase">
                      Ver Detalles
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eventos Sociales Section */}
      <section className="py-20 md:py-28 px-4 bg-[#F1E7D9]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Celebra con Nosotros
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
                Eventos Sociales
              </h2>
              <p className="text-[#5a5a5a] text-lg mb-6 font-light">
                Celebra momentos especiales en nuestro espacio único. Cumpleaños, aniversarios, reuniones familiares y más, en el ambiente perfecto rodeado de naturaleza.
              </p>
              <ul className="space-y-3 mb-8">
                {socialEventsList.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#D3BC8D] rounded-full" />
                    <span className="text-[#5a5a5a]">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hola, me gustaría cotizar un evento social en Cancagua"
                  );
                  window.open(`https://wa.me/56940073999?text=${message}`, "_blank");
                }}
                className="gap-2 bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-widest uppercase"
              >
                Cotizar
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp"
                alt="Eventos Sociales en Cancagua"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Eventos Corporativos Section */}
      <section className="py-20 md:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
              <img
                src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309226/cancagua/images/navega-relax-header.jpg"
                alt="Eventos Corporativos en Cancagua"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Experiencias Corporativas
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
                Eventos Corporativos
              </h2>
              <p className="text-[#5a5a5a] text-lg mb-6 font-light">
                Diseñamos experiencias corporativas únicas para tu equipo. Team building, retiros de liderazgo, conferencias y eventos de incentivo en un ambiente inspirador.
              </p>
              <ul className="space-y-3 mb-8">
                {corporateEventsList.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-[#D3BC8D] rounded-full" />
                    <span className="text-[#5a5a5a]">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hola, me gustaría cotizar un evento corporativo en Cancagua"
                  );
                  window.open(`https://wa.me/56940073999?text=${message}`, "_blank");
                }}
                className="gap-2 bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-widest uppercase"
              >
                Cotizar
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 px-4 bg-[#3a3a3a]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light tracking-wide text-white mb-6">
            ¿Listo para crear tu evento?
          </h2>
          <p className="text-lg text-white/80 mb-8 font-light">
            Contáctanos para diseñar la experiencia perfecta para ti. Nuestro equipo está listo para hacer realidad tu evento.
          </p>
          <Button
            onClick={() => {
              const message = encodeURIComponent(
                "Hola, me gustaría información sobre eventos en Cancagua"
              );
              window.open(`https://wa.me/56940073999?text=${message}`, "_blank");
            }}
            size="lg"
            className="gap-2 bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] tracking-widest uppercase"
          >
            Contactar
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
