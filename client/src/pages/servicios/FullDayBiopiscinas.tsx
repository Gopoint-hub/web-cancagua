import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Users, Waves, Leaf, Shirt, Coffee } from "lucide-react";

export default function FullDayBiopiscinas() {
  return (
    <div className="min-h-screen bg-[#F1E7D9]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/fullday-biopiscinas-hero.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-['Josefin_Sans'] text-5xl md:text-7xl font-light mb-6 tracking-wide">
            Full Day Biopiscinas + Playa
          </h1>
          <p className="font-['Fira_Sans'] text-xl md:text-2xl mb-4 text-white/90">
            ¡Descubre una experiencia única a orillas del Lago Llanquihue!
          </p>
          <p className="font-['Fira_Sans'] text-lg text-white/80 mb-8">
            Estadía de 8 horas aproximadamente
          </p>
          <a 
            href="https://reservas.cancagua.cl/cancaguaspa/s/efd93bde-d6f9-45cd-8588-dda2658cb5fe" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              size="lg" 
              className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] text-lg px-8 py-6 tracking-wider uppercase"
            >
              Reservar Ahora
            </Button>
          </a>
        </div>
      </section>

      {/* ¿Qué son las Biopiscinas? */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-['Josefin_Sans'] text-4xl md:text-5xl text-center text-[#3a3a3a] mb-12 tracking-wide">
            ¿Qué son nuestras Biopiscinas Geotermales?
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Leaf className="w-6 h-6 text-[#D3BC8D]" />
              </div>
              <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#3a3a3a] leading-relaxed">
                Son piscinas naturales diseñadas de manera sostenible, que utilizan plantas y sistemas 
                ecológicos para mantener el agua cristalina, <span className="text-[#D3BC8D] font-semibold">sin químicos</span> y 
                en armonía con el medio ambiente.
              </p>
            </div>
            
            <p className="font-['Fira_Sans'] text-lg text-[#3a3a3a]/80 leading-relaxed">
              La temperatura varía entre 36 a 40 grados, perfecta para una relajación profunda. 
              Nuestras Biopiscinas están pensadas para brindarte un entorno relajante, rodeado de 
              paisajes espectaculares. Además, contamos con baños, ducha y camarín completamente 
              equipados para garantizar tu comodidad.
            </p>
          </div>

          <div className="text-center">
            <p className="font-['Cormorant_Garamond'] text-2xl text-[#3a3a3a] italic">
              Un espacio donde la naturaleza y comodidad se encuentran para ofrecerte momentos inolvidables.
            </p>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-['Josefin_Sans'] text-4xl md:text-5xl text-center text-[#3a3a3a] mb-12 tracking-wide">
            Tu Experiencia Full Day
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-[#D3BC8D]/30 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#D3BC8D]" />
                </div>
                <h3 className="font-['Josefin_Sans'] text-xl font-semibold text-[#3a3a3a] mb-2">
                  8 Horas de Estadía
                </h3>
                <p className="font-['Fira_Sans'] text-[#3a3a3a]/70">
                  Tiempo completo para relajarte sin apuros
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#D3BC8D]/30 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="w-8 h-8 text-[#D3BC8D]" />
                </div>
                <h3 className="font-['Josefin_Sans'] text-xl font-semibold text-[#3a3a3a] mb-2">
                  Biopiscinas Geotermales
                </h3>
                <p className="font-['Fira_Sans'] text-[#3a3a3a]/70">
                  Agua natural entre 36-40°C
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#D3BC8D]/30 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-8 h-8 text-[#D3BC8D]" />
                </div>
                <h3 className="font-['Josefin_Sans'] text-xl font-semibold text-[#3a3a3a] mb-2">
                  Cafetería Saludable
                </h3>
                <p className="font-['Fira_Sans'] text-[#3a3a3a]/70">
                  Alimentación consciente disponible
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-[#F1E7D9] rounded-lg p-8">
            <h3 className="font-['Josefin_Sans'] text-2xl text-[#3a3a3a] mb-6 flex items-center gap-3">
              <Shirt className="w-6 h-6 text-[#D3BC8D]" />
              La Estadía Incluye para Uso en el Lugar
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D3BC8D] mt-1 flex-shrink-0" />
                <span className="font-['Fira_Sans'] text-[#3a3a3a]">1 bata por persona</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D3BC8D] mt-1 flex-shrink-0" />
                <span className="font-['Fira_Sans'] text-[#3a3a3a]">1 toalla por persona</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D3BC8D] mt-1 flex-shrink-0" />
                <span className="font-['Fira_Sans'] text-[#3a3a3a]">1 gorra de nado por persona</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D3BC8D] mt-1 flex-shrink-0" />
                <span className="font-['Fira_Sans'] text-[#3a3a3a]">1 bolsa pilwa con llave de locker</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Beneficios */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-['Josefin_Sans'] text-4xl text-center text-[#3a3a3a] mb-12 tracking-wide">
            Beneficios de las Biopiscinas
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-[#D3BC8D]/30">
              <CardContent className="p-6">
                <h3 className="font-['Josefin_Sans'] text-xl font-semibold text-[#3a3a3a] mb-3">
                  🌿 100% Natural y Ecológico
                </h3>
                <p className="font-['Fira_Sans'] text-[#3a3a3a]/70">
                  Sin químicos, cloro ni productos artificiales. Solo plantas y sistemas naturales de purificación.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#D3BC8D]/30">
              <CardContent className="p-6">
                <h3 className="font-['Josefin_Sans'] text-xl font-semibold text-[#3a3a3a] mb-3">
                  💧 Agua Cristalina
                </h3>
                <p className="font-['Fira_Sans'] text-[#3a3a3a]/70">
                  Purificación natural que mantiene el agua transparente y libre de impurezas.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#D3BC8D]/30">
              <CardContent className="p-6">
                <h3 className="font-['Josefin_Sans'] text-xl font-semibold text-[#3a3a3a] mb-3">
                  🌡️ Temperatura Perfecta
                </h3>
                <p className="font-['Fira_Sans'] text-[#3a3a3a]/70">
                  Entre 36-40°C, ideal para relajación muscular y circulación sanguínea.
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#D3BC8D]/30">
              <CardContent className="p-6">
                <h3 className="font-['Josefin_Sans'] text-xl font-semibold text-[#3a3a3a] mb-3">
                  🏔️ Entorno Privilegiado
                </h3>
                <p className="font-['Fira_Sans'] text-[#3a3a3a]/70">
                  Vistas al Lago Llanquihue y los volcanes, rodeado de naturaleza pura.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Información Importante */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-['Josefin_Sans'] text-4xl text-center text-[#3a3a3a] mb-12 tracking-wide">
            Información Importante
          </h2>
          
          <div className="space-y-4">
            <Card className="border-l-4 border-l-[#D3BC8D]">
              <CardContent className="p-6">
                <p className="font-['Fira_Sans'] text-[#3a3a3a]">
                  <strong>Edad mínima:</strong> El ingreso a Biopiscina es solo para mayores de 5 años 
                  con control de esfínter y sin pañal.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#D3BC8D]">
              <CardContent className="p-6 flex items-start gap-3">
                <Users className="w-5 h-5 text-[#D3BC8D] mt-1 flex-shrink-0" />
                <p className="font-['Fira_Sans'] text-[#3a3a3a]">
                  <strong>Tarifa niños:</strong> Tarifa especial de niños es de 5 a 12 años.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#D3BC8D]">
              <CardContent className="p-6">
                <p className="font-['Fira_Sans'] text-[#3a3a3a]">
                  <strong>Ubicación:</strong> Disfruta de una estadía de 8 horas al costado de nuestra 
                  cafetería de alimentación saludable, con acceso directo a la playa del lago.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#3a3a3a] to-[#2a2a2a] text-white">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="font-['Josefin_Sans'] text-4xl md:text-5xl mb-6 tracking-wide">
            Ven a Conocer Nuestras Biopiscinas
          </h2>
          <p className="font-['Fira_Sans'] text-xl mb-8 text-white/80">
            Un espacio donde la naturaleza y comodidad se encuentran
          </p>
          <a 
            href="https://reservas.cancagua.cl/cancaguaspa/s/efd93bde-d6f9-45cd-8588-dda2658cb5fe" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              size="lg" 
              className="bg-[#D3BC8D] text-[#3a3a3a] hover:bg-[#c4a976] text-lg px-12 py-6 tracking-wider uppercase"
            >
              Reservar Full Day
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
