import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Sparkles, Heart, Leaf } from "lucide-react";

const BOOKING_URL = "https://reservas.cancagua.cl/cancaguaspa/s/502a130d-2e50-472a-aabc-a7917d5b5fbe";

interface MassageService {
  name: string;
  duration: string;
  price: string;
  description?: string;
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

export default function Masajes() {
  return (
    <div className="min-h-screen bg-[#F1E7D9]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src="/images/03_masajes-hero.webp"
            alt="Masajes Cancagua"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        
        <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light mb-4">
            Masajes & Terapias
          </h1>
          <p className="font-['Josefin_Sans'] text-xl md:text-2xl font-light tracking-wide mb-8 max-w-2xl">
            Descubre nuestras sesiones de renovación y descanso en un ambiente armónico y natural
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-10 py-6"
            >
              RESERVAR MASAJE
            </Button>
          </a>
        </div>
      </section>

      {/* Descripción */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl text-center">
          <p className="font-['Fira_Sans'] text-lg text-[#666] leading-relaxed mb-6">
            Tu bienestar es nuestro compromiso. Tenemos diversos tipos de masajes diseñados para 
            renovar tu cuerpo y mente en un entorno natural único.
          </p>
          <div className="flex justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-[#D3BC8D]">
              <Sparkles className="h-5 w-5" />
              <span className="font-['Fira_Sans'] text-sm text-[#666]">Ambiente relajante</span>
            </div>
            <div className="flex items-center gap-2 text-[#D3BC8D]">
              <Heart className="h-5 w-5" />
              <span className="font-['Fira_Sans'] text-sm text-[#666]">Terapeutas certificados</span>
            </div>
            <div className="flex items-center gap-2 text-[#D3BC8D]">
              <Leaf className="h-5 w-5" />
              <span className="font-['Fira_Sans'] text-sm text-[#666]">Productos naturales</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Servicios */}
      <section className="py-20 bg-[#F1E7D9]">
        <div className="container max-w-5xl">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] text-center mb-4">
            Selecciona tu experiencia
          </h2>
          <p className="font-['Fira_Sans'] text-[#666] text-center mb-12">
            Elige el masaje que mejor se adapte a tus necesidades
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            {massageServices.map((service, index) => (
              <Card key={index} className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-['Josefin_Sans'] text-lg text-[#3a3a3a] mb-2">
                        {service.name} ({service.duration})
                      </h3>
                      <div className="flex items-center gap-2 text-[#888]">
                        <Clock className="h-4 w-4" />
                        <span className="font-['Fira_Sans'] text-sm">{service.duration}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-['Cormorant_Garamond'] text-2xl text-[#D3BC8D]">
                        {service.price}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-12 py-6"
              >
                RESERVAR AHORA
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] text-center mb-12">
            Nuestro espacio
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <img
              src="/images/03_masajes-hero.webp"
              alt="Masaje relajante"
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
            <img
              src="/images/02_biopiscinas-hero.jpg"
              alt="Biopiscinas"
              className="rounded-lg shadow-md w-full h-64 object-cover"
            />
            <img
              src="/images/04_hottubs-hero.png"
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
            Beneficios de nuestros masajes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#D3BC8D]">
                Masaje de Relajación
              </h3>
              <p className="font-['Fira_Sans'] text-white/80">
                Ideal para liberar el estrés acumulado y alcanzar un estado de calma profunda. 
                Utiliza movimientos suaves y fluidos que relajan los músculos y la mente.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#D3BC8D]">
                Masaje Descontracturante
              </h3>
              <p className="font-['Fira_Sans'] text-white/80">
                Enfocado en aliviar tensiones musculares profundas y contracturas. 
                Perfecto para quienes sufren de dolores cervicales, lumbares o de espalda.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#D3BC8D]">
                Piedras Calientes
              </h3>
              <p className="font-['Fira_Sans'] text-white/80">
                Combina el masaje tradicional con piedras volcánicas calientes que penetran 
                profundamente en los músculos, aliviando tensiones y mejorando la circulación.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#D3BC8D]">
                Drenaje Linfático
              </h3>
              <p className="font-['Fira_Sans'] text-white/80">
                Técnica suave que estimula el sistema linfático, ayudando a eliminar toxinas, 
                reducir la retención de líquidos y mejorar el sistema inmunológico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-[#F1E7D9]">
        <div className="container text-center">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] mb-6">
            Regálate un momento de bienestar
          </h2>
          <p className="font-['Fira_Sans'] text-lg text-[#666] mb-8 max-w-2xl mx-auto">
            Reserva tu sesión de masaje y vive una experiencia de renovación en el corazón de la Patagonia.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button 
              size="lg" 
              className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-12 py-6"
            >
              RESERVAR MASAJE
            </Button>
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
