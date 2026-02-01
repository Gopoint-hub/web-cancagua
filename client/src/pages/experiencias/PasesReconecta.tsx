import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Sparkles, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

export default function PasesReconecta() {
  const pases = [
    {
      id: "reconecta",
      title: "Pase Reconecta 5,5hrs",
      subtitle: "Hot-tub + Masaje + Kayak o Yoga",
      duration: "5.5 horas",
      image: "/images/pase-reconecta-hottub.png",
      description: "Experiencia completa de relajación en Hot-Tub privado techado inmerso en bosque nativo, con masaje relajante y actividad opcional.",
      highlights: ["Hot-Tub privado 2hrs", "Masaje relajante", "Kayak o Yoga gratis"],
      link: "/experiencias/pase-reconecta",
      bookingUrl: "https://reservas.cancagua.cl/cancaguaspa/s/d24af310-fe7f-426f-be9b-848c1d050b03"
    },
    {
      id: "reconecta-detox",
      title: "Pase Reconecta Detox 6,5hrs",
      subtitle: "Hot-tub + Masaje + Sauna + Kayak o Yoga",
      duration: "6.5 horas",
      image: "/images/pase-reconecta-sauna.png",
      description: "Experiencia detox completa combinando Hot-Tub privado, masaje relajante, sauna nativo frente al lago y actividad opcional.",
      highlights: ["Hot-Tub privado 2hrs", "Masaje + Sauna 1hr", "Kayak o Yoga gratis"],
      link: "/experiencias/pase-reconecta-detox",
      bookingUrl: "https://reservas.cancagua.cl/cancaguaspa/s/cb1312a9-4aca-4c71-9828-cc3911a9b782"
    },
    {
      id: "bioreconecta",
      title: "Pase BioReconecta 6hrs",
      subtitle: "Biopiscinas + Masaje + Kayak o Yoga",
      duration: "6 horas",
      image: "/images/pase-reconecta-masaje-1.png",
      description: "Experiencia en nuestras Biopiscinas geotermales naturales sin químicos, con masaje relajante y actividad opcional.",
      highlights: ["Biopiscinas 4hrs", "Masaje relajante", "Kayak o Yoga gratis"],
      link: "/experiencias/pase-bioreconecta",
      bookingUrl: "https://reservas.cancagua.cl/cancaguaspa/s/dc3b0862-ea5e-4809-81c6-450014ae8f87"
    },
    {
      id: "bioreconecta-detox",
      title: "Pase Bio-Reconecta Detox",
      subtitle: "Biopiscina + Masaje + Sauna + Kayak o Yoga",
      duration: "6+ horas",
      image: "/images/pase-reconecta-masaje-2.png",
      description: "Experiencia detox completa en Biopiscinas geotermales, masaje relajante, sauna a orillas del lago y actividad opcional.",
      highlights: ["Biopiscinas 4hrs", "Masaje + Sauna 1hr", "Kayak o Yoga gratis"],
      link: "/experiencias/pase-bioreconecta-detox",
      bookingUrl: "https://reservas.cancagua.cl/cancaguaspa/s/754d7334-33f0-43da-834e-d2eecbbf17be"
    }
  ];

  return (
    <AutoTranslateProvider pageId="pases-reconecta">
      <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
        <Navbar />
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
          </div>
          
          <div className="relative z-10 container text-center text-white space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium"><T>Experiencias de Reconexión</T></span>
            </div>
            <h1 className="text-5xl md:text-6xl font-josefin font-bold tracking-tight">
              <T>Pases Reconecta</T>
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
              <T>Experiencias diseñadas para tu bienestar integral: Hot-Tubs privados, Biopiscinas geotermales, masajes y actividades en la naturaleza</T>
            </p>
          </div>
        </section>

        {/* Pases Grid */}
        <section className="py-20 container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {pases.map((pase) => (
              <Card 
                key={pase.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={pase.image}
                    alt={pase.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Clock className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-semibold text-stone-800"><T>{pase.duration}</T></span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-josefin font-bold mb-1"><T>{pase.title}</T></h3>
                    <p className="text-white/90 text-sm"><T>{pase.subtitle}</T></p>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <p className="text-stone-600 leading-relaxed">
                    <T>{pase.description}</T>
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {pase.highlights.map((highlight, i) => (
                      <span 
                        key={i}
                        className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        <Sparkles className="h-3 w-3" />
                        <T>{highlight}</T>
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Link href={pase.link} className="flex-1">
                      <Button 
                        variant="outline" 
                        className="w-full group/btn"
                      >
                        <T>Ver detalles</T>
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <a 
                      href={pase.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full bg-amber-600 hover:bg-amber-700">
                        <T>Reservar ahora</T>
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-stone-100">
          <div className="container text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-josefin font-bold text-stone-800">
              <T>¿Necesitas ayuda para elegir?</T>
            </h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              <T>Nuestro equipo está disponible para asesorarte y ayudarte a encontrar la experiencia perfecta para ti</T>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="https://wa.me/56940073999" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <T>Contactar por WhatsApp</T>
                </Button>
              </a>
              <Link href="/contacto">
                <Button size="lg" variant="outline">
                  <T>Ver más formas de contacto</T>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </AutoTranslateProvider>
  );
}
