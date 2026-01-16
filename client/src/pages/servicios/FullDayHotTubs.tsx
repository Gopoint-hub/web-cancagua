import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Users, Waves, Coffee, Shirt } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export default function FullDayHotTubs() {
  return (
    <div className="min-h-screen bg-[#F1E7D9]">
      <Navbar />
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-['Josefin_Sans'] text-5xl md:text-7xl font-light mb-6 tracking-wide">
            Full Day Hot Tubs + Biopiscinas
          </h1>
          <p className="font-['Fira_Sans'] text-xl md:text-2xl mb-4 text-white/90">
            ¡Relájate en Armonía con la Naturaleza!
          </p>
          <p className="font-['Fira_Sans'] text-lg text-white/80 mb-8">
            Estadía de 8 horas aproximadamente
          </p>
          <a 
            href="https://reservas.cancagua.cl/cancaguaspa/s/6d05b690-e0f1-4ca7-9d50-ed6e123c0470" 
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

      {/* Descripción Principal */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <p className="font-['Cormorant_Garamond'] text-2xl md:text-3xl text-[#3a3a3a] leading-relaxed mb-8 text-center">
              Vive una experiencia inigualable en nuestras piscinas calientes, donde la pureza de las 
              <span className="text-[#D3BC8D] font-semibold"> Biopiscinas geotermales</span> se une con la 
              comodidad y calidez de los <span className="text-[#D3BC8D] font-semibold">Hot-Tub</span>.
            </p>
            
            <p className="font-['Fira_Sans'] text-lg text-[#3a3a3a]/80 leading-relaxed">
              Podrás disfrutar de aguas entre 37 y 40 grados, perfecto para una relajación profunda en un 
              espacio diseñado en armonía con la naturaleza, con vistas espectaculares y equipamiento completo: 
              living, ducha, cambiador, baños y lockers. Además contarás con una exclusiva carta de alimentación 
              saludable, donde podrás disfrutar de opciones frescas y deliciosas, tablas de picoteo, bebestibles 
              y atención personalizada.
            </p>
          </div>
        </div>
      </section>

      {/* Qué Incluye */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-['Josefin_Sans'] text-4xl md:text-5xl text-center text-[#3a3a3a] mb-12 tracking-wide">
            Tu Experiencia Incluye
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="border-[#D3BC8D]/30 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="w-8 h-8 text-[#D3BC8D]" />
                </div>
                <h3 className="font-['Josefin_Sans'] text-xl font-semibold text-[#3a3a3a] mb-2">
                  Hot-Tub Privado
                </h3>
                <p className="font-['Fira_Sans'] text-[#3a3a3a]/70">
                  2 horas y 30 minutos de disfrute
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#D3BC8D]/30 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="w-8 h-8 text-[#D3BC8D]" />
                </div>
                <h3 className="font-['Josefin_Sans'] text-xl font-semibold text-[#3a3a3a] mb-2">
                  Stand Up Paddle / Kayak
                </h3>
                <p className="font-['Fira_Sans'] text-[#3a3a3a]/70">
                  1 hora de actividad acuática
                </p>
              </CardContent>
            </Card>

            <Card className="border-[#D3BC8D]/30 hover:shadow-xl transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#D3BC8D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-[#D3BC8D]" />
                </div>
                <h3 className="font-['Josefin_Sans'] text-xl font-semibold text-[#3a3a3a] mb-2">
                  Biopiscinas Ilimitadas
                </h3>
                <p className="font-['Fira_Sans'] text-[#3a3a3a]/70">
                  Estadía sin límite de tiempo
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-[#F1E7D9] rounded-lg p-8">
            <h3 className="font-['Josefin_Sans'] text-2xl text-[#3a3a3a] mb-6 flex items-center gap-3">
              <Shirt className="w-6 h-6 text-[#D3BC8D]" />
              Nosotros te Entregamos
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D3BC8D] mt-1 flex-shrink-0" />
                <span className="font-['Fira_Sans'] text-[#3a3a3a]">1 toalla por persona</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#D3BC8D] mt-1 flex-shrink-0" />
                <span className="font-['Fira_Sans'] text-[#3a3a3a]">1 bata por persona</span>
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

      {/* Información Importante */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-['Josefin_Sans'] text-4xl text-center text-[#3a3a3a] mb-12 tracking-wide">
            Información Importante
          </h2>
          
          <div className="space-y-4">
            <Card className="border-l-4 border-l-[#D3BC8D]">
              <CardContent className="p-6">
                <p className="font-['Fira_Sans'] text-[#3a3a3a]">
                  <strong>Horarios especiales:</strong> Si reservas en horario de 18:00, 18:30 o 19:00 hrs, 
                  debes llegar antes para hacer uso de las biopiscinas geotermales.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#D3BC8D]">
              <CardContent className="p-6">
                <p className="font-['Fira_Sans'] text-[#3a3a3a]">
                  <strong>Edad mínima:</strong> Ingreso a biopiscina solo para niños mayores de 5 años 
                  con control de esfínter y sin pañal.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#D3BC8D]">
              <CardContent className="p-6">
                <p className="font-['Fira_Sans'] text-[#3a3a3a]">
                  <strong>Tarifa niños:</strong> Tarifa especial de niños es de 5 a 12 años.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#D3BC8D]">
              <CardContent className="p-6 flex items-start gap-3">
                <Users className="w-5 h-5 text-[#D3BC8D] mt-1 flex-shrink-0" />
                <p className="font-['Fira_Sans'] text-[#3a3a3a]">
                  <strong>Grupos:</strong> Reservas de máximo 10 personas por reserva.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-[#D3BC8D]">
              <CardContent className="p-6 flex items-start gap-3">
                <Coffee className="w-5 h-5 text-[#D3BC8D] mt-1 flex-shrink-0" />
                <p className="font-['Fira_Sans'] text-[#3a3a3a]">
                  <strong>Cafetería:</strong> Servicio de cafetería disponible de martes a domingo.
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
            ¡Reserva tu Momento de Bienestar!
          </h2>
          <p className="font-['Fira_Sans'] text-xl mb-8 text-white/80">
            Disfruta de la magia de Cancagua
          </p>
          <a 
            href="https://reservas.cancagua.cl/cancaguaspa/s/6d05b690-e0f1-4ca7-9d50-ed6e123c0470" 
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
