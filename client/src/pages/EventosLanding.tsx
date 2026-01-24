import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

// Eventos destacados con enlaces a sus landing pages
const featuredEvents = [
  {
    id: 1,
    title: "Heart Coherence Workshop",
    description: "Taller de coherencia cardíaca con Sonja Bloder. Aprende técnicas de respiración y meditación para equilibrar tu sistema nervioso.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/sonja-bloder.png",
    date: "15 de Febrero, 2026",
    time: "10:00 - 14:00",
    location: "Cancagua Spa & Retreat Center",
    price: "$45.000 CLP",
    href: "/eventos/heart-coherence-workshop",
  },
  {
    id: 2,
    title: "Taller Método Wim Hof",
    description: "Experiencia transformadora con Alan IceMan, único instructor avanzado del Método Wim Hof en Chile. Respiración, mentalidad y exposición al frío.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/alan-iceman.png",
    date: "31 de Enero, 2026",
    time: "09:00 - 13:15",
    location: "Cancagua Spa & Retreat Center",
    price: "$45.000 CLP",
    href: "/eventos/taller-wim-hof",
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

export function EventosLanding() {
  return (
    <AutoTranslateProvider pageId="eventos-landing">
      <div className="min-h-screen bg-[#FDFBF7]">
        <Navbar />

        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/07_eventos-hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
            <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
              <T>Experiencias Transformadoras</T>
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wider text-white mb-6">
              <T>Eventos & Talleres</T>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light">
              <T>Vive experiencias únicas de bienestar, crecimiento personal y conexión con la naturaleza</T>
            </p>
          </div>
        </section>

        {/* Próximos Eventos Section */}
        <section className="py-20 md:py-28 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                <T>Agenda</T>
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
                <T>Próximos Eventos</T>
              </h2>
              <p className="text-lg text-[#8C8C8C] font-accent italic max-w-2xl mx-auto">
                <T>Descubre nuestros talleres y experiencias diseñadas para tu bienestar integral</T>
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
                    <CardTitle className="text-2xl font-light tracking-wide"><T>{event.title}</T></CardTitle>
                    <CardDescription className="text-base"><T>{event.description}</T></CardDescription>
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
                        <T>Ver Detalles</T>
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
                  <T>Celebra con Nosotros</T>
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
                  <T>Eventos Sociales</T>
                </h2>
                <p className="text-[#5a5a5a] text-lg mb-6 font-light">
                  <T>Celebra momentos especiales en nuestro espacio único. Cumpleaños, aniversarios, reuniones familiares y más, en el ambiente perfecto rodeado de naturaleza.</T>
                </p>
                <ul className="space-y-3 mb-8">
                  {socialEventsList.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#D3BC8D] rounded-full" />
                      <span className="text-[#5a5a5a]"><T>{item}</T></span>
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
                  <T>Cotizar</T>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/02_biopiscinas-hero.jpg" 
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
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/07_eventos-hero.jpg" 
                  alt="Eventos Corporativos en Cancagua"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="order-1 md:order-2">
                <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                  <T>Experiencias Corporativas</T>
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6">
                  <T>Eventos Corporativos</T>
                </h2>
                <p className="text-[#5a5a5a] text-lg mb-6 font-light">
                  <T>Diseñamos experiencias corporativas únicas para tu equipo. Team building, retiros de liderazgo, conferencias y eventos de incentivo en un ambiente inspirador.</T>
                </p>
                <ul className="space-y-3 mb-8">
                  {corporateEventsList.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#D3BC8D] rounded-full" />
                      <span className="text-[#5a5a5a]"><T>{item}</T></span>
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
                  <T>Cotizar</T>
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
              <T>¿Listo para crear tu evento?</T>
            </h2>
            <p className="text-lg text-white/80 mb-8 font-light">
              <T>Contáctanos para diseñar la experiencia perfecta para ti. Nuestro equipo está listo para hacer realidad tu evento.</T>
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
              <T>Contactar</T>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </AutoTranslateProvider>
  );
}
