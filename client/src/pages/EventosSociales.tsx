import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Sparkles } from "lucide-react";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

export default function EventosSociales() {
  return (
    <AutoTranslateProvider pageId="eventos-sociales">
      <div className="min-h-screen bg-[#F1E7D9]">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img src="/images/fullday-biopiscinas-hero.jpg" alt="Eventos Sociales Cancagua" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
          
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <div className="mb-8">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-[#D3BC8D]" />
            </div>
            
            <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl font-light mb-6">
              <T>Eventos Sociales</T>
            </h1>
            
            <p className="font-['Josefin_Sans'] text-xl md:text-2xl font-light tracking-wide mb-8 max-w-2xl mx-auto">
              <T>Celebra tus momentos especiales en un entorno único</T>
            </p>
            
            <div className="inline-block bg-[#D3BC8D]/20 backdrop-blur-sm border-2 border-[#D3BC8D] rounded-lg px-12 py-8 mb-8">
              <p className="font-['Josefin_Sans'] text-3xl md:text-4xl tracking-widest uppercase text-[#D3BC8D] mb-2">
                <T>Próximamente</T>
              </p>
              <p className="font-['Fira_Sans'] text-lg text-white/90">
                <T>Estamos preparando algo especial para ti</T>
              </p>
            </div>
          </div>
        </section>

        {/* Información Preliminar */}
        <section className="py-20 bg-white">
          <div className="container max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl text-[#3a3a3a] mb-6">
                <T>Celebra con nosotros</T>
              </h2>
              <p className="font-['Fira_Sans'] text-lg text-[#666] leading-relaxed max-w-2xl mx-auto">
                <T>Muy pronto podrás celebrar cumpleaños, aniversarios, despedidas de soltero/a, reuniones familiares y otros eventos especiales en Cancagua.</T>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-[#D3BC8D]" />
                </div>
                <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#3a3a3a] mb-3">
                  <T>Eventos Personalizados</T>
                </h3>
                <p className="font-['Fira_Sans'] text-[#666]">
                  <T>Diseñamos la experiencia perfecta para tu celebración</T>
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#D3BC8D]" />
                </div>
                <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#3a3a3a] mb-3">
                  <T>Grupos Pequeños y Grandes</T>
                </h3>
                <p className="font-['Fira_Sans'] text-[#666]">
                  <T>Espacios adaptables para diferentes tamaños de grupo</T>
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-[#D3BC8D]" />
                </div>
                <h3 className="font-['Josefin_Sans'] text-lg tracking-wider uppercase text-[#3a3a3a] mb-3">
                  <T>Experiencia Única</T>
                </h3>
                <p className="font-['Fira_Sans'] text-[#666]">
                  <T>Combina biopiscinas, hot tubs, masajes y más</T>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#3a3a3a] text-white">
          <div className="container max-w-3xl text-center">
            <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl mb-6">
              <T>¿Quieres ser el primero en saber?</T>
            </h2>
            <p className="font-['Fira_Sans'] text-lg mb-8 text-gray-300">
              <T>Contáctanos para recibir información cuando lancemos nuestros paquetes de eventos sociales</T>
            </p>
            <a href="/contacto">
              <Button size="lg" className="bg-[#D3BC8D] hover:bg-[#c4ad7e] text-[#3a3a3a] font-['Josefin_Sans'] tracking-wider text-lg px-12 py-6">
                <T>CONTACTAR</T>
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
