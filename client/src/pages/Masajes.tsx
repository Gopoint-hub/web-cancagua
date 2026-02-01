import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Sparkles, Heart, Leaf } from "lucide-react";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

const BOOKING_URL = "https://reservas.cancagua.cl/cancaguaspa/s/502a130d-2e50-472a-aabc-a7917d5b5fbe";

interface MassageService {
  name: string;
  duration: string;
  price: string;
}

const massageServices: MassageService[] = [
  { name: "Masaje de relajación", duration: "50 min", price: "$45.000" },
  { name: "Masaje de relajación", duration: "90 min", price: "$81.000" },
  { name: "Masaje Descontracturante", duration: "50 min", price: "$50.000" },
  { name: "Masaje Descontracturante", duration: "90 min", price: "$90.000" },
  { name: "Masaje con Piedras Calientes", duration: "50 min", price: "$45.000" },
  { name: "Masaje con Piedras Calientes", duration: "90 min", price: "$81.000" },
  { name: "Drenaje Linfático", duration: "50 min", price: "$45.000" },
  { name: "Drenaje Linfático", duration: "90 min", price: "$81.000" },
  { name: "Cuidado Facial", duration: "20 min", price: "$30.000" },
  { name: "Reflexología Podal", duration: "40 min", price: "$40.000" },
  { name: "Masaje Prenatal", duration: "50 min", price: "$45.000" },
  { name: "Masaje Mixto", duration: "50 min", price: "$50.000" },
  { name: "Masaje Mixto", duration: "90 min", price: "$90.000" },
];

const beneficios = [
  {
    title: "Masaje de Relajación",
    description: "Ideal para liberar el estrés acumulado y alcanzar un estado de calma profunda. Utiliza movimientos suaves y fluidos que relajan los músculos y la mente."
  },
  {
    title: "Masaje Descontracturante",
    description: "Enfocado en aliviar tensiones musculares profundas y contracturas. Perfecto para quienes sufren de dolores cervicales, lumbares o de espalda."
  },
  {
    title: "Piedras Calientes",
    description: "Combina el masaje tradicional con piedras volcánicas calientes que penetran profundamente en los músculos, aliviando tensiones y mejorando la circulación."
  },
  {
    title: "Drenaje Linfático",
    description: "Técnica suave que estimula el sistema linfático, ayudando a eliminar toxinas, reducir la retención de líquidos y mejorar el sistema inmunológico."
  }
];

