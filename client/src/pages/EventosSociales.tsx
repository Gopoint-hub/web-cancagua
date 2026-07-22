import { Button } from "@/components/ui/button";
import { Calendar, Users, Sparkles } from "lucide-react";
import { AutoTranslateProvider, T } from "@/components/AutoTranslate";

export default function EventosSociales() {
  return (
    <AutoTranslateProvider pageId="eventos-sociales">
      <>
        
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img src="https://res.cloudinary.com/dhuln9b1n/image/upload/v1770309169/cancagua/images/fullday-biopiscinas-hero.webp" alt="Eventos Sociales Cancagua" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          </div>
          
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <div className="mb-8">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-[#4B5872]" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-light mb-6">
              <T>Eventos Sociales</T>
            </h1>
            
            <p className="font-cg-mono text-xl md:text-2xl font-light tracking-wide mb-8 max-w-2xl mx-auto">
              <T>Celebra tus momentos especiales en un entorno único</T>
            </p>
            
            <div className="inline-block bg-[#4B5872]/20 backdrop-blur-sm border-2 border-[#4B5872] rounded-lg px-12 py-8 mb-8">
              <p className="font-cg-mono text-3xl md:text-4xl tracking-widest uppercase text-[#4B5872] mb-2">
                <T>Próximamente</T>
              </p>
              <p className="font-cg-sans text-lg text-white/90">
                <T>Estamos preparando algo especial para ti</T>
              </p>
            </div>
          </div>
        </section>

        {/* Información Preliminar */}
        <section className="py-20 bg-white">
          <div className="container max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl text-[#222221] mb-6">
                <T>Celebra con nosotros</T>
              </h2>
              <p className="font-cg-sans text-lg text-[#635E5A] leading-relaxed max-w-2xl mx-auto">
                <T>Muy pronto podrás celebrar cumpleaños, aniversarios, despedidas de soltero/a, reuniones familiares y otros eventos especiales en Cancagua.</T>
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#4B5872]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-[#4B5872]" />
                </div>
                <h3 className="font-cg-mono text-lg tracking-wider uppercase text-[#222221] mb-3">
                  <T>Eventos Personalizados</T>
                </h3>
                <p className="font-cg-sans text-[#635E5A]">
                  <T>Diseñamos la experiencia perfecta para tu celebración</T>
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#4B5872]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#4B5872]" />
                </div>
                <h3 className="font-cg-mono text-lg tracking-wider uppercase text-[#222221] mb-3">
                  <T>Grupos Pequeños y Grandes</T>
                </h3>
                <p className="font-cg-sans text-[#635E5A]">
                  <T>Espacios adaptables para diferentes tamaños de grupo</T>
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-[#4B5872]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-[#4B5872]" />
                </div>
                <h3 className="font-cg-mono text-lg tracking-wider uppercase text-[#222221] mb-3">
                  <T>Experiencia Única</T>
                </h3>
                <p className="font-cg-sans text-[#635E5A]">
                  <T>Combina biopiscinas, hot tubs, masajes y más</T>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#222221] text-white">
          <div className="container max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl mb-6">
              <T>¿Quieres ser el primero en saber?</T>
            </h2>
            <p className="font-cg-sans text-lg mb-8 text-gray-300">
              <T>Contáctanos para recibir información cuando lancemos nuestros paquetes de eventos sociales</T>
            </p>
            <a href="/contacto">
              <Button size="lg" className="bg-[#4B5872] hover:bg-[#333D51] text-[#FCF9F9] font-cg-mono tracking-wider text-lg px-12 py-6">
                <T>CONTACTAR</T>
              </Button>
            </a>
          </div>
        </section>

      </>
    </AutoTranslateProvider>
  );
}
