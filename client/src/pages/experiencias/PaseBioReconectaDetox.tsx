import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Clock, MapPin, Users, Sparkles, Check, Info, AlertTriangle,
  Waves, Heart, Droplets, Flame, Coffee, Calendar
} from "lucide-react";

export default function PaseBioReconectaDetox() {
  const includes = [
    "Biopiscinas geotermales por 4 horas",
    "Masaje relajante",
    "Sauna a orillas del lago por 1 hora",
    "Clase de Yoga o Stand Up Padel/Kayak por 1 hora (gratis y opcional)",
    "Acceso a estacionamientos, baños y amenities"
  ];

  const weProvide = [
    "1 bata por persona",
    "1 gorra de nado",
    "1 bolsa pilwa con llave de locker"
  ];

  const importantInfo = [
    "Sauna no apto para embarazadas",
    "El ingreso a Biopiscina es solo para mayores de 5 años con control de esfínter y sin pañal",
    "Tarifa de niños es de 5 a 12 años",
    "El horario de masajes y sauna queda sujeto a disponibilidad de agenda, nos comunicaremos contigo para entregarte tu itinerario",
    "Toallas disponibles para arriendo"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-end overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://d2xsxph8kpxj0f.cloudfront.net/310519663288636259/b6AHokZVYJSFV94d2D2ybb/cancagua/images/pase-reconecta-masaje-2.png')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        
        <div className="relative z-10 container pb-16 text-white">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <Flame className="h-4 w-4" />
              <span className="text-sm font-medium">Experiencia Bio-Detox</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-josefin font-bold tracking-tight">
              Pase Bio-Reconecta Detox
            </h1>
            <p className="text-2xl text-white/90">
              Biopiscina + Masaje + Sauna + Kayak o Yoga
            </p>
            <p className="text-lg text-white/80 leading-relaxed">
              ¡Disfruta de la experiencia Bio-Reconecta Detox! Combina nuestras Biopiscinas geotermales naturales con masaje relajante y sauna a orillas del lago para una experiencia de purificación completa.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">6+ horas aprox.</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Droplets className="h-5 w-5" />
                <span className="font-semibold">36-40°C</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Flame className="h-5 w-5" />
                <span className="font-semibold">Incluye Sauna</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What are Biopools */}
      <section className="py-20 container">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-4">
              <Waves className="h-8 w-8 text-teal-600" />
            </div>
            <h2 className="text-4xl font-josefin font-bold text-stone-800">
              ¿Qué son nuestras Biopiscinas?
            </h2>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8 space-y-6">
              <p className="text-lg text-stone-700 leading-relaxed">
                Son piscinas naturales diseñadas de manera sostenible, que utilizan plantas y sistemas ecológicos para mantener el agua cristalina, sin químicos y en armonía con el medio ambiente. La temperatura varía entre <strong>36 a 40 grados</strong>.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed">
                Nuestras Biopiscinas están pensadas para brindarte un entorno relajante, rodeado de paisajes espectaculares. Además, contamos con baños, ducha y camarín completamente equipados para garantizar tu comodidad.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-josefin font-bold text-stone-800">
                Tu experiencia incluye
              </h2>
              <p className="text-lg text-stone-600">
                El Pase Bio-Reconecta Detox tiene una estadía de 6+ horas aproximadamente
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {includes.map((item, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <Check className="h-5 w-5 text-teal-600" />
                    </div>
                    <p className="text-stone-700 leading-relaxed pt-2">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex gap-4">
              <AlertTriangle className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="font-semibold text-amber-900">Importante</p>
                <p className="text-amber-800">
                  Sauna no apto para embarazadas. Stand Up Padel/Kayak sujeto a condiciones climáticas y Clase de Yoga sujeto a horario de clase regular.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros te entregamos */}
      <section className="py-20 container">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-8 w-8" />
                <h2 className="text-3xl font-josefin font-bold">
                  Nosotros te entregamos
                </h2>
              </div>
              <p className="text-white/90 text-lg">
                Todo lo necesario para que disfrutes cómodamente tu experiencia detox
              </p>
            </div>
            <CardContent className="p-8">
              <div className="grid sm:grid-cols-2 gap-6">
                {weProvide.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Check className="h-6 w-6 text-teal-600 flex-shrink-0" />
                    <span className="text-stone-700">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cafe & Beach Bar */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-200 mb-4">
              <Coffee className="h-8 w-8 text-amber-700" />
            </div>
            <h2 className="text-4xl font-josefin font-bold text-stone-800">
              Café & Beach Bar
            </h2>
            <p className="text-xl text-stone-600 leading-relaxed">
              Además estarás al costado de nuestro <strong>Café & Beach Bar</strong> con una exquisita carta para deleitarte durante tu estadía
            </p>
          </div>
        </div>
      </section>

      {/* Important Information */}
      <section className="py-20 container">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <Info className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-4xl font-josefin font-bold text-stone-800">
              Información importante
            </h2>
          </div>

          <div className="space-y-4">
            {importantInfo.map((info, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm flex gap-4 items-start border border-stone-100"
              >
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
                </div>
                <p className="text-stone-700 leading-relaxed">{info}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-br from-teal-600 to-emerald-700 p-12 text-center text-white space-y-6">
              <Calendar className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-4xl font-josefin font-bold">
                ¡Reserva tu experiencia Bio-Detox!
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Experimenta la combinación perfecta de Biopiscinas, masaje y sauna en Cancagua
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a 
                  href="https://reservas.cancagua.cl/cancaguaspa/s/754d7334-33f0-43da-834e-d2eecbbf17be"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-white text-teal-600 hover:bg-stone-100 font-semibold">
                    Reservar ahora
                  </Button>
                </a>
                <a href="https://wa.me/56940073999" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Consultar por WhatsApp
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
