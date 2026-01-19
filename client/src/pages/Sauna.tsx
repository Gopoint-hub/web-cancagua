import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Users, Flame, Heart, Wind, Droplets } from "lucide-react";

export default function Sauna() {
  const saunaOptions = [
    {
      title: "Sauna Nativo 1 Persona",
      price: "$15.000 CLP",
      duration: "1 hr",
      capacity: "1 persona",
      image: "/images/sauna-nativo-hero.png",
      reservaUrl: "https://reservas.cancagua.cl/cancaguaspa/s/294abb1b-bda0-4e10-8600-7d225f6ce663",
    },
    {
      title: "Sauna Nativo 2 Personas",
      price: "$25.000 CLP",
      duration: "1 hr",
      capacity: "2 personas",
      image: "/images/sauna-nativo-hero.png",
      reservaUrl: "https://reservas.cancagua.cl/cancaguaspa/s/486ccef7-d9d0-4310-9eaf-8034ece7ac26",
    },
    {
      title: "Sauna Nativo 3 Personas",
      price: "$33.000 CLP",
      duration: "1 hr",
      capacity: "3 personas",
    "image": "/images/sauna-nativo-hero.png",
      reservaUrl: "https://reservas.cancagua.cl/cancaguaspa/s/d2ff9cba-5073-4d6b-9992-fb0e4d727caf",
    },
    {
      title: "Sauna Nativo Privado",
      price: "$40.000 CLP",
      duration: "1 hr",
      capacity: "Hasta 6 personas",
      image: "/images/sauna-nativo-hero.png",
      reservaUrl: "https://reservas.cancagua.cl/cancaguaspa/s/a944a041-9556-4c39-9252-ef1a01b28439",
      featured: true,
    },
  ];

  const beneficios = [
    {
      icon: Flame,
      title: "Desintoxicación Profunda",
      description: "Elimina toxinas a través del sudor y purifica tu cuerpo de forma natural.",
    },
    {
      icon: Heart,
      title: "Mejora Circulación",
      description: "Estimula el flujo sanguíneo y fortalece el sistema cardiovascular.",
    },
    {
      icon: Wind,
      title: "Relajación Muscular",
      description: "Alivia tensiones y dolores musculares con el calor terapéutico.",
    },
    {
      icon: Droplets,
      title: "Piel Radiante",
      description: "Limpia los poros profundamente y rejuvenece la piel.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/sauna-nativo-hero.png"
              alt="Sauna Nativo Cancagua"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
          </div>

          <div className="relative z-10 container text-center text-white px-4">
            <span className="text-white/90 text-sm md:text-base tracking-[0.3em] uppercase mb-4 block">
              Experiencia Termal
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6">
              Sauna Nativo
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
              Disfruta de una hora de relajación y conexión a orillas del Lago Llanquihue.
              Un espacio de calor envolvente y renovación profunda.
            </p>
            <Button
              size="lg"
              className="bg-[#D3BC8D] hover:bg-[#C5AE7F] text-white px-8 py-6 text-lg"
              asChild
            >
              <a href="#opciones">Ver Opciones</a>
            </Button>
          </div>
        </section>

        {/* Opciones de Sauna */}
        <section id="opciones" className="py-20 bg-white">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Elige Tu Experiencia
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                Opciones de Sauna
              </h2>
              <p className="text-lg text-[#8C8C8C] max-w-2xl mx-auto">
                Selecciona la opción que mejor se adapte a tu grupo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {saunaOptions.map((option, index) => (
                <Card
                  key={index}
                  className={`overflow-hidden hover:shadow-xl transition-all ${
                    option.featured ? "ring-2 ring-[#D3BC8D]" : ""
                  }`}
                >
                  <div className="relative h-48">
                    <img
                      src={option.image}
                      alt={option.title}
                      className="w-full h-full object-cover"
                    />
                    {option.featured && (
                      <div className="absolute top-4 right-4 bg-[#D3BC8D] text-white px-3 py-1 rounded-full text-xs font-medium">
                        Más Popular
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-light tracking-wide mb-3 text-[#3a3a3a]">
                      {option.title}
                    </h3>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-[#8C8C8C]">
                        <Clock className="h-4 w-4" />
                        <span>{option.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#8C8C8C]">
                        <Users className="h-4 w-4" />
                        <span>{option.capacity}</span>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-3xl font-light text-[#D3BC8D]">{option.price}</p>
                    </div>
                    <Button
                      className="w-full bg-[#D3BC8D] hover:bg-[#C5AE7F] text-white"
                      asChild
                    >
                      <a href={option.reservaUrl} target="_blank" rel="noopener noreferrer">
                        Reservar Ahora
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20 bg-gradient-to-br from-[#F5F5F0] to-white">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-[#D3BC8D] text-sm tracking-[0.3em] uppercase mb-4 block">
                Bienestar Integral
              </span>
              <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                Beneficios del Sauna
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {beneficios.map((beneficio, index) => {
                const Icon = beneficio.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-full bg-[#D3BC8D]/10 flex items-center justify-center mx-auto mb-6">
                        <Icon className="h-8 w-8 text-[#D3BC8D]" />
                      </div>
                      <h3 className="text-xl font-light tracking-wide mb-3 text-[#3a3a3a]">
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

        {/* Información Adicional */}
        <section className="py-20 bg-white">
          <div className="container max-w-4xl">
            <Card className="border-[#D3BC8D]/30">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-light tracking-wide mb-6 text-[#3a3a3a]">
                  Antes de tu Visita
                </h3>
                <div className="flex items-start gap-4 mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
                  <span className="text-2xl">⚠️</span>
                  <div>
                    <h4 className="font-semibold text-red-700 mb-1">No se permite el acceso con bloqueador solar</h4>
                    <p className="text-sm text-red-600">Para mantener la calidad de nuestras instalaciones</p>
                  </div>
                </div>
                <ul className="space-y-4 text-[#8C8C8C]">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D3BC8D] mt-2 flex-shrink-0" />
                    <span>Duración de la sesión: 1 hora</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D3BC8D] mt-2 flex-shrink-0" />
                    <span>Ubicación privilegiada con vista al Lago Llanquihue</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D3BC8D] mt-2 flex-shrink-0" />
                    <span>Arriendo de batas y toallas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D3BC8D] mt-2 flex-shrink-0" />
                    <span>Recomendamos hidratarse antes y después de la sesión</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#D3BC8D] mt-2 flex-shrink-0" />
                    <span>No recomendado para personas con problemas cardiovasculares o embarazadas</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-[#D3BC8D]">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-light tracking-wide mb-6 text-white">
              ¿Listo para renovarte?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Reserva tu sesión de sauna y experimenta la relajación profunda que tu cuerpo necesita
            </p>
            <Button
              size="lg"
              className="bg-white hover:bg-white/90 text-[#3a3a3a] px-8 py-6 text-lg"
              asChild
            >
              <a href="#opciones">Reservar Ahora</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
