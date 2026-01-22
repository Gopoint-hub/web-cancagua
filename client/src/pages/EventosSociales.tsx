import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Sparkles } from "lucide-react";

export default function EventosSociales() {
  return (
    <div className="min-h-screen bg-[#F1E7D9]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/02_biopiscinas-hero.jpg"
            alt="Eventos Sociales Cancagua"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="mb-8">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-[#D3BC8D]" />
          </div>
          
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light mb-6">
            Eventos Sociales
          </h1>
          
          <p className="font-['Josefin_Sans'] text-xl md:text-2xl font-light tracking-wide mb-8 max-w-2xl mx-auto">
            Celebra tus momentos especiales en un entorno único
          </p>
          
          <div className="inline-block bg-[#D3BC8D]/20 backdrop-blur-sm border-2 border-[#D3BC8D] rounded-lg px-12 py-8 mb-8">
            <p className="font-['Josefin_Sans'] text-3xl md:text-4xl tracking-widest uppercase text-[#D3BC8D] mb-2">
              Próximamente
            </p>
            <p className="font-['Fira_Sans'] text-lg text-white/90">
              Estamos preparando algo especial para ti
            </p>
          </div>
        </div>
      </section>

      {/* Información Preliminar */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] mb-6">
              Celebra con nosotros
            </h2>
            <p className="font-['Fira_Sans'] text-lg text-[#666] leading-relaxed max-w-2xl mx-auto">
              Muy pronto podrás celebrar cumpleaños, aniversarios, despedidas de soltero/a, 
              reuniones familiares y otros eventos especiales en Cancagua.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-[#D3BC8D]" />
              </div>
              <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#3a3a3a] mb-3">
                Eventos Personalizados
              </h3>
              <p className="font-['Fira_Sans'] text-[#666]">
                Diseñamos la experiencia perfecta para tu celebración
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#D3BC8D]" />
              </div>
              <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#3a3a3a] mb-3">
                Grupos Pequeños y Grandes
              </h3>
              <p className="font-['Fira_Sans'] text-[#666]">
                Espacios adaptables para diferentes tamaños de grupo
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-[#D3BC8D]" />
              </div>
              <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#3a3a3a] mb-3">
                Experiencia Única
              </h3>
              <p className="font-['Fira_Sans'] text-[#666]">
                Combina biopiscinas, hot tubs, masajes y más
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#3a3a3a] text-white">
        <div className="container max-w-3xl text-center">
          <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl mb-6">
            ¿Quieres ser el primero en saber?
          </h2>
          <p className="font-['Fira_Sans'] text-lg mb-8 text-gray-300">
            Contáctanos para recibir información cuando lancemos nuestros paquetes de eventos sociales
          </p>
          <a href="/contacto">
            <Button 
              size="lg" 
              className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-12 py-6"
            >
              CONTACTAR
            </Button>
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