export default function Masajes() {
  return (
    <AutoTranslateProvider pageId="masajes">
      <div className="min-h-screen bg-[#F1E7D9]">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px]">
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1769558778/cancagua/images/masajes-hero.jpg"
              alt="Masajes Cancagua"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          </div>
          
          <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
            <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light mb-4">
              <T>Masajes & Terapias</T>
            </h1>
            <p className="font-['Josefin_Sans'] text-xl md:text-2xl font-light tracking-wide mb-8 max-w-2xl">
              <T>Descubre nuestras sesiones de renovación y descanso en un ambiente armónico y natural</T>
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-10 py-6"
              >
                <T>RESERVAR MASAJE</T>
              </Button>
            </a>
          </div>
        </section>

        {/* Descripción */}
        <section className="py-16 bg-white">
          <div className="container max-w-4xl text-center">
            <p className="font-['Fira_Sans'] text-lg text-[#666] leading-relaxed mb-6">
              <T>Tu bienestar es nuestro compromiso. Tenemos diversos tipos de masajes diseñados para renovar tu cuerpo y mente en un entorno natural único.</T>
            </p>
            <div className="flex justify-center gap-8 mt-8 flex-wrap">
              <div className="flex items-center gap-2 text-[#D3BC8D]">
                <Sparkles className="h-5 w-5" />
                <span className="font-['Fira_Sans'] text-sm text-[#666]"><T>Ambiente relajante</T></span>
              </div>
              <div className="flex items-center gap-2 text-[#D3BC8D]">
                <Heart className="h-5 w-5" />
                <span className="font-['Fira_Sans'] text-sm text-[#666]"><T>Terapeutas certificados</T></span>
              </div>
              <div className="flex items-center gap-2 text-[#D3BC8D]">
                <Leaf className="h-5 w-5" />
                <span className="font-['Fira_Sans'] text-sm text-[#666]"><T>Productos naturales</T></span>
              </div>
            </div>
          </div>
        </section>

        {/* Lista de Servicios */}
        <section className="py-20 bg-[#F1E7D9]">
          <div className="container max-w-5xl">
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] text-center mb-4">
              <T>Selecciona tu experiencia</T>
            </h2>
            <p className="font-['Fira_Sans'] text-[#666] text-center mb-12">
              <T>Elige el masaje que mejor se adapte a tus necesidades</T>
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {massageServices.map((service, index) => (
                <a 
                  key={index} 
                  href={BOOKING_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="bg-white border-none shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-['Josefin_Sans'] text-lg text-[#3a3a3a] mb-2 group-hover:text-[#D3BC8D] transition-colors">
                            <T>{service.name}</T> ({service.duration})
                          </h3>
                          <div className="flex items-center gap-2 text-[#888]">
                            <Clock className="h-4 w-4" />
                            <span className="font-['Fira_Sans'] text-sm">{service.duration}</span>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <span className="font-['Cormorant_Garamond'] text-2xl text-[#D3BC8D]">
                            {service.price}
                          </span>
                          <span className="font-['Josefin_Sans'] text-xs text-[#D3BC8D] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                            <T>Reservar</T> →
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-12 py-6"
                >
                  <T>RESERVAR AHORA</T>
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Galería */}
        <section className="py-20 bg-white">
          <div className="container">
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] text-center mb-12">
              <T>Nuestro espacio</T>
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <img
                src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1769558778/cancagua/images/masajes-hero.jpg"
                alt="Masaje relajante"
                className="rounded-lg shadow-md w-full h-64 object-cover"
              />
              <img
                src="/images/fullday-biopiscinas-hero.jpg"
                alt="Biopiscinas"
                className="rounded-lg shadow-md w-full h-64 object-cover"
              />
              <img
                src="/images/11_hottub-service.webp"
                alt="Hot Tubs"
                className="rounded-lg shadow-md w-full h-64 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-20 bg-[#3a3a3a] text-white">
          <div className="container max-w-4xl">
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-center mb-12">
              <T>Beneficios de nuestros masajes</T>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {beneficios.map((beneficio, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#D3BC8D]">
                    <T>{beneficio.title}</T>
                  </h3>
                  <p className="font-['Fira_Sans'] text-white/80">
                    <T>{beneficio.description}</T>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Banner Puerto Varas */}
        <section className="py-12 bg-gradient-to-r from-[#1a5276] to-[#2874a6]">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                  <svg className="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-['Josefin_Sans'] text-sm text-white/80 uppercase tracking-wider">
                    <T>También en Puerto Varas</T>
                  </span>
                </div>
                <h3 className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-white mb-2">
                  <T>Spa en Hotel Cabañas del Lago</T>
                </h3>
                <p className="font-['Fira_Sans'] text-white/80 max-w-lg">
                  <T>Disfruta de nuestros masajes en el corazón de Puerto Varas.</T>
                </p>
              </div>
              <a href="/spa-hotel-cabanas-del-lago">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-white/90 text-[#1a5276] font-['Josefin_Sans'] tracking-wider px-8 py-6 whitespace-nowrap"
                >
                  <T>VER SERVICIOS EN PUERTO VARAS</T>
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 bg-[#F1E7D9]">
          <div className="container text-center">
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] mb-6">
              <T>Regálate un momento de bienestar</T>
            </h2>
            <p className="font-['Fira_Sans'] text-lg text-[#666] mb-8 max-w-2xl mx-auto">
              <T>Reserva tu sesión de masaje y vive una experiencia de renovación en el corazón de la Patagonia.</T>
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-12 py-6"
              >
                <T>RESERVAR MASAJE</T>
              </Button>
            </a>
          </div>
        </section>

        <Footer />
        <WhatsAppButton />
      </div>
    </AutoTranslateProvider>
  );
}
