import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Wind, Snowflake, Brain, Heart } from "lucide-react";

export default function TallerWimHof() {
  const beneficios = [
    {
      icon: Wind,
      title: "Técnicas de Respiración",
      description: "Aprende ejercicios de respiración consciente que oxigenan profundamente tu cuerpo y mente.",
    },
    {
      icon: Snowflake,
      title: "Exposición al Frío",
      description: "Descubre cómo el frío controlado fortalece tu sistema inmune y aumenta tu energía vital.",
    },
    {
      icon: Brain,
      title: "Control Mental",
      description: "Desarrolla la capacidad de controlar tu mente y respuesta al estrés a través de la concentración.",
    },
    {
      icon: Heart,
      title: "Bienestar Integral",
      description: "Experimenta una transformación profunda en tu salud física, mental y emocional.",
    },
  ];

  const queIncluye = [
    "Introducción al Método Wim Hof y sus fundamentos científicos",
    "Sesión práctica de técnicas de respiración guiadas",
    "Exposición controlada al frío en biopiscinas geotermales",
    "Ejercicios de meditación y concentración mental",
    "Material digital de apoyo para práctica en casa",
    "Certificado de participación",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/02_biopiscinas-hero.jpg"
              alt="Taller Método Wim Hof"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>

          <div className="relative z-10 container text-center text-white px-4">
            <div className="inline-block bg-[#D3BC8D] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              Evento Especial
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6">
              Taller del Método Wim Hof
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-4 text-white/90 font-light">
              con Alan IceMan
            </p>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/80">
              Una experiencia profunda de respiración, mente y frío guiada por el único
              Instructor Avanzado del Método Wim Hof en Chile
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-white/90">
                <Calendar className="h-5 w-5" />
                <span className="text-lg">Sábado 31 de Enero 2026</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Clock className="h-5 w-5" />
                <span className="text-lg">4 hrs 15 min</span>
              </div>
            </div>
            <Button
              size="lg"
              className="bg-[#D3BC8D] hover:bg-[#C5AE7F] text-white px-10 py-7 text-lg"
              asChild
            >
              <a
                href="https://reservas.cancagua.cl/cancaguaspa/s/4ef7ffc4-7d23-4acd-af42-79a8c78fb1b5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reservar Mi Cupo - $45.000
              </a>
            </Button>
            <p className="mt-4 text-sm text-white/70">¡Solo quedan 5 cupos disponibles!</p>
          </div>
        </section>

        {/* Sobre el Instructor */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <img
                    src="/images/alan-iceman.png"
                    alt="Alan IceMan"
                    className="rounded-lg shadow-xl w-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                    Tu Instructor
                  </span>
                  <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                    Alan IceMan
                  </h2>
                  <p className="text-lg text-[#8C8C8C] mb-6">
                    Único <strong className="text-[#3a3a3a]">Instructor Avanzado del Método Wim Hof</strong> en Chile,
                    certificado directamente por Wim Hof. Con años de experiencia guiando a cientos de personas
                    en su transformación personal a través de las técnicas de respiración, exposición al frío
                    y entrenamiento mental.
                  </p>
                  <p className="text-lg text-[#8C8C8C]">
                    Alan combina su profundo conocimiento del método con una pasión genuina por ayudar a otros
                    a descubrir su potencial interno y superar sus límites mentales y físicos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Qué es el Método Wim Hof */}
        <section className="py-20 bg-gradient-to-br from-[#F5F5F0] to-white">
          <div className="container max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Descubre el Método
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                ¿Qué es el Método Wim Hof?
              </h2>
              <p className="text-lg text-[#8C8C8C] max-w-2xl mx-auto">
                Un sistema científicamente probado que combina tres pilares fundamentales para
                transformar tu salud y bienestar
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-[#D3BC8D]/10 flex items-center justify-center mx-auto mb-6">
                    <Wind className="h-8 w-8 text-[#D3BC8D]" />
                  </div>
                  <h3 className="text-xl font-light tracking-wide mb-3 text-[#3a3a3a]">
                    Respiración
                  </h3>
                  <p className="text-sm text-[#8C8C8C]">
                    Técnicas específicas que aumentan la oxigenación celular y alcalinizan el cuerpo
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-[#D3BC8D]/10 flex items-center justify-center mx-auto mb-6">
                    <Snowflake className="h-8 w-8 text-[#D3BC8D]" />
                  </div>
                  <h3 className="text-xl font-light tracking-wide mb-3 text-[#3a3a3a]">
                    Exposición al Frío
                  </h3>
                  <p className="text-sm text-[#8C8C8C]">
                    Fortalece el sistema inmune, mejora la circulación y aumenta la energía vital
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-[#D3BC8D]/10 flex items-center justify-center mx-auto mb-6">
                    <Brain className="h-8 w-8 text-[#D3BC8D]" />
                  </div>
                  <h3 className="text-xl font-light tracking-wide mb-3 text-[#3a3a3a]">
                    Compromiso Mental
                  </h3>
                  <p className="text-sm text-[#8C8C8C]">
                    Desarrolla fuerza mental, concentración y control sobre tu sistema nervioso
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Transforma Tu Vida
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                Beneficios del Taller
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {beneficios.map((beneficio, index) => {
                const Icon = beneficio.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-[#D3BC8D]/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-[#D3BC8D]" />
                      </div>
                      <h3 className="text-lg font-light tracking-wide mb-3 text-[#3a3a3a]">
                        {beneficio.title}
                      </h3>
                      <p className="text-sm text-[#8C8C8C]">{beneficio.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Qué Incluye */}
        <section className="py-20 bg-gradient-to-br from-[#F5F5F0] to-white">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Experiencia Completa
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                Qué Incluye el Taller
              </h2>
            </div>

            <Card>
              <CardContent className="p-8">
                <ul className="space-y-4">
                  {queIncluye.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#D3BC8D] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#3a3a3a]">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Detalles del Evento */}
        <section className="py-20 bg-white">
          <div className="container max-w-4xl">
            <div className="text-center mb-12">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Información Práctica
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                Detalles del Evento
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D3BC8D]/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-6 w-6 text-[#D3BC8D]" />
                    </div>
                    <div>
                      <h3 className="font-light text-lg mb-2 text-[#3a3a3a]">Fecha</h3>
                      <p className="text-[#8C8C8C]">Sábado 31 de Enero 2026</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D3BC8D]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-[#D3BC8D]" />
                    </div>
                    <div>
                      <h3 className="font-light text-lg mb-2 text-[#3a3a3a]">Duración</h3>
                      <p className="text-[#8C8C8C]">4 horas 15 minutos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D3BC8D]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[#D3BC8D]" />
                    </div>
                    <div>
                      <h3 className="font-light text-lg mb-2 text-[#3a3a3a]">Ubicación</h3>
                      <p className="text-[#8C8C8C]">Cancagua Spa & Retreat Center, Frutillar, Chile</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#D3BC8D]/10 flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-[#D3BC8D]" />
                    </div>
                    <div>
                      <h3 className="font-light text-lg mb-2 text-[#3a3a3a]">Cupos</h3>
                      <p className="text-[#8C8C8C]">Limitados - ¡Solo quedan 5 disponibles!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-[#D3BC8D]">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-white">
              ¿Listo para transformar tu vida?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Únete a esta experiencia única y descubre el poder del Método Wim Hof
              de la mano del mejor instructor de Chile
            </p>
            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-[#3a3a3a] px-10 py-7 text-lg"
                asChild
              >
                <a
                  href="https://reservas.cancagua.cl/cancaguaspa/s/4ef7ffc4-7d23-4acd-af42-79a8c78fb1b5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reservar Mi Cupo Ahora
                </a>
              </Button>
              <p className="text-white/80 text-lg">
                Inversión: <span className="font-medium text-white">$45.000 CLP</span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
